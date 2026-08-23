import {
  AGENT_DIALOGUE,
  CLOSE,
  COMPARE,
  COVER,
  DECK_STATUS,
  DISPOSITIONS,
  ERA,
  EVIDENCE_CHECKS,
  FINANCING,
  FOUNDER,
  HEADINGS,
  LOOP,
  MECHANICS,
  PROMPTS,
  SLIDE_COUNT,
  SURFACES,
  SYSTEM_BASE,
  THESIS,
  TRAIL,
  WEDGE,
} from "../../deck-content.js";

export { SLIDE_COUNT };

function prompt(index) {
  return `<p class="prompt" aria-hidden="true"><span>&gt;</span> ${PROMPTS[index]}</p>`;
}

export function renderDeckMarkup() {
  const slides = `
  <section class="slide" id="slide-01" data-slide-index="0" aria-labelledby="slide-01-title">
    <img class="orbit" src="/brand/ainfera-mark-ice.svg" alt="" width="420" height="420" />
    <div class="frame">
      ${prompt(0)}
      <img class="mark" src="/brand/ainfera-mark-ice.svg" alt="Ainfera ice mark" width="96" height="96" />
      <p class="brandLock"><span>${COVER.company}</span><span>${COVER.product}</span></p>
      <h1 id="slide-01-title" class="display displayCover">${HEADINGS[0]}</h1>
      <ol class="ledeBeats">
        ${COVER.beats.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    </div>
  </section>

  <section class="slide" id="slide-02" data-slide-index="1" aria-labelledby="slide-02-title">
    <div class="frame">
      ${prompt(1)}
      <h2 id="slide-02-title" class="display displayWide">
        ${THESIS.lead} <em>${THESIS.kill}</em>.
      </h2>
    </div>
  </section>

  <section class="slide" id="slide-03" data-slide-index="2" aria-labelledby="slide-03-title">
    <div class="frame frameWide">
      ${prompt(2)}
      <h2 id="slide-03-title" class="display displayWide">${HEADINGS[2]}</h2>
      <ol class="process" aria-label="From request to decision">
        ${LOOP.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><b>${item}</b></li>`).join("")}
      </ol>
    </div>
  </section>

  <section class="slide" id="slide-04" data-slide-index="3" aria-labelledby="slide-04-title">
    <div class="frame">
      ${prompt(3)}
      <h2 id="slide-04-title" class="display displayWide">${HEADINGS[3]}</h2>
      <ol class="lane" aria-label="Workspace exchange">
        ${AGENT_DIALOGUE.map(
          (turn) => `
          <li>
            <p class="speaker">${turn.speaker}</p>
            <p class="said">${turn.lines[0]}</p>
          </li>
        `,
        ).join("")}
      </ol>
    </div>
  </section>

  <section class="slide" id="slide-05" data-slide-index="4" aria-labelledby="slide-05-title">
    <div class="frame">
      ${prompt(4)}
      <h2 id="slide-05-title" class="display displayWide">${HEADINGS[4]}</h2>
      <p class="lede">${WEDGE.support}</p>
      <p class="closeLine">${WEDGE.close}</p>
    </div>
  </section>

  <section class="slide" id="slide-06" data-slide-index="5" aria-labelledby="slide-06-title">
    <div class="frame">
      ${prompt(5)}
      <h2 id="slide-06-title" class="display displayWide">${HEADINGS[5]}</h2>
      <div class="cycleFlow" aria-label="Proof trail">
        <svg class="cycleStroke" viewBox="0 0 100 72" aria-hidden="true">
          <defs>
            <marker id="cycle-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <polygon points="0,0 5,2.5 0,5" fill="currentColor" />
            </marker>
          </defs>
          <path d="M20,14 H78" fill="none" stroke="currentColor" stroke-width="0.7" marker-end="url(#cycle-arrow)" />
          <path d="M86,18 V50" fill="none" stroke="currentColor" stroke-width="0.7" marker-end="url(#cycle-arrow)" />
          <path d="M80,58 H22" fill="none" stroke="currentColor" stroke-width="0.7" marker-end="url(#cycle-arrow)" />
          <path d="M14,54 V22" fill="none" stroke="currentColor" stroke-width="0.7" marker-end="url(#cycle-arrow)" />
        </svg>
        <p data-cell="a">${TRAIL.nodes[0]}</p>
        <p data-cell="b">${TRAIL.nodes[1]}</p>
        <p data-cell="c">${TRAIL.nodes[2]}</p>
        <p data-cell="d">${TRAIL.nodes[3]}</p>
      </div>
    </div>
  </section>

  <section class="slide" id="slide-07" data-slide-index="6" aria-labelledby="slide-07-title">
    <div class="frame frameWide">
      ${prompt(6)}
      <h2 id="slide-07-title" class="display displayWide">${HEADINGS[6]}</h2>
      <div class="ways">
        ${SURFACES.map(
          (surface) => `
          <article>
            <h3>${surface.name}</h3>
            <p>${surface.copy}</p>
          </article>
        `,
        ).join("")}
      </div>
      <p class="base">${SYSTEM_BASE}</p>
    </div>
  </section>

  <section class="slide" id="slide-08" data-slide-index="7" aria-labelledby="slide-08-title">
    <div class="frame frameWide">
      ${prompt(7)}
      <h2 id="slide-08-title" class="display displayWide">${HEADINGS[7]}</h2>
      <div class="pair">
        <article>
          <p>${COMPARE.left.kicker}</p>
          <h3>${COMPARE.left.name}</h3>
          <span>${COMPARE.left.copy}</span>
        </article>
        <article>
          <p>${COMPARE.right.kicker}</p>
          <h3>${COMPARE.right.name}</h3>
          <span>${COMPARE.right.copy}</span>
        </article>
      </div>
      <ul class="checks">
        ${EVIDENCE_CHECKS.map((item) => `<li><span>${item.name}</span><b>${item.copy}</b></li>`).join("")}
      </ul>
      <ul class="calls" aria-label="Possible result labels">
        ${DISPOSITIONS.map((item) => `<li data-status="${item.key}"><strong>${item.name}</strong><span>${item.copy}</span></li>`).join("")}
      </ul>
    </div>
  </section>

  <section class="slide" id="slide-09" data-slide-index="8" aria-labelledby="slide-09-title">
    <div class="frame">
      ${prompt(8)}
      <h2 id="slide-09-title" class="display displayWide">${HEADINGS[8]}</h2>
      <ol class="beats">
        ${MECHANICS.map((item) => `<li><span>${item.index}</span><p>${item.copy}</p></li>`).join("")}
      </ol>
    </div>
  </section>

  <section class="slide" id="slide-10" data-slide-index="9" aria-labelledby="slide-10-title">
    <div class="frame">
      ${prompt(9)}
      <h2 id="slide-10-title" class="display displayCover">${FOUNDER.name}</h2>
      <p class="lede">${FOUNDER.role}</p>
      <p class="founderBio">${FOUNDER.education}. ${FOUNDER.career}.</p>
      <p class="founderFact">${FOUNDER.facts.join(" · ")}</p>
      <p class="closeLine">${FOUNDER.close}</p>
    </div>
  </section>

  <section class="slide" id="slide-11" data-slide-index="10" aria-labelledby="slide-11-title">
    <div class="frame frameWide">
      ${prompt(10)}
      <h2 id="slide-11-title" class="display displayWide">${HEADINGS[10]}</h2>
      <div class="era">
        <article data-era="now">
          <p>${ERA.now.kicker}</p>
          <h3>${ERA.now.name}</h3>
          <span>${ERA.now.copy}</span>
        </article>
        <article data-era="next">
          <p>${ERA.next.kicker}</p>
          <h3>${ERA.next.name}</h3>
          <span>${ERA.next.copy}</span>
          <em class="eraNote">${ERA.note}</em>
        </article>
      </div>
    </div>
  </section>

  <section class="slide" id="slide-12" data-slide-index="11" aria-labelledby="slide-12-title">
    <div class="frame frameWide">
      ${prompt(11)}
      <h2 id="slide-12-title" class="askLabel">${FINANCING.label}</h2>
      <p class="money">${FINANCING.amount}</p>
      <ul class="funds">
        ${FINANCING.uses
          .map(
            (item) => `
          <li>
            <span>${item.copy}</span>
            <b>${item.range}</b>
            <i style="--bar:${item.bar}%"></i>
          </li>
        `,
          )
          .join("")}
      </ul>
      <div class="warnings">
        ${FINANCING.warnings.map((item) => `<p class="claim claimWarn">${item}</p>`).join("")}
      </div>
      <p class="fine">${FINANCING.qualification}</p>
      <p class="closeLine">${CLOSE.heading}</p>
      <p class="claim">${CLOSE.disabled}</p>
    </div>
  </section>
`;

  return `
  <main class="shell" id="main-content">
    <a class="skip" href="#slide-01">Skip to first slide</a>
    <header class="terminal">
      <a class="terminalBrand" href="/">
        <img src="/brand/ainfera-mark-ice.svg" alt="" width="16" height="16" />
        <span>Ainfera / StudioTune</span>
      </a>
      <span class="terminalMeta">${DECK_STATUS}</span>
    </header>
    <div class="progress" aria-hidden="true">
      <span class="progressBar" data-progress></span>
    </div>
    <div class="track" data-track tabindex="-1">
      ${slides}
    </div>
    <nav class="controls" aria-label="Deck navigation">
      <button class="controlBtn" type="button" data-prev aria-label="Previous slide">Prev</button>
      <p class="counter" data-counter aria-live="polite">1 / ${SLIDE_COUNT}</p>
      <button class="controlBtn" type="button" data-next aria-label="Next slide">Next</button>
    </nav>
  </main>
`;
}

export function bindDeck(root) {
  const track = root.querySelector("[data-track]");
  const progressBar = root.querySelector("[data-progress]");
  const counter = root.querySelector("[data-counter]");
  const prevBtn = root.querySelector("[data-prev]");
  const nextBtn = root.querySelector("[data-next]");
  let active = 0;

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function goTo(index) {
    const next = Math.max(0, Math.min(SLIDE_COUNT - 1, index));
    const slide = track.querySelector(`[data-slide-index="${next}"]`);
    if (!slide) return;
    track.scrollTo({
      top: slide.offsetTop,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  function setActive(index) {
    active = index;
    counter.textContent = `${active + 1} / ${SLIDE_COUNT}`;
    progressBar.style.transform = `scaleX(${(active + 1) / SLIDE_COUNT})`;
    prevBtn.disabled = active === 0;
    nextBtn.disabled = active === SLIDE_COUNT - 1;
    root.querySelectorAll("[data-slide-index]").forEach((slide, i) => {
      if (i === active) slide.setAttribute("aria-current", "true");
      else slide.removeAttribute("aria-current");
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number(visible.target.getAttribute("data-slide-index"));
      if (Number.isFinite(index)) setActive(index);
    },
    { root: track, threshold: [0.35, 0.55, 0.7] },
  );

  track.querySelectorAll("[data-slide-index]").forEach((slide) => observer.observe(slide));

  prevBtn.addEventListener("click", () => goTo(active - 1));
  nextBtn.addEventListener("click", () => goTo(active + 1));

  function onKey(event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT")
    ) {
      return;
    }

    const key = event.key;
    if (key === "ArrowDown" || key === "PageDown") {
      event.preventDefault();
      goTo(active + 1);
      return;
    }
    if (key === "ArrowUp" || key === "PageUp") {
      event.preventDefault();
      goTo(active - 1);
      return;
    }
    if (key === "Home") {
      event.preventDefault();
      goTo(0);
      return;
    }
    if (key === "End") {
      event.preventDefault();
      goTo(SLIDE_COUNT - 1);
    }
  }

  window.addEventListener("keydown", onKey);
  setActive(0);

  return () => {
    observer.disconnect();
    window.removeEventListener("keydown", onKey);
  };
}
