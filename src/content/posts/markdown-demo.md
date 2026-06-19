---
title: Markdown Features Demo
description: A comprehensive demo of all markdown features supported by this blog
pubDatetime: 2025-06-18
tags:
  - demo
  - markdown
  - features
---

# Markdown Features Demo

This post demonstrates the various markdown features supported.

## Text formatting

**Bold**, _italic_, ~~strikethrough~~, `inline code`

## Lists

1. First item
2. Second item
3. Third item

- Unordered item
- Another item
  - Nested item

## Blockquote

> This is a blockquote.
>
> It can span multiple lines.

## Code block with syntax highlighting

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("fm39hz"))
```

```bash
# Install dependencies
bun install
bun run dev
```

## Math with KaTeX

Inline math: $\frac{1}{\sqrt{2\pi}} e^{-\frac{x^2}{2}}$

Display math:

$$
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}
$$

## Table

| Feature             | Status | Notes        |
| ------------------- | ------ | ------------ |
| LaTeX               | [x]    | rehype-katex |
| Syntax highlighting | [x]    | shiki        |
| Dark mode           | [x]    | Tailwind     |
| Mermaid             | [/]    | Coming soon  |

## Links

[GitHub](https://github.com/fm39hz)
