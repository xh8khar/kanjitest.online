import { getAll } from "./kanji"
import type { Level, KanjiEntry } from "./kanji"

export interface DeckCard {
  id: number
  kanji: string
  kun: string[]
  on: string[]
  meanings: string[]
  strokes: number
  examples: { word: string; reading: string; english: string; sentence?: string; sentenceEnglish?: string }[]
}

export function toDeckCard(k: KanjiEntry): DeckCard {
  return {
    id: k.id,
    kanji: k.kanji,
    kun: k.kun,
    on: k.on,
    meanings: k.meanings,
    strokes: k.strokes,
    examples: k.examples.slice(0, 2),
  }
}

/** The full flashcard deck for a level — served as a single cacheable
 *  JSON file so individual flashcard pages stay small. */
export function getDeck(level: Level): DeckCard[] {
  return getAll(level).map(toDeckCard)
}
