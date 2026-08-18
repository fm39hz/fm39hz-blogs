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

What follows is a signature, seven axioms, definitions, and what can be derived from them. Nothing else belongs in this section. The axioms are not claims I argue for; they are the choices I am making, put somewhere they can be seen and refused. Glosses, worked cases, and the argument for why the last axiom points one way have their own sections afterward.

Setting it out this way has a known price, and the price is the reason to pay it. A system precise enough to have a proof relation is precise enough to be incomplete, and incompleteness is a cost with a name and an address. Prose cannot be incomplete. It can only be vague, and vagueness has neither. I would rather hold something that can be shown to fall short in a specific place than something that can never be shown to fall short at all.

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

Last, somewhere the thing may begin: $X_0\subseteq X$. Nothing else in that sentence has an unmet requirement, which gives

$$
G=\langle X,\;A,\;R,\;\operatorname{auth},\;\operatorname{obs},\;\longrightarrow,\;X_0\rangle
$$

Arriving at it this way was the point, but it is worth naming what was arrived at. This is a concurrent game structure with imperfect information: a carrier of configurations, roles acting at once, an authority function, an indistinguishability apparatus, and a transition relation consuming one contribution from every role simultaneously. It is a standard object with a standard name, and I would rather use the name than let a derivation pass for an invention. What the derivation buys is that every slot is here because the sentence about Rules required it, rather than because some definition elsewhere happened to carry it.

Four remarks before the first axiom, all of which are load-bearing later.

$\operatorname{Prof}$ is defined from $A$, $R$, and $\operatorname{auth}$, so it is notation rather than a component.

$X$ is not the State space. It is deliberately too rich: anything the form can be in, described as finely as you like, including detail that will turn out to be irrelevant. Deciding here which detail is irrelevant would be assuming the answer to the question Definition 2 exists to settle.

Since $\operatorname{obs}$ sits inside $G$, disclosure is a Rule like any other. Concealment is not something done to the Rules. It is one of them.

And there is no probability anywhere in the signature. Where a transition may go several ways, $\longrightarrow$ records which ways and says nothing about how often, so a form weighted ninety-nine to one and a form weighted evenly are the same $G$ here. That is a real restriction and I would rather declare it than have it found. Everything below is about what a form admits, never about what it tends to do. Adding a measure would be a different essay, and it would not alter a single relation defined in this one.

A signature cannot be false. What can be false is the claim that seven slots are enough, and that claim is the first axiom rather than part of the stipulation, so that it can be attacked separately from the notation.

**Axiom 1. Constitution.** Gameness is a property of structures of this signature and of no further data.

All of it can be refused, and refusing it is the cleanest way to disagree with this essay. It is what makes material, authorship, intent, and reception inadmissible later, and it does that once, here, rather than four separate times further down.

So there is a structure, and by Axiom 1 nothing outside it counts. What can a structure like that tell about itself?

**Axiom 2. Self-disclosure.** The readings available to $G$ itself are every reading $\operatorname{obs}(r)$ discloses to any role $r$, together with, at each configuration, which profiles are admitted there. A body of Rules that cannot tell what it permits next is not a body of Rules.

These are determined by $G$. Determined is not the same as computable, and nothing below asks for the stronger reading. A form whose admitted set is fixed but not effectively calculable satisfies this axiom. Reading it as computability would throw out rule systems expressive enough to encode arbitrary computation, and those are neither rare nor artificial.

And when a profile can go several ways, is looking a matter of following one of them, or of following all of them at once?

**Axiom 3. Observation is branching.** An inspection may follow every admitted outcome of an intervention and compare the outcomes side by side.

This is the one genuine choice in the section, so it goes in the open rather than in a footnote. Where an intervention has a single outcome the question does not arise. Where it has several, there are two readings and they are not the same relation. Read an inspection as a run, and two configurations are separated when some result is obtainable at one and not at the other. Read it as a probe following every admitted outcome, and they are separated whenever their branching differs, even where every obtainable result agrees. This is the linear and branching distinction, and the gap between the two readings is not hypothetical. Take a form where one intervention $a$ leads to a single configuration admitting both $b$ and $c$. Take another where $a$ may lead to either of two configurations, one admitting only $b$ and the other only $c$. The obtainable sequences are $ab$ and $ac$ in both, so the run reading cannot separate them. A probe that makes $a$ and inspects every outcome separates them at once: in the first form every outcome of $a$ admits $b$, and in the other one of them does not. That pair is the proof that the probe reading is strictly finer, and it is short enough that there is no reason to assert the fact instead of showing it.

Axiom 3 takes the probe reading, because the run reading identifies a form that keeps two continuations open with a form that has already settled which one you get and has not disclosed it yet, and the commit apparatus below exists to keep exactly that difference visible.

**Definition 1. Inspection.** The inspections of $G$ are generated by two clauses. At each configuration, every reading available to $G$ under Axiom 2 is an inspection. And making one admitted profile and inspecting every outcome under Axiom 3 is an inspection.

There is no third generator, because only $\operatorname{obs}$ shows anything and only $\longrightarrow$ goes anywhere, while the rest of the tuple is inventory, permission, and where the thing may start.

That says how a look is put together. It does not say how far one can go. So how far can a single look go?

**Axiom 4. Induction.** Nothing is an inspection except by the two clauses of Definition 1.

**Corollary 4.1.** Every inspection is finite.

By induction on the generation. The first clause yields inspections of one step, the second extends an inspection already yielded by one intervention, and by Axiom 4 there is no third way for anything to arrive. An infinite inspection would have to arrive by a route that does not exist.

This is the axiom I would most like to state fully and cannot. A closure clause is easy to write; a *nothing else* clause is not. In a first-order setting the second cannot be enforced at all, and the axioms would admit models carrying inspections that no finite generation reaches. I have no way around it. It is worth saying plainly where that leaves things: this is the one place the price named at the top of this section is actually charged, and it is charged here rather than in any of the places the charge is usually expected.

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

**Proposition 5.** Coarsening $\sim_G$ is inconsistent. Refining it is idle. The two halves are not equally strong and running them together would overstate the result.

Coarsen it and you merge configurations some inspection does tell apart, so after the merge that inspection both returns a result and does not. That is a contradiction, and what survives is a different form. Refine it and nothing goes wrong. You have separated configurations no inspection can reach, and the added distinction is invisible to everything definable in this section, so no proposition below can so much as mention it. Granularity is therefore barred in one direction and useless in the other. It is fixed by Axioms 2 and 3, and Axiom 3 is the only place a choice entered.

That is one State. What about all of them, meaning the whole of what a form can reach?

**Definition 3. Possibility Space.** The configurations reachable from $X_0$ through admitted transitions, read as States, together with what is admitted at each of them. Write $\mathcal P_G$.

Everything below is relative to the $G$ actually declared.

Now the debt from the Xiangqi sentence, which has been sitting there since the opening list. A pawn and a cannon share no movement mechanic and both consume one turn, and I said that only became true once I named the comparison I was making. So when do two forms express the same Rule?

**Definition 4. Projection.** A map $\pi$ out of $X$ keeping a chosen family of distinctions and discarding the rest, carrying $\longrightarrow$ along with it to give a projected form $\pi(G)$.

**Definition 5. Sameness relative to a projection.** Two forms express the same Rule relative to $\pi$ when $\pi(G_1)$ and $\pi(G_2)$ admit the same inspections, up to a renaming of interventions.

**Remark 6.** Sameness relative to $\pi$ is not identity relative to $\pi$.

What follows states what Definition 5 is doing, and it earns its place because the two are confused constantly. Inside a declared $G$, identity is settled and relative to nothing: two configurations are one State or they are not, and Definition 2 says which. What Definition 5 produces is a comparison between forms, and a comparison is entitled to name which distinctions it holds up. Nothing here asks identity itself to come in flavours. Two forms may therefore come out the same under one projection and different under another with both results standing, since each is only ever about the distinctions its own projection kept, and there is no sameness sitting outside every projection waiting to be got right.

That settles what a comparison is about. Now a question that is smaller and much older than it looks. Does any of this care what the thing is made of?

**Definition 6. Infrastructure.** The material, computational, or procedural arrangement through which $G$ can be represented or operated. An infrastructure carries a raw transition structure of its own.

**Definition 7. Realization.** An infrastructure realizes $G$ when its configurations correspond to those of $G$ in a way that matches interventions one for one, matches roles one for one, preserves $\operatorname{auth}$ and $\operatorname{obs}$ under those matchings, and preserves every inspection.

Preserving transitions alone would not be enough, and neither would preserving inspections alone. A correspondence can leave every transition and every reading intact and still reassign who is authorized to act, because authority is not recoverable from inspections at all: an inspection reads a configuration, while $\operatorname{auth}$ is indexed by a role. By Axiom 1 a reassignment of authority produces a different form rather than the same form on different material, so the requirement belongs inside the definition rather than in a remark beside it. Everything below that quantifies over realizations depends on its being there.

**Proposition 7. Realization-invariance.** Anything defined from inspections alone takes the same value on every realization of $G$.

Immediate from Definition 7. Everything constructed in this section is defined from inspections alone, so $\sim_G$, $S_G$, $\mathcal P_G$, and every relation built from them below inherit invariance without further argument. Nothing later has to earn it separately. It is earned here, once.

Nothing so far has been running. What changes when somebody actually runs it?

**Definition 8. Operating instance.** An infrastructure is not yet an operating instance. When an admitted State is actualized through it, an operating instance begins. Write $I$. It commits one ordered Trajectory through $\mathcal P_G$.

The Possibility Space may branch, loop, and admit many counterfactual continuations. The Trajectory already committed does not branch retroactively. Non-linearity belongs to the structure of possible continuations; actualization produces an ordered history. A Trajectory does not require a built-in ending, and remains an ordered history for as long as the instance continues to operate.

The configured form, the infrastructure realizing it, an operating instance, and an observer encountering that instance are four distinct relations. When no instance is operating, no Trajectory is being actualized, while $G$ and $\mathcal P_G$ remain exactly what they were.

**Axiom 5. Discrete settlement.** $G$ exposes its operation as an ordered sequence of committed transitions.

This does not follow from anything above, which is why it is an axiom and not a step. Everything below concerning windows, latency, and Agency leans on it. A commit is whatever the form treats as settled: not a clock, not a frame, not a turn counter. Settlement is the only thing there is to order, since a prefix is just the part no longer in question, and with nothing settled there is no prefix and nothing for a continuation to continue from. Measuring does not rescue it, since a form could measure perfectly, settle nothing, and still have no Trajectory to alter. What is ordered is acknowledgement, and acknowledgement is discrete wherever it occurs, because a thing is either still in question or it is not.

**Definition 9. Transition window.** $\Delta t_n$ is the window joining $s_n$ to $s_{n+1}$ in the order given by Axiom 5, a logical position and not a measurable duration in physical time. Write $\Delta t$ for such a window in general.

At $\Delta t_n$, an admitted profile $p$ enters the transition:

$$
s_n\xrightarrow[\Delta t_n]{p}s_{n+1}
$$

To alter the Trajectory is to make a different admitted continuation become actual from the same prefix. It does not mean rewriting a past that has already occurred.

Nothing so far guarantees Agency. What it gives is a Possibility Space, an operating Trajectory, and a window at which Agency could be expressed.

So who is it that makes something happen there, and how much of the form can they actually reach?

**Definition 10. Role and binding.** At a window, $G$ may provide one or more intervention roles. A role specifies which contributions may become operative there and the authority with which they enter operation; it does not identify the concrete source that will supply them. The operating instance $I$ binds a source $\alpha$ to such a role through its infrastructure and under whatever eligibility conditions $G$ imposes. A committed intervention is attributable to $\alpha$ when it enters through the role to which $\alpha$ is bound. Anything merely carrying or translating that output remains infrastructure in this relation. Where several outputs enter through separate bindings, each may be evaluated on its own or jointly with others, and Definition 18 keeps those cases apart.

A source may be an individual, a collective producing one joint output, or an autonomous process. By Axiom 1, nothing further about it is admissible here.

Two constraints determine what $\alpha$ can reach. The first is authority: nothing outside $\operatorname{auth}(r)$ for the roles currently bound to $\alpha$. The second is information. A State is the complete condition of the form, not what any one role is shown, and in every form that conceals anything the two come apart.

**Definition 11. Role-indistinguishability.** For a role $r$, $\approx_r$ is indistinguishability by inspections built from $\operatorname{obs}(r)$ alone.

**Proposition 8.** $\approx_r$ is coarser than $\sim_G$, and strictly coarser exactly when the Rules withhold something from $r$.

By Axiom 2, $\operatorname{obs}(r)$ is one member of the family generating $\sim_G$, so a relation built from it alone can only be coarser, and is strictly so precisely where some other reading separates configurations it does not.

**Proposition 9.** $\approx_r$ is fixed by $G$ and not by $I$.

$\operatorname{obs}$ is a component of $G$. Two arrangements differing in what a role is shown differ in $\operatorname{obs}$, hence by Definition 7 are two forms rather than one form on different hardware.

**Definition 12. Available contributions.** $\Gamma_{G,I}(\alpha,s_n;\Delta t_n)$ is the set of contributions $\gamma$ that $\alpha$ can supply through the roles bound to it, where $\alpha$ is either one source or a set of sources supplying jointly. Each such $\gamma$ is authorized by those roles, occurs as their component in some profile admitted at $s_n$, and is constant on the $\approx_r$-classes of those roles.

The constancy requirement is forced rather than added: what cannot be distinguished cannot be conditioned upon. It is the uniform strategy condition, under its usual name. Where $\alpha$ is a set, it applies to each component separately, so members may settle in advance what each will supply and still cannot pool what the Rules show them one by one.

One thing about this definition has to be declared rather than left to be found. Constancy is a condition from the role's side, while admissibility is checked at $s_n$, the configuration the form is actually in. Those are two viewpoints, and wherever $\approx_r$ relates configurations admitting different profiles they come apart: a contribution constant across the class may be admitted here and refused there. The standard treatment forbids the situation outright, by requiring indistinguishable configurations to offer a role the same options. I am not requiring it, because forms whose admitted moves depend on what is concealed are ordinary rather than exotic. The price is that $\Gamma$ is read from outside, at the configuration the form is in, which makes it wider than a reading demanding that every contribution be playable everywhere the role cannot rule out. Agency is correspondingly easier to establish, and that belongs on the same list as the generosity noted under *Where purpose goes*.

What the other roles supply is no part of $\gamma$. Write $\delta$ for a completion, an assignment to every role not bound to $\alpha$ such that $\gamma\oplus\delta$ is a profile admitted at $s_n$, and write $\Delta_{G,I}(\gamma,s_n)$ for the completions of $\gamma$.

**Definition 13. Continuation.** $\operatorname{Continue}_G(s_n,p;\Delta t_n)$ is the continuation recognized by $G$ after admitting the profile $p$ there.

Requiring only that the next State differ will not do, since two interventions can lead to different next States which then fold back together and leave nothing behind. Difference has to be stratified by how deep an inspection must go to find it.

**Definition 14. Depth-**$k$ **indistinguishability.** $\sim^k_G$ is indistinguishability by inspections spending at most $k$ transitions. Two continuations differ at depth $k$ when they are not $\sim^k_G$-related, meaning the difference is detectable within $k$ committed transitions.

**Proposition 10.** $\sim^{k+1}_G\subseteq\sim^k_G$, and $\bigcap_k\sim^k_G=\sim_G$.

Going deeper only adds inspections, which gives the inclusion. Every inspection is finite by Corollary 4.1, so an inspection separating two configurations does so at some finite depth, which gives the intersection. Nothing further is assumed, and this holds under either reading of an inspection.

**Axiom 6. Finite branching.** Each configuration admits finitely many profiles, and each admitted profile has finitely many outcomes.

No proposition in this section uses Axiom 6, and it is worth being exact about why, because two statements here look alike and are not. Proposition 10 runs on Corollary 4.1 alone. What Definition 2 builds is the equivalence induced by the inspection language itself, the finite-depth relations are its approximants, and their intersection is that equivalence by construction rather than by theorem.

What Axiom 6 buys is the other statement: that this equivalence coincides with bisimilarity, the relation of the same shape used throughout the study of transition systems. That coincidence is the Hennessy-Milner theorem, finite branching is precisely its hypothesis, and without the hypothesis it is false. So the proposition needs nothing and the transfer needs everything, which is the whole reason they are separated here.

Drop Axiom 6 and nothing above breaks: $\sim_G$ remains exactly the finite-depth relation defined above, and forms differing only in the limit go unseparated. It is stated as an axiom rather than proved because it is a restriction on which forms are under discussion, and it is stated at all because anyone importing an outside theorem needs it.

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

The two contributions are counterfactual alternatives available at one $\Delta t_n$; the operating instance actualizes only one.

**Definition 16. Latency.** $\lambda(\alpha,s_n)$ is the least $k$ satisfying Definition 15, which exists by Proposition 11, and $\infty$ when no such $k$ exists.

**Proposition 12.** At a window and a binding, the following are equivalent: $\lambda=\infty$; against every completion, all of $\alpha$'s available contributions lead to one and the same State; $\alpha$ bears no Agency there.

The completion has to be held fixed inside the middle clause, for the same reason it is held fixed in Definition 15. Continuations reached against *different* completions may perfectly well be different States, and that difference belongs to whoever supplied the completion. What $\lambda=\infty$ says is that within each completion taken on its own, nothing $\alpha$ does moves anything.

$\lambda=\infty$ means no inspection at any finite depth separates the continuations reached against a shared completion. Every inspection is finite by Corollary 4.1, so no inspection separates them at all, so they are one State by Definition 2. One State does not differ from itself in what it admits or discloses, by Proposition 2, so Definition 15 fails there. Each step reverses.

**Proposition 13.** Agency at a window is sufficient for finite latency there.

One direction of Proposition 12. This is a sufficient condition, it is proved, and it is internal to the structure. What is declined further below is a different thing entirely.

**Proposition 14.** Randomness internal to a transition may change which continuation occurs without any binding bearing Agency.

Definition 15 quantifies over contributions available to a bound source. Branching attributable to no binding does not satisfy it. A random source *bound* to a role is a different case, and its output is evaluated through Definition 15 like any other.

This is the distinction between a chance node and a decision node, reached from the other end. There it is drawn by stipulating which nodes belong to whom. Here it falls out of Definition 15 having a bound source written into it, so nothing had to be stipulated for it to hold.

**Proposition 15.** Information asymmetry adds nothing to Definition 15 beyond $\approx_r$.

Whether the Rules withhold is a fact about $\operatorname{obs}$, by Proposition 9. What constrains $\Gamma$ is what the Rules disclose to a role, never what the occupant of that role has worked out.

**Remark 16. Rule mutation.** If $G$ permits an intervention to alter a parameter or a Rule, the mutable component lies in $X$, hence in the State, and the permission is a higher-order relation already inside $\longrightarrow$. Otherwise, continuing under the altered relation is continuing under a different configured form $G'$.

This is a dichotomy forced by Axiom 1. Axiom 1 admits no data outside the tuple, so a mutable Rule is either inside the tuple or the form has changed, and there is no third place for it to be. That is a consequence of the exclusion rather than anything learned about mutable Rules.

Agency also does not require a prewritten set of alternatives. An intervention role may authorize its occupant to receive a declaration, observation, or unresolved situation and map it into an operational result. Definition 15 reads the resulting continuations and nothing else about how they were produced.

**Definition 17. Agent.** Where Agency is established, the source bound to the relevant intervention role is an Agent in that relation.

**Proposition 17. Locality.** Agenthood is not intrinsic to a source, and Agency remains local to $\Gamma_{G,I}(\alpha,s_n;\Delta t_n)$.

$G$ defines and limits the role, $I$ establishes the binding, and the transition record attributes the committed intervention. What kind of thing the source is matters only where $G$ uses identity or role as an eligibility condition. The same source may be an Agent through one binding and an observer, part of the infrastructure, or part of a transition under another. Even where $G$ permits an Agent to alter a Rule, that permission is constituted by $G$ under Remark 16, so no Agent stands above the Rules.

**Definition 18.** $\operatorname{Ag}_m(G)$ is the set of pairs of a reachable State and an admissible set of at most $m$ bindings at which Definition 15 holds, reading $\alpha$ there as the sources of that set taken together. Write $\operatorname{Ag}_1(G)$ for the individual case and $\operatorname{Ag}_*(G)=\bigcup_m\operatorname{Ag}_m(G)$.

The family increases with $m$, since a set of at most $m$ bindings is also one of at most $m+1$. It is the influence hierarchy of a set of coordinates, read off the transition: $\operatorname{Ag}_1$ asks which single sources are essential, and $\operatorname{Ag}_m$ asks the same of every set of at most $m$. Everything proved above concerns $\operatorname{Ag}_1$ and is untouched by the grading. Below, $\operatorname{Ag}(G)$ without a subscript means $\operatorname{Ag}_*(G)$.

$\operatorname{Ag}(G)=\varnothing$ when no reachable State brings together roles, an admissible set of bindings, two available joint contributions, a completion shared by both, and continuations that differ at some finite depth. Such a form may still carry Rules, States, transitions, randomness, presentation, and an ordered Trajectory. What it carries nowhere is a point at which bound sources could make another continuation actual.

**Proposition 18. Source-substitution invariance.** If $\operatorname{Ag}(G)=\varnothing$, then at every window the continuation is the same whoever is bound to the roles, holding fixed what the unbound roles supply.

Take all the bindings at that window as one set. By hypothesis Definition 15 fails for it. The only roles that set leaves outside itself are the unbound ones, so a completion is an assignment to those, and the qualification in the statement is the requirement that one such assignment be shared. Given that, the condition applies to every pair of admitted joint contributions completed by it, so any two of them lead to continuations related at every depth, hence to one State by Proposition 10 and Definition 2. Substituting the sources changes which of those contributions is supplied and nothing else.

Where every role at the window is bound there is nothing left to complete, the qualification is vacuous, and the conclusion is unconditional. Where some role is not, whatever it contributes is attributable to no source, so a difference it makes is the kind Proposition 14 already excludes from bearing Agency. Holding it fixed is the discipline Definition 15 applies to the completion, applied here for the same reason.

The grading is what removes the harder condition. Argued over $\operatorname{Ag}_1$ alone it would need the profiles admitted at each State to form a product of what each role may supply there, so that a joint change could be reached one component at a time without passing through a profile the Rules refuse. Nothing guarantees that, and the next remark is a form where it fails.

**Remark 18.1.** $\operatorname{Ag}_1$ and $\operatorname{Ag}_*$ can differ.

Two roles, each authorized to supply $0$ or $1$, with only $(0,0)$ and $(1,1)$ admitted at $x_0$, leading to $x_1$ and $x_2$ separated at depth one. For either role alone the completions of $0$ and of $1$ are disjoint, so no shared completion exists and Definition 15 fails: $\operatorname{Ag}_1(G)=\varnothing$. For the two together there is nothing left to complete, both joint contributions are available, and the continuations differ, so $\operatorname{Ag}_2(G)\neq\varnothing$.

Nothing here is new except the vocabulary. A function whose domain is the full product of what each coordinate may take is constant as soon as no single coordinate is essential, and that is a theorem. The profiles admitted here are a proper subset of that product, which makes the transition a partially specified function, and for those the theorem is false. The particular subset, the two profiles on which the roles agree, is the standard witness to its failure. I am recording it because the essay needs the consequence, not because the phenomenon was waiting to be found.

This is why Axiom 7 is stated over $\operatorname{Ag}_*$. Read over $\operatorname{Ag}_1$ it would declare that form not a game, and that form is a coordination arrangement of the most ordinary kind. Agency is not always individual, and a relation looking at one source at a time misses it exactly where the Rules couple the roles together.

One question is left, and nothing above can answer it, because everything above was about the structure and this one is about the word. Why should any of that be called gameness?

**Axiom 7. Representation.** Gameness is borne by the relation in Definition 15: if $\operatorname{Ag}(G)=\varnothing$ then $G$ is not a game. Equivalently, every game has Agency somewhere. The converse is not asserted, here or anywhere below. Nothing in this essay claims that satisfying the condition makes something a game, ranks what passes it, or puts a threshold on any quantity built from it. That fence is stated once, here. Everything further down that looks like it is this axiom being applied rather than a second commitment.

Three things it does not have to assume, because they are already paid for. That whatever bears gameness survives realization follows from Axiom 1 with Definition 7, and is argued again from the other side under *Where purpose goes*. That branching is not the bearer is Proposition 14. That concealment is not the bearer is Proposition 15. What is left to assume is narrower than the axiom looks: among the relations still standing, this is the one.

Nor is it provable, and the reason is structural rather than a shortage of effort. *Game* occurs in no signature, no axiom, and no definition above. A derivation ending in it needs a premise containing it, and any system supplying one carries a formal definition of the word, at which point the same question has moved up a level and nothing is settled. The usual candidate premise, that a game is something that can be played, unpacks into Definition 15 almost word for word, so it relocates the axiom rather than discharging it. Relocation is still worth doing and I would take a premise commanding wider assent than this one. I do not have it. What could be proved and is not proved here is a minimality claim: that among the realization-invariant relations definable from $G$, this is the weakest holding of every form nobody disputes while not holding of everything whatsoever. That would not establish the axiom. It would show the axiom is not arbitrary, which is smaller and different.

Which locates the whole risk of this essay in one line. Every definition above is unfalsifiable by construction. Every proposition is answerable only by finding an error in its proof. Axioms 1 to 6 can be refused but not refuted. Axiom 7 is the only sentence here that the world can show to be wrong, and Definition 18 makes the check concrete: declare a form nobody disputes is a game, compute, find nothing. That is not a weakness being admitted. It is the only place this essay touches anything.

**Remark. The axioms have a model.** A set of axioms with no model proves everything, so one is owed before any of this is worth reading. Take $X=\{x_0,x_1,x_2\}$ and $A=\{a,b\}$, one role authorized for both contributions and shown everything, so that a profile here is just that role's contribution, $X_0=\{x_0\}$, with $x_0\xrightarrow{a}x_1$ and $x_0\xrightarrow{b}x_2$, where $a$ is admitted at $x_1$ and only the null contribution is admitted at $x_2$. Admissibility is a reading by Axiom 2, so it separates $x_1$ from $x_2$ at depth one; both interventions are available at $x_0$; every axiom holds. The seven are therefore consistent, and Axiom 7 is not resting on a condition that nothing could satisfy. That is a proof obligation being discharged, not an illustration of anything.

With that, the Necessary Condition can be stated:

**A rule-constituted possibility space whose operating trajectory can be altered by one or more Agents at a traceable transition window,** $\Delta t$**.**

Every word in that sentence now has a referent above, and one of them went unpaid for a long time. *Traceable* means indexed and attributable: the window is a position in the order given by Axiom 5, and whatever is committed there is attributable to a bound source by Definition 10. It does not mean recorded, logged, or witnessed by anybody.

“Can be altered” is existential in the sense of Definition 18: the relation of Definition 15 holds at at least one binding and one $\Delta t_n$, and says nothing about the rest of the form.

Everything from Definition 1 to Definition 18 is dependency. Agency cannot be spoken about without $\Gamma$, $\Gamma$ without $\approx_r$, $\approx_r$ without $\operatorname{obs}$, and none of it without $G$. Axiom 7 is not part of that chain. It is the single place where a formal relation is tied to an informal word, and it is the claim here worth attacking.

Seven axioms, then. It is worth being plain about what each one costs, so that anyone who wants to disagree can find the exact place to do it.

| Axiom | What it settles | Reject it and |
| --- | --- | --- |
| 1. Constitution | nothing outside the tuple bears on gameness | material, authorship, intent, and reception become admissible components |
| 2. Self-disclosure | admissibility is inspectable; determined, not computable | Proposition 2 fails, and one State can differ from itself in what it admits |
| 3. Observation is branching | which observation language is in force, linear or branching | the commit apparatus loses the distinction it exists to keep |
| 4. Induction | that finite depth exhausts sameness | latency stops being well defined and Proposition 12 collapses |
| 5. Discrete settlement | that there is a window to point at | Trajectory, latency, and Agency lose their index |
| 6. Finite branching | that sameness here is bisimilarity, so standard results transfer | sameness stays the finite-depth relation; no proposition here moves |
| 7. Representation | that Agency bears gameness | every proposition above still stands, about something other than games |

The last row is the one I want on the record. Reject Axiom 7 and not a single proposition above is touched. The structure was never resting on the identification; the identification was resting on the structure. That is the whole reason for setting it out this way instead of arguing it in prose, where the two could not have been pulled apart.

### So what does all that settle?

Several arguments that used to eat entire design discussions are now consequences rather than opinions, which means they can be settled by pointing at a numbered line instead of by talking longer.

**Granularity.** "How granular should my model be?" is answered by Proposition 5, and the answer is that you do not choose. The Rules choose. Whatever no admitted inspection can reach is not in the State, however loudly it is displayed. Display is infrastructure; disclosure is a Rule. The reverse case is worse and far more common: a difference you think of as decoration, which some transition quietly reads, is in the State whether you intended it or not.

**What a Possibility Space is not.** Not freedom, depth, player expression, or a flattering review score. By Definition 3 it is everything the configured Rules allow the thing to become or perform, and nothing else. Rules do not arrive after a neutral infinity of game-states and cut it down. They constitute those States and transitions as possibilities of $G$.

**Naming the projection.** Definition 5 licenses a discipline, and I mean it as a rule for myself rather than as advice: never claim that two things share a Rule without naming the projection. An unnamed projection is how the describer settles the answer without having to say so. When one person says two things share a Rule and another says they do not, they are usually both correct, and neither has said which projection they meant. The apparent paradox of same Rule, different mechanic dissolves the moment $\pi$ is on the table.

**Material is invisible.** Proposition 7 says that a realization preserves everything definable in this essay and constrains the material not at all. Wood, silicon, paper, and human speech are all invisible to inspection, which can only reach what the Rules disclose and what they admit.

**Leaking.** Proposition 9 settles something usually argued about as taste. Showing a role what the Rules withhold is not a presentation bug. It is realizing another form.

**Choosing and guessing.** Without $\approx_r$ there is no way to state the difference between a decision and a guess, and no way to say what hidden information *is*.

And the one that started all of this. An input may be ceremonial, decorative, or useful for keeping someone awake, and whether it establishes Agency is now a question with an answer. A branch is not Agency merely because someone drew two boxes and connected them with arrows, however many buttons, branches, or dialogue wheels the infrastructure puts on the screen. Proposition 12 is the proof of it.

### Why does the condition only point one way?

Axiom 7 points one way, and the reason is not modesty.

The move that usually arrives against it is to hand over some object that satisfies the condition and does not feel like a game, then wait for me to patch the condition until it excludes that object. I am not going to do that. Two things are wrong with the move.

First, the object always arrives with no declared form and no declared projection. Whoever hands it over has skipped the entire discipline built up above and is holding a feeling next to a structure, which is not a comparison.

Second, and worse, the move assumes we already possess a reliable line between game and not-game, and that the counterexample happens to be standing on the correct side of it. We possess no such line. The clearest evidence is that we cannot settle the one case we are standing inside: nobody has shown that this universe is not itself running as somebody’s game. That question sounds unserious, which is a fact about our habits and not about the question. And it is not one odd case sitting at the edge of the list, it is the case the whole list is inside. If this universe might be running as a game, then every candidate anyone hands me is a configuration within a possible game, and the verdict that it is definitely not one is being delivered from inside the very thing in question. So while that stays open, nobody gets to certify by feel that a thing is definitely not a game. The condition can rule something out, because it names what it is checking. A feeling cannot.

So the condition stays pointed one way. I presented that as a discipline rather than as modesty. It is neither; it is forced. Whatever fails it cannot be a game, no matter what it is sold as. Patching in the other direction is exactly where every earlier attempt turned into a taste ranking wearing a lab coat, because the only material available for the patch is whatever the patcher already finds game-like.

Here is what forces it. A necessary condition and a sufficient one are not killed the same way.

To kill this one, you exhibit something that is a game and whose $\operatorname{Ag}(G)$ is empty. That needs a positive certification, and positive certifications are cheap: nobody has to argue that chess is a game. Declare the form, name the projection, run the check. If it comes out empty the condition is dead and I have nowhere to stand. It is a real target.

To kill a sufficient condition, you have to exhibit something that satisfies it and is not a game. That needs a negative certification, and a negative certification is exactly what I just spent a paragraph saying nobody has. I cannot spend that argument on the counterexamples coming at me and then quietly decline to spend it on myself. A sufficient condition offered by me, under my own argument, could not be shown wrong by anyone. That is not a strong claim. That is an unfalsifiable one, wearing the same lab coat as everything else I complained about.

So the direction is not a preference. Keeping the universe case and asserting a sufficient condition as established are not two habits that merely happen not to co-occur. They cannot both stand. Anyone who wants sufficiency can have it, and the price is fixed: admit that we can certify non-games by feel after all. Pay that and the method reverts to fitting a list, which is where it started.

Two things that argument does not do.

It does not touch validity. A derivation is not made unsound by pointing somewhere unwelcome. Sufficiency inside the structure stays exactly what it always was: Agency at a window is sufficient for a finite latency there, and the universe case has no opinion on that whatsoever. Sufficiency relative to a declared boundary stays a conditional, and a conditional is true or false on its own terms no matter what anyone knows about the extension of its antecedent. What is barred is narrow: asserting that some list of features is enough for the undeclared word. That is one target, not a whole direction.

And unfalsifiable here means unwarranted by me, not false and not empty. A sufficient condition may well exist, and somebody holding a line I do not hold may well be entitled to one. I am reporting what I can earn from where I am standing. That is not a discovery about games.

Killable from one side is the most a structure can be while the case we are standing inside stays open. I will take killable from one side.

### Where purpose goes

One candidate comes back more often than all the others put together, so it deserves better than a wave. Purpose. Goals, win conditions, the sense that the thing is *for* something. Surely that is what turns a structure into a game?

It helps to split it into three, because they behave nothing alike.

The first is purpose written into the Rules: a win condition, a terminal State, an ordering over outcomes that some transition reads. That one is already inside. We established earlier that whatever a transition reads is in the State whether it was meant to be or not, so a goal of this kind is not a new component of $G$. It is a predicate definable over one. It is admissible, it is inspectable, it survives realization, and it tells us nothing new, because it was never outside. Nothing in the chain from $G$ to $\operatorname{obs}$ to $\approx_r$ to $\Gamma$ to Agency produces it. It gets selected.

The second is purpose behind the artifact: someone built this to be played. That one is not a matter of taste, it contradicts something already established. Different infrastructures may realize the same $G$, because realization preserves exactly the inspections. Intent is not preserved by realization. So the same $G$ would be a game on one arrangement of material and not a game on another, which contradicts the criterion that made them the same $G$ to begin with. Whatever else is true of designer intent, it cannot be a component of the thing that is indifferent to material.

The third is purpose in the occupant: the source bound to a role wants to win, cares how it ends, is trying. That one falls to an argument made further below about knowledge. The Rules fix what a role is shown; they say nothing about what its occupant has worked out from being shown it, and no move reads that. The same holds word for word for what the occupant wants. And the entry condition is the same too: say which part of the form they are, and which move reads them. Do that, and it has become the first case.

So three collapse to two, and neither survives. One is redundant, one is inconsistent.

Now the strongest thing on the other side, which does not get said honestly often enough. Without a valuation, $\operatorname{Ag}(G)$ is generous, and the grading in Definition 18 makes it more so. Pick a cosmetic option at the start that some later transition happens to read, and that is Agency, with a finite $\lambda$ and everything. Plenty of people would say that is obviously not a choice. What they are reaching for is a preference ordering, and they are reaching for it because a difference nobody prefers looks like branching rather than choosing.

They are not wrong that the condition admits it. They are wrong that fixing it is free. Attach a goal and you buy that intuition and pay in two places. Realization-invariance goes, wherever the goal is anything other than rule-borne. And Consequence 3 goes, because a goal is a property of a whole form while Agency is a property of a window, and conjoining a global condition onto a local one makes the result global. The line that runs inside a product would go back to running between products, which is the part I actually want to keep.

So it is a trade. I take it the other way, and I want it on record that this is a trade and not a proof.

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

Agency concerns the alteration of continuation, not ownership of an endpoint. A fixed destination may receive different Trajectories. A variable destination may still be reached through predetermined operation. Neither linearity nor branching settles it. What settles it is how deep a difference goes, and whether it ever folds back.

Story endings and credits therefore have no privileged place in this condition. Plot, dialogue, authored events, and fixed outcomes may participate directly in the game when they become States, facts, transitions, and consequences constituted by $G$. They may also remain presentation. Neither position makes them inferior. It only tells us what they are doing.

#### Consequence 3: Gameness is distributed

**The existence of Agency at one transition window says nothing about its presence, density, or reach elsewhere.**

The condition only ever claimed *somewhere*. It establishes Agency where the relation actually shows up, and it does not spread that across every State, every stretch of the Trajectory, or every subsystem just because they shipped in the same box.

A game may therefore contain long stretches where nothing anyone does changes anything, one subsystem thick with real interventions, and another where a single rare intervention reorganizes everything after it. Two different questions live here, and they are easy to confuse. How much of a subsystem actually carries Agency at all. And how far a difference travels before it folds back, if it ever does. A thousand inputs that all return to the same corridor answer the second question with a zero. One input that does not is the whole answer.

So every State a game can reach falls on one side or the other. Either somebody bound to a role there has two moves that genuinely lead somewhere different, or nobody does. That much is just cutting a room in half, and cutting a room in half proves nothing. The part with content in it is what happens when you change the machine. Change it and the two sides do not move, not one State crosses over, because the line was drawn using only the Rules, who is permitted to act, what they are shown, and where those actions lead. Nothing else was ever let into it, so a new machine has nothing to take hold of. A remake cannot bring a dead stretch to life and it cannot kill a live one, unless it changed the Rules, in which case it is not a remake of the same thing.

Which means the line between game and not-game does not run between products. It runs *inside* one, which you could picture as a line chart, and it is a fact about that product rather than a tribal taxonomy. It also means “less game” stops being an insult. It is a proportion, how much of what a thing can reach has a live window in it, plus how far the live parts carry before they fold back. Both are well defined wherever the reachable States and the admissible bindings are finite, and being well defined is not the same as being calculable from a rulebook. A form whose Rules are expressive enough to encode arbitrary computation can be perfectly definite about both numbers while no procedure reads either of them off the Rules, and such forms are neither rare nor contrived. Whether a thing ought to have more or less of it belongs to a different layer.

Since they are well defined, they may as well be named. Write $\rho(G)$ for the share of $\operatorname{Ag}(G)$ against all reachable States paired with admissible sets of bindings, and $\bar\lambda(G)$ for the distribution of $\lambda$ across the windows where Agency does hold. Both are defined outright wherever the reachable States and the admissible bindings are finite, and need a declared measure otherwise. On a live window $\lambda$ is finite by construction, so the second quantity is about how far a difference travels, never about whether it travels at all.

$\rho$ counts, and that follows from the signature rather than from a preference. The established way to measure how much a coordinate matters is its influence, and influence is an average taken against a distribution over the inputs. There is no distribution here, by the declaration made alongside the signature, so $\rho$ counts the windows where the relation holds and weights none of them. Everything established about influence is established about the weighted quantity and does not carry over. That is the second bill the no-probability decision has run up, and it is better to know which bill it is than to discover later that a result was assumed to apply.

Both are built out of $\operatorname{Ag}(G)$ and nothing else, and $\operatorname{Ag}(G)$ is built out of $G$ and nothing else. Realization preserves every inspection, so it cannot move either number. That is the claim about remakes above, restated so it can be checked instead of asserted: a remake with the same Rules, the same authority, and the same disclosure has the same $\rho$ and the same $\bar\lambda$, whatever it did to the material.

A threshold on either would be a sufficient condition with a number in it, ruled out by Axiom 7 rather than by a new decision. These describe how much of a form is live and how far the live parts reach.

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

One thing I should be straight about. Everything above was built out of Rules, the moves they admit, who is allowed to make them, and where the thing may start. Nothing else went in. So of course no observer comes out. Me saying observers do not constitute the game is not a discovery, it is a receipt for what I put in.

I am fine with that, because it puts the work in the right place. If you want the observer inside the object, you have to say which part of it they are, and which move in the game reads them. Both questions have perfectly possible answers. I have just never seen anyone give one. Until somebody does, the observer stays outside the structure and keeps everything that actually matters to them.

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
