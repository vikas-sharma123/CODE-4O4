import type {
  AdminRequest,
  CalendarSession,
  ClubEvent,
  FeatureCard,
  LeaderboardEntry,
  ProjectInterestRequest,
  ShowcaseProject,
} from "@/types";

export const heroStats = [
  { label: "Active Members", value: "40+", detail: "product builders" },
  { label: "Projects Shipped", value: "10", detail: "community builds" },
  { label: "Workshops / yr", value: "24", detail: "hands-on labs" },
  { label: "Partner Mentors", value: "5", detail: "industry experts" },
];

export const featureCards: FeatureCard[] = [
  {
    title: "Collaborative Projects",
    description:
      "Squad up with designers, devs, and mentors to ship community products with modern stacks.",
    highlight: "Ship multi-week builds with real users.",
    icon: "Code2",
  },
  {
    title: "Tech Events",
    description:
      "Workshops, hack nights, and lightning talks crafted by engineers, product folks, and alumni.",
    highlight: "Stay future-proof with weekly sessions.",
    icon: "CalendarDays",
  },
  {
    title: "Expert Mentorship",
    description:
      "Research labs for reviews, mock interviews, and more.",
    highlight: "1:1 office hours + async feedback.",
    icon: "Sparkles",
  },
  {
    title: "Gamified Growth",
    description:
      "Earn badges, stack points, and climb custom leaderboards that celebrate deep work and impact.",
    highlight: "Track learning across seasons.",
    icon: "Trophy",
  },
];

export const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Firebase",
  "Node.js",
  "Python",
  "MongoDB",
  "Docker",
  "AWS",
  "GitHub",
];

export const journeySteps = [
  {
    title: "01 · Submit Your Story",
    summary:
      "Introduce yourself, your stack, and what you want to build with the club.",
    micro: ["Pick interest tracks", "Share GitHub or dribbble", "Tell us your goal"],
  },
  {
    title: "02 · Login & Explore",
    summary:
      "Track project needs, request to join squads, and RSVP to events through the portal.",
    micro: ["Review live projects", "Claim open tasks", "Track deliverables"],
  },
  {
    title: "03 · Collaborate & Earn",
    summary:
      "Pair with mentors, contribute code, get awarded points, and climb the leaderboard.",
    micro: ["Sync with mentors", "Demo your work", "Unlock club perks"],
  },
];

export const availableInterests = [
  "AI/ML",
  "Web Apps",
  "Design Systems",
  "Product Strategy",
  "Mobile",
  "DevOps",
  "Cloud",
  "Cybersecurity",
];
