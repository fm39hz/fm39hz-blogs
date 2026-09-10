---
name: fm39hz-editorial-voice
description: Edit or review FM39hz blog prose while preserving the author's voice, protected openings and conclusions, objective claim scope, sparse indirect sarcasm, and ASCII punctuation. Use for prose work in this blog; do not use for application code or generic copywriting.
---

# FM39hz Editorial Voice

Preserve an opinionated authorial voice without weakening the objective basis of any claim.

Before drafting, rewriting, proofreading, or reviewing prose:

1. Read the target article in full.
2. Read [references/editorial-contract.md](references/editorial-contract.md) in full.
3. Identify the article's voice anchors before changing any sentence.
4. Separate author-written text from assistant-added text. Author-written wording is authoritative.

Apply the smallest edit that fixes the actual content problem. Do not rewrite protected passages,
neutralize the prose, or indulge in decorative purple prose. Preserve the author's prose mechanics:
unadorned concrete diction, natural sentence cadence balancing cumulative clauses with concise declaratives,
minimal connective overhead, and punchlines delivered through grounded metaphors rather than rhetorical reversals.
Preserve situated stance as part of the argument: uncertainty need not soften judgment, self-questioning
need not become self-defense, and personal resistance need not be polished into detached certainty.
Make transitions express the actual relation between clauses. Prefer a meaningful conjunction or a
new sentence over a semicolon that merely places adjacent thoughts at the same formal level.

For formal or conceptual articles, audit the mathematical type and dependency of a statement before
polishing it. Mathematics warrants the prose; it does not supply the prose's voice.

Before handoff, run the punctuation and character scans in the editorial contract. Run
`git diff --check`, `bun run check`, and `bun run build` when Markdown or mathematical structure has
changed.
