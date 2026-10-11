---
title: "Nik Brunner"
subtitle: "Personal spec sheet"
speakTitle: false
audio: "7b97861b3ee6"
---

Hi! I'm Nikolaus Brunner, Nik for short, a senior design engineer in Landshut,
Bavaria. I was born in 1984. German is my first language, and my English is
fluent.

This page is also my CV. It prints as one.

## About

Before code I worked in audio, first in post-production and then for five years
on event technology in Munich hotels. On the side I shot portraits and weddings.
In 2019 I switched to code, and I've worked as a developer since 2020.

I started out on plain frontend work. That's still the core of it, but now I
also work on the frontend architecture and the design systems, and a lot of the
design itself sits with me.

I'm not a designer by trade. I know my way around Figma, but I never had the
time or the need to go deep. That part of the job has grown, and right now I use
Claude Design for it, which works well so far. I still like working closely with
designers, and I care about UX as much as DX.

I really like building products, and I like using them too. I'm the one who
writes to support when I find a bug, and I read changelogs and release notes
because I enjoy it.

Away from the desk I go hiking, running and bouldering, and I cook, read and
take photos. I'm interested in design in every form, from architecture to
typography. And I'm a bit obsessed with keyboards.

## Work

Since April 2026 I've been a senior design engineer at ImFusion, on the Web and
Cloud team.

I'm building ImFusion's React component library on top of Base UI, with its
design tokens, icons and tooling. It's written in TypeScript and tested with
Vitest and Playwright. Storybook is its documentation, including the user guides
and the changelog.

The library is built to be set up and used through a coding agent. A hook sends
UI work to a router skill, which hands it to the skill that fits and loads only
the knowledge that skill needs. Evals run agents against consumer scenarios to
check they land in the right skill and follow the conventions.

Before that, from September 2020 to January 2026, I was a software engineer and
frontend lead at DealerCenter Digital. We made an Electron app that hundreds of
bike retailers use. I maintained its homegrown component library, built a color
system for it from scratch, and moved the main app to TanStack Query and Redux
Toolkit. For a sister project I built a storefront on TanStack Start. Two years
in, I also started mentoring juniors.

My first developer job was at diva-e, as a junior frontend developer in 2020, on
an e-commerce platform and an internal social app, with React, GraphQL and SCSS.
Before that I was an intern at Campudus, where I built an ordering app alone,
from the design to the backend.

## Projects

Black Atom is one set of color themes for every tool I use, from editor to
terminal. A small app switches all of them at once, light or dark.

Lazyjira is a keyboard-driven terminal UI for Jira, in the spirit of lazygit.
And Koyo is my split keyboard layout for QMK, with a small CLI.

The smaller ones are on my GitHub.

## How I work

I set my own priorities and manage my own work, and I know when to reach out for
input.

[sarcastic] Workflow matters a little to me. My dots repo has over 3,500 commits
since June 2025. Almost everything I do runs through the terminal and the
keyboard, and I keep tuning that setup the way other people tune a bike.

Claude Code came out in February 2025, in my birthday week. I had the week off
and barely left the desk. It was my second wow moment after ChatGPT: I saw where
coding was going, and I accepted it.

I build my own agent tooling, for my workflow and for the people using my
libraries. I stay the reviewer. Agents propose, and I read every diff.

I think juniors should still learn to code without LLMs first, the way I did.

My terminal is Ghostty. Inside it I work in herdr, with agents, shells and tools
side by side, and I move between its workspaces with Helm, my own navigator for
it. I edit in Neovim and work with Claude Code and Pi. I read diffs with tuicr
and handle git in LazyGit. All of that setup lives in my dots repository, agent
skills included.
