import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import type { VillageEvents, VillageController } from '../world/contracts'
export default function Game({
  controller,
  events,
  ready,
  paused,
  workshop,
  guide,
}: {
  controller: RefObject<VillageController | null>
  events: VillageEvents
  ready: () => void
  paused: boolean
  workshop: string
  guide: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null),
    blocked = useRef(paused)
  const workshopSign = useRef<HTMLSpanElement>(null)
  const guideSign = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    blocked.current = paused
    controller.current?.pause(paused)
  }, [controller, paused])
  useEffect(() => {
    let active = true
    import('../world/engine')
      .then(({ startVillage }) => {
        if (!active || !canvas.current) return
        controller.current = startVillage(canvas.current, events, [
          workshopSign.current,
          guideSign.current,
        ])
        controller.current.pause(blocked.current)
        ready()
      })
      .catch(() => {
        if (active) events.fail()
      })
    return () => {
      active = false
      controller.current?.dispose()
      controller.current = null
    }
  }, [controller, events, ready])
  return (
    <>
      <canvas ref={canvas} className="game-canvas" aria-hidden="true" />
      <span className="world-sign" ref={workshopSign} hidden aria-hidden="true">
        {workshop}
      </span>
      <span className="world-sign" ref={guideSign} hidden aria-hidden="true">
        {guide}
      </span>
    </>
  )
}
