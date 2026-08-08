---
author: FM39hz
pubDatetime: 2025-07-07
modDatetime: 2026-08-08
title: My thoughts about Games
featured: false
draft: false
tags:
  - game-dev
  - rambling

description: Just some scattered thoughts, from my own biased perspective.
---

This piece isn’t a guide on how to make a _better_ game, nor a manifesto on what counts as a _successful_, _fun_, or _great_ one. Those are different questions, belonging to different layers.

Its only purpose is to think about the thing itself. Before we judge a game, improve it, decorate it, sell it, or explain how it makes us feel, perhaps we should first ask what makes a game become itself.

## Table of contents

## Misconceptions and Associations

Sometimes, while developing games on my own, I catch myself returning to the same irritating question: what actually makes a game... a game?

- **Graphics, story, world-building?** Painting, literature, comics, and film can all do those, often better.
- **Flow, pacing, music?** A concert, a film, or a stage performance can carry all three.
- **Progression, competition, goals?** Too generic. Careers, arguments, education, and exercise can contain them.
- **Interaction?** A light switch is interactive. A DVD menu is interactive. Replacing a play button with forward input still does not tell us what makes a game itself.
- **Mechanics?** We first have to distinguish mechanics from _rules_. A rule is a pure logical relation. A mechanic is one expression of that relation. One rule may be expressed through many mechanics, and two things that look nothing alike may still instantiate the same rule. A pawn moving one square and a cannon in Chinese Chess jumping over a piece to capture do not share an animation, theme, or physical motion, but both consume one turn.

None of those things are worthless. They simply cannot be the root, because the root must still be there when all replaceable expressions have been stripped away.

So, what makes a game... a game?

## If it’s none of those, then what the heck is a game?

To answer that, we have to stop asking what games commonly _contain_ and ask what makes a game stand as itself beneath everything attached to it.

This is not a taxonomy. I am not trying to build a border and sort products into “game” and “non-game.” I am asking only one question: **what makes a game become the game itself?**

Perhaps the answer is not a “magic circle,” a “storytelling machine,” “interesting choices,” “meaningful interaction,” or any other description built from experience, value, or observation. Those may describe what someone does with a game, what someone receives from it, or what someone hopes it will become. They do not yet describe the thing itself.

Whether we are talking about a modern digital game, a board game, a playground game, or something that existed before computers, I think we need to distinguish at least two questions: a **Necessary Condition** and a **Sufficient Condition**.

### Necessary Condition

In my opinion, a game must at least satisfy this:

> **A rule-constituted possibility space whose operating trajectory can be altered by one or more Agents at a traceable transition moment,** $\Delta t$**.**

Every word there matters.

A **possibility space** is the totality of what the system can become or perform under its rules. It is not a measure of size, depth, richness, freedom, meaning, or anything else. It is only that space.

If $R$ is the structure of rules, then we may write:

$$
\Omega_R = \{\tau \mid \tau \text{ is a trajectory permitted by } R\}
$$

The rules do not arrive after some neutral infinity of possibilities and cut it down. Rules **constitute** the possibility space. Without rules, there is no game-state, no legal transition, no action, no before and after, and therefore no trajectory belonging to the game.

A game-instance actualizes one trajectory inside that space:

$$
\tau^* \in \Omega_R
$$

An **Agent** is an autonomous entity to which the possibility space provides **Agency**: the permitted capacity to intervene in the system’s operation and thereby alter its trajectory. Agency is not an intrinsic power carried into the game by the Agent, and the Agent does not author the choices available to it. The rules constitute the possibility space; the possibility space provides Agency; the Agent acts through that Agency.

It does not matter whether the Agent is a player, an adaptive AI, a referee, a DM, or a game manager. What matters is that the system provides it with an operational capacity to affect the trajectory, rather than merely using it as another expression of predetermined clockwork.

A trap swinging on a timer is not an Agent. An NPC walking a predefined loop is not an Agent. A random number generator is not automatically an Agent. Those are clockwork: rules expressing themselves through time. Randomness may change which transition occurs, but unpredictability alone is not agency.

A DM is not a “meta-agent” standing outside the game. A DM is an Agent with a particular mapping function: receiving a declaration or situation, applying the rules and the parameterized authority granted to that role, then publishing a ruling or fact that the system recognizes. The same applies to referees and game managers. Different Agents perform different operations, but none stands above the rules.

If a DM is permitted to set a difficulty, interpret an action, resolve a consequence, materialize a Being, or map an unresolved situation into an operational fact, then each of those capacities is Agency provided by the possibility space. The DM does not invent the available operations. The rules constitute the mapping role, what it may receive, what it may produce, and where its intervention may alter the trajectory.

No Agent stands above the rules. Not the player. Not the AI. Not the designer after play has begun. Not the DM.

The traceable $\Delta t$ does not mean that every game must run continuously in “real time.” It means there is an identifiable boundary at which an action is accepted and the trajectory changes. It may be a frame, a fixed tick, a turn, an action resolution, or a referee’s ruling. There must be a before, an intervention, and an after that can in principle be traced.

Agency is therefore not “the Agent’s collection of choices.” It is a relation between an Agent and the possibility space that provides the Agent with a permitted capacity of intervention. For an Agent $\alpha$ at state $s_t$, we may write that provided capacity as:

$$
\Gamma_{\Omega_R}(\alpha,s_t)
$$

For the necessary condition to be satisfied, there must exist an intervention $\gamma$ provided through that relation whose application can alter the operating trajectory at a traceable boundary:

$$
\exists\;\alpha,s_t,\gamma\in\Gamma_{\Omega_R}(\alpha,s_t):
\operatorname{Continue}_R(s_t,\gamma)\neq\operatorname{Continue}_R(s_t)
$$

The Agent does not decide what the available choices are. The rules constitute them as possibilities, and the possibility space provides the corresponding Agency. The Agent only acts through what has been provided. Whether the resulting difference is exciting, visible, valuable, strategic, or emotionally important is irrelevant here. Those are later questions.

From this condition, we can derive a few consequences.

#### Consequence 1: no structurally “wrong” play remains inside the rules

> **If an action lies within the possibility space constituted by the rules, it cannot be wrong in the sense of being outside the game.**

It may be strategically poor. It may annoy the other players. It may violate an agreement that is not part of the game being examined. It may expose a design mistake. But if the system recognizes the action as valid, then “the designer did not expect that” does not retroactively make it illegal.

If you do not want an action to belong to the game, the answer is not to accuse the Agent of actualizing the wrong possibility. The answer is to examine the rules that constituted that possibility in the first place.

#### Consequence 2: gamehood is neutral

> **A game, considered only as a game, has no inherent moral attribute, experience, message, or social meaning.**

This does not mean a product cannot communicate, that rules cannot encode assumptions, or that a player cannot experience something powerful. It means none of those observations determines whether the underlying system is a game.

Meaning belongs to a relation between rules, presentation, context, and an observer. What a game is cannot depend on a property that changes whenever the observer changes. The possibility space does not care what anyone thinks of it. It contains every trajectory the rules constitute.

#### Consequence 3: the destination of a trajectory is not the trajectory itself

> **A game requires neither an open-ended structure nor multiple story endings. An ending is only a state reached by operation; it is not the operation itself.**

Two trajectories may arrive at the same state without becoming the same trajectory:

$$
\operatorname{End}(\tau_i)=\operatorname{End}(\tau_j)
\;\not\Rightarrow\;
\tau_i=\tau_j
$$

The story may have one ending. A fact may remain fixed. An event may always occur. None of this prevents the possibility space from providing Agents with Agency to alter the operating trajectory through which those states are reached.

Story endings have no privileged place in this condition. They are states like any other. Agency does not require authority over the ending, authorship of the plot, or ownership of the destination. It requires only the capacity provided by the possibility space to alter operation at a traceable $\Delta t$.

For the same reason, an open-ended structure does not provide anything special here, and a branching story does not answer what makes a game itself. The totality of possibility is not the number of endings, just as a trajectory is not the point at which it stops.

Story does not conflict with this. Plot, dialogue, authored events, and fixed outcomes may participate directly in the game when they are expressed through rules, states, facts, and consequences. They may also remain presentation. Their importance is not in question; only their relation to operation is.

A marked ledge, a corridor, a compulsory gesture, or any similar device should therefore be examined in the same way as everything else. If the possibility space provides Agency through it, then it participates in the operating trajectory. If the input merely permits an already determined operation to continue, then it is only carrying that operation forward. The distinction has nothing to do with how open the structure appears or how many endings wait beyond it.

A fixed destination can receive altered trajectories. A variable destination can be reached through predetermined operation. Neither linearity nor branching determines the relation. Only Rules, Possibility Space, Agency, and the traceable alteration of trajectory do.

### Sufficient Condition

> **This falls outside the scope of this article, because it belongs to a different question.**

A sufficient condition would be useful if the goal were to construct a complete definition, draw a boundary, or classify everything that may or may not be called a game. That is not what I am doing here. I do not need a taxonomy to ask what makes a game itself.

“All rules must be parameterizable” does not answer that question either. It is an architectural demand, something to discuss when we ask how the game should be expressed and preserved in software. It is not the root being examined here.

Many confuse the noun _game_ with the act of _playing_: the moment we feel animated, absorbed, challenged, moved, or conscious of our own action. That is the experience of playing. It may surround the game, arise through it, or become the entire reason someone cares about it, but it still does not tell us what the game itself is.

The same is true of plot, dialogue, authored sequences, cinematic presentation, shooting segments, axe-throwing, yellow-painted ledges, or a giant pipe-shaped hallway hiding a loading screen. I am not interested in using those things to decide which shelf a product belongs on. I am saying only that none of them, by itself, answers the question.

To make the root easier to grasp, let us return to a few thought experiments.

## Some Thought Experiments

- Think about **chess**. If humanity went extinct and only the rulebook remained, would chess still exist? The structure of rules and its possibility space would remain describable, even though no match—no actualized trajectory—would be taking place. If aliens found the wooden pieces and invented different rules, they would have created another game-form using the same infrastructure. If they found the rules and carved the pieces out of granite, the material would change while the game-form remained.
- A **piece of music** by Beethoven is discovered after sitting unheard in a drawer for hundreds of years. Was it not music until someone heard it? Beethoven’s deafness does not change whether the composition is music. Observation and experience are not identical to the existence of the form being observed.
- A fish swims in a tank while sensors translate its position into inputs for **Pokémon Fire Red**. Does _Pokémon_ cease to be a game because the Agent is a fish? If the fish’s movement is mapped into actions capable of altering the trajectory, the identity of the Agent does not revoke the structure of the game.
- The ball enters the net, no player is offside, but the linesman raises the flag and the referee denies the goal. The referee is a mapping Agent whose ruling becomes an operational fact only through the authority constituted by the rules. The interesting question is not whether the referee stands above football—no one does—but whether that ruling belongs to the mapping authority of the game-form being played, or whether the actualized trajectory has departed from it.
- In a **D&D** session, a DM grants player A two turns to compensate for falling behind. The DM does not become a meta-agent by doing so. Either that mapping lies within the authority and rules of the game-instance, or the session has begun operating under a different rule configuration. “The DM decided it” does not place that decision above the rules.
- Six children play under self-made rules. Child A scores through a valid action. When child B attempts the same action, the group changes the rules to prevent it. If rule mutation is itself governed by an existing procedure, then the change is a valid transition of the system. If not, they have stopped actualizing the original game-form and begun another. At no point does anyone need to stand above rules; there is only the question of which rules constitute the current possibility space.

## On the Player Side

Once the game itself has been separated from the experience of playing it, we can finally discuss the player without forcing the player’s feelings to define the object.

A player may find a trajectory heroic, offensive, boring, sacred, cruel, hilarious, or meaningless. Another player may experience the same sequence differently. Neither response reaches backward through time and rewrites whether the system was a game.

Suppose a designer wants to discourage eating dog meat and constructs the product around that message, while allowing pork because it is treated as “normal.” A Muslim player may encounter the same rules from an entirely different moral and cultural position. The rule structure is the same; the relation to it is not.

This is why design intent cannot own the final experience. The designer may parameterize rules, presentation, information, rewards, and consequences, but cannot parameterize the observer into having one mandatory interpretation.

And no, plot, messaging, and story do not clash with games. They simply cannot replace the root. If they participate in changing the possibility space, they must become operational through rules. If they remain presentation, then they remain presentation. Neither position makes them inferior; it only tells us what they are doing.

> Just respect the intelligence and stature of the player, just as I respect you, and you respect me, alright?

## Conclusion

In reality, perhaps we do not yet need an absolutely complete definition. We need to stop confusing incompleteness with permission to mix every layer together.

Before trying to make a game fun, moving, groundbreaking, marketable, artistic, addictive, competitive, or profound, begin from the thing that makes it itself: rules constituting a possibility space, that possibility space providing Agents with Agency to alter its operating trajectory, and a traceable $\Delta t$ at which that alteration occurs.

Then build everything else upon it.

Adapting a film or novel into a game is not merely a matter of replacing scene transitions with corridors and button prompts. The material must be reconstructed as possibility, rule, Agency, and trajectory, because those are the terms through which a game becomes itself.

I am not constructing a taxonomy, nor claiming the final definition of game. I am trying to move one step closer to the root without borrowing “fun,” “meaning,” or “experience” to cover the gaps.

If you make games to tell a deep story, become a millionaire, prove a technical point, or show off, perhaps this article is not what you are looking for. But if you want to understand the thing you are passionate about before deciding what to do with it, I hope this gives you a perspective worth arguing with.
