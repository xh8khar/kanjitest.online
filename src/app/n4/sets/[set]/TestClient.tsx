"use client"

import { useState, use } from "react"
import Link from "next/link"
import { getSetQuestions } from "@/lib/kanji"

function highlightSentence(sentence: string, word: string): { before: string; target: string; after: string } {
  const idx = sentence.indexOf(word)
  if (idx === -1) return { before: sentence, target: "", after: "" }
  return {
    before: sentence.slice(0, idx),
    target: word,
    after: sentence.slice(idx + word.length),
  }
}

export default function TestClient({ params }: { params: Promise<{ set: string }> }) {
  const { set } = use(params)
  const setNum = parseInt(set)

  if (isNaN(setNum) || setNum < 1 || setNum > 20) {
    return <div className="px-4 py-8 text-center">
      <p className="text-ink/70">Set not found.</p>
      <Link href="/n4/sets/" className="text-ink/70 hover:text-ink transition-colors text-sm mt-4 inline-block">&larr; All sets</Link>
    </div>
  }

  return <TestContent setNum={setNum} />
}

function TestContent({ setNum }: { setNum: number }) {
  const questions = getSetQuestions(setNum, "n4")
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleSelect = (qIdx: number, value: string) => {
    if (answers[qIdx] !== undefined) return
    setAnswers((prev) => ({ ...prev, [qIdx]: value }))
  }

  const answered = Object.keys(answers).length
  const total = questions.length
  const allDone = answered === total
  const correctCount = allDone
    ? questions.filter((q, i) => answers[i] === q.correct).length
    : 0

  return (
    <div className="px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-ink">Set {setNum}</h1>
          <p className="text-xs text-ink/60">{answered} / {total} answered</p>
        </div>
        <Link href="/n4/sets/" className="border border-ink/20 rounded-lg h-11 px-4 text-sm text-ink/70 hover:border-ink/40 hover:text-ink transition-all flex items-center">
          &larr; All sets
        </Link>
      </div>

      {allDone && (
        <div className="border border-ink/20 rounded-xl px-5 py-5 mb-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center text-white font-bold text-sm">
              {Math.round((correctCount / total) * 100)}%
            </div>
            <div>
              <p className="font-bold text-ink">{correctCount}/{total}</p>
              <p className="text-xs text-ink/60">
                {correctCount === total
                  ? "Perfect score!"
                  : correctCount >= 14
                    ? "Great job!"
                    : correctCount >= 10
                      ? "Keep practicing!"
                      : "Review and try again"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Link href={`/n4/sets/${setNum < 20 ? setNum + 1 : 1}/`} className="flex-1 h-11 rounded-lg border border-ink/20 text-sm text-ink/70 flex items-center justify-center hover:border-ink/40 hover:text-ink transition-all">
              Next set &rarr;
            </Link>
            <Link href="/n4/study/" className="flex-1 h-11 rounded-lg border border-ink/20 text-sm text-ink/70 flex items-center justify-center hover:border-ink/40 hover:text-ink transition-all">
              Study
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q, i) => {
          const selected = answers[i]
          const isAnswered = selected !== undefined
          const isCorrect = isAnswered && selected === q.correct
          const isWrong = isAnswered && selected !== q.correct
          const highlightWord = q.qType === "k2r" ? q.prompt : q.correct
          const highlight = highlightSentence(q.sentence, highlightWord)

          return (
            <div key={i} className="border border-ink/20 rounded-xl px-5 py-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-md bg-ink/10 flex items-center justify-center shrink-0 text-xs font-medium text-ink/60">{i + 1}</div>
                <Link href={`/n4/study/${q.kanjiId}/`} className="text-xs text-ink/60 hover:text-ink transition-colors">detail</Link>
              </div>

              <div className="border border-ink/20 rounded-lg px-4 py-3 mb-3 text-sm leading-relaxed text-ink bg-ink/10">
                {highlight.before}
                <span className="font-bold underline decoration-2 decoration-ink underline-offset-4">{highlight.target}</span>
                {highlight.after}
              </div>

              <p className="text-xs text-ink/60 mb-3">
                {q.qType === "k2r"
                  ? `What is the reading of ${q.prompt}?`
                  : `Select the correct kanji for ${q.prompt}.`}
              </p>

              <div className="space-y-1">
                {q.options.map((opt) => {
                  const isOptionCorrect = isAnswered && opt === q.correct
                  const isOptionWrong = isAnswered && opt === selected && opt !== q.correct
                  let labelClasses = "h-11 rounded-lg border border-ink/20 px-4 flex items-center gap-3 cursor-pointer transition-all "
                  if (isOptionCorrect) labelClasses += "border-ink bg-ink/10 text-ink font-medium "
                  else if (isOptionWrong) labelClasses += "border-ink text-ink/70 "
                  else if (isAnswered) labelClasses += "opacity-50 "
                  else labelClasses += "hover:border-ink/40 "

                  return (
                    <label key={`${i}-${opt}`} className={labelClasses}>
                      <input type="radio" name={`q-${i}`} value={opt} checked={selected === opt} onChange={() => handleSelect(i, opt)} className="sr-only" />
                      <span className="text-sm">{opt}</span>
                      {isOptionCorrect && <span className="ml-auto text-xs text-ink">&#10003;</span>}
                      {isOptionWrong && <span className="ml-auto text-xs text-ink/70">&#10007;</span>}
                    </label>
                  )
                })}
              </div>

              {isWrong && (
                <Link href={`/n4/study/${q.kanjiId}/`} className="inline-block mt-2 text-xs text-ink/60 hover:text-ink transition-colors">
                  Study {q.kanji} &rarr;
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
