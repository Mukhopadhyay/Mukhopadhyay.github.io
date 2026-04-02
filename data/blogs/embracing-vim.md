---
title: "Embracing Vim: The Unsung Hero of Code Editors"
date: "2024-04-09"
description: "Why I prefer Vim for speed and customization."
---

Vim is a modal editor that rewards muscle memory and speed. In this short post I outline why I reach for Vim for fast edits and exploring codebases.

## Why Vim?

- Extremely fast navigation using motions
- Lightweight and available everywhere
- Highly customizable with terse config

## Small examples

* Use `gd` to jump to a definition in many setups.
* Use `.` to repeat your last change — it is a surprisingly powerful command.

## Checklist

- [x] Install Vim or Neovim
- [x] Learn the basic motions (`h`, `j`, `k`, `l`)
- [ ] Configure a `init.lua` or `.vimrc`
- [ ] Add a plugin manager (lazy.nvim, vim-plug…)

## LaTeX — move count formula

The time saved by learning motions can be expressed as:

$$
T_{\text{saved}} = \sum_{i=1}^{n} \left( t_{\text{mouse},i} - t_{\text{motion},i} \right)
$$

For an inline example: the cursor travels $d$ characters in $O(1)$ keystrokes.

## Admonitions

:::tip[Pro tip]
Press `*` to search for the word under your cursor instantly.
:::

:::warning
Vim has a steep learning curve. Give yourself a few weeks before judging it.
:::

:::note
This post reflects personal preference — many editors are excellent.
:::

## Content tabs

::::tabs
:::tab[Neovim]
```lua
-- init.lua
vim.opt.number = true
vim.opt.relativenumber = true
```
:::
:::tab[Classic Vim]
```vim
" .vimrc
set number
set relativenumber
```
:::
::::

> Vim isn't for everyone, but for me it's a productive tool.
