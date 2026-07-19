# web

Public website for **Ainfera** — the Neptune model lab site for [ainfera.ai](https://ainfera.ai).

## Purpose

Communicate the Neptune program cleanly:

- Agent-native **Core** models: `Neptune-1.0-27B` and `Neptune-1.0-9B`
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
├── public/          # Static assets
├── src/             # Site source (framework TBD / in progress)
└── docs/            # Content briefs, IA notes
```

## Development

Scaffold only today. When the stack is chosen (static site or app framework), document:

```bash
# install
# dev server
# production build
```

in this README and keep deploy steps reproducible.

## Related repositories

- [`neptune`](https://github.com/ainfera-ai/neptune) — program control plane  
- [`neptune-evals`](https://github.com/ainfera-ai/neptune-evals) — certificates / VAC/$  
- [`.github`](https://github.com/ainfera-ai/.github) — organization profile  

## License

Site source: private until launch policy says otherwise. Published pages on ainfera.ai use Ainfera brand assets under company policy.
