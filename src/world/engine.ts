import * as T from 'three'
import { makeSky } from '../environment/sky'
import { anchors, destinations, type Place } from '../data/village'
import { createVisitor, createGuide } from './character'
import { createScenery } from './scenery'
import { walkable, route, type Point } from './navigation'
import type { VillageEvents, VillageController } from './contracts'

export function startVillage(
  canvas: HTMLCanvasElement,
  events: VillageEvents,
): VillageController {
  const low = window.innerWidth < 760 || navigator.hardwareConcurrency <= 4
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  const renderer = new T.WebGLRenderer({
    canvas,
    antialias: !low,
    powerPreference: 'default',
  })
  renderer.setPixelRatio(Math.min(devicePixelRatio, low ? 1.25 : 1.65))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = T.PCFShadowMap
  renderer.outputColorSpace = T.SRGBColorSpace
  renderer.toneMapping = T.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.08
  const scene = new T.Scene(),
    camera = new T.OrthographicCamera(-20, 20, 14, -14, 0.1, 160)
  const atmosphere = makeSky(scene, low)
  const scenery = createScenery(low),
    visitor = createVisitor(),
    guide = createGuide()
  guide.group.position.set(-1, 0, 3.8)
  guide.group.userData.zone = 'npc'
  scene.add(scenery.group, visitor.group, guide.group)
  visitor.group.position.set(2.5, -0.06, 11.6)
  const pickables = [...scenery.interactives, guide.group]
  const ray = new T.Raycaster(),
    pointer = new T.Vector2(),
    point = new T.Vector3()
  const plane = new T.Plane(new T.Vector3(0, 1, 0), 0)
  const nearestPoint = new T.Vector3()
  const ring = new T.Mesh(
    new T.RingGeometry(0.35, 0.43, 35),
    new T.MeshBasicMaterial({
      color: '#fff1a3',
      transparent: true,
      opacity: 0.86,
      side: T.DoubleSide,
      depthWrite: false,
    }),
  )
  ring.rotation.x = -Math.PI / 2
  ring.visible = false
  scene.add(ring)
  const focus = new T.Vector3(0, 0, 0),
    desired = new T.Vector3(),
    cameraOffset = new T.Vector3(8, 19, 27)
  const keys = new Set<string>(),
    stick = new T.Vector2()
  const right = new T.Vector2(27, -8).normalize(),
    forward = new T.Vector2(-8, -27).normalize(),
    step = new T.Vector2()
  let paused = false,
    zoom = 1,
    reach: Place | null = null,
    project: number | undefined
  let goal: Point[] = [],
    elapsed = 0,
    last = 0,
    night = atmosphere.update(new Date()),
    lastLight = 0,
    lastHud = -1,
    frame = 0,
    dead = false
  let hovered: T.Object3D | null = null,
    hovering: Place | null = null
  const resize = () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    camera.updateProjectionMatrix()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  resize()
  const signal = new AbortController()
  function resolve(e: PointerEvent) {
    const box = canvas.getBoundingClientRect()
    pointer.set(
      ((e.clientX - box.left) / box.width) * 2 - 1,
      (-(e.clientY - box.top) / box.height) * 2 + 1,
    )
    ray.setFromCamera(pointer, camera)
    let o: T.Object3D | null =
      ray.intersectObjects(pickables, true)[0]?.object ?? null
    while (o && !o.userData.zone) o = o.parent
    return o
  }
  function setHover(o: T.Object3D | null) {
    if (hovered && hovered !== o) hovered.scale.setScalar(1)
    if (o) o.scale.setScalar(1.025)
    hovered = o
    const zone: Place | null = o?.userData.zone ?? null
    if (zone !== hovering) {
      hovering = zone
      events.hover(zone)
      canvas.style.cursor = zone ? 'pointer' : 'crosshair'
    }
  }
  canvas.addEventListener(
    'pointermove',
    (e) => {
      if (!paused && e.pointerType !== 'touch') setHover(resolve(e))
    },
    { signal: signal.signal },
  )
  canvas.addEventListener('pointerleave', () => setHover(null), {
    signal: signal.signal,
  })
  let down: [number, number] = [0, 0]
  canvas.addEventListener(
    'pointerdown',
    (e) => {
      down = [e.clientX, e.clientY]
    },
    { signal: signal.signal },
  )
  canvas.addEventListener(
    'pointerup',
    (e) => {
      if (paused || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 12)
        return
      const o = resolve(e)
      if (o) {
        events.open(o.userData.zone, o.userData.project)
        return
      }
      if (ray.ray.intersectPlane(plane, point))
        goal = route(
          [visitor.group.position.x, visitor.group.position.z],
          [point.x, point.z],
        )
      if (goal.length) {
        ring.position.set(point.x, 0.09, point.z)
        ring.visible = true
      }
    },
    { signal: signal.signal },
  )
  const changeZoom = (n: number) => {
    zoom = T.MathUtils.clamp(zoom + n, 0.7, 1.65)
  }
  canvas.addEventListener(
    'wheel',
    (e) => {
      if (!paused) {
        e.preventDefault()
        changeZoom(-Math.sign(e.deltaY) * 0.09)
      }
    },
    { passive: false, signal: signal.signal },
  )
  const movement = [
    'KeyA',
    'KeyD',
    'KeyW',
    'KeyS',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
  ]
  function interact() {
    if (!paused && reach) events.open(reach, project)
  }
  window.addEventListener(
    'keydown',
    (e) => {
      if (
        paused ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.target instanceof HTMLSelectElement
      )
        return
      if (movement.includes(e.code)) {
        e.preventDefault()
        keys.add(e.code)
      }
      if (e.code === 'KeyE' && !e.repeat) interact()
      if (e.code === 'Equal') changeZoom(0.1)
      if (e.code === 'Minus') changeZoom(-0.1)
    },
    { signal: signal.signal },
  )
  window.addEventListener('keyup', (e) => keys.delete(e.code), {
    signal: signal.signal,
  })
  window.addEventListener(
    'blur',
    () => {
      keys.clear()
      stick.set(0, 0)
    },
    { signal: signal.signal },
  )
  canvas.addEventListener(
    'webglcontextlost',
    (e) => {
      e.preventDefault()
      events.fail()
    },
    { signal: signal.signal },
  )
  function updateReach() {
    const p = visitor.group.position
    let best = Infinity
    reach = null
    project = undefined
    for (const o of pickables) {
      const zone = o.userData.zone as Place
      if (!zone) continue
      o.getWorldPosition(nearestPoint)
      const dx = p.x - nearestPoint.x,
        dz = p.z - nearestPoint.z,
        dist = Math.hypot(dx, dz)
      const limit =
        zone === 'projects' ||
        zone === 'npc' ||
        zone === 'map' ||
        zone === 'contact'
          ? 1.8
          : 3.5
      if (dist <= limit && dist < best) {
        reach = zone
        best = dist
        project = o.userData.project
      }
    }
    events.position(p.x, p.z, reach)
  }
  function tick(stamp: number) {
    if (dead || document.hidden) return
    frame = requestAnimationFrame(tick)
    if (last && stamp - last < (paused ? 100 : low ? 31 : 15)) return
    const dt = Math.min(0.06, Math.max(0, (stamp - (last || stamp)) / 1000))
    last = stamp
    elapsed += dt
    if (stamp - lastLight > 8000) {
      night = atmosphere.update(new Date())
      lastLight = stamp
    }
    const p = visitor.group.position
    let moving = false
    if (!paused) {
      const dx =
        Number(keys.has('KeyD') || keys.has('ArrowRight')) -
        Number(keys.has('KeyA') || keys.has('ArrowLeft')) +
        stick.x
      const dz =
        Number(keys.has('KeyW') || keys.has('ArrowUp')) -
        Number(keys.has('KeyS') || keys.has('ArrowDown')) -
        stick.y
      step.copy(right).multiplyScalar(dx).addScaledVector(forward, dz)
      if (step.lengthSq() > 0.001) {
        goal = []
        ring.visible = false
      } else if (goal.length) {
        const g = goal[0]
        step.set(g[0] - p.x, g[1] - p.z)
        if (step.length() < 0.1) {
          goal.shift()
          step.set(0, 0)
          if (!goal.length) ring.visible = false
        }
      }
      if (step.lengthSq() > 0.0001) {
        step
          .normalize()
          .multiplyScalar(
            goal.length
              ? Math.min(
                  dt * 3.7,
                  Math.hypot(goal[0][0] - p.x, goal[0][1] - p.z),
                )
              : dt * 3.7,
          )
        const ox = p.x,
          oz = p.z
        if (walkable(p.x + step.x, p.z)) p.x += step.x
        if (walkable(p.x, p.z + step.y)) p.z += step.y
        moving = Math.abs(p.x - ox) + Math.abs(p.z - oz) > 0.0002
        if (!moving) goal = []
        if (moving) {
          const target = Math.atan2(step.x, step.y),
            rot = visitor.group.rotation.y
          visitor.group.rotation.y +=
            Math.atan2(Math.sin(target - rot), Math.cos(target - rot)) *
            Math.min(1, dt * 14)
        }
      }
    }
    const bridge =
      Math.abs(p.x + 2.5) < 1.4 &&
      (Math.abs(p.z - 1) < 0.85 || Math.abs(p.z - 6.5) < 0.85)
    p.y = bridge
      ? 0.22
      : p.z > 9.95
        ? -0.06
        : p.x < -3.55 && p.x > -8.55 && p.z > 2.6 && p.z < 6.15
          ? 0.08
          : 0
    visitor.animate(elapsed, moving, motion.matches)
    guide.animate(elapsed, false, motion.matches)
    scenery.animate(elapsed, night, p.x, p.z, motion.matches)
    if (!motion.matches) atmosphere.animate(elapsed)
    if (hovered && !paused) {
      hovered.getWorldPosition(nearestPoint)
      ring.visible = true
      ring.position.set(nearestPoint.x, 0.1, nearestPoint.z)
      ring.scale.setScalar(1.7)
    } else {
      ring.scale.setScalar(1)
      if (!goal.length) ring.visible = false
    }
    desired.set(p.x * 0.53, 0, p.z * 0.5)
    focus.lerp(desired, motion.matches ? 1 : 1 - Math.exp(-dt * 3))
    const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight)
    const intro = motion.matches ? 1 : Math.min(1, elapsed / 2.3)
    const span = (aspect < 0.9 ? 10.9 : 8.8) / zoom + (1 - intro) ** 2 * 5
    camera.left = -span * aspect
    camera.right = span * aspect
    camera.top = span
    camera.bottom = -span
    camera.position.copy(focus).add(cameraOffset)
    camera.lookAt(focus)
    camera.updateProjectionMatrix()
    if (elapsed - lastHud > 0.17) {
      lastHud = elapsed
      updateReach()
    }
    renderer.render(scene, camera)
  }
  document.addEventListener(
    'visibilitychange',
    () => {
      cancelAnimationFrame(frame)
      keys.clear()
      stick.set(0, 0)
      last = 0
      if (!document.hidden) {
        night = atmosphere.update(new Date())
        frame = requestAnimationFrame(tick)
      }
    },
    { signal: signal.signal },
  )
  frame = requestAnimationFrame(tick)
  return {
    pause(value) {
      paused = value
      keys.clear()
      stick.set(0, 0)
      goal = []
      setHover(null)
    },
    zoom: changeZoom,
    travel(id) {
      const [x, z] = destinations[id]
      visitor.group.position.set(x, 0, z)
      goal = []
      visitor.group.rotation.y = Math.atan2(
        anchors[id][0] - x,
        anchors[id][1] - z,
      )
      updateReach()
    },
    touch(x, y) {
      stick.set(x, y)
    },
    interact,
    dispose() {
      dead = true
      cancelAnimationFrame(frame)
      signal.abort()
      observer.disconnect()
      const geometries = new Set<T.BufferGeometry>(),
        materials = new Set<T.Material>(),
        textures = new Set<T.Texture>()
      scene.traverse((o) => {
        if (o instanceof T.Mesh || o instanceof T.Points) {
          geometries.add(o.geometry)
          for (const m of [o.material].flat()) {
            materials.add(m)
            for (const v of Object.values(m))
              if (v instanceof T.Texture) textures.add(v)
          }
          if (o instanceof T.InstancedMesh) o.dispose()
        }
      })
      textures.forEach((t) => t.dispose())
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      renderer.dispose()
    },
  }
}
