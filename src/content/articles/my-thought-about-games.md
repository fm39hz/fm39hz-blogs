---
author: FM39hz
pubDatetime: 2025-07-07
modDatetime: 2026-08-20
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

What follows is a signature, seven axioms, definitions, and what can be derived from them. Nothing else belongs in this section. Glosses, worked cases, and the argument for why the last axiom points one way have their own sections afterward.

Setting it out this way has a known price, and the price is the reason to pay it. A system precise enough to have a proof relation is precise enough to be incomplete. Prose cannot be incomplete; it can only be vague, and an incompleteness has an address where a vagueness does not.

So, from that point, we have States as something the Rules produce. Getting there takes longer than that sentence makes it sound, and the first thing it takes is writing down what a Rule is made of.

**The signature.** A signature is not an axiom, and it cannot be derived from one, since there is nothing formal yet to derive it in. It is the list of what the Rules are being taken to consist of, and the only honest way to arrive at it is to take the sentence about Rules above and ask what must exist for that sentence to be true of anything at all.

*What may occur* needs things that may occur, and something that can enter them. Call the first a carrier of configurations $X$, and the second a set of interventions $A$.

*Which difference can count as a difference* needs something able to tell configurations apart, and neither $X$ nor $A$ does that on its own. What settles it is what the Rules show, which is never simply everything. So there are intervention roles $R$, with $\operatorname{obs}(r)$ the readings of a configuration the Rules disclose to $r$.

Rules also distinguish what may occur *by whom*, since a form where anyone may do anything is a special case and not the general one. So $\operatorname{auth}(r)\subseteq A$ is what role $r$ is authorized to supply.

*What follows from what* needs an admitted transition relation, and here the general case has to be taken rather than the convenient one. A transition does not consume one contribution. It consumes one from every role at once, because forms in which two roles commit without seeing each other are ordinary rather than exotic, and a signature that cannot state them is not describing Rules in general. So let

$$
\operatorname{Prof}:=\{\,p:R\to A\;\mid\;p(r)\in\operatorname{auth}(r)\,\}
$$

be the intervention profiles, where every $\operatorname{auth}(r)$ contains a null contribution so that a role with nothing to supply supplies that, and take $\longrightarrow\;\subseteq\;X\times\operatorname{Prof}\times X$, written $x\xrightarrow{p}x'$. Sequential forms are exactly the forms whose admitted profiles at each configuration differ in one component only.

Last, somewhere the thing may begin: $\varnothing\neq X_0\subseteq X$. Non-emptiness is required so that the form has at least one initial configuration and its reachable set is defined from an actual starting point. Nothing else in that sentence has an unmet requirement, which gives

$$
G=\langle X,\;A,\;R,\;\operatorname{auth},\;\operatorname{obs},\;\longrightarrow,\;X_0\rangle
$$

Arriving at it this way was the point, but it is worth naming what was arrived at. This is a concurrent game structure with imperfect information: a carrier of configurations, roles acting at once, an authority function, an indistinguishability apparatus, and a transition relation consuming one contribution from every role simultaneously. It is a standard object with a standard name. What the derivation buys is that every slot is here because the sentence about Rules required it, rather than because some definition elsewhere happened to carry it.

Four remarks before the first axiom, all of which are load-bearing later.

$\operatorname{Prof}$ is defined from $A$, $R$, and $\operatorname{auth}$, so it is notation rather than a component.

$X$ is not the State space. It is deliberately too rich: anything the form can be in, described as finely as you like, including detail that will turn out to be irrelevant. Deciding here which detail is irrelevant would be assuming the answer to the question Definition 2 exists to settle.

Since $\operatorname{obs}$ sits inside $G$, disclosure is a Rule like any other. Concealment is not something done to the Rules. It is one of them.

And there is no probability anywhere in the signature. Where a transition may go several ways, $\longrightarrow$ records which ways and says nothing about how often, so a form weighted ninety-nine to one and a form weighted evenly are the same $G$ here. That is a real restriction and I would rather declare it than have it found. Everything below is about what a form admits, never about what it tends to do. Adding a measure would be a different essay, and it would not alter a single relation defined in this one.

A signature cannot be false. What can be false is the claim that seven slots are enough, and that claim is the first axiom rather than part of the stipulation, so that it can be attacked separately from the notation.

**Axiom 1. Constitution.** Gameness is a property of structures of this signature and of no further data.

All of it can be refused. It is what makes material, authorship, intent, and reception inadmissible later, and it does that once, here, rather than four separate times further down.

So there is a structure, and by Axiom 1 nothing outside it counts. What can a structure like that tell about itself?

**Axiom 2. Self-disclosure.** The readings available to $G$ itself are every reading $\operatorname{obs}(r)$ discloses to any role $r$, together with, at each configuration, which profiles are admitted there. A body of Rules that cannot tell what it permits next is not a body of Rules.

These are determined by $G$. Determined is not the same as computable, and nothing below asks for the stronger reading. A form whose admitted set is fixed but not effectively calculable satisfies this axiom. Reading it as computability would throw out rule systems expressive enough to encode arbitrary computation, and those are neither rare nor artificial.

And when a profile can go several ways, is looking a matter of following one of them, or of following all of them at once?

**Axiom 3. Observation is branching.** An inspection may follow every admitted outcome of an intervention and compare the outcomes side by side.

This is the one genuine choice in the section. Where an intervention has a single outcome the question does not arise. Where it has several, there are two readings and they are not the same relation. Read an inspection as a run, and two configurations are separated when some result is obtainable at one and not at the other. Read it as a probe following every admitted outcome, and they are separated whenever their branching differs, even where every obtainable result agrees. This is the linear and branching distinction, and the gap between the two readings is not hypothetical. Take a form where one intervention $a$ leads to a single configuration admitting both $b$ and $c$. Take another where $a$ may lead to either of two configurations, one admitting only $b$ and the other only $c$. The obtainable sequences are $ab$ and $ac$ in both, so the run reading cannot separate them. A probe that makes $a$ and inspects every outcome separates them at once: in the first form every outcome of $a$ admits $b$, and in the other one of them does not. That pair is the proof that the probe reading is strictly finer, and it is short enough that there is no reason to assert the fact instead of showing it.

Axiom 3 takes the probe reading, because the run reading identifies a form that keeps two continuations open with a form that has already settled which one you get and has not disclosed it yet, and the commit apparatus below exists to keep exactly that difference visible.

**Definition 1. Inspection.** The inspections of $G$ are generated by three clauses. At each configuration, every reading available to $G$ under Axiom 2 is an inspection. Any finite tuple of inspections is an inspection, returning the tuple of their results. And making one admitted profile and inspecting every outcome under Axiom 3 is an inspection, returning the set of results those outcomes give.

The middle clause is the one easy to leave out, and Axiom 3 does not work without it. Axiom 3 says an inspection may compare the outcomes side by side, and comparing means holding two results together at once. Inspect two continuations separately and both result sets survive, while which pair of results came from the same outcome does not. The tuple keeps that, and nothing else here does.

Depth counts the profiles a look spends. A reading has depth zero, a tuple has the greatest depth among its components, and prefixing a profile adds one. Tupling raises nothing, so a look may hold arbitrarily many results at once and stay shallow.

There is no fourth generator, because only $\operatorname{obs}$ and admissibility show anything, only tupling holds results together, and only $\longrightarrow$ goes anywhere, while the rest of the signature is inventory, permission, and where the thing may start.

That says how a look is put together. It does not say how far one can go. So how far can a single look go?

**Axiom 4. Induction.** Nothing is an inspection except by the three clauses of Definition 1.

**Corollary 4.1.** Every inspection has finite depth.

By induction on the generation. Readings begin at zero, a tuple takes the greatest of finitely many already finite depths and so stays finite, prefixing adds one to something finite, and by Axiom 4 there is no fourth way for anything to arrive. An inspection of infinite depth would have to arrive by a route that does not exist.

This is the axiom I would most like to state fully and cannot. A closure clause is easy to write; a *nothing else* clause is not. In a first-order setting the second cannot be enforced at all, and the axioms would admit models carrying inspections that no finite generation reaches. I have no way around it, and this is the one place the price named at the top of this section is actually charged, rather than in any of the places the charge is usually expected.

Which brings back the thing promised a few paragraphs up. What is a State?

**Definition 2. State.** $x\sim_G y$ when no inspection separates them, meaning no inspection can return a result at one that it could not return at the other. Write $S_G:=X/\sim_G$ for the State space.

**Proposition 1.** $\sim_G$ is an equivalence relation, and the coarsest one respecting every inspection.

It is the kernel of the family of inspections $G$ itself admits, so it exists for the same reason any map has a kernel and is coarsest for the same reason. Equivalently: each inspection cuts $X$ into the parts it can tell apart, and a State is one cell of the intersection of every such cut.

**Proposition 2.** Configurations of one State admit the same profiles.

By Axiom 2, admissibility is one of the readings available to $G$, so by Definition 1 it is an inspection. $\sim_G$ respects every inspection.

**Proposition 3.** Whatever can be inspected after a transition was already inspectable before it.

By Definition 1, an inspection following that transition is itself an inspection at the earlier configuration. So a transition cannot open a gap that was not there beforehand.

**Remark 4.** No inspection depends on the history that produced a configuration, except through its State.

An inspection is defined at a configuration, so it cannot read a history the configuration does not carry, and that is a fact about the type of Definition 1 rather than a discovery. What makes it worth stating is the contrapositive. Suppose some fact about the past can change what an inspection returns later. Then two configurations differing only in that fact are separated by that inspection, so they already are different States. The fact was never outside the State. It was one of the distinctions the Rules had been drawing all along.

**Proposition 5.** Coarsening $\sim_G$ cannot preserve the inspections. Refining it is idle. The two halves are not equally strong and running them together would overstate the result.

Coarsen it and you merge configurations some inspection does tell apart, so that inspection no longer factors through the quotient. That is not a contradiction, and calling it one overstates a result the weaker sentence already delivers in full. The coarser quotient is a perfectly consistent object; what it cannot be is the State relation of *this* form, since the form was declared with those inspections in it. Refine it and nothing goes wrong. You have separated configurations no inspection can reach, and the added distinction is invisible to everything definable in this section, so no proposition below can so much as mention it. Granularity is therefore barred in one direction and useless in the other. It is fixed by Axioms 2 and 3, and Axiom 3 is the only place a choice entered.

That is one State. What about all of them, meaning the whole of what a form can reach?

**Definition 3. Possibility Space.** The configurations reachable from $X_0$ through admitted transitions, each carrying its State as a label, together with what is admitted at each of them. Write $\mathcal P_G$. Its paths are paths through configurations, and the labels do not license swapping one representative of a State for another halfway along.

That restriction is not fussiness, and leaving it out is how a real mistake gets in. Nothing above gives $S_G$ a transition relation of its own. Configurations of one State admit the same profiles by Proposition 2, and that is all Proposition 2 gives; it does not say their successors match up State for State. Whether they do is exactly what Axiom 6 is for. So anything below that walks transitions walks them on configurations and reads States only where it stops.

Everything below is relative to the $G$ actually declared.

Now the debt from the Xiangqi sentence, which has been sitting there since the opening list. That sentence only became true once I named the comparison I was making. So when do two forms express the same Rule?

**Definition 4. Projection.** A map $\pi$ out of $X$ keeping a chosen family of distinctions and discarding the rest, carrying $\longrightarrow$ along with it to give a projected form $\pi(G)$.

**Definition 5. Sameness relative to a projection.** Two forms express the same Rule relative to $\pi$ when $\pi(G_1)$ and $\pi(G_2)$ admit the same inspections, up to a renaming of interventions.

**Remark 6.** Sameness relative to $\pi$ is not identity relative to $\pi$.

The two are confused constantly. Inside a declared $G$, identity is settled and relative to nothing: two configurations are one State or they are not, and Definition 2 says which. What Definition 5 produces is a comparison between forms, and a comparison is entitled to name which distinctions it holds up. Nothing here asks identity itself to come in flavours. Two forms may therefore come out the same under one projection and different under another with both results standing, since each is only ever about the distinctions its own projection kept, and there is no sameness sitting outside every projection waiting to be got right.

That settles what a comparison is about. Now a question that is smaller and much older than it looks. Does any of this care what the thing is made of?

**Definition 6. Infrastructure.** The material, computational, or procedural arrangement through which $G$ can be represented or operated. An infrastructure carries a raw transition structure of its own.

**Definition 7. Realization.** An infrastructure realizes $G$ when its configurations correspond to those of $G$ in a way that matches interventions one for one, matches roles one for one, preserves $\operatorname{auth}$ and $\operatorname{obs}$ under those matchings, and preserves every inspection.

Preserving transitions alone would not be enough, and neither would preserving inspections alone. A correspondence can leave every transition and every reading intact and still reassign who is authorized to act, because authority is not recoverable from inspections at all: an inspection reads a configuration, while $\operatorname{auth}$ is indexed by a role. By Axiom 1 a reassignment of authority produces a different form rather than the same form on different material, so the requirement belongs inside the definition rather than in a remark beside it. Everything below that quantifies over realizations depends on its being there.

**Proposition 7. Realization-invariance.** Anything defined from inspections alone takes the same value on every realization of $G$.

Immediate from Definition 7. Everything constructed in this section is defined from inspections alone, so $\sim_G$, $S_G$, $\mathcal P_G$, and every relation built from them below inherit invariance without further argument.

Nothing so far has been running. What changes when somebody actually runs it?

**Definition 8. Operating instance.** An infrastructure is not yet an operating instance. When a reachable configuration is actualized through it, an operating instance begins. Write $I$. It commits one ordered Trajectory through $\mathcal P_G$.

The Possibility Space may branch, loop, and admit many counterfactual continuations. The Trajectory already committed does not branch retroactively. Non-linearity belongs to the structure of possible continuations; actualization produces an ordered history. A Trajectory does not require a built-in ending, and remains an ordered history for as long as the instance continues to operate.

The configured form, the infrastructure realizing it, an operating instance, and an observer encountering that instance are four distinct relations. When no instance is operating, no Trajectory is being actualized, while $G$ and $\mathcal P_G$ remain exactly what they were.

**Axiom 5. Discrete settlement.** $G$ exposes its operation as an ordered sequence of committed transitions.

This does not follow from anything above, which is why it is an axiom and not a step. Everything below concerning windows, latency, and Agency leans on it. A commit is whatever the form treats as settled: not a clock, not a frame, not a turn counter. Settlement is the only thing there is to order, since a prefix is just the part no longer in question, and with nothing settled there is no prefix and nothing for a continuation to continue from. Measuring does not rescue it, since a form could measure perfectly, settle nothing, and still have no Trajectory to alter. What is ordered is acknowledgement, and acknowledgement is discrete wherever it occurs, because a thing is either still in question or it is not.

**Definition 9. Transition window.** $\Delta t_n$ is the window joining $s_n$ to $s_{n+1}$ in the order given by Axiom 5, a logical position and not a measurable duration in physical time. Write $\Delta t$ for such a window in general.

At $\Delta t_n$, an admitted profile $p$ enters the transition:

$$
x_n\xrightarrow[\Delta t_n]{p}x_{n+1},
\qquad
s_i=[x_i]_{\sim_G}
$$

The transition is written on configurations for the reason just given under Definition 3. States are what the window is indexed by; configurations are what it moves between.

To alter the Trajectory is to make a different admitted continuation become actual from the same prefix. It does not mean rewriting a past that has already occurred.

Nothing so far guarantees Agency. What it gives is a Possibility Space, an operating Trajectory, and a window at which Agency could be expressed.

So who is it that makes something happen there, and how much of the form can they actually reach?

**Definition 10. Role and binding.** At a window, $G$ may provide one or more intervention roles. A role specifies which contributions may become operative there and the authority with which they enter operation; it does not identify the concrete source that will supply them. The operating instance $I$ binds a source $\alpha$ to such a role through its infrastructure and under whatever eligibility conditions $G$ imposes. A committed intervention is attributable to $\alpha$ when it enters through the role to which $\alpha$ is bound. Anything merely carrying or translating that output remains infrastructure in this relation. Where several outputs enter through separate bindings, each may be evaluated on its own or jointly with others, and Definition 18 keeps those cases apart.

A source may be an individual, a collective producing one joint output, or an autonomous process. By Axiom 1, nothing further about it is admissible here.

Binding attributes a contribution to a source. It does not attribute the outcome to the contribution. No relation of actual causation is defined anywhere in this essay, and Definition 15 does not quietly supply one: it compares what other contributions would have made available, and reads nothing whatever off the one actually supplied.

Two constraints determine what $\alpha$ can reach. The first is authority: nothing outside $\operatorname{auth}(r)$ for the roles currently bound to $\alpha$. The second is information. A State is the complete condition of the form, not what any one role is shown, and in every form that conceals anything the two come apart.

**Definition 11. Role-indistinguishability.** For a role $r$, $\approx_r$ is indistinguishability by inspections built from $\operatorname{obs}(r)$ alone.

**Proposition 8.** $\approx_r$ is coarser than $\sim_G$, and strictly coarser exactly when the Rules withhold something from $r$.

By Axiom 2, $\operatorname{obs}(r)$ is one member of the family generating $\sim_G$, so a relation built from it alone can only be coarser, and is strictly so precisely where some other reading separates configurations it does not.

**Proposition 9.** $\approx_r$ is fixed by $G$ and not by $I$.

$\operatorname{obs}$ is a component of $G$. Two arrangements differing in what a role is shown differ in $\operatorname{obs}$, hence by Definition 7 are two forms rather than one form on different hardware.

**Definition 12. Available contributions.** $\Gamma_{G,I}(\alpha,s_n;\Delta t_n)$ is the set of contributions $\gamma$ that $\alpha$ can supply through the roles bound to it, where $\alpha$ is either one source or a set of sources supplying jointly. Each such $\gamma$ is authorized by those roles and occurs as their component in some profile admitted at $s_n$. Nothing further is required of it.

$\approx_r$ is deliberately absent, and anyone who knows the literature will expect it here. The thought was that a contribution ought to be constant across whatever the role cannot tell apart, which is the uniform strategy condition under its usual name. The condition is a good one and it was attached to the wrong object. Constancy is a property of a policy, an assignment of contributions to everything the role cannot rule out. $\Gamma$ is not a policy. It is the local list of what can be supplied at the State the form is in, and asking one entry of that list to be constant across a class of States is asking a question its type cannot answer. Putting them together produced a definition read from two viewpoints at once, and that is the defect, not the permissiveness it is easily mistaken for.

So the guess stays unresolved here, and that is a limit worth stating rather than a tidy result. An occupant may supply an admitted contribution without knowing which configuration of its class the form is in, and Definition 15 will not tell that apart from aiming. Telling them apart means evaluating one policy across an entire $\approx_r$-class, which is a different construction and not this one. $\approx_r$ still does everything it was introduced for, since Proposition 8 and Proposition 9 never needed $\Gamma$ to carry it.

What the other roles supply is no part of $\gamma$. Write $\delta$ for a completion, an assignment to every role not bound to $\alpha$ such that $\gamma\oplus\delta$ is a profile admitted at $s_n$, and write $\Delta_{G,I}(\gamma,s_n)$ for the completions of $\gamma$.

**Definition 13. Continuation.** For a configuration $x$ and a profile $p$ admitted there, the continuation opened by $p$ is the branching unfolding rooted at $x$: every outcome $\longrightarrow$ admits for $p$, and everything admitted after each of those. Write $\operatorname{Continue}_G(s_n,p;\Delta t_n)$ for it at a window.

One selected successor will not do, because $\longrightarrow$ may send a profile several ways and Axiom 3 already committed to looking at all of them. A residual inspection of a continuation returns the set of its results across those outcomes, and its depth does not count the profile already spent getting there.

**Lemma 13.1.** The continuation opened by $p$ is one and the same object at every configuration of one State.

Suppose a residual inspection told the unfoldings at $x$ and $y$ apart, for $x\sim_G y$. Prefixing $p$ to it is an inspection by Definition 1, and that inspection separates $x$ from $y$, contradicting Definition 2. So a continuation may be written at a State rather than at a configuration, which is what the notation above helps itself to and what Definition 15 needs of it.

Requiring only that the next State differ will not do either, since two interventions can lead to different next States which then fold back together and leave nothing behind. Difference has to be stratified by how deep an inspection must go to find it.

**Definition 14. Depth-**$k$ **indistinguishability.** $\sim^k_G$ is indistinguishability by inspections of depth at most $k$. Two continuations differ at depth $k$ when some residual inspection of depth at most $k$ returns different sets of results across their outcomes, meaning the difference is detectable within $k$ committed transitions.

**Proposition 10.** $\sim^{k+1}_G\subseteq\sim^k_G$, and $\bigcap_k\sim^k_G=\sim_G$.

Going deeper only adds inspections, which gives the inclusion. Every inspection has finite depth by Corollary 4.1, so an inspection separating two configurations does so at some finite depth, which gives the intersection. Nothing further is assumed, and this holds under either reading of an inspection.

**Axiom 6. Finite branching.** Each configuration admits finitely many profiles, and each admitted profile has finitely many outcomes.

No proposition in this section uses Axiom 6, and it is worth being exact about why, because two statements here look alike and are not. Proposition 10 runs on Corollary 4.1 alone. What Definition 2 builds is the equivalence induced by the inspection language itself, the finite-depth relations are its approximants, and their intersection is that equivalence by construction rather than by theorem.

What Axiom 6 buys is the other statement: that this equivalence coincides with bisimilarity, the relation of the same shape used throughout the study of transition systems. That coincidence is the Hennessy-Milner theorem, finite branching is precisely its hypothesis, and without the hypothesis it is false. So the proposition needs nothing and the transfer needs everything, which is the whole reason they are separated here.

One definition further down does use it. Definition 21 walks transitions instead of inspections, and walking a transition out of a State needs the configurations of that State to have successors matching State for State, which is exactly what this axiom buys and what Proposition 2 does not give. So the axiom is idle everywhere the essay stays inside the inspection language, and needed the moment something steps outside it, which is a better description of what it does here than *stated for import only*.

Drop it and $\sim_G$ stays exactly the finite-depth relation defined above, so forms differing only in the limit go unseparated and Definition 21 drops to a quantity of the configuration an instance is in. It is stated as an axiom rather than proved because it is a restriction on which forms are under discussion, and it is stated at all because anyone importing an outside theorem needs it and because Definition 21 needs it.

**Proposition 11.** If two continuations differ at some depth, a least such depth exists.

By Proposition 10 they differ at every depth beyond it, so the set of separating depths is non-empty and upward closed, and has a least element. Without this, *how deep* a difference goes would not be a well defined quantity, and any number put on it later would be a number I made up.

Everything up to here has been apparatus. The question it was built to ask is short, and it is the one this whole essay has been walking toward. When does what somebody does actually make a difference?

**Definition 15. Agency.** Agency is established through the binding or bindings of $\alpha$ at $s_n$ when $\alpha$ has two distinct available contributions which, against one and the same completion, do not preserve the same continuation:

$$
\exists\,\gamma_1,\gamma_2,\delta,k:
\quad
\gamma_1,\gamma_2\in\Gamma_{G,I}(\alpha,s_n;\Delta t_n)
\;\land\;
\gamma_1\neq\gamma_2
\;\land\;
\delta\in\Delta_{G,I}(\gamma_1,s_n)\cap\Delta_{G,I}(\gamma_2,s_n)
\;\land\;
\operatorname{Continue}_G(s_n,\gamma_1\oplus\delta;\Delta t_n)
\;\not\sim^k_G\;
\operatorname{Continue}_G(s_n,\gamma_2\oplus\delta;\Delta t_n)
$$

$\alpha$, $n$, and $\Delta t_n$ are free. Definition 15 is a claim about one $\alpha$ at one window and about nothing else, which is what Definition 16 and Definition 18 require of it. The quantifier over bindings and windows lives in Definition 18, where it belongs.

Holding the completion fixed across both branches is deliberate. Let it vary and a source collects credit for differences produced by whoever else was acting, which is the reverse of what the relation is for; holding it fixed isolates the difference $\alpha$ itself makes. One such completion is enough. Nothing requires $\alpha$ to make a difference against every completion, and requiring that would withhold Agency from every role whose contribution another role is able to neutralize.

Stripped of the apparatus, Definition 15 says that $\alpha$ is an essential coordinate of the transition at $s_n$: vary it alone, hold everything else where it was, and the form goes somewhere else. A source failing that at every window is a dummy, in the sense the word already carries wherever functions and their arguments are discussed. What the apparatus adds is a meaning for *somewhere else* when the difference may take several transitions to surface, and supplying that meaning is the entire job of $\sim^k_G$.

The two contributions are counterfactual alternatives available at one $\Delta t_n$, and neither has to be the one the instance actually supplied. The window and the binding are actual; the pair is not. So Agency at a window is not a claim that what was committed there caused what came after it.

**Definition 16. Latency.** $\lambda(\alpha,s_n)$ is the least $k$ satisfying Definition 15, which exists by Proposition 11, and $\infty$ when no such $k$ exists.

Two things about how that number may be read. Neither is a restriction I am adding; both are already true of what Definition 16 says, and both are easy to lose.

It is a position in a hierarchy of relations, not a distance. The refinement from $\sim^k_G$ to $\sim^{k+1}_G$ proceeds at whatever rate the branching sets, and nothing makes the step from two to three commensurable with the step from seven to eight. Latencies may therefore be ordered, compared, and summarized by rank. They may not be added, averaged, or divided, and no form is twice as slow as another because a number doubled.

And the depth being counted is depth in an inspection, which by Axiom 3 follows every admitted outcome at once. It is depth in a branching probe, not distance along the committed Trajectory. $\lambda=3$ says three transitions of inspection suffice to separate the continuations. It does not say the difference surfaces three commits later in whatever actually runs, and an instance may go its whole length down a branch where the difference never appears at all. That is not a defect in the measure. Definition 15 is about what the form admits, and it was never about what the form does.

**Proposition 12.** At a window and a binding, the following are equivalent: $\lambda=\infty$; against every completion, all of $\alpha$'s available contributions open one and the same continuation; $\alpha$ bears no Agency there.

The completion has to be held fixed inside the middle clause, for the same reason it is held fixed in Definition 15. Continuations reached against *different* completions may perfectly well differ, and that difference belongs to whoever supplied the completion. What $\lambda=\infty$ says is that within each completion taken on its own, nothing $\alpha$ does moves anything.

$\lambda=\infty$ means no residual inspection at any finite depth separates the continuations reached against a shared completion. Every inspection has finite depth by Corollary 4.1, so none separates them at all, and by Definition 13 with Definition 14 that is precisely what it is for two continuations to be one continuation. Negating the display in Definition 15 gives that and nothing else, so Definition 15 fails there. Each step reverses. Concluding instead that the two are one *State* would reach for a stronger object than the argument delivers.

**Proposition 13.** Agency at a window is sufficient for finite latency there.

One direction of Proposition 12. This is a sufficient condition, it is proved, and it is internal to the structure.

**Proposition 14.** Internal nondeterminism may change which outcome becomes actual without any binding bearing Agency.

Definition 15 compares two contributions available through bound roles. By Definition 13, several outcomes of one unchanged profile belong to one continuation, so whichever of them becomes actual supplies no second contribution for the comparison to be made against. A source *bound* to a role is a different case however it decides, and its output is evaluated through Definition 15 like any other.

The word is nondeterminism and not randomness, and that is not fastidiousness. There is no probability in the signature, so calling the mechanism random would help itself to exactly what the declaration under the signature gave up.

This is the distinction between a chance node and a decision node, reached from the other end. There it is drawn by stipulating which nodes belong to whom. Here it falls out of Definition 15 having a bound source written into it, so nothing had to be stipulated for it to hold.

**Proposition 15.** Concealment does not veto Agency at a window.

By Definition 12, $\Gamma$ holds the contributions admitted at $s_n$ and imposes no condition at all on what any role can tell apart. So uncertainty may leave an intervention a guess without erasing the difference its alternatives expose. What the Rules withhold is a fact about $\operatorname{obs}$ and belongs to $G$, by Proposition 9, so it may well change which States and continuations there are to be separated in the first place. What it cannot do is add an epistemic success condition to Definition 15, because there is none there to add to.

**Remark 16. Rule mutation.** If $G$ permits an intervention to alter a parameter or a Rule, the mutable component lies in $X$, hence in the State, and the permission is a higher-order relation already inside $\longrightarrow$. Otherwise, continuing under the altered relation is continuing under a different configured form $G'$.

This is a dichotomy forced by Axiom 1. Axiom 1 admits no data outside the tuple, so a mutable Rule is either inside the tuple or the form has changed, and there is no third place for it to be. That is a consequence of the exclusion rather than anything learned about mutable Rules.

Agency also does not require a prewritten set of alternatives. An intervention role may authorize its occupant to receive a declaration, observation, or unresolved situation and map it into an operational result. Definition 15 reads the resulting continuations and nothing else about how they were produced.

**Definition 17. Agent.** Where Agency is established, the source bound to the relevant intervention role is an Agent in that relation.

**Proposition 17. Locality.** Agenthood is not intrinsic to a source, and Agency remains local to $\Gamma_{G,I}(\alpha,s_n;\Delta t_n)$.

$G$ defines and limits the role, $I$ establishes the binding, and the transition record attributes the committed intervention. What kind of thing the source is matters only where $G$ uses identity or role as an eligibility condition. The same source may be an Agent through one binding and an observer, part of the infrastructure, or part of a transition under another. Even where $G$ permits an Agent to alter a Rule, that permission is constituted by $G$ under Remark 16, so no Agent stands above the Rules.

**Definition 18.** $\operatorname{Ag}_m(G)$ is the set of pairs of a reachable State and a non-empty set of at most $m$ intervention roles at which Definition 15 holds, reading $\alpha$ there as whatever occupies those roles. Write $\operatorname{Ag}_1(G)$ for the single-role case and $\operatorname{Ag}_*(G)=\bigcup_m\operatorname{Ag}_m(G)$.

It counts roles and not sources. The signature carries no component saying which source holds which role, or how many sources an infrastructure furnishes, so a count of bodies is not among the things available to be taken. One source holding three roles and three sources holding one each spend the same three coordinates here.

The family increases with $m$, and for a trivial reason: a set of at most $m$ roles is also one of at most $m+1$. Proposition 19 says something stronger and less obvious, that Agency itself is inherited upward by every set containing one that has it. It is the influence hierarchy of a set of coordinates, read off the transition: $\operatorname{Ag}_1$ asks which single roles are essential, and $\operatorname{Ag}_m$ asks the same of every set of at most $m$. Membership does not make every role in the set essential, since a supporting set stays supporting when idle roles are padded into it, and Definition 19 is what strips the padding back off. Everything proved above concerns $\operatorname{Ag}_1$ and is untouched by the grading. Below, $\operatorname{Ag}(G)$ without a subscript means $\operatorname{Ag}_*(G)$.

$\operatorname{Ag}(G)=\varnothing$ when no reachable State brings together a set of roles, two available joint contributions, a completion shared by both, and continuations that differ at some finite depth. Such a form may still carry Rules, States, transitions, internal nondeterminism, presentation, and an ordered Trajectory. What it carries nowhere is a point at which what enters through some set of roles could make another continuation actual.

**Proposition 18. Source-substitution invariance.** If $\operatorname{Ag}(G)=\varnothing$, then at every window the continuation is the same whoever is bound to the roles, holding fixed what the unbound roles supply.

Take all the bound roles at that window as one set. By hypothesis Definition 15 fails for it. The only roles that set leaves outside itself are the unbound ones, so a completion is an assignment to those, and the qualification in the statement is the requirement that one such assignment be shared. Given that, the condition applies to every pair of admitted joint contributions completed by it, so any two of them open continuations related at every depth, which by Definition 14 is to say one continuation. Substituting the sources changes which of those contributions is supplied and nothing else.

Where every role at the window is bound there is nothing left to complete, the qualification is vacuous, and the conclusion is unconditional. Where some role is not, whatever it contributes is attributable to no source, so a difference it makes is the kind Proposition 14 already excludes from bearing Agency. Holding it fixed is the discipline Definition 15 applies to the completion, applied here for the same reason.

The grading is what removes the harder condition. Argued over $\operatorname{Ag}_1$ alone it would need the profiles admitted at each State to form a product of what each role may supply there, so that a joint change could be reached one component at a time without passing through a profile the Rules refuse. Nothing guarantees that, and the next remark is a form where it fails.

**Remark 18.1.** $\operatorname{Ag}_1$ and $\operatorname{Ag}_*$ can differ.

Two roles, each authorized to supply $0$ or $1$, with only $(0,0)$ and $(1,1)$ admitted at $x_0$, leading to $x_1$ and $x_2$ separated at depth one. For either role alone the completions of $0$ and of $1$ are disjoint, so no shared completion exists and Definition 15 fails: $\operatorname{Ag}_1(G)=\varnothing$. For the two together there is nothing left to complete, both joint contributions are available, and the continuations differ, so $\operatorname{Ag}_2(G)\neq\varnothing$.

Nothing here is new except the vocabulary. A function whose domain is the full product of what each coordinate may take is constant as soon as no single coordinate is essential, and that is a theorem. The profiles admitted here are a proper subset of that product, which makes the transition a partially specified function, and for those the theorem is false. The particular subset, the two profiles on which the roles agree, is the standard witness to its failure.

The picture behind that is worth keeping, because it says what Definition 19 below is actually measuring. Put the profiles admitted at a State in a graph, joining two whenever they differ at exactly one role, and colour each by the continuation it opens. A one-role witness is an edge between two colours. On the full product that graph is connected, so any non-constant colouring has such an edge somewhere. Here the admitted set is two isolated points with no edges at all, and the colouring is non-constant anyway. What produced the coupling was the admission constraint deleting the edges, not any strength in the pairing itself.

This is why Axiom 7 is stated over $\operatorname{Ag}_*$. Read over $\operatorname{Ag}_1$ it would declare that form not a game, and that form is a coordination arrangement of the most ordinary kind. Agency is not always individual, and a relation looking at one source at a time misses it exactly where the Rules couple the roles together.

Quantifying over every set of roles looks expensive, and it gets much cheaper once the test is written the other way up.

**Proposition 18.2. Difference sets.** Write $\operatorname{Diff}(p,q)$ for the set of roles at which two profiles disagree, and call a pair of profiles admitted at $s$ a witness there when the continuations they open differ at some finite depth. Then $(s,U)\in\operatorname{Ag}(G)$ exactly when some witness at $s$ has $\operatorname{Diff}(p,q)\subseteq U$.

One way: take a triple $\gamma_1,\gamma_2,\delta$ witnessing Definition 15 for $U$ and complete both, giving two admitted profiles that agree everywhere outside $U$. The other way: given a witness with $\operatorname{Diff}(p,q)\subseteq U$, restrict $p$ and $q$ to $U$ for the two contributions and take their common value outside $U$ as the shared completion. The two statements are one test with the fixed coordinates written on opposite sides of the page.

**Proposition 19. Coalition monotonicity.** If $U\subseteq V$ and Agency is established through $U$ at $s_n$, then it is established through $V$ there.

By Proposition 18.2 some witness has its difference set inside $U$, and a set inside $U$ is inside $V$. The whole content of the longer proof this replaces was shifting fixed coordinates out of the completion and into the contributions, which Proposition 18.2 now does once so that nothing after it has to do it again.

**Corollary 19.1.** $\operatorname{Ag}(G)=\varnothing$ exactly when, at every reachable State, the set of all roles there bears no Agency.

One direction is Definition 18. For the other, any set bearing Agency at a State is contained in the set of all roles at that State, which bears it too by Proposition 19.

That turns the emptiness check from one test per subset of the roles into one test per State, which is the difference between something that can be run on a form of ordinary size and something that cannot. It also settles what the grading is for. It is not for deciding whether a form has Agency at all, since Corollary 19.1 shows the largest set answers that by itself. It is for the question underneath, which is how small a set the form will settle for.

**Definition 19. Coupling.** $m^*(s)$ is the least $m$ such that some set of at most $m$ roles bears Agency at $s$, and $\infty$ where no set does. By Proposition 18.2 it is equally the least number of roles at which two admitted profiles can disagree and still open continuations that differ.

By Proposition 19, $m^*(s)$ is finite exactly when the set of all roles bears Agency there, so Definition 19 and Corollary 19.1 read one test at two resolutions. $m^*(s)=1$ says one role is essential at that State. $m^*(s)=2$ says none is and some pair is.

What I want to write next is *the Rules require coordination*, and that is more than has been shown. Two roles is two coordinates, and the signature does not say who holds them, so one source may hold both and coordinate with nobody. Remark 18.1 shows something narrower again: the coupling there came from the admitted set having no one-role step in it, which is a fact about which profiles the Rules refuse rather than about any strength in the pairing. So $m^*(s)=2$ says the nearest pair of admitted profiles with differing continuations is two roles apart, and stops. Not two people, not cooperation, and not how much the roles need each other. What it does say is invisible to Axiom 7, which asks only whether anything is live anywhere, and it is still most of what anyone would want to know about a form that passes.

One quantity is still missing, and it is the other half of a sentence written much earlier. Latency says when a difference shows up. Nothing yet says how long it goes on being one.

**Definition 20. Reach and joining.** For a configuration $x$, $\operatorname{Reach}_j(x)$ is the set of States labelling the ends of paths of at most $j$ admitted transitions from $x$. Two configurations join at depth $j$ when their reaches at $j$ have a State in common.

Reach is taken from a configuration and not from a State, and the reason is easy to walk straight past. A path between States is not available here. $S_G$ has no transition relation of its own unless $\sim_G$ is a relation transitions transfer across, which is what Axiom 6 buys and is false without it, so a reach defined on States would have been importing that axiom while announcing it needed nothing. The walk stays on configurations and only its endpoints are read as States, exactly as Definition 3 set up.

**Proposition 20.** If two configurations join at depth $j$ they join at every greater depth, so where they join at all a least such depth exists.

At most $j$ transitions is at most $j+1$ of them, so $\operatorname{Reach}_j(x)\subseteq\operatorname{Reach}_{j+1}(x)$, and an intersection once non-empty stays non-empty. The depths at which two configurations join are therefore upward closed and have a least element. That is the argument of Proposition 11 run at a different layer, and the parallel is the reason the next definition needs nothing new.

Joining is joinability, under the name it already carries wherever rewriting is studied, and a form in which every fork joins is called confluent. Nothing below needs that property of a whole form. What is wanted is the depth, one fork at a time.

**Definition 21. Reconvergence.** Take a triple $\gamma_1,\gamma_2,\delta$ witnessing Definition 15 at a window, and let $x$ be the configuration the instance is in there. Its reconvergence depth is the least $j$ such that some one State lies in $\operatorname{Reach}_j(u)$ for every outcome $u$ that $\longrightarrow$ admits at $x$ for either of the two completed profiles, and $\infty$ where no such $j$ exists. $h(\alpha,x)$ is the supremum of the reconvergence depths of the witnesses there.

Every outcome, not some outcome. The weaker reading asks only that one outcome of each profile be able to meet, and it says the wrong thing wherever a profile may go several ways: a fork that mostly lands somewhere unrecoverable would be reported as recoverable on the strength of the single branch that happens to come home. The number is for whether the form can take the fork back, and it can only be said to do that if it can do it however the branching falls out.

The price is that $h$ is indexed by a configuration and not by a State, and it is the first quantity here that is. Reach runs along transitions, and Proposition 2 gives configurations of one State the same admitted profiles without giving them matching successors, so two representatives may report different depths. Under Axiom 6 they cannot, since that is where $\sim_G$ becomes a relation transitions transfer across, and $h$ is then a function of the State. Definition 13 with Lemma 13.1 does not rescue this on its own: it makes the continuation representative-independent as an inspectable object, and reach asks something inspections do not answer.

That is the shelf life, made into a number. Consequences having one, and the Rules rather than the writing setting it, was asserted several sections ago and had nothing behind it until here.

Nothing in it contradicts Proposition 10. The two continuations differ at some depth and go on differing at every greater one, and no definition here merges them. What Definition 21 measures is not those two becoming one. It is whether the form admits a route out of every outcome they open into some third State all of those routes share. The fork stays on the record and stops separating what is still available, and those are two facts about it rather than one.

Asking instead that the two continuations come to have the *same* reach would be a different and far heavier demand, because a State belongs to its own reach. Equal reaches would require each continuation to be reachable from the other, and no form carrying a single irreversible transition ever satisfies that. Every fork in such a form would come out permanent, including the ones that visibly are not. What the relation has to be is a shared destination, not an agreement about destinations.

The supremum is deliberate, for the reason Definition 15 is existential. Agency asks whether $\alpha$ can make a difference, not whether everything it holds makes one. Reconvergence asks how long the most durable difference it can make survives. Taking the least instead would let one throwaway option, erased immediately, deliver the verdict on a window where a permanent one was sitting right beside it.

$h=\infty$ says the outcomes of that window share no reachable State at all, so what was done there can be neither undone nor gone around by any route the Rules admit. A small $h$ says the fork was real when it was made and gone shortly after, which is the corridor everything returns to, put in a form that can be checked rather than complained about.

A State the Rules admit no move out of is a place branches may join like any other, so in a form that always arrives at one, $h=\infty$ requires that no ending at all be available to both. That makes the reading narrower than it first looks, and worth stating outright: $h$ reports recoverability, how quickly the form *permits* two branches to be brought back together, and never how likely anyone is to bring them. It is the declaration made alongside the signature arriving at the place where it costs the most.

Reading reach instead of inspections may look like reopening the choice made in Axiom 3. It is not. Axiom 3 settles what counts as a difference between configurations, and Definition 21 leaves that exactly where Axiom 3 put it, then asks a further question about two continuations that relation has already separated. What is available from here is not the same question as whether these are the same, and answering the second with reach does not re-answer the first.

Of the two cautions under Definition 16, one transfers and one does not, and it matters which. Latency is a position in a hierarchy of relations, so it may be ranked and not averaged. $h$ counts committed transitions, which is a count rather than a rank, so arithmetic on it means something that arithmetic on $\lambda$ does not. The other caution transfers untouched. What is counted is what the form admits, and an instance may run its whole length without going anywhere near the branch that does the rejoining.

One question is left, and before attaching it to the word *game*, the mathematics can be made to say exactly what is present when Agency is non-empty and exactly what disappears when it is not.

**Definition 22. Continuation equivalence and the continuation map.** Write $C\equiv_G D$ when no residual inspection separates the continuations $C$ and $D$. Equivalently,

$$
C\equiv_G D
\quad\Longleftrightarrow\quad
\forall k\in\mathbb N:\;C\sim_G^kD
$$

The reverse direction uses Corollary 4.1: if some residual inspection separates them, that inspection has finite depth, so it separates them at some $k$.

For a reachable State $s$, define its admitted-profile set by

$$
P_s:=\{\,p\in\operatorname{Prof}\mid \exists x,x': [x]_{\sim_G}=s\land x\xrightarrow{p}x'\,\}.
$$

Proposition 2 makes $P_s$ independent of the representative configuration, and Lemma 13.1 does the same for the continuation opened by each $p\in P_s$. The map

$$
\kappa_s:P_s\longrightarrow\mathcal C_G,
\qquad
\kappa_s(p):=[\operatorname{Continue}_G(s,p)]_{\equiv_G}
$$

therefore sends each admitted profile to its continuation class, where $\mathcal C_G$ is the quotient of continuations by $\equiv_G$.

**Proposition 21. Agency is non-constancy.** At a reachable State $s$, some non-empty set of roles bears Agency exactly when $\kappa_s$ is not constant.

One way, take a witness $\gamma_1,\gamma_2,\delta,k$ for Definition 15 and complete it to

$$
p=\gamma_1\oplus\delta,
\qquad
q=\gamma_2\oplus\delta.
$$

The two continuations differ at depth $k$, so $\kappa_s(p)\neq\kappa_s(q)$ and the map is not constant.

The other way, suppose $\kappa_s(p)\neq\kappa_s(q)$ for two admitted profiles. Since the continuation classes differ, Corollary 4.1 gives a finite $k$ at which their continuations differ. Let

$$
U:=\operatorname{Diff}(p,q).
$$

The set is non-empty. Restrict $p$ and $q$ to $U$ for the two joint contributions. Outside $U$ the profiles agree, so their common restriction there is one completion $\delta$ shared by both. These restrictions, that completion, and $k$ satisfy Definition 15 for $U$.

Thus the profiles at $s$ may be numerous while contributing no Agency at all: that happens exactly when $\kappa_s$ collapses every one of them into a single continuation class. Internal nondeterminism may remain inside that class. What has disappeared is sensitivity of continuation to the admitted profile.

**Definition 23. Continuation capacity.** Since Axiom 6 makes $P_s$ finite, define

$$
\nu_G(s):=|\operatorname{im}\kappa_s|,
\qquad
a_G(s):=\max\{\nu_G(s)-1,0\}.
$$

$\nu_G(s)$ counts the continuation classes distinguished by the inspection language among profiles admitted at $s$; $a_G(s)$ counts how many remain beyond the first. A terminal State may have $\nu_G(s)=0$, while a State with admitted profiles but no Agency has $\nu_G(s)=1$.

Define the global continuation capacity by

$$
\operatorname{Cap}(G):=
\sup_{s\in\operatorname{Reach}(G)}a_G(s)
\in\mathbb N\cup\{\infty\}.
$$

The reachable set is non-empty because $X_0\neq\varnothing$. Each local value is finite, although the supremum over all reachable States may be infinite.

**Corollary 21.1.** The following are equivalent:

$$
\operatorname{Cap}(G)>0,
\qquad
\operatorname{Ag}(G)\neq\varnothing,
\qquad
\exists s\in\operatorname{Reach}(G):\kappa_s\text{ is non-constant}.
$$

This follows immediately from Proposition 21 and the definition of $a_G(s)$.

**Definition 24. Structural playability.** $G$ is structurally playable when $\operatorname{Cap}(G)>0$. Structural playability is therefore the positive support of continuation capacity. Density, coupling, latency, and reconvergence remain the separate quantities $\rho$, $m^*$, $\lambda$, and $h$.

The remaining step is interpretive rather than derivational.

**Axiom 7. Representation.** Every game is structurally playable:

$$
\operatorname{Game}(G)
\;\Longrightarrow\;
\operatorname{Cap}(G)>0.
$$

Equivalently, a form with constant continuation maps at every reachable State is not a game. No converse is asserted.

$\operatorname{Game}$ occurs in no preceding signature or definition, so Axiom 7 cannot be derived from Axioms 1–6. The formal development instead fixes its exact content and the shape of a counterexample: a form certified as a game for which $\operatorname{Cap}(G)=0$. Definitions are assessed by their use, propositions by their proofs, and Axiom 7 by that world-facing counterexample.

**Remark. The axioms have a model.** A set of axioms with no model proves everything, so one is owed before any of this is worth reading. Take $X=\{x_0,x_1,x_2\}$ and $A=\{0,a,b\}$ with $0$ the null contribution, one role authorized for all three and shown everything, so that a profile here is just that role's contribution, $X_0=\{x_0\}$, and exactly the transitions $x_0\xrightarrow{0}x_0$, $x_0\xrightarrow{a}x_1$, $x_0\xrightarrow{b}x_2$, $x_1\xrightarrow{a}x_1$, and $x_2\xrightarrow{0}x_2$. Admissibility is a reading by Axiom 2, so it separates $x_1$ from $x_2$ at depth one. At $x_0$ the contributions $a$ and $b$ are both available, the single role leaves nothing to complete, and the continuations they open differ, so $(x_0,\{r\})\in\operatorname{Ag}_1(G)$. Axioms 1 to 6 all hold.

Axiom 7 needs a word of its own, because a conditional is satisfied too easily to be worth checking carelessly. Anything with non-empty Agency satisfies it whatever else is true, and this form has non-empty Agency. What the obligation actually needs is that the axiom leave room for a game: declare this form one, and nothing in Axiom 7 objects. Had every model of Axioms 1 to 6 come out with $\operatorname{Ag}(G)=\varnothing$, the set would still have been consistent and would also have said that nothing whatever is a game. So the seven are consistent together and the seventh is not resting on a condition nothing could satisfy.

With that, the Necessary Condition can be stated:

**A rule-constituted possibility space whose operating trajectory can be altered by one or more Agents at a traceable transition window,** $\Delta t$**.**

Every word in that sentence now has a referent above, and one of them went unpaid for a long time. *Traceable* means indexed and attributable: the window is a position in the order given by Axiom 5, and whatever is committed there is attributable to a bound source by Definition 10. It does not mean recorded, logged, or witnessed by anybody.

“Can be altered” is existential in the sense of Definition 18: the relation of Definition 15 holds at at least one binding and one $\Delta t_n$, and says nothing about the rest of the form.

Everything from Definition 1 to Definition 18 is dependency. Agency cannot be spoken about without $\Gamma$ and $\operatorname{Continue}$, those without $\longrightarrow$ and the profiles admitted at a State, a State without the inspections, the inspections without $\operatorname{obs}$, and none of it without $G$. Axiom 7 is not part of that chain. It is the single place where a formal relation is tied to an informal word.

Seven axioms, then. Each one settles something, is used somewhere, and can be refused.

| Axiom | What it settles | Where it is used | Reject it and |
| --- | --- | --- | --- |
| 1. Constitution | nothing outside the tuple bears on gameness | Definition 10, Proposition 17, Remark 16, and the second argument under Where purpose goes | Remark 16 loses its dichotomy, and three exclusions further down each need an argument of their own |
| 2. Self-disclosure | admissibility is inspectable; determined, not computable | Definition 1, Proposition 2, Proposition 8 | Proposition 2 fails, and one State can differ from itself in what it admits |
| 3. Observation is branching | which observation language is in force, linear or branching | Definition 1, Definition 13, Definition 16, Proposition 5 | the tuple clause of Definition 1 loses its purpose, and a form holding two continuations open becomes one that has already chosen and not said so |
| 4. Induction | that finite depth exhausts sameness | Corollary 4.1, hence Proposition 10 and Proposition 12 | Proposition 10 loses its intersection, and an infinite latency stops meaning no Agency |
| 5. Discrete settlement | that there is a window to point at | Definition 9, and every relation indexed by a window after it | Trajectory, latency, reconvergence, and Agency lose their index |
| 6. Finite branching | that sameness here is bisimilarity, so standard results transfer and reach lifts to States | Definition 21, and the transfer to bisimilarity | no outside theorem transfers, and reconvergence drops to a quantity of a configuration |
| 7. Representation | that positive continuation capacity, hence structural playability, is necessary for gameness | the Necessary Condition, and nothing above it | every proposition above still stands, about structurally playable forms rather than games |

The structure was never resting on the identification; the identification was resting on the structure, and arguing it in prose could not have pulled those apart.

### So what does all that settle?

Several arguments that used to eat entire design discussions are now consequences rather than opinions, which means they can be settled by pointing at a numbered line instead of by talking longer.

**Granularity.** "How granular should my model be?" is answered by Proposition 5, and the answer is that you do not choose. The Rules choose. Whatever no admitted inspection can reach is not in the State, however loudly it is displayed. Display is infrastructure; disclosure is a Rule. The reverse case is worse and far more common: a difference you think of as decoration, which some transition quietly reads, is in the State whether you intended it or not. There is a number sitting in Definition 2 for anyone who wants it, since $S_G$ is $X$ collapsed by $\sim_G$, and how far it collapses is how much of your description the Rules never read. A model whose configurations barely collapse is one where nearly everything you wrote down is load-bearing, which is usually a surprise and rarely a pleasant one.

**What a Possibility Space is not.** Not freedom, depth, player expression, or a flattering review score. By Definition 3 it is everything the configured Rules allow the thing to become or perform, and nothing else. Rules do not arrive after a neutral infinity of game-states and cut it down. They constitute those States and transitions as possibilities of $G$.

**Naming the projection.** Definition 5 licenses a discipline, and I mean it as a rule for myself rather than as advice: never claim that two things share a Rule without naming the projection. An unnamed projection is how the describer settles the answer without having to say so. When one person says two things share a Rule and another says they do not, they are usually both correct, and neither has said which projection they meant. The apparent paradox of same Rule, different mechanic dissolves the moment $\pi$ is on the table.

**Material is invisible.** Proposition 7 says that a realization preserves everything definable in this essay and constrains the material not at all. Wood, silicon, paper, and human speech are all invisible to inspection, which can only reach what the Rules disclose and what they admit.

**Leaking.** Proposition 9 settles something usually argued about as taste. Showing a role what the Rules withhold is not a presentation bug. It is realizing another form.

**Choosing and guessing.** Without $\approx_r$ there is no way to say what hidden information *is*, and no way even to pose the difference between a decision and a guess. Definition 12 does not settle that difference, and it says so; what it needed first was somewhere for the question to be asked, which is Definition 11.

And the one that started all of this. An input may be ceremonial, decorative, or useful for keeping someone awake, and whether it establishes Agency is now a question with an answer. A branch is not Agency merely because someone drew two boxes and connected them with arrows, however many buttons, branches, or dialogue wheels the infrastructure puts on the screen. Proposition 12 is the proof of it.

### Why does the condition only point one way?

A necessary condition and a sufficient condition make different commitments. Axiom 7 asserts only

$$
\operatorname{Game}(G)\Longrightarrow\operatorname{Cap}(G)>0.
$$

It is therefore refuted by a form that is a game while every reachable continuation map is constant. Testing such a case requires a declared form and projection; otherwise the structural calculation and the classification are not yet being made about the same object.

A form with positive continuation capacity but disputed gameness does not address this implication. It would address the unasserted converse. The present argument leaves that converse open rather than adding further conditions to settle it.

Nothing here rules out the possibility that a sufficient condition exists. It establishes no such condition and needs none: all structural results above remain valid independently of how the converse is eventually treated.

### Where purpose goes

One candidate comes back more often than all the others put together, so it deserves better than a wave. Purpose. Goals, win conditions, the sense that the thing is *for* something. Surely that is what turns a structure into a game?

It helps to split it into three, because they behave nothing alike.

The first is purpose written into the Rules: a win condition, a terminal State, an ordering over outcomes that some transition reads. That one is already inside. We established earlier that whatever a transition reads is in the State whether it was meant to be or not, so a goal of this kind is not a new component of $G$. It is a predicate definable over one. It is admissible, it is inspectable, it survives realization, and it tells us nothing new, because it was never outside. Nothing in the chain from $G$ to $\operatorname{obs}$ to $\approx_r$ to $\Gamma$ to Agency produces it. It gets selected.

The second is purpose behind the artifact: someone built this to be played. That one is not a matter of taste, it contradicts something already established. Different infrastructures may realize the same $G$, because realization preserves exactly the inspections. Intent is not preserved by realization. So the same $G$ would be a game on one arrangement of material and not a game on another, which contradicts the criterion that made them the same $G$ to begin with. Whatever else is true of designer intent, it cannot be a component of the thing that is indifferent to material.

The third is purpose in the occupant: the source bound to a role wants to win, cares how it ends, is trying. That one falls to an argument made further below about knowledge. The Rules fix what a role is shown; they say nothing about what its occupant has worked out from being shown it, and no move reads that. The same holds word for word for what the occupant wants. And the entry condition is the same too: say which part of the form they are, and which move reads them. Do that, and it has become the first case.

So three collapse to two, and neither survives. One is redundant, one is inconsistent.

Without a valuation, $\operatorname{Ag}(G)$ is intentionally indifferent to preference. A cosmetic option that a later transition reads may therefore establish Agency even when no occupant values the difference. Adding a goal or preference ordering would define a stronger relation. A rule-borne valuation can be represented inside $G$; an external valuation would add data not preserved by realization. Neither is required by the structural condition developed here.

Worth noting that attaching a goal is also the move made wherever these structures get treated formally. A set of states with roles, moves and transitions becomes a *game* in that setting precisely when a winning condition is fixed on it, and a payoff function is purpose written as arithmetic. Both are perfectly good, and both were adopted because someone needed to ask a question that requires them. Neither narrows the extension toward what people are pointing at when they use the word. They widen it toward markets, wars, and evolution.

Purpose does have three places to live here, and none of them is inside the condition.

- **As a projection.** Declare $\pi_{\text{goal}}$ and ask whether two forms are the same with respect to what they steer toward. That is a comparison, fully licensed by everything above, and it costs nothing.
- **As a way to sort forms that already pass.** Goal-directed and open are useful kinds of game. That is a taxonomy of games rather than a criterion of gameness, and it stops being an argument the moment it is labelled correctly.
- **On the layer this essay set aside in its first two lines.** Whether a thing ought to have a goal, and what a goal does to the people who show up, is a real question and not this one.

### Consequences

From the relations assembled above, three consequences follow.

#### Consequence 1: No structurally “wrong” play remains

**If an action lies within the Possibility Space constituted by the Rules, it cannot be wrong in the sense of being outside the game.**

It may be strategically awful. It may annoy the other players. It may break an agreement that was never part of the rules. It may expose a design mistake. None of those judgments reaches back and removes the action from the Possibility Space.

The reason is almost embarrassingly short. The Possibility Space just is everything the Rules let you reach from where the thing is allowed to start. So if the Rules admitted the move, the result is in there. There is nowhere else for it to be. Saying the move was outside the game amounts to saying the Rules both allowed it and did not, which is not a criticism of the player, it is two sentences that cannot both be true.

That shortness is the point. I am stuck with it either way, and it would hold even if I hated every case it covered.

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

Agency concerns the alteration of continuation, not ownership of an endpoint. A fixed destination may receive different Trajectories. A variable destination may still be reached through predetermined operation. Neither linearity nor branching settles it. What settles it is how deep a difference goes, and whether it ever folds back. Those are two definitions and not one. Latency measures when a difference becomes visible, and by Proposition 10 a difference visible at one depth stays visible at every greater one, so latency cannot fall when two Trajectories arrive back at a common State. Reconvergence measures the other half, and it is Definition 21. The complaint that choices did not matter is almost always aimed at the second, and the two are independent: a difference may be immediate and permanent, immediate and erased, delayed and permanent, or delayed and erased.

Story endings and credits therefore have no privileged place in this condition. Plot, dialogue, authored events, and fixed outcomes may participate directly in the game when they become States, facts, transitions, and consequences constituted by $G$. They may also remain presentation. Neither position makes them inferior. It only tells us what they are doing.

#### Consequence 3: Gameness is distributed

**The existence of Agency at one transition window says nothing about its presence, density, or reach elsewhere.**

The condition only ever claimed *somewhere*. It establishes Agency where the relation actually shows up, and it does not spread that across every State, every stretch of the Trajectory, or every subsystem just because they shipped in the same box.

A game may therefore contain long stretches where nothing anyone does changes anything, one subsystem thick with real interventions, and another where a single rare intervention reorganizes everything after it. Two different questions live here, and they are easy to confuse. How much of a subsystem actually carries Agency at all. And how far a difference travels before it folds back, if it ever does. A thousand inputs that all return to the same corridor answer the second question with a zero. One input that does not is the whole answer. Both are answered below, by different quantities, and the paragraph naming the measures says why they must not be run together.

So every State a game can reach falls on one side or the other. Either the sources bound there have two joint contributions leading somewhere genuinely different against one and the same completion, or they do not, and by Corollary 19.1 asking that of all of them at once asks it of every smaller set as well. That much is just cutting a room in half, and cutting a room in half proves nothing. The part with content in it is what happens when you change the machine. Change it and the two sides do not move, not one State crosses over, because the line was drawn using only the Rules, who is permitted to act, what they are shown, and where those actions lead. Nothing else was ever let into it, so a new machine has nothing to take hold of. A remake cannot bring a dead stretch to life and it cannot kill a live one, unless it changed the Rules, in which case it is not a remake of the same thing.

Which means the line between game and not-game does not run between products. It runs *inside* one, and it is a fact about that product rather than a tribal taxonomy. It also means “less game” stops being an insult. It is a proportion, how much of what a thing can reach has a live window in it, how few roles the form insists on before anything is live at all, and how hard it is to take back what happens at a live window. All of them are well defined wherever the reachable States and the roles are finite, and being well defined is not the same as being calculable from a rulebook. A form whose Rules are expressive enough to encode arbitrary computation can be perfectly definite about both numbers while no procedure reads either of them off the Rules, and such forms are neither rare nor contrived. Whether a thing ought to have more or less of it belongs to a different layer.

Since they are well defined, they may as well be named. Write $\rho(G)$ for the share of reachable States at which Agency is established, against all reachable States, which by Corollary 19.1 is the share at which the set of all roles bears it. Write $\bar\lambda(G)$ for the distribution of $\lambda$ across the windows where Agency does hold, $\bar h(G)$ for the distribution of $h$ across those same windows, and $\bar m(G)$ for the distribution of $m^*$ across the States where it is finite. All four are defined outright wherever the reachable States and the roles are finite, and need a declared measure otherwise.

$\rho$ is a share of States and not of pairs, and the difference is not cosmetic. Counting pairs of a State and a set of roles puts a denominator on the page that grows like the subsets of the roles, while Proposition 19 guarantees that one live role drags every set containing it into the numerator. The ratio would then move with how many roles a form happens to have and say nothing about the form, which is fatal for a quantity whose only job is comparing forms. Counting States removes the combinatorics from both sides, and what the grading knows that a State count does not is recovered by $\bar m$, where it belongs.

$\bar\lambda$ is a distribution of ranks in the finite-depth inspection hierarchy, not an arithmetic average or a distance along an actual Trajectory. $\bar h$ is separate: latency records the least depth at which a difference is inspectable, while reconvergence records how quickly the opened outcomes can reach a common State.

All four combinations occur and none of them is a malfunction. Small $\lambda$ with infinite $h$ changes things at once and permanently. Small $\lambda$ with small $h$ is feedback without consequence, which is often exactly what a form should be doing at that moment. Large $\lambda$ with infinite $h$ is the consequence that surfaces much later and then stays. Large $\lambda$ with small $h$ is the one worth naming: subtle, delayed, and erased before it reaches anything. That is a thousand inputs returning to the same corridor, arriving by a more flattering route.

And $\rho$ ranges over reachable States, not over the States an instance actually visits. A form may be live almost everywhere and still route every ordinary Trajectory through the dead part. $\rho$ is a property of $G$; what a player meets is a property of $I$ together with a distribution over play that this signature does not carry.

$\rho$ counts, and that follows from the signature rather than from a preference. The established way to measure how much a coordinate matters is its influence, and influence is an average taken against a distribution over the inputs. There is no distribution here, by the declaration made alongside the signature, so $\rho$ counts the States where the relation holds and weights none of them. Everything established about influence is established about the weighted quantity and does not carry over. That is the second bill the no-probability decision has run up, and it is better to know which bill it is than to discover later that a result was assumed to apply.

All four are built out of $\operatorname{Ag}(G)$, $\longrightarrow$, and $\sim_G$, and each of those comes from $G$ and nothing else. Realization preserves every inspection, so it cannot move any of them. That is the claim about remakes above, restated so it can be checked instead of asserted: a remake with the same Rules, the same authority, and the same disclosure has the same $\rho$, the same $\bar\lambda$, the same $\bar h$, and the same $\bar m$, whatever it did to the material.

A threshold on any of them would be a sufficient condition with a number in it, ruled out by Axiom 7 rather than by a new decision. These describe how much of a form is live, how much of it has to act together before anything is, and how hard what it does is to take back.

## Some Thought Experiments

I will leave the answers unwritten. Not because I do not have them, but because, if everything above is clear, I should not have to provide them.

- Suppose humanity goes extinct, leaving behind only a complete rulebook for **chess**. Does chess still exist when nobody is there to play it? If aliens find only a wooden chess set and invent a completely different way to use it, are they playing chess? If they instead find the rulebook and make their own pieces from granite, has the game changed, or only what it is played with?
- Suppose a **composition by Beethoven** remains unheard in a drawer for centuries before being discovered. Was it not music during that time? Beethoven was deaf when he wrote late in his life. Does that put what he wrote outside of music?
- Four fish swim in a tank while sensors turn their movements into controls for **Pokémon Sapphire**, and eventually the game is beaten. Does *Pokémon* stop being a game because the inputs came from a fish? Does the fish have to know it is playing, or intend to play at all?
- The ball enters the net. No player is offside, yet the assistant referee raises the flag, the referee disallows the goal, and VAR is not consulted. At that moment, is this still the same game of **football**? Do the rules give the referee the power only to judge what happened, or to make a ruling that counts even when the judgment is wrong? Does VAR change the rules of football, or only how decisions are checked and made final?
- In a **D&D** session, the DM gives one player two turns to compensate for falling behind the rest of the table. Is this still the same game? Was the DM allowed to make that ruling under the rules the table was already using, or did the table just add a house rule?
- Six children play by rules they made together. Child A scores with a move that is allowed at the time. Before child B can repeat it, the group changes the rule to forbid it. Does the new rule erase A’s earlier score, or does it apply only from that moment onward? If B performs the move anyway, is it valid now? What changed between the two attempts? What game are they playing now?

## On the Player Side

Everything so far has been about the thing. What about the person on the other side of it?

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

The exclusion of the observer is a scope consequence of the signature, not an independently derived fact. An observer-dependent feature enters the configured form only when it is represented in $G$ and some admitted relation reads it; otherwise it belongs to the relation between the form, its presentation, its context, and the observer.

At the level of experience, I treat meaning as arising through the relation between Rules, presentation, context, and the observer. A player may find a Trajectory heroic, offensive, boring, sacred, cruel, hilarious, or meaningless. Another player may experience the same sequence differently. Neither response rewrites the Rules, the Possibility Space they constituted, or the Trajectory that occurred. In this structural sense, gameness is neutral.

A designer may construct the conditions of an experience through Rules, presentation, information, rewards, punishments, and consequences. The designer cannot complete that experience on the player’s behalf. There is no checkbox for mandatory interpretation, however convenient it would be.

And no, plot, messaging, and story do not clash with games. If they are to participate in the operating Trajectory, they must become operational through Rules, States, and consequences. If they remain presentation, then they remain presentation.

Adapting a film or novel into a game is therefore not merely a matter of distributing the play button across a shooting gallery, an axe-throwing segment, three yellow-painted ledges, and a giant pipe-shaped hallway hiding a loading screen. The material must be reconstructed through the relations that make it operate as a game. That could be a good artistic product, but maybe, it has less game than you think.

> Just respect the intelligence and stature of the player, just as I respect you, and you respect me, alright?

## Conclusion

In reality, we do not need to settle every possible definition before taking one step closer to the thing itself. We only need to stop mixing every layer together.

I think, as Indie game dev, we should just keep it simple: before trying to make a game fun, moving, groundbreaking, artistic, addictive, etc,..., well, try to make the part that has to be a game work as a game first. Then build everything else upon it.

Recreating your imagination is not a simple matter of draw a map, throw your story and your massive contents into it then add some button prompts. If it has to become a game, then it has to be reconstructed through Rules, Trajectory, Agency,... you know, all the bullshit I have been rambling about above.

I am not trying to provide every answer. I am trying to make the question precise enough that the next answer has somewhere solid to stand. Every symbol up there is doing a job, and the only reason any of them exists is that without it a sentence I needed could not be said at all. If I ever catch one just standing around looking clever, it goes. If you want to understand the thing you are passionate about before deciding what else to do with it, I hope this gives you a perspective worth pondering.
