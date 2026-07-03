import n5raw from "@/data/n5.json"
import n4raw from "@/data/n4.json"
import { seededShuffle } from "./random"
import { toKatakana } from "./kana"

export type Level = "n5" | "n4"

export interface Example {
  word: string
  reading: string
  english: string
  sentence?: string
  sentenceEnglish?: string
}

export interface KanjiEntry {
  id: number
  kanji: string
  kun: string[]
  on: string[]
  meanings: string[]
  strokes: number
  examples: Example[]
}

const data: Record<Level, KanjiEntry[]> = {
  n5: n5raw as KanjiEntry[],
  n4: n4raw as KanjiEntry[],
}

function getData(level: Level): KanjiEntry[] {
  return data[level]
}

export function getAll(level: Level = "n5"): KanjiEntry[] {
  return getData(level)
}

export function getById(id: number, level: Level = "n5"): KanjiEntry | undefined {
  return getData(level).find((k) => k.id === id)
}

export function getPrevNext(id: number, level: Level = "n5"): { prev: KanjiEntry | null; next: KanjiEntry | null } {
  const all = getData(level)
  const idx = all.findIndex((k) => k.id === id)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}

export function getSetForKanji(kanjiId: number, level: Level = "n5"): number {
  const count = getData(level).length
  const setsCount = level === "n4" ? 40 : 20
  return Math.min(Math.ceil(kanjiId / Math.ceil(count / setsCount)), setsCount)
}

export interface Question {
  kanjiId: number
  kanji: string
  prompt: string
  correct: string
  options: string[]
  qType: "k2r" | "r2k"
  context: string
  sentence: string
  sentenceEnglish: string
}

export function getSetQuestions(setNum: number, level: Level = "n5"): Question[] {
  const all = getData(level)
  const qCount = 20
  const rng = seededShuffle(all, setNum)
  const picked = rng.slice(0, qCount)
  const pool = all.filter((k) => !picked.find((p) => p.id === k.id))

  const wordPool: { word: string; reading: string; kanjiId: number; example: Example }[] = []
  for (const k of pool) {
    for (const ex of k.examples) {
      wordPool.push({ word: ex.word, reading: ex.reading, kanjiId: k.id, example: ex })
    }
  }

  return picked.map((k, i) => {
    const exIndex = (setNum + i) % k.examples.length
    const ex = k.examples[exIndex]
    const sentence = ex.sentence || `${ex.word}という言葉があります。`
    const sentenceEnglish = ex.sentenceEnglish || ex.english
    const isK2R = i % 2 === 0

    if (isK2R) {
      const firstKana = ex.reading[0]
      const similarPool = wordPool.filter(
        (wp) => wp.reading.startsWith(firstKana) && wp.reading !== ex.reading
      )
      const shuffled = seededShuffle(similarPool, setNum * 100 + i * 2)
      const distractors = new Set<string>()
      for (const wp of shuffled) {
        if (distractors.size >= 3) break
        if (!distractors.has(wp.reading)) distractors.add(wp.reading)
      }
      if (distractors.size < 3) {
        const fallback = seededShuffle(
          wordPool.filter((wp) => wp.reading.length === ex.reading.length && wp.reading !== ex.reading && !distractors.has(wp.reading)),
          setNum * 300 + i
        )
        for (const wp of fallback) {
          if (distractors.size >= 3) break
          if (!distractors.has(wp.reading)) distractors.add(wp.reading)
        }
      }
      const options = seededShuffle([ex.reading, ...Array.from(distractors)], setNum * 200 + i)

      return {
        kanjiId: k.id,
        kanji: k.kanji,
        prompt: ex.word,
        correct: ex.reading,
        options,
        qType: "k2r" as const,
        context: ex.english,
        sentence,
        sentenceEnglish,
      }
    } else {
      const firstKana = ex.reading[0]
      const similarPool = wordPool.filter(
        (wp) => wp.reading.startsWith(firstKana) && wp.word !== ex.word
      )
      const shuffled = seededShuffle(similarPool, setNum * 100 + i * 2 + 1)
      const distractors = new Set<string>()
      for (const wp of shuffled) {
        if (distractors.size >= 3) break
        if (!distractors.has(wp.word)) distractors.add(wp.word)
      }
      if (distractors.size < 3) {
        const kanjiCount = (s: string) => [...s].filter(c => c.charCodeAt(0) > 0x4E00).length
        const targetCount = kanjiCount(ex.word)
        const fallback = seededShuffle(
          wordPool.filter((wp) => kanjiCount(wp.word) === targetCount && wp.word !== ex.word && !distractors.has(wp.word)),
          setNum * 300 + i + 1
        )
        for (const wp of fallback) {
          if (distractors.size >= 3) break
          if (!distractors.has(wp.word)) distractors.add(wp.word)
        }
      }
      const options = seededShuffle([ex.word, ...Array.from(distractors)], setNum * 200 + i + 1)

      return {
        kanjiId: k.id,
        kanji: k.kanji,
        prompt: ex.reading,
        correct: ex.word,
        options,
        qType: "r2k" as const,
        context: ex.english,
        sentence,
        sentenceEnglish,
      }
    }
  })
}

export interface VocabEntry {
  slug: string
  word: string
  reading: string
  english: string
  kanjiIds: number[]
  kanjiChars: string[]
  sentences: { sentence: string; sentenceEnglish: string }[]
}

export function getVocabulary(level: Level = "n5"): VocabEntry[] {
  const all = getData(level)
  const map = new Map<string, VocabEntry>()
  const seen = new Set<string>()

  const allEx = all.flatMap(k => k.examples.map(e => ({ ...e, kid: k.id, kchar: k.kanji })))

  for (const k of all) {
    for (const ex of k.examples) {
      const key = `${ex.word}|${ex.reading}`
      if (map.has(key)) {
        const entry = map.get(key)!
        if (!entry.kanjiIds.includes(k.id)) {
          entry.kanjiIds.push(k.id)
          entry.kanjiChars.push(k.kanji)
        }
        if (ex.sentence && ex.sentenceEnglish) {
          if (!entry.sentences.some(s => s.sentence === ex.sentence)) {
            entry.sentences.push({ sentence: ex.sentence, sentenceEnglish: ex.sentenceEnglish })
          }
        }
      } else {
        let slug = ex.reading
        if (seen.has(slug)) slug = `${ex.reading}-${ex.word}`
        seen.add(slug)
        map.set(key, {
          slug,
          word: ex.word,
          reading: ex.reading,
          english: ex.english,
          kanjiIds: [k.id],
          kanjiChars: [k.kanji],
          sentences: ex.sentence && ex.sentenceEnglish
            ? [{ sentence: ex.sentence, sentenceEnglish: ex.sentenceEnglish }]
            : [],
        })
      }
    }
  }

  for (const entry of map.values()) {
    if (entry.sentences.length >= 3) continue
    for (const kid of entry.kanjiIds) {
      if (entry.sentences.length >= 3) break
      for (const ex of allEx) {
        if (entry.sentences.length >= 3) break
        if (ex.kid !== kid) continue
        if (entry.sentences.some(s => s.sentence === ex.sentence)) continue
        if (ex.sentence && ex.sentenceEnglish) {
          entry.sentences.push({ sentence: ex.sentence, sentenceEnglish: ex.sentenceEnglish })
        }
      }
    }
  }

  return Array.from(map.values())
}

export { toKatakana }
