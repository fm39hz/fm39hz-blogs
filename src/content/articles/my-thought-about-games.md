---
author: FM39hz
pubDatetime: 2025-07-07
modDatetime: 2026-08-22
title: My thoughts about Games
featured: false
draft: false
tags:
  - game-dev
  - rambling

description: Just some scattered thoughts, from my own biased perspective.
---

This piece isn't a guide on how to make a *better* game, nor a manifesto on what counts as a *successful*, *fun*, or *great* one. Those are different questions, belonging to different layers.

Its only purpose is to stimulate thought and help game developers understand the thing they are creating before they decide what else they want it to become.

## Table of contents

## Misconceptions and Associations

Sometimes, while developing games on my own, I catch myself returning to the same irritating question. There are plenty of things people call games, and yet something in my intuition keeps insisting that a few of them are actually...less game than they appear to be. So what actually makes a game become itself?

- **Graphics, story, world-building?** Painting, literature, comics, and film already know what to do with those.
- **Flow, pacing, music?** A concert, a film, or a stage performance can be constituted through all three.
- **Progression, competition, goals?** Too generic. Careers, arguments, education, sports, and exercise can organize themselves around them perfectly well.
- **Interaction?** A light switch is interactive. A DVD menu is interactive. Replacing a play/pause button of a movie with the controller pushing upward did not make that into a game.
- **Mechanics?** Closer, but not yet. We first have to distinguish mechanics from *Rules*. A Rule is a pure logical relation. A mechanic is one expression of that relation. One Rule may be expressed through many mechanics, and two things that look nothing alike may still instantiate the same Rule. In Xiangqi, a pawn advancing one square and a cannon moving in a straight line to leap over a piece and capture share no movement mechanic, yet both consume one turn. Notice that this last sentence only became true once I said *which comparison I was making*. Hold onto that. It turns out to be the whole problem, and it gets settled further down.

None of these things is worthless. They may enter a game, dominate it, or become the entire reason anyone cares about it. But they can already constitute forms and activities whose identities do not depend on gameness. A story does not wait for a controller to become a story. Music does not need a skill tree before it becomes music.

Strip those layers away and they may remain intact as themselves. They do not yet explain what gameness adds.

So, what makes a game... a game?

## If it's none of those, then what the heck is a game?

This is not an attempt to decide which products deserve that label. I am asking something smaller: **what must already be structurally present before anything else can be built upon the game?**

Perhaps the answer is not a "magic circle", a "storytelling machine", "interesting choices", "meaningful interaction", or any other phrase assembled from experience, value, or observation. Those may describe what someone does with a game, what someone receives from it, or what someone hopes it will become. They do not yet expose the relation underneath.

### The Necessary Condition

We've already separated Mechanics from Rules. Once that distinction has been made, Rules offer a reasonable place to begin. They do not have to be the only possible starting point, they are where this argument first gains enough structure to speak about the others.

A Rule distinguishes what may occur from what may not, what follows from what, and which difference can count as a difference inside the configured form.

States will be something the Rules produce. Getting there takes longer than that sentence makes it sound, and the first thing it takes is writing down what a Rule is made of.

**The signature.** Take the Rules to consist of the following data.

*What may occur* needs things that may occur, and something that can enter them. Call the first a carrier of configurations $X$, and the second a set of interventions $A$.

*Which difference can count as a difference* needs something able to tell configurations apart, and neither $X$ nor $A$ does that on its own. The declared readings settle it; they may expose all of $X$ or only a quotient of it. So take a finite set of intervention roles $R$. For each role $r$, let $\operatorname{obs}(r)$ be a family of total readings $o:X\to V_o$, with one result set $V_o$ for each reading.

Rules also distinguish what may occur *by whom*, since a form where anyone may do anything is a special case and not the general one. So $\operatorname{auth}(r)\subseteq A$ is what role $r$ is authorized to supply.

*What follows from what* needs an admitted transition relation. Transitions consume joint profiles: every role contributes one coordinate, so simultaneous commitments are represented directly rather than forced through a chosen sequentialization. Let

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

Let $\varnothing\neq X_0\subseteq X$ be the admitted beginnings. The configured form is

$$
G=\langle X,\;A,\;R,\;\operatorname{auth},\;\operatorname{obs},\;\longrightarrow,\;X_0\rangle
$$

This is a nondeterministic concurrent transition structure with roles and imperfect information: a variant of a concurrent game structure. Its admitted domain is induced by $\longrightarrow$ and need not factor into independent per-role choices; local authorization is not joint admissibility.

$\operatorname{Prof}$ is defined from $A$, $R$, and $\operatorname{auth}$, so it is notation rather than a component.

$X$ is a raw configuration carrier, not the State space. State will quotient away exactly the distinctions no inspection can detect.

Since $\operatorname{obs}$ sits inside $G$, disclosure is a Rule like any other. Concealment is not something done to the Rules. It is one of them.

The calculus is possibilistic. Where a transition branches, $\longrightarrow$ records its support and discards its weights. Forms weighted ninety-nine to one and evenly over the same support therefore induce the same $G$ here, and a weight-only difference cannot witness Agency. A stochastic extension must add distribution-sensitive relations; Axiom 7 inherits the support-level boundary until then.

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

Against the flattened trace reading that records only the result set obtainable along each profile word, this branching semantics is strictly finer. In a one-role form, identify each profile with its unique contribution and take a total reading $o\in\operatorname{obs}(r)$ that has one common value on every non-terminal configuration and values $0,1$ on two terminals. Let $x\xrightarrow a u$ and $y\xrightarrow a v_0,v_1$; both roots admit only $a$, every middle configuration admits exactly $b,c$, and all corresponding non-terminal readings agree. From $u$, both $b$ and $c$ may reach terminal readings $0$ or $1$. From $v_0$, both reach only $0$; from $v_1$, both reach only $1$; all terminals admit nothing. Every linear sequence $ab$ or $ac$ obtains the same set $\{0,1\}$ at both roots. But the correlated inspection

$$
a\triangleright
(b\triangleright o,\;c\triangleright o)
$$

returns $\{(\{0,1\},\{0,1\})\}$ at $x$ and $\{(\{0\},\{0\}),(\{1\},\{1\})\}$ at $y$.

Tupling preserves correlation between residual probes. Separate probes preserve only marginal result sets and lose which results came from the same outcome. The constructor therefore operates at every depth.

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

Now State can be derived.

**Definition 2. State.** $x\sim_G y$ when no inspection separates them, meaning

$$
\operatorname{res}_\iota(x)
=
\operatorname{res}_\iota(y)
$$

for every inspection $\iota$. Write $S_G:=X/\sim_G$ for the State space.

State is complete relative to this inspection language. Paths remain raw until $F_O$ earns a transition relation on the quotient.

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

Coarsening merges a pair some inspection separates, so it no longer represents this declared form. Refinement adds unreadable labels: cell count changes, while inspectable continuation behavior and the empty-versus-non-empty Agency verdict do not. Any later construction that reads those labels has changed the observation convention.

The reachable raw structure is next.

**Definition 3. Possibility Space.** The raw substructure reachable from $X_0$, including its configurations, admitted profiles, and full transition relation, with each configuration carrying its State as a label. Write $\mathcal P_G$. Its paths are paths through raw configurations, and the labels do not license swapping one representative of a State for another halfway along.

Write $S_G^{\mathrm{reach}}$ for the State labels occurring in $\mathcal P_G$.

Nothing above gives $S_G$ a transition relation of its own. Configurations of one State admit the same profiles by Proposition 2, and that alone does not say their successors match State for State. Extension axiom $F_O$ and Proposition 10.1 later supply that stronger result. Until then, anything that walks transitions walks them on configurations and reads States only where it stops.

Everything below is relative to the $G$ actually declared.

A cross-form claim of the same Rule is incomplete until the comparison names what it preserves. That is the job of a comparison scheme.

**Definition 4. Endogenous comparison scheme.** Let $\mathcal D$ be a class of configured forms. A comparison scheme is a pair $(\Pi,q)$ with an assignment

$$
\Pi:\mathcal D\to\mathcal D
$$

and, for every $G\in\mathcal D$, a surjective bounded structural quotient

$$
q_G:G\twoheadrightarrow\Pi(G).
$$

Write $H:=\Pi(G)$. The quotient certificate contains surjections

$$
q_X:X_G\twoheadrightarrow X_H,
\qquad
q_A:A_G\twoheadrightarrow A_H,
\qquad
q_R:R_G\twoheadrightarrow R_H,
$$

and

$$
q_{\operatorname{Prof}}:
\operatorname{Prof}_G
\twoheadrightarrow
\operatorname{Prof}_H,
$$

such that

$$
q_{\operatorname{Prof}}(p)(q_R(r))
=
q_A(p(r)),
$$

$$
q_A[\operatorname{auth}_G(r)]
=
\operatorname{auth}_H(q_R(r)),
\qquad
q_X[X_{0,G}]=X_{0,H}.
$$

Every source transition has its image,

$$
x\xrightarrow{p}_G y
\Longrightarrow
q_X(x)
\xrightarrow{q_{\operatorname{Prof}}(p)}_H
q_X(y),
$$

and every target transition lifts from every representative:

$$
q_X(x)\xrightarrow{\bar p}_H z
\Longrightarrow
\exists p,y:
q_{\operatorname{Prof}}(p)=\bar p
\land
q_X(y)=z
\land
x\xrightarrow{p}_G y.
$$

Observations factor through the same quotient. A partial surjection

$$
\theta_G:
\bigsqcup_{r\in R_G}
\bigl(\{r\}\times\operatorname{obs}_G(r)\bigr)
\rightharpoonup
\bigsqcup_{\bar r\in R_H}
\bigl(\{\bar r\}\times\operatorname{obs}_H(\bar r)\bigr)
$$

pairs every target reading with at least one source reading. Whenever

$$
\theta_G(r,o)=(q_R(r),\bar o),
$$

there is a surjection $q_{V_o}:V_o\twoheadrightarrow V_{\bar o}$ satisfying

$$
\bar o\circ q_X
=
q_{V_o}\circ o.
$$

The scheme respects structural renaming: every isomorphism $f:G\cong G'$ induces $\Pi(f):\Pi(G)\cong\Pi(G')$ with

$$
\Pi(f)\circ q_G
=
q_{G'}\circ f.
$$

Finally, $q_{\Pi(G)}$ is an isomorphism. One application fixes the granularity; a second has nothing left to discard. Every component of $\Pi(G)$ must therefore arise through $q_G$. Within these constraints, a comparison scheme may forget or identify structure. It may not manufacture a distinction its input never carried.

**Definition 5. Sameness relative to a comparison scheme.** Two forms express the same Rule relative to $\Pi$ when $\Pi(G_1)$ and $\Pi(G_2)$ are isomorphic as configured forms. Write the carriers of $\Pi(G_i)$ with subscript $i$. Concretely, bijections

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

The inspection results and depths are then preserved by Axioms 1-4 and Definition 1.

**Remark 6.** Sameness relative to $\Pi$ is not identity relative to $\Pi$.

Inside a declared $G$, two configurations are one State or they are not. A comparison scheme instead declares a granularity between forms. Two forms may therefore be the same under one scheme and different under another without contradiction; each answer is only about the distinctions its scheme retained.

Comparison is fixed. Realization answers the material question.

**Definition 6. Infrastructure.** The material, computational, or procedural arrangement through which $G$ can be represented or operated. An infrastructure carries a raw transition structure of its own.

**Definition 7. Realization.** An infrastructure realizes $G$ when its represented layer is structurally isomorphic to $G$ in the sense of Definition 5, before any comparison scheme is applied. By Axioms 1-4 and Definition 1, that isomorphism also preserves every inspection result and its depth.

Realization concerns the represented layer, not every physical microstate. Material changes that preserve $G$ preserve every structural quantity below.

**Proposition 7. Realization-invariance.** Every structural construction below is preserved under the correspondences induced by a realization; numerical values agree.

Immediate from structural isomorphism. Concrete bindings and committed Trajectories still belong to an operating instance and require the corresponding instance data.

The structure is configured. Now run one instance.

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

An alternative Trajectory holds the committed prefix fixed and changes the continuation that could have become actual next. The witness need not contain the committed profile.

The remaining question is attribution: which occupied role coordinates supply the difference?

**Definition 10. Role and binding.** At a window, an operating instance may bind a source $\alpha\in\mathsf{Src}$ to one or more intervention roles. A source may itself be an individual, a collective producing one joint output, or an autonomous process. A role specifies which contributions may become operative there and the authority with which they enter; it does not identify the concrete source that supplies them. Write

$$
U_I(\alpha,\Delta t_n)
:=
\{\,r\in\operatorname{dom}(\operatorname{bind}_G(I,n))\mid
\operatorname{bind}_G(I,n)(r)=\alpha\,\}
$$

This is the role block occupied by the evaluated source at that window. A committed contribution is attributable to $\alpha$ when it enters through one of those roles. Anything merely carrying or translating that output remains infrastructure in this relation.

*Available to $\alpha$* below means structurally available through the roles it occupies. A source-specific capability or policy is not present in the signature; adding one would refine the instance relation without changing structural support. No unrepresented property of the source enters this Agency test.

Binding attributes profile coordinates to a source. Agency compares counterfactual alternatives on those coordinates; it does not infer that the committed contribution caused the realized outcome.

Authority determines what may be supplied through a role. Information records what that role is shown. A State is the complete finitely inspectable condition under Axioms 1-4, not what any one role is shown, and in every form that conceals anything the two come apart.

**Definition 11. Role-indistinguishability.** For a role $r$, $\approx_r$ is indistinguishability by inspections built from $\operatorname{obs}(r)$ alone.

$\approx_r$ is the structural observation equivalence induced by $r$'s readings. It is neither subjective knowledge nor forceable experimentation: prefixing still ranges over every profile. Informed control requires an authority-restricted policy model.

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

$\Gamma_G(U,s)$ is local contribution availability. Uniformity across an $\approx_r$-class belongs to policies, not to one vector at one State.

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

This leaves guessing intact. The question of informed control requires a policy layer over the relevant $\approx_r$-class.

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

Use $\sim_G^k$ for configurations and $\equiv_G^k$ for branching continuations.

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

$F_O$ is the declared transfer condition: with it, bisimulation and quotient transitions transfer; without it, the calculus stays on raw configurations.

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

The binding and State are actual; the witness pair is counterfactual. Agency here names available structural difference, not the actual cause of the committed successor.

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

$\ell$ ranks witness pairs in the residual-inspection hierarchy; $\lambda$ assigns each role block the earliest rank among its witnesses. Neither makes depth six "twice as delayed" as depth three.

**Proposition 12.** The following are equivalent: $(s,U)\notin\operatorname{Ag}(G)$; $\lambda_G(s,U)=\infty$; and within every shared completion all contributions through $U$ lie in one continuation class.

Different completions may still differ; Definition 15 assigns none of that variation to $U$.

**Proposition 13.** For $U_I(\alpha,\Delta t_n)\neq\varnothing$, Agency is present through the instance binding exactly when its latency is finite.

**Proposition 14.** Internal nondeterminism may change which outcome becomes actual without that branch selection constituting an Agency witness for any binding.

Several outcomes of one unchanged profile belong to the same raw branching continuation. Alternative outputs supplied through a bound role are profile variation under Definition 15. Internal branching and contributed variation remain different because the declared representation keeps them different.

**Proposition 15.** Role uncertainty does not veto local Agency.

$\Gamma_G(U,s)$ imposes no condition on what an occupant can distinguish. A guess may still move the structure; uncertainty does not erase the structural alternative.

**Remark 16. Rule mutation.** If $G$ permits an intervention to alter a parameter or Rule, the mutable component is represented in $X$ and the permission appears in $\longrightarrow$. Where the alteration changes a later inspection result, including admissibility or inspectable branching, the affected configurations occupy different States. A raw difference no generated inspection can detect is structurally idle. If the alteration is not admitted by $G$, continuing under it means continuing under a different configured form $G'$.

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

**Proposition 18. Global continuation constancy.** $\operatorname{Ag}(G)=\varnothing$ exactly when, at every reachable State, every two admitted profiles open the same continuation class.

Equivalently, against every shared completion, substituting any admitted contribution vector for another changes no continuation class.

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

Finiteness of $R$ makes every witness block finite, the grading exhaustive, and $m_G^*$ natural-valued.

**Definition 19. Minimum Agency arity.** Define

$$
m_G^*(s)
:=
\min\{\,|\operatorname{Diff}(p,q)|\mid
\{p,q\}\in\mathcal W_G(s)\,\},
$$

and $m_G^*(s):=\infty$ when $\mathcal W_G(s)$ is empty. It is the nearest cross-fibre Hamming distance. It counts role coordinates, not people, cooperation, or "interaction strength".

Write

$$
S_A(G)
:=
\{\,s\in S_G^{\mathrm{reach}}\mid
\mathcal W_G(s)\neq\varnothing\,\}
$$

for the reachable locus of structural Agency support.

$\ell$ says when a fork becomes legible. It says nothing about whether the map has already built bounded routes back to a common State.

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

A finite $j$ means every immediate outcome retains a route to one common State under one bound. It does not mean the actual Trajectory takes that route or that any Agent can force it.

For a genuine witness, $j_G(s;p,q)\neq0$. If every immediate outcome already carried one State label, every residual inspection would return the same singleton result and the pair would not be a witness.

Latency and reconvergence answer separate questions on the same witness pair. $\ell_G(s;p,q)$ asks when the original continuations first become distinguishable; $j_G(s;p,q)$ asks whether their immediate outcomes share a finite uniform recovery bound to one common future State. A finite $j$ does not make the rooted continuations equal again, because their earlier fork remains part of what an inspection of those roots can recover.

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

$\operatorname{Game}$ reads the configured form $G$ alone. Material, authorship, intent, reception, and context enter only by enlarging the represented object.

**Axiom 7. Representation.** Every game is structurally playable:

$$
\operatorname{Game}(G)
\Longrightarrow
\operatorname{SPlay}(G).
$$

Equivalently, a form whose continuation-map image has cardinality at most one at every reachable State is not a game.

Axiom 7 is relative to one fixed configured representation and to transition support. Exposing variation as a role contribution or burying it inside internal nondeterminism produces different forms. An accepted game with constant continuation maps everywhere, including one whose only operative differences lie in omitted probability weights, refutes this bridge at the declared granularity.

**Definition 23.1. Structural gameness-support profile.** Define

$$
\chi_G:S_G^{\mathrm{reach}}\to\{0,1\},
\qquad
\chi_G(s)
:=
\begin{cases}
1,&\mathcal W_G(s)\neq\varnothing,\\
0,&\mathcal W_G(s)=\varnothing,
\end{cases}
$$

so

$$
\operatorname{supp}(\chi_G)
:=
\{\,s\in S_G^{\mathrm{reach}}\mid\chi_G(s)=1\,\}
=
S_A(G),
$$

and

$$
\mathcal W_G^{\mathrm{reach}}
:=
\{\,(s,\{p,q\})\mid
s\in S_G^{\mathrm{reach}},
\ \{p,q\}\in\mathcal W_G(s)\,\}.
$$

The witness-shape map is

$$
\omega_G:
\mathcal W_G^{\mathrm{reach}}
\to
\{1,\ldots,|R|\}
\times
\mathbb N_0
\times
(\mathbb N_0\cup\{\infty\}),
$$

$$
\omega_G(s;\{p,q\})
:=
\bigl(
|\operatorname{Diff}(p,q)|,
\ell_G(s;p,q),
j_G(s;p,q)
\bigr).
$$

Set

$$
\operatorname{GProf}(G)
:=
\bigl(
S_G^{\mathrm{reach}},
\chi_G,
m_G^*,
\omega_G
\bigr).
$$

For forms already classified by $\operatorname{Game}$, this profile records where the gameness-support required by Axiom 7 is live and the shape of each witness. Under $F_P$, $\nu_G$ adds continuation-fibre diversity as another coordinate.

**Corollary 23.2.** Every game has positive structural gameness support:

$$
\operatorname{Game}(G)
\Longrightarrow
\operatorname{supp}(\chi_G)\neq\varnothing.
$$

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

The Necessary Condition is now exact:

**A game has a rule-constituted Possibility Space with a reachable State carrying two admitted profiles that differ only within a finite role block and lie in different continuation classes.**

This is structural support. When an operating instance reaches that State and sources occupy the supporting roles, Definition 15 supplies the corresponding Agent relation; the witnesses remain counterfactual.

### So what does all that settle?

**Granularity.** Once $G$ and its inspections are fixed, Proposition 5 fixes the State quotient. A raw distinction that no generated inspection can reach does not survive that quotient.

**Possibility Space.** Not freedom, depth, player expression, or a flattering review score. It is the reach of the declared Rules. A larger map is more raw reach; it is not automatically more Agency.

**Same Rule? Name the comparison.** A cross-form claim of "same" or "different" is incomplete until $\Pi$ states which distinctions survive.

**Material.** A realization preserves the structural invariants of $G$. Wood, silicon, paper, and human speech do not matter merely as material; a material property made inspectably operative through $G$ is structural.

**Leaking.** Showing a role what $G$ withheld changes the observation component and therefore the configured form.

**Choosing and guessing.** $\approx_r$ says which configurations the role's reading language separates. That partition alone defines neither knowledge, skill, nor a policy.

And the one that started all of this. Whether an input establishes Agency is now a question with an answer. A branch diagram alone does not establish a continuation distinction; Proposition 12 states the exact test.

### From Game inward

Axiom 7 fixes the direction of analysis:

$$
\operatorname{Game}(G)
\Longrightarrow
\operatorname{SPlay}(G),
\qquad
G\longmapsto\operatorname{GProf}(G).
$$

For forms already classified by $\operatorname{Game}$, $\operatorname{GProf}(G)$ decomposes the structural support guaranteed by Axiom 7. The bridge dies when an accepted game has empty support under one fixed representation. Changing the representation or inserting $\Pi$ halfway changes the object being analysed, not the answer for the object already fixed.

### Where purpose goes

Purpose enters at three distinct locations.

A goal written into the Rules is already inside $G$. A win flag, terminal predicate, or outcome ordering becomes operative only when observations, admissibility, or transitions let an inspection reach it. Storage in raw $X$ alone is structurally idle.

Designer intent sits behind the artifact. It may explain why $G$ exists; it is not an argument of the present $\operatorname{Game}(G)$ predicate. Occupant purpose sits in front of the artifact. It may change a policy and therefore the actual Trajectory; it changes structural Agency only when the form represents and reads it.

A valuation defines a valuation-sensitive relation only after its owner and structural location are specified.

Goals can compare forms or separate goal-directed games from open ones. When the goal is external, enrich the configured form first; only then may an endogenous $\Pi_{\text{goal}}$ retain or discard its distinctions.

### Consequences

#### Consequence 1: No structurally "wrong" play remains

**If $p\in D_s$ at a reachable State $s$, taking $p$ is not outside the rule-constituted play structure.**

It may be strategically awful. It may annoy the other players. It may break an agreement that was never part of the rules. It may expose a design mistake. None of those judgments removes the admitted profile or its outcomes from the Possibility Space.

The Possibility Space is the reachable structure of the declared Rules. If those Rules admit the profile, its result belongs there. Further judgments, including strategy, etiquette, agreements, and intent, may condemn it without changing that membership.

"The designer did not expect that" does not alter the already-declared $G$. Intent may explain or motivate a later revision; until the Rules change, the admitted possibility remains admitted.

#### Consequence 2: A Trajectory is not its endpoint

**The endpoint of a bounded Trajectory is merely its last committed State. It need not be a dead end under the Rules, correspond to a game ending, or display the credits.**

A Trajectory may remain ongoing. An endpoint appears only after some interval of its operation has been bounded.

Call an interval opened and closed by infrastructure a **Session**. Call a bounded cycle recognized by the Rules a **Run**. One Session may contain several Runs; one Run may continue across several Sessions. Neither boundary implies terminality; the bounded interval's endpoint is terminal only when $D_s=\varnothing$.

Initialization, reset, persistence, and carry-over become Rules exactly when they become inspectably operative through $G$.

That two Trajectories can end at the same State without being the same Trajectory is true, and on its own it buys nothing. The interesting object is the whole pile of Trajectories that arrive at one and the same State.

Under $F_O$, everything in that pile has the same inspectable, profile-labelled future up to the bisimulation of Proposition 10.1. Without $F_O$, the configurations still share every finite inspection result, which is all the core Agency calculus assumes. The raw histories need not be identical. If later readings, admissibility, or behavior depend inspectably on the route taken, the route record separates the configurations into different States.

This captures the structural content of one complaint that choices did not matter. A witness pair may open different continuation classes and still let every immediate outcome reach one common State within a shared finite bound. That is a real fork with bounded possible recovery.

A shared *destination* is weaker still than a shared endpoint, since it may name one selected property of the endpoint rather than the whole State. The endpoint of one bounded interval may become the starting State of another, may be transformed through relations constituted by $G$, or may never be actualized again.

Agency concerns continuation classes, not ownership of an endpoint. For one witness pair, $\ell_G(s;p,q)$ records the least residual-inspection depth separating its continuations, while $j_G(s;p,q)$ records the least shared finite bound within which every immediate outcome has a route to one common State. Proposition 10 says the rooted continuations remain distinguishable when the permitted inspection depth grows; it says nothing about temporal persistence along an actual Trajectory. The two pair-indexed quantities answer separate questions, and neither is consequence magnitude.

Story endings and credits have no privileged place in this condition. Plot, dialogue, authored events, and fixed outcomes participate structurally when their representation changes observations, admissibility, or inspectable transition behavior. Merely storing them in $X$ is not enough.

#### Consequence 3: Gameness is distributed

**Within $\operatorname{Game}$, Axiom 7 forces structural gameness support to exist. It does not distribute that support for free.**

$S_A(G)$ may occupy only a proper subset of the reachable State space. Runtime, interface size, and prompt count do not enter $\rho$ or $m^*$.

If the reachable State set is finite, define the uniform structural gameness density

$$
\rho(G)
:=
\frac{|S_A(G)|}{|S_G^{\mathrm{reach}}|}.
$$

$\rho$ counts the share of reachable States where the necessary relation is live. Axiom 7 immediately gives

$$
\operatorname{Game}(G)
\land
|S_G^{\mathrm{reach}}|<\infty
\Longrightarrow
0<\rho(G)\leq1.
$$

For one endogenous comparison scheme $(\Pi,q)$, take the domain

$$
\mathcal G_{\Pi,\mathrm{fin}}
:=
\{\,G\in\mathcal D\mid
\operatorname{Game}(G)
\land
\operatorname{Game}(\Pi(G))
\land
|S_{\Pi(G)}^{\mathrm{reach}}|<\infty\,\},
$$

define

$$
G\preceq_{\Pi,\rho}H
\Longleftrightarrow
\rho(\Pi(G))\leq\rho(\Pi(H)).
$$

Write $G\prec_{\Pi,\rho}H$ when $\rho(\Pi(G))<\rho(\Pi(H))$. This is the uniform support-density preorder at the granularity fixed by $\Pi$. If $G\prec_{\Pi,\rho}H$, then $G$ is *less game* than $H$ in the exact sense that a smaller share of its normalized reachable State space carries the necessary structure of gameness. Both normalized forms are already in $\operatorname{Game}$ before the comparison begins.

$\rho$ counts States, not State-role pairs. Upward closure would pad the latter population with every superset of a supporting block and confound the result with the number of roles. The minimum arity $m_G^*$ retains the coordinate information that a State count discards.

This is structural density, not visitation frequency. An actual instance, or a declared measure over play, may concentrate on a small part of the reachable structure. The signature contains no canonical probability distribution over Trajectories or windows.

The witness population $\mathcal W_G^{\mathrm{reach}}$ and its shape map $\omega_G$ add witness-shape information that $\rho$ discards. When the population is finite and non-empty, its uniform counting distribution records role distance, distinguishing depth, and possible reconvergence without tearing them away from the witness that generated them.

For infinite populations, or for non-uniform relevance, a measure must be declared first. A distribution "across windows" additionally requires a measure on instances, visits, and bindings; finite States and roles do not provide one.

The three coordinates remain attached to the same witness pair. A shallow $\ell$ with $j=\infty$ means that pair is quickly distinguishable and has no finitely bounded robust common recovery. A shallow $\ell$ with finite $j$ means quick distinguishability and a bounded possible recovery. Large $\ell$ changes the observation rank; finite $j$ records bounded routes to one common State, not an actual, forced, or likely return.

$\rho$ answers how much of the reachable form is live. $\omega_G$, $m_G^*$, and, under $F_P$, $\nu_G$ answer what shape that life takes. Together they are the structural gameness-support profile induced by the Necessary Condition. A scalar that combines those coordinates must declare its weights instead of hiding taste inside arithmetic.

## Some Thought Experiments

For each case, ask which relation changed: the configured form, its realization, an operating instance, a binding, or merely the observer.

- Suppose humanity goes extinct, leaving behind only a complete rulebook for **chess**. Does chess still exist when nobody is there to play it? If aliens find only a wooden chess set and invent a completely different way to use it, are they playing chess? If they instead find the rulebook and make their own pieces from granite, has the game changed, or only what it is played with?
- Four fish swim in a tank while sensors turn their movements into controls for **Pokemon Sapphire**, and eventually the game is beaten. Does *Pokemon* stop being a game because the inputs came from a fish? Does the fish have to know it is playing, or intend to play at all?
- The ball enters the net. No player is offside, yet the assistant referee raises the flag, the referee disallows the goal, and VAR is not consulted. At that moment, is this still the same game of **football**? Do the rules give the referee the power only to judge what happened, or to make a ruling that counts even when the judgment is wrong? Does VAR change the rules of football, or only how decisions are checked and made final?
- In a **D&D** session, the DM gives one player two turns to compensate for falling behind the rest of the table. Is this still the same game? Was the DM allowed to make that ruling under the rules the table was already using, or did the table just add a house rule?
- Six children play by rules they made together. Child A scores with a move that is allowed at the time. Before child B can repeat it, the group changes the rule to forbid it. Does the new rule erase A's earlier score, or does it apply only from that moment onward? If B performs the move anyway, is it valid now? What changed between the two attempts? What game are they playing now?

## On the Player Side

The same person may occupy two relations: observer and Agent. Interpretation belongs to the first; an admitted contribution belongs to the second. Interpretation may alter a later policy, but it does not rewrite the committed past.

**Holding $G$, bindings, and contributions fixed, swapping an unrepresented observer changes neither the Possibility Space nor the Trajectory that occurred.**

What a role is shown belongs to $G$. What its occupant has inferred but $G$ does not represent remains outside it. That is why choosing, guessing, knowledge, and Agency cannot be synonyms. Where the Rules conceal, a role block may expose continuation-changing alternatives while its occupant lacks any policy that targets the hidden situation. Definition 15 establishes the structural difference; informed control begins one epistemic layer later.

Saturation needs an epistemic object rather than an intuition about familiarity.

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
\forall P\in\mathcal H_{\alpha}^{\Pi,K}(G):
P\cong\mathcal P_{\Pi(G)},
$$

where $\cong$ is the restriction of the configured-form isomorphism from Definition 5 to the reachable State-labelled substructures and therefore preserves every part of the structural vocabulary retained by $\Pi$.

At the declared granularity, Saturation collapses the hypothesis space to one structural isomorphism type. An update rule would explain how a source gets there; Definition 25 names the endpoint.

Solving adds an objective, information conditions, and a solution concept. Concealment adds uncertainty about which hidden State is actual now. Knowing the whole map settles neither question by itself.

$K$ occurs nowhere in $\operatorname{Ag}(G)$, so Saturation leaves structural Agency untouched. Two sources may exhaust structural model uncertainty differently while $G$ remains unchanged.

The $q_G$-image of a reachable admitted Rule mutation already lies in $\mathcal P_{\Pi(G)}$ and was covered at that granularity. Moving to $G'$, $\Pi'$, or $K'$ creates a different indexed claim.

An observer-dependent feature becomes structurally relevant only when observations, admissibility, or transition behavior make it inspectably operative. Otherwise the object under evaluation is larger than $G$, for example $(G,\text{observer},\text{context})$.

Here I take meaning to arise through the relation between Rules, presentation, context, and the observer. One player may find a Trajectory heroic, another offensive, boring, sacred, cruel, hilarious, or meaningless. Neither response rewrites the past; for fixed $G$, neither changes $\operatorname{Game}(G)$.

A designer may construct the conditions of an experience through Rules, presentation, information, rewards, punishments, and consequences. An unrepresented response is not a value the designer can commit inside $G$. There is no checkbox for mandatory interpretation, however convenient it would be.

And no, plot, messaging, and story do not clash with games. They participate structurally when the form makes them inspectably operative through observations, admissibility, or transitions. Presentation may itself be Rule-disclosed; the question is what $G$ reads, not whether the material looks narrative.

Adapting a film or novel into a game is not a matter of distributing the play button across a shooting gallery, an axe-throwing segment, three yellow-painted ledges, and a giant pipe-shaped hallway hiding a loading screen. Button prompts do not establish non-constant continuation maps. Where $\kappa_s$ stays constant, choreography remains choreography.

> Just respect the intelligence and stature of the player, just as I respect you, and you respect me, alright?

## Conclusion

In reality, we do not need to settle every possible definition before taking one step closer to the thing itself. We only need to stop mixing every layer together.

I think, as Indie game dev, we should keep one thing simple: before trying to make a game fun, moving, groundbreaking, artistic, addictive, and everything else, make sure the part expected to operate as a game is not structurally inert under the necessary condition argued here. Passing it is not sufficient for quality or even, by itself, sufficient for gamehood.

Recreating your imagination is not a matter of drawing a map, throwing a story and a mountain of content into it, then adding button prompts. Any configured form classified as a game subject to the Representation bridge must have Rules, a Possibility Space, and non-empty structural Agency support; a Trajectory appears only when an operating instance actually runs it, you know, all the bullshit I have been rambling about above.

I am not trying to provide every answer. I am trying to make the question precise enough that the next answer has somewhere solid to stand. Every symbol up there is doing a job, and the only reason any of them exists is that without it a sentence I needed could not be said at all. If I ever catch one just standing around looking clever, it goes. If you want to understand the thing you are passionate about before deciding what else to do with it, I hope this gives you a perspective worth pondering.
