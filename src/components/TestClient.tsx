import { useEffect, useMemo, useState } from "react"
import { navigate } from "astro:transitions/client"

export interface QuizQuestion {
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

interface Props {
  level: string
  setNum: number
  questions: QuizQuestion[]
}

function highlightSentence(sentence: string, word: string) {
  const idx = sentence.indexOf(word)
  if (idx === -1) return { before: sentence, target: "", after: "" }
  return {
    before: sentence.slice(0, idx),
    target: word,
    after: sentence.slice(idx + word.length),
  }
}

function ScoreRing({ pct }: { pct: number }) {
  const [offset, setOffset] = useState(283)
  const target = 283 - (283 * pct) / 100
  useEffect(() => {
    const t = requestAnimationFrame(() => setOffset(target))
    return () => cancelAnimationFrame(t)
  }, [target])
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-ink/8" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset={offset}
          className={pct >= 70 ? "text-emerald-500" : pct >= 50 ? "text-amber-500" : "text-vermilion"}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-ink tabular-nums">
        {pct}%
      </span>
    </div>
  )
}

const SET_COUNT = 20

function JumpSetOverlay({
  setNum,
  prefix,
  onClose,
}: {
  setNum: number
  prefix: string
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl shadow-ink/20 border border-ink/10 animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-ink/8">
          <span className="text-sm font-bold text-ink">Jump to set</span>
          <button onClick={onClose} className="btn btn-ghost h-8 px-2.5 text-xs">
            ✕
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: SET_COUNT }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => {
                  onClose()
                  navigate(`${prefix}/sets/${n}/`)
                }}
                className={`h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                  n === setNum
                    ? "bg-ink text-white shadow-md shadow-ink/20"
                    : "bg-ink/[0.04] text-ink/60 border border-ink/10 hover:border-ink/30 hover:bg-ink/[0.06]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestClient({ level, setNum, questions }: Props) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(() => questions.map(() => null))
  const [finished, setFinished] = useState(false)
  const [showJump, setShowJump] = useState(false)
  const prefix = `/${level}`

  const q = questions[idx]
  const selected = answers[idx]
  const isAnswered = selected !== null
  const answeredCount = answers.filter((a) => a !== null).length
  const correctCount = useMemo(
    () => questions.reduce((s, qq, i) => s + (answers[i] === qq.correct ? 1 : 0), 0),
    [questions, answers]
  )

  const select = (opt: string) => {
    if (isAnswered) return
    setAnswers((prev) => {
      const next = [...prev]
      next[idx] = opt
      return next
    })
  }

  const advance = () => {
    if (idx < questions.length - 1) setIdx(idx + 1)
    else setFinished(true)
  }

  const restart = () => {
    setAnswers(questions.map(() => null))
    setIdx(0)
    setFinished(false)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showJump) {
        if (e.key === "Escape") setShowJump(false)
        return
      }
      if (finished) return
      const current = questions[idx]
      const currentAnswer = answers[idx]
      if (currentAnswer === null && ["1", "2", "3", "4"].includes(e.key)) {
        const opt = current.options[Number(e.key) - 1]
        if (opt) select(opt)
      } else if (currentAnswer !== null && (e.key === "Enter" || e.key === "ArrowRight")) {
        advance()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  /* ————— Results screen ————— */
  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100)
    const wrong = questions.map((qq, i) => ({ q: qq, given: answers[i] })).filter((w) => w.given !== w.q.correct)
    const message =
      pct === 100 ? "Perfect score! 完璧です！" : pct >= 80 ? "Great job! すごい！" : pct >= 50 ? "Keep practicing! がんばって！" : "Review and try again — 一歩ずつ。"

    return (
      <>
        <div className="max-w-xl mx-auto px-4 py-8 animate-fade-up">
          <div className="card p-6 sm:p-8 text-center shadow-lg shadow-ink/5">
            <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-5">
              Set {setNum} · complete
            </p>
            <ScoreRing pct={pct} />
            <p className="text-lg font-black text-ink mt-4 animate-pop" style={{ animationDelay: "300ms" }}>
              {correctCount} / {questions.length}
            </p>
            <p className="text-sm text-ink/60 mt-1">{message}</p>

            <div className="grid grid-cols-2 gap-2.5 mt-5">
              <button onClick={restart} className="btn btn-ghost h-12 text-sm">
                ↻ Retry set
              </button>
              <a
                href={`${prefix}/sets/${setNum < 20 ? setNum + 1 : 1}/`}
                className="btn btn-primary h-12 text-sm"
              >
                Next set →
              </a>
            </div>

            {/* Challenge friends — styles from global.css, click behavior from
                the ShareBar delegation script that runs on every page */}
            {(() => {
              const shareUrl = `https://kanjitest.online${prefix}/sets/${setNum}/`
              const shareText = `I scored ${pct}% on the JLPT ${level.toUpperCase()} kanji test (set ${setNum}) 🇯🇵 Can you beat me?`
              const eUrl = encodeURIComponent(shareUrl)
              const eText = encodeURIComponent(shareText)
              return (
                <div className="mt-6 pt-5 border-t border-ink/8">
                  <p className="text-xs font-bold uppercase tracking-widest text-ink/35 mb-3">
                    Challenge your friends
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <a className="share-btn share-x" href={`https://twitter.com/intent/tweet?text=${eText}&url=${eUrl}`} target="_blank" rel="noopener" aria-label="Share score on X">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.23l-4.88-6.38L6.5 22H3.34l7.24-8.28L2.8 2h6.39l4.41 5.83L18.9 2zm-1.1 18.13h1.73L7.28 3.77H5.42l12.38 16.36z"/></svg>
                    </a>
                    <a className="share-btn share-wa" href={`https://wa.me/?text=${eText}%20${eUrl}`} target="_blank" rel="noopener" aria-label="Share score on WhatsApp">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.82 9.82 0 0 1-1.51-5.26c0-5.44 4.43-9.87 9.89-9.87a9.8 9.8 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.98c0 5.45-4.43 9.88-9.88 9.88zm8.41-18.29A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.33-1.66a11.9 11.9 0 0 0 5.66 1.44h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.49-8.4z"/></svg>
                    </a>
                    <a className="share-btn share-line" href={`https://social-plugins.line.me/lineit/share?url=${eUrl}&text=${eText}`} target="_blank" rel="noopener" aria-label="Share score on LINE">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.37 4.43A11.9 11.9 0 0 0 12 2C6.48 2 2 5.64 2 10.12c0 4.02 3.57 7.39 8.4 8.03.33.07.77.22.89.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1 .88.55s5.83-3.44 7.95-5.88C21.53 13.44 22 11.86 22 10.12c0-2.2-1-4.2-2.63-5.69zM8.14 12.86H6.16a.53.53 0 0 1-.52-.52V8.4c0-.29.24-.53.52-.53.29 0 .53.24.53.53v3.42h1.45c.29 0 .52.23.52.52 0 .28-.23.52-.52.52zm2.05-.52a.53.53 0 0 1-.53.52.53.53 0 0 1-.52-.52V8.4c0-.29.24-.53.52-.53.3 0 .53.24.53.53v3.94zm4.75 0a.53.53 0 0 1-.36.5.55.55 0 0 1-.17.02.52.52 0 0 1-.42-.2l-2.02-2.75v2.43a.52.52 0 1 1-1.05 0V8.4a.52.52 0 0 1 .95-.3l2.02 2.74V8.4c0-.29.24-.53.53-.53.28 0 .52.24.52.53v3.94zm3.19-2.5c.29 0 .52.24.52.53 0 .28-.23.52-.52.52h-1.46v.93h1.46c.29 0 .52.23.52.52 0 .28-.23.52-.52.52h-1.98a.53.53 0 0 1-.52-.52V8.4c0-.29.23-.53.52-.53h1.98c.29 0 .52.24.52.53 0 .29-.23.52-.52.52h-1.46v.93h1.46z"/></svg>
                    </a>
                    <button className="share-btn share-copy" data-share-copy data-url={shareUrl} aria-label="Copy link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.69l1.4-1.4a4.5 4.5 0 016.37 6.36l-3.18 3.18a4.5 4.5 0 01-6.37 0m-1.6-4.52l-1.4 1.4a4.5 4.5 0 106.36 6.37l3.18-3.18"/></svg>
                      <span className="copy-tip">Copied!</span>
                    </button>
                    <button
                      className="share-btn share-native"
                      data-share-native
                      data-url={shareUrl}
                      data-text={shareText}
                      aria-label="More sharing options"
                      hidden={typeof navigator === "undefined" || !("share" in navigator)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7.22 10.9a3 3 0 100 2.2m0-2.2a3 3 0 110 2.2m0-2.2l8.56-4.26m-8.56 6.47l8.56 4.25m0-10.72a3 3 0 102.44-4.1 3 3 0 00-2.44 4.1zm0 10.72a3 3 0 102.44 4.1 3 3 0 00-2.44-4.1z"/></svg>
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>

          {wrong.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-3">
                Review these {wrong.length} {wrong.length === 1 ? "kanji" : "kanji"}
              </p>
              <div className="space-y-2">
                {wrong.map(({ q: qq, given }, i) => (
                  <a
                    key={i}
                    href={`${prefix}/study/${qq.kanji}/`}
                    className="card card-hover group flex items-center gap-3.5 px-4 py-3 reveal is-visible animate-fade-up"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <span className="w-11 h-11 rounded-xl bg-vermilion/10 flex items-center justify-center text-xl font-jp font-bold text-ink shrink-0">
                      {qq.kanji}
                    </span>
                    <span className="flex-1 min-w-0 text-left">
                      <span className="block text-sm font-bold text-ink truncate">
                        {qq.prompt} → {qq.correct}
                      </span>
                      <span className="block text-[11px] text-ink/50 truncate">
                        you answered: {given ?? "—"}
                      </span>
                    </span>
                    <span className="text-xs text-ink/40 group-hover:text-vermilion transition-colors shrink-0">study →</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {showJump && (
          <JumpSetOverlay
            setNum={setNum}
            prefix={prefix}
            onClose={() => setShowJump(false)}
          />
        )}
      </>
    )
  }

  /* ————— Question screen ————— */
  const highlightWord = q.qType === "k2r" ? q.prompt : q.correct
  const highlight = highlightSentence(q.sentence, highlightWord)

  return (
    <div className="max-w-xl mx-auto px-4 py-6 sm:py-8">
      {/* Header + segmented progress */}
      <div className="flex items-center justify-between mb-4 animate-fade-up">
        <div>
          <h1 className="text-xl font-black text-ink">Set {setNum}</h1>
          <p className="text-xs text-ink/55 mt-0.5">
            Question {idx + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowJump(true)} className="btn btn-ghost h-9 px-3 text-xs">
            Jump to
          </button>
          <a href={`${prefix}/sets/`} className="btn btn-ghost h-9 px-3.5 text-xs">
            All sets
          </a>
        </div>
      </div>

      <div className="flex gap-1 mb-6" aria-hidden="true">
        {questions.map((qq, i) => {
          const a = answers[i]
          return (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i === idx
                  ? "bg-ink scale-y-[1.4]"
                  : a === null
                    ? "bg-ink/10"
                    : a === qq.correct
                      ? "bg-emerald-500"
                      : "bg-vermilion"
              }`}
            />
          )
        })}
      </div>

      {/* Question card — keyed so each question animates in */}
      <div key={idx} className="card p-4 sm:p-6 shadow-lg shadow-ink/5 animate-fade-up">
        <div className="rounded-xl bg-ink/[0.03] border border-ink/8 px-4 py-3.5 mb-4 text-sm sm:text-base leading-relaxed text-ink font-jp">
          {highlight.before}
          <span className={isAnswered ? "font-bold text-vermilion" : "font-bold underline decoration-2 decoration-vermilion/50 underline-offset-4"}>
            {highlight.target}
          </span>
          {highlight.after}
        </div>

        <p className="text-xs sm:text-sm text-ink/60 mb-3 font-medium">
          {q.qType === "k2r" ? (
            <>How do you read <span className="font-jp font-bold text-ink">{q.prompt}</span>?</>
          ) : (
            <>Which kanji is read <span className="font-bold text-ink">{q.prompt}</span>?</>
          )}
        </p>

        <div className="space-y-2">
          {q.options.map((opt, oi) => {
            const isCorrectOpt = isAnswered && opt === q.correct
            const isWrongPick = isAnswered && opt === selected && opt !== q.correct

            let cls =
              "w-full min-h-[48px] rounded-xl border px-4 flex items-center gap-3 text-left transition-all duration-200 "
            if (isCorrectOpt) {
              cls += "border-emerald-500 bg-emerald-500/10 text-ink font-bold animate-pop "
            } else if (isWrongPick) {
              cls += "border-vermilion bg-vermilion/5 text-ink/70 animate-shake "
            } else if (isAnswered) {
              cls += "border-ink/8 opacity-45 "
            } else {
              cls += "border-ink/12 bg-white hover:border-ink/35 hover:-translate-y-0.5 hover:shadow-md hover:shadow-ink/5 active:scale-[0.98] cursor-pointer "
            }

            return (
              <button key={opt} className={cls} onClick={() => select(opt)} disabled={isAnswered}>
                <span
                  className={`w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 ${
                    isCorrectOpt
                      ? "bg-emerald-500 text-white"
                      : isWrongPick
                        ? "bg-vermilion text-white"
                        : "bg-ink/5 text-ink/45"
                  }`}
                >
                  {isCorrectOpt ? "✓" : isWrongPick ? "✕" : oi + 1}
                </span>
                <span className="text-sm sm:text-base font-jp">{opt}</span>
              </button>
            )
          })}
        </div>

        {/* Feedback + next */}
        {isAnswered && (
          <div className="mt-4 animate-fade-up">
            <div className="rounded-xl bg-ink/[0.03] border border-ink/8 px-4 py-3 text-[13px] text-ink/70 flex items-start justify-between gap-3">
              <span>
                {q.sentenceEnglish}
                <a
                  href={`${prefix}/study/${q.kanji}/`}
                  className="ml-2 text-vermilion font-semibold hover:underline whitespace-nowrap"
                >
                  study {q.kanji} →
                </a>
              </span>
            </div>
            <button
              onClick={advance}
              className={`btn w-full h-12 mt-3 text-sm ${
                selected === q.correct ? "btn-primary" : "btn-accent"
              }`}
            >
              {idx < questions.length - 1 ? "Next question →" : "See results 🎉"}
            </button>
          </div>
        )}
      </div>

      <p className="text-[11px] text-ink/35 text-center mt-4 hidden sm:block">
        keys 1–4 = answer · enter = next
      </p>

      {/* Jump-to-set overlay */}
      {showJump && (
        <JumpSetOverlay setNum={setNum} prefix={prefix} onClose={() => setShowJump(false)} />
      )}
    </div>
  )
}
