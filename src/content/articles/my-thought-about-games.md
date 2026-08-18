---
author: FM39hz
pubDatetime: 2025-07-07
modDatetime: 2026-08-18
title: My thoughts about Games
featured: false
draft: false
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
- **Interaction?** A light switch is interactive. A DVD menu is interactive. Replacing a play/pause button of a movie with the controller pushing upward did not make that into a game.
- **Mechanics?** Closer, but not yet. We first have to distinguish mechanics from *Rules*. A Rule is a pure logical relation. A mechanic is one expression of that relation. One Rule may be expressed through many mechanics, and two things that look nothing alike may still instantiate the same Rule. In Xiangqi, a pawn advancing one square and a cannon moving in a straight line to leap over a piece and capture share no movement mechanic, yet both consume one turn. Notice that this last sentence only became true once I said *which comparison I was making*. Hold onto that. It turns out to be the whole problem, and it gets settled further down.

None of these things is worthless. They may enter a game, dominate it, or become the entire reason anyone cares about it. But they can already constitute forms and activities whose identities do not depend on gameness. A story does not wait for a controller to become a story. Music does not need a skill tree before it becomes music.

Strip those layers away and they may remain intact as themselves. They do not yet explain what gameness adds.

So, what makes a game... a game?

## If it’s none of those, then what the heck is a game?

This is not an attempt to decide which products deserve that label. I am asking something smaller: **what must already be structurally present before anything else can be built upon the game?**

Perhaps the answer is not a “magic circle,” a “storytelling machine,” “interesting choices,” “meaningful interaction,” or any other phrase assembled from experience, value, or observation. Those may describe what someone does with a game, what someone receives from it, or what someone hopes it will become. They do not yet expose the relation underneath.

### The Necessary Condition

We’ve already separated Mechanics from Rules. Once that distinction has been made, Rules offer a reasonable place to begin. They do not have to be the only possible starting point, they are where this argument first gains enough structure to speak about the others.

A Rule distinguishes what may occur from what may not, what follows from what, and which difference can count as a difference inside the configured form.

So, from that point, we have States as something the Rules produce.

Let a configured form be a structure

$$
G=\langle X,\;A,\;R,\;\operatorname{auth},\;\operatorname{obs},\;\longrightarrow,\;X_0\rangle
$$

where $X$ is a carrier of configurations, anything the form can be in, described as finely as you like, including detail that will turn out to be irrelevant; $A$ is a set of interventions, the contributions that may enter a transition; $R$ is a set of intervention roles, with $\operatorname{auth}(r)\subseteq A$ the interventions role $r$ is authorized to supply and $\operatorname{obs}(r)$ the readings of a configuration the Rules disclose to $r$; $\longrightarrow\;\subseteq\;X\times A\times X$ is the admitted transition relation, written $x\xrightarrow{a}x'$; and $X_0\subseteq X$ are the admitted initial configurations.

$X$ is not the State space. It is deliberately too rich.

And since $\operatorname{obs}$ sits inside $G$, disclosure is a Rule like any other. Concealment is not something done to the Rules. It is one of them.

So when are two configurations the same State?

A form makes two things available. Read what the Rules disclose at a configuration, or make an admitted intervention and then do the same wherever it leads. There is no third way, because only $\operatorname{obs}$ shows anything and only $\longrightarrow$ goes anywhere, while the rest of the tuple is inventory, permission, and where the thing may start. Call either one an *inspection*. Every inspection is finite, since each is built by adding one intervention at a time.

A form discloses to itself whatever it shows to any role, plus which interventions are admitted at a configuration, since a body of Rules that cannot tell what it permits next is not a body of Rules.

Two configurations are then the same State when no inspection separates them, meaning no inspection can return a result at one that it could not return at the other. Write $\sim_G$ for that relation, and $S_G:=X/\sim_G$ for the State space.

$\sim_G$ is the kernel of the inspections $G$ itself admits, so it exists for the same reason any map has a kernel, and it is the coarsest equivalence respecting all of them for the same reason. Put it another way. Each inspection cuts $X$ into the parts it can tell apart, and a State is one cell of the intersection of every such cut. Granularity is not chosen. It is read off what the form discloses and what it permits.

Two properties fall out at once. Configurations of one State admit the same interventions, because what is admitted is itself a disclosed reading. And whatever can be inspected after an intervention was already inspectable before it, so an intervention cannot open a gap that was not there beforehand.

So no inspection can depend on the history that produced a configuration, except through its State.

Take that backwards. Suppose some fact about the past can still change what an inspection returns later. Then two configurations differing only in that fact are separated by that inspection, so they *already are different States*. The fact was never outside the State. It was one of the distinctions the Rules had been drawing all along.

Any distinction finer than $\sim_G$ is infrastructure detail, and any distinction coarser than $\sim_G$ describes a different configured form, or nothing but presentation.

Go finer and you separate configurations that no inspection can tell apart, so dropping the distinction changes nothing the form can do or show. Go coarser and you merge configurations that some inspection does tell apart, so after the merge that inspection both returns a result and does not, and what survives is a different form.

That is the answer to "how granular should my model be?", a question that has wasted more design arguments than it deserves. You do not choose. The Rules choose. Whatever no admitted inspection can reach is not in the State, however loudly it is displayed. Display is infrastructure. Disclosure is a Rule. The reverse case is worse and far more common. A difference you think of as decoration, which some transition quietly reads, is in the State whether you intended it or not.

The configurations reachable from $X_0$ through admitted transitions, read as States, form the Possibility Space $\mathcal P_G$, together with what is admitted at each of them.

This Possibility Space is not freedom, depth, player expression, or a flattering review score. It is simply everything the configured Rules allow the game to become or perform. Rules do not arrive after a neutral infinity of game-states and cut it down; they constitute those States and transitions as possibilities of $G$.

Everything that follows is relative to the $G$ actually declared, and the next two moves are about comparing one declared form with another.

Comparative claims of the form *these two things share a Rule*, or *this system is the same game as that one*, are almost always made about a *part* of a form rather than the whole of it. Let $\pi$ be a projection: a map out of $X$ that keeps a chosen family of distinctions and discards the rest, carrying $\longrightarrow$ along with it to give a projected form $\pi(G)$.

Two forms express the same Rule relative to $\pi$ when $\pi(G_1)$ and $\pi(G_2)$ admit the same inspections, up to a renaming of interventions.

So they can come out the same under one projection and different under another, and both results hold, because each one is only ever talking about the distinctions its own projection kept. There is no sameness sitting outside every projection waiting to be got right. When one person says two things share a Rule and another says they do not, they are usually both correct, and neither has said which projection they meant. The apparent paradox of "same Rule, different mechanic" dissolves the moment $\pi$ is on the table.

Hence the discipline, and I mean it as a rule for myself rather than as advice: never claim that two things share a Rule without naming the projection. An unnamed projection is how the describer settles the answer without having to say so.

Scope settles what a comparison is about. The next question is what a form is running on.

Let infrastructure mean the material, computational, or procedural arrangement through which $G$ can be represented or operated. An infrastructure carries a raw transition structure of its own.

An infrastructure realizes $G$ when its configurations correspond to those of $G$ in a way that matches interventions one for one and preserves every inspection.

Transitions alone would not be enough. A correspondence can leave every transition intact and still reassign who is authorized to act, or who is shown what, and that is not one form running on different material, it is a different form.

So different infrastructures may realize the same $G$, and one infrastructure may support a different $G$ when its Rules or configuration change. Preserving inspections says nothing whatsoever about what the material is. Wood, silicon, paper, and human speech are all invisible to inspection, which can only reach what the Rules disclose and what they admit.

An infrastructure is not yet an operating instance. When an admitted State is actualized through it, an operating instance begins. Let $I$ denote that instance; it commits one ordered Trajectory through $\mathcal P_G$.

The Possibility Space may branch, loop, and admit many counterfactual continuations. The Trajectory already committed does not branch retroactively. Non-linearity belongs to the structure of possible continuations; actualization produces an ordered history.

A Trajectory does not require a built-in ending. It remains an ordered history for as long as the instance continues to operate.

The configured form, the infrastructure through which it is realized, an operating instance, and an observer encountering that instance are different relations. When no instance is operating, no Trajectory is being actualized, but $G$ and its Possibility Space may remain perfectly describable. Observation does not create any of them merely by arriving late to look at them.

Once there is an operating Trajectory, we can ask where an alteration of that Trajectory actually occurs. But to speak of the moment a transition is committed, commits have to be ordered at all.

So take it that $G$ exposes its operation as an ordered sequence of committed transitions. Let $\Delta t_n$ denote the transition window joining $s_n$ to $s_{n+1}$, a logical position in that order and not a measurable duration in physical time, and $\Delta t$ such a window in general.

What I cannot derive is that the commits line up in one discrete order at all. That much I am assuming, and everything below about $\Delta t$, latency, and Agency leans on it.

What it does not mean is a clock, a frame, or a turn counter. A commit is whatever the form treats as settled.

And settlement is the only thing there is to order. A prefix is just the part that is no longer in question, so with nothing settled there is no prefix, and nothing for a continuation to continue from. Measuring does not rescue it, since a form could measure perfectly, settle nothing, and still have no Trajectory to alter. Whatever is still in question is not yet in $\Delta t_{n+1}$. What is being ordered here was never time. It is acknowledgement, and acknowledgement is discrete wherever it happens, because a thing is either still in question or it is not.

At $\Delta t_n$, an admitted intervention $\gamma$ may enter the transition:

$$
s_n\xrightarrow[\Delta t_n]{\gamma}s_{n+1}
$$

To alter the Trajectory is to make a different admitted continuation become actual from the same prefix. It does not mean rewriting a past that has already occurred.

Nothing above guarantees Agency. It gives us a Possibility Space, an operating Trajectory, and a traceable window at which Agency could be expressed. The Necessary Condition proposed here adds that such a relation must exist at least once.

At such a window, $G$ may provide one or more intervention roles. A role specifies which contributions may become operative there and the authority with which they enter operation; it does not identify the concrete source that will supply them.

The operating instance $I$ binds a source, $\alpha$, to such a role through its infrastructure and under whatever eligibility conditions $G$ imposes. A source may be an individual, a collective producing one joint output, or an autonomous process. A committed intervention is attributable to $\alpha$ when it enters through the role to which $\alpha$ is bound. Anything that merely carries or translates that output remains infrastructure in this relation. Where several outputs enter through separate bindings, each binding must be evaluated separately.

Two constraints determine what $\alpha$ can actually reach.

The first is authority: nothing outside $\operatorname{auth}(r)$ for the roles currently bound to $\alpha$.

The second is information. A State is the complete condition of the form. It is not what any one role is shown, and in every form that conceals anything those two come apart.

For a role $r$, let $\approx_r$ be indistinguishability by inspections built from $\operatorname{obs}(r)$ alone. It is coarser than $\sim_G$ exactly when the Rules withhold something from $r$. An intervention available to a source bound to $r$ has to be constant on $\approx_r$-classes, because what cannot be distinguished cannot be conditioned upon.

$\approx_r$ is fixed by $G$ and not by the instance, because concealment is a Rule. Two setups that differ in what a role is shown differ in $\operatorname{obs}$, and $\operatorname{obs}$ is part of $G$. So they are not one form on different hardware. They are two forms. That settles something people usually argue about as taste. Leaking what the Rules withhold is not a presentation bug, it is realizing another form.

Then $\Gamma_{G,I}(\alpha,s_n;\Delta t_n)$ denotes the interventions available to $\alpha$, meaning those authorized by its bound roles, admitted at $s_n$, and constant on the $\approx_r$-classes of those roles.

Without $\approx_r$ there is no way to state the difference between a decision and a guess, and no way to say what hidden information *is*.

Let $\operatorname{Continue}_G(s_n,\gamma;\Delta t_n)$ denote the continuation recognized by $G$ after admitting $\gamma$ there.

When do two continuations count as different? Say they differ when the next State differs, and something breaks immediately, because two interventions can lead to different next States which then fold back together and leave nothing behind. That is not an edge case. It is the most common way a form presents a choice while withholding one.

So stratify by how deep an inspection has to go. Let $\sim^k_G$ be indistinguishability by inspections spending at most $k$ interventions. Going deeper only adds inspections, so each level refines the one before it, $\sim^{k+1}_G\subseteq\sim^k_G$, and since every inspection is finite, $\bigcap_k\sim^k_G=\sim_G$ with nothing further assumed.

Say two continuations differ at depth $k$ when they are not $\sim^k_G$-related, meaning the difference is already detectable within $k$ committed transitions.

If two continuations differ at depth $k$, they differ at every depth beyond $k$, since $\sim^{k+1}_G\subseteq\sim^k_G$. So a least such depth exists whenever any does. Without that, *how deep* a difference goes would not be a well defined quantity, and any number put on it later would be a number I made up.

Agency is established through a binding when the same source has at least two distinct available interventions at one transition window and those interventions do not preserve the same continuation:

$$
\exists\,\alpha,n,\gamma_1,\gamma_2,k:
\quad
\gamma_1,\gamma_2\in\Gamma_{G,I}(\alpha,s_n;\Delta t_n)
\;\land\;
\gamma_1\neq\gamma_2
\;\land\;
\operatorname{Continue}_G(s_n,\gamma_1;\Delta t_n)
\;\not\sim^k_G\;
\operatorname{Continue}_G(s_n,\gamma_2;\Delta t_n)
$$

The two interventions are counterfactual alternatives available at one $\Delta t_n$; the operating instance actualizes only one. The source bound to the role bears Agency at that window. The existential quantifier claims nothing about anywhere else.

Call $\lambda(\alpha,s_n)$ the latency, the least $k$ satisfying the condition above, and $\infty$ when no such $k$ exists.

And now three things turn out to be one thing. Latency $\infty$ at that window. Every continuation available to $\alpha$ there being one and the same State. And $\alpha$ bearing no Agency there, however many buttons, branches, or dialogue wheels the infrastructure puts on the screen.

Latency $\infty$ means no inspection at any finite depth separates the continuations. Every inspection is finite, so no inspection separates them at all. They are one State, and one State cannot differ from itself in what it admits or discloses.

So an input may still be ceremonial, decorative, or useful for keeping someone awake, but whether it establishes Agency is now a question with an answer, and wherever the States and interventions can be enumerated it is a question a machine can settle. A branch is not Agency merely because someone drew two boxes and connected them with arrows. That is not a jab. There is a proof of it above.

One more distinction falls out of the same relation. Randomness internal to a transition may change which continuation occurs without any source bearing Agency. The branching is there, but it is attributable to no binding. A random source *bound* to a role is a different case, and its output is evaluated through the same relation as any other bound source.

Information asymmetry needs nothing further here. $\approx_r$ already says the Rules may withhold, and whether they do is a fact about $\operatorname{obs}$, which is a component of $G$ like any other. What matters for Agency is that $\Gamma$ is constrained by what the Rules disclose to a role, never by what the occupant of that role has managed to work out.

Agency does not have to appear as a tidy menu of prewritten choices. An intervention role may authorize its occupant to receive a declaration, observation, or unresolved situation and map it into an operational result. Likewise, $G$ may permit an intervention to alter a parameter or a Rule. In that case the mutable configuration is part of $X$, so it shows up in the State, and the permission is a higher-order relation already inside $\longrightarrow$. Otherwise, continuing under the altered relation means continuing under another configured form, $G'$.

Only after Agency has been established do we need the word Agent. The source bound to the relevant intervention role is an Agent in that relation. Agenthood is not an intrinsic property of the source, and the source does not determine its own authority: $G$ defines and limits the role, $I$ establishes the current binding, and the transition record attributes the committed intervention to the bound source.

Agency remains local to $\Gamma_{G,I}(\alpha,s_n;\Delta t_n)$. What kind of thing the source is matters only where $G$ uses identity or role as an eligibility condition. The same source may be an Agent through one binding and an observer, part of the infrastructure, or part of a transition under another. Even when $G$ permits an Agent to alter a Rule, that permission is itself constituted by $G$. No Agent stands above the Rules.

Write $\operatorname{Ag}(G)$ for the set of reachable States and admissible bindings where this relation holds. The null case is now sharp. $\operatorname{Ag}(G)=\varnothing$ when no reachable State brings together a role, an admissible binding, two available interventions, and continuations that differ at some finite depth. Such a form may still contain Rules, States, transitions, randomness, presentation, and an ordered Trajectory. What it does not contain is a single point at which a bound source could make another continuation actual. Whatever else remains, the relation this essay identifies as gameness does not.

With those relations in place, the Necessary Condition can finally be stated:

**A rule-constituted possibility space whose operating trajectory can be altered by one or more Agents at a traceable transition window,** $\Delta t$**.**

Here, “can be altered” is existential: it asserts that the relation holds for at least one binding and one $\Delta t_n$. It does not assert uniform Agency across the rest of the form.

And it is a *necessary* condition, not a definition. Satisfying it does not make something a game.

Now the part that is not deduction. Everything above is dependency. Agency cannot be spoken about without $\Gamma$, $\Gamma$ without $\approx_r$, $\approx_r$ without $\operatorname{obs}$, and none of it without $G$. What does not follow from any of that is the last step, that a form with $\operatorname{Ag}(G)=\varnothing$ is not a game. There I am identifying gameness with this relation, and that is the one claim here worth attacking. 

The move that usually arrives instead is to hand over some object that satisfies the condition and does not feel like a game, then wait for me to patch the condition until it excludes that object. I am not going to do that, and it is not stubbornness. Two things are wrong with the move.

First, the object always arrives with no declared form and no declared projection. Whoever hands it over has skipped the entire discipline built up above and is holding a feeling next to a structure, which is not a comparison.

Second, and worse, the move assumes we already possess a reliable line between game and not-game, and that the counterexample happens to be standing on the correct side of it. We possess no such line. The clearest evidence is that we cannot settle the one case we are standing inside: nobody has shown that this universe is not itself running as somebody’s game. That question sounds unserious, which is a fact about our habits and not about the question. And it is not one odd case sitting at the edge of the list, it is the case the whole list is inside. If this universe might be running as a game, then every candidate anyone hands me is a configuration within a possible game, and the verdict that it is definitely not one is being delivered from inside the very thing in question. So while that stays open, nobody gets to certify by feel that a thing is definitely not a game. The condition can rule something out, because it names what it is checking. A feeling cannot.

So the condition stays pointed one way, and I mean that as a discipline rather than as modesty. Whatever fails it cannot be a game, no matter what it is sold as. What passes it, I am not ranking. Patching in the other direction is exactly where every earlier attempt turned into a taste ranking wearing a lab coat, because the only material available for the patch is whatever the patcher already finds game-like.

### Consequences

From the relations assembled above, three consequences follow.

#### Consequence 1: No structurally “wrong” play remains

**If an action lies within the Possibility Space constituted by the Rules, it cannot be wrong in the sense of being outside the game.**

It may be strategically awful. It may annoy the other players. It may break an agreement that was never part of the rules. It may expose a design mistake. None of those judgments reaches back and removes the action from the Possibility Space.

The reason is almost embarrassingly short. The Possibility Space just is everything the Rules let you reach from where the thing is allowed to start. So if the Rules admitted the move, the result is in there. There is nowhere else for it to be. Saying the move was outside the game amounts to saying the Rules both allowed it and did not, which is not a criticism of the player, it is two sentences that cannot both be true.

That shortness is the point. This is not me being generous to players who ruin things. I am stuck with it either way, and it would hold even if I hated every case it covered.

“The designer did not expect that” is not a Rule. What anyone hoped would happen never went into the thing, so it cannot be read back out of it. If an action is not meant to belong to the game, the answer is not to accuse the player of picking the wrong possibility. The answer is to look at the Rules that made it a possibility in the first place.

#### Consequence 2: A Trajectory is not its endpoint

**The endpoint of a bounded Trajectory is merely its last committed State. It need not be a dead end under the Rules, correspond to a game ending, or display the credits.**

A Trajectory may remain ongoing. An endpoint appears only after some interval of its operation has been bounded.

A Session names an interval opened and closed at the level of infrastructure. A Run is different: it is a rule-recognized cycle or bounded unit of operation. One Session may contain multiple Runs, while one Run may continue across multiple Sessions.

Session boundaries are conditions of running the thing, not Rules that constitute it. Where the Rules do govern initialization, reset, persistence, or what carries over from one Run to the next, those are Rules like any other.

A terminal State is different from any such boundary. It is a State the Rules admit no move out of at all.

That two Trajectories can end at the same State without being the same Trajectory is true, and on its own it buys nothing. The interesting object is the whole pile of Trajectories that arrive at one and the same State.

Everything in that pile has exactly the same future available to it. Not by coincidence, and not as a design choice. We established earlier that the Rules only ever read the current State, so how you got here is simply not something a later move can consult. And if the Rules did keep a record of how you got here, that record is part of the State, which means those Trajectories were never arriving at the same State to begin with. There is no third option.

That is the whole content of the complaint that my choices did not matter, and it is worth getting precise, because the complaint is sometimes wrong and sometimes exactly right. Wrong when the difference was there and the player could not see it. Right when the choice really did fork the world for a while, and then everything folded back into one State, and from there on nothing could tell which way you came in. The choice was real when you made it. Consequences have a shelf life, and it is the Rules that set that shelf life, not the writing.

A shared *destination* is weaker still than a shared endpoint, since it may name one selected property of the endpoint rather than the whole State. The endpoint of one bounded interval may become the starting State of another, may be transformed through relations constituted by $G$, or may never be actualized again.

Agency concerns the alteration of continuation, not ownership of an endpoint. A fixed destination may receive different Trajectories. A variable destination may still be reached through predetermined operation. Neither linearity nor branching settles it. What settles it is how deep a difference goes, and whether it ever folds back.

Story endings and credits therefore have no privileged place in this condition. Plot, dialogue, authored events, and fixed outcomes may participate directly in the game when they become States, facts, transitions, and consequences constituted by $G$. They may also remain presentation. Neither position makes them inferior. It only tells us what they are doing.

#### Consequence 3: Gameness is distributed

**The existence of Agency at one transition window says nothing about its presence, density, or reach elsewhere.**

The condition only ever claimed *somewhere*. It establishes Agency where the relation actually shows up, and it does not spread that across every State, every stretch of the Trajectory, or every subsystem just because they shipped in the same box.

A game may therefore contain long stretches where nothing anyone does changes anything, one subsystem thick with real interventions, and another where a single rare intervention reorganizes everything after it. Two different questions live here, and they are easy to confuse. How much of a subsystem actually carries Agency at all. And how far a difference travels before it folds back, if it ever does. A thousand inputs that all return to the same corridor answer the second question with a zero. One input that does not is the whole answer.

So every State a game can reach falls on one side or the other. Either somebody bound to a role there has two moves that genuinely lead somewhere different, or nobody does. That much is just cutting a room in half, and cutting a room in half proves nothing. The part with content in it is what happens when you change the machine. Change it and the two sides do not move, not one State crosses over, because the line was drawn using only the Rules, who is permitted to act, what they are shown, and where those actions lead. Nothing else was ever let into it, so a new machine has nothing to take hold of. A remake cannot bring a dead stretch to life and it cannot kill a live one, unless it changed the Rules, in which case it is not a remake of the same thing.

Which means the line between game and not-game does not run between products. It runs *inside* one, which you could picture as a line chart, and it is a fact about that product rather than a tribal taxonomy. It also means “less game” stops being an insult. It is a proportion, how much of what a thing can reach has a live window in it, plus how far the live parts carry before they fold back. Both are countable wherever the States and the moves can be listed. Whether a thing ought to have more or less of it is a completely different question on a completely different layer, and I am not answering it here.

A game is not one solid block of equal Agency. Agency may be dense here, absent there, trivial in one subsystem, and capable of reorganizing everything in another.

## Some Thought Experiments

I will leave the answers unwritten. Not because I do not have them, but because, if everything above is clear, I should not have to provide them.

- Suppose humanity goes extinct, leaving behind only a complete rulebook for **chess**. Does chess still exist when nobody is there to play it? If aliens find only a wooden chess set and invent a completely different way to use it, are they playing chess? If they instead find the rulebook and make their own pieces from granite, has the game changed, or only what it is played with?
- Suppose a **composition by Beethoven** remains unheard in a drawer for centuries before being discovered. Was it not music during that time? Beethoven was deaf when he wrote late in his life. Does that put what he wrote outside of music?
- Four fish swim in a tank while sensors turn their movements into controls for **Pokémon Sapphire**, and eventually the game is beaten. Does *Pokémon* stop being a game because the inputs came from a fish? Does the fish have to know it is playing, or intend to play at all?
- The ball enters the net. No player is offside, yet the assistant referee raises the flag, the referee disallows the goal, and VAR is not consulted. At that moment, is this still the same game of **football**? Do the rules give the referee the power only to judge what happened, or to make a ruling that counts even when the judgment is wrong? Does VAR change the rules of football, or only how decisions are checked and made final?
- In a **D&D** session, the DM gives one player two turns to compensate for falling behind the rest of the table. Is this still the same game? Was the DM allowed to make that ruling under the rules the table was already using, or did the table just add a house rule?
- Six children play by rules they made together. Child A scores with a move that is allowed at the time. Before child B can repeat it, the group changes the rule to forbid it. Does the new rule erase A’s earlier score, or does it apply only from that moment onward? If B performs the move anyway, is it valid now? What changed between the two attempts? What game are they playing now?

## On the Player Side

**An observer’s response does not determine the structure of the game or rewrite the Trajectory that occurred.**

Rules and presentation may communicate, encode assumptions, and produce powerful experiences. Those relations may matter enormously. But swapping the observer does not swap the Rules, rebuild the Possibility Space, or alter the Trajectory that already happened.

The same person may be both observer and Agent, but these are different relations. Interpretation in the role of observer does not alter the Trajectory; an intervention admitted through Agency may.

The player’s experience therefore does not reach backward and redefine the game. It is still real, still important, and often the entire reason anyone cares about the thing in the first place.

And even in the Agent relation, what a person knows is not part of the form. The Rules fix what a role is shown. They say nothing about what the occupant of that role has worked out from being shown it, and no move in the game reads that. Two things follow, and both of them get mistaken for properties of games.

The first is the difference between choosing and guessing. Where the Rules hide something, an agent can hold two interventions that really do lead somewhere different and still not be able to tell which situation it is intervening in. The difference it makes is real, it is just not a difference it can aim. Choosing and guessing are not the same act, and any account that cannot separate them is not finished. But the thing being separated is what the agent is doing, not what the game is. A form that conceals is not a lesser or a better form, it is a form that conceals.

The second is saturation. Suppose an agent keeps at a thing until it has come to know the whole Possibility Space, every State the thing can reach and everything admitted at each of them. For that agent the game is saturated. Nothing in it can arrive as new any more.

Saturation is not a solved game. A solved game is a claim about the thing itself, that the outcome under some standard of play is settled. Saturation is a claim about one agent, so two people at the same table can differ on it while the Rules sit there unchanged. It is also not seeing through walls. What fills up is the map, not the readings the Rules disclose at a State, so a saturated agent in a form that conceals still cannot see what is concealed.

And it takes nothing away from that agent’s own Agency. Agency asks whether two available interventions lead somewhere that differs, and neither half of that question mentions what the agent knows. Knowing both continuations are there does not merge them. So a saturated agent keeps every bit of Agency it had, and what it has run out of is discovery, which was never in the condition. Saturation for one agent also says nothing about anyone else at the table.

It can lapse, too. If an intervention alters a Rule, then what was known is a different form, and the map is incomplete again.

One thing I should be straight about. Everything above was built out of Rules, the moves they admit, who is allowed to make them, and where the thing may start. Nothing else went in. So of course no observer comes out. Me saying observers do not constitute the game is not a discovery, it is a receipt for what I put in.

I am fine with that, because it puts the work in the right place. If you want the observer inside the object, you have to say which part of it they are, and which move in the game reads them. Both questions have perfectly possible answers. I have just never seen anyone give one. Until somebody does, the observer stays outside the structure and keeps everything that actually matters to them.

At the level of experience, I treat meaning as arising through the relation between Rules, presentation, context, and the observer. A player may find a Trajectory heroic, offensive, boring, sacred, cruel, hilarious, or meaningless. Another player may experience the same sequence differently. Neither response rewrites the Rules, the Possibility Space they constituted, or the Trajectory that occurred. In this structural sense, gameness is neutral.

A designer may construct the conditions of an experience through Rules, presentation, information, rewards, punishments, and consequences. The designer cannot complete that experience on the player’s behalf. There is no checkbox for mandatory interpretation, however convenient it would be.

And no, plot, messaging, and story do not clash with games. If they are to participate in the operating Trajectory, they must become operational through Rules, States, and consequences. If they remain presentation, then they remain presentation. Neither is an insult. It is only a distinction.

Adapting a film or novel into a game is therefore not merely a matter of distributing the play button across a shooting gallery, an axe-throwing segment, three yellow-painted ledges, and a giant pipe-shaped hallway hiding a loading screen. The material must be reconstructed through the relations that make it operate as a game. That could be a good artistic product, but maybe, it has less game than you think.

> Just respect the intelligence and stature of the player, just as I respect you, and you respect me, alright?

## Conclusion

In reality, we do not need to settle every possible definition before taking one step closer to the thing itself. We only need to stop mixing every layer together.

I think, as Indie game dev, we should just keep it simple: before trying to make a game fun, moving, groundbreaking, artistic, addictive, etc,..., well, try to make the part that has to be a game work as a game first. Then build everything else upon it.

Recreating your imagination is not a simple matter of draw a map, throw your story and your massive contents into it then add some button prompts. If it has to become a game, then it has to be reconstructed through Rules, Trajectory, Agency,... you know, all the bullshit I have been rambling about above.

I am not trying to provide every answer. I am trying to make the question precise enough that the next answer has somewhere solid to stand. Every symbol up there is doing a job, and the only reason any of them exists is that without it a sentence I needed could not be said at all. If I ever catch one just standing around looking clever, it goes. If you want to understand the thing you are passionate about before deciding what else to do with it, I hope this gives you a perspective worth pondering.
