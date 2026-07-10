import raw from "@/data/particles.json"

export type ParticleEntry = (typeof raw)[number]
export const particles = raw as ParticleEntry[]

export function toSlug(p: ParticleEntry): string {
  return p.id
}

const _slugMap = new Map<string, ParticleEntry>()
for (const p of particles) {
  _slugMap.set(toSlug(p), p)
}

export function getBySlug(slug: string): ParticleEntry | undefined {
  return _slugMap.get(slug)
}

export const TYPES = ["Case", "Focus", "Conjunctive", "Final", "Adverbial", "Compound"] as const

export function getByType(type: string): ParticleEntry[] {
  return particles.filter((p) => p.type === type)
}
