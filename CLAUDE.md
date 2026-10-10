# ai-boutique.de

Marketing website for AI-Boutique, an AI automation consultancy for marketing teams and agencies, run by Sven in Prien am Chiemsee. The site is live. Its job is to turn visitors into leads, mainly through the Potential Check.

See @AGENTS.md for framework-specific notes.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui
- Supabase stores leads
- SMTP (Allinkl) sends contact and lead mails
- Hosted on Hetzner via Coolify, source on GitHub
- Secrets live in `.env.local`

Read `package.json` for exact versions and scripts before you assume anything about them.

## Rules for working in this repo

- Ask before you change fonts, colors, layout, framework or dependency versions, or add a dependency. Do not decide these on your own.
- Change only what the task asks for. Propose anything beyond that instead of doing it.
- Never read out, print, or commit the contents of `.env.local`.
- Do not push, deploy, or run database migrations without explicit confirmation. A push may trigger a production deploy.
- Run lint and build before you report a task as done, and say so if either fails.
- Sven writes to you in German. Answer in German. Keep code, comments, and commit messages in English.

## Brand

- Colors: purple `#C77DFF`, coral `#FF6666`, indigo `#6F77F4`, yellow `#FFF56E`
- Fonts: Anton (display), Montserrat (body)
- Logo: `AiB_Logo_Trans-Weiss.png`

## Positioning

Use these as fixed wording. Do not rephrase them.

- Claim: "Kreative Intelligenz."
- Core sentence: "Ich bringe KI auf den Punkt und automatisiere damit Geschäftsprozesse für Marketingteams und Agenturen."
- Category: "KI-Sparringspartner für Marketing & Kreation"
- Audience: marketing teams and agencies

The idea behind it: the automation has to work reliably. The creative part is choosing what gets automated and getting it to the point. Never describe automations themselves as creative.

Proof points you may use. Do not invent others, and do not invent numbers, client names, or quotes.

- More than 20 years of campaign development, five years of AI experience before the hype
- Trained Marketing-Fachkaufmann plus certified AI expertise
- CRM development for BMW and MINI, long-running campaign work for Media Markt
- AI implementations for a catering company and a bakery, each across customer interaction (chat and voice bot), workflow automation, and content automation

Put a proof point next to every positioning claim on the page.

## Copy rules (German site copy)

- Active voice, complete sentences
- No buzzwords, no superlatives, no AI clichés
- No "nicht nur X, sondern Y" and no "Das ist kein X, das ist Y"
- No question headlines
- No wordplay and no "X trifft auf Y" constructions
- CTAs name an action, not a promise
- Time savings always as ranges, never as a single precise number
- Copy must not sound machine-written. If a sentence explains instead of asserts, cut it.

Applies to every text you produce, on the site and beyond: mails, letters, pitches, LinkedIn posts, drafts, and chat suggestions. Before you write or edit any copy, read `kontext/tonalitaet/tonalitaet-ai-boutique.md`. It extends these rules and wins where it is stricter. Run its checklist before you hand text over.

When a task needs new copy, write a draft and mark it as a draft. Sven finalizes all wording.

## SEO

Target keywords: "Künstliche Intelligenz für kleine Unternehmen", "KI Beratung Mittelstand", "Agentic Marketing". Keep "KI-Agentur" findable in titles and meta data even where the page copy uses the category wording.

## Current priority (as of October 2026)

Goal: about 15 completed Potential Checks with contact details per month by 31 December 2026, up from close to zero.

A check counts only when the visitor reaches the three AI measures and leaves contact details. The first requirement is tracking for the check funnel: visitors, starts, completions, and contact submissions.

## Knowledge base

`kontext/` holds what we know about positioning, audiences, campaigns, LinkedIn, and CRM.

- `kontext/positionierung/`: positioning, messaging, and proof points beyond the fixed wording above
- `kontext/zielgruppen/`: audience segments, insights, and personas
- `kontext/kampagnen/`: campaign plans, results, and learnings
- `kontext/linkedin/`: LinkedIn strategy, posts, and performance
- `kontext/tonalitaet/`: tone of voice, style, word choice, and examples
- `kontext/crm/`: contacts and lead notes (not tracked in git)

Rules:

- Before you work on one of these topics, read the matching folder first.
- When we learn something durable (an audience insight, a campaign result, a decision), propose which file in `kontext/` it belongs in and save it after Sven confirms. One topic per file, entries dated.
- Never copy contact data from `kontext/crm/` into other files, commit messages, or site code.
- Nothing from `kontext/` goes into `public/` or into page copy unless Sven asks for it.
