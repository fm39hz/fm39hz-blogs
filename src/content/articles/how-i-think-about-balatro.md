---
author: FM39hz
pubDatetime: 2026-11-05
modDatetime: 2026-11-05
title: How I Think About Balatro
featured: false
draft: true
tags:
  - game-dev
  - balatro

description: Pay a respect for LocalThunk's masterpiece

---

I've spent a fair amount of time asking what a game is, then what an architecture has to preserve to carry one. Those ideas are easier to hold while they sit above a diagram. Give one card an effect on another, and the diagram has a few more questions to answer.

This time I want to put those ideas to work on Balatro. I'll use Fantasia, a framework I made for my own experiments. What interests me here is the path from the game I can play to the relations I need to model.

LocalThunk created such a masterpiece, yet his code for it is quite messy. But, the game's the game, so I'll try to modeling it as how i see it.

## Table of contents

## Why Balatro?

A card adds Chips. A Joker counts cards left in the deck. Another changes Mult. A seal makes a card score again. Each rule is simple enough to remember. Put them in the same Run, let the player change their order and conditions, and keeping track of what follows gets considerably less simple.

That's why I picked Balatro. Its rules are small enough to examine on their own, and they meet often enough to make their interactions worth examining. If I need a special explanation every time two familiar effects meet, I probably haven't separated their meanings as well as I thought.

## What I see when I play

A Run starts with a deck, resources, and a set of conditions. I select cards to play or discard, try to meet a Blind's score target, then use what the game gives me to change my chances in later Rounds. Cards move, gain properties, enter or leave ownership. Jokers change quantities and permissions. Money and consumables let me change those relationships between plays.

There is a useful distinction hiding in that description. A card can enter Hand without entering Run ownership, because I might already own it. A card can be played once and score several times. A Joker can count cards currently in Draw while another grows from cards that entered ownership earlier. The screen shows numbers changing, but those numbers do not all come from the same kind of event.

I want a model that can explain those differences and follow their consequences. I am describing the game as I understand it, not claiming that every outcome has been checked against the original Lua. Where I deliberately normalize behavior, I will say so.

## How I pull a rule apart

I start with what the game says or does, then try to state the relation behind it. If a Joker counts cards, which cards? If it reads a quantity, whose quantity is it and when does it read it? If an effect happens again, did I play another card, play another hand, or apply the same effect another time?

The answer gives me more than a calculation. It identifies the participants, the data they supply, the conditions under which the relation applies, and the result it establishes. When another rule uses that result, the connection has to preserve its origin and scope. Two values being numbers, or even having the same type, does not make them operands of the same application.

I also separate the definition of a thing from its life in a Run. A card's authored rate, its current bonus, the number of cards now in Draw, and the result of one scoring application have different owners and lifetimes. Putting them all into one convenient object does not make those distinctions go away. It just makes the next rule guess.

I'll use my own framework to express the model. The framework gives me a place to put those meanings, but the questions come from Balatro. Blue Joker is simple enough to start with.

## What does Blue Joker count?

Blue Joker contributes Chips based on the number of cards left in Draw. Under its ordinary rate, 23 cards give 46 Chips. I can write the calculation as:

```csharp
public static void ContributeChips(
    in ChipRate rate,
    in CardCount observed,
    out Chips contribution)
    => contribution = rate * observed;
```

That line needs a Chips-per-card rate and a card count. It does not tell me which Run to look at, which area to count, or which Play receives the result. Those belong to the application around it:

| Position | Meaning in this application |
| --- | --- |
| Source and carrier | The eligible ability and the card carrying it |
| Provider | The source of the applicable rate, which may differ under delegation |
| Run and population | This Run's complete Draw population |
| Reading boundary | The point at which that population is counted |
| Recipient | The Chips calculation for the same Play |

The authored design identifies a Draw reading relative to the Run. The running instance supplies the actual Run and area, and the observation counts their members at the declared boundary. The applicable provider supplies the rate. Only after those positions are connected do the operands reach the multiplication.

Blue Joker's ordinary contribution requires a positive Draw count. An empty population is a valid reading of zero, but the contribution domain is inactive. That differs from producing a zero contribution if another rule can observe whether an application occurred. A missing population is different again: it is a missing input, not an empty deck.

I don't need to maintain a separate bonus every time a card moves. The contribution is derived from the rate and the population at the boundary where it matters. A count of owned cards or cards in Hand would answer a different question.

### Where do those values live?

I keep immutable design in **Knowledge** and represented running truth in a World's **Configuration**. A local result can remain inside one resolution when nothing later needs it. A value that can affect a later choice or Play needs a place to persist.

In my setup, a **Being** is an authored thing, a card definition or a Sensor for example. A **Concept** is a view that promises its **Aspects**, the design positions or structures needed by that view. Claiming a Concept supplies every Aspect it promises. A missing position is not a zero waiting to be filled in.

Blue Joker's ordinary rate can be read from design if the configured game does not let it change. A mutable rate needs an initialized instance value instead. Its current Draw count is an observation, not a parameter that happens to change. The 46 Chips are the result of a particular application. A reference to the rate in Knowledge still has to be connected to the correct value before the computation can use it.

The running facts can be ordinary ECS components:

```csharp
public readonly record struct Ownership(Subject Owner);
public readonly record struct Location(Subject Area, BigInteger Ordinal);
public readonly record struct PermanentBonus(Chips Value);
```

A **Subject** identifies a running participant within its World. Several cards can share a definition without sharing their current values. The backend's entity handle represents a Subject in storage, but game laws use the identity and relations the model gives them.

## When the game changes a value

Blue Joker reads a population. Hologram changes a retained factor. Its ordinary factor starts at 1 and grows by 0.25 for each qualifying playing card that actually enters Run ownership. Two such entries in one cohort give:

```text
factor_after = factor_before + 0.25 × 2
```

The count belongs to the acquisition or creation result that produced those entries. A later scoring relation reads the provider's current factor and multiplies Mult. Growth and scoring are different applications which meet through that retained value.

Receiving a card from the Shop can count as entry even when the card already had a Subject in the same World. Drawing a card I already own does not. Initial composition does not grow Hologram from the starting deck, and restoring a saved Run does not apply the growth again. If I only watch for backend entity allocation, I have already chosen the wrong boundary.

Hiker changes a different participant. It adds 5 permanent Chips to a scoring card after that pass has read the card's intrinsic contribution. Start with a 7 and no bonus: two passes read 7 and 12 Chips, then leave a permanent bonus of 10. The first pass cannot retroactively receive the bonus it just caused. Hologram grows its provider's factor, while Hiker changes the recipient card. The addition is similar, but the owner of the result is not.

Blueprint gives me another distinction. It delegates an eligible application to a provider on its right. The forwarded scoring application can read that provider's current factor without making a copy of it on Blueprint. Provider, emitter, carrier, and recipient remain separate positions. Permission to forward a scoring contribution does not automatically authorize every mutation owned by the provider. A delegation route also retains its conditions and needs a finite traversal policy.

## Which cards make the hand, and which cards score?

The player supplies a complete selection. Admission checks its members, ownership, source area, permissions, bounds, and cost. Silently filtering an invalid card out would change the request. Once admitted, the selection retains Hand order for the rules that need it.

Recognition can find several Patterns in that selection. A Full House contains a Pair, so a Joker may read Pair presence even though Full House is the selected Pattern. The model keeps three results apart:

1. The Patterns present and the cards witnessing them.
2. The Pattern and witness selected for the play's base value.
3. The cards that actually participate in scoring.

A **witness** retains the members establishing a Pattern. If several witnesses are possible, their selection and precedence need a policy. A compound Pattern also needs to say how its parts' witnesses combine. Stone or Splash can expand scoring membership without changing what the base witness proves. Royal Flush is a qualifying Straight Flush reading, not a separate progression.

Four Fingers changes the applicable thresholds. Shortcut changes permitted gaps. Smeared and Wild change suit membership under their respective conditions. These effects alter operands or relations used by recognition, so the recognition rule does not need to recognize each Joker by name. Rank, face status, suit membership, and intrinsic Chips also remain different readings: J, Q, and K can each give 10 Chips without becoming the same rank.

Take an ordinary level-1 Pair with `7♥, 7♠, K♣`. The player played three cards, but the Pair's two sevens are the scoring members:

```text
Chips = 10 + 7 + 7 = 24
Mult  = 2
Score = floor(24 × 2) = 48
```

A permission to score the King changes membership. Retriggering a seven adds applications without adding another played card or spending another Hand. Those distinctions matter to the rules that read history, as well as to the score.

## When does a rule read?

Ordering can change the answer even when all the values belong to the same Play. Start with Mult 4, add 4, then multiply by 2 and the result is 16. Multiply first and add afterward, and it is 12. Source order or another declared relation has to settle that direction. Backend iteration and registration order do not get to choose it for the game.

A value may also have several versions within the ordered scoring region. Suppose Money is captured at $4 after the relevant pre-scoring consequences, and To Do List earns $4 before Bull applies. Bull reads $8 at its position, while Vagabond and the Chips-by-Money cap read the earlier $4 capture. Final Money is $8. A display of the income does not make a second payment.

The same question appears with cards. DNA may add a Steel copy to Hand after a Steel tally was captured at Play entry. The copy can participate in a later held-card domain without changing that earlier tally. Midas before Vampire may replace an enhancement with Gold and then have it consumed, while Vampire before Midas may leave Gold behind.

A snapshot of everything at entry loses some of those changes. Always reading the latest value loses some earlier facts. Each relation needs the boundary its meaning calls for.

Repetition needs its own domain as well. A scoring pass has a participant, an ordinal, eligible sources, and captured inputs. Some repeat allowances are prepared before the first pass, while others depend on an initial result. The resulting iteration needs a finite carrier, bounded extension, or another declared termination meaning. A played-card occurrence, a Play, and a scoring pass still feed different histories.

## How many effects does one King produce?

Baron, Mime, and a Red-sealed Steel King make that last distinction harder to ignore. Assume all their relevant capabilities are available. Steel supplies a factor of 1.5 while held. Baron supplies another factor of 1.5 for the held King. The Red Seal supplies one extra held-card pass, and Mime supplies another because the initial held-effects result is nonempty.

```text
Held-card passes = 1 base + 1 Red Seal + 1 Mime = 3
Factors per pass = 1 Steel + 1 Baron = 2
Combined factor  = (1.5 × 1.5)³ = 1.5⁶ = 11.390625
```

One held card produced three passes and six multiplicative contributions. It was not played three times. Mime adds its allowance to the prepared pass domain rather than doubling an already-expanded count. Under that same preparation policy, another eligible Mime adds an allowance without recursively repeating the other Mime's calculation.

I need to preserve the initial effects result that justifies the allowance, the finite pass domain, and each source's contributions within a pass. A single `TriggerCount` field would conceal which of those things it counts.

This also tells me when the power notation is legitimate. It summarizes repeated multiplication for this example because the participating factors stay fixed. If a pass changes a later operand, I have to retain those intermediate values and their order. Numeric association still belongs to the realization contract.

The same held card can have terminal-Round effects, but those belong to another domain. An allowance that applies there does not reuse the scoring result as if the two occasions were one occurrence. I need an ordered application domain with a stated allowance producer. A general instruction to call every effect again whenever something says "retrigger" would lose that distinction.

## What happens when a card changes or stops working?

Enhancements, editions, seals, and stickers can carry different meanings on the same card. An inhibition therefore identifies its cause, bearer, and capability. Several causes may inhibit one capability, and removing one does not remove the others. A Joker can lose a scoring contribution while its Negative edition continues to grant a slot through possession.

Face-down limits Disclosure. It does not automatically erase rank or suit, and disabling a Blind does not automatically return cards or Money already lost. A reversal needs the relation and captured values that justify it. Capacity has its own rules too: losing a grant can leave an area above capacity, while a later receipt is checked under its own admission relation.

Identity matters when cards move or change. Moving a card between areas retains its Subject and unchanged ownership. Receiving an existing same-World card changes possession and placement. Creating or cloning establishes a fresh life, while copying properties onto an existing target retains that target's identity. Regenerating from a definition uses the specified design and initialization policy. Death, Cryptid, and The Fool therefore cannot all be reduced to one whole-object copy.

For one complete population application I can compare entering, ending, and retained members. The boundary matters: entries and removals within a Play cannot always be replaced by the net difference between its beginning and end. Two removal proposals for one card do not create two actual terminations. Two Trading Cards may each pay for a qualifying discard while the victim ends once, whereas Sixth Sense uses a first-qualifying-source policy for its reward.

Glass makes the distinction between a trial and an outcome visible. The trial can retain its draw even when another source proposes removal. In this model, growth based on shatter reads the actual shatter outcome, including a qualifying removal by another source. A request that produces no shatter supplies no growth. This is a deliberate normalization: some original Lua paths notify observers before setting the shatter marker and use consumable-specific workarounds, so those outcomes can differ.

## What happens between plays?

A purchase brings together a captured quote, payment authority, an account, credit policy, ownership, and placement. The candidate has to satisfy those conditions together. I don't want to commit the payment and only then discover that the item cannot be received. A coupon can waive payment while retaining the priced basis used by sale. Removal is a sale only when the sale relation applies.

Rerolls have a free allowance, a paid-price basis, and progression after paid rolls. A zero price basis does not grant unlimited free allowance. A Voucher can replace a quantity or provide a standing policy, so later quotes read the changed truth. A valid reorder can leave the order unchanged and still be an occurrence. Structural difference and operation presence are separate results.

Using a consumable also needs an exact source and complete target choices. An untargeted use has an explicitly empty target domain. Accepted use, source consumption, and the actual effect remain distinct: a failed chance trial need not refuse the use, and a suppressed effect does not invent a successful replacement. Sigil's shared random suit is one choice for the Hand, not a separate draw for every card.

A Pack owns its options, quota, and Return context. An admitted choice originating from that Pack spends its quota. Using a consumable already in inventory while the Pack is open does not acquire that origin. Skip and quota exhaustion can both close the Pack, but they remain different outcomes. Tags likewise carry permissions whose consumption and resulting grants are distinct.

Generating an offer needs an eligible definition population, availability, bans, duplicate policy, weights, constraints, and entropy. An earlier selection can change the population for the next one. A random draw supplies both a value and a continuation for the next draw. Reading its result does not draw again, and two procedures with the same distribution can have different seeded continuations when they consume draws in a different order.

## Why can Perkeo and Observatory become so strong?

Perkeo creates a Negative copy of a possessed consumable when leaving the Shop. Observatory lets each eligible possessed Planet contribute a factor of 1.5 when that Planet maps to the selected hand type. The Planet stays in inventory. Scoring neither consumes it nor performs its ordinary level-up use.

For `n` matching Planets, with one eligible Observatory contribution per instance:

```text
Observatory factor = 1.5ⁿ
```

Perkeo changes the owned population. Observatory grants participation to members of that population. A consumable can now be a scoring source without becoming a Joker or passing through a second scoring engine.

Redeeming Observatory does not edit the Planet definitions in Knowledge. The Run's redeemed evidence or standing permission is live truth. The contribution domain becomes applicable where that permission meets a possessed Planet with the matching hand relation. I do not need to copy a new behavior onto every Planet and remove it later.

The copy retains the selected consumable's declared current-state footprint, receives a fresh Subject, and has its edition replaced with Negative. Receipt establishes its owner and placement. Its Negative right contributes to consumable capacity. Starting at two occupied slots with a basis of two, one admitted Negative copy can produce three members and an effective limit of three. The right and the incoming member belong to the same receipt candidate.

I cannot represent that as "increase the inventory limit forever, then create a card". If the Negative card later leaves possession, its standing right ends too. By contrast, Antimatter's ordinary redemption increases the Joker-capacity basis by one. A lasting basis change and a right supported by current possession can produce the same displayed number while behaving differently afterward.

The selected copy source also needs a reading boundary. Perkeo chooses from the consumables available when its copy relation reads them. Multiple copy applications cannot silently share a Shop-entry snapshot if an earlier copy can affect a later choice. Nor should a new copy automatically join a source roster already captured elsewhere.

Finally, Observatory matches the **selected** Pattern, not every Pattern present in the played selection. A Full House containing a Pair does not make a Pair-mapped Planet eligible for that Play's Observatory contribution. Each possessed matching instance contributes separately. Deduplicating definitions would discard the very copies Perkeo produced.

That gives me a path through source selection, copying, edition replacement, receipt, capacity, and scoring participation. None of those relations needs a special Perkeo-Observatory branch.

## What does Retcon actually remove?

Director's Cut permits a paid Boss replacement once per Ante under the corresponding schedule allowance. Retcon removes that once-per-Ante restriction. It does not remove the ordinary $10 payment, choose the Boss for the player, or turn an old offer into the newly selected one.

I can separate the admission conditions:

```text
Payment: balance_after = balance_before − quoted_cost
Affordability: balance_after stays above the applicable credit floor
Permission: this Run may replace this active scheduled Boss offer
Frequency: unused allowance OR the policy waiving that restriction
```

After admission, the old scheduled offer is replaced by a draw from the eligible Boss population. The new offer is a particular schedule member. A stale choice of the old offer is no longer valid even if the two draws happen to select the same Blind definition.

The ordinary frequency memory belongs to the current Ante/schedule scope and resets at its renewal. Decreasing Ante numerically does not by itself renew that scope. Retcon bypasses that frequency condition, while the other conditions and consequences retain their meaning.

Each constraint states what it requires, and a policy alters the one it affects. Neither an invented infinite counter nor an "ignore all validation" flag tells me that. A free Boss-replacement grant can share the replacement relation while supplying a different payment entitlement.

## Where can the Run go next?

The current context determines which choices and continuations are available. Blind selection, an active Round, settlement, Shop, Pack, victory choice, and loss are different contexts. A Shop visit is a particular occurrence, not `Current = Shop` checked again on every host frame. Stock generation, visit-local reroll state, and Return need that occurrence.

I use a **Sensor** to describe a typed reading from declared facts at a boundary. A count, a remaining-Hand test, or Pattern presence can be used inside a **Decision**, whose authored topology identifies the current position, candidate group, permitted links, eligibility, ordering, and selection policy. Selecting a continuation and establishing its consequences are separate relations. An internal reading does not automatically become information disclosed to the player.

After a Play, the target and remaining budget determine whether terminal resolution is required. A continuing Round has its own refill and draw guard. Outside the Tarot and Spectral Pack contexts, the native draw-failure condition involves both a nonpositive held-card limit and an empty Hand. An exhausted draw pile alone does not establish loss. An admitted loss outcome also does not roll the Play back or imply that every terminal-Round consequence occurred.

The ordinary Blind progression goes from Small to Big to Boss. A permitted skip advances progression and grants its benefit without producing a won Round. A qualifying surviving Boss outcome at Ante 8 establishes victory. Endless continues the Run with that evidence retained. Reducing Ante alone does not select a new Boss schedule, and leaving the host to resume later does not close the trajectory.

## What survives a Round?

Terminal consequences have their own participants, order, and multiplicity. Survival, held-card effects, exhaustion, and rental obligations cannot all be inferred from one win flag. A source ending during its own application does not erase an obligation already bound to that application.

Payout lines form a settlement separate from owned Money. Under the ordinary policy, unused Hands grant $1 each and interest grants $1 per $5 held, up to $5. If direct terminal income changes Money from $4 to $7 while an unclaimed settlement contains another $2, the specified interest reading uses $7. The settlement enters Money when it is claimed, together with the once-only claimed fact.

The **Profile** owns persistent records such as usage, discovery, unlocks, and completion. They can have different mode guards. A higher-tier win can provide lower-tier completion evidence without creating extra historical wins. A **Bridge** can transfer authorized settled values between the Run's World and the Profile's World without carrying a live Subject or backend handle across that boundary.

A save retains what can still affect the future: identities and order, current values, operative history, pending permissions, Pack options and quota, unclaimed settlement, and entropy continuation. Restore starts from that truth. It does not replay startup grants, gameplay births, or growth. A local accumulator used only within an atomic resolution need not become a persistent object.

## What changes when I bring Cryptid into it?

Cryptid raises a few more questions. I use the defaults in the linked definitions below, though its gamesets can override them.

### Exponentia can observe a calculation

Exponentia starts with exponent 1. Its ordinary growth path adds 0.03 after a handled XMult application whose factor differs from 1. At its main scoring position, it raises Mult to the current exponent.[^exponentia]

Two separate `x2` applications and one `x4` application can leave the same Mult, but they give Exponentia different growth counts. Compressing them loses an observable distinction.

```text
+0.03 per qualifying scale application
Mult_after = Mult_before ^ current_exponent
```

I need the operation's result, origin, and ordinal, with the operand actually handled. An announcement of a trigger or a final Mult difference cannot supply that evidence. Growth before Exponentia's position can change the exponent used there. Later growth cannot rewrite an earlier result.

Multiplication and exponentiation are different relations. Exponentia grows from a qualifying multiplication, so its own power application does not qualify merely because it also changes Mult.

### Light can cross more than one threshold

Light accumulates progress from the other scoring cards in a qualifying application. Its defaults begin with requirement 5, remaining progress 5, and factor 1. Each crossing adds 0.2 to the factor and raises the next requirement by 5. Excess progress carries forward.[^light]

Let `a` be remaining progress, `q` the current requirement, and `d` the incoming count. These are entry captures for this application. Choose the least nonnegative integer `k` such that:

```text
a_after = a − d + kq + 5k(k + 1)/2 > 0
q_after = q + 5k
f_after = f + 0.2k
```

With an enlarged scoring population of 17, there are 16 other cards. Starting from the defaults, two thresholds are crossed: `q_after = 15`, `a_after = 14`, and `f_after = 1.4`.

One occurrence has produced two crossings. The positive-step progression has a finite least solution. Its crossing count feeds three replacements, each still expressible by a one-writer equation. The integer relation defining that count needs to be modeled and lowered. Naming a helper after Light would merely conceal it.

### Old Membership Card needs something outside the Run

Old Membership Card bases its Chips contribution on the Cryptid Discord member count. Its ordinary reading uses one Chip per member, while the balanced variant groups members by eight.[^old-membership-card]

That count is not derivable from the deck, and it is not immutable design. I would give it an explicit Measurement capture. The extraction supplies a complete value, and the law consumes the captured member count. A refresh has a declared boundary, and replay or restore retains the value that was actually used until another capture replaces it.

The origin and boundary determine which count the law receives. An HTTP call inside scoring would hide that dependency. A Discord member and a playing card are also different counted units, even if both use an integer representation.

### Googol Play Card tests the numeric carrier

Googol Play Card ordinarily offers a one-in-eight chance of multiplying Mult by `10¹⁰⁰`.[^googol-play-card] That is still multiplication with a trial. The magnitude alone does not require a new gameplay law.

Multiplying `10²⁵⁰` by `10¹⁰⁰` produces `10³⁵⁰`, which binary64 cannot represent as a finite value. If the form distinguishes such results, silently collapsing them to infinity changes its comparisons and future calculations. Range, rounding, and exponentiation behavior belong to the chosen realization of the semantic quantity. Replacing every value with a universal Number would leave that obligation unresolved.

## What did the examples leave me with?

The examples ask different questions, but the distinctions keep recurring. Blue Joker needs a complete population at a boundary. Hologram needs actual ownership entry. Blueprint needs a provider separate from its emitter. Retcon changes one admission condition, while Perkeo and Observatory meet through possession, a standing permission, and the selected Pattern.

None of those meanings requires a separate entity merely because I have given it a name. Each one does need a position in the model when another relation can read it. A value also needs its unit and owner, an application needs its occurrence and result, and an ordered region needs a finite domain or another explicit settling contract. Otherwise the next calculation has to guess which fact I meant.

My framework takes those declarations and handles the matching, projections, routing, iteration, and writeback that can be derived from them. I still have to supply the game-specific domains, boundaries, and ordering that cannot be inferred. A new card can combine existing meanings through its claims and values. When it introduces a relation the model does not have, I owe that relation its own definition and, where needed, a finite realization.

[^exponentia]: Cryptid, Exponentia definition and scaling hook, [`items/exotic.lua`](https://raw.githubusercontent.com/SpectralPack/Cryptid/main/items/exotic.lua).
[^light]: Cryptid, Light enhancement definition, [`items/misc.lua`](https://raw.githubusercontent.com/SpectralPack/Cryptid/main/items/misc.lua).
[^old-membership-card]: Cryptid, Old Membership Card descriptions, [`localization/en-us.lua`](https://raw.githubusercontent.com/SpectralPack/Cryptid/main/localization/en-us.lua).
[^googol-play-card]: Cryptid, Googol Play Card definition, [`items/epic.lua`](https://raw.githubusercontent.com/SpectralPack/Cryptid/main/items/epic.lua).
