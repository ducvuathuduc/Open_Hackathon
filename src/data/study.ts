export interface StudyMode {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export const STUDY_MODES: StudyMode[] = [
  { id: "lecture", icon: "🎙", title: "Lecture Assist", desc: "Record 30–90s, get transcription, translation, plain explanation & key terms" },
  { id: "slide", icon: "📷", title: "Slide Explain", desc: "Snap a slide — explained simply, translated, with terminology to remember" },
  { id: "assignment", icon: "📄", title: "Assignment Decoder", desc: "Paste a brief — get deliverables, deadline, action items & questions to ask" },
  { id: "professor", icon: "👨‍🏫", title: "Professor Mode", desc: "Rewrite messages to professors so they sound appropriate, not confrontational" },
  { id: "group", icon: "👥", title: "Group Project", desc: "Communication styles + a shared team agreement to reduce friction" },
  { id: "vocab", icon: "📚", title: "Academic Vocabulary", desc: "Build the terminology you meet in your field, with examples" },
];

export interface StudySample {
  input: string;
  output: { label: string; body: string; items?: string[] }[];
}

export const STUDY_SAMPLES: Record<string, StudySample> = {
  lecture: {
    input: "🎙 \"...so the key idea of dynamic programming is that we store subproblem results to avoid recomputation, which gives us polynomial time...\"",
    output: [
      { label: "Transcript", body: "The lecturer explains that dynamic programming stores the results of subproblems to avoid recomputing them, achieving polynomial time." },
      { label: "Plain explanation", body: "Instead of solving the same small problem again and again, you save its answer and reuse it. This makes the whole thing much faster." },
      { label: "Key terms", body: "", items: ["Dynamic programming", "Subproblem", "Memoization", "Polynomial time"] },
      { label: "Summary", body: "DP = save + reuse subproblem answers → big speed-up." },
    ],
  },
  slide: {
    input: "📷 Slide: \"Normalization: 1NF, 2NF, 3NF — reducing data redundancy and dependency.\"",
    output: [
      { label: "Explained simply", body: "Normalization organizes a database into tables so the same data isn't repeated and relationships stay clean." },
      { label: "Terminology", body: "", items: ["Redundancy", "Functional dependency", "Normal forms (1NF–3NF)"] },
      { label: "Remember this", body: "Each normal form removes a specific kind of duplication. 3NF is the common target." },
    ],
  },
  assignment: {
    input: "📄 \"Submit a 2000-word report analysing a real dataset. Include methodology and cite sources. Due Week 8.\"",
    output: [
      { label: "Deliverables", body: "", items: ["2000-word report", "Dataset analysis", "Methodology section", "Cited sources"] },
      { label: "Deadline", body: "Week 8 — start data selection now." },
      { label: "Action items", body: "", items: ["Pick a dataset", "Draft methodology", "Run the analysis", "Write & cite"] },
      { label: "Ask the lecturer", body: "How many sources are expected? Is a specific citation style required?" },
    ],
  },
  professor: {
    input: "✍️ Your draft: \"Teacher why did you deduct points from my assignment?\"",
    output: [
      { label: "⚠️ Risk", body: "This may sound confrontational to a professor." },
      { label: "Academic-friendly version", body: "Dear Professor, thank you for the feedback on my assignment. Could you help me understand where I lost marks so I can improve? I appreciate your time." },
      { label: "Why", body: "It opens with thanks, frames it as learning, and stays respectful of hierarchy." },
    ],
  },
  group: {
    input: "👥 Team of 4: 2 direct communicators, 2 indirect. Deadline in 5 days.",
    output: [
      { label: "Communication styles", body: "Two teammates prefer explicit updates; two prefer to avoid open conflict. Bridge with written check-ins." },
      { label: "Team agreement", body: "", items: ["Daily async update in chat", "Decisions made in meetings, not DMs", "Disagreements raised as questions", "Roles assigned by day 1"] },
    ],
  },
  vocab: {
    input: "📚 Field: Computer Science — this week's terms",
    output: [
      { label: "Terms", body: "", items: ["Concurrency — tasks progressing together", "Idempotent — same result if repeated", "Latency — delay before a response", "Throughput — work done per unit time"] },
      { label: "Tip", body: "Save terms you meet in lectures here to review before exams." },
    ],
  },
};
