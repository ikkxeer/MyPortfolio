import { useEffect, useRef } from 'react'
import { exhibitColors } from '../data/exhibits'
import ProjectIcon from './ProjectIcon'
import type { CSSProperties, RefObject } from 'react'
import type { VillageEvents, VillageController } from '../world/contracts'
export default function Game({
  controller,
  events,
  ready,
  paused,
  workshop,
  guide,
  exhibit,
  openLabel,
}: {
  controller: RefObject<VillageController | null>
  events: VillageEvents
  ready: () => void
  paused: boolean
  workshop: string
  guide: string
  exhibit?: { index: number; name: string; tags: string[]; nearby: boolean }
  openLabel: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null),
    blocked = useRef(paused)
  const workshopSign = useRef<HTMLSpanElement>(null)
  const guideSign = useRef<HTMLSpanElement>(null)
  const exhibitSign = useRef<HTMLDivElement>(null)
  const iris = useRef<HTMLDivElement>(null)
  useEffect(() => {
    blocked.current = paused
    controller.current?.pause(paused)
  }, [controller, paused])
  useEffect(() => {
    let active = true
    import('../world/engine')
      .then(({ startVillage }) => {
        if (!active || !canvas.current) return
        controller.current = startVillage(canvas.current, events, {
          signs: [workshopSign.current, guideSign.current],
          exhibit: exhibitSign.current,
          iris: iris.current,
        })
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
      <div className="house-iris" ref={iris} hidden aria-hidden="true" />
      <div className="exhibit-anchor" ref={exhibitSign} hidden>
        {exhibit && (
          <div
            className="exhibit-preview"
            style={
              {
                '--exhibit-color': exhibitColors[exhibit.index],
              } as CSSProperties
            }
          >
            <span className="exhibit-emblem">
              <ProjectIcon index={exhibit.index} size={26} />
            </span>
            <span className="exhibit-caption">
              <strong>{exhibit.name}</strong>
              <small>{exhibit.tags.join(' · ')}</small>
            </span>
            {exhibit.nearby && (
              <button
                className="exhibit-open"
                onClick={() => controller.current?.interact()}
                aria-label={openLabel + ' ' + exhibit.name}
              >
                <kbd>E</kbd>
                <span>{openLabel}</span>
              </button>
            )}
          </div>
        )}
      </div>
      <span className="world-sign" ref={workshopSign} hidden aria-hidden="true">
        {workshop}
      </span>
      <span className="world-sign" ref={guideSign} hidden aria-hidden="true">
        {guide}
      </span>
    </>
  )
}
