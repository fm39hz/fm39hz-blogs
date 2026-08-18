---
author: FM39hz
pubDatetime: 2026-08-18
modDatetime: 2026-08-20
title: Agency, what is that?
featured: false
draft: true
tags:
  - game-dev
  - mathematics
  - rambling

description: A needlessly formal attempt to say when an input can matter
---

The wager fits in one sentence: somewhere in every game, an admitted contribution must be able to change what the configured form can become.

I am going to call that relation *Agency*. The name is the easy part. The rest of this piece is the receipt: a signature, five structural assumptions, one exposed bridge, and the definitions needed to say exactly what can change, who can supply the difference, and how the Rules can tell. It does not prove that Agency is sufficient for gamehood or turn *more Agency* into *a better game*. If the construction ever appears to do either, it has outrun its premises.

## Table of contents

## Fine, let’s write it down

### Start with the Rules

Begin by separating Mechanics from Rules. A Rule is a logical relation; a mechanic is one concrete expression of such a relation through an infrastructure. Once that distinction has been made, Rules offer a reasonable place to begin. They do not have to be the only possible starting point; they are where this construction first gains enough structure to speak about the others.

A Rule distinguishes what may occur from what may not, what follows from what, and which difference can count as a difference inside the configured form.

The axioms below are not conclusions smuggled in under a number. They are the choices I am making, put somewhere they can be seen and refused.

Setting it out this way has a known price, and the price is the reason to pay it. A formal construction can fail in a place with a name and an address. Prose can let the same failure wander between sentences until nobody can point at it. I would rather hold something that can be shown to fall short in a specific place than something that survives only because it never stood still.

So, from that point, we have States as something the Rules produce. Getting there takes longer than that sentence makes it sound, and the first thing it takes is writing down what a Rule is made of.

**The signature.** A signature is not an axiom, and it cannot be derived from one, since there is nothing formal yet to derive it in. It is the list of what the Rules are being taken to consist of, and the only honest way to arrive at it is to take the sentence about Rules above and ask what must exist for that sentence to be true of anything at all.

*What may occur* needs things that may occur, and something that can enter them. Call the first a carrier of configurations $X$, and the second a set of interventions $A$.

*Which difference can count as a difference* needs something able to tell configurations apart, and neither $X$ nor $A$ does that on its own. What settles it is what the Rules show, which is never simply everything. So there are intervention roles $R$. For each role $r$, let $\operatorname{obs}(r)$ be a family of total readings $o:X\to V_o$, with one result set $V_o$ for each reading.

Rules also distinguish what may occur *by whom*, since a form where anyone may do anything is a special case and not the general one. So $\operatorname{auth}(r)\subseteq A$ is what role $r$ is authorized to supply.

*What follows from what* needs an admitted transition relation, and here the general case has to be taken rather than the convenient one. A transition does not consume one contribution. It consumes one from every role at once, because forms in which two roles commit without seeing each other are ordinary rather than exotic, and a signature that cannot state them is not describing Rules in general. So let

$$
\operatorname{Prof}:=\{\,p:R\to A\;\mid\;p(r)\in\operatorname{auth}(r)\,\}
$$

be the intervention profiles, where every $\operatorname{auth}(r)$ contains a null contribution so that a role with nothing to supply supplies that, and take $\longrightarrow\;\subseteq\;X\times\operatorname{Prof}\times X$, written $x\xrightarrow{p}x'$. Call $p$ admitted at $x$ exactly when it has at least one successor, and write

$$
\operatorname{Adm}_G(x)
:=
\{\,p\in\operatorname{Prof}\mid\exists x':x\xrightarrow{p}x'\,\}.
$$

A sequential form appears as the special case in which every admitted profile has at most one non-null component; every other role supplies its null contribution. Nothing later depends on this special case.

Last, somewhere the thing may begin: $X_0\subseteq X$. Nothing else in that sentence has an unmet requirement, which gives

$$
G=\langle X,\;A,\;R,\;\operatorname{auth},\;\operatorname{obs},\;\longrightarrow,\;X_0\rangle
$$

Arriving at it this way was the point, but it is worth naming what was arrived at. This is a nondeterministic concurrent transition structure with roles and imperfect information, recognizable as a variant of a concurrent game structure: a carrier of configurations, roles acting at once, an authority function, an observation apparatus, and a transition relation consuming one contribution from every role simultaneously. It belongs to a familiar formal family, and I would rather say so than let a derivation pass for an invention. What the derivation buys is that every slot is here because the sentence about Rules required it, rather than because some definition elsewhere happened to carry it.

Four remarks before the first axiom, all of which are load-bearing later.

$\operatorname{Prof}$ is defined from $A$, $R$, and $\operatorname{auth}$, so it is notation rather than a component.

$X$ is not the State space. It is deliberately too rich: anything the form can be in, described as finely as you like, including detail that will turn out to be irrelevant. Deciding here which detail is irrelevant would be assuming the answer to the question Definition 2 exists to settle.

Since $\operatorname{obs}$ sits inside $G$, disclosure is a Rule like any other. Concealment is not something done to the Rules. It is one of them.

And there is no probability anywhere in the signature. Where a transition may go several ways, $\longrightarrow$ records which ways and says nothing about how often, so forms weighted ninety-nine to one and evenly over the same support induce the same $G$ here. That is a real restriction and I would rather declare it than have it found. Everything below is therefore support-level: two contributions may remain distinct contributions, but a difference only in their outcome weights cannot witness Agency in this calculus. A stochastic enrichment could keep the relations below as its possibilistic reduct while adding distribution-sensitive ones; the Representation bridge inherits the same restriction.

A signature cannot be false. What can be refused is the claim that these seven slots contain all the data needed by the structural relation being built, and that claim belongs in an axiom rather than under the notation.

**Axiom 1. Structural scope.** Structural Agency support is determined by $G$ and no further data. An instance-indexed Agency claim may additionally use an operating instance only to identify a reached State, a transition window, and the roles bound there.

This is not a claim that gamehood itself depends on nothing outside $G$. It only fences the relation this piece is constructing. Reject it and material, authorship, intent, reception, or any other unrepresented fact may enter the Agency test; accept it and they do not get to wander in later because a convenient example happens to need them.

### What can the Rules tell apart?

The structural test may read nothing outside $G$. Its first job is to say what $G$ can distinguish about itself.

**Axiom 2. Self-disclosure.** The readings available to $G$ itself consist of $\operatorname{Adm}_G$ and every $o\in\operatorname{obs}(r)$, for every $r\in R$. A body of Rules that cannot tell what it permits next is not a body of Rules.

These are determined by $G$. Determined is not the same as computable, and nothing below asks for the stronger reading. A form whose admitted set is fixed but not effectively calculable satisfies this axiom. Reading it as computability would throw out rule systems expressive enough to encode arbitrary computation, and those are neither rare nor artificial.

And when a profile can go several ways, is looking a matter of following one of them, or of following all of them at once?

**Axiom 3. Observation is branching.** An inspection follows every admitted outcome of an intervention and returns the set of residual-inspection results.

This is the one genuine choice in the section, so it goes in the open rather than in a footnote. Where an intervention has one outcome the question does not arise. Where it has several, a run separates two configurations when some result is obtainable at one and not at the other. A branching probe separates them when some residual inspection returns different result sets, even where every obtainable sequence agrees.

Take one form where intervention $a$ leads to a single configuration admitting both $b$ and $c$. Take another where $a$ may lead to either of two configurations, one admitting only $b$ and the other only $c$. The obtainable sequences are $ab$ and $ac$ in both, so the run reading cannot separate them.

A probe that makes $a$ and inspects every outcome does separate them: in the first form every outcome of $a$ admits $b$, while in the other one outcome does not. That pair proves that the branching reading is strictly finer, and it is short enough that there is no reason to assert the fact instead of showing it.

Axiom 3 takes the probe reading, because the run reading identifies a form that keeps two continuations open with a form that has already settled which one you get and has not disclosed it yet, and the commit apparatus below exists to keep exactly that difference visible.

**Definition 1. Inspection.** Three clauses generate inspections.

Every reading $b$ available under Axiom 2 is a depth-zero inspection, with

$$
\operatorname{res}_b(x):=b(x).
$$

If $\iota_1,\ldots,\iota_n$ are inspections, for finite $n\geq1$, their tuple is an inspection with

$$
\operatorname{res}_{(\iota_1,\ldots,\iota_n)}(x)
:=
\bigl(
\operatorname{res}_{\iota_1}(x),\ldots,
\operatorname{res}_{\iota_n}(x)
\bigr).
$$

Thus

$$
V_{(\iota_1,\ldots,\iota_n)}
:=
\prod_{j=1}^{n}V_{\iota_j}.
$$

Tupling applies at every depth, not merely to immediate readings. That detail is load-bearing: inspecting two future probes separately preserves their two result sets but may lose which pair of results belongs to the same outcome. Their tuple keeps that correlation.

Finally, if $\iota$ is an inspection with result map $\operatorname{res}_\iota:X\to V_\iota$ and $p\in\operatorname{Prof}$, then prefixing $\iota$ by $p$ is an inspection whose result at $x$ is

$$
\operatorname{res}_{p\triangleright\iota}(x)
:=
\{\,\operatorname{res}_\iota(x')\mid x\xrightarrow{p}x'\,\}
\in\mathcal P(V_\iota).
$$

Thus $V_{p\triangleright\iota}=\mathcal P(V_\iota)$. Define inspection depth by

$$
\operatorname{depth}(b):=0,
\qquad
\operatorname{depth}(\iota_1,\ldots,\iota_n)
:=\max_j\operatorname{depth}(\iota_j),
\qquad
\operatorname{depth}(p\triangleright\iota)
:=1+\operatorname{depth}(\iota).
$$

The empty set records that $p$ is not admitted. Results are sets rather than multisets: $\longrightarrow$ is a relation and carries neither outcome multiplicity nor probability. An inspection therefore sees sets of residual results, not raw branch identities or multiplicities. Keeping either would require a richer signature. Depth counts the longest chain of profile prefixes, not the total number distributed across a tuple.

No fourth generator is proposed, because only $\operatorname{obs}$ and $\operatorname{Adm}_G$ show anything, tupling is what keeps jointly inspectable results together, and only $\longrightarrow$ goes anywhere. The rest of the signature is inventory, permission, and where the thing may start.

That says how a look is put together. It does not say how far one can go. So how far can a single look go?

**Axiom 4. Induction.** Nothing is an inspection except by the three clauses of Definition 1.

**Corollary 4.1.** Every inspection has finite depth.

By structural induction. Readings begin at zero, a finite maximum of already finite depths remains finite, and prefixing adds one. An infinite-depth inspection would have to arrive by a route Axiom 4 excludes.

The load-bearing phrase is *nothing except*. A closure clause says the introduced objects are inspections; it does not exclude extras. Axiom 4 does. In a first-order presentation, that leastness would need an induction scheme or a semantic restriction rather than one neat sentence. This is where the formal price is actually charged.

Which brings back the thing promised a few paragraphs up. What is a State?

**Definition 2. State.** $x\sim_G y$ when no inspection separates them, meaning $\operatorname{res}_\iota(x)=\operatorname{res}_\iota(y)$ for every inspection $\iota$. Write $S_G:=X/\sim_G$ for the State space.

A State is complete relative to this generated inspection language and to nothing stronger: it preserves exactly every distinction expressible by a generated finite inspection. No claim is made here that $\sim_G$ is bisimilarity, or that $S_G$ inherits a transition relation by quotienting $X$. That is why the Possibility Space below keeps its paths on raw configurations and uses States only as observational labels.

**Proposition 1.** $\sim_G$ is an equivalence relation, and the coarsest one respecting every inspection.

It is the kernel of the family of inspections $G$ itself admits, so it exists for the same reason any map has a kernel and is coarsest for the same reason. Equivalently: each inspection cuts $X$ into the parts it can tell apart, and a State is one cell of the intersection of every such cut.

**Proposition 2.** Configurations of one State admit the same profiles.

By Axiom 2, admissibility is one of the readings available to $G$, so by Definition 1 it is an inspection. $\sim_G$ respects every inspection.

**Proposition 3.** Every residual inspection of a branching continuation is already an inspection of its root after prefixing the intervening profile.

For any residual inspection $\iota$, its result on the continuation opened by $p$ is exactly $\operatorname{res}_{p\triangleright\iota}$ at the earlier configuration. Hence any difference between the sets of residual results after $p$ is inspectable before $p$ is taken.

**Remark 4.** No inspection depends on the history that produced a configuration, except through its State.

An inspection is defined at a configuration, so it cannot read a history the configuration does not carry, and that is a fact about the type of Definition 1 rather than a discovery. What makes it worth stating is the contrapositive. Suppose some fact about the past can change what an inspection returns later. Then two configurations differing only in that fact are separated by that inspection, so they already are different States. The fact was never outside the State. It was one of the distinctions the Rules had been drawing all along.

**Proposition 5.** Coarsening $\sim_G$ is incompatible with preserving every inspection. Refining it adds no inspectable behavior.

Coarsen it and you merge configurations on which some result map differs, so that map no longer factors through the quotient. The quotient is mathematically consistent; it simply cannot preserve the inspections of the same configured form. Refine it and you separate configurations no inspection can distinguish. The added distinction changes no admitted profile or inspectable continuation and cannot change whether structural Agency support is empty. Granularity is barred in one direction and inspectionally idle in the other; Definition 2 fixes it at the canonical quotient for the declared language.

That is one State. What about all of them, meaning the whole of what a form can reach?

**Definition 3. Possibility Space.** The raw substructure reachable from $X_0$ its configurations, admitted profiles, and transitions with each configuration additionally carrying its State label. Write $\mathcal P_G$. Its paths remain paths through raw configurations; the labels do not license switching representatives midway.

Everything below is relative to the $G$ actually declared.

### Same Rule, compared how?

Identity inside one form is now settled, but comparison between forms is not. Two mechanics may express the same Rule under one family of distinctions and different Rules under another. So when do two forms express the same Rule?

**Definition 4. Comparison scheme.** Let $\mathcal D$ be a class of configured forms. A comparison scheme is an assignment

$$
\Pi:\mathcal D\to\mathcal D
$$

selecting a declared structural granularity for every form under comparison. Every $\Pi(G)$ must itself be a well-formed configured form of the same signature. The assignment is not inferred from a map on $X$ alone; how configurations, interventions, roles, authority, observations, beginnings, profiles, and transitions appear at the selected granularity belongs to the declared scheme.

Up to structural isomorphism, the operation must respect renaming and be idempotent:

$$
G\cong H\Longrightarrow\Pi(G)\cong\Pi(H),
\qquad
\Pi(\Pi(G))\cong\Pi(G).
$$

Nothing requires one canonical scheme. It is the granularity at which a particular comparison has elected to speak, made explicit so that it cannot change halfway through the comparison.

**Definition 5. Sameness relative to a comparison scheme.** Two forms express the same Rule relative to $\Pi$ when $\Pi(G_1)$ and $\Pi(G_2)$ are isomorphic as configured forms: there are bijections between their configurations, interventions, and roles preserving beginnings, authority, observations, the full transition relation, and generated inspections in both directions.

**Remark 6.** Sameness relative to $\Pi$ is not identity relative to $\Pi$.

Inside a declared $G$, two configurations are one State or they are not. A comparison scheme instead declares a granularity between forms. Two forms may therefore be the same under one scheme and different under another without contradiction; each answer is only about the distinctions its scheme retained.

That settles what a comparison is about. Now a question that is smaller and much older than it looks. Does any of this care what the thing is made of?

**Definition 6. Infrastructure.** The material, computational, or procedural arrangement through which $G$ can be represented or operated. An infrastructure carries a raw transition structure of its own.

**Definition 7. Realization.** An infrastructure realizes $G$ when its represented layer is structurally isomorphic to $G$: there are bijections on represented configurations, interventions, and roles preserving beginnings, authority, observations, and transitions in both directions. By the generating clauses of Definition 1, those bijections also preserve every inspection result and its depth.

The qualification *represented layer* matters. The definition says that changing material while preserving the configured structure changes none of the structural questions asked here; it does not claim a bijection between $G$ and every physical microstate of its infrastructure.

**Proposition 7. Realization-invariance.** Every structural construction below is preserved under the correspondences induced by a realization; numerical values agree.

Immediate from structural isomorphism. Concrete bindings and committed Trajectories still belong to an operating instance; their instance indices are not supplied merely by realizing $G$.

### Now make it run

A configured form need not be operating. The next relation begins when it is.

**Definition 8. Operating instance.** An infrastructure is not yet an operating instance. When a reachable configuration is actualized through it, an operating instance begins. Write $I$. It commits one ordered Trajectory through $\mathcal P_G$.

The Possibility Space may branch, loop, and admit many counterfactual continuations. The Trajectory already committed does not branch retroactively. Non-linearity belongs to the structure of possible continuations; actualization produces an ordered history. A Trajectory does not require a built-in ending and remains an ordered history for as long as the instance continues to operate.

The configured form, its realization, an operating instance, and an observer encountering that instance must remain distinct. When no instance is operating, no Trajectory is being actualized, while $G$ and $\mathcal P_G$ remain exactly what they were.

**Axiom 5. Discrete settlement.** $G$ exposes its operation as an ordered sequence of committed transitions.

This does not follow from anything above, which is why it is an axiom and not a step. A commit is whatever the form treats as settled: not a clock, a frame, or a turn counter. Settlement is the only thing there is to order, since a prefix is just the part no longer in question. Measuring does not rescue a form that measures perfectly and settles nothing. What is ordered is acknowledgement, and a thing is either still in question or it is not.

**Definition 9. Transition window.** $\Delta t_n$ is the window joining $s_n$ to $s_{n+1}$ in the order given by Axiom 5, a logical position and not a measurable duration in physical time. Write $\Delta t$ for such a window in general.

At $\Delta t_n$, an admitted profile $p$ enters the transition:

$$
x_n\xrightarrow[\Delta t_n]{p}x_{n+1},
\qquad
s_i=[x_i]_{\sim_G}.
$$

To speak of an alternative Trajectory is to hold the committed prefix fixed and ask what different continuation could have become actual next. It does not mean rewriting a past that has already occurred. The Agency test below asks whether the window supports such alternatives; it does not require the committed profile to be one of their witnesses.

### Now, when can an input matter?

Nothing so far guarantees Agency. What it gives is a Possibility Space, an operating Trajectory, and a window at which Agency could be expressed.

So which bound roles can supply an operative difference there, and how much variation do the Rules admit through them?

**Definition 10. Role and binding.** At a window, $G$ may provide one or more intervention roles. A role specifies which contributions may become operative there and the authority with which they enter operation; it does not identify the concrete source that will supply them. The operating instance $I$ binds a source $\alpha$ to one or more such roles through its infrastructure. A committed intervention is attributable to $\alpha$ when it enters through a role to which $\alpha$ is bound. Anything merely carrying or translating that output remains infrastructure in this relation. Under Axiom 1, no unrepresented property of the concrete source enters the test.

A source may be an individual, a collective producing one joint output, or an autonomous process. *Available to $\alpha$* below means structurally available through the roles it occupies. A source-specific capability or policy is not present in the signature; adding one would refine which alternatives count as available to $\alpha$, and hence the instance-indexed relation, without changing the structural support $\operatorname{Ag}(G)$.

Binding attributes a committed contribution to its source and identifies the role coordinates structurally available through that source. That is not yet the same as attributing the realized successor to the contribution. No relation of actual causation is defined here.

Authority determines what may be supplied through a role. Information records what that role is shown about the State. The local Agency test below deliberately does not require the occupant to identify which hidden State is actual. A State is the complete finitely inspectable condition of the configured form under Definition 1, not what any one role is shown, and in every form that conceals anything the two come apart.

**Definition 11. Role-indistinguishability.** For a role $r$, $\approx_r$ is indistinguishability by inspections built from $\operatorname{obs}(r)$ alone.

This is a structural observation relation induced by what $r$ is shown, not a claim about which experiments its occupant can personally force. The prefix clause still ranges over profiles admitted by the configured form. A policy or knowledge relation restricted to the occupant's own authority would be another construction.

**Proposition 8.** $\approx_r$ is coarser than $\sim_G$. It is strictly coarser exactly when there are configurations $x,y$ which no $r$-inspection separates but some inspection available to $G$ does.

The readings in $\operatorname{obs}(r)$ form a subfamily of the readings generating $\sim_G$, so a relation built from them alone can only be coarser. The stated pair is exactly the witness required for strictness. That is what it will mean for $G$ to withhold something from $r$; merely omitting a constant or redundant reading does not count.

**Proposition 9.** $\approx_r$ is fixed by $G$ and not by $I$.

$\operatorname{obs}$ is a component of $G$. Two arrangements differing in what a role is shown differ in $\operatorname{obs}$, hence by Definition 7 are two forms rather than one form on different hardware.

**Definition 12. Available contributions.** For a non-empty set of roles $U\subseteq R$ and a reachable State $s$, define

$$
\Gamma_G(U,s)
:=
\{\,p|_U\mid p\text{ is a profile admitted at }s\,\}.
$$

This is a local set of contribution vectors, not a set of policies over hidden States. It records what can be supplied through $U$ at the State the form is actually in. Proposition 2 makes it well defined on $s$ rather than on a chosen representative configuration.

At a concrete window, let $U_I(\alpha,\Delta t_n)$ be the set of all roles occupied there by the source or set of sources $\alpha$ being evaluated. Then

$$
\Gamma_{G,I}(\alpha,s_n;\Delta t_n)
:=
\Gamma_G\bigl(U_I(\alpha,\Delta t_n),s_n\bigr).
$$

The absence of $\approx_r$ from this display is deliberate. An occupant need not identify the hidden State before supplying an admitted contribution; it may guess. The distinction between that guess and informed control would require evaluating one policy across an entire $\approx_r$-class. No such relation is defined here.

What the other roles supply is no part of $\gamma$. For $\gamma\in\Gamma_G(U,s)$, define its completions by

$$
\Delta_G(\gamma,s;U)
:=
\{\,\delta\in\prod_{r\in R\setminus U}\operatorname{auth}(r)
\mid \gamma\oplus\delta\text{ is admitted at }s\,\}.
$$

### Not one successor, the whole continuation

**Definition 13. Raw branching continuation.** For a configuration $x$ and a profile $p$ admitted there, $\mathcal T_G(x,p)$ is the rooted branching unfolding containing every outcome admitted for $p$ and every admitted continuation after those outcomes. It is not one selected successor. That distinction is required because $\longrightarrow$ may be nondeterministic and Axiom 3 inspects the set of residual results across all admitted outcomes.

Immediate inequality between raw successor configurations is not enough. They may belong to one State, while a difference that is operationally real may first become visible later. So continuation difference has to be stratified by how deep an inspection must go to find it.

**Definition 14. Depth-**$k$ **indistinguishability.** Define

$$
x\sim_G^k y
\Longleftrightarrow
\operatorname{res}_\iota(x)=\operatorname{res}_\iota(y)
\quad
\text{for every }\iota\text{ of depth at most }k.
$$

Since $\sim_G\subseteq\sim_G^k$, this relation is well defined on State classes as well. For a raw branching continuation opened by $p$, define the result of a residual inspection $\iota$ by

$$
\operatorname{Res}_\iota\bigl(\mathcal T_G(x,p)\bigr)
:=
\{\,\operatorname{res}_\iota(x')\mid x\xrightarrow{p}x'\,\}.
$$

Its residual depth is the depth of $\iota$: the already fixed profile $p$ is not counted. For raw branching continuations, write $\mathcal T_1\equiv^k_G\mathcal T_2$ when these results agree for every residual inspection of depth at most $k$, and define $\equiv_G:=\bigcap_{k\in\mathbb N_0}\equiv^k_G$.

**Lemma 14.1. State-rooted continuation.** If $x,y$ belong to one State and $p$ is admitted there, then $\mathcal T_G(x,p)\equiv^k_G\mathcal T_G(y,p)$ for every finite $k$.

Otherwise, fixing $p$ and prefixing a separating residual inspection would separate $x$ from $y$ under Definition 1, contradicting Definition 2. Therefore, for a State $s$, choose any $x\in s$ and write

$$
\mathcal C_G(s,p):=[\mathcal T_G(x,p)]_{\equiv_G}.
$$

The equivalence class is independent of the representative, and every later comparison of $\mathcal C_G(s,p)$ by $\equiv^k_G$ is consequently well defined.

**Proposition 10.** $\sim^{k+1}_G\subseteq\sim^k_G$ and $\equiv^{k+1}_G\subseteq\equiv^k_G$. Moreover,

$$
\bigcap_k\sim^k_G=\sim_G,
\qquad
\bigcap_k\equiv^k_G=\equiv_G,
$$

where $\equiv_G$ is indistinguishability by every finite inspection of a branching continuation.

Going deeper only adds inspections, which gives both inclusions. Every inspection has finite depth by Corollary 4.1, so an inspection separating either two configurations or two branching continuations does so at some finite depth, which gives both intersections. Nothing further is assumed beyond the inspection clauses already chosen.

**Proposition 11.** If two branching continuations differ at some depth, a least such depth exists.

By Proposition 10 they differ at every depth beyond it, so the set of separating depths is non-empty and upward closed, and has a least element. Without this, the number of transitions an inspection must spend before the difference first appears would not be well defined, and any latency put on it later would be a number I made up.

Everything up to here has been apparatus. The question it was built to ask is short, and it is the one this whole essay has been walking toward. When can changing what somebody supplies make a difference?

**Definition 15. Agency.** Fix $G$, an operating instance $I$, a source or set of sources $\alpha$, and a window $\Delta t_n$ at State $s_n$. Write $U=U_I(\alpha,\Delta t_n)$. Agency is established through those bindings when the occupied roles expose two distinct available joint contributions which, against one and the same completion, do not preserve the same branching continuation:

$$
\exists\,\gamma_1,\gamma_2,\delta,\;k\in\mathbb N_0:
\quad
\gamma_1,\gamma_2\in\Gamma_G(U,s_n)
\;\land\;
\gamma_1\neq\gamma_2
\;\land\;
\delta\in\Delta_G(\gamma_1,s_n;U)\cap\Delta_G(\gamma_2,s_n;U)
\;\land\;
\mathcal C_G(s_n,\gamma_1\oplus\delta)
\;\not\equiv^k_G\;
\mathcal C_G(s_n,\gamma_2\oplus\delta)
$$

$G$, $I$, $\alpha$, $s_n$, and $\Delta t_n$ are held fixed; only the displayed variables are existentially quantified. The State and binding are actual, but the witness is counterfactual: neither completed profile is required to equal the profile committed at $\Delta t_n$. Definition 15 is therefore instance-indexed, not a claim that the committed contribution caused the realized successor. Definition 18 will remove the source names and the window index by stating the same test directly on reachable States and role sets.

Holding the completion fixed across both branches is deliberate. Let it vary and the test may credit $U$ with a difference supplied by variation outside $U$, which is the reverse of what the relation is for; holding it fixed isolates the variation entering through $\alpha$'s occupied roles. One such completion is enough. Nothing requires those roles to make a difference against every completion, and requiring that would withhold Agency from every role whose contribution another role is able to neutralize.

Stripped of the apparatus, Definition 15 says that the roles occupied by $\alpha$ contain a continuation-changing coordinate difference at $s_n$: substitute one admitted joint contribution for another, hold the complement at the same admitted value, and the form admits an inspectably different continuation. Failing that test makes the evaluated binding structurally inert under this substitution test there. It does not yet make the source a dummy everywhere: coupled admissibility may leave no shared completion for a singleton even when a larger role block containing it supports Agency. What the apparatus adds is a meaning for *different* when the distinction may take several transitions to surface, and supplying that meaning is the job of $\equiv^k_G$.

The two completed witness profiles are counterfactual alternatives admitted at one $\Delta t_n$. The operating instance commits one profile there, but Definition 15 does not require it to be either witness.

**Definition 16. Latency.** $\lambda_{G,I}(\alpha,s_n;\Delta t_n)$ is the least $k$ witnessing Definition 15, which exists by Proposition 11 whenever Agency is present, and $\infty$ when no such $k$ exists.

The number is easy to read too quickly. It is the first inspection level separating some witnessing pair available through the binding. It is not elapsed time on the committed Trajectory, not a latency attached to the committed contribution unless that contribution belongs to a minimizing witness, and not the magnitude of the difference. An instance may take a branch on which the separating fact never appears at all. Arithmetic can of course be performed on the numeral $k$; this construction supplies no canonical interpretation under which $\lambda=6$ is *twice as slow* or *twice as consequential* as $\lambda=3$. Ordering the inspection depths is earned here. Anything stronger needs another convention.

**Proposition 12.** At a fixed window and binding situation, the following are equivalent: $\lambda_{G,I}=\infty$; against every shared completion, every pair of $\alpha$'s available joint contributions yields branching continuations related by $\equiv^k_G$ for every finite $k$; $\alpha$ bears no Agency there.

The completion has to be held fixed inside the middle clause, for the same reason it is held fixed in Definition 15. Continuations reached against *different* completions may perfectly well differ, and that difference belongs to variation in the completion rather than to $\alpha$. What $\lambda_{G,I}=\infty$ says is that within each completion taken on its own, no alternative admitted through $\alpha$'s occupied roles changes the inspectable continuation.

By Definition 16, $\lambda_{G,I}=\infty$ means that no finite $k$ witnesses Definition 15 against any shared completion. Negating the existential display in Definition 15 gives exactly the middle clause and the absence of Agency. Each step reverses. Axiom 4 is not needed for this equivalence; it is needed only when finite-depth sameness is identified with sameness under every inspection.

**Proposition 13.** Agency at a window is sufficient for finite latency there.

One direction of Proposition 12. This is a proved sufficient condition internal to the structure. It should not be confused with the necessary claim about gamehood introduced by the Representation bridge.

**Proposition 14.** Internal nondeterminism may change which branch of a continuation becomes actual without that branch selection constituting an Agency witness for any binding.

Definition 15 compares different contributions available through bound roles. Several outcomes of one unchanged profile belong to the same branching continuation object, so whichever outcome becomes actual supplies no second contribution for the comparison. A random source *bound* to a role is a different case, and its output is evaluated through Definition 15 like any other.

This is the distinction between unbound branch selection and a decision node, reached from the other end. In a richer model carrying probabilities, chance nodes would be one case of the former. Here the distinction falls out of Definition 15 having a bound source written into it, so no probability had to be smuggled into $G$ for it to hold.

**Proposition 15.** Role uncertainty does not veto local Agency.

$\Gamma_G(U,s)$ contains exactly the admitted local contribution vectors and imposes no requirement that an occupant identify $s$ inside its $\approx_r$-class. Thus uncertainty may make an intervention a guess without erasing a structural difference exposed by its admitted contribution alternatives. Disclosure remains part of $G$ and may change the States or continuations the Rules distinguish; the proposition says only that no additional epistemic success condition enters Definition 15.

**Remark 16. Rule mutation.** If $G$ permits an intervention to alter a parameter or a Rule, the mutable component is represented in $X$, and the permission appears as ordinary edges of $\longrightarrow$ over those enriched configurations. Where the mutation changes anything a later inspection can return, including admissibility or the inspectable branching structure, the affected configurations are separated by $\sim_G$ and the difference is therefore encoded in the State. A raw edge redirected to a State-equivalent successor creates no inspectable difference merely because the edge changed. Where no inspection generated by $G$ can detect the mutation, the represented difference is structurally idle.

If the alteration is not admitted by $G$, continuing under it means continuing under a different configured form $G'$.

This is a dichotomy forced by Axiom 1. For this structural test, a mutable Rule is either represented inside the tuple or the test has moved to a different configured form, and there is no third place for it to be. That is a consequence of the declared scope rather than anything learned about mutable Rules in general.

Agency also does not require a finite list of alternatives enumerated in advance. The intervention set may be infinite or specified intensionally, and a role may authorize its occupant to receive a declaration, observation, or unresolved situation and map it into an operational result. Definition 15 reads the resulting continuations and nothing else about how they were produced.

**Definition 17. Agent.** Where Agency is established, the source or set of sources occupying the evaluated roles is an Agent at that binding and window. This Agenthood names access to an Agency-supporting role block; it does not assert that the profile actually committed was a witness. The Agent may therefore be collective.

**Proposition 17. Locality.** Agenthood is not intrinsic to a source, and instance-indexed Agency remains local to the tuple $(G,I,\alpha,s_n,\Delta t_n)$.

$G$ defines and limits the role; $I$ identifies the reached State and window and establishes the binding. The test then evaluates counterfactual alternatives structurally available through the occupied roles; it does not inspect the committed profile when establishing Agenthood. No further fact about what kind of thing the source is enters the relation. The same source may be an Agent through one binding and an observer, part of the infrastructure, or part of a transition under another. Even where $G$ permits an Agent to alter a Rule, that permission is constituted by $G$ under Remark 16, so no Agent stands above the Rules.

### One role is not always enough

At each reachable State, the structural core can be exposed as one partial map. Write

$$
D_s:=\operatorname{Adm}_G(s),
\qquad
f_s:D_s\to Q_s,
\qquad
f_s(p):=\mathcal C_G(s,p),
$$

where $Q_s$ is the set of continuation classes reached by profiles in $D_s$. Agency asks whether this map changes between two admitted profiles while every coordinate outside the evaluated role block is fixed. The notation introduces no new assumption; it only stops the same partial function from hiding inside the longer displays below.

**Definition 18. Structural Agency support and role grades.** For $m\geq1$, let $\operatorname{Ag}_m(G)$ contain exactly the pairs $(s,U)$ such that $s$ is reachable, $U\subseteq R$ is non-empty and finite with $|U|\leq m$, and

$$
\exists\,\gamma_1,\gamma_2,\delta,\;k\in\mathbb N_0:
\quad
\gamma_1,\gamma_2\in\Gamma_G(U,s)
\;\land\;
\gamma_1\neq\gamma_2
\;\land\;
\delta\in\Delta_G(\gamma_1,s;U)\cap\Delta_G(\gamma_2,s;U)
\;\land\;
\mathcal C_G(s,\gamma_1\oplus\delta)
\;\not\equiv^k_G\;
\mathcal C_G(s,\gamma_2\oplus\delta).
$$

Write $\operatorname{Ag}_*(G)=\bigcup_{m\geq1}\operatorname{Ag}_m(G)$, and use $\operatorname{Ag}(G)$ for $\operatorname{Ag}_*(G)$ below. At a concrete window with finite $U_I(\alpha,\Delta t_n)$, Definition 15 holds if and only if

$$
\bigl(s_n,U_I(\alpha,\Delta t_n)\bigr)
\in
\operatorname{Ag}_{|U_I(\alpha,\Delta t_n)|}(G).
$$

That equivalence is the lift from the instance relation to the structural one. $I$, $\alpha$, and the window index contribute only the occupied role set and the reached State; the test itself uses $G$ alone. Since the signature contains no source-eligibility or binding-architecture component, the support records what finite role sets structurally permit, not which concrete occupants an infrastructure happens to furnish.

The family increases with $m$, and the grade counts role coordinates rather than sources. $\operatorname{Ag}_1$ asks whether one role can be essential against a fixed complement; $\operatorname{Ag}_m$ asks the same of role sets of size at most $m$. One source occupying three roles and three sources occupying one each both use three coordinates in this hierarchy. Counting bodies would require binding architecture in the signature, and none is present. Membership of $(s,U)$ does not make every coordinate in $U$ essential: supporting sets admit irrelevant padding, which the minimum witnesses below remove.

$\operatorname{Ag}(G)=\varnothing$ when no reachable State, finite role set, two available joint contributions, shared completion, and finite inspection depth satisfy the display above. Such a form may still carry Rules, States, transitions, internal nondeterminism, presentation, and an ordered Trajectory. What it carries nowhere is a finite-role-set structural point at which varying an admitted joint contribution against a fixed complement changes the inspectable continuation. The calculus makes no claim here about an irreducibly infinite joint variation.

**Proposition 18. Contribution-substitution invariance.** $\operatorname{Ag}(G)=\varnothing$ if and only if, for every reachable $s$, every finite non-empty $U\subseteq R$, every $\gamma_1,\gamma_2\in\Gamma_G(U,s)$, every shared completion $\delta$, and every finite $k$,

$$
\mathcal C_G(s,\gamma_1\oplus\delta)
\equiv^k_G
\mathcal C_G(s,\gamma_2\oplus\delta).
$$

This is the universal negation of Definition 18, with the complement held fixed for the same reason as in Definition 15. It concerns substitution of contributions. Renaming concrete sources while preserving which roles they occupy is a separate invariance and requires no emptiness assumption at all: source identity occurs nowhere in the structural test.

The grading is what removes the harder condition. Proposition 18, argued over $\operatorname{Ag}_1$ alone, would need the profiles admitted at each State to form a product of what each role may supply there, so that a joint change could be reached one coordinate at a time without passing through a profile the Rules refuse. Nothing guarantees that, and the next remark is a form where it fails.

**Remark 18.1.** $\operatorname{Ag}_1$ and $\operatorname{Ag}_*$ can differ.

Take two roles, each authorized to supply $0$ or $1$, with only $(0,0)$ and $(1,1)$ admitted at $x_0$, leading to continuations separated at some finite depth; let every other reachable State admit only one profile. For either singleton role set, the completions of $0$ and $1$ at $x_0$ are disjoint, and no later State supplies another witness, so $\operatorname{Ag}_1(G)=\varnothing$. For $U$ containing both roles there is nothing left to complete, both joint contributions are available, and the continuations differ, so $\operatorname{Ag}_2(G)\neq\varnothing$.

Nothing here is new except the vocabulary. Regard $D_s$ as a Hamming graph, with an edge whenever two admitted profiles differ in one role coordinate, and colour each vertex by its fibre under $f_s$. If no edge crosses between colours, then $f_s$ is constant on every connected component. On a full finite product the graph is connected, so a non-constant $f_s$ has a one-coordinate witness. Remark 18.1 instead leaves two isolated admitted vertices. That disconnection makes $m_G^*(s)>1$ possible; its actual value still depends on how $f_s$ partitions the vertices into continuation fibres. The same admitted domain may therefore have different minimum Agency arity under different continuation maps. The grading does not turn profile distance into synergy.

This is why the Representation bridge is stated over $\operatorname{Ag}_*$. Read over $\operatorname{Ag}_1$, it would rule out a candidate whose configured structure was the witness form just described. An Agency witness is not always available as an admitted single-coordinate substitution, and a one-coordinate test misses it exactly where the admitted-profile domain provides no such path.

**Corollary 18.2.** Structural Agency support is upward-closed in its role set. If $(s,U)\in\operatorname{Ag}(G)$ and $U\subseteq V$ for finite $V$, then $(s,V)\in\operatorname{Ag}(G)$.

Take the witness for $U$. Move the fixed coordinates in $V\setminus U$ from the shared completion into both joint contribution vectors, leaving the rest of the completion unchanged. The same two admitted profiles and the same separated branching continuations witness the claim for $V$. This does not make every member of $V$ individually essential; it says the joint block still contains the witnessing variation.

Upward closure tells us that a supporting set remains supporting after fixed coordinates are padded into it. It does not tell us how small the form will settle for. For that, it helps to stop carrying the padding around.

**Definition 19. Witness profile pairs and latency.** For profiles $p,q$ admitted at a reachable State $s$, write

$$
\operatorname{Diff}(p,q):=\{\,r\in R\mid p(r)\neq q(r)\,\}.
$$

Let $\mathcal W_G(s)$ contain exactly the unordered profile pairs $\{p,q\}$ such that $p$ and $q$ are admitted at $s$, $\operatorname{Diff}(p,q)$ is non-empty and finite, and for some finite $k$,

$$
\mathcal C_G(s,p)\not\equiv^k_G\mathcal C_G(s,q).
$$

For each $\{p,q\}\in\mathcal W_G(s)$, write

$$
\ell_G(s;p,q)
:=
\min\{\,k\in\mathbb N_0\mid
\mathcal C_G(s,p)\not\equiv^k_G\mathcal C_G(s,q)\,\}
$$

for its witness latency. Proposition 11 guarantees the minimum. At a concrete window with finite occupied role set $U=U_I(\alpha,\Delta t_n)$, the latency from Definition 16 is recovered by minimizing over the witnesses available through $U$:

$$
\lambda_{G,I}(\alpha,s_n;\Delta t_n)
=
\min\{\,\ell_G(s_n;p,q)\mid
\{p,q\}\in\mathcal W_G(s_n),
\ \operatorname{Diff}(p,q)\subseteq U\,\},
$$

with value $\infty$ when that set is empty.

**Proposition 19.1. Difference-set normal form.** For every reachable State $s$ and every finite non-empty $U\subseteq R$,

$$
(s,U)\in\operatorname{Ag}(G)
\Longleftrightarrow
\exists\,\{p,q\}\in\mathcal W_G(s):
\operatorname{Diff}(p,q)\subseteq U.
$$

For the forward direction, complete the two joint contributions in a witness for $(s,U)$ by their shared $\delta$. The resulting profiles differ only inside $U$. For the reverse direction, restrict $p$ and $q$ to $U$; outside $U$ they agree, so that common restriction is the shared completion required by Definition 18. The two displays are the same test with the fixed coordinates written on opposite sides of the page.

**Definition 20. Minimum Agency arity.** The minimum Agency arity at a reachable State is

$$
m_G^*(s):=
\min\{\,|\operatorname{Diff}(p,q)|\mid\{p,q\}\in\mathcal W_G(s)\,\},
$$

and $m_G^*(s):=\infty$ when $\mathcal W_G(s)$ is empty. Equivalently, it is the least $|U|$ for which $(s,U)\in\operatorname{Ag}(G)$, or the minimum finite Hamming distance between two admitted profiles lying in different fibres of $f_s$, with value $\infty$ when no such finite-distance pair exists.

$m_G^*(s)=1$ says two admitted profiles with inspectably different continuations differ at exactly one role coordinate. $m_G^*(s)=2$ says no such adjacent witness exists while some separated pair has Hamming distance two. As Remark 18.1 shows, this may be produced entirely by a non-product admission constraint. It does not by itself establish synergy, cooperation, or interaction strength, nor say that two people must cooperate: one source may occupy two roles, and two sources may jointly supply one role. The signature counts coordinates because coordinates are what it contains.

Write $S_G^{\mathrm{reach}}$ for the reachable States occurring in $\mathcal P_G$, and write

$$
S_A(G):=\{\,s\in S_G^{\mathrm{reach}}\mid m_G^*(s)<\infty\,\}
$$

for the reachable States supporting Agency. Turning the cardinality of this set into a proportion would require either a finite domain or a declared measure, plus a reason to use that weighting. The signature supplies neither an empirical visitation distribution nor a quantity of gameness, so no normalized score is defined here.

### Where can the fork go?

Latency asks how deep an inspection must go before two continuations become distinguishable. It does not ask whether the futures available after them can later be brought back to one State. A difference may be visible immediately and still have a corridor home.

**Definition 21. Raw reach and immediate outcomes.** Write $X_G^{\mathrm{reach}}$ for the configurations reachable from $X_0$. For a profile $p$ admitted at a reachable State $s$, define its raw outcome set by

$$
\operatorname{Out}_G(s,p)
:=
\{\,x'\in X\mid
\exists x\in s\cap X_G^{\mathrm{reach}}:
x\xrightarrow{p}x'\,\}.
$$

For a configuration $x$, let

$$
\operatorname{RawReach}^G_{\leq j}(x)
:=
\{\,[y]_{\sim_G}\in S_G\mid
x=y_0\longrightarrow y_1\longrightarrow\cdots
\longrightarrow y_\ell=y
\text{ for some }\ell\leq j\,\},
$$

where each arrow is an admitted transition under some profile. The path remains on raw configurations until its endpoint is read as a State. This prevents a quotient path from silently switching representatives of one State between steps.

For two profiles $p,q$ admitted at $s$, define their common recovery set at depth $j$ by

$$
\operatorname{Recover}^G_{\leq j}(s;p,q)
:=
\bigcap_{u\in
\operatorname{Out}_G(s,p)\cup\operatorname{Out}_G(s,q)}
\operatorname{RawReach}^G_{\leq j}(u).
$$

**Proposition 21.1.** If $\operatorname{Recover}^G_{\leq j}(s;p,q)$ is non-empty, then it remains non-empty at every greater depth.

Each $\operatorname{RawReach}^G_{\leq j}(u)$ only grows with $j$. Any State common to all of them at one depth remains common at every greater one.

**Definition 22. Possible reconvergence.** The reconvergence depth of $p$ and $q$ at $s$ is

$$
j_G(s;p,q):=
\min\{\,j\in\mathbb N_0\mid
\operatorname{Recover}^G_{\leq j}(s;p,q)\neq\varnothing\,\},
$$

and $j_G(s;p,q):=\infty$ when the set is empty at every finite depth. Proposition 21.1 guarantees the least depth whenever one exists.

This is deliberately stronger than finding one lucky outcome from each profile that can meet. Every immediate outcome admitted by either profile must retain some route to one common State. It is still only **possible** reconvergence. The Rules admit those routes; nothing says an operating Trajectory takes them, that one Agent can force them, or that they are likely. The routes may also have different lengths no greater than $j$; this is a common upper bound, not a synchronized commit. When each profile has exactly one raw outcome configuration, the definition reduces to ordinary joining of their two outcome States.

Because $\operatorname{Out}_G(s,p)$ ranges over every reachable raw representative of $s$, the common target must work across all of them. The depth may therefore be infinite even where each representative, considered alone, admits some recovery, if those recoveries have no State in common. That is the deliberately robust reading chosen here, not a fact forced by the word *reconvergence*.

For an Agency witness $\{p,q\}\in\mathcal W_G(s)$, $j_G(s;p,q)$ records recoverability of that particular fork. Different witnesses at the same State may have different depths, so the construction keeps the assignment instead of hiding it under one average or supremum. The fork stays on the record even when the futures it leaves available can meet again. This is not consequence duration made into a number. It is the earliest common recovery the configured form admits.

**Proposition 23. Structural isomorphism-invariance.** Let $f:G\cong G'$ preserve the structural correspondences required by Definition 7, let $\bar f_X:S_G\to S_{G'}$ be the induced quotient bijection $[x]_{\sim_G}\mapsto[f_X(x)]_{\sim_{G'}}$, and let $f_{\operatorname{Prof}}$ be the induced bijection on profiles. Then

$$
\{p,q\}\in\mathcal W_G(s)
\Longleftrightarrow
\{f_{\operatorname{Prof}}(p),f_{\operatorname{Prof}}(q)\}
\in\mathcal W_{G'}(\bar f_X(s)),
$$

and consequently

$$
m_G^*(s)=m_{G'}^*(\bar f_X(s)),
\qquad
\ell_G(s;p,q)
=
\ell_{G'}\bigl(\bar f_X(s);f_{\operatorname{Prof}}(p),f_{\operatorname{Prof}}(q)\bigr),
\qquad
j_G(s;p,q)
=
j_{G'}\bigl(\bar f_X(s);f_{\operatorname{Prof}}(p),f_{\operatorname{Prof}}(q)\bigr).
$$

The role bijection preserves each difference set and its cardinality; the transition correspondence preserves reachable configurations, raw outcomes, and every later raw reach set; preservation of inspection depth preserves the witness relation. A change of material cannot move any of these values by itself. If a remake does move one, it has changed the represented structure rather than merely realizing it again.

### Knowing the whole map changes what, exactly?

$G$ fixes what a role is shown. It does not contain what an occupant has learned across one instance, several instances, a conversation, or a regrettably thorough wiki. Saturation therefore cannot be another structural value read from $G$ alone. It needs an explicit hypothesis space, and pretending otherwise would put biography into the signature through the back door.

**Definition 24. Saturation.** Fix a comparison scheme $\Pi$. A factive hypothesis assignment $K$ gives each source $\alpha$ and configured form $G$ a non-empty class

$$
\mathcal H_{\alpha}^{\Pi,K}(G)
$$

of well-formed Possibility Spaces over the structural vocabulary retained by $\Pi$, subject to

$$
\mathcal P_{\Pi(G)}
\in
\mathcal H_{\alpha}^{\Pi,K}(G).
$$

The class contains exactly the hypotheses compatible with whatever evidence and learning history $K$ attributes to $\alpha$. Here $\cong$ means isomorphism of the reachable State-labelled substructures from Definition 3, preserving profiles and transitions. Then $\alpha$ is saturated relative to $(G,\Pi,K)$ when

$$
\operatorname{Sat}_{\Pi,K}(\alpha,G)
\Longleftrightarrow
\{\,[P]_{\cong}\mid
P\in\mathcal H_{\alpha}^{\Pi,K}(G)\,\}
=
\{\,[\mathcal P_{\Pi(G)}]_{\cong}\,\}.
$$

In plain language: at the granularity declared by $\Pi$, no structurally different Possibility Space remains compatible with what $\alpha$ knows. Taking $\Pi$ to be the identity gives saturation with respect to the full reachable structural Possibility Space, not every unused symbol that may still occur in $G$. Without an update rule for $K$, this is an epistemic endpoint only; it claims neither convergence nor computability nor how the endpoint was reached.

Saturation does not mean the form is solved. No solution concept, objective, or standard of play appears here. It is not seeing through walls either. A source may know the complete map while $\operatorname{obs}(r)$ still withholds which point on that map is actual now. Nor does saturation remove Agency: none of the structural relations above reads $K$. What has run out is structural discovery under the declared comparison granularity, not operative difference.

### And the word *game*? Careful.

One question is left, and nothing above can answer it, because everything above was about a structure and this one is about an ordinary word. Why require any of it from a game?

Let $\mathcal G$ be the class of configured structures of the signature above. Let $\mathfrak C$ be a domain of candidate objects carrying whatever data a broader account of gamehood may require, and let

$$
\operatorname{str}:\mathfrak C\to\mathcal G
$$

send each candidate to its configured rule structure.

The extraction $\operatorname{str}$ is declared before Agency is evaluated. Variation exposed by the candidate's Rules as a contribution port is represented by a role coordinate; variation remaining after every represented contribution has been fixed remains inside $\longrightarrow$. Recasting an internal branch as a fictitious role changes $\operatorname{str}(z)$ rather than discovering Agency in the same configured structure. No canonical extraction is asserted, so the bridge is relative to the declared pair $(\mathfrak C,\operatorname{str})$.

**Bridge assumption. Representation.** If a candidate $z\in\mathfrak C$ is a game, then

$$
\operatorname{Ag}\bigl(\operatorname{str}(z)\bigr)\neq\varnothing.
$$

The converse is not asserted. The bridge does not rank what passes, make Agency sufficient for gamehood, or put a threshold on any quantity defined above. In prose, its necessary condition is:

**A game has a rule-constituted Possibility Space admitting a finite role set whose alternative contributions can yield inspectably different continuations at a reachable transition point.**

When an operating instance reaches such a point and the evaluated sources occupy its supporting role set, Definitions 15 and 17 establish instance-indexed Agenthood at $\Delta t_n$. Whether the committed profile itself belongs to a witnessing pair is a separate relation not defined here.

The bridge is not derivable from the machinery. *Game* occurs in no structural axiom or definition, so a derivation ending in the word needs a premise containing it. The usual candidate, that a game is something that can be played, already assumes a notion of operative difference close to Definitions 15 and 18. It relocates the bridge rather than discharging it. I would take a premise commanding wider assent. I do not have one, so this one stays exposed.

That also makes it killable. Under the declared extraction, exhibit a candidate that nobody disputes is a game and show that $\operatorname{Ag}(\operatorname{str}(z))$ is empty. The bridge dies; every proposition about Agency, minimum Agency arity, latency, and reconvergence remains. This is the only place the essay lets the world answer back.

Because $\mathcal G$ retains outcome support rather than outcome weight, this is also a substantive support-level claim. If an accepted game has, under the declared extraction, no continuation-sensitive contribution except changes of probability over identical supports, then its structural Agency is empty and it refutes this bridge. It does not refute the calculus. A distribution-sensitive bridge would require a richer configured structure.

Here is the bill for all five structural axioms and the bridge:

| Assumption | What it settles | Reject it and |
| --- | --- | --- |
| 1. Structural scope | structural Agency support reads only $G$ | unrepresented material, intent, reception, or other data may enter the Agency test |
| 2. Self-disclosure | admissibility is inspectable | Proposition 2 and State-defined availability need not hold |
| 3. Observation is branching | inspections compare every admitted outcome | a linear observation language induces a different continuation relation |
| 4. Induction | every inspection is finitely generated | finite depth need not exhaust State sameness |
| 5. Discrete settlement | an operating intervention has an ordered window | concrete Trajectory, Agenthood, and $\lambda_{G,I}$ lose their index |
| Bridge. Representation | relative to the declared extraction, gamehood requires non-empty support-level Agency | the structural calculus no longer rules candidates out as games |

**Remark. The assumptions have a model.** Take $X=\{x_0,x_1,x_2\}$, $A=\{0,a,b\}$, one role $r$ authorized for all three contributions and shown the whole configuration, $X_0=\{x_0\}$, and exactly

$$
x_0\xrightarrow{0}x_0,
\quad
x_0\xrightarrow{a}x_1,
\quad
x_0\xrightarrow{b}x_2,
\quad
x_1\xrightarrow{a}x_1,
\quad
x_2\xrightarrow{0}x_2.
$$

Interpret inspections as the finite objects generated by Definition 1 and operating instances as discrete paths. Let $\operatorname{str}(z_*)=G$ for one candidate declared a game. Admissibility separates $x_1$ from $x_2$, while $a$ and $b$ at $x_0$ share the empty completion and lead to separated continuations. Thus $(x_0,\{r\})\in\operatorname{Ag}_1(G)$, and all five structural axioms plus the bridge are jointly satisfiable. That is a proof obligation being discharged, not an illustration of anything.

## So what did all that buy?

The construction can now answer four structural questions often collapsed into whether an input “matters,” plus one epistemic question often confused with them.

| Question | Structural object | What it does not mean |
| --- | --- | --- |
| Where can an admitted contribution alter the continuation? | $S_A(G)$ and the witnesses in $\mathcal W_G(s)$ | where gameness, quality, or importance resides |
| How many role-coordinates separate the nearest continuation-changing admitted profiles? | $m_G^*(s)$ | interaction strength or how many people must cooperate |
| How deep must an inspection go before the difference appears? | $\ell_G(s;p,q)$ | elapsed time, magnitude, or experienced delay |
| Within how many transitions can every immediate outcome reach one common State? | $j_G(s;p,q)$ | when the actual Trajectory returns, or whether anyone can force it |
| Has a source exhausted structural discovery at the declared granularity? | $\operatorname{Sat}_{\Pi,K}(\alpha,G)$ | a solved form, knowledge of the current State, or loss of Agency |

These are not five measurements of one substance. The first four answer different questions about one configured structure; the fifth asks what a particular source has learned about it. A difference can be detectable immediately and have no common recovery. It can take several levels of inspection to surface and still admit a short route back once it does. Its nearest witness profiles can be two role coordinates apart without requiring two people or establishing synergy. A source can know every structural possibility and retain all the Agency it had. Combining the values into one score would erase exactly the distinctions they were introduced to keep.

A few older arguments also become smaller. Whatever no generated inspection can detect is not distinguished by the State, however loudly the infrastructure displays it. Two forms share a Rule only after the comparison names its scheme. Showing information to a role that $G$ previously withheld changes $\operatorname{obs}$, hence the configured form. Selecting one outcome under an unchanged profile is internal nondeterminism, not Agency; Agency requires a pair of admitted profiles differing only through the evaluated bound roles and yielding inspectably different continuations.

And an input can still be ceremonial. Drawing two boxes and an arrow between them establishes a diagram. Definition 18 asks for rather more.

The same discipline applies to the first four structural objects above. $m_G^*$ depends on the role decomposition, the geometry of the admitted-profile domain, and the continuation-fibre partition supplied by $f_s$: roles are its coordinates, admitted profiles are its metric domain, and continuation classes colour that domain. $\ell_G$ and $j_G$ remain attached to profile-pair witnesses because two witnesses at one State may behave differently. Aggregating them would require a declared aggregation rule; an average or distribution would additionally need a weighting or measure. The result would still describe Agency rather than gameness.

The Representation bridge changes none of those definitions. Relative to the declared extraction, it adds one global support-level necessary condition and nothing local. Reject it and the mathematics remains a calculus of operative difference; accept it and empty Agency support rules a candidate out as a game at that granularity. Neither direction turns the calculus into a score.

This piece therefore ends with less than a definition of gameness and more than an intuition about input. It has a structural Agency relation, a way to localize its supporting coordinate variation without borrowing variation from other roles, several deliberately non-interchangeable ways to inspect its shape, and one epistemic lift that says when discovery is spent without pretending that Agency went with it. Preference, meaning, purpose, quality, and consequence magnitude were never produced. They have not been disproved either. They are other work.

Every symbol above is supposed to pay rent by making one of those distinctions checkable. If I catch one merely standing around looking clever, it goes.
