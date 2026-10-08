# Styling contract

## Ownership

- `src/styles/global.scss` owns document-level defaults and CSS custom properties.
- `tokens/_breakpoints.scss` is the single Sass source for viewport breakpoints. Runtime code that
  needs a breakpoint reads the corresponding CSS custom property from `:root`.
- Shared colors, typography, spacing, motion, and stacking values live as CSS custom properties in
  `global.scss`; TypeScript should read those values instead of keeping a parallel style-token map.
- A component's `.module.scss` owns its root class and the elements in that component's own markup.
- A route stylesheet owns the route's structure and direct children. It must not style elements
  rendered inside a child component. Pass a class, variant, or CSS custom property through the child
  component when a parent needs to affect its appearance.
- Route `.module.scss` files are linted to use direct-child combinators only. Rendered prose and
  imported components own their internal styles; use an explicit component prop or a foundation
  stylesheet when a route needs an integration style.
- Do not rely on stylesheet/chunk order to resolve competing declarations. Give each property one
  owner, or use an explicit component variant.
- Treat `:global()` as an escape hatch for document state or generated third-party markup, not as
  the normal way to reach into a reusable Svelte component. Pass an explicit class/variant instead.

## Inheritance

- The global layer owns document defaults such as box sizing, body font family, foreground, and
  background. Components inherit those defaults unless they have a distinct semantic role.
- Components that establish their own typography should use the CSS typography custom properties
  and set line height explicitly when it affects their layout.
- Do not use broad element selectors under a layout class to style nested component internals. Use
  direct-child selectors for route structure and component classes for component internals.
- Root `font-size` scales all `rem`-based type and spacing. Keep responsive type-scale changes in
  the global breakpoint layer; don't add local root-size overrides.

## Tokens and checks

- CSS custom properties in `global.scss` are the source of truth for visual values. One-off
  component measurements may stay local; promote repeated semantic values to tokens.
- Runtime animation code reads duration and easing values from CSS custom properties through
  `tokens/animation.ts`.
- Stylelint checks SCSS through `bun run check`; run `bun run lint:styles --fix` to apply safe
  formatting fixes.
