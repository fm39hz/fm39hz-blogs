---
author: FM39hz
pubDatetime: 2026-07-07
modDatetime: 2026-07-12
title: Another way to engineer a game
featured: false
draft: false
lang: en
tags:
  - architecture
  - game-dev
  - systems-design
description: Another way to thinkt about game architecture
---

## Table of contents

## The Framework as an Architectural Parasite

Modern interactive simulation and game development are fundamentally constrained by runtime frameworks. Production methodologies routinely dictate building core logic directly around monolithic engine APIs, hardware-facing lifecycles, and localized rendering pipelines. Over the course of a software system's lifecycle, the external framework ceases to be an implementation detail; it effectively becomes the software architecture itself.

```mermaid
graph TD
    subgraph Coupled_Architecture [Conventional Tight Coupling]
        Engine[Monolithic Engine API / Lifecycle]
        Domain[Gameplay / Simulation Logic]
        Engine --- Domain
    end
```

This structural coupling introduces an inversion of clean system design. A simulation domain model should conceptually exist independently of its visualization layer; an engine is structurally nothing more than a localized visualizer and peripheral interface. When simulation logic is tightly bound to platform-specific data structures, memory layout constraints, and runtime infrastructures, the underlying business domain is compromised. Frameworks are volatile technical implementations; simulations are domains. To preserve the structural integrity of complex simulations, a paradigm inversion is required: the complete separation of domain execution from its physical platform execution context.

```mermaid
graph TD
    subgraph Inverted_Architecture [Paradigm Inversion]
        CoreDomain[Pure Simulation Domain]
        Visualizer[Engine / Physical Implementation]
        CoreDomain -->|Drives| Visualizer
    end
```

> _Architecture is a set of constraints. Anyone who reads it should be able to come back after two months and still write the game correctly._

---

### Abstract

This paper describes the architecture of Fantasia, a game framework built on the premise that game design and game infrastructure are fundamentally different concerns and should never be mixed. The architecture solves three core problems: (1) complete separation of game logic from infrastructure, allowing engine replacement without touching gameplay code, (2) enabling game designers to author all game content — characters, stats, AI behavior, state graphs — entirely in JSON without programming, and (3) catching every architectural violation at compile-time rather than runtime.

The architecture rests on three pillars: the ABC semantic model (Being–Concept–Aspect) as a ubiquitous language for describing game worlds, an immutable Knowledge database compiled from JSON at build-time, and a source generator pipeline that automatically produces typed code, execution schedules, and dispatch tables from declarative data.

Throughout this paper, a top-down 2D Action RPG is used as a running example to demonstrate each concept concretely.

## 0. Thesis

> **Game designer writes JSON. Programmer writes systems. Compiler handles the rest.**

Every design decision in this paper exists to serve the statement above. If a design doesn't serve it — it shouldn't exist.

- **Designer** writes no code. All game content lives in JSON using GDD-native language.
- **Programmer** writes no boilerplate. Pure logic only — one system, one job.
- **Compiler** (source generator) parses JSON → typed structs, assigns static IDs, scans dependencies, builds execution schedules, emits dispatch tables, detects conflicts. Wrong → compile error.

---

## 1. Game vs Infrastructure

**Why:** A game is not an engine. The GDD says "hit lands," not "AABB overlap." If infra terms leak into game code, changing the engine six months later means the game has to change too. That's wrong.

### 1.1 The Boundary Map

Consider a combat-oriented action game. The GDD speaks one language; code speaks two:

| GDD says       | Game code                                      | Infra code                        |
| -------------- | ---------------------------------------------- | --------------------------------- |
| "hit lands"    | `StrikeDef`, `Vulnerability`, `HitEvent`       | Overlap detection, distance check |
| "push apart"   | `SpaceClaim`, `PushApartSystem`                | Circle-push math                  |
| "opening"      | `VulnerabilityWindow`                          | —                                 |
| "knockback"    | `Knockback`, `StaggerTimer`                    | —                                 |
| "movement"     | `Velocity`, `MovementProfile`, `WorldPosition` | —                                 |
| "appearance"   | `Silhouette { Kind, Palette }`                 | Sprite atlas, draw calls, shader  |
| "button press" | `InputSnapshot { Buttons, Axis }`              | Hardware polling                  |
| "terrain"      | —                                              | Platform collision, tile map      |
| "camera"       | —                                              | Camera matrix, viewport           |
| "render"       | —                                              | SpriteBatch, render target        |

**Rule:** Game code does not contain `Collider`, `Hitbox`, `Hurtbox`, `Detection`, `Overlap`, `Contact`, `Sprite`, `Texture`, `Draw`, `Render`, `Pixel`, `GPU`, `Shader`, `Audio`, `Channel`. Infra owns all of that.

### 1.2 The Litmus Test

> Delete the entire `Prototype.Infrastructure` project and replace it with a new implementation (Godot instead of MonoGame, Jolt instead of BEPU). `Prototype.Game` must compile without changing a single line.

### 1.3 Case Study — "Hit Lands"

GDD: _"The player swings a sword, hits an enemy within range, dealing 1 damage and knocking it back."_

```mermaid
sequenceDiagram
    participant GDD as GDD Language
    participant Game as Game Code
    participant Infra as Infra Code

    Note over GDD: "swing, hit, deal damage"

    GDD->>Game: StrikeDef { Damage, Range, KnockbackForce }
    GDD->>Game: HitEvent { Target, Damage, Direction }
    GDD->>Game: StrikeSystem: HitEvent → subtract HP, write Knockback

    GDD->>Infra: OverlapDetectionSystem
    Note over Infra: Compute distance<br/>distance < Range → publish HitEvent

    Game--xInfra: Game doesn't know how distance is computed
    Infra--xGame: Infra doesn't know how much damage is dealt
```

---

## 2. ABC — The Semantic Coordinate System

**Why:** A game needs a single language that both design and code understand. The designer says "the demon has Health" — code must not call it `HpComponent`. The designer says "it's chasing" — that's a state, not an enum.

### 2.1 Three Primitives

```mermaid
graph TB
    subgraph Ontology["ABC Ontological Model"]
        direction TB
        B["Being<br/><i>Coordinate point</i><br/>Player, Bat, Bat_Idle, S_HealthPct"]
        C["Concept<br/><i>Axis / Viewpoint</i><br/>Mobile, Combatant, Striker"]
        A["Aspect<br/><i>Value on axis / Pure Data</i><br/>WorldPosition, HealthPool, StrikeDef"]
    end

    B -- "belongs to ≥1" --> C
    C -- "reveals ≥1" --> A
    A -. "lives independently<br/>does not belong to any Concept" .-> A

    style B fill:#4a90d9,color:#fff
    style C fill:#e8a838,color:#fff
    style A fill:#50b86c,color:#fff
```

**Being** — a coordinate point in semantic space. Player, Bat, Grass, Bat_Idle, S_HealthPercent — all Beings. They live in Knowledge, not as entities.

**Concept** — a viewpoint on the game. Each Concept opens up a set of Aspects to look through. Concepts carry no data — they're purely viewpoints.

**Aspect** — pure data. Zero behavior. **Does not belong to any Concept.** A Concept merely "opens the window" to see it — the aspect lives independently.

$$B_i = \bigl(C_{B_i},\; A_{B_i}\bigr) \quad \text{where} \quad A_{B_i} = \bigcup_{c \,\in\, C_{B_i}} \text{Reveals}(c)$$

### 2.2 Example — A Character in Semantic Space

```mermaid
graph LR
    Player["<b>Player</b><br/><i>Being</i>"]

    Mobile["<b>Mobile</b><br/><i>Concept</i>"]
    Combatant["<b>Combatant</b><br/><i>Concept</i>"]
    Striker["<b>Striker</b><br/><i>Concept</i>"]
    Visual["<b>Visual</b><br/><i>Concept</i>"]

    WP["WorldPosition"]
    Vel["Velocity"]
    MP["MovementProfile"]
    SC["SpaceClaim"]
    HP["HealthPool"]
    SD["StrikeDef"]
    Sil["Silhouette"]

    Player --- Mobile
    Player --- Combatant
    Player --- Striker
    Player --- Visual

    Mobile -- reveals --> WP
    Mobile -- reveals --> Vel
    Mobile -- reveals --> MP
    Mobile -- reveals --> SC
    Combatant -- reveals --> HP
    Striker -- reveals --> SD
    Visual -- reveals --> Sil

    style Player fill:#4a90d9,color:#fff
    style Mobile fill:#e8a838,color:#fff
    style Combatant fill:#e8a838,color:#fff
    style Striker fill:#e8a838,color:#fff
    style Visual fill:#e8a838,color:#fff
    style WP fill:#50b86c,color:#fff
    style Vel fill:#50b86c,color:#fff
    style MP fill:#50b86c,color:#fff
    style SC fill:#50b86c,color:#fff
    style HP fill:#50b86c,color:#fff
    style SD fill:#50b86c,color:#fff
    style Sil fill:#50b86c,color:#fff
```

The Player Being sits at coordinate `{Mobile, Combatant, Striker, Visual}`. An enemy might be nearby in semantic space but lack `Striker`. A destructible prop might only have `{Breakable, Visual}`. AI states and sensors are also Beings — `Bat_Idle → [State]`, `S_HealthPercent → [Sensor]`.

### 2.3 Concept Reveals Aspect

Reveals is total: if a Being belongs to `Mobile`, it receives **all 6** Aspects. No cherry-picking.

| Concept      | Reveals                                                                       |
| ------------ | ----------------------------------------------------------------------------- |
| `Mobile`     | WorldPosition, Velocity, MovementProfile, Orientation, DepthLayer, SpaceClaim |
| `Combatant`  | HealthPool                                                                    |
| `Striker`    | StrikeDef                                                                     |
| `Vulnerable` | Vulnerability                                                                 |
| `Knockable`  | Knockback, StaggerTimer                                                       |
| `Agent`      | StateGraph                                                                    |
| `Visual`     | Silhouette                                                                    |
| `Breakable`  | DestructibleConfig, OnDestroy                                                 |
| `State`      | StateLinks, Desirability, StateGroup                                          |
| `Sensor`     | _(identity concept — reveals nothing)_                                        |

### 2.4 Aspect — Type Inference from JSON

Designers declare aspects using **primitive labels** — expressing intent, not .NET types:

```json
{
  "aspects": {
    "WorldPosition": { "Value": "vector" },
    "Velocity": { "Value": "vector" },
    "MovementProfile": {
      "MaxSpeed": "number",
      "Acceleration": "number",
      "Friction": "number"
    },
    "HealthPool": { "Current": "number", "Max": "number" },
    "StrikeDef": {
      "Damage": "number",
      "KnockbackForce": "number",
      "ActiveDuration": "number"
    },
    "SpaceClaim": { "Radius": "number" },
    "Knockback": { "Value": "vector", "Decay": "number" },
    "Silhouette": { "Kind": "text", "Palette": "text" },
    "StateGraph": { "Links": "ref", "Group": "ref" }
  }
}
```

**Inference cascade — narrowest first:**

| Label    | Intent              | Inference rule                                                                                               | Validation                                                                              |
| -------- | ------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `vector` | Multi-axis quantity | `Vector2` (2 axes) / `Vector3` (3 axes) — count from values                                                  | All Beings using the same field must have the same axis count. Different → build error. |
| `number` | Numeric quantity    | `uint`/`ulong` (all ≥0) → `int`/`long` (has negative) → `float`/`double` (has decimal). Narrowest that fits. | Doesn't fit → build error.                                                              |
| `text`   | String              | `string`                                                                                                     |                                                                                         |
| `flag`   | Boolean             | `bool`                                                                                                       |                                                                                         |
| `ref`    | Being reference     | `Ref<TConcept>`                                                                                              | Wrong Concept → compile error.                                                          |

**No `any`. No `unknown`. No `object`. Zero runtime guessing.**

### 2.5 Being ≠ Entity

Being = design blueprint in Knowledge. Entity = component bag at runtime. An entity does not carry Being identity.

---

## 3. Data Pipeline — From JSON to Runtime

**Why:** Designers write JSON. Programmers write systems. Someone has to turn JSON into code. That someone is the source generator — at compile-time, not runtime.

```mermaid
flowchart LR
    subgraph Authoring["Designer Authoring"]
        OJ["concepts.json<br/>aspects.json"]
        BJ["beings.json<br/>states.json<br/>sensors.json"]
    end

    subgraph Compile["Source Generator (Compile-Time)"]
        INF["Type Inferencer<br/>vector→Vector2<br/>number→float"]
        EMT["Code Emitter"]
    end

    subgraph Generated["Generated Code"]
        AS["Aspect structs<br/><i>readonly record struct</i>"]
        BT["Being types<br/><i>IViewableAs markers</i>"]
        ID["ID registries<br/><i>BeingMetadata, ConceptMetadata</i>"]
        SD["SensorDispatch"]
        SCH["GeneratedScheduler"]
        GH["GameHost"]
    end

    subgraph Runtime["Runtime"]
        KB["Knowledge<br/><i>Flat typed arrays</i>"]
        ECS["ECS Worlds<br/><i>Mutable components</i>"]
    end

    OJ --> INF
    BJ --> INF
    INF --> EMT
    EMT --> AS
    EMT --> BT
    EMT --> ID
    EMT --> SD
    EMT --> SCH
    EMT --> GH
    ID --> KB
    BJ --> KB
    KB -.->|"copy at spawn"| ECS
```

1. **Source gen** reads JSON as `AdditionalFiles` → emits Aspect structs, Being types, ID registries, SensorDispatch, GeneratedScheduler, GameHost.
2. **Knowledge builder** (startup) reads emitted registries + beings data → builds flat arrays indexed by Being ID.
3. **Runtime**: Knowledge immutable, ECS mutable. Materializer (§13) copies Knowledge → ECS components at spawn.

`$prototype` enables inheritance between Beings. Source gen resolves the chain **at compile-time** — inheritance does not exist at runtime.

---

## 4. Knowledge — Immutable Design Truth

**Why:** Design data doesn't change during play. "Player starts with MaxHP 4" is a design fact. "Entity #42 currently has 2 HP" is runtime state. Two different things, living in two different places. Flat pools, fast reads, no locks, no runtime parsing.

### 4.1 Two Query Primitives

```mermaid
flowchart TB
    subgraph Query["Knowledge Query"]
        OF["<b>Of&lt;C, A&gt;(being)</b><br/><i>Lensed query</i><br/>Look through a Concept to see an Aspect"]
        ABOUT["<b>About&lt;A&gt;(being)</b><br/><i>Root query</i><br/>Direct access<br/>when unambiguous"]
    end

    subgraph Example["Examples"]
        E1["Of&lt;Mobile, MovementProfile&gt;(Player)<br/>→ { MaxSpeed: 80 }"]
        E2["Of&lt;Combatant, HealthPool&gt;(Player)<br/>→ { Current: 4, Max: 4 }"]
        E3["About&lt;Loyalty&gt;(Player)<br/>→ direct"]
        E4["Of&lt;Combatant, WorldPosition&gt;(Player)<br/>→ ❌ compile error"]
        E5["About&lt;WorldPosition&gt;(Player)<br/>→ ❌ compile error (ambiguous)"]
    end

    OF --> E1
    OF --> E2
    OF --> E4
    ABOUT --> E3
    ABOUT --> E5

    style OF fill:#4a90d9,color:#fff
    style ABOUT fill:#e8a838,color:#fff
    style E4 fill:#d94a4a,color:#fff
    style E5 fill:#d94a4a,color:#fff
```

**`Of<TConcept, TAspect>(being)`** — lensed. Each (Concept, Aspect) pair has its own storage. Concept doesn't reveal Aspect → compile error.

**`About<TAspect>(being)`** — root. No lens needed — direct access when the Aspect is unambiguous for that Being. Ambiguous → compile error.

### 4.2 Lookup Path

```mermaid
flowchart LR
    BID["beingId"] --> IDX["beingIndices[beingId]<br/>→ slot"]
    IDX --> FS{"FlatStore<br/>has type?"}
    FS -->|yes| ARR["flatStore[AspectType][slot]<br/><b>O(1)</b>"]
    FS -->|no| POOL["pools[conceptId][slot]<br/><b>O(1)</b>"]

    style ARR fill:#50b86c,color:#fff
    style POOL fill:#e8a838,color:#fff
```

No boxing. No dictionary. No hashing. Pure index arithmetic. FlatStore is the hot path — all Aspects of the same type sit contiguously in memory.

### 4.3 Thread Safety by Construction

Knowledge is immutable after build → no locks, no synchronization. Knowledge access (`Of`, `About`) **does not count as Reads/Writes** in conflict analysis — it is not shared mutable state.

---

## 5. Identity — Two Ways to Point

**Why:** Beings are design data, living in Knowledge. Entities are living objects, in ECS runtime. Two worlds need two reference mechanisms.

```mermaid
graph TB
    subgraph DesignTime["Design-Time World"]
        IN["<b>In.Being&lt;T&gt;()</b><br/>Compile-time token<br/>Points to Being in Knowledge"]
        KB["Knowledge<br/><i>Immutable database</i>"]
        IN -->|"query"| KB
    end

    subgraph Runtime["Runtime World"]
        REF["<b>Ref&lt;TConcept&gt;</b><br/>Runtime reference<br/>Stored on entity components"]
        ENT["Entity<br/><i>Component bag</i>"]
        REF -->|"stored on"| ENT
        REF -.->|"points back to"| KB
    end

    style IN fill:#4a90d9,color:#fff
    style REF fill:#e8a838,color:#fff
    style KB fill:#50b86c,color:#fff
    style ENT fill:#d9d9d9,color:#333
```

### 5.1 `In.Being<T>()` — Compile-Time Token

The only way to point to a Being in Knowledge. Wrong name = compile error.

**Rule:** Never store in a variable. Never pass through a method. Never compare at runtime. Use only at the call-site when querying Knowledge.

### 5.2 `Ref<TConcept>` — Runtime Reference

When a living entity needs to point to design data, use `Ref<TConcept>` — a concept-scoped pointer into Knowledge.

- `Ref<State>` — which state the entity is currently in
- `Ref<Sensor>` — which sensor is being queried
- `Ref<Effect>` — which effect to trigger on death

Scoped by Concept → compile-time safety: `Ref<State>` can only query Aspects that `State` reveals.

**No `Ref<Player>`. No `Ref<Bat>`.** Identity by **role**, not by **name**.

---

## 6. ECS — Abstract Store

**Why:** MonoGame, BEPU, Silk.NET are infra libraries — systems call them via `IFrameSystem`. But ECS is different: it's the **runtime substrate** — every system runs on it. Fantasia does not provide an ECS API. It doesn't know whether Arch, Friflo, or Flecs.NET is being used.

```mermaid
flowchart LR
    subgraph Declaration["Consumer Declaration (once)"]
        D["ECSRegistry.Declare&lt;ArchWorld&gt;<br/>look: store.Get<br/>grant: store.Set<br/>create: store.Create<br/>destroy: store.Destroy"]
    end

    subgraph SourceGen["Source Gen"]
        SG["Emit typed extension methods"]
    end

    subgraph GameCode["Game Code — Ubiquitous"]
        GC["entity.Look&lt;HealthPool&gt;()<br/>entity.Grant(new Velocity(...))"]
    end

    D --> SG --> GC

    style D fill:#e8a838,color:#fff
    style SG fill:#4a90d9,color:#fff
    style GC fill:#50b86c,color:#fff
```

### 6.1 Declaration — Semantics First

The consumer registers typed handlers — no strings, no reflection. `Look`, `Grant` — the consumer names the operations. This is **ubiquitous language** for ECS, just as ABC is ubiquitous language for game data.

### 6.2 Source Gen → Typed API

Source gen reads the declaration → emits extension methods. Game code uses `Look<T>`, `Grant<T>`. Switch from Arch to Friflo → change the declaration, game code untouched.

### 6.3 Why Not an Interface?

An interface (`IECSStore`) would force every ECS engine into the same shape. Wrong — each engine has a different API surface. Declaration lets the consumer **map** semantics onto a specific API; source gen emits a typed bridge. No runtime dispatch.

---

## 7. World — Execution Boundary

**Why:** Many systems run concurrently. A World is a wall. Gameplay must not touch Render.

```mermaid
graph TB
    subgraph GameplayWorld["GameplayWorld<br/><i>ExecutionGroup.Gameplay</i>"]
        GE["Entities:<br/>HP, Velocity, Knockback,<br/>AI State, StrikeDef"]
    end

    subgraph RenderWorld["RenderWorld<br/><i>ExecutionGroup.PostFrame</i>"]
        RE["Entities:<br/>SpriteProxy,<br/>AnimationState"]
    end

    subgraph AudioWorld["AudioWorld<br/><i>ExecutionGroup.PostFrame</i>"]
        AE["Entities:<br/>AudioCue,<br/>MusicStem"]
    end

    GameplayWorld -->|"SpriteBridge<br/>copy SpriteProxy"| RenderWorld
    GameplayWorld -->|"AudioBridge<br/>copy AudioCue"| AudioWorld

    GameplayWorld -.-|"❌ direct access"| RenderWorld

    style GameplayWorld fill:#4a90d9,color:#fff
    style RenderWorld fill:#50b86c,color:#fff
    style AudioWorld fill:#e8a838,color:#fff
```

### 7.1 Isolation Guarantee

Entity #42 in GameplayWorld ≠ Entity #42 in RenderWorld. Same ID, different world = two completely different objects. Cross-world communication **only** through Bridge (§12).

### 7.2 Why Separate

1. **Parallel rendering** — different databases, no conflicts
2. **Headless testing** — drop RenderWorld + AudioWorld, game logic runs without a GPU
3. **Engine swap** — delete all render systems, replace with new ones, GameplayWorld unchanged

---

## 8. Component — Living State

**Why:** Knowledge is design (immutable). But games need state that changes every frame — HP decreasing, position shifting, knockback decaying. Components are where living state lives.

### 8.1 Three Kinds of Component

```mermaid
graph TB
    subgraph Design["Design-Time<br/>(Knowledge)"]
        KA["Aspect data<br/>HealthPool{4,4}<br/><i>immutable</i>"]
    end

    subgraph Runtime["Runtime<br/>(ECS World)"]
        CA["Aspect as Component<br/>HealthPool{2,4}<br/><i>mutable, copied from Knowledge</i>"]
        RO["Runtime-Only<br/>StateDuration, InputSnapshot<br/><i>no design data</i>"]
        EV["Event<br/>HitEvent, DeathEvent<br/><i>lives 1 frame</i>"]
    end

    Design -->|"Materializer<br/>copies"| CA

    style Design fill:#50b86c,color:#fff
    style CA fill:#4a90d9,color:#fff
    style RO fill:#e8a838,color:#fff
    style EV fill:#d94a4a,color:#fff
```

**Aspect as Component** — same type for Knowledge (immutable) and ECS (mutable). Spawn = copy. Entity lives independently. No sync back.

**Runtime-Only Component** — runtime only: `StateDuration`, `InputSnapshot`, `SlugTimer`. No design data. Declared manually in Domain.

**Event Component** — 1-frame signal: `HitEvent`, `DeathEvent`. `world.Publish<T>()` = **Write** in conflict analysis.

**`Ref<TConcept>` as Component** — entity points to design data. `Ref<State>` = "which state am I in." No `Ref<Player>`.

---

## 9. System — Behavior

**Why:** One system, one job. Source gen scans the body. No boilerplate.

### 9.1 One System, One Sentence

Every system should be expressible as a **single short sentence**:

| System             | One sentence                |
| ------------------ | --------------------------- |
| `FrictionSystem`   | Friction slows things down  |
| `SpeedClampSystem` | Speed cannot exceed maximum |
| `MovementSystem`   | Velocity changes position   |
| `DecisionSystem`   | AI picks the next state     |
| `StrikeSystem`     | Strikes deal damage         |
| `HealthSystem`     | Zero HP means death         |

If you can't say it in one sentence → the system does too much, split it.

### 9.2 Contract

`[FrameSystem(typeof(World))]` + `Run()`. No constructor params. World is the only data bus. Knowledge is read-only context — source gen injects a `_knowledge` field into the partial class automatically.

### 9.3 Auto Reads/Writes Scan

| Call-site                         | Counted as      |
| --------------------------------- | --------------- |
| `entity.Look<T>()`                | Reads T         |
| `entity.Grant<T>()`               | Writes T        |
| `world.Publish<T>()`              | Writes T        |
| `_knowledge.Of<>()` / `About<>()` | **Not counted** |

`Look<T>` / `Grant<T>` must be **closed generic at call-site**. Open-generic helpers → analyzer can't follow → forbidden.

### 9.4 Conflict Analysis → Wave Scheduling

```mermaid
graph LR
    subgraph Wave1["Wave 1 (parallel)"]
        IC["InputCapture<br/><small>W: InputSnapshot</small>"]
        FR["Friction<br/><small>W: Velocity</small>"]
        DC["Decision<br/><small>W: Ref&lt;State&gt;, StateDuration</small>"]
    end

    subgraph Wave2["Wave 2"]
        SC["SpeedClamp<br/><small>W: Velocity</small>"]
    end

    subgraph Wave3["Wave 3 (parallel)"]
        MV["Movement<br/><small>W: WorldPosition</small>"]
        KB["KnockbackDecay<br/><small>W: Knockback</small>"]
    end

    subgraph Wave4["Wave 4"]
        OD["OverlapDetection<br/><small>W: HitEvent</small>"]
    end

    subgraph Wave5["Wave 5 (sequential)"]
        ST["Strike<br/><small>R: HitEvent → W: HealthPool</small>"]
        HE["Health<br/><small>R: HealthPool → W: DeathEvent</small>"]
    end

    FR -->|"WAW: Velocity"| SC
    SC -->|"RAW: Velocity"| MV
    MV -->|"RAW: WorldPosition"| OD
    OD -->|"RAW: HitEvent"| ST
    ST -->|"RAW: HealthPool"| HE

    style Wave1 fill:#e8f4e8,stroke:#50b86c
    style Wave2 fill:#fff3e0,stroke:#e8a838
    style Wave3 fill:#e8f4e8,stroke:#50b86c
    style Wave4 fill:#fff3e0,stroke:#e8a838
    style Wave5 fill:#fde8e8,stroke:#d94a4a
```

| Conflict   | Condition              | Consequence   |
| ---------- | ---------------------- | ------------- |
| RAW        | A writes X, B reads X  | B waits for A |
| WAW        | A writes X, B writes X | Sequential    |
| WAR        | A reads X, B writes X  | B waits for A |
| No overlap | R/W sets disjoint      | Parallel      |

**Waves are decided by source gen.** Developers don't edit them. `[RunAfter]` only for rare tie-breaks — must include a comment explaining why. Cycles → compile error.

---

## 10. StateEngine — The Decision Primitive

**Why:** Action games need AI. Naive approach: FSM in code, one file per state, transition logic scattered everywhere. Adding a state = adding code. Designers can't do it themselves. We need a shared primitive that's data-driven and can express multiple AI paradigms.

### 10.1 Primitive Aspects — Not Locked to One AI Pattern

The aspects `StateLinks`, `Desirability`, and `StateGroup` are **building blocks**. Designers compose them to express different AI models:

```mermaid
graph TB
    subgraph Primitives["Primitive Aspects"]
        SL["<b>StateLinks</b><br/>Graph edges: State → State<br/>Each edge has a Gate (conditions)"]
        DS["<b>Desirability</b><br/>Priority + Sensor weights<br/>Score = Priority + Σ(sensor × weight)"]
        SG["<b>StateGroup</b><br/>Set of viable states<br/>Default state, priority tier"]
    end

    subgraph Patterns["AI Patterns (same primitives, different data)"]
        FSM["<b>FSM</b><br/>Links + Gates (conditions only)<br/>Hard graph, no weights"]
        UA["<b>Utility AI</b><br/>Desirability (priority + weights)<br/>Score-based ranking"]
        BLEND["<b>FSM × Utility</b><br/>Gate filters viable states<br/>Desirability ranks them"]
        GOAP["<b>GOAP-style</b><br/>Links as chained goals<br/>Desirability as cost heuristic"]
    end

    SL --> FSM
    DS --> UA
    SL --> BLEND
    DS --> BLEND
    SL --> GOAP
    DS --> GOAP

    style Primitives fill:#e8f4e8,stroke:#50b86c
    style FSM fill:#4a90d9,color:#fff
    style UA fill:#e8a838,color:#fff
    style BLEND fill:#9b59b6,color:#fff
    style GOAP fill:#d94a4a,color:#fff
```

One `StateEngine.Evaluate`. One `DecisionSystem`. Different data. Designers choose the pattern through JSON composition — not through code.

### 10.2 Evaluation Flow

```mermaid
flowchart TB
    START["Current State"] --> LINKS["Iterate Links<br/>from current state"]
    LINKS --> GATE{"Gate<br/>evaluation"}

    GATE -->|"All (AND)"| CHECK["Compare sensor values<br/>against thresholds"]
    GATE -->|"Any (OR)"| CHECK
    GATE -->|"None (NOT)"| CHECK

    CHECK --> HYST{"Currently in<br/>target state?"}
    HYST -->|"Yes + ExitValue"| EXIT["Use ExitValue<br/>(hysteresis zone)"]
    HYST -->|"No"| NORMAL["Use Value"]

    EXIT --> PASS{"Passes gate?"}
    NORMAL --> PASS

    PASS -->|"No"| SKIP["Skip link"]
    PASS -->|"Yes"| SCORE["Compute score:<br/>Priority + Σ(sensor × weight)"]

    SCORE --> PICK["Highest score wins"]
    SKIP --> NEXT["Next link"]
    NEXT --> GATE

    PICK --> RESULT{"Different from<br/>current state?"}
    RESULT -->|"Yes"| TRANSITION["Transition<br/>Reset StateDuration"]
    RESULT -->|"No"| KEEP["Stay"]

    style START fill:#4a90d9,color:#fff
    style TRANSITION fill:#50b86c,color:#fff
    style KEEP fill:#e8a838,color:#fff
```

`StateEngine.Evaluate` is a **pure function**. No side effects. Deterministic.

### 10.3 Authoring in JSON

For example, in a game with enemy AI:

```
Enemy_Idle:
  → Enemy_Wander when timer > 2s
  → Enemy_Chase when distance < 80px

Enemy_Chase:
  → Enemy_Wander when distance > 120px (exit: 100px — hysteresis)
  Desirability: priority 2, distance × -0.01 (closer → higher score)
```

Adding a state = adding a JSON entry. **No C# changes.** DecisionSystem is written once, generic for all AI in the game.

---

## 11. Sensor — Perception

**Why:** StateEngine needs floats. World state isn't a float. Sensors bridge the gap.

```mermaid
flowchart LR
    subgraph World["Runtime World State"]
        HP["HealthPool{2,4}"]
        SD["StateDuration{3.5}"]
        WP["WorldPosition{40,60}"]
    end

    subgraph Sensors["Sensor Providers"]
        S1["S_HealthPercent<br/><small>[SensorProvider]</small><br/>→ 0.5"]
        S2["S_StateTimer<br/><small>[SensorProvider]</small><br/>→ 3.5"]
        S3["S_Distance<br/><small>[SensorProvider]</small><br/>→ 72.1"]
    end

    subgraph Dispatch["SensorDispatch<br/><small>(Generated)</small>"]
        DT["sensor ID → direct static call<br/>No dictionary, no virtual"]
    end

    subgraph Engine["StateEngine.Evaluate"]
        SE["Pure function<br/>Reads float values<br/>Returns Ref&lt;State&gt;"]
    end

    HP --> S1
    SD --> S2
    WP --> S3
    S1 --> DT
    S2 --> DT
    S3 --> DT
    DT --> SE

    style World fill:#4a90d9,color:#fff
    style Sensors fill:#e8a838,color:#fff
    style Dispatch fill:#50b86c,color:#fff
    style Engine fill:#9b59b6,color:#fff
```

### 11.1 Static Method — Zero Virtual Call

Sensor = Being (has ID) + static method → float. No state. No interface. Source gen emits dispatch: sensor ID → direct static call. JIT can inline.

### 11.2 Game vs Infra Sensors

Sensor providers live in whichever project matches what they **read**:

- `HealthPercentSensor` reads a game component → `Prototype.Game`
- `DistanceSensor` needs spatial queries → `Prototype.Infrastructure`

Game code only knows sensor values exist. It doesn't know how they're computed.

### 11.3 Extension

1. Declare a Being: `"S_Stamina": { "$Sensor": {} }`
2. Write a static method + `[SensorProvider]`
3. Rebuild → dispatch table adds the branch automatically. No other code changes.

---

## 12. Bridge — Cross-World Sync

**Why:** Worlds are isolated (§7). Gameplay knows where entities are. Render needs to know to draw them. Bridges copy data across worlds at defined sync points.

```mermaid
sequenceDiagram
    participant GW as GameplayWorld
    participant BR as SpriteBridge
    participant BUF as Shadow Buffer
    participant RW as RenderWorld

    Note over GW: Waves 1..N complete
    GW->>GW: Flush()

    GW->>BR: Read WorldPosition, Orientation,<br/>DepthLayer, Ref<State>
    BR->>BR: Synthesize → SpriteProxy
    BR->>BUF: Write to shadow store
    BUF->>RW: Commit

    Note over RW: PostFrame tick
    RW->>RW: SpriteRenderSystem<br/>reads SpriteProxy, draws
```

### 12.1 Explicit Reads/Writes

Bridges **differ** from game systems: they use **explicit `[Reads]` `[Writes]`** instead of auto-scan. Reason: bridges cross world boundaries; body scanning alone cannot express "reads from which world, writes to which world."

### 12.2 Entity Linking — `Counterpart<Entity>`

Spawn in GameplayWorld → automatically creates a counterpart in RenderWorld via `Counterpart<Entity>`. Destroy → counterpart is also destroyed.

### 12.3 Minimum Surface Area

Bridges don't copy individual components. They **synthesize** a struct serving the target world:

```
SpriteProxy = {
    Position   ← WorldPosition.Value
    Direction  ← Orientation.Value
    Depth      ← DepthLayer.Layer
    StateRef   ← Ref<State>
}
```

RenderWorld only knows `SpriteProxy`. It doesn't know `Velocity`, `HealthPool`, or `Knockback`. The target world receives exactly and only what it needs.

### 12.4 Double Buffer at Barrier

Gameplay flushes → bridge writes to shadow store → PostFrame reads committed data. The target world always receives a consistent snapshot.

### 12.5 Bridges Are Infra

Bridges live in `Prototype.Infrastructure`. Game code doesn't know they exist.

---

## 13. Materializer — Bringing Entities to Life

**Why:** A Being is a blueprint (Knowledge). An entity is a living object (ECS). The Materializer turns blueprints into reality.

```mermaid
sequenceDiagram
    participant K as Knowledge
    participant M as Materializer
    participant W as GameplayWorld
    participant E as Entity

    M->>W: Create entity
    W-->>E: Entity #42

    M->>K: Of<Mobile, WorldPosition>(Player)
    K-->>M: {160, 120}
    M->>E: Grant(WorldPosition{160, 120})

    M->>K: Of<Combatant, HealthPool>(Player)
    K-->>M: {4, 4}
    M->>E: Grant(HealthPool{4, 4})

    M->>K: Of<Striker, StrikeDef>(Player)
    K-->>M: {Dmg:1, KB:150, Dur:0.2}
    M->>E: Grant(StrikeDef{...})

    Note over M,E: Runtime-only components
    M->>E: Grant(Velocity{0,0})
    M->>E: Grant(Ref<State>.For<Player_Idle>())
    M->>E: Grant(StateDuration{0})

    Note over E: Entity #42 lives independently<br/>Knowledge unchanged
```

### 13.1 Copy Semantics

Materializer copies Knowledge → ECS components. After that, the entity lives **independently**: buffing its MaxSpeed doesn't change Knowledge. Another entity spawned from the same Being still gets the original values.

**Knowledge → copy → Component. One-way. No sync back.**

---

## 14. Frame Pipeline

**Why:** Games need rhythm. Input before gameplay. Physics needs a fixed step. Render last.

### 14.1 Execution Groups

| Order | Group       | Purpose                      | Tick rate     |
| ----- | ----------- | ---------------------------- | ------------- |
| 1     | PreFrame    | Input capture, platform sync | Variable      |
| 2     | FixedUpdate | Physics                      | Fixed (1/60s) |
| 3     | Gameplay    | Game logic                   | Variable      |
| 4     | PostFrame   | Rendering, audio, UI         | Variable      |

**Group is an architectural barrier.** Designer decides the frame phases.  
**Wave is a compiler barrier.** Source gen infers from R/W analysis.  
Two different layers.

### 14.2 Tick Pipeline

```mermaid
sequenceDiagram
    participant P as Platform Loop
    participant S as GeneratedScheduler
    participant GW as GameplayWorld
    participant B as Bridges
    participant RW as RenderWorld
    participant AW as AudioWorld

    P->>S: Tick(dt)

    rect rgb(230, 245, 230)
        Note over S: ── PreFrame ──
        S->>S: Execute(PreFrame)
    end

    rect rgb(255, 243, 224)
        Note over S: ── FixedUpdate ──
        loop accumulator ≥ 1/60s
            S->>S: Execute(FixedUpdate, 1/60)
        end
    end

    rect rgb(224, 236, 255)
        Note over S: ── Gameplay ──
        S->>GW: Wave 1 (parallel): Input, Friction, Decision
        S->>GW: Wave 2: SpeedClamp
        S->>GW: Wave 3 (parallel): Movement, KnockbackDecay
        S->>GW: Wave 4: Overlap
        S->>GW: Wave 5: Strike → Health
        GW->>GW: Flush()
        S->>B: Sync(GameplayWorld)
        B->>RW: SpriteProxy (double-buffered)
        B->>AW: AudioCue (double-buffered)
    end

    rect rgb(253, 232, 232)
        Note over S: ── PostFrame ──
        S->>RW: SpriteRenderSystem
        RW->>RW: FlushAndRender()
        S->>AW: AudioPlaybackSystem
    end

    S->>S: EventBus.Flush()
    S-->>P: return
```

### 14.3 Generated Scheduler & Host

**GeneratedScheduler** — source gen reads `[World]`, `[FrameSystem]`, `[Bridge]`, `[SensorProvider]` → emits system instantiation, Knowledge injection, wave execution, bridge execution, flush logic.

**GameHost** — also generated from attributes. The consumer only sets up the pipeline + ECS registration + platform loop:

```csharp
var knowledge = new Pipeline(new RegistrySet())
    .AddSource("Core", new JsonDataLoader(), "Data/")
    .Run(out var diagnostics);

ECSRegistry.Declare<ArchWorld>(look: ..., grant: ...);

while (running) {
    var dt = Platform.GetDeltaTime();
    GameHost.Tick(dt);           // static — generated
    Platform.SwapBuffers();
}
```

---

## 15. Project Topology

```mermaid
graph TD
    subgraph Consumer["Prototype (Consumer)"]
        INFRA["<b>Prototype.Infrastructure</b><br/>──────────<br/>MonoGame · Arch<br/>ECS registration<br/>InputCapture · OverlapDetection<br/>SpriteRender · Bridges<br/>Sensors (spatial)"]
        GAME["<b>Prototype.Game</b><br/>──────────<br/>Zero infra terms<br/>Friction · Movement · Decision<br/>Strike · Health · Knockback<br/>Sensors (game-only)"]
        DOMAIN["<b>Prototype.Domain</b><br/>──────────<br/>ABC only<br/>Worlds · Events<br/>Runtime components<br/>JSON data files"]
    end

    subgraph Framework["Fantasia (Framework)"]
        FCORE["Fantasia.Core<br/>Fantasia.Universe<br/>Fantasia.Catalyst<br/>Fantasia.Domain<br/>Fantasia.Pipeline<br/>Fantasia.SourceGen"]
    end

    INFRA --> GAME --> DOMAIN
    DOMAIN --> FCORE
    INFRA -.->|"MonoGame, Arch"| EXT["External Libs"]

    style INFRA fill:#d94a4a,color:#fff
    style GAME fill:#4a90d9,color:#fff
    style DOMAIN fill:#50b86c,color:#fff
    style FCORE fill:#e8a838,color:#fff
```

**Dependency rule:** `Prototype.Game` must not reference MonoGame, Arch, or any hardware library. If the NuGet dependency graph contains them → build break.

### Systems Reference

**Game layer:**

| System           | Reads (scan)                | Writes (scan)               |
| ---------------- | --------------------------- | --------------------------- |
| FrictionSystem   | Velocity, MovementProfile   | Velocity                    |
| SpeedClampSystem | Velocity, MovementProfile   | Velocity                    |
| MovementSystem   | WorldPosition, Velocity     | WorldPosition               |
| DecisionSystem   | Ref\<State\>, StateDuration | Ref\<State\>, StateDuration |
| StrikeSystem     | HitEvent                    | HealthPool                  |
| PushApartSystem  | WorldPosition, SpaceClaim   | Velocity                    |
| LifespanSystem   | StaggerTimer, SlugTimer     | StaggerTimer, SlugTimer     |

**Infra layer:**

| System                 | Reads (scan)                            | Writes (scan) |
| ---------------------- | --------------------------------------- | ------------- |
| InputCaptureSystem     | (hardware)                              | InputSnapshot |
| OverlapDetectionSystem | WorldPosition, StrikeDef, Vulnerability | HitEvent      |
| CameraSystem           | WorldPosition                           | CameraState   |

**Bridges:**

| Bridge       | Route             | Data                                                          |
| ------------ | ----------------- | ------------------------------------------------------------- |
| SpriteBridge | Gameplay → Render | WorldPosition, Orientation, Depth, Ref\<State\> → SpriteProxy |
| AudioBridge  | Gameplay → Audio  | DeathEvent, HitEvent → AudioCue                               |

> Reads/Writes in these tables are illustrative. Ground truth is the scan of `Run()` body.

---

## 16. Invariants

No exceptions. No "it depends."

**1 · ABC is the only language.**  
Everything in the game is a Being. Every Being has Concepts. Every Concept reveals Aspects.

**2 · `In.Being<T>()` — never store, never runtime.**  
The only way to point to a Being in Knowledge.

**3 · Game code doesn't know specific Being names.**  
Only `Ref<State>`, `Ref<Effect>`, `Ref<Sensor>`. No `Ref<Player>`.

**4 · Game code contains no infra terms.**  
No `Collider`, `Hitbox`, `Sprite`, `Render`, `Audio`, `GPU`.

**5 · Knowledge is immutable.**  
`Of` is lensed, `About` is root. Materializer copies. No sync back.

**6 · An entity is a component bag.**  
It does not carry Being identity. It does not know "I am Player."

**7 · ECS is an abstract store.**  
Consumer declares semantics. Fantasia doesn't know what Arch is.

**8 · Ubiquitous language is the API name.**  
`Look<T>`, `Grant<T>`. Consumer names them.

**9 · Systems don't write `[Reads]` `[Writes]`.**  
Source gen scans the body. `Look<T>` = Read. `Grant<T>` = Write. Knowledge access is not a Read.

**10 · Group is an architectural barrier. Wave is a compiler barrier.**

**11 · Sensors are static. Source gen dispatches.**

**12 · Bridges use explicit `[Reads]` `[Writes]`.**  
Unlike game systems. Bridges are infra.

**13 · StateEngine is a pure function.**  
Same primitive aspects, different data → FSM, UA, GOAP. Adding a state = adding JSON.

**14 · GeneratedScheduler and GameHost — devs don't edit.**

**15 · Zero reflection. Zero DI. Zero runtime discovery.**

---

_Architecture is a set of constraints. Constraints give freedom. Freedom gives games._
