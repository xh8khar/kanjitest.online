import type { Level } from "./kanji"

export const LEVEL_IDS: Level[] = ["n5", "n4", "n3", "n2", "n1"]

export interface LevelMeta {
  id: Level
  label: string
  tagline: string
  blurb: string
  /** Tailwind utility classes — kept as full strings so Tailwind can see them */
  accentText: string
  accentBg: string
  accentBgSoft: string
  accentBorder: string
  gradient: string
  glow: string
}

export const LEVELS: Record<Level, LevelMeta> = {
  n5: {
    id: "n5",
    label: "N5",
    tagline: "Foundations",
    blurb: "The most fundamental Japanese characters — where every learner begins.",
    accentText: "text-emerald-600",
    accentBg: "bg-emerald-500",
    accentBgSoft: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/25",
  },
  n4: {
    id: "n4",
    label: "N4",
    tagline: "Building blocks",
    blurb: "Everyday kanji that unlock basic conversations and simple reading.",
    accentText: "text-sky-600",
    accentBg: "bg-sky-500",
    accentBgSoft: "bg-sky-500/10",
    accentBorder: "border-sky-500/30",
    gradient: "from-sky-500 to-blue-500",
    glow: "shadow-sky-500/25",
  },
  n3: {
    id: "n3",
    label: "N3",
    tagline: "Confidence",
    blurb: "Upper-intermediate characters bridging daily life and the news.",
    accentText: "text-violet-600",
    accentBg: "bg-violet-500",
    accentBgSoft: "bg-violet-500/10",
    accentBorder: "border-violet-500/30",
    gradient: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/25",
  },
  n2: {
    id: "n2",
    label: "N2",
    tagline: "Advanced",
    blurb: "The kanji of newspapers, workplaces, and serious reading.",
    accentText: "text-orange-600",
    accentBg: "bg-orange-500",
    accentBgSoft: "bg-orange-500/10",
    accentBorder: "border-orange-500/30",
    gradient: "from-orange-500 to-amber-500",
    glow: "shadow-orange-500/25",
  },
  n1: {
    id: "n1",
    label: "N1",
    tagline: "Mastery",
    blurb: "The full sweep of literary, academic, and professional Japanese.",
    accentText: "text-rose-600",
    accentBg: "bg-rose-500",
    accentBgSoft: "bg-rose-500/10",
    accentBorder: "border-rose-500/30",
    gradient: "from-rose-500 to-pink-500",
    glow: "shadow-rose-500/25",
  },
}

export const SETS_PER_LEVEL = 20
export const QUESTIONS_PER_SET = 20

export function levelMeta(level: Level): LevelMeta {
  return LEVELS[level]
}
