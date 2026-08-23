export const SLIDE_COUNT = 12;

export const DECK_TITLE = "Ainfera — StudioTune investor deck";

export const DECK_STATUS = "PRIVATE INVESTOR PREPARATION · 2026";

export const HEADINGS = [
  "The fine-tuning agent platform.",
  "Fine-tuning without proof is still a guess.",
  "From request to decision.",
  "The Agent proposes. The Engine proves.",
  "The product is the decision.",
  "Every run leaves a trail.",
  "Not a trainer. A workspace.",
  "A lower score is not a better model.",
  "Every step is visible.",
  "Hizrian Raz",
  "Vibe coding is now. Vibe tuning is next.",
  "What the $3M is for",
];

export const PROMPTS = [
  "Initializing Ainfera...",
  "Finding the gap...",
  "Loading StudioTune...",
  "Opening the workspace...",
  "Naming the product...",
  "Following the trail...",
  "Showing the workspace...",
  "Comparing models...",
  "Walking the steps...",
  "Loading the founder...",
  "Reading now and next...",
  "Planning the use of funds...",
];

export const COVER = {
  company: "Ainfera",
  product: "StudioTune",
  beats: ["Say the change.", "Review the plan.", "See the proof."],
  framing: "Ainfera is building StudioTune — the agent workspace for tuning model behavior.",
};

export const THESIS = {
  lead: "Fine-tuning without proof is still a",
  kill: "guess",
};

export const LOOP = [
  "Ask",
  "Inspect",
  "Plan",
  "Approve",
  "Run",
  "Compare",
  "Proof",
  "Decide",
];

export const AGENT_DIALOGUE = [
  { speaker: "You", lines: ["I want the model to change."] },
  { speaker: "Tune Agent", lines: ["Here are three safe paths."] },
  { speaker: "Engine", lines: ["Model, data, and checks are ready."] },
  { speaker: "You", lines: ["Approve this plan."] },
];

export const WEDGE = {
  support: "Not a trainer. Not a chat.",
  close: "StudioTune is the moment you decide if a new model can be used.",
};

export const TRAIL = {
  nodes: ["More runs", "More proof", "Clearer diffs", "Clearer calls"],
};

export const SURFACES = [
  { name: "Desktop", copy: "See the work" },
  { name: "Tune Agent", copy: "Get a plan" },
  { name: "CLI", copy: "Run it again" },
];

export const SYSTEM_BASE = "Engine and Evidence underneath";

export const COMPARE = {
  left: { kicker: "Before", name: "Parent", copy: "The model you have now" },
  right: { kicker: "After", name: "Candidate", copy: "The model you might use" },
};

export const EVIDENCE_CHECKS = [
  { name: "Wanted behavior", copy: "Did it improve?" },
  { name: "Other behavior", copy: "Did anything break?" },
  { name: "Held-out tests", copy: "Were they sealed?" },
  { name: "Repeat check", copy: "Can you run it again?" },
];

export const DISPOSITIONS = [
  { key: "SHIP", name: "Ship", copy: "It held" },
  { key: "REVISE", name: "Revise", copy: "Change the plan" },
  { key: "HOLD", name: "Hold", copy: "Not enough proof" },
  { key: "REJECT", name: "Reject", copy: "Do not use" },
];

export const MECHANICS = [
  { index: "01", copy: "Say what should change." },
  { index: "02", copy: "Review the plan." },
  { index: "03", copy: "Run and compare." },
  { index: "04", copy: "Decide." },
];

export const FOUNDER = {
  name: "Hizrian Raz",
  role: "Founder of Ainfera. Building StudioTune.",
  facts: ["Solo founder", "Ainfera Inc."],
  education:
    "Innovation & Entrepreneurship from Singapore Management University & Babson College",
  career: "15 years in finance",
  close: "One founder. The workspace keeps the trail.",
};

export const ERA = {
  now: {
    kicker: "Now",
    name: "Vibe coding",
    copy: "People describe software. Agents write it.",
  },
  next: {
    kicker: "Next",
    name: "Vibe tuning",
    copy: "People will describe how a model should behave.",
  },
  note: "Open models made this possible.",
};

export const FINANCING = {
  label: "What the $3M is for",
  amount: "$3M",
  uses: [
    { range: "35–45%", copy: "Build the product", bar: 40 },
    { range: "15–20%", copy: "Prove the change", bar: 18 },
    { range: "10–15%", copy: "Run the models", bar: 12 },
    { range: "10–15%", copy: "Find first users", bar: 12 },
    { range: "10–15%", copy: "Legal and operations", bar: 12 },
    { range: "5–10%", copy: "Reserve", bar: 8 },
  ],
  warnings: [
    "INTERNAL PLANNING SCENARIO",
    "NOT LOCKED TERMS",
    "FOUNDER + COUNSEL DECISION REQUIRED",
  ],
  qualification: "Planning ranges only. Actual spend depends on progress, hiring, and counsel review.",
};

export const CLOSE = {
  heading: "Build from your data. See what changed. Know if it should move.",
  disabled: "FOUNDER-ACTIVATED ONLY · NOT LIVE",
};
