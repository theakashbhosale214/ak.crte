export type ApproachStep = {
  number: string;
  title: string;
  description: string;
  deliverables: readonly string[];
};

export const approachIntro = {
  eyebrow: "Our approach",
  index: "02",
  title: "A clear path from idea to launch — and beyond.",
  description:
    "Every engagement follows the same five stages, with defined milestones and regular check-ins, so you always know what is happening and what comes next.",
} as const;

export const approachSteps: readonly ApproachStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand business requirements, goals, users, and challenges.",
    deliverables: ["Goals & requirements", "User needs", "Review of what exists"],
  },
  {
    number: "02",
    title: "Strategize",
    description: "Define the solution, architecture, scope, and execution plan.",
    deliverables: ["Solution & architecture", "Scope & milestones", "Estimate"],
  },
  {
    number: "03",
    title: "Design",
    description: "Create user-focused interfaces and meaningful experiences.",
    deliverables: ["Wireframes", "Interface design", "Clickable prototype"],
  },
  {
    number: "04",
    title: "Develop",
    description: "Build, integrate, test, and optimize the solution.",
    deliverables: ["Development", "Integrations", "Testing & performance"],
  },
  {
    number: "05",
    title: "Launch & Grow",
    description: "Deploy, monitor, maintain, and continuously improve.",
    deliverables: ["Deployment", "Monitoring", "Ongoing improvements"],
  },
];
