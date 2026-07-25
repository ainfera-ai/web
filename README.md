<p align="center">
  <img src="public/brand/ainfera-mark-ice.svg" alt="Ainfera" width="96" />
</p>

# web

Public website for **Ainfera** — the Neptune model lab site for [ainfera.ai](https://ainfera.ai).

## Purpose

Communicate the Neptune program cleanly:

- Agent-native **Core**: `Neptune-1.0-27B` + same-net quant SKUs (not 9B pre-fund)
- Stage-0 factory discipline (evidence before claims)
- Eval certificates and VAC/$ when gates pass

This is **not** a routing marketplace product site and not a general SaaS pitch.

## Principles for site copy

1. **Claim-safe.** No benchmark wins without a linked certificate.  
2. **Size-honest.** Public Core roadmap names **27B** and **9B** only.  
3. **Evidence-first.** Prefer “held-out, preregistered, reproducible” over hype language.  
4. **Boundary-clear.** Closed specialist systems are private products; Core is the open proof layer when released.

## Layout

```text
web/
├── README.md
├── public/
│   └── brand/ainfera-mark-ice.svg   # favicon + nav/footer mark
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── page.tsx                 # /            home
│   │   ├── models/                  # /models      the Neptune family
│   │   ├── docs/                    # /docs        quickstart + tool calling
│   │   ├── blog/                    # /blog        notes from the line
│   │   │   └── inside-the-eval-gate/  # /blog/inside-the-eval-gate
│   │   ├── about/                   # /about
│   │   ├── contact/                 # /contact
│   │   └── coming-soon/             # /coming-soon standalone teaser
│   └── components/                  # Nav, Footer, Reveal, HeroOrbit, …
└── docs/            # Content briefs, IA notes
```

The pages are a 1:1 port of the `neptune/` design references in the
**Ainfera v2.0** Claude Design project (blueprint aesthetic: `#060b16`
canvas, dashed hairline rails, Poppins + IBM Plex Mono, square corners).

## Development

Next.js (App Router, TypeScript). All routes prerender statically.

```bash
npm install     # install
npm run dev     # dev server → http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

## Related repositories

- [`neptune`](https://github.com/ainfera-ai/neptune) — program control plane  
- [`neptune-evals`](https://github.com/ainfera-ai/neptune-evals) — certificates / VAC/$  
- [`.github`](https://github.com/ainfera-ai/.github) — organization profile  

## License

Site source: private until launch policy says otherwise. Published pages on ainfera.ai use Ainfera brand assets under company policy.
