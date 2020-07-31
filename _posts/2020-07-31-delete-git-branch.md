---
layout: post
title: "How to Delete a Git Branch"
date: 2020-07-31
categories: git tips how-to
tags: [git, tips, branch, delete, how-to]
---


Delete a branch is pretty simple, but I keep forgetting, so this post will serve me as a way to remember how to do this simple task.

```console
git branch -d <branch-name>
git branch -D <branch-name>
```

Ok, that's it. But, if you're curious the `d` means that you want to delete it. And `D` it's a shortcurt for `--delete --force`. As always, I higly recommend to look up on the [git documentation](https://git-scm.com/docs).

Btw, if you want to do the same on a remote repository you should use:

```console
git push <remote> -d <branch-name> 
```