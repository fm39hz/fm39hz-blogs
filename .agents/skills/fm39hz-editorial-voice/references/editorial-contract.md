# Editorial Contract

## Governing Principle

The prose has a position. It is not neutral, conciliatory, or written to satisfy every possible
reader. The mathematics exists because the prose has a position: it supplies the objective warrant
that prevents a sharp claim from becoming an unsupported one.

Keep the two functions separate:

- Prose carries stance, rhythm, judgment, and the author's point of view.
- Mathematics, definitions, counterexamples, and proofs establish the exact scope of each claim.
- Do not neutralize the prose because mathematics is present.
- Do not make the mathematics sarcastic because the prose is sharp.
- A forceful sentence still needs an objectively correct proposition underneath it.

## Voice Source and Protected Passages

Infer the author's voice from the author's own prelude, opening paragraph, and conclusion. These are
voice anchors. The formal middle of an article is not the source of the author's literary voice.

- Do not rewrite the frontmatter description, prelude, opening sentence, opening section, title,
  headings, or conclusion unless the user explicitly asks for changes there.
- Preserve first-person framing, sentence rhythm, repetition, abrupt transitions, informal wording,
  and deliberate roughness when they belong to the author.
- Do not replace an author's sentence merely because a neutral or academic version sounds cleaner.
- When mathematical precision requires a correction near a protected passage, change the smallest
  factual unit possible and preserve the surrounding cadence.
- Treat restored user-authored wording as authoritative over assistant-written alternatives.

## Assertive, Not Defensive

The article may take sides and may offend readers. It must not sound as though it is asking permission
to make its argument.

- State the claim directly.
- Do not repeatedly explain that the article is "not doing A" or "only doing B".
- One scope statement in the prelude is enough. Do not repeat it after every definition or result.
- Do not write for an imagined reviewer, opposing camp, or audience that needs reassurance.
- Remove phrases that apologize for formalization, narrate proof architecture, defend why a symbol
  exists, or explain methodology instead of advancing the object-level argument.
- Keep negative statements when they are load-bearing mathematical boundaries, such as distinguishing
  structural Agency from actual causation or modal depth from elapsed time.
- In definitions and proofs, report-like scientific prose is acceptable. Outside them, preserve the
  author's direct and situated voice.

## Claim Discipline

Every proposition must be objectively supportable even when its phrasing is pointed.

- Check what is defined, assumed, derived, and interpreted before rewriting a claim.
- Do not turn a necessary condition into a taxonomy, sufficient condition, quality ranking, or
  empirical classification.
- A decomposition of a necessary condition may still produce degrees, profiles, or comparisons inside
  the domain already under analysis. Do not deny those consequences merely because no sufficient
  condition was defined.
- Keep quantities attached to their exact types and witnesses. Do not turn modal rank into time,
  possible recovery into actual return, structural availability into capability, or observation
  equivalence into knowledge.
- Do not let a rhetorical example claim more than the formula preceding it.
- If a sentence is stronger than the theorem, narrow the sentence. Do not weaken the theorem to save
  the sentence.
- When representation or comparison granularity matters, state it before drawing the comparison.

## Sarcasm and Examples

Sarcasm is never the main content, never part of a proof, and never the source of a conclusion.

- Use sarcasm rarely.
- Keep it indirect. Do not name the studio, franchise, genre, trope, or target being mocked.
- Do not insert a sarcastic example after every proof, proposition, or definition.
- Do not distribute jokes as annotations across the formal spine.
- A sarcastic line may remain as an aftertaste near the edge of a section, after the objective claim is
  complete.
- Preserve subtle sarcasm written by the author. Do not manufacture new targets or topical references.
- Do not add an example merely to vary the tone. Add one only when it is a load-bearing witness,
  counterexample, stress test, or an example the user explicitly wants.
- A mathematical witness should read as a witness. It does not need a joke attached to it.

## Formal and Conceptual Articles

When an article contains axioms, definitions, or a formal framework:

- Preserve the direction of analysis chosen by the article. Do not reframe a domain-first decomposition
  as a classification problem.
- Distinguish the formal calculus from the bridge that connects it to an ordinary-language concept.
- Keep optional hypotheses and representation choices attached to the results that require them.
- Do not add methodological commentary about first-order axiomatization, proof systems, novelty, or
  research positioning unless it is requested content.
- Do not make the prose sound like a paper abstract merely because the middle contains mathematics.
- Do not use notation as decoration. Every symbol must support a sentence the article needs.
- Do not use formalism as authority for a claim it does not entail.

## Punctuation and Character Set

Use plain ASCII punctuation in prose.

- Use straight apostrophes and quotes: `'` and `"`.
- Use three periods for an ellipsis: `...`.
- Use the ASCII hyphen-minus `-`. Do not use em dashes or en dashes.
- Do not use smart quotes, smart apostrophes, typographic ellipses, or decorative Unicode punctuation.
- Non-ASCII letters required by the language or a proper name are content, not punctuation. Do not
  transliterate them merely to silence a character scan.
- Keep sentence punctuation outside closing quotes, parentheses, and brackets when the punctuation
  belongs to the surrounding sentence: `"phrase",` and `"phrase".` rather than `"phrase,"` and
  `"phrase."`.
- Preserve punctuation inside a quoted string only when it is literally part of the quoted material.
- LaTeX commands and required mathematical notation are exempt, but prefer ASCII LaTeX source over
  literal Unicode mathematical symbols.

Before finishing a prose edit, scan the edited files:

```bash
LC_ALL=C rg -n '[^\x00-\x7F]' src/content/articles src/content/pages
rg -n '[,.!?;:][\")\]]' src/content/articles src/content/pages
```

Review every match instead of replacing blindly. Markdown emphasis markers are not quotation marks;
punctuation inside an emphasized question may be intentional.

## Editing Procedure

1. Read the full article before changing its voice.
2. Identify the voice anchors and leave them untouched unless explicitly in scope.
3. Map each prose claim to its definition, assumption, result, or authorial stance.
4. Fix mathematical or logical scope before polishing the sentence.
5. Edit locally. Do not rewrite an entire section when one clause is wrong.
6. Remove assistant-added disclaimers, sarcasm, examples, and neutralizing prose that do not belong to
   the author's argument.
7. Re-read transitions outside formal blocks to ensure the author's voice remains present.
8. Run the punctuation and character scans above.
9. Run `git diff --check`, `bun run check`, and `bun run build` when Markdown or math structure changed.
