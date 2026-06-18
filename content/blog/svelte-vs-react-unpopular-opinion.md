---
title: "Svelte vs React: An Unpopular Opinion"
description: "React is everywhere. Svelte is nowhere near as popular. And yet, every time I go back to React after Svelte, I feel like I'm putting on wet socks."
date: 2024-10-05
author: Natan Nobel
category: Frontend
image: https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80
---

This will upset some people. That's fine.

React is the dominant frontend framework. If you want to be employable as a frontend developer, you learn React. But here's my unpopular opinion: Svelte is a genuinely better framework for *building things*.

## The Reactivity Problem

React's mental model requires you to constantly think about what causes re-renders, what needs to be memoized, why your useEffect is firing. Svelte's model: "this variable changed, update the DOM node." That's it.

```js
// Svelte — just works
let count = 0
$: doubled = count * 2

// React
const [count, setCount] = useState(0)
const doubled = useMemo(() => count * 2, [count])
```

## Bundle Size

Svelte compiles to vanilla JavaScript. A Svelte app ships less JS than a React "Hello World." For performance-sensitive apps, this matters enormously.

## My Conclusion

Use React when you need to. Use Svelte when you can. The web is better when we have real alternatives.
