import { useEffect, useRef } from "react"

interface Particle {
  x: number; y: number; vx: number; vy: number
  r: number; color: string; rotation: number; rotV: number
  life: number; maxLife: number; shape: "circle" | "rect"
}

const COLORS = ["#d9482f", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316"]

function burst(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const particles: Particle[] = []
  const count = 100 + Math.floor(Math.random() * 60)
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 2 + Math.random() * 6
    particles.push({
      x: w / 2 + (Math.random() - 0.5) * 60,
      y: h / 2 + (Math.random() - 0.5) * 60,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      r: 3 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 10,
      life: 0,
      maxLife: 80 + Math.random() * 60,
      shape: Math.random() > 0.5 ? "circle" : "rect",
    })
  }

  let animId = 0
  function frame() {
    ctx.clearRect(0, 0, w, h)
    let alive = false
    for (const p of particles) {
      if (p.life >= p.maxLife) continue
      alive = true
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.08
      p.vx *= 0.99
      p.rotation += p.rotV
      p.life++
      const alpha = Math.max(0, 1 - p.life / p.maxLife)
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color
      if (p.shape === "circle") {
        ctx.beginPath()
        ctx.arc(0, 0, p.r, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6)
      }
      ctx.restore()
    }
    if (alive) animId = requestAnimationFrame(frame)
  }
  animId = requestAnimationFrame(frame)
  return () => cancelAnimationFrame(animId)
}

export default function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!active) return
    const cvs = canvasRef.current
    if (!cvs) return
    cleanupRef.current?.()
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight
    const ctx = cvs.getContext("2d")
    if (!ctx) return
    cleanupRef.current = burst(ctx, cvs.width, cvs.height)
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  )
}
