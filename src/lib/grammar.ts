import type { Level } from "./kanji"
import raw from "@/data/grammar.json"

export interface GrammarEntry {
  id: string
  level: string
  title: string
  meaning: string
  formation: string
  usage: string
  examples: Array<{ jp: string; en: string }>
  related: string[]
}

const allData = raw as GrammarEntry[]

export function getGrammar(level: Level): GrammarEntry[] {
  return allData.filter((g) => g.level === level)
}

export function getAllGrammar(): GrammarEntry[] {
  return allData
}
