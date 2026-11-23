import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import type { VillageEvents, VillageController } from '../world/contracts'
export default function Game({
  controller,
  events,
  ready,
  paused,
}: {
  controller: RefObject<VillageController | null>
  events: VillageEvents
  ready: () => void
  paused: boolean
}) {
  const canvas = useRef<HTMLCanvasElement>(null),
    blocked = useRef(paused)
  useEffect(() => {
    blocked.current = paused
    controller.current?.pause(paused)
  }, [controller, paused])
  useEffect(() => {
    let active = true
    import('../world/engine')
      .then(({ startVillage }) => {
        if (!active || !canvas.current) return
        controller.current = startVillage(canvas.current, events)
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
  return <canvas ref={canvas} className="game-canvas" aria-hidden="true" />
}
