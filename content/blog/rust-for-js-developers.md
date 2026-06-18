---
title: Learning Rust as a JavaScript Developer
description: The borrow checker will humble you. The compiler errors will educate you. And then, slowly, something clicks.
date: 2024-08-20
author: Natan Nobel
category: Systems
image: https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&q=80
---

I came to Rust as a JavaScript developer. I expected to hate it. For the first two weeks, I did.

And then something shifted.

## The Borrow Checker Is Your Friend (Eventually)

Every JavaScript developer's first Rust experience is the same: you try to do something completely normal in JS and the compiler screams at you about ownership.

```rust
fn main() {
    let s = String::from("hello");
    takes_ownership(s);
    println!("{}", s); // ERROR: value moved
}
```

Once you internalize why ownership gives you memory safety without runtime overhead — the borrow checker stops feeling like an enemy and starts feeling like a very strict but honest collaborator.

## The Payoff

When your Rust code compiles, it *works*. Not "probably works." The compiler has verified so many potential bugs out of existence that what remains is typically correct. Coming from JavaScript, this is revelatory.

Start with the Rust Book (free online). Build something small. It's worth it.
