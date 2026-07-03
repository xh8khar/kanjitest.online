// Hiragana → Katakana via code-point shift (+0x60)
const HIRAGANA_START = 0x3041
const HIRAGANA_END = 0x3096
const SHIFT = 0x60 // カタカナ - ひらがな

export function toKatakana(hira: string): string {
  return [...hira]
    .map((ch) => {
      const cp = ch.codePointAt(0)!
      if (cp >= HIRAGANA_START && cp <= HIRAGANA_END) {
        return String.fromCodePoint(cp + SHIFT)
      }
      return ch
    })
    .join("")
}
