---
author: FM39hz
pubDatetime: 2026-08-18
modDatetime: 2026-08-25
title: What does Gameness actually look like?
featured: false
draft: false
tags:
  - mathematics
  - game-dev

description: A formalization of Rules, State, Agency, and structural gameness support.
---

Rules, State, Possibility Space, Trajectory, Role, Agency. The words are already there. This piece assigns each of them a mathematical object and keeps the assignments fixed.

The construction proceeds as

$$
\mathfrak R
\longrightarrow
G
\longrightarrow
\mathsf{Insp}_G
\longrightarrow
S_G
\longrightarrow
\mathcal P_G
\longrightarrow
\kappa_s
\longrightarrow
\operatorname{Ag}(G)
\longrightarrow
\operatorname{SPlay}(G).
$$

| Existing name | Formal object |
| --- | --- |
| Rule presentation | $\mathfrak R$ |
| Configured form | $G$ |
| Candidate extraction | $\operatorname{str}:\mathfrak C\to\mathcal G$ |
| State space | $S_G=X/{\sim_G}$ |
| Possibility Space | $\mathcal P_G$ |
| Trajectory | $\operatorname{trace}_G(I)$ |
| Continuation map at a State | $\kappa_s$ |
| Structural Agency | $\operatorname{Ag}(G)$ |
| Gameness-support profile | $\operatorname{GProf}(G)$ |

## Table of contents

## Rule presentation

Take a carrier of raw configurations $X$, a set of interventions $A$, and a finite set of intervention roles $R$. For each role $r$, let

$$
\operatorname{auth}(r)\subseteq A
$$

be its authorized contribution alphabet. For $U\subseteq R$, write

$$
\operatorname{Prof}(U)
:=
\prod_{r\in U}\operatorname{auth}(r),
\qquad
\operatorname{Prof}:=\operatorname{Prof}(R).
$$

For each role $r$, let $\operatorname{obs}(r)$ be a family of total readings $o:X\to V_o$.

**Definition R1. Rule factorization.** Let $Z$ be a set of typed configuration ports, with non-empty value carrier $V_z$ for each $z\in Z$. For $J\subseteq Z$, define

$$
\operatorname{Val}(J)
:=
\prod_{z\in J}V_z.
$$

Each port has a total coordinate reading $\pi_z:X\to V_z$. Require the joint map

$$
\pi_Z:X\longrightarrow\operatorname{Val}(Z),
\qquad
\pi_Z(x):=(\pi_z(x))_{z\in Z},
$$

to be injective. Write $\pi_J$ for the corresponding tuple of coordinate readings.

Let $C$ be a finite set of Rule-cell labels.

**Rule formation discipline.** Content identities may occur only as values in typed carriers. They may not index or name elements of $Z$, $C$, or $R$, and they may not name a disclosure map.

Let $\mathcal V$ be the typed carrier vocabulary with its declared predicates and authority after content-identity labels have been forgotten. Take

$$
\Sigma:=\operatorname{Aut}(\mathcal V).
$$

Each $\sigma\in\Sigma$ acts by bijections on the port carriers, disclosure-result carriers, and $A$, fixes the port and role labels, and satisfies

$$
\sigma_A[\operatorname{auth}(r)]
=
\operatorname{auth}(r).
$$

A Rule presentation is

$$
\mathfrak R
:=
\left\langle
Z,(V_z,\pi_z)_{z\in Z},C,\Sigma,
(I_c,U_c,O_c,D_c,L_c,(\operatorname{read}_c(r))_{r\in R})_{c\in C}
\right\rangle,
$$

where each cell $c\in C$ has finite input scope $I_c\subseteq Z$, intervention-role scope $U_c\subseteq R$, output scope $O_c\subseteq Z$, an application domain

$$
D_c
\subseteq
\operatorname{Val}(I_c)
\times
\operatorname{Prof}(U_c),
$$

and one local relation

$$
L_c
\subseteq
D_c
\times
\operatorname{Val}(O_c).
$$

For each role $r$, $\operatorname{read}_c(r)$ is a finite family of typed total disclosure maps

$$
d:\operatorname{Val}(I_c)\to V_d.
$$

One cell is one scoped clause. A bound input $(i,u)\in D_c$ activates it. A candidate output $v$ is accepted when $(i,u,v)\in L_c$; if no such $v$ exists, the active cell refuses the candidate transition. Outside $D_c$, the cell is idle. Cells with $U_c=\varnothing$ are intervention-free; $I_c=\varnothing$ gives a generative cell; $O_c=\varnothing$ gives a constraint cell.

The logical directions are

$$
I_c\setminus O_c,
\qquad
I_c\cap O_c,
\qquad
O_c\setminus I_c,
$$

for read-only, updated, and produced ports respectively.

Lift each local relation to the global carriers by

$$
\widehat L_c
:=
\left\{
(x,p,x')\in X\times\operatorname{Prof}\times X
\;\middle|\;
\bigl(
\pi_{I_c}(x),
p|_{U_c},
\pi_{O_c}(x')
\bigr)
\in L_c
\right\}.
$$

For $x\in X$ and $p\in\operatorname{Prof}$, define

$$
C_{\mathfrak R}(x,p)
:=
\left\{
c\in C
\;\middle|\;
\bigl(
\pi_{I_c}(x),
p|_{U_c}
\bigr)
\in D_c
\right\},
$$

$$
O_{\mathfrak R}(x,p)
:=
\bigcup_{c\in C_{\mathfrak R}(x,p)}O_c.
$$

**Rule axiom R2. Equivariance.** Within the Rule formation discipline, for every $\sigma\in\Sigma$,

$$
(i,u,v)\in L_c
\Longleftrightarrow
\bigl(
\sigma_{I_c}(i),
\sigma_{U_c}(u),
\sigma_{O_c}(v)
\bigr)
\in L_c,
$$

and

$$
(i,u)\in D_c
\Longleftrightarrow
\bigl(
\sigma_{I_c}(i),
\sigma_{U_c}(u)
\bigr)
\in D_c.
$$

Every $d\in\operatorname{read}_c(r)$ is equivariant:

$$
\sigma_{V_d}\circ d
=
d\circ\sigma_{I_c}.
$$

**Rule axiom R3. Local composition.** The admitted global transition relation is exactly

$$
x\xrightarrow{p}x'
\Longleftrightarrow
C_{\mathfrak R}(x,p)\neq\varnothing
\quad\land\quad
(x,p,x')\in
\bigcap_{c\in C_{\mathfrak R}(x,p)}\widehat L_c
\quad\land\quad
\pi_{Z\setminus O_{\mathfrak R}(x,p)}(x)
=
\pi_{Z\setminus O_{\mathfrak R}(x,p)}(x').
$$

The intersection is the natural join of the lifted local relations. The final equality is the frame clause. Overlapping outputs agree because they become one configuration.

Two cells have a directed Rule intersection when

$$
c\leadsto d
\Longleftrightarrow
O_c\cap I_d\neq\varnothing.
$$

The shared port is time-polarized by Rule axiom R3: $c$ constrains its value in $x'$, and $d$ may consume it when $x'$ becomes the source of a later transition.

**Definition R4. Local Rule dependence.** Regard $(i,u)\in\operatorname{Val}(I_c)\times\operatorname{Prof}(U_c)$ as one valuation on $I_c\sqcup U_c$. For $W\subseteq O_c$, define

$$
\operatorname{Out}_c(i,u;W)
:=
\{\,v|_W\mid(i,u,v)\in L_c\,\}.
$$

When $a=(i,u)$, write $\operatorname{Out}_c(a;W)$.

A non-empty input block $B\subseteq I_c\sqcup U_c$ activates $c$ when two input valuations agreeing outside $B$ differ in membership in $D_c$. The block feeds $W$ through an applied $c$ when two such valuations both lie in $D_c$ and their $\operatorname{Out}_c(-;W)$ sets differ.

With $W=\varnothing$, the output set distinguishes active refusal from positive support. For non-empty $W$, it retains nondeterministic support and tuple correlation.

For $d\in\operatorname{read}_c(r)$ and non-empty $B\subseteq I_c$, the block feeds the disclosure map when there are $i,i'\in\operatorname{Val}(I_c)$ agreeing outside $B$ with $d(i)\neq d(i')$.

**Definition R4.1. Globally extendable composite dependence.** Let

$$
\mathbf c=(c_0,\ldots,c_n),
\qquad
c_0\leadsto\cdots\leadsto c_n.
$$

Its globally extendable application traces are

$$
\operatorname{ExtTrace}_{\mathfrak R}(\mathbf c)
:=
\left\{
(x_0,p_0,x_1,\ldots,p_n,x_{n+1})
\;\middle|\;
\forall 0\leq j\leq n:
x_j\xrightarrow{p_j}x_{j+1}
\land
c_j\in C_{\mathfrak R}(x_j,p_j)
\right\}.
$$

For

$$
\xi=(x_0,p_0,x_1,\ldots,p_n,x_{n+1})
\in
\operatorname{ExtTrace}_{\mathfrak R}(\mathbf c),
$$

write

$$
a_j^\xi
:=
\bigl(
\pi_{I_{c_j}}(x_j),
p_j|_{U_{c_j}}
\bigr),
\qquad
0\leq j\leq n.
$$

For a valuation on a finite typed coordinate set $K$ and a block $B\subseteq K$, write

$$
a\equiv_{-B}a'
$$

when $a$ and $a'$ agree on every input coordinate outside $B$.

For an initial valuation

$$
a\in
\operatorname{Val}(I_{c_0})
\times
\operatorname{Prof}(U_{c_0}),
$$

let

$$
\operatorname{ExtTrace}_{\mathfrak R}(\mathbf c;a)
:=
\left\{
\xi\in\operatorname{ExtTrace}_{\mathfrak R}(\mathbf c)
\;\middle|\;
a_0^\xi=a
\right\}.
$$

A non-empty block $B\subseteq I_{c_0}\sqcup U_{c_0}$ changes the global extendability of $\mathbf c$ when there are $a\equiv_{-B}a'$ such that exactly one of

$$
\operatorname{ExtTrace}_{\mathfrak R}(\mathbf c;a),
\qquad
\operatorname{ExtTrace}_{\mathfrak R}(\mathbf c;a')
$$

is empty. This is composite activation sensitivity. It is separate from transmission through an applied composite.

For $0\leq j<n$, put

$$
J_j:=O_{c_j}\cap I_{c_{j+1}}.
$$

Let $\varnothing\neq B\subseteq I_{c_0}\sqcup U_{c_0}$ and $\varnothing\neq W\subseteq O_{c_n}$. The block $B$ feeds $W$ through $\mathbf c$ when there are

$$
\xi=(x_0,p_0,\ldots,p_n,x_{n+1}),
\qquad
\xi'=(x'_0,p'_0,\ldots,p'_n,x'_{n+1})
$$

in $\operatorname{ExtTrace}_{\mathfrak R}(\mathbf c)$ such that

$$
a_0^\xi\equiv_{-B}a_0^{\xi'},
$$

and, for every $0\leq j<n$,

$$
\pi_{J_j}(x_{j+1})
\notin
\operatorname{Out}_{c_j}(a_j^{\xi'};J_j)
\quad\lor\quad
\pi_{J_j}(x'_{j+1})
\notin
\operatorname{Out}_{c_j}(a_j^\xi;J_j),
$$

$$
a_{j+1}^\xi
\equiv_{-J_j}
a_{j+1}^{\xi'}.
$$

At the final cell, require

$$
\pi_W(x_{n+1})
\notin
\operatorname{Out}_{c_n}(a_n^{\xi'};W)
\quad\lor\quad
\pi_W(x'_{n+1})
\notin
\operatorname{Out}_{c_n}(a_n^\xi;W).
$$

Both sides are complete admitted application traces. At each cell, the compared local inputs agree outside the incoming block, the local output support depends on that block, and the globally admitted outputs carry the distinction into the next shared block.

If $c_n\leadsto e$ and $d\in\operatorname{read}_e(r)$, put

$$
J_n:=O_{c_n}\cap I_e.
$$

The block $B$ feeds the disclosure $d$ through $\mathbf c$ when two traces $\xi,\xi'$ satisfy the initial condition and every intermediate condition above, and also

$$
\pi_{J_n}(x_{n+1})
\notin
\operatorname{Out}_{c_n}(a_n^{\xi'};J_n)
\quad\lor\quad
\pi_{J_n}(x'_{n+1})
\notin
\operatorname{Out}_{c_n}(a_n^\xi;J_n),
$$

$$
\pi_{I_e}(x_{n+1})
\equiv_{-J_n}
\pi_{I_e}(x'_{n+1}),
$$

and

$$
d\bigl(\pi_{I_e}(x_{n+1})\bigr)
\neq
d\bigl(\pi_{I_e}(x'_{n+1})\bigr).
$$

The fixed-other-input conditions rule out attribution through an unselected parallel input. Parallel routes may still coexist; this predicate establishes dependence through the selected composite without claiming unique provenance.

**Rule axiom R5. Scoped information.** The declared readings are exactly the Rule-disclosed maps:

$$
\operatorname{obs}(r)
=
\left\{
d\circ\pi_{I_c}
\;\middle|\;
c\in C,
\ d\in\operatorname{read}_c(r)
\right\}.
$$

$\operatorname{read}_c(r)$ is a standing disclosure interface. Its input may be rooted in $X_0$, retained by the frame clause, or supplied through directed intersections across successive applications.

For a transition claim $\varphi\subseteq X\times\operatorname{Prof}\times X$, define

$$
E_c(i,u,v)
:=
\left\{
(x,p,x')
\;\middle|\;
x\xrightarrow{p}x',
\ c\in C_{\mathfrak R}(x,p),
\ \bigl(
\pi_{I_c}(x),
p|_{U_c},
\pi_{O_c}(x')
\bigr)
=
(i,u,v)
\right\}.
$$

An output occurrence is extensionally correct for $\varphi$ when

$$
\varnothing
\neq
E_c(i,u,v)
\subseteq
\varphi.
$$

This inclusion establishes extensional correctness, not validation. Validation additionally requires a declared derivation from the Rule inputs supporting $\varphi$ to the asserting output. That derivation must be supplied by further Rule relations. A certificate remains a port value whose preservation and disclosure require further Rule relations.

Define the admitted profiles at a configuration by

$$
\operatorname{Adm}_G(x)
:=
\{\,p\in\operatorname{Prof}\mid
\exists x':x\xrightarrow{p}x'\,\}.
$$

Let $\varnothing\neq X_0\subseteq X$ be the admitted beginnings. The configured form is

$$
G
=
\langle
X,\;A,\;R,\;\operatorname{auth},\;\operatorname{obs},\;\longrightarrow,\;X_0
\rangle.
$$

Write $\mathfrak R\models G$ when Rule axioms R2, R3, and R5 hold over this configured vocabulary. From here, $G$ ranges over configured forms presented by at least one such $\mathfrak R$.

$\mathfrak R$ retains scope, intersection, dependence, and declared disclosure structure. $G$ retains the configured transition behavior from which State, continuation, and structural Agency will be derived.

The configured form is possibilistic: $\longrightarrow$ retains transition support. Every construction below that is derived from fixed $G$ alone is invariant under changes of outcome weights that preserve that support.

**Axiom 0. Structural scope.** Structural Agency support is determined by $G$ and no further data. An instance-indexed Agency claim may additionally use an operating instance only to identify a reached State, a transition window, and the roles bound there.

This scopes the calculus, not gamehood. Material, authorship, intent, reception, or another unrepresented fact does not enter $\operatorname{Ag}(G)$. The bridge to candidate games remains a separate assumption below.

**Definition I1. Structural isomorphism.** Let

$$
G_i
=
\langle
X_i,A_i,R_i,\operatorname{auth}_i,\operatorname{obs}_i,
\longrightarrow_i,X_{0,i}
\rangle.
$$

A configured-form isomorphism $f:G_1\cong G_2$ consists of bijections

$$
f_X:X_1\to X_2,
\qquad
f_A:A_1\to A_2,
\qquad
f_R:R_1\to R_2.
$$

They induce

$$
f_{\operatorname{Prof}}(p)(f_R(r))
:=
f_A(p(r)),
$$

and preserve beginnings and authority:

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

pairs each reading $o:X_1\to V_o$ with $o':=f_{\operatorname{obs},r}(o):X_2\to V_{o'}$. A carrier bijection $f_{V_o}:V_o\to V_{o'}$ satisfies

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

Now let $\mathfrak R_i\models G_i$. A Rule-presentation isomorphism

$$
(G_1,\mathfrak R_1)
\cong
(G_2,\mathfrak R_2)
$$

extends a configured-form isomorphism by bijections

$$
f_Z:Z_1\to Z_2,
\qquad
f_C:C_1\to C_2,
$$

carrier bijections $f_{V_z}:V_z\to V_{f_Z(z)}$, and a group isomorphism $f_\Sigma:\Sigma_1\to\Sigma_2$. For every $\sigma\in\Sigma_1$,

$$
f_{V_z}\circ\sigma_z
=
f_\Sigma(\sigma)_{f_Z(z)}\circ f_{V_z},
$$

with the analogous equation on $A$. The coordinate maps satisfy

$$
f_{V_z}\circ\pi_z
=
\pi_{f_Z(z)}\circ f_X.
$$

For every cell $c$, the isomorphism preserves its scopes:

$$
f_Z[I_c]=I_{f_C(c)},
\qquad
f_R[U_c]=U_{f_C(c)},
\qquad
f_Z[O_c]=O_{f_C(c)}.
$$

The induced product maps preserve and reflect the application domain:

$$
(i,u)\in D_c
\Longleftrightarrow
\bigl(
f_{I_c}(i),
f_{U_c}(u)
\bigr)
\in D_{f_C(c)},
$$

and the local relation:

$$
(i,u,v)\in L_c
\Longleftrightarrow
\bigl(
f_{I_c}(i),
f_{U_c}(u),
f_{O_c}(v)
\bigr)
\in L_{f_C(c)}.
$$

For every $c$ and $r$, there is a bijection

$$
f_{\operatorname{read},c,r}:
\operatorname{read}_c^1(r)
\to
\operatorname{read}_{f_C(c)}^2(f_R(r)).
$$

For $d'=f_{\operatorname{read},c,r}(d)$, a result-carrier bijection satisfies

$$
f_{V_d}\circ d
=
d'\circ f_{I_c},
$$

and, for every $\sigma\in\Sigma_1$,

$$
f_{V_d}\circ\sigma_{V_d}
=
f_\Sigma(\sigma)_{V_{d'}}\circ f_{V_d}.
$$

The induced pairing of $d\circ\pi_{I_c}$ agrees with $f_{\operatorname{obs},r}$. Thus configured-form isomorphism preserves the full global denotation, while Rule-presentation isomorphism additionally preserves its declared factorization.

## Inspections and State

Let $\mathsf{Insp}_G$ be the carrier of inspections.

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

Every $b\in\mathcal B_G$ supplies one atomic inspection $\operatorname{atom}(b)\in\mathsf{Insp}_G$, and there are no other atomic inspections.

**Axiom 2. Free formation.** For every $1\leq n<\infty$ and every $p\in\operatorname{Prof}$ there are constructors

$$
\operatorname{tuple}_n:
\mathsf{Insp}_G^n\to\mathsf{Insp}_G,
\qquad
\operatorname{prefix}_p:
\mathsf{Insp}_G\to\mathsf{Insp}_G.
$$

The map

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

obtained from $\operatorname{atom}$, all $\operatorname{tuple}_n$, and all $\operatorname{prefix}_p$ is injective. Write $\operatorname{tuple}_n(\iota_1,\ldots,\iota_n)$ as $(\iota_1,\ldots,\iota_n)$ and $\operatorname{prefix}_p(\iota)$ as $p\triangleright\iota$.

**Axiom 3. Branching observation.** Every inspection $\iota$ has a result carrier $V_\iota$ and a total result map $\operatorname{res}_\iota:X\to V_\iota$. These satisfy

$$
V_{\operatorname{atom}(b)}=V_b,
\qquad
\operatorname{res}_{\operatorname{atom}(b)}=\llbracket b\rrbracket,
$$

$$
V_{(\iota_1,\ldots,\iota_n)}
=
\prod_{j=1}^{n}V_{\iota_j},
$$

$$
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

Tupling retains correlation between residual probes. Prefixing returns the set of results over every admitted outcome of the fixed profile.

The following pair is separated by the branching inspection while the stated flattened profile-word result sets identify it. In a one-role form, take a total reading $o$ with one common value on every non-terminal configuration and values $0,1$ on two terminals. Let

$$
x\xrightarrow{a}u,
\qquad
y\xrightarrow{a}v_0,v_1.
$$

Every middle configuration admits $b$ and $c$. From $u$, both profiles may reach terminal readings $0$ or $1$. From $v_0$, both reach only $0$; from $v_1$, both reach only $1$. All terminals admit no profile. Every linear sequence $ab$ or $ac$ therefore obtains $\{0,1\}$ at both roots. The correlated inspection

$$
a\triangleright
(b\triangleright o,\;c\triangleright o)
$$

returns

$$
\{(\{0,1\},\{0,1\})\}
$$

at $x$, and

$$
\{(\{0\},\{0\}),(\{1\},\{1\})\}
$$

at $y$.

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

**Definition 1. Inspection depth.** Define

$$
\operatorname{depth}(\operatorname{atom}(b)):=0,
$$

$$
\operatorname{depth}(\iota_1,\ldots,\iota_n)
:=\max_j\operatorname{depth}(\iota_j),
$$

$$
\operatorname{depth}(p\triangleright\iota)
:=1+\operatorname{depth}(\iota).
$$

**Corollary 4.1.** Every inspection has finite depth.

Structural induction preserves finiteness under finite maxima and prefixing.

**Definition 2. State.** Define

$$
x\sim_G y
\Longleftrightarrow
\forall\iota\in\mathsf{Insp}_G:
\operatorname{res}_\iota(x)
=
\operatorname{res}_\iota(y).
$$

The State space is

$$
S_G:=X/{\sim_G}.
$$

**Proposition 1.** $\sim_G$ is an equivalence relation and the coarsest equivalence relation respecting every inspection.

It is the kernel of the family $(\operatorname{res}_\iota)_{\iota\in\mathsf{Insp}_G}$.

**Proposition 2.** Configurations of one State admit the same profiles.

The atomic inspection $\operatorname{atom}(\mathbf{adm})$ returns $\operatorname{Adm}_G$. Therefore, for $s\in S_G$, define

$$
\operatorname{Adm}_G(s):=\operatorname{Adm}_G(x),
\qquad x\in s.
$$

**Proposition 3.** Every residual inspection of a branching continuation is an inspection of its root after prefixing the intervening profile.

For every $\iota$, its result after $p$ is $\operatorname{res}_{p\triangleright\iota}$ at the root.

**Remark 4.** Inspection depends on the current configuration only through its State. Any inspectable historical distinction therefore belongs to the current State.

**Proposition 5.** Strictly coarsening $\sim_G$ cannot preserve every inspection. Strictly refining it adds no inspectable behavior.

The first operation merges a pair separated by some result map. The second separates a pair outside the kernel without adding a result map.

## Possibility Space and operating instances

**Definition 3. Possibility Space.** The Possibility Space $\mathcal P_G$ is the raw substructure reachable from $X_0$, including its configurations, admitted profiles, and full transition relation, with each configuration carrying its State as a label.

Write

$$
X_G^{\mathrm{reach}}\subseteq X
$$

for its raw configuration carrier and $S_G^{\mathrm{reach}}$ for the State labels occurring in it. Paths remain paths through raw configurations.

For $\mathfrak R\models G$, define the optional factorized Possibility Space by

$$
\widehat{\mathcal P}_{G,\mathfrak R}
:=
\left(
\mathcal P_G,
\mathfrak R^{\mathrm{reach}},
\operatorname{Pos}_{\mathfrak R}
\right),
$$

where $\mathfrak R^{\mathrm{reach}}$ restricts each $\pi_z$ to $X_G^{\mathrm{reach}}$, and

$$
\operatorname{Pos}_{\mathfrak R}(x,p,x')
:=
\left\{
\left(
c,
\pi_{I_c}(x),
p|_{U_c},
\pi_{O_c}(x')
\right)
\;\middle|\;
c\in C_{\mathfrak R}(x,p)
\right\}.
$$

$\mathcal P_G$ records configured continuations. $\widehat{\mathcal P}_{G,\mathfrak R}$ additionally records the accepting local clauses on each admitted edge.

**Definition I2. Infrastructure.** An infrastructure is the material, computational, or procedural arrangement through which $G$, and possibly its Rule presentation, is represented or operated.

**Definition I3. Realization.** An infrastructure behaviorally realizes $G$ when its represented layer is configured-form isomorphic to $G$ under Definition I1. It Rule-realizes $(G,\mathfrak R)$ when that isomorphism extends to the Rule-presentation isomorphism of Definition I1.

**Proposition I4. Realization-invariance.** Every construction defined in this article from $G$ alone is preserved under behavioral realization; numerical values agree. Rule realization additionally preserves application domains, cell and port incidence, local dependence, disclosure maps, and the Rule-mediated incidence defined below.

This follows from the relevant structural isomorphism. Concrete bindings and committed Trajectories require the corresponding instance data.

Let $\operatorname{Path}(G)$ be the set of finite or countably infinite sequences, including zero-edge paths,

$$
x_0\xrightarrow{p_0}x_1
\xrightarrow{p_1}x_2\cdots
$$

with $x_0\in X_0$ and an admitted transition at every transition index. Let $\mathsf{Inst}_G$ be the carrier of declared operating instances and $\mathsf{Src}$ the carrier of sources.

**Axiom 5. Operating-instance structure.** There is a total trace map

$$
\operatorname{trace}_G:
\mathsf{Inst}_G\to\operatorname{Path}(G).
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
(R\rightharpoonup\mathsf{Src}).
$$

**Definition 4. Operating instance and Trajectory.** An operating instance is an element $I\in\mathsf{Inst}_G$. Its committed Trajectory is $\operatorname{trace}_G(I)$.

**Definition 4.1. Session and gameplay Run.** Let $\mathsf{BInt}_G$ be the carrier of bounded trace intervals

$$
\mathsf{BInt}_G
:=
\{\,(I,i,j)\mid
I\in\mathsf{Inst}_G,
\ i\leq j
\text{ are configuration indices of }\operatorname{trace}_G(I)\,\}.
$$

A Session assignment is operating-context data

$$
\mathsf{Sess}_G\subseteq\mathsf{BInt}_G.
$$

Its members are the bounded intervals opened and closed by the surrounding operation.

For $(I,i,j)\in\mathsf{BInt}_G$, define its finite State-profile word by

$$
\operatorname{bword}_G(I;i,j)
:=
\bigl(
s_i^I,p_i^I,s_{i+1}^I,\ldots,
p_{j-1}^I,s_j^I
\bigr),
\qquad
s_k^I:=[x_k^I]_{\sim_G},
$$

with the zero-edge word $(s_i^I)$ when $i=j$. Let $\mathsf{BWord}_G$ be the carrier of all finite State-profile words realized by bounded finite admitted path segments in $\mathcal P_G$. Thus

$$
\operatorname{bword}_G(I;i,j)
\in
\mathsf{BWord}_G
$$

for every $(I,i,j)\in\mathsf{BInt}_G$, while $\mathsf{BWord}_G$ also contains configured path segments no operating instance has actualized.

A gameplay Run recognition structure is the optional configured extension $(G,\mathcal L_G^{\mathrm{run}})$ with a declared language

$$
\mathcal L_G^{\mathrm{run}}
\subseteq
\mathsf{BWord}_G.
$$

It is structural-isomorphism-invariant: every $f:G\cong H$ under Definition I1 induces the coordinatewise word bijection $f_{\mathrm{word}}$ and satisfies

$$
f_{\mathrm{word}}
\bigl[\mathcal L_G^{\mathrm{run}}\bigr]
=
\mathcal L_H^{\mathrm{run}}.
$$

The interval $(I,i,j)$ is a gameplay Run exactly when

$$
\operatorname{bword}_G(I;i,j)
\in
\mathcal L_G^{\mathrm{run}}.
$$

Bare $G$ supplies no canonical $\mathcal L_G^{\mathrm{run}}$; declaring one selects a boundary relation over retained State and profile distinctions. The Session assignment remains operating-context data, and no axiom aligns it with $\mathcal L_G^{\mathrm{run}}$. A Session may therefore contain several gameplay Runs, and one gameplay Run may span several Sessions.

**Definition 5. Transition window.** $\Delta t_n$ is the logical window joining $s_n$ to $s_{n+1}$ in the order supplied by Axiom 5:

$$
x_n^I\xrightarrow[\Delta t_n]{p_n^I}x_{n+1}^I,
\qquad
s_i=[x_i^I]_{\sim_G}.
$$

**Definition 6. Role and binding.** For $\alpha\in\mathsf{Src}$, define the role block occupied at $\Delta t_n$ by

$$
U_I(\alpha,\Delta t_n)
:=
\{\,r\in\operatorname{dom}(\operatorname{bind}_G(I,n))\mid
\operatorname{bind}_G(I,n)(r)=\alpha\,\}.
$$

Authority supplies contribution values. Binding attributes role coordinates to a source. Structural Agency will compare the continuations opened by those coordinates.

**Definition 7. Role-indistinguishability.** For a role $r$, let

$$
\mathcal B_{G,r}
:=
\{\,(r,o)\mid o\in\operatorname{obs}(r)\,\}.
$$

Let $\mathsf{Insp}_{G,r}$ be the least subfamily of $\mathsf{Insp}_G$ containing $\operatorname{atom}(b)$ for every $b\in\mathcal B_{G,r}$ and closed under every tuple and prefix constructor of Axiom 2. Define

$$
x\approx_r y
\Longleftrightarrow
\forall\iota\in\mathsf{Insp}_{G,r}:
\operatorname{res}_\iota(x)
=
\operatorname{res}_\iota(y).
$$

The admissibility atom is excluded from $\mathcal B_{G,r}$; profile prefixes still range over $\operatorname{Prof}$.

**Proposition 6.** $\approx_r$ is coarser than $\sim_G$. It is strictly coarser exactly when some pair of configurations is separated by a $G$-inspection but by no $r$-inspection.

**Proposition 7.** $\approx_r$ is fixed by $G$ and independent of the operating instance.

**Definition 8. Available contributions.** For a non-empty role set $U\subseteq R$ and reachable State $s$, define

$$
\Gamma_G(U,s)
:=
\{\,p|_U\mid p\in\operatorname{Adm}_G(s)\,\}.
$$

For $\gamma\in\Gamma_G(U,s)$, define its completions by

$$
\Delta_G(\gamma,s;U)
:=
\left\{
\delta\in
\prod_{r\in R\setminus U}\operatorname{auth}(r)
\;\middle|\;
\gamma\oplus\delta\in\operatorname{Adm}_G(s)
\right\}.
$$

Here $\gamma\oplus\delta$ is the unique profile agreeing with $\gamma$ on $U$ and with $\delta$ on $R\setminus U$.

## Continuation and Agency

**Definition 9. Raw branching continuation.** Define the raw continuation carrier

$$
\mathsf{RCont}_G
:=
\{\,(x,p)\in X\times\operatorname{Prof}
\mid p\in\operatorname{Adm}_G(x)\,\}.
$$

Write

$$
\mathcal T_G(x,p):=(x,p)\in\mathsf{RCont}_G.
$$

For every inspection $\iota$, its residual result on this continuation is

$$
\operatorname{Res}_\iota\bigl(\mathcal T_G(x,p)\bigr)
:=
\{\,\operatorname{res}_\iota(x')\mid x\xrightarrow{p}x'\,\}.
$$

Nested prefix inspections carry every finite admitted continuation after the immediate outcomes. The token selects no particular successor.

**Definition 10. Depth-$k$ indistinguishability.** For configurations, define

$$
x\sim_G^k y
\Longleftrightarrow
\operatorname{res}_\iota(x)=\operatorname{res}_\iota(y)
\quad
\text{for every }\iota
\text{ with }\operatorname{depth}(\iota)\leq k.
$$

For $\mathcal T_1,\mathcal T_2\in\mathsf{RCont}_G$, define

$$
\mathcal T_1\equiv_G^k\mathcal T_2
\Longleftrightarrow
\forall\iota\in\mathsf{Insp}_G:
\operatorname{depth}(\iota)\leq k
\Longrightarrow
\operatorname{Res}_\iota(\mathcal T_1)
=
\operatorname{Res}_\iota(\mathcal T_2),
$$

and define the equivalence relation on $\mathsf{RCont}_G$

$$
\equiv_G
:=
\bigcap_{k\in\mathbb N_0}\equiv_G^k.
$$

**Lemma 10.1. State-rooted continuation.** If $x,y$ belong to one State and $p$ is admitted there, then

$$
\mathcal T_G(x,p)\equiv_G^k\mathcal T_G(y,p)
$$

for every finite $k$.

Otherwise, prefixing a separating residual inspection by $p$ would separate $x$ from $y$. Therefore define

$$
\mathcal C_G(s,p)
:=
[\mathcal T_G(x,p)]_{\equiv_G},
\qquad x\in s.
$$

The induced finite-depth relation on continuation classes is

$$
[\mathcal T]_{\equiv_G}
\equiv_G^k
[\mathcal T']_{\equiv_G}
\Longleftrightarrow
\mathcal T\equiv_G^k\mathcal T'.
$$

**Proposition 8.**

$$
\sim_G^{k+1}\subseteq\sim_G^k,
\qquad
\equiv_G^{k+1}\subseteq\equiv_G^k,
$$

and

$$
\bigcap_k\sim_G^k=\sim_G,
\qquad
\bigcap_k\equiv_G^k=\equiv_G.
$$

The inclusions follow because depth $k+1$ adds inspections. The intersections follow from Corollary 4.1.

**Proposition 9.** If two continuation classes differ, a least separating residual depth exists.

The set of separating depths is non-empty and upward closed in $\mathbb N_0$.

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

For $p,q\in D_s$, write

$$
\operatorname{Diff}(p,q)
:=
\{\,r\in R\mid p(r)\neq q(r)\,\}.
$$

**Definition 11. Agency.** A non-empty role set $U\subseteq R$ bears structural Agency at $s$ when

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
\delta
\in
\Delta_G(\gamma_1,s;U)
\cap
\Delta_G(\gamma_2,s;U)
$$

such that

$$
\kappa_s(\gamma_1\oplus\delta)
\neq
\kappa_s(\gamma_2\oplus\delta).
$$

At a concrete window with $U_I(\alpha,\Delta t_n)\neq\varnothing$, Agency is available through $\alpha$'s binding exactly when

$$
\bigl(s_n,U_I(\alpha,\Delta t_n)\bigr)
\in
\operatorname{Ag}(G).
$$

The binding and State are actual. The witness pair is counterfactual.

**Definition 11.1. Rule-mediated Agency incidence.** For a witness

$$
w=(s,\{p,q\}),
\qquad
p,q\in D_s,
\quad
p\neq q,
\quad
\kappa_s(p)\neq\kappa_s(q),
$$

define its direct role incidences by

$$
\operatorname{DirectInc}_{\mathfrak R}(w)
:=
\left\{
c\in C
\;\middle|\;
U_c\cap\operatorname{Diff}(p,q)\neq\varnothing
\land
\exists x\in s\cap X_G^{\mathrm{reach}}:
c\in
C_{\mathfrak R}(x,p)
\cup
C_{\mathfrak R}(x,q)
\right\}.
$$

For $x\in s\cap X_G^{\mathrm{reach}}$, write

$$
a_p^c(x)
:=
\bigl(\pi_{I_c}(x),p|_{U_c}\bigr),
\qquad
a_q^c(x)
:=
\bigl(\pi_{I_c}(x),q|_{U_c}\bigr).
$$

The cell is activation-sensitive when exactly one of these valuations lies in $D_c$. When both lie in $D_c$, it is locally output-sensitive toward $W\subseteq O_c$ when

$$
\operatorname{Out}_c
\bigl(a_p^c(x);W\bigr)
\neq
\operatorname{Out}_c
\bigl(a_q^c(x);W\bigr).
$$

$\operatorname{DirectInc}_{\mathfrak R}$ locates the first active Rule scope receiving the witness difference. $\kappa_s$ decides the complete continuation class.

**Definition 12. Witnesses and latency.** Let

$$
\mathcal W_G(s)
:=
\left\{
\{p,q\}\subseteq D_s
\;\middle|\;
p\neq q
\land
\kappa_s(p)\neq\kappa_s(q)
\right\}.
$$

For each witness pair, define

$$
\ell_G(s;p,q)
:=
\min\{\,k\in\mathbb N_0\mid
\mathcal C_G(s,p)\not\equiv_G^k\mathcal C_G(s,q)\,\}.
$$

For a role block $U$, define

$$
\lambda_G(s,U)
:=
\min\{\,\ell_G(s;p,q)\mid
\{p,q\}\in\mathcal W_G(s),
\operatorname{Diff}(p,q)\subseteq U\,\},
$$

with value $\infty$ when the set is empty. For an occupied block,

$$
\lambda_{G,I}(\alpha,s_n;\Delta t_n)
:=
\lambda_G\bigl(s_n,U_I(\alpha,\Delta t_n)\bigr).
$$

**Proposition 10.** The following are equivalent:

$$
(s,U)\notin\operatorname{Ag}(G),
\qquad
\lambda_G(s,U)=\infty,
$$

and, within every shared completion, all contributions through $U$ lie in one continuation class.

**Proposition 11.** For $U_I(\alpha,\Delta t_n)\neq\varnothing$, Agency is present through the instance binding exactly when its latency is finite.

**Proposition 12.** Internal nondeterminism may select one outcome of an unchanged profile without producing an Agency witness for any binding.

**Proposition 13.** Role uncertainty does not veto local Agency.

$\Gamma_G(U,s)$ is structural availability at the reached State. Information and policy remain separate layers.

**Remark A1. Rule mutation.** Inside one fixed $\mathfrak R$, a mutable Rule parameter is data in $X$ read by cells that interpret it. An admitted intervention changes that data through Rule axiom R3. If the value changes a later inspection result, the affected configurations occupy different States.

Changing a cell, scope, local relation, or disclosure interface outside represented meta-Rules produces a new presentation $\mathfrak R'$. It may present the same $G$ or a different $G'$.

**Definition 13. Agent.** Where instance-indexed Agency is available, the source occupying the evaluated roles is an Agent at that binding and window.

**Proposition 14. Locality.** Agenthood is local to $(G,I,\alpha,s_n,\Delta t_n)$ through the reached State and occupied role set.

**Definition 14. Structural grades.** For $1\leq m\leq|R|$, define

$$
\operatorname{Ag}_m(G)
:=
\{\,(s,U)\in\operatorname{Ag}(G)\mid
1\leq|U|\leq m\,\},
$$

and

$$
\operatorname{Ag}_*(G)
:=
\bigcup_{m=1}^{|R|}\operatorname{Ag}_m(G)
=
\operatorname{Ag}(G).
$$

**Proposition 15. Global continuation constancy.**

$$
\operatorname{Ag}(G)=\varnothing
$$

exactly when, at every reachable State, every two admitted profiles open the same continuation class.

**Remark 15.1.** $\operatorname{Ag}_1$ and $\operatorname{Ag}_*$ can differ.

Take two roles, each authorized for $0$ and $1$, and admit only $(0,0)$ and $(1,1)$ at one State, with the profiles opening different continuation classes. No singleton role block has a shared completion, while the two-role block does.

**Proposition 15.2. Difference-set normal form.** For every reachable $s$ and non-empty $U\subseteq R$,

$$
(s,U)\in\operatorname{Ag}(G)
\Longleftrightarrow
\exists\{p,q\}\in\mathcal W_G(s):
\operatorname{Diff}(p,q)\subseteq U.
$$

**Proposition 16. Role-block monotonicity.** If $U\subseteq V$ and $(s,U)\in\operatorname{Ag}(G)$, then $(s,V)\in\operatorname{Ag}(G)$.

The same witness difference set lies inside both blocks.

**Corollary 16.1.** $\operatorname{Ag}(G)=\varnothing$ exactly when $(s,R)\notin\operatorname{Ag}(G)$ for every reachable State $s$.

**Definition 15. Minimum Agency arity.** Define

$$
m_G^*(s)
:=
\min\{\,|\operatorname{Diff}(p,q)|\mid
\{p,q\}\in\mathcal W_G(s)\,\},
$$

and $m_G^*(s):=\infty$ when $\mathcal W_G(s)$ is empty.

Define the reachable Agency-support locus by

$$
S_A(G)
:=
\{\,s\in S_G^{\mathrm{reach}}\mid
\mathcal W_G(s)\neq\varnothing\,\}.
$$

**Definition 16. Continuation fibres.** The fibres of $\kappa_s$ partition $D_s$ by continuation class. Call $\kappa_s$ non-constant when

$$
\exists p,q\in D_s:
\kappa_s(p)\neq\kappa_s(q),
$$

equivalently when $|\operatorname{im}\kappa_s|\geq2$.

**Proposition 17. Agency is non-constancy.** At a reachable State $s$, some non-empty role block bears Agency exactly when

$$
|\operatorname{im}\kappa_s|\geq2.
$$

For the reverse direction, choose profiles in different fibres and take $U=\operatorname{Diff}(p,q)$.

**Definition 17. Structural playability.** A configured form is structurally playable when some reachable continuation map has at least two values:

$$
\operatorname{SPlay}(G)
\Longleftrightarrow
\exists s\in S_G^{\mathrm{reach}}:
|\operatorname{im}\kappa_s|\geq2.
$$

Therefore

$$
\operatorname{SPlay}(G)
\Longleftrightarrow
\operatorname{Ag}(G)\neq\varnothing
\Longleftrightarrow
S_A(G)\neq\varnothing.
$$

## The Game bridge

Let $\mathcal G$ be the class of configured forms admitted by the structural signature above, and let $\mathfrak C$ be a domain of candidate objects carrying whatever further data an account of gamehood may require.

**Definition B1. Structural extraction.** A declared extraction is a total map

$$
\operatorname{str}:\mathfrak C\to\mathcal G.
$$

The extraction is fixed before Agency is evaluated. Variation exposed by the candidate's Rules as a contribution port becomes a role coordinate. Variation remaining after every represented contribution has been fixed remains inside $\longrightarrow$. Recasting one internal branch as a fictitious role changes $\operatorname{str}(z)$; it does not discover Agency in the same configured form.

No canonical extraction is asserted. Every bridge claim below is relative to the declared pair $(\mathfrak C,\operatorname{str})$. Let $\operatorname{Game}$ be a primitive predicate on $\mathfrak C$.

For $z\in\mathfrak C$, write

$$
G_z:=\operatorname{str}(z),
\qquad
D_s^{G_z}:=\operatorname{Adm}_{G_z}(s),
\qquad
\kappa_s^{G_z}:D_s^{G_z}\to Q_s^{G_z}
$$

for the constructions above evaluated on its extraction.

**Bridge axiom B2. Representation.** Every game has a structurally playable extraction:

$$
\operatorname{Game}(z)
\Longrightarrow
\operatorname{SPlay}(G_z).
$$

Equivalently,

$$
\left(
\forall s\in S_{G_z}^{\mathrm{reach}}:
|\operatorname{im}\kappa_s^{G_z}|\leq1
\right)
\Longrightarrow
\neg\operatorname{Game}(z).
$$

Under the bridge,

$$
\operatorname{Game}(z)
\Longrightarrow
\exists s\in S_{G_z}^{\mathrm{reach}}
\ \exists p,q\in D_s^{G_z}:
\operatorname{Diff}(p,q)\neq\varnothing
\land
\kappa_s^{G_z}(p)
\neq
\kappa_s^{G_z}(q).
$$

Since the extracted role carrier is finite, $\operatorname{Diff}(p,q)$ is a finite role block.

The converse is absent. The bridge is refuted by one accepted candidate $z$ for which

$$
\operatorname{Game}(z)
\land
\operatorname{Ag}\bigl(\operatorname{str}(z)\bigr)=\varnothing.
$$

Every structural result about Agency, latency, arity, and reconvergence survives that refutation. Only the bridge to the ordinary word *game* fails.

The bridge is support-level because $\operatorname{str}(z)$ retains transition support rather than outcome weights. An accepted game whose only contribution-sensitive differences alter probability over identical supports refutes B2 under that extraction. A distribution-sensitive bridge requires a richer configured form; it is not obtained by reading weights into $G$ after the fact.

<details>
<summary>Assumption bill and a concrete model</summary>

| Assumption | What it fixes | Remove it and |
| --- | --- | --- |
| Axiom 0 | structural Agency reads only $G$ | unrepresented material, intent, or reception may enter the Agency test |
| Rule formation discipline | content identities remain carrier values | Rule, port, role, or disclosure labels may hardcode proper nouns |
| R2 | Rule clauses respect the declared carrier symmetries | structurally interchangeable values may be treated differently |
| R3 | active cells jointly determine one framed transition | the Rule presentation no longer determines $\longrightarrow$ |
| R5 | every declared reading has a scoped Rule source | information may bypass Rule incidence |
| Axiom 1 | admissibility and disclosures are atomic inspections | State-defined availability need not follow |
| Axiom 2 | inspection constructors are free and unambiguous | inspection syntax may identify unrelated probes |
| Axiom 3 | observation retains every admitted outcome and its correlation | a linear observation language induces another continuation relation |
| Axiom 4 | every inspection is finitely generated | finite depth need not exhaust State sameness |
| Axiom 5 | operation supplies traces, windows, and bindings | concrete Trajectory and Agenthood lose their instance index |
| B2 | candidate gamehood requires non-empty structural support | the calculus no longer rules candidates out as games |

The assumptions are jointly satisfiable. Take

$$
R=\{r\},
\qquad
A=\{0,a,b\},
\qquad
\operatorname{auth}(r)=A,
$$

$$
X=\{x_0,x_1,x_2\},
\qquad
X_0=\{x_0\},
$$

and one configuration port $q$ with $V_q=\{0,1,2\}$ and $\pi_q(x_i)=i$. Choose the typed vocabulary so that its automorphism group is trivial, and take one cell $c$ with

$$
I_c=O_c=\{q\},
\qquad
U_c=\{r\},
$$

$$
D_c
=
\{(0,0),(0,a),(0,b),(1,a),(2,0)\},
$$

$$
L_c
=
\{
((0,0),0),
((0,a),1),
((0,b),2),
((1,a),1),
((2,0),2)
\}.
$$

Let

$$
\operatorname{read}_c(r)=\{\operatorname{id}_{V_q}\},
\qquad
\operatorname{obs}(r)=\{\pi_q\}.
$$

R2, R3, and R5 then hold, and the presentation admits exactly

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

Take the free inspection algebra of Axioms 1-4, let operating instances be admitted finite or countable paths with total bindings, set $\mathfrak C=\{z_*\}$, and declare

$$
\operatorname{Game}(z_*),
\qquad
\operatorname{str}(z_*)=G.
$$

The reading of $q$ separates $x_1$ from $x_2$, so $a$ and $b$ at $x_0$ open different continuation classes and $\operatorname{SPlay}(G)$ holds. This discharges joint satisfiability; it supplies no empirical evidence for B2.

</details>

## Witness geometry

**Definition W1. Raw reach and common recovery.** For $p\in D_s$, define

$$
\operatorname{Out}_G(s,p)
:=
\left\{
x'\in X
\;\middle|\;
\exists x\in s\cap X_G^{\mathrm{reach}}:
x\xrightarrow{p}x'
\right\}.
$$

For raw configurations, let

$$
u\to_G v
\Longleftrightarrow
\exists p\in\operatorname{Prof}:
u\xrightarrow{p}v,
$$

and define

$$
\operatorname{RawReach}_{\leq j}^G(x)
:=
\left\{
[y]_{\sim_G}
\;\middle|\;
\exists\ell\in\mathbb N_0,\ \ell\leq j:
x=y_0\to_G\cdots\to_G y_\ell=y
\right\}.
$$

For an admitted pair $p,q$, define

$$
\operatorname{Recover}_{\leq j}^G(s;p,q)
:=
\bigcap_{u\in
\operatorname{Out}_G(s,p)\cup
\operatorname{Out}_G(s,q)}
\operatorname{RawReach}_{\leq j}^G(u).
$$

**Proposition W2.** Once $\operatorname{Recover}_{\leq j}^G(s;p,q)$ is non-empty, it remains non-empty at every greater depth.

Each raw reach set grows monotonically with $j$.

**Definition W3. Possible reconvergence.** For $\{p,q\}\in\mathcal W_G(s)$, define

$$
j_G(s;p,q)
:=
\min\{\,j\in\mathbb N_0\mid
\operatorname{Recover}_{\leq j}^G(s;p,q)\neq\varnothing\,\},
$$

and set $j_G(s;p,q):=\infty$ when no finite bound exists.

A finite value gives one uniform bound within which every immediate outcome retains a route to one common State. It asserts neither actual return nor control of that route. For a witness pair, $j_G(s;p,q)\neq0$.

**Remark W4. Consequence persistence.** Reconvergence depth is not the lifetime of a distinction. A persistence quantity would have to rebase the comparison at later States and declare how counterfactual paths, and under nondeterminism their outcomes, are paired. The signature supplies no uniform canonical pairing across arbitrary nondeterministic forms, although a particular form may supply one. The present calculus therefore retains latency and possible reconvergence without assigning a general persistence number.

## Observable quotient and structural invariance

<details>
<summary>When State also carries transitions</summary>

**Extension axiom $F_O$. Finite observable outcome images.** For every configuration $x$ and profile $p$, define

$$
\operatorname{SPost}_G(x,p)
:=
\{\,[x']_{\sim_G}\mid x\xrightarrow{p}x'\,\},
$$

and suppose

$$
|\operatorname{SPost}_G(x,p)|<\infty.
$$

**Proposition O1 ($F_O$-transfer).** Under $F_O$, $\sim_G$ is a reading-preserving bisimulation for the profile-labelled transition relation.

Suppose $x\sim_G y$ and $x\xrightarrow{p}x'$. Proposition 2 gives $p\in\operatorname{Adm}_G(y)$. If no $p$-successor of $y$ shared the State of $x'$, choose one representative for each of the finitely many successor State classes of $y$, choose an inspection separating each class from $x'$, tuple those inspections, and prefix the tuple by $p$. The resulting inspection would separate $x$ from $y$. The converse direction is symmetric.

Therefore the quotient admits the transition relation

$$
s\xRightarrow{p}_G t
\Longleftrightarrow
\exists x\in s,\,y\in t:
x\xrightarrow{p}y.
$$

</details>

**Proposition I5. Structural isomorphism-invariance.** Let $f:G\cong G'$ be a configured-form isomorphism under Definition I1. Let

$$
\bar f_X:S_G\to S_{G'},
\qquad
[x]_{\sim_G}\mapsto[f_X(x)]_{\sim_{G'}},
$$

be the induced State bijection, and let $f_{\operatorname{Prof}}$ be the induced profile bijection. Then

$$
\{p,q\}\in\mathcal W_G(s)
\Longleftrightarrow
\{f_{\operatorname{Prof}}(p),f_{\operatorname{Prof}}(q)\}
\in
\mathcal W_{G'}(\bar f_X(s)),
$$

and

$$
m_G^*(s)
=
m_{G'}^*(\bar f_X(s)),
$$

$$
\ell_G(s;p,q)
=
\ell_{G'}
\bigl(
\bar f_X(s);
f_{\operatorname{Prof}}(p),
f_{\operatorname{Prof}}(q)
\bigr),
$$

$$
j_G(s;p,q)
=
j_{G'}
\bigl(
\bar f_X(s);
f_{\operatorname{Prof}}(p),
f_{\operatorname{Prof}}(q)
\bigr).
$$

Role bijections preserve difference-set cardinality. Configured-form isomorphisms preserve reachability, raw outcomes, inspections, and inspection depth.

## Comparison and realization

**Definition C1. Endogenous comparison scheme.** Let $\mathcal D$ be a class of configured forms. A comparison scheme is a pair $(\Pi,q)$ with an assignment

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

Observations factor through the quotient. A partial surjection

$$
\theta_G:
\bigsqcup_{r\in R_G}
\bigl(\{r\}\times\operatorname{obs}_G(r)\bigr)
\rightharpoonup
\bigsqcup_{\bar r\in R_H}
\bigl(\{\bar r\}\times\operatorname{obs}_H(\bar r)\bigr)
$$

pairs every target reading with at least one source reading. It is role-compatible on its domain:

$$
\theta_G(r,o)=(\bar r,\bar o)
\Longrightarrow
\bar r=q_R(r).
$$

Whenever

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

Finally, $q_{\Pi(G)}$ is an isomorphism. One application fixes the granularity; a second has nothing further to discard.

**Definition C2. Configured sameness relative to a comparison scheme.** Two forms have the same configured denotation relative to $\Pi$ when

$$
\Pi(G_1)\cong\Pi(G_2)
$$

under the configured-form isomorphism of Definition I1. That isomorphism preserves every inspection result and its depth by Axioms 1-4 and Definition 1.

**Definition C3. Rule-presentation sameness.** Let $\mathfrak R_i\models G_i$. The two presented forms have the same Rule presentation when

$$
(G_1,\mathfrak R_1)
\cong
(G_2,\mathfrak R_2)
$$

under the Rule-presentation isomorphism of Definition I1. Definition C1 acts on configured forms and supplies no quotient of Rule presentations.

**Remark C4.** Configured sameness relative to $\Pi$ is distinct from Rule-presentation isomorphism. The first compares retained configured behavior. The second also preserves its declared factorization.

## Structural gameness-support profile

**Definition G1. Structural gameness-support profile.** Define

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
S_A(G).
$$

Define the reachable witness population by

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

**Corollary G2.** Every game has positive structural gameness support:

$$
\operatorname{Game}(z)
\Longrightarrow
\operatorname{supp}
\bigl(\chi_{\operatorname{str}(z)}\bigr)
\neq\varnothing.
$$

If $S_G^{\mathrm{reach}}$ is finite, define

$$
\rho(G)
:=
\frac{|S_A(G)|}{|S_G^{\mathrm{reach}}|}.
$$

Then

$$
\operatorname{Game}(z)
\land
|S_{\operatorname{str}(z)}^{\mathrm{reach}}|<\infty
\Longrightarrow
0<\rho\bigl(\operatorname{str}(z)\bigr)\leq1.
$$

Cross-form uses of $\rho$ use Definition C1.

For one comparison scheme $(\Pi,q)$, take

$$
\mathfrak C_{\Pi,\mathrm{fin}}
:=
\{\,z\in\mathfrak C\mid
\operatorname{Game}(z)
\land
\operatorname{str}(z)\in\mathcal D
\land
\operatorname{SPlay}
\bigl(\Pi(\operatorname{str}(z))\bigr)
\land
|S_{\Pi(\operatorname{str}(z))}^{\mathrm{reach}}|<\infty\,\},
$$

and, for $z,w\in\mathfrak C_{\Pi,\mathrm{fin}}$, define

$$
z\preceq_{\Pi,\rho}w
\Longleftrightarrow
\rho\bigl(\Pi(\operatorname{str}(z))\bigr)
\leq
\rho\bigl(\Pi(\operatorname{str}(w))\bigr).
$$

Write $z\prec_{\Pi,\rho}w$ for strict inequality. This preorder compares candidate games by the density of structural gameness support retained after one declared normalization.

<details>
<summary>Finite continuation capacity</summary>

**Extension axiom $F_P$. Finite local profile domains.** Every reachable State admits finitely many profiles:

$$
\forall s\in S_G^{\mathrm{reach}}:
|D_s|<\infty.
$$

**Definition P1. Finite continuation capacity.** Under $F_P$, define

$$
\nu_G(s):=|\operatorname{im}\kappa_s|,
\qquad
a_G(s):=\max\{\nu_G(s)-1,0\},
$$

and

$$
\operatorname{Cap}(G)
:=
\sup_{s\in S_G^{\mathrm{reach}}}a_G(s)
\in
\mathbb N_0\cup\{\infty\}.
$$

**Corollary P2 ($F_P$).** Under $F_P$,

$$
\operatorname{Cap}(G)>0
\Longleftrightarrow
\operatorname{SPlay}(G).
$$

</details>

## Epistemic extension

<details>
<summary>Saturation</summary>

**Definition S1. Saturation.** Fix a comparison scheme $(\Pi,q)$ on $\mathcal D$. Define the carrier of retained Possibility Spaces by

$$
\mathsf{RPS}_\Pi
:=
\left\{
\mathcal P_H
\;\middle|\;
H\in\mathcal D,
\ q_H:H\to\Pi(H)
\text{ is a configured-form isomorphism under Definition I1}
\right\}.
$$

For $\mathcal P_H,\mathcal P_{H'}\in\mathsf{RPS}_\Pi$, write

$$
\mathcal P_H\cong_\Pi^{\mathrm{reach}}\mathcal P_{H'}
$$

when there are bijections satisfying the configured-form isomorphism clauses of Definition I1 after the raw configuration carriers are restricted to $X_H^{\mathrm{reach}}$ and $X_{H'}^{\mathrm{reach}}$, every reading is restricted to the corresponding reachable carrier, and the induced State labels are preserved. This is an isomorphism of reachable structures; it makes no claim about unreachable configurations.

Definition C1 gives

$$
\mathcal P_{\Pi(G)}\in\mathsf{RPS}_\Pi
$$

because $q_{\Pi(G)}$ is an isomorphism.

A factive hypothesis assignment $K$ gives each source $\alpha$ and retained Possibility Space $\mathcal P_{\Pi(G)}$ a non-empty subclass

$$
\mathcal H_{\alpha}^{\Pi,K}
\bigl(\mathcal P_{\Pi(G)}\bigr)
\subseteq
\mathsf{RPS}_\Pi
$$

with

$$
\mathcal P_{\Pi(G)}
\in
\mathcal H_{\alpha}^{\Pi,K}
\bigl(\mathcal P_{\Pi(G)}\bigr).
$$

$K$ is invariant under $\cong_\Pi^{\mathrm{reach}}$: an isomorphism between retained arguments transports one hypothesis class bijectively to the other.

Define

$$
\operatorname{Sat}_{\Pi,K}(\alpha,G)
\Longleftrightarrow
\forall P\in
\mathcal H_{\alpha}^{\Pi,K}
\bigl(\mathcal P_{\Pi(G)}\bigr):
P\cong_\Pi^{\mathrm{reach}}\mathcal P_{\Pi(G)}.
$$

Saturation collapses the configured hypothesis class to one structural isomorphism type at the selected granularity. Rule presentation remains a separate hypothesis type. $\operatorname{Ag}(G)$ remains a function of $G$.

</details>

The resulting objects answer different questions:

| Question | Structural object | It does not encode |
| --- | --- | --- |
| Where can an admitted profile difference alter continuation? | $S_A(G)$ and $\mathcal W_G(s)$ | quality, importance, or visitation frequency |
| How many role coordinates does the nearest witness change? | $m_G^*(s)$ | number of people or interaction strength |
| How deep before one witness becomes distinguishable? | $\ell_G(s;p,q)$ | elapsed time or consequence magnitude |
| How soon can every immediate outcome still reach one common State? | $j_G(s;p,q)$ | actual return, control, or persistence |
| Has one source exhausted structural discovery at the selected granularity? | $\operatorname{Sat}_{\Pi,K}(\alpha,G)$ | solving, current-State knowledge, or loss of Agency |
| How long does a distinction remain operative along paired later paths? | no canonical object in the present signature | Latency or Reconvergence by another name |

$$
\begin{aligned}
(z,\operatorname{str})
&\longmapsto
G_z=\operatorname{str}(z),
\\
(\mathfrak R,G;\ \mathfrak R\models G;\ \mathrm{Axioms}\ 1\text{-}4)
&\longmapsto
(\mathfrak R,G,\mathsf{Insp}_G,S_G,\mathcal P_G),
\\
(G,\mathsf{Insp}_G,S_G,\mathcal P_G)
&\longmapsto
\bigl(
G,\mathsf{Insp}_G,S_G,\mathcal P_G,
(\mathcal C_G(s,p))_{s,p},
(\kappa_s)_s,
\operatorname{Ag}(G),
\operatorname{SPlay}(G)
\bigr),
\\
\operatorname{Game}(z)
&\overset{\mathrm{B2}}{\Longrightarrow}
\operatorname{SPlay}(G_z)
\Longleftrightarrow
\operatorname{Ag}(G_z)\neq\varnothing,
\\
(G,S_G,\mathcal P_G,(\kappa_s)_s,(\mathcal W_G(s))_s,\ell_G,j_G)
&\longmapsto
\operatorname{GProf}(G).
\end{aligned}
$$

Every symbol above is supposed to pay rent by keeping one of those arrows typed. Anything else goes.
