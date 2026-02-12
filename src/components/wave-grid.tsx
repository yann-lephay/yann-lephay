'use client'

import { useEffect, useRef, useCallback } from 'react'

const GRID_SIZE = 60
const WAVE_RADIUS = 180
const WAVE_STRENGTH = 14
const GRID_COLOR = '#27272A'
const WAVE_COLOR_R = 244
const WAVE_COLOR_G = 162
const WAVE_COLOR_B = 97

export function WaveGrid({ className, fade }: { className?: string; fade?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const targetMouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr

    const current = mouseRef.current
    const target = targetMouseRef.current
    current.x += (target.x - current.x) * 0.15
    current.y += (target.y - current.y) * 0.15

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = dpr

    const cols = Math.ceil(w / GRID_SIZE) + 2
    const rows = Math.ceil(h / GRID_SIZE) + 2

    const mx = current.x
    const my = current.y
    const radiusSq = WAVE_RADIUS * WAVE_RADIUS

    const points: { x: number; y: number }[][] = []
    for (let row = 0; row < rows; row++) {
      points[row] = []
      for (let col = 0; col < cols; col++) {
        const baseX = col * GRID_SIZE
        const baseY = row * GRID_SIZE

        const dx = baseX - mx
        const dy = baseY - my
        const distSq = dx * dx + dy * dy

        let px = baseX
        let py = baseY

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq)
          const factor = 1 - dist / WAVE_RADIUS
          const wave = Math.sin(dist * 0.04 - Date.now() * 0.003) * factor * factor
          const angle = Math.atan2(dy, dx)
          px += Math.cos(angle) * wave * WAVE_STRENGTH
          py += Math.sin(angle) * wave * WAVE_STRENGTH
        }

        points[row][col] = { x: px * dpr, y: py * dpr }
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 1; col++) {
        const p1 = points[row][col]
        const p2 = points[row][col + 1]

        const midX = (p1.x + p2.x) / (2 * dpr)
        const midY = (p1.y + p2.y) / (2 * dpr)
        const dx = midX - mx
        const dy = midY - my
        const distSq = dx * dx + dy * dy

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq)
          const t = Math.pow(1 - dist / WAVE_RADIUS, 1.5)
          const alpha = 0.15 + t * 0.6
          ctx.strokeStyle = `rgba(${WAVE_COLOR_R}, ${WAVE_COLOR_G}, ${WAVE_COLOR_B}, ${alpha})`
        } else {
          ctx.strokeStyle = GRID_COLOR
        }

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 1; row++) {
        const p1 = points[row][col]
        const p2 = points[row + 1][col]

        const midX = (p1.x + p2.x) / (2 * dpr)
        const midY = (p1.y + p2.y) / (2 * dpr)
        const dx = midX - mx
        const dy = midY - my
        const distSq = dx * dx + dy * dy

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq)
          const t = Math.pow(1 - dist / WAVE_RADIUS, 1.5)
          const alpha = 0.15 + t * 0.6
          ctx.strokeStyle = `rgba(${WAVE_COLOR_R}, ${WAVE_COLOR_G}, ${WAVE_COLOR_B}, ${alpha})`
        } else {
          ctx.strokeStyle = GRID_COLOR
        }

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const setupSize = () => {
      const dpr = window.devicePixelRatio || 1
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setupSize()

    const observer = new ResizeObserver(setupSize)
    const parent = canvas.parentElement
    if (parent) observer.observe(parent)

    const section = canvas.parentElement
    if (!section) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: -1000, y: -1000 }
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseleave', handleMouseLeave)

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        ...(fade ? { maskImage: 'linear-gradient(transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(transparent, black 15%, black 85%, transparent)' } : {}),
      }}
    />
  )
}
