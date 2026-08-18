---
author: FM39hz
pubDatetime: 2025-07-07
modDatetime: 2026-08-19
title: My thoughts about Games
featured: false
draft: true
tags:
  - game-dev
  - rambling

description: Just some scattered thoughts, from my own biased perspective.
---

This piece isn’t a guide on how to make a *better* game, nor a manifesto on what counts as a *successful*, *fun*, or *great* one. Those are different questions, belonging to different layers.

Its only purpose is to stimulate thought and help game developers understand the thing they are creating before they decide what else they want it to become.

## Table of contents

## Misconceptions and Associations

Sometimes, while developing games on my own, I catch myself returning to the same irritating question. There are plenty of things people call games, and yet something in my intuition keeps insisting that a few of them are less... game than they appear to be. So what actually makes a game become itself?

- **Graphics, story, world-building?** Painting, literature, comics, and film already know what to do with those.
- **Flow, pacing, music?** A concert, a film, or a stage performance can be constituted through all three.
- **Progression, competition, goals?** Too generic. Careers, arguments, education, sports, and exercise can organize themselves around them perfectly well.
- **Interaction?** A light switch is interactive. A DVD menu is interactive. Replacing a movie’s play/pause button with an upward push on the controller did not turn it into a game.
- **Mechanics?** Closer, but not yet. A Rule is a logical relation; a mechanic is one expression of that relation. One Rule may be expressed through many mechanics, and two mechanics that look nothing alike may still instantiate the same Rule under a declared comparison.

None of these things is worthless. They may enter a game, dominate it, or become the entire reason anyone cares about it. But they can already constitute forms and activities whose identities do not depend on gameness. A story does not wait for a controller to become a story. Music does not need a skill tree before it becomes music.

Strip those layers away and they may remain intact as themselves. They do not yet explain what gameness adds.

So, what makes a game... a game?

## If it’s none of those, then what the heck is a game?

I am not trying to decide which products deserve the label. I am asking something smaller: **what must already be structurally present before anything else can be built upon the game?**

My answer is a necessary condition:

> **A rule-constituted Possibility Space admitting a finite role set whose alternative contributions can
> yield inspectably different continuations at a reachable transition point.**

That sentence is dense, so here is the useful version of every part.

### Rules make the space

A Rule distinguishes what may occur from what may not, what follows from what, who may contribute, and which differences the configured form can recognize.

The **Possibility Space** is everything reachable under those Rules from an admitted beginning. It is not an infinity of neutral game-states later restricted by Rules. The Rules constitute which States and transitions exist as possibilities of this particular form.

A **State** is not every bit stored in memory, every property visible on screen, or every detail a designer wrote in a document. Two configurations are one State when no inspection admitted by the Rules can tell them apart. If a difference can affect what the Rules disclose, what they permit, or what may happen later, it belongs to the State. If nothing in the form can ever inspect it, the distinction is idle, however impressive it looks in a debugger.

This also settles a recurring argument about granularity. You do not freely choose how granular the State is. The Rules choose. Merge two configurations that the Rules distinguish and the model contradicts the form. Split two configurations that nothing can distinguish and the extra detail does no work.

### Running it draws one line

A configured form may sit unoperated while its Possibility Space remains exactly what it is. When an instance begins, it actualizes one ordered **Trajectory** through that space.

The Possibility Space may branch, loop, and contain counterfactual continuations. The Trajectory already committed does not branch retroactively. At each transition window, one admitted continuation becomes the next settled part of its history.

The window is logical, not a duration on a clock. It is simply a place in the order where something was still open and then became committed. Turns, frames, network ticks, referee rulings, spoken declarations, and physical moves may all provide such boundaries. Their material form is not the point; settlement is.

### Agency is not the presence of an input

At a transition window, a source may be bound to a role. The source could be a person, several people producing one joint output, an animal, or an autonomous process. What kind of thing it is does not decide whether it has Agency.

The condition is this:

> Hold every other contribution fixed. If the source has two contributions available at the same
> window, and substituting one for the other produces continuations that the Rules can distinguish
> at some finite depth, the source bears **Agency** there.

Every qualification matters.

- **Available** means authorized by the role and admitted in the current State. The source need not know which hidden State it occupies before supplying one; an intervention may be a guess.
- **Hold everything else fixed** prevents one source from receiving credit for a difference produced by somebody else.
- **The Rules can distinguish** means the difference is operational, not merely a label, animation, or gesture introduced by the infrastructure and invisible to every admitted inspection.
- **At some finite depth** allows a consequence to appear later instead of demanding that the next State look different.
- **There** keeps Agency local. A source is not intrinsically an Agent; it is an Agent through a particular binding at a particular window.

The least depth at which the difference becomes detectable is its **latency**. If no finite inspection ever separates the two branching continuations, latency is infinite and there is no Agency at that window. The infrastructure may briefly animate two paths, but if no admitted inspection distinguishes their branching continuations, the display alone establishes no Agency.

Agency can also be collective. Two roles may be unable to change anything individually while two joint contributions, such as $(0,0)$ and $(1,1)$, produce different continuations. Looking only for an individually decisive player would miss ordinary coordination Rules.

### Branching is not choosing

A form may branch without anybody bearing Agency. Randomness internal to a transition can change which branch becomes actual even though no bound source supplies the difference. That is a chance node, not a decision node.

Conversely, an Agent may have Agency without informed control. If the Rules conceal which State the role occupies, two available contributions may genuinely lead somewhere different while the source cannot condition its contribution on which hidden State is actual. The difference it makes is real; the intervention is simply a guess rather than an informed choice.

So interaction, branching, choosing, guessing, and Agency are not synonyms. A useful model has to be able to keep them apart.

## So what does that settle?

Several arguments that used to eat entire design discussions become smaller once the distinctions above are in place.

**Mechanics are not Rules.** A mechanic is an expression through controls, timing, presentation, or procedure. A Rule is the relation being expressed. Two mechanics share a Rule only relative to a declared projection: which distinctions are being compared and which are being discarded. Without naming that projection, “these are the same mechanic” and “these are completely different” may both be correct and neither speaker has said enough.

**Material is invisible to the condition.** Wood, silicon, paper, human speech, and an elaborate engine may realize the same configured form when they preserve its States, authority, disclosure, and transitions. Changing the machine does not revive a dead stretch or kill a live one unless the Rules changed with it.

**Disclosure is a Rule.** Showing a role information the Rules previously withheld changes $\operatorname{obs}$ and therefore realizes a different configured form. It may alter what the occupant can distinguish or use in an informed policy; it does not, merely by itself, add a locally admitted contribution.

**An input may be ceremonial.** Buttons, dialogue wheels, and selectable animations do not establish Agency by existing. Ask whether varying the bound contribution alone produces a continuation the form can eventually distinguish.

**Agency is distributed.** The condition claims only that a game has Agency support *somewhere*. It does not spread that support across every reachable State-and-role situation merely because those situations shipped in the same box. One product may contain long dead stretches, many supported State-and-role situations inside a tactical system, and a single rare intervention whose consequence reorganizes everything after it.

This is the structural fact sometimes compressed into “less game,” but the phrase is only shorthand. What the condition actually locates is where Agency is and is not supported. That line does not have to run between products; it can run inside one.

## Why does the condition only point one way?

The condition is necessary, not sufficient:

> Every game has non-empty Agency support. Not everything with such support is thereby declared a game.

The usual response is to offer an object that satisfies the condition but does not *feel* like a game, then patch the definition until it excludes that object. I do not think the patch is free. It normally smuggles in a goal, preference, intention, cultural category, or expected experience, each belonging to another relation.

Attach a goal and you can distinguish a choice someone prefers from a branch nobody values. But a goal may belong to the Rules, a designer, an observer, or the person occupying a role. Those are not interchangeable. Putting all of them into gameness would make the same configured form stop and start being a game whenever its occupant changed their mind.

Purpose still has useful places to live:

- As part of the Rules, where winning conditions, payoffs, and goal-directed transitions are constituted by the form.
- As a projection used to compare two forms with respect to what they steer toward.
- As a way to classify forms that already satisfy the necessary condition: goal-directed, open, competitive, cooperative, and so on.
- At the experiential layer, where people bring motives, interpretations, and values that the form itself does not contain.

None of those places is inferior. They are simply answers to different questions.

## Three consequences I care about

### No structurally “wrong” play remains

If an action lies inside the Possibility Space constituted by the Rules, it cannot be wrong in the sense of being outside the game.

It may be strategically awful. It may annoy everyone else. It may violate an agreement that was never part of the Rules. It may expose a design mistake. None of those judgments reaches backward and removes the action from the Possibility Space.

“The designer did not expect that” is not a Rule. Neither does calling something an *exploit* remove it from the Possibility Space. If stacking three Quartz lets a mage deal one million physical damage, then the configured form admitted it. If that action was never meant to belong to the game, do not accuse the player of choosing the wrong possibility. Look at the Rules that made it possible.

The reverse follows by the same reasoning. Tuning three Quartz contributes system depth only where the resulting distinctions change what the form admits, discloses, or can later inspect. If every arrangement returns to the same continuation and changes only a number that no Rule reads, the surrounding apparatus is presenting a distinction rather than constituting one. It may still be a satisfying evening in the equipment menu. Maybe it is not quite as deep as the menu would like you to think.

### A Trajectory is not its endpoint

The endpoint of a bounded Trajectory is merely its last committed State. It need not be a dead end, a game ending, or the moment credits appear.

A **Session** is an interval opened and closed by infrastructure. A **Run** is a bounded cycle the Rules recognize. One Session may contain several Runs, and one Run may persist across several Sessions. A **terminal State** is different from both: the Rules admit no move out of it.

Two Trajectories can arrive at the same State. When they do, they have exactly the same future available. If some later transition can consult how they arrived, that history is part of the current State, so they never arrived at the same State in the first place.

This is the precise core of the complaint “my choices did not matter.” Sometimes it is wrong: two Trajectories may reach the same final boss and still differ everywhere that led there. A shared destination does not retroactively flatten the journey.

Sometimes the complaint is exactly right. The form may permit three answers, disclose three carefully written responses, and fold all of them back into the same State before the next transition. Agency was present at the window where the contribution changed the disclosed response. Its consequence simply ended there. Consequences have a shelf life, and the Rules set it.

Nor does displaying a different ending settle how far the difference reaches. If the Rules select and disclose a different ending, then the endpoints are different States even if nothing follows them; the distinction is structurally real at the endpoint. What it does not have, unless some later transition can inspect it, is any further causal reach. And if the difference exists only in the infrastructure and is not disclosed by the Rules, then it remains presentation. It may be a considerably more artistic ending. It is not, for that reason alone, a more consequential one.

### Agency is distributed

Concrete Agency at one window says nothing by itself about structural support at other State-and-role situations, or about how long the resulting State distinction survives.

A product may have many supported State-and-role situations inside one subsystem, none inside another, a few on its configuration surface, and one intervention whose resulting distinction survives much farther than the rest. Shipping those regions together does not cause Agency to pass from one to another.

A thousand inputs that immediately return to the same corridor may fail to establish Agency at any of those windows, while one intervention that permanently changes what becomes reachable may establish it at its own. Asking for confirmation along a predetermined stretch does not alter the stretch. Multiplying the surfaces on which a number may be adjusted does not establish depth by census. Input count, branch count, system count, and duration do not measure the same thing.

The reverse is just as easy to miss. One intervention that changes which actions remain admissible may establish Agency where an entire configuration surface devoted to making numbers larger does not. One contribution whose consequence remains encoded in later States may reach farther than fifty branches that merge before anything else can read them.

This gives designers two better questions:

1. Where in the reachable form does Agency exist at all?
2. After it occurs, does the resulting distinction remain encoded in later States, and where does it cease to be?

The second question is not latency. Latency asks how soon two branching continuations first become distinguishable. Evaluating persistence would require rebasing the comparison at later States and declaring how counterfactual paths, and, under non-determinism, their outcomes are paired. The formal article defines latency and supplies no canonical numeric measure of persistence.

Why should *more game* and *less game* be praise and insult in the first place? Is that even a roast?

## Some Thought Experiments

I will leave the answers unwritten. The point is to notice which relation each question changes.

- Suppose humanity goes extinct, leaving only a complete rulebook for **chess**. Does chess still exist when nobody operates it? If aliens find only a wooden set and invent different Rules, are they playing chess? If they instead find the rulebook and make granite pieces, what changed?
- Four fish swim in a tank while sensors turn their movements into controls for **Pokémon Sapphire**, and eventually the game is beaten. Does *Pokémon* stop being a game because the inputs came from fish? Must the source understand or intend its intervention before the continuation can be attributed to it?
- The ball enters the net. No player is offside, yet the referee disallows the goal and VAR is not consulted. Do the Rules authorize the referee only to discover what happened, or to make a ruling that becomes operative even when the judgment is wrong? Does adding VAR change the Rules or the infrastructure through which settlement is reached?
- Six children play by Rules they made together. Child A scores with an admitted move. The group then changes the Rule before child B repeats it. Does the new Rule erase the earlier transition? What configured form is operating after the change?

## On the Player Side

Everything above concerns the configured form. The player’s experience is another relation.

An observer’s response does not rewrite the Rules, rebuild the Possibility Space, or alter the Trajectory that already occurred. The same person may be both observer and Agent, but these are different capacities. Their interpretation as an observer does not alter the Trajectory; an intervention admitted through their role may.

That does not make experience unimportant. It is often the entire reason anyone cares about the thing. Meaning may arise through Rules, presentation, context, memory, culture, and the observer. One person may find a Trajectory heroic, offensive, boring, sacred, cruel, hilarious, or empty; another may encounter the same sequence differently. Neither response reaches backward and changes which transitions occurred.

Knowledge also does not merge with Agency. A player may learn the whole Possibility Space and lose all discovery while retaining every intervention that can still produce a different continuation. Another may understand almost nothing and nevertheless bear Agency at a particular binding and window. Knowing, discovering, choosing, guessing, and altering are different relations.

Call a player **saturated with respect to a configured form** when that player has come to know the whole Possibility Space: every reachable State and everything admitted at each one. Nothing in that space can arrive as a new possibility to that player anymore.

Saturation is not the same as solving the game. Solving is a claim relative to an objective and a standard of play, usually that an optimal outcome or strategy has been settled. Saturation is an epistemic relation between one player and the whole Possibility Space, so two people operating the same form may differ on it while the Rules remain unchanged. Nor does saturation let anyone see through concealment. What fills up is the map of the Possibility Space, not the observations disclosed to a role at the State it currently occupies.

Most importantly, saturation removes no Agency. Knowing the branching continuations an intervention admits does not merge them or stop a different contribution from making a different branching continuation operative. A saturated player has exhausted discovery, not thereby lost any Agency they bear at a particular binding and window.

Saturation is relative to the configured form. Revising the Rules produces a form $G'$ whose Possibility Space may differ, so knowledge sufficient for $G$ need not saturate $G'$. A Rule mutation already admitted by $G$ does not by itself break saturation with respect to $G$: its possible results were already part of the space the player was said to know.

A designer can construct conditions of experience through Rules, presentation, information, rewards, punishments, and consequences. The designer cannot complete the experience on the player’s behalf. There is no checkbox for mandatory interpretation, however convenient it would be.

Plot, messaging, and story do not clash with games. If they participate in the operating Trajectory, they become operational through States, Rules, and consequences. If they remain presentation, they remain presentation. Neither position makes them inferior; it tells us what job they are doing.

Adapting a film or novel into a game is therefore not merely a matter of distributing the play button across a shooting gallery, an axe-throwing segment, three yellow-painted ledges, and a giant pipe-shaped hallway hiding a loading screen. The material has to be reconstructed into a configured form capable of operating as a game. It might still become a wonderful artistic product; the button prompts simply do not establish Agency by themselves.

> Just respect the intelligence and stature of the player, just as I respect you, and you respect me, alright?

## Conclusion

We do not need to settle every possible definition before taking one step closer to the thing itself. We only need to stop mixing every layer together.

Before trying to make a game fun, moving, groundbreaking, artistic, addictive, or commercially successful, make sure the part expected to operate as a game at least satisfies the structural condition gamehood cannot do without. Then build everything else upon it.

Recreating an imagination is not a matter of drawing a map, throwing a story and a mountain of content into it, then adding button prompts. If it has to become a game, it has to be reconstructed, at minimum, through Rules, States, a Possibility Space through which an operating instance can commit a Trajectory, and structural Agency support, you know, all the bullshit I have been rambling about above.

I am not trying to provide every answer. I am trying to make the question precise enough that the next answer has somewhere solid to stand. If this essay leaves you checking where an input truly changes a continuation, how long that difference survives, and which layer a design claim belongs to, then it has done what I wanted.
