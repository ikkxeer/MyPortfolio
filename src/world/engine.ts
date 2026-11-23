import * as T from 'three'
import { makeSky } from '../environment/sky'
import { makeIris } from './iris'
import { anchors, destinations } from '../data/village'
import { createVisitor, createGuide } from './character'
import { makeInterior } from './interior'
import { createScenery } from './scenery'
import { walkable, route, type Point } from './navigation'
import type {
  Target,
  VillageEvents,
  VillageController,
  VillageView,
} from './contracts'

export function startVillage(
  canvas: HTMLCanvasElement,
  events: VillageEvents,
  view: VillageView,
): VillageController {
  const low = window.innerWidth < 760 || navigator.hardwareConcurrency <= 4
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  const iris = makeIris(view.iris, motion)
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
  guide.group.position.set(1, 0, 8.3)
  guide.group.scale.setScalar(1.4)
  guide.group.userData.zone = 'npc'
  scene.add(scenery.group, visitor.group, guide.group)
  visitor.group.position.set(2.5, -0.06, 11.6)
  visitor.group.scale.setScalar(1.33)
  const outdoorPickables = [...scenery.interactives, guide.group]
  const room = makeInterior()
  let inside = false
  let snapCamera = false
  const doorstep = new T.Vector3()
  const getPickables = () => (inside ? room.interactives : outdoorPickables)
  const canWalk = (x: number, z: number) =>
    inside
      ? Math.abs(x) < 3.6 &&
        Math.abs(z) < 2.62 &&
        !(x < -2.38 && z > -1.7 && z < 0.83) &&
        !(x > 1.72 && z < -1.65) &&
        Math.hypot(x - 0.12, z + 1.62) > 0.58
      : walkable(x, z)
  function setInside(value: boolean) {
    if (inside === value) return
    if (value) doorstep.copy(visitor.group.position)
    inside = value
    snapCamera = true
    const destination = value ? room.scene : scene
    destination.add(visitor.group)
    if (value) visitor.group.position.set(0, 0, 1.16)
    else visitor.group.position.copy(doorstep)
    visitor.group.rotation.y = value ? Math.PI : 0
    goal = []
    keys.clear()
    stick.set(0, 0)
    setHover(null)
    updateReach()
    events.inside(value)
  }
  const ray = new T.Raycaster(),
    pointer = new T.Vector2(),
    point = new T.Vector3()
  const plane = new T.Plane(new T.Vector3(0, 1, 0), 0)
  const nearestPoint = new T.Vector3()
  const projected = new T.Vector3()
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
  const exhibitHalo = new T.Mesh(
    new T.TorusGeometry(0.84, 0.038, 8, 42),
    new T.MeshBasicMaterial({
      color: '#ffe799',
      transparent: true,
      opacity: 0.98,
    }),
  )
  exhibitHalo.rotation.x = -Math.PI / 2
  exhibitHalo.visible = false
  const guideMarker = new T.Mesh(
    new T.OctahedronGeometry(0.14),
    new T.MeshBasicMaterial({ color: '#fff2bc' }),
  )
  guideMarker.position.y = 1.34
  guide.group.add(guideMarker)
  scene.add(ring, exhibitHalo)
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
    reach: Target | null = null,
    project: number | undefined
  let goal: Point[] = [],
    elapsed = 0,
    arrivalTime = 0,
    last = 0,
    night = atmosphere.update(new Date()),
    lastLight = 0,
    lastHud = -1,
    frame = 0,
    dead = false
  let hovered: T.Object3D | null = null,
    nearObject: T.Object3D | null = null
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
      ray.intersectObjects(getPickables(), true)[0]?.object ?? null
    while (o && !o.userData.zone) o = o.parent
    return o
  }
  function setHover(o: T.Object3D | null) {
    if (hovered === o) return
    hovered = o
    const zone: Target | null = o?.userData.zone ?? null
    events.hover(zone, o?.userData.project)
    canvas.style.cursor = zone ? 'pointer' : 'crosshair'
  }
  canvas.addEventListener(
    'pointermove',
    (e) => {
      if (!paused && !iris.active() && e.pointerType !== 'touch')
        setHover(resolve(e))
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
      if (
        paused ||
        iris.active() ||
        e.button !== 0 ||
        Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 12
      )
        return
      const o = resolve(e)
      if (o) {
        activate(o.userData.zone, o.userData.project)
        return
      }
      if (ray.ray.intersectPlane(plane, point))
        goal = inside
          ? canWalk(point.x, point.z)
            ? [[point.x, point.z]]
            : []
          : route(
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
      if (!paused && !iris.active()) {
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
  function crossDoor(
    enter: boolean,
    afterSwap?: () => void,
    arrived?: () => void,
  ) {
    if (iris.active() || enter === inside) return
    arrivalTime = 3.5
    goal = []
    keys.clear()
    stick.set(0, 0)
    setHover(null)
    iris.start(() => {
      if (enter) {
        const [x, z] = destinations.about
        visitor.group.position.set(x, 0, z)
      }
      setInside(enter)
      afterSwap?.()
    }, arrived)
  }
  function activate(target: Target, exhibit?: number) {
    arrivalTime = 3.5
    if (target === 'exit') crossDoor(false)
    else if (target === 'about' && !inside) crossDoor(true)
    else events.open(target, exhibit)
  }
  function interact() {
    if (!paused && !iris.active() && reach) activate(reach, project)
  }
  window.addEventListener(
    'keydown',
    (e) => {
      if (
        paused ||
        iris.active() ||
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
  function updateReach(force = true) {
    const previous = nearObject
    const p = visitor.group.position
    let best = Infinity
    reach = null
    project = undefined
    nearObject = null
    for (const o of getPickables()) {
      const zone = o.userData.zone as Target
      if (!zone) continue
      o.getWorldPosition(nearestPoint)
      const dx = p.x - nearestPoint.x,
        dz = p.z - nearestPoint.z,
        dist = Math.hypot(dx, dz)
      const limit = inside
        ? 1.45
        : zone === 'projects' ||
            zone === 'npc' ||
            zone === 'map' ||
            zone === 'contact'
          ? 1.8
          : 3.5
      if (dist <= limit && dist < best) {
        nearObject = o
        reach = zone
        best = dist
        project = o.userData.project
      }
    }
    if (force || previous !== nearObject)
      events.position(
        inside ? doorstep.x : p.x,
        inside ? doorstep.z : p.z,
        reach,
        project,
      )
  }
  function tick(stamp: number) {
    if (dead || document.hidden) return
    frame = requestAnimationFrame(tick)
    if (last && stamp - last < (paused && !iris.active() ? 100 : low ? 31 : 15))
      return
    iris.advance(stamp)
    const dt = Math.min(0.14, Math.max(0, (stamp - (last || stamp)) / 1000))
    last = stamp
    elapsed += dt
    if (!paused) arrivalTime += dt
    if (stamp - lastLight > 8000) {
      night = atmosphere.update(new Date())
      lastLight = stamp
    }
    const p = visitor.group.position
    let distance = 0
    if (!paused && !iris.active()) {
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
      } else {
        while (
          goal.length > 1 &&
          Math.hypot(goal[0][0] - p.x, goal[0][1] - p.z) < 0.13
        )
          goal.shift()
        if (goal.length) {
          step.set(goal[0][0] - p.x, goal[0][1] - p.z)
          if (step.length() < 0.055) {
            goal.shift()
            step.set(0, 0)
          }
        }
      }
      if (step.lengthSq() > 0.0001) {
        const pace = inside ? 2.8 : 3.2
        const travel = goal.length
          ? Math.min(step.length(), dt * pace)
          : dt * pace
        step.setLength(travel)
        const ox = p.x,
          oz = p.z
        if (canWalk(p.x + step.x, p.z)) p.x += step.x
        if (canWalk(p.x, p.z + step.y)) p.z += step.y
        step.set(p.x - ox, p.z - oz)
        distance = step.length()
        if (distance < 0.0002) goal = []
        if (distance > 0.0002) {
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
    p.y = inside
      ? 0.09
      : bridge
        ? 0.22
        : p.z > 9.95
          ? -0.06
          : p.x < -3.55 && p.x > -8.55 && p.z > 2.6 && p.z < 6.15
            ? 0.08
            : 0
    visitor.animate(elapsed, distance > 0.0002, motion.matches, distance)
    guide.animate(elapsed, false, motion.matches)
    scenery.animate(elapsed, night, p.x, p.z, motion.matches)
    if (!motion.matches) atmosphere.animate(elapsed)
    if (
      hovered &&
      !paused &&
      !iris.active() &&
      hovered.userData.zone !== 'projects'
    ) {
      hovered.getWorldPosition(nearestPoint)
      ring.visible = true
      ring.position.set(nearestPoint.x, 0.1, nearestPoint.z)
      ring.scale.setScalar(1.7)
    } else {
      ring.scale.setScalar(1)
      if (!goal.length) ring.visible = false
    }
    const intro =
      motion.matches || inside
        ? 1
        : T.MathUtils.smoothstep(arrivalTime, 0.15, 3.5)
    const aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight)
    const closeToPlaza =
      1 - T.MathUtils.smoothstep(Math.hypot(p.x + 5.7, p.z - 4.6), 2.6, 7.9)
    const follow = aspect < 0.9 ? 0.81 : 0.53 + 0.16 * closeToPlaza
    desired.set(
      inside ? 0 : p.x * follow * intro,
      inside ? 0.55 : 0,
      inside ? 0 : p.z * 0.65 * intro,
    )
    focus.lerp(
      desired,
      motion.matches || inside || snapCamera ? 1 : 1 - Math.exp(-dt * 3),
    )
    snapCamera = false
    const streetSpan =
      aspect < 0.9 ? 10.15 - closeToPlaza * 1.3 : 8.25 - closeToPlaza * 1.15
    const span = inside
      ? (aspect < 0.9 ? 6 : 4.2) / zoom
      : streetSpan / zoom + (1 - intro) * (aspect < 0.9 ? 14 : 8)
    const orbit = (1 - intro) * 1.05
    cameraOffset.set(
      8 * Math.cos(orbit) - 27 * Math.sin(orbit),
      19 + 16 * (1 - intro),
      27 * Math.cos(orbit) + 8 * Math.sin(orbit),
    )
    camera.left = -span * aspect
    camera.right = span * aspect
    camera.top = span
    camera.bottom = -span
    camera.position.copy(focus).add(cameraOffset)
    camera.lookAt(focus)
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld()
    view.signs.forEach((sign, index) => {
      if (!sign) return
      const [x, z] = index === 0 ? anchors.tech : anchors.npc
      projected.set(x, index === 0 ? 3.46 : 2.1, z).project(camera)
      const visible =
        !inside &&
        !paused &&
        !iris.active() &&
        intro > 0.78 &&
        Math.abs(projected.x) < 0.87 &&
        Math.abs(projected.y) < 0.79
      sign.hidden = !visible
      if (visible)
        sign.style.transform = `translate(${((projected.x + 1) * canvas.clientWidth) / 2}px,${((1 - projected.y) * canvas.clientHeight) / 2}px) translate(-50%,-100%)`
    })
    const reportPosition = elapsed - lastHud > 0.17
    if (reportPosition) lastHud = elapsed
    updateReach(reportPosition)
    const activeExhibit =
      reach === 'projects'
        ? nearObject
        : hovered?.userData.zone === 'projects'
          ? hovered
          : null
    exhibitHalo.visible =
      !!activeExhibit && !inside && !paused && !iris.active()
    if (activeExhibit && exhibitHalo.visible) {
      const { x, z } = activeExhibit.position
      exhibitHalo.position.set(x, 0.135, z)
      exhibitHalo.material.opacity = motion.matches
        ? 0.98
        : 0.89 + 0.09 * Math.cos(elapsed * 4)
      projected.set(x, 1.89, z).project(camera)
      if (view.exhibit) {
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const safeMargin = Math.min(159, width * 0.43)
        const labelX = T.MathUtils.clamp(
          ((projected.x + 1) * width) / 2,
          safeMargin,
          width - safeMargin,
        )
        const labelY = T.MathUtils.clamp(
          ((1 - projected.y) * height) / 2,
          Math.min(130, height * 0.36),
          height * 0.81,
        )
        view.exhibit.style.transform = `translate(${labelX}px,${labelY}px) translate(-50%,-100%)`
        view.exhibit.hidden = false
      }
    } else if (view.exhibit) view.exhibit.hidden = true
    if (iris.active()) {
      projected
        .copy(p)
        .addScaledVector(T.Object3D.DEFAULT_UP, 0.92)
        .project(camera)
      const width = canvas.clientWidth,
        height = canvas.clientHeight
      iris.draw(
        T.MathUtils.clamp(((projected.x + 1) * width) / 2, 0, width),
        T.MathUtils.clamp(((1 - projected.y) * height) / 2, 0, height),
        width,
        height,
      )
    }
    renderer.render(inside ? room.scene : scene, camera)
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
    zoom(delta) {
      if (!iris.active()) changeZoom(delta)
    },
    transitioning: iris.active,
    leave() {
      crossDoor(false)
    },
    travel(id, arrived) {
      if (iris.active()) return
      arrivalTime = 3.5
      if (id === 'about') {
        if (!inside) crossDoor(true, undefined, arrived)
        return
      }
      const move = () => {
        const [x, z] = destinations[id]
        visitor.group.position.set(x, 0, z)
        goal = []
        keys.clear()
        stick.set(0, 0)
        snapCamera = true
        setHover(null)
        visitor.group.rotation.y = Math.atan2(
          anchors[id][0] - x,
          anchors[id][1] - z,
        )
        updateReach()
      }
      if (inside) crossDoor(false, move, arrived)
      else {
        move()
        arrived?.()
      }
    },
    touch(x, y) {
      if (!iris.active()) stick.set(x, y)
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
      const collect = (root: T.Scene) =>
        root.traverse((o) => {
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
      collect(scene)
      collect(room.scene)
      textures.forEach((t) => t.dispose())
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      renderer.dispose()
    },
  }
}
