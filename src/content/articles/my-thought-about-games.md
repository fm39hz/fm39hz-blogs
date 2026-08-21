---
author: FM39hz
pubDatetime: 2025-07-07
modDatetime: 2026-08-21
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

States will be something the Rules produce. Getting there takes longer than that sentence makes it sound, and the first thing it takes is writing down what a Rule is made of.

**The signature.** Take the Rules to consist of the following data.

*What may occur* needs things that may occur, and something that can enter them. Call the first a carrier of configurations $X$, and the second a set of interventions $A$.

*Which difference can count as a difference* needs something able to tell configurations apart, and neither $X$ nor $A$ does that on its own. What settles it is what the Rules show, which is never simply everything. So take a finite set of intervention roles $R$. For each role $r$, let $\operatorname{obs}(r)$ be a family of total readings $o:X\to V_o$, with one result set $V_o$ for each reading.

Rules also distinguish what may occur *by whom*, since a form where anyone may do anything is a special case and not the general one. So $\operatorname{auth}(r)\subseteq A$ is what role $r$ is authorized to supply.

*What follows from what* needs an admitted transition relation, and here the general case has to be taken rather than the convenient one. A transition does not consume one contribution. It consumes one from every role at once, because forms in which two roles commit without seeing each other are ordinary rather than exotic, and a signature that cannot state them is not describing Rules in general. So let

$$
\operatorname{Prof}:=\{\,p:R\to A\;\mid\;p(r)\in\operatorname{auth}(r)\,\}
$$

be the intervention profiles. Take $\longrightarrow\;\subseteq\;X\times\operatorname{Prof}\times X$, written $x\xrightarrow{p}x'$, and define

$$
\operatorname{Adm}_G(x)
:=
\{\,p\in\operatorname{Prof}\mid
\exists x':x\xrightarrow{p}x'\,\}.
$$

Last, somewhere the thing may begin: $\varnothing\neq X_0\subseteq X$. Non-emptiness is required so that the form has at least one initial configuration and its reachable set is defined from an actual starting point. Nothing else in that sentence has an unmet requirement, which gives

$$
G=\langle X,\;A,\;R,\;\operatorname{auth},\;\operatorname{obs},\;\longrightarrow,\;X_0\rangle
$$

Arriving at it this way was the point, but it is worth naming what was arrived at. This is a nondeterministic concurrent transition structure with roles and imperfect information, recognizable as a variant of a concurrent game structure: a carrier of configurations, roles acting at once, an authority function, an observation apparatus, and a transition relation consuming one contribution from every role simultaneously. It belongs to a familiar formal family without being identical to every standard CGS presentation.

$\operatorname{Prof}$ is defined from $A$, $R$, and $\operatorname{auth}$, so it is notation rather than a component.

$X$ is not the State space. It is deliberately too rich: anything the form can be in, described as finely as you like, including detail that will turn out to be irrelevant. Deciding here which detail is irrelevant would be assuming the answer to the question Definition 2 exists to settle.

Since $\operatorname{obs}$ sits inside $G$, disclosure is a Rule like any other. Concealment is not something done to the Rules. It is one of them.

And there is no probability anywhere in the signature. Where a transition may go several ways, $\longrightarrow$ records which ways and says nothing about how often, so forms weighted ninety-nine to one and evenly over the same support induce the same $G$ here. Everything below is therefore support-level. Two contributions may remain distinct contributions, but a difference only in their outcome weights cannot witness Agency in this calculus. A stochastic enrichment could retain the relations below as its possibilistic reduct while adding distribution-sensitive ones; the Representation bridge inherits the same restriction.

What can $G$ distinguish about itself? Let $\mathsf{Insp}_G$ be its carrier of inspections.

**Axiom 1. Self-disclosure.** The atomic basis is exactly

$$
\mathcal B_G
=
\{\mathbf{adm}\}
\sqcup
\bigsqcup_{r\in R}
\bigl(\{r\}\times\operatorname{obs}(r)\bigr).
$$

Its result carriers and readings are

$$
V_{\mathbf{adm}}:=\mathcal P(\operatorname{Prof}),
\qquad
\llbracket\mathbf{adm}\rrbracket:=\operatorname{Adm}_G,
$$

and, for every $(r,o)\in\{r\}\times\operatorname{obs}(r)$,

$$
V_{(r,o)}:=V_o,
\qquad
\llbracket(r,o)\rrbracket:=o.
$$

Every $b\in\mathcal B_G$ supplies one atomic inspection $\operatorname{atom}(b)\in\mathsf{Insp}_G$, and there are no other atomic inspections. When its tag is clear, write the atomic inspection simply as its reading. Thus profile availability is inspectable directly. It is determined by $G$ but not assumed computable.

**Axiom 2. Free formation.** For every $1\leq n<\infty$ and every $p\in\operatorname{Prof}$ there are constructors

$$
\operatorname{tuple}_n:
\mathsf{Insp}_G^n\to\mathsf{Insp}_G,
\qquad
\operatorname{prefix}_p:
\mathsf{Insp}_G\to\mathsf{Insp}_G.
$$

The map obtained by putting $\operatorname{atom}$, all $\operatorname{tuple}_n$, and all $\operatorname{prefix}_p$ together,

$$
c:
\mathcal B_G
\sqcup
\bigsqcup_{n\geq1}\mathsf{Insp}_G^n
\sqcup
(\operatorname{Prof}\times\mathsf{Insp}_G)
\longrightarrow
\mathsf{Insp}_G
$$

is injective. Write $\operatorname{tuple}_n(\iota_1,\ldots,\iota_n)$ as $(\iota_1,\ldots,\iota_n)$ and $\operatorname{prefix}_p(\iota)$ as $p\triangleright\iota$.

**Axiom 3. Branching observation.** Every inspection $\iota$ has a result carrier $V_\iota$ and a total result map $\operatorname{res}_\iota:X\to V_\iota$. These satisfy

$$
V_{\operatorname{atom}(b)}=V_b,
\qquad
\operatorname{res}_{\operatorname{atom}(b)}=\llbracket b\rrbracket
\qquad
(b\in\mathcal B_G),
$$

$$
V_{(\iota_1,\ldots,\iota_n)}
=
\prod_{j=1}^{n}V_{\iota_j},
\qquad
\operatorname{res}_{(\iota_1,\ldots,\iota_n)}(x)
=
\bigl(
\operatorname{res}_{\iota_1}(x),\ldots,
\operatorname{res}_{\iota_n}(x)
\bigr),
$$

and


$$
V_{p\triangleright\iota}
=
\mathcal P(V_\iota),
\qquad
\operatorname{res}_{p\triangleright\iota}(x)
=
\{\,\operatorname{res}_\iota(x')\mid x\xrightarrow{p}x'\,\}.
$$

The empty set records that $p$ is not admitted. Results are sets rather than multisets because $\longrightarrow$ carries neither branch multiplicity nor probability.

This branching semantics is strictly finer than reading one linear sequence at a time. In a one-role form, identify each profile with its unique contribution and take a total reading $o\in\operatorname{obs}(r)$ that has one common value on every non-terminal configuration and values $0,1$ on two terminals. Let $x\xrightarrow a u$ and $y\xrightarrow a v_0,v_1$; both roots admit only $a$, every middle configuration admits exactly $b,c$, and all corresponding non-terminal readings agree. From $u$, both $b$ and $c$ may reach terminal readings $0$ or $1$. From $v_0$, both reach only $0$; from $v_1$, both reach only $1$; all terminals admit nothing. Every linear sequence $ab$ or $ac$ obtains the same set $\{0,1\}$ at both roots. But the correlated inspection

$$
a\triangleright
(b\triangleright o,\;c\triangleright o)
$$

returns $\{(\{0,1\},\{0,1\})\}$ at $x$ and $\{(\{0\},\{0\}),(\{1\},\{1\})\}$ at $y$.

The tuple clause is the one easy to leave out. Inspect two residual probes separately and both result sets survive, while which pair of results came from the same outcome does not. Their tuple keeps that correlation. Tupling therefore applies at every depth, not only to the readings from which inspections begin.

**Axiom 4. Structural induction.** For every $P\in\mathcal P(\mathsf{Insp}_G)$,

$$
\begin{aligned}
&\bigl[\forall b\in\mathcal B_G:\ \operatorname{atom}(b)\in P\bigr]
\\[-2pt]
{}\land{}&
\bigl[\forall n\in\mathbb N,\ n\geq1,\ \forall\iota_1,\ldots,\iota_n:\
\bigl(\bigwedge_{j=1}^{n}(\iota_j\in P)\bigr)
\Longrightarrow
(\iota_1,\ldots,\iota_n)\in P\bigr]
\\[-2pt]
{}\land{}&
\bigl[\forall p\in\operatorname{Prof},\ \forall\iota:\
\iota\in P
\Longrightarrow
p\triangleright\iota\in P\bigr]
\\[2pt]
&\Longrightarrow
P=\mathsf{Insp}_G.
\end{aligned}
$$

**Definition 1. Inspection depth.** Define depth by

$$
\operatorname{depth}(\operatorname{atom}(b)):=0,
\qquad
\operatorname{depth}(\iota_1,\ldots,\iota_n)
:=\max_j\operatorname{depth}(\iota_j),
\qquad
\operatorname{depth}(p\triangleright\iota)
:=1+\operatorname{depth}(\iota).
$$

Depth counts the longest chain of profile prefixes, not the total number of probes held inside a tuple.

**Corollary 4.1.** Every inspection has finite depth.

By structural induction. Readings begin at zero, a finite maximum of already finite depths stays finite, and prefixing adds one.

Which brings back the thing promised a few paragraphs up. What is a State?

**Definition 2. State.** $x\sim_G y$ when no inspection separates them, meaning

$$
\operatorname{res}_\iota(x)
=
\operatorname{res}_\iota(y)
$$

for every inspection $\iota$. Write $S_G:=X/\sim_G$ for the State space.

A State is complete relative to this inspection language and to nothing stronger: it preserves exactly every distinction expressible by a finite inspection. Definition 3 therefore keeps paths on raw configurations unless finite-image transfer later supplies a transition relation on the quotient.

**Proposition 1.** $\sim_G$ is an equivalence relation, and the coarsest one respecting every inspection.

It is the kernel of the family of inspections $G$ itself admits, so it exists for the same reason any map has a kernel and is coarsest for the same reason. Equivalently: each inspection cuts $X$ into the parts it can tell apart, and a State is one cell of the intersection of every such cut.

**Proposition 2.** Configurations of one State admit the same profiles.

By Axioms 1 and 3 and Definition 1, $\operatorname{atom}(\mathbf{adm})$ returns $\operatorname{Adm}_G$ and has depth zero. $\sim_G$ respects every inspection.

For a State $s$, therefore write

$$
\operatorname{Adm}_G(s):=\operatorname{Adm}_G(x),
\qquad x\in s.
$$

**Proposition 3.** Every residual inspection of a branching continuation is already an inspection of its root after prefixing the intervening profile.

For any residual inspection $\iota$, its result on the continuation opened by $p$ is exactly $\operatorname{res}_{p\triangleright\iota}$ at the earlier configuration. Hence any difference between the sets of residual results after $p$ is inspectable before $p$ is taken.

**Remark 4.** No inspection depends on the history that produced a configuration, except through its State.

Inspections depend on the current configuration. If a fact about the past changes a later inspection result, that fact distinguishes the current configurations and therefore separates their States. The fact was never outside the State. It was one of the distinctions the Rules had been drawing all along.

**Proposition 5.** Coarsening $\sim_G$ cannot preserve every inspection. Refining it adds no inspectable behavior.

Coarsen it and you merge configurations on which some result map differs, so that map no longer factors through the quotient. The coarser quotient may be consistent, but it is not the State relation of this declared form. Refine it and you separate configurations no generated inspection can distinguish. The added labels change no inspectable continuation behavior and cannot change the empty-versus-non-empty Agency verdict. They do change the names and number of quotient cells; a later construction that reads those extra labels has changed the observation convention rather than extracted more behavior from the same inspections.

That is one State. What about all of them, meaning the whole of what a form can reach?

**Definition 3. Possibility Space.** The raw substructure reachable from $X_0$—its configurations, admitted profiles, and full transition relation—with each configuration carrying its State as a label. Write $\mathcal P_G$. Its paths are paths through raw configurations, and the labels do not license swapping one representative of a State for another halfway along.

Write $S_G^{\mathrm{reach}}$ for the State labels occurring in $\mathcal P_G$.

Nothing above gives $S_G$ a transition relation of its own. Configurations of one State admit the same profiles by Proposition 2, and that alone does not say their successors match State for State. Extension axiom $F_O$ and Proposition 10.1 later supply that stronger result. Until then, anything that walks transitions walks them on configurations and reads States only where it stops.

Everything below is relative to the $G$ actually declared.

Now the debt from the Xiangqi sentence, which has been sitting there since the opening list. That sentence only became true once I named the comparison I was making. So when do two forms express the same Rule?

**Definition 4. Comparison scheme.** Let $\mathcal D$ be a class of configured forms. A comparison scheme is an assignment

$$
\Pi:\mathcal D\to\mathcal D
$$

selecting one declared structural granularity for every form under comparison. Every $\Pi(G)$ must itself be a well-formed configured form of the same signature, and, up to structural isomorphism,

$$
G\cong H\Longrightarrow\Pi(G)\cong\Pi(H),
\qquad
\Pi(\Pi(G))\cong\Pi(G).
$$

The assignment is not inferred from a map on $X$ alone. How configurations, interventions, roles, authority, observations, beginnings, profiles, and transitions appear at the selected granularity belongs to the declared scheme.

**Definition 5. Sameness relative to a comparison scheme.** Two forms express the same Rule relative to $\Pi$ when $\Pi(G_1)$ and $\Pi(G_2)$ are isomorphic as configured forms. Concretely, bijections

$$
f_X:X_1\to X_2,
\qquad
f_A:A_1\to A_2,
\qquad
f_R:R_1\to R_2
$$

induce

$$
f_{\operatorname{Prof}}(p)(f_R(r))
:=
f_A(p(r)).
$$

They preserve beginnings and authority:

$$
f_X[X_{0,1}]=X_{0,2},
\qquad
f_A[\operatorname{auth}_1(r)]
=
\operatorname{auth}_2(f_R(r)).
$$

For every role $r$, a bijection

$$
f_{\operatorname{obs},r}:
\operatorname{obs}_1(r)
\to
\operatorname{obs}_2(f_R(r))
$$

pairs each reading $o:X_1\to V_o$ with $o':=f_{\operatorname{obs},r}(o):X_2\to V_{o'}$. A carrier bijection $f_{V_o}:V_o\to V_{o'}$ then satisfies

$$
f_{V_o}\circ o
=
o'\circ f_X.
$$

Finally,

$$
x\xrightarrow{p}_1y
\Longleftrightarrow
f_X(x)
\xrightarrow{f_{\operatorname{Prof}}(p)}_2
f_X(y).
$$

The inspection results and depths are then preserved by Axioms 1–4 and Definition 1.

**Remark 6.** Sameness relative to $\Pi$ is not identity relative to $\Pi$.

Inside a declared $G$, two configurations are one State or they are not. A comparison scheme instead declares a granularity between forms. Two forms may therefore be the same under one scheme and different under another without contradiction; each answer is only about the distinctions its scheme retained.

That settles what a comparison is about. Now a question that is smaller and much older than it looks. Does any of this care what the thing is made of?

**Definition 6. Infrastructure.** The material, computational, or procedural arrangement through which $G$ can be represented or operated. An infrastructure carries a raw transition structure of its own.

**Definition 7. Realization.** An infrastructure realizes $G$ when its represented layer is structurally isomorphic to $G$ in the sense of Definition 5, before any comparison scheme is applied. By Axioms 1–4 and Definition 1, that isomorphism also preserves every inspection result and its depth.

The qualification *represented layer* matters. The definition does not claim a bijection between $G$ and every physical microstate of its infrastructure; it says that changing material while preserving the configured structure changes none of the structural questions asked here.

**Proposition 7. Realization-invariance.** Every structural construction below is preserved under the correspondences induced by a realization; numerical values agree.

Immediate from structural isomorphism. Concrete bindings and committed Trajectories still belong to an operating instance and require the corresponding instance data.

Nothing so far has been running. What changes when somebody actually runs it?

Let $\operatorname{Path}(G)$ be the set of finite or countably infinite sequences, including zero-edge paths,

$$
x_0\xrightarrow{p_0}x_1
\xrightarrow{p_1}x_2\cdots
$$

with reachable $x_0$ and $x_n\xrightarrow{p_n}x_{n+1}$ at every transition index. Let $\mathsf{Inst}_G$ be the carrier of declared operating instances and $\mathsf{Src}$ the carrier of sources.

**Axiom 5. Operating-instance structure.** There is a total trace map

$$
\operatorname{trace}_G:
\mathsf{Inst}_G\to\operatorname{Path}(G),
$$

Define

$$
\operatorname{Idx}_G
:=
\{\,(I,n)\mid
I\in\mathsf{Inst}_G,
\ n\text{ is a transition index of }\operatorname{trace}_G(I)\,\}.
$$

There is also a total binding assignment

$$
\operatorname{bind}_G:
\operatorname{Idx}_G
\longrightarrow
(R\rightharpoonup\mathsf{Src}),
$$

where a partial function permits a role to be unoccupied but never binds one role to two sources at the same window.

**Definition 8. Operating instance and Trajectory.** An operating instance is an element $I\in\mathsf{Inst}_G$. Its committed Trajectory is $\operatorname{trace}_G(I)$.

The Possibility Space may branch, loop, and admit many counterfactual continuations. The Trajectory already committed does not branch retroactively. Non-linearity belongs to the structure of possible continuations; actualization produces an ordered history. A Trajectory does not require a built-in ending, and remains an ordered history for as long as the instance continues to operate.

The configured form, the infrastructure realizing it, an operating instance, and an observer encountering that instance are four distinct relations. When no instance is operating, no Trajectory is being actualized, while $G$ and $\mathcal P_G$ remain exactly what they were.

**Definition 9. Transition window.** $\Delta t_n$ is the window joining $s_n$ to $s_{n+1}$ in the order supplied by Axiom 5, a logical position and not a measurable duration in physical time. Write $\Delta t$ for such a window in general.

At $\Delta t_n$, an admitted profile $p$ enters the transition:

$$
x_n^I\xrightarrow[\Delta t_n]{p_n^I}x_{n+1}^I,
\qquad
s_i=[x_i^I]_{\sim_G}
$$

The transition is written on configurations for the reason just given under Definition 3. The instance occupies $x_n^I$ and the State label is $s_n=[x_n^I]_{\sim_G}$; no quotient transition has been assumed here.

To speak of an alternative Trajectory is to hold the committed prefix fixed and ask what different continuation could have become actual next. It does not mean rewriting a past that has already occurred. The Agency test below asks whether the window supports such alternatives; it does not require the committed profile to be one of their witnesses.

Nothing so far guarantees Agency. What it gives is a Possibility Space, an operating Trajectory, and a window at which Agency could be expressed.

So which bound roles can supply an operative difference there, and how much variation do the Rules admit through them?

**Definition 10. Role and binding.** At a window, an operating instance may bind a source $\alpha\in\mathsf{Src}$ to one or more intervention roles. A source may itself be an individual, a collective producing one joint output, or an autonomous process. A role specifies which contributions may become operative there and the authority with which they enter; it does not identify the concrete source that supplies them. Write

$$
U_I(\alpha,\Delta t_n)
:=
\{\,r\in\operatorname{dom}(\operatorname{bind}_G(I,n))\mid
\operatorname{bind}_G(I,n)(r)=\alpha\,\}
$$

This is the role block occupied by the evaluated source at that window. A committed contribution is attributable to $\alpha$ when it enters through one of those roles. Anything merely carrying or translating that output remains infrastructure in this relation.

*Available to $\alpha$* below means structurally available through the roles it occupies. A source-specific capability or policy is not present in the signature; adding one would refine the instance relation without changing structural support. No unrepresented property of the source enters this Agency test.

Binding attributes a contribution to a source. It does not attribute the outcome to the contribution. No relation of actual causation is defined anywhere in this essay, and Definition 15 does not quietly supply one: it compares what other contributions would have made available, and reads nothing whatever off the one actually supplied.

Authority determines what may be supplied through a role. Information records what that role is shown. A State is the complete finitely inspectable condition under Axioms 1–4, not what any one role is shown, and in every form that conceals anything the two come apart.

**Definition 11. Role-indistinguishability.** For a role $r$, $\approx_r$ is indistinguishability by inspections built from $\operatorname{obs}(r)$ alone.

This is a structural observation relation induced by what $r$ is shown, not a knowledge relation or a claim about which experiments its occupant can force. Its prefix clause ranges over every $p\in\operatorname{Prof}$, returning the empty set where $p$ is not admitted. A policy restricted to the occupant's authority would be another construction.

**Proposition 8.** $\approx_r$ is coarser than $\sim_G$. It is strictly coarser exactly when there are configurations $x,y$ which no $r$-inspection separates but some inspection available to $G$ does.

The readings in $\operatorname{obs}(r)$ form a subfamily of those generating $\sim_G$, so the induced relation can only be coarser. The displayed kind of pair is exactly the witness required for strictness.

**Proposition 9.** $\approx_r$ is fixed by $G$ and not by $I$.

$\operatorname{obs}$ is a component of $G$. Two arrangements differing in what a role is shown differ in $\operatorname{obs}$, hence by Definition 7 are two forms rather than one form on different hardware.

**Definition 12. Available contributions.** For a non-empty role set $U\subseteq R$ and reachable State $s$, define

$$
\Gamma_G(U,s)
:=
\{\,p|_U\mid p\in\operatorname{Adm}_G(s)\,\}.
$$

This is a local set of contribution vectors, not a set of policies over hidden States. The absence of $\approx_r$ is deliberate: constancy across an indistinguishability class is a property of a policy, not of one local vector.

For $\gamma\in\Gamma_G(U,s)$, define its completions by

$$
\Delta_G(\gamma,s;U)
:=
\left\{\,
\delta\in
\prod_{r\in R\setminus U}\operatorname{auth}(r)
\;\middle|\;
\gamma\oplus\delta\in\operatorname{Adm}_G(s)
\right\}.
$$

Here $\gamma\oplus\delta$ is the unique profile agreeing with $\gamma$ on $U$ and with $\delta$ on $R\setminus U$.

An occupant may still guess. Distinguishing a guess from informed control would require evaluating one policy over an entire $\approx_r$-class, which is not defined here.

**Definition 13. Raw branching continuation.** For a configuration $x$ and a profile $p$ admitted there, $\mathcal T_G(x,p)$ is the rooted branching unfolding containing every outcome admitted for $p$ and every admitted continuation after those outcomes. It is not one selected successor.

**Definition 14. Depth-**$k$ **indistinguishability.** For configurations, define

$$
x\sim_G^k y
\Longleftrightarrow
\operatorname{res}_\iota(x)=\operatorname{res}_\iota(y)
\quad
\text{for every }\iota
\text{ with }\operatorname{depth}(\iota)\leq k.
$$

For a raw continuation, the result of a residual inspection is

$$
\operatorname{Res}_\iota\bigl(\mathcal T_G(x,p)\bigr)
:=
\{\,\operatorname{res}_\iota(x')\mid x\xrightarrow{p}x'\,\}.
$$

Its residual depth is $\operatorname{depth}(\iota)$; the already fixed profile $p$ is not counted. Write

$$
\mathcal T_1\equiv_G^k\mathcal T_2
$$

when these results agree for every residual inspection of depth at most $k$, and define

$$
\equiv_G
:=
\bigcap_{k\in\mathbb N_0}\equiv_G^k.
$$

The symbols are deliberately different: $\sim_G^k$ compares configurations, while $\equiv_G^k$ compares branching continuations.

**Lemma 14.1. State-rooted continuation.** If $x,y$ belong to one State and $p$ is admitted there, then

$$
\mathcal T_G(x,p)\equiv_G^k\mathcal T_G(y,p)
$$

for every finite $k$. Otherwise, prefixing a separating residual inspection by $p$ would separate $x$ from $y$. Therefore the class

$$
\mathcal C_G(s,p)
:=
[\mathcal T_G(x,p)]_{\equiv_G},
\qquad x\in s,
$$

is independent of the representative. Raw unfoldings need not be literally identical; the continuation class is the State-rooted object used below. The induced finite-depth relation on classes is

$$
[\mathcal T]_{\equiv_G}
\equiv_G^k
[\mathcal T']_{\equiv_G}
\Longleftrightarrow
\mathcal T\equiv_G^k\mathcal T'.
$$

It is well defined because full $\equiv_G$ implies $\equiv_G^k$ at every finite depth.

**Proposition 10.** $\sim_G^{k+1}\subseteq\sim_G^k$ and $\equiv_G^{k+1}\subseteq\equiv_G^k$. Moreover,

$$
\bigcap_k\sim_G^k=\sim_G,
\qquad
\bigcap_k\equiv_G^k=\equiv_G.
$$

Going deeper only adds inspections, which gives both inclusions. Every inspection has finite depth by Corollary 4.1, which gives both intersections.

**Extension axiom $F_O$. Finite observable outcome images.** For every configuration $x$ and profile $p$, define

$$
\operatorname{SPost}_G(x,p)
:=
\{\,[x']_{\sim_G}\mid x\xrightarrow{p}x'\,\},
$$

and suppose $|\operatorname{SPost}_G(x,p)|<\infty$. This allows infinitely many raw outcomes when they occupy only finitely many States.

**Proposition 10.1 ($F_O$-transfer).** Under $F_O$, $\sim_G$ is a reading-preserving bisimulation for the profile-labelled transition relation.

Suppose $x\sim_G y$ and $x\xrightarrow{p}x'$. Proposition 2 gives $p\in\operatorname{Adm}_G(y)$, so $y$ has at least one $p$-successor. If none shared the State of $x'$, choose one representative for each of the finitely many successor State classes of $y$, one inspection separating that class from $x'$, tuple those inspections, and prefix the non-empty tuple by $p$. The resulting inspection would separate $x$ from $y$, a contradiction. The converse direction is symmetric. Thus the quotient admits a well-defined transition relation

$$
s\xRightarrow{p}_G t
\Longleftrightarrow
\exists x\in s,\,y\in t:
x\xrightarrow{p}y.
$$

Without $F_O$, no bisimulation or quotient-transition transfer is asserted.

**Proposition 11.** If two continuation classes differ, a least separating residual depth exists.

Their classes differ exactly when some finite-depth residual inspection separates representatives. By Proposition 10 the separating depths are non-empty and upward closed, and therefore have a least element.

The question is now short: when can changing what enters through a role block change the continuation?

For a reachable State $s$, set

$$
D_s:=\operatorname{Adm}_G(s),
\qquad
Q_s:=\{\,\mathcal C_G(s,p)\mid p\in D_s\,\},
$$

and define the continuation map

$$
\kappa_s:D_s\to Q_s,
\qquad
\kappa_s(p):=\mathcal C_G(s,p).
$$

Proposition 2 makes $D_s$ well defined, and Lemma 14.1 does the same for $\mathcal C_G(s,p)$.

For $p,q\in D_s$, write

$$
\operatorname{Diff}(p,q)
:=
\{\,r\in R\mid p(r)\neq q(r)\,\}.
$$

**Definition 15. Agency.** A non-empty role set $U\subseteq R$ bears structural Agency at $s$ when

$$
(s,U)\in\operatorname{Ag}(G)
\Longleftrightarrow
\exists p,q\in D_s:
\operatorname{Diff}(p,q)\subseteq U
\land
\kappa_s(p)\neq\kappa_s(q).
$$

Equivalently, there are $\gamma_1\neq\gamma_2$ in $\Gamma_G(U,s)$ and one shared completion

$$
\delta\in
\Delta_G(\gamma_1,s;U)
\cap
\Delta_G(\gamma_2,s;U)
$$

such that the two completed profiles lie in different continuation classes. Holding the completion fixed prevents variation outside $U$ from being credited to $U$.

At a concrete window with $U_I(\alpha,\Delta t_n)\neq\varnothing$, Agency is available through $\alpha$'s binding exactly when

$$
\bigl(s_n,U_I(\alpha,\Delta t_n)\bigr)
\in
\operatorname{Ag}(G).
$$

The State and binding are actual; the profile pair is counterfactual. Neither witness must be the profile committed at the window, so this is a capacity claim rather than actual causation.

**Definition 16. Witnesses and latency.** Let

$$
\mathcal W_G(s)
:=
\left\{\,
\{p,q\}\subseteq D_s
\;\middle|\;
p\neq q
\land
\kappa_s(p)\neq\kappa_s(q)
\right\}.
$$

For each witness pair, define its least distinguishing depth by

$$
\ell_G(s;p,q)
:=
\min\{\,k\in\mathbb N_0\mid
\mathcal C_G(s,p)\not\equiv_G^k\mathcal C_G(s,q)\,\}.
$$

Proposition 11 guarantees the minimum. For a role block $U$, define

$$
\lambda_G(s,U)
:=
\min\{\,\ell_G(s;p,q)\mid
\{p,q\}\in\mathcal W_G(s),
\operatorname{Diff}(p,q)\subseteq U\,\},
$$

with value $\infty$ when the set is empty. When $U_I(\alpha,\Delta t_n)\neq\varnothing$, instance latency is

$$
\lambda_{G,I}(\alpha,s_n;\Delta t_n)
:=
\lambda_G\bigl(s_n,U_I(\alpha,\Delta t_n)\bigr).
$$

This is a rank in the residual-inspection hierarchy, not elapsed time on the committed Trajectory. Arithmetic summaries are possible once a population and interpretation are declared; what the construction does not supply is a ratio-scale claim such as “depth six is twice as delayed as depth three.”

**Proposition 12.** The following are equivalent: $(s,U)\notin\operatorname{Ag}(G)$; $\lambda_G(s,U)=\infty$; and within every shared completion all contributions through $U$ lie in one continuation class.

This is the universal negation of Definition 15. Different completions may still yield different continuations; the fixed-complement test assigns none of that variation to $U$.

**Proposition 13.** For $U_I(\alpha,\Delta t_n)\neq\varnothing$, Agency is present through the instance binding exactly when its latency is finite.

**Proposition 14.** Internal nondeterminism may change which outcome becomes actual without that branch selection constituting an Agency witness for any binding.

Several outcomes of one unchanged profile belong to the same raw branching continuation. A source explicitly bound to a role is another case: its alternative outputs are evaluated as profile variation under Definition 15. The distinction therefore remains relative to the declared representation of contributions and internal branching.

**Proposition 15.** Role uncertainty does not veto local Agency.

$\Gamma_G(U,s)$ imposes no condition on what an occupant can distinguish. Uncertainty may make an intervention a guess without erasing the structural alternative. Informed control would require a policy over an $\approx_r$-class and is a different relation.

**Remark 16. Rule mutation.** If $G$ permits an intervention to alter a parameter or Rule, the mutable component is represented in $X$ and the permission appears in $\longrightarrow$. Where the alteration changes a later inspection result—including admissibility or inspectable branching—the affected configurations occupy different States. A raw difference no generated inspection can detect is structurally idle. If the alteration is not admitted by $G$, continuing under it means continuing under a different configured form $G'$.

**Definition 17. Agent.** Where instance-indexed Agency is available, the source occupying the evaluated roles is an Agent at that binding and window. A collective may occupy those roles as one source under Definition 10. This names access to an Agency-supporting role block; it does not assert that the committed profile was a witness.

**Proposition 17. Locality.** Agenthood is not intrinsic to a source. It is local to $(G,I,\alpha,s_n,\Delta t_n)$ through the reached State and occupied role set.

**Definition 18. Structural grades.** For $1\leq m\leq|R|$, define

$$
\operatorname{Ag}_m(G)
:=
\{\,(s,U)\in\operatorname{Ag}(G)\mid
1\leq|U|\leq m\,\},
$$

and write

$$
\operatorname{Ag}_*(G)
:=
\bigcup_{m=1}^{|R|}\operatorname{Ag}_m(G)
=
\operatorname{Ag}(G).
$$

The grade counts role coordinates, not sources. Membership does not make every coordinate in $U$ essential, because supporting sets admit irrelevant padding.

**Proposition 18. Contribution-substitution invariance.** $\operatorname{Ag}(G)=\varnothing$ exactly when, at every reachable State, every two admitted profiles open the same continuation class.

Equivalently, against every shared completion, substituting any admitted contribution vector for another changes no continuation class. Source renaming is separately invisible to the structural test whether or not Agency is empty.

**Remark 18.1.** $\operatorname{Ag}_1$ and $\operatorname{Ag}_*$ can differ.

Take two roles, each authorized to supply $0$ or $1$, and admit only $(0,0)$ and $(1,1)$ at $x_0$, with the two profiles opening different continuation classes; let every other reachable State admit at most one continuation class. No singleton has a shared completion, so $\operatorname{Ag}_1(G)=\varnothing$, while the two-role block leaves nothing to complete and bears Agency.

Regard $D_s$ as a Hamming graph, joining profiles that differ at one role, and colour every vertex by $\kappa_s$. A one-role witness is an edge between colours. A full finite product is connected, so a non-constant colouring has such an edge. A non-product admitted domain may delete every such path. The domain geometry makes higher arity possible; the actual value still depends on the continuation colouring.

**Proposition 18.2. Difference-set normal form.** For every reachable $s$ and non-empty $U\subseteq R$,

$$
(s,U)\in\operatorname{Ag}(G)
\Longleftrightarrow
\exists\{p,q\}\in\mathcal W_G(s):
\operatorname{Diff}(p,q)\subseteq U.
$$

**Proposition 19. Role-block monotonicity.** If $U\subseteq V$ and $(s,U)\in\operatorname{Ag}(G)$, then $(s,V)\in\operatorname{Ag}(G)$.

The same witness difference set lies inside both blocks. This is upward closure of support, not a claim that every added role becomes essential.

**Corollary 19.1.** $\operatorname{Ag}(G)=\varnothing$ exactly when $(s,R)\notin\operatorname{Ag}(G)$ for every reachable State $s$.

The corollary itself follows from upward closure even for an infinite $R$. The standing finiteness of $R$ instead makes every witness block finite, makes the grading in Definition 18 exhaustive, and keeps $m_G^*$ natural-valued.

**Definition 19. Minimum Agency arity.** Define

$$
m_G^*(s)
:=
\min\{\,|\operatorname{Diff}(p,q)|\mid
\{p,q\}\in\mathcal W_G(s)\,\},
$$

and $m_G^*(s):=\infty$ when $\mathcal W_G(s)$ is empty. It is the minimum cross-fibre Hamming distance, not interaction strength, cooperation, or a count of people.

Write

$$
S_A(G)
:=
\{\,s\in S_G^{\mathrm{reach}}\mid
\mathcal W_G(s)\neq\varnothing\,\}
$$

for the reachable locus of structural Agency support.

One quantity is still missing. Latency says how deep a particular witness must be inspected before it separates. The next relation asks a different question: whether all of that witness's immediate outcomes can reach one common future State within one shared finite bound.

**Definition 20. Raw reach and common recovery.** Write $X_G^{\mathrm{reach}}$ for the raw configurations reachable from $X_0$. For $p\in D_s$, define

$$
\operatorname{Out}_G(s,p)
:=
\left\{\,
x'\in X
\;\middle|\;
\exists x\in s\cap X_G^{\mathrm{reach}}:
x\xrightarrow{p}x'
\right\}.
$$

For a raw configuration $x$, let

$$
u\to_G v
\Longleftrightarrow
\exists p\in\operatorname{Prof}:
u\xrightarrow{p}v
$$

be the unlabelled projection of the admitted transition relation, and define

$$
\operatorname{RawReach}_{\leq j}^G(x)
:=
\left\{\,
[y]_{\sim_G}
\;\middle|\;
\exists\ell\in\mathbb N_0,\ \ell\leq j:
x=y_0\to_G\cdots\to_G y_\ell=y
\right\}.
$$

For $\ell=0$, this is the empty path from $x$ to itself.

Paths remain raw until their endpoints are read as States. For an admitted pair $p,q$, define

$$
\operatorname{Recover}_{\leq j}^G(s;p,q)
:=
\bigcap_{u\in
\operatorname{Out}_G(s,p)\cup
\operatorname{Out}_G(s,q)}
\operatorname{RawReach}_{\leq j}^G(u).
$$

**Proposition 20.** Once $\operatorname{Recover}_{\leq j}^G(s;p,q)$ is non-empty, it remains non-empty at every greater depth.

Every raw reach set only grows with $j$, so any State common to all of them remains common.

**Definition 21. Possible reconvergence.** For a witness pair $\{p,q\}\in\mathcal W_G(s)$, define

$$
j_G(s;p,q)
:=
\min\{\,j\in\mathbb N_0\mid
\operatorname{Recover}_{\leq j}^G(s;p,q)\neq\varnothing\,\},
$$

and set $j_G(s;p,q):=\infty$ when no finite bound exists.

Every immediate outcome of either profile must retain a route to one common State within the same finite bound, though each outcome may use a different route. Nothing says an actual Trajectory takes one of them, one Agent can force one, or any route is likely. This is bounded robust possible recovery, not consequence duration or erasure.

For a genuine witness, $j_G(s;p,q)\neq0$. If every immediate outcome already carried one State label, every residual inspection would return the same singleton result and the pair would not be a witness.

Latency and reconvergence answer separate questions on the same witness pair. $\ell_G(s;p,q)$ asks when the original continuations first become distinguishable; $j_G(s;p,q)$ asks whether their immediate outcomes share a finite uniform recovery bound to one common future State. A finite $j$ does not make the rooted continuations equal again, because their earlier fork remains part of what an inspection of those roots can recover.

One question is left, and before attaching it to the word *game*, the mathematics can be made to say exactly what is present when Agency is non-empty and exactly what disappears when it is not.

**Definition 22. Continuation fibres.** The fibres of $\kappa_s$ partition $D_s$ by continuation class: two admitted profiles lie in one fibre exactly when no residual inspection distinguishes the continuations they open. Call $\kappa_s$ non-constant exactly when

$$
\exists p,q\in D_s:
\kappa_s(p)\neq\kappa_s(q),
$$

equivalently when $|\operatorname{im}\kappa_s|\geq2$. The empty map at a terminal State is therefore not non-constant.

**Proposition 21. Agency is non-constancy.** At a reachable State $s$, some non-empty role block bears Agency exactly when $|\operatorname{im}\kappa_s|\geq2$.

The forward direction is Definition 15. For the reverse, choose two profiles in different fibres and take $U=\operatorname{Diff}(p,q)$. Because $R$ is finite, $U$ is a finite non-empty role block, and the profiles agree on its complement. Thus the continuation map carries no Agency exactly when its image has at most one element, covering both terminal States and non-terminal States whose admitted profiles all share one continuation class.

**Definition 23. Structural playability.** A configured form is structurally playable when some reachable continuation map has at least two values:

$$
\operatorname{SPlay}(G)
\Longleftrightarrow
\exists s\in S_G^{\mathrm{reach}}:
|\operatorname{im}\kappa_s|\geq2.
$$

By Proposition 21,

$$
\operatorname{SPlay}(G)
\Longleftrightarrow
\operatorname{Ag}(G)\neq\varnothing
\Longleftrightarrow
S_A(G)\neq\varnothing.
$$

Because $R$ is finite, every such witness differs within a finite role block.

**Axiom 6. Constitution.** $\operatorname{Game}$ is a primitive predicate of configured forms and is invariant under structural isomorphism:

$$
G\cong H
\Longrightarrow
\bigl(
\operatorname{Game}(G)
\Longleftrightarrow
\operatorname{Game}(H)
\bigr).
$$

No unrepresented material, authorship, intent, reception, or context enters this predicate. A richer account must enrich $G$ or change the object being classified.

**Axiom 7. Representation.** Every game is structurally playable:

$$
\operatorname{Game}(G)
\Longrightarrow
\operatorname{SPlay}(G).
$$

Equivalently, a form whose continuation-map image has cardinality at most one at every reachable State is not a game. No converse is asserted.

The same artifact may admit different configured representations. Exposing variation as a role contribution or leaving it as internal nondeterminism gives different forms; Axiom 7 is evaluated only after one representation has been fixed.

This is also a support-level bridge. If an accepted game has no continuation-sensitive contribution except changes of probability over identical supports, then it fails $\operatorname{SPlay}$ and refutes the bridge at this granularity. It does not refute the calculus. A distribution-sensitive bridge requires a richer signature.

**Extension axiom $F_P$. Finite local profile domains.** Every reachable State admits finitely many profiles:

$$
\forall s\in S_G^{\mathrm{reach}}:
|D_s|<\infty.
$$

**Definition 24. Finite continuation capacity.** Under $F_P$, define

$$
\nu_G(s):=|\operatorname{im}\kappa_s|,
\qquad
a_G(s):=\max\{\nu_G(s)-1,0\},
$$

and

$$
\operatorname{Cap}(G):=
\sup_{s\in S_G^{\mathrm{reach}}}a_G(s)
\in\mathbb N_0\cup\{\infty\}.
$$

$\nu_G(s)$ is finite continuation-fibre diversity and $a_G(s)$ is its excess beyond constancy. The word *capacity* is local vocabulary: no information-theoretic composition law or unit has been proved.

**Corollary 24.1 ($F_P$).** Under $F_P$,

$$
\operatorname{Cap}(G)>0
\Longleftrightarrow
\operatorname{SPlay}(G).
$$

Thus numerical capacity represents the same positive support when available.

With that, the Necessary Condition can be stated without assuming that any supporting role is occupied in a particular instance:

**A game has a rule-constituted Possibility Space with a reachable State carrying two admitted profiles that differ only within a finite role block and lie in different continuation classes.**

When an operating instance reaches that State and sources occupy the supporting roles, Definition 15 lifts the structural relation to instance-indexed Agency. The witness profiles remain counterfactual; neither need be the profile actually committed.

### So what does all that settle?

The construction settles several recurring design arguments.

**Granularity.** Once $G$ and its inspection language have been declared, Proposition 5 fixes the canonical State quotient relative to them. Whatever no generated inspection detects is not distinguished by that quotient, however loudly the infrastructure displays it. A raw difference becomes State-relevant only when it changes a generated reading, admissibility result, or inspectable continuation. Redirecting an edge to a State-equivalent successor does not become load-bearing merely because the raw edge changed.

**What a Possibility Space is not.** Not freedom, depth, player expression, or a flattering review score. By Definition 3 it is everything the configured Rules allow the thing to become or perform, and nothing else. Rules do not arrive after a neutral infinity of game-states and cut it down. They constitute those States and transitions as possibilities of $G$.

**Naming the comparison scheme.** Definition 5 licenses a discipline: never claim that two things share a Rule without naming the structural granularity. An unnamed scheme lets the describer settle the answer without saying which distinctions were retained. The apparent paradox of same Rule, different mechanic dissolves when $\Pi$ is on the table.

**Unrepresented material is invisible.** Proposition 7 preserves the structural invariants of $G$ under realization. Wood, silicon, paper, and human speech do not matter merely as material; a material property deliberately represented in configurations, observations, authority, or transitions is structural because $G$ now contains it.

**Leaking.** Showing a role information the declared $G$ withholds may well be a presentation bug. The mathematical conclusion is narrower: the resulting arrangement is not a realization of the same configured form, because its observation component changed.

**Choosing and guessing.** $\approx_r$ supplies a structural observation partition needed to pose the policy question. It does not itself define knowledge, capability, or informed choice. Definition 12 remains deliberately local; a policy model would be the next layer.

And the one that started all of this. An input may be ceremonial, decorative, or useful for keeping someone awake, and whether it establishes Agency is now a question with an answer. A branch is not Agency merely because someone drew two boxes and connected them with arrows, however many buttons, branches, or dialogue wheels the infrastructure puts on the screen. Proposition 12 is the proof of it.

### Why does the condition only point one way?

A necessary condition and a sufficient condition make different commitments. The Representation bridge asserts only

$$
\operatorname{Game}(G)
\Longrightarrow
\operatorname{SPlay}(G).
$$

It is therefore refuted by a declared configured form that is accepted as a game while every reachable continuation-map image has cardinality at most one. The configured representation or extraction must remain fixed throughout the test. If a comparison scheme is applied, the object being tested is $\Pi(G)$ rather than $G$; changing between them halfway changes the subject of the claim.

A structurally playable form with disputed gameness does not address this implication. It would address the unasserted converse. The present argument leaves that converse open rather than adding further conditions to settle it. Under $F_P$, $\operatorname{Cap}(G)>0$ is merely a derived numerical restatement of $\operatorname{SPlay}(G)$.

Nothing here rules out the possibility that a sufficient condition exists. It establishes no such condition and needs none: all structural results above remain valid independently of how the converse is eventually treated.

### Where purpose goes

One candidate comes back more often than all the others put together, so it deserves better than a wave. Purpose. Goals, win conditions, the sense that the thing is *for* something. Surely that is what turns a structure into a game?

It helps to split it into three, because they behave nothing alike.

The first is purpose written into the Rules: a win condition, a terminal predicate, or an ordering over outcomes. Encoding an annotation in $X$ puts it inside the raw signature; it becomes State-relevant and operative only when observations, admissibility, or transitions make some generated inspection depend on it. In that case it can function as a State predicate, reading, or transition condition. Nothing in the chain from $G$ to Agency produces a goal automatically; a configured form may select one.

The second is purpose behind the artifact: someone built this to be played. Designer intent may explain why $G$ was constructed, but it is not represented in $G$ and therefore does not alter the present $\operatorname{Game}$ predicate. An intent-sensitive predicate must represent it in $G$ or evaluate a larger object such as $(G,\text{intent})$.

The third is purpose in the occupant: the source wants to win, cares how it ends, or is trying. That purpose may change the policy and therefore the actual Trajectory. It still does not change structural Agency unless represented in $G$ and made operative through observations, admissibility, or transitions. The calculus excludes it from the structural test, not from play.

The three therefore remain different. Rule-borne purpose can live inside $G$ without being a necessary primitive of Agency; designer and occupant purpose remain external to this structural criterion unless represented.

Without a valuation, $\operatorname{Ag}(G)$ is intentionally indifferent to preference. An option no occupant values may still establish Agency when it changes a continuation class. Adding a goal or preference ordering defines a valuation-sensitive relation only after saying where that valuation lives and how it enters the test. Neither is required by the structural condition developed here.

Many formal settings attach a winning condition or payoff to a transition arena because the questions they ask require one. Other settings call the arena itself a game structure. Both conventions are useful; neither supplies a theorem that purpose is required by the structural Agency relation here.

Purpose has several places to live here, but none is required by the condition.

- **As a comparison scheme.** If goal distinctions are already represented in the configured forms, declare a well-formed $\Pi_{\text{goal}}$ and compare what they steer toward. An external goal must first enrich the comparison domain; $\Pi$ cannot import data its inputs do not contain.
- **As a taxonomy after classification.** Among forms independently included in $\operatorname{Game}$, goal-directed and open are useful subtypes. Passing $\operatorname{SPlay}$ alone does not perform that classification.
- **On the layer this essay set aside in its first two lines.** Whether a thing ought to have a goal, and what a goal does to the people who show up, is a real question and not this one.

### Consequences

The relations assembled above support three structural readings.

#### Consequence 1: No structurally “wrong” play remains

**If an action lies within the Possibility Space constituted by the declared Rules, it cannot simultaneously be outside that rule-constituted play structure.**

It may be strategically awful. It may annoy the other players. It may break an agreement that was never part of the rules. It may expose a design mistake. None of those judgments reaches back and removes the action from the Possibility Space.

The reason is almost embarrassingly short. The Possibility Space is the reachable structure of the declared Rules. If those Rules admit the move, its result belongs there. Further judgments—strategy, etiquette, agreements, intent—may condemn it without changing that membership.

That shortness is the point. I am stuck with it either way, and it would hold even if I hated every case it covered.

“The designer did not expect that” does not alter the already-declared $G$. Intent may explain or motivate a later revision; until the Rules change, the admitted possibility remains admitted.

#### Consequence 2: A Trajectory is not its endpoint

**The endpoint of a bounded Trajectory is merely its last committed State. It need not be a dead end under the Rules, correspond to a game ending, or display the credits.**

A Trajectory may remain ongoing. An endpoint appears only after some interval of its operation has been bounded.

An externally chosen Session boundary belongs to infrastructure. A Run is different: it is a rule-recognized cycle or bounded unit of operation. One Session may contain multiple Runs, while one Run may continue across multiple Sessions.

Such externally chosen Session boundaries are conditions of running the thing, not Rules that constitute it. Where the Rules govern initialization, reset, persistence, or what carries over from one Run to the next, those are Rules like any other.

A terminal State is different from any such boundary. It is a State the Rules admit no move out of at all.

That two Trajectories can end at the same State without being the same Trajectory is true, and on its own it buys nothing. The interesting object is the whole pile of Trajectories that arrive at one and the same State.

Under $F_O$, everything in that pile has the same inspectable, profile-labelled future up to the bisimulation of Proposition 10.1. Without $F_O$, the configurations still share every finite inspection result, which is all the core Agency calculus assumes. The raw histories need not be identical. If later readings, admissibility, or behavior depend inspectably on the route taken, the route record separates the configurations into different States.

This captures one structural reading of the complaint that choices did not matter; it does not exhaust the experiential complaint. A witness pair may open different continuation classes and still let every immediate outcome reach one common State within a shared finite bound. That is a real fork with bounded possible recovery, not proof that an actual play returns, that the difference is erased, or that the player perceived it.

A shared *destination* is weaker still than a shared endpoint, since it may name one selected property of the endpoint rather than the whole State. The endpoint of one bounded interval may become the starting State of another, may be transformed through relations constituted by $G$, or may never be actualized again.

Agency concerns continuation classes, not ownership of an endpoint. For one witness pair, $\ell_G(s;p,q)$ records the least residual-inspection depth separating its continuations, while $j_G(s;p,q)$ records the least shared finite bound within which every immediate outcome has a route to one common State. Proposition 10 says the rooted continuations remain distinguishable when the permitted inspection depth grows; it says nothing about temporal persistence along an actual Trajectory. The two pair-indexed quantities answer separate questions, and neither is consequence magnitude.

Story endings and credits therefore have no privileged place in this condition. Plot, dialogue, authored events, and fixed outcomes participate structurally when encoded in configurations, observations, admissibility, or transitions. Any additional effect may remain in presentation and experience. Neither position makes them inferior; it identifies which relation is doing the work.

#### Consequence 3: Agency support is distributed

**The existence of Agency at one reachable State says nothing about its support elsewhere.**

The bridge only requires positive support somewhere. It does not turn every State, subsystem, or stretch of an actual Trajectory into an Agency-supporting one. The local distinction is therefore between continuation-map image cardinality at least two and at most one—not between a local game and a local non-game.

If the reachable State set is finite, the uniform structural density of $S_A(G)$ is

$$
\rho(G)
:=
\frac{|S_A(G)|}{|S_G^{\mathrm{reach}}|}.
$$

$\rho$ counts States, not State-role pairs. Upward closure would pad the latter population with every superset of a supporting block and confound the result with the number of roles. The minimum arity $m_G^*$ retains the coordinate information that a State count discards.

This is structural density, not visitation frequency. An actual instance, or a declared measure over play, may concentrate on a small part of the reachable structure. The signature contains no canonical probability distribution over Trajectories or windows.

The pair-indexed data have their own natural population:

$$
\mathcal W_G^{\mathrm{reach}}
:=
\{\,(s,\{p,q\})\mid
s\in S_G^{\mathrm{reach}},
\ \{p,q\}\in\mathcal W_G(s)\,\}.
$$

When this set is finite and non-empty, one may take uniform empirical distributions of

$$
(s,\{p,q\})
\longmapsto
\bigl(
|\operatorname{Diff}(p,q)|,
\ell_G(s;p,q),
j_G(s;p,q)
\bigr).
$$

For infinite populations, or for non-uniform relevance, a measure must be declared first. A distribution “across windows” additionally requires a measure on instances, visits, and bindings; finite States and roles do not provide one.

The three coordinates must remain attached to the same witness pair. A shallow $\ell$ with $j=\infty$ means that pair is quickly distinguishable and has no finitely bounded robust common recovery. A shallow $\ell$ with finite $j$ means quick distinguishability and a bounded possible recovery. Large $\ell$ changes only the observation rank, and finite $j$ never says that recovery is actual, forced, likely, or equivalent to erasure.

These summaries are structural invariants under the isomorphism of Definition 7. They are dimensions of Agency support, not degrees of gameness supplied by the Representation bridge. Any threshold connecting one of them back to gamehood would be another bridge—possibly necessary or sufficient depending on its direction—not something the present bridge has already proved or ruled out.

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

**An unrepresented observer response does not determine the configured structure or rewrite the Trajectory that occurred.**

Rules and presentation may communicate, encode assumptions, and produce powerful experiences. Those relations may matter enormously. Holding $G$, the acting bindings, and their contributions fixed, swapping only an unrepresented observer does not rebuild the Possibility Space or alter the Trajectory that already happened.

The same person may be both observer and Agent, but these are different relations. Interpretation may influence what that person later supplies; its structural effect then enters through the resulting profile contribution, not by rewriting the past.

An experience does not reach backward and change the committed past. It remains real, important, and often the entire reason anyone cares about the thing. For observer response to enter the present gamehood predicate, $G$ must represent it.

Even in the Agent relation, unrepresented knowledge is not part of $G$. The Rules fix what a role is shown; a concrete occupant may infer more and choose accordingly. A game may also represent and react to a player model, in which case that representation belongs in configurations and transitions like anything else.

The first is the difference between choosing and guessing. Where the Rules conceal, a role block may structurally expose continuation-changing alternatives while a particular occupant lacks a policy that targets the hidden situation. Definition 15 establishes the available structural difference, not subjective knowledge, concrete capability, or actual success. Choosing and guessing require the further epistemic-policy layer that $\approx_r$ only prepares.

The second is saturation, which needs an epistemic object rather than an intuition about familiarity.

**Definition 25. Saturation.** Fix a comparison scheme $\Pi$. A factive hypothesis assignment $K$ gives each source $\alpha$ and form $G$ a non-empty class

$$
\mathcal H_{\alpha}^{\Pi,K}(G)
$$

of well-formed Possibility Spaces over the vocabulary retained by $\Pi$, with

$$
\mathcal P_{\Pi(G)}
\in
\mathcal H_{\alpha}^{\Pi,K}(G).
$$

Then

$$
\operatorname{Sat}_{\Pi,K}(\alpha,G)
\Longleftrightarrow
\{\,[P]_{\cong}\mid
P\in\mathcal H_{\alpha}^{\Pi,K}(G)\,\}
=
\{\,[\mathcal P_{\Pi(G)}]_{\cong}\,\},
$$

where $\cong$ is the restriction of the configured-form isomorphism from Definition 5 to the reachable State-labelled substructures and therefore preserves every part of the structural vocabulary retained by $\Pi$.

At the declared granularity, no structurally different Possibility Space remains compatible with $K$. Without an update rule, Saturation fixes an epistemic endpoint but says nothing about how that endpoint is reached.

Saturation is not solving. Solving is relative to an objective, information conditions, and a solution concept. Nor is saturation seeing through concealment: knowing the whole map does not identify which hidden State is actual now.

Saturation removes no structural Agency because $K$ occurs nowhere in $\operatorname{Ag}(G)$. It exhausts structural model uncertainty at the declared granularity, not experience or every form of discovery. Two sources may therefore differ in saturation while $G$ remains unchanged.

A Rule mutation reachable and admitted during operation already lies in $\mathcal P_G$ and was included in what saturation covered. Since Saturation is indexed by $(G,\Pi,K)$, its truth need not transfer to a new form $G'$, comparison scheme $\Pi'$, or revised hypothesis assignment $K'$. That is a new indexed claim, not the old one literally lapsing because an admitted mutable transition occurred.

An unrepresented observer is absent from the structural calculus because $G$ has no such coordinate. An observer-dependent feature enters the configured form when represented in configurations, observations, authority, or transitions. Otherwise gamehood must be evaluated on a larger object such as $(G,\text{observer},\text{context})$.

At the level of experience, I treat meaning as arising through the relation between Rules, presentation, context, and the observer. A player may find a Trajectory heroic, offensive, boring, sacred, cruel, hilarious, or meaningless. Another may experience the same sequence differently. Neither response rewrites the past, and for fixed $G$ neither changes $\operatorname{Game}(G)$. A response-sensitive account must instead represent the response in $G$ or evaluate $(G,\text{observer},\text{context})$.

A designer may construct the conditions of an experience through Rules, presentation, information, rewards, punishments, and consequences. The designer cannot complete that experience on the player’s behalf. There is no checkbox for mandatory interpretation, however convenient it would be.

And no, plot, messaging, and story do not clash with games. They participate structurally when represented through configurations, observations, admissibility, or transitions. Presentation may itself be Rule-disclosed; the question is what $G$ represents and reads, not whether the material looks narrative.

Adapting a film or novel into a game is therefore not merely a matter of distributing the play button across a shooting gallery, an axe-throwing segment, three yellow-painted ledges, and a giant pipe-shaped hallway hiding a loading screen. Button prompts alone do not establish non-constant continuation maps. The artistic result may be excellent; the structural question remains separate.

> Just respect the intelligence and stature of the player, just as I respect you, and you respect me, alright?

## Conclusion

In reality, we do not need to settle every possible definition before taking one step closer to the thing itself. We only need to stop mixing every layer together.

I think, as Indie game dev, we should keep one thing simple: before trying to make a game fun, moving, groundbreaking, artistic, addictive, and everything else, make sure the part expected to operate as a game is not structurally inert under the necessary condition argued here. Passing it is not sufficient for quality or even, by itself, sufficient for gamehood.

Recreating your imagination is not a matter of drawing a map, throwing a story and a mountain of content into it, then adding button prompts. Any configured form classified as a game subject to the Representation bridge must have Rules, a Possibility Space, and non-empty structural Agency support; a Trajectory appears only when an operating instance actually runs it—you know, all the bullshit I have been rambling about above.

I am not trying to provide every answer. I am trying to make the question precise enough that the next answer has somewhere solid to stand. Every symbol up there is doing a job, and the only reason any of them exists is that without it a sentence I needed could not be said at all. If I ever catch one just standing around looking clever, it goes. If you want to understand the thing you are passionate about before deciding what else to do with it, I hope this gives you a perspective worth pondering.
