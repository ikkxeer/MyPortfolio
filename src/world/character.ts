import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

interface IslandCharacter {
  group: THREE.Group
  /** Seconds since startup. Facing follows the outer group's local +Z axis. */
  animate: (
    time: number,
    moving: boolean,
    reduced: boolean,
    distance?: number,
  ) => void
}

type Vec3 = [number, number, number]

/** Bake differently painted details into one draw call per articulated part. */
function sculpt(material: THREE.Material) {
  const pieces: THREE.BufferGeometry[] = []

  function add(
    geometry: THREE.BufferGeometry,
    color: string,
    at: Vec3,
    size: Vec3,
    tilt: Vec3,
  ) {
    const transform = new THREE.Matrix4().compose(
      new THREE.Vector3(...at),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...tilt)),
      new THREE.Vector3(...size),
    )
    geometry.applyMatrix4(transform)
    const paint = new THREE.Color(color)
    const colors = new Float32Array(geometry.getAttribute('position').count * 3)
    for (let i = 0; i < colors.length; i += 3) paint.toArray(colors, i)
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.clearGroups()
    pieces.push(geometry)
  }

  return {
    oval(color: string, at: Vec3, size: Vec3, tilt: Vec3 = [0, 0, 0]) {
      add(new THREE.SphereGeometry(1, 16, 12), color, at, size, tilt)
    },
    turned(
      color: string,
      at: Vec3,
      profile: [number, number][],
      depth = 1,
      tilt: Vec3 = [0, 0, 0],
    ) {
      add(
        new THREE.LatheGeometry(
          profile.map(([r, y]) => new THREE.Vector2(r, y)),
          32,
        ),
        color,
        at,
        [1, 1, depth],
        tilt,
      )
    },
    mesh(parent: THREE.Object3D, at: Vec3 = [0, 0, 0]) {
      const combined = mergeGeometries(pieces)
      for (const part of pieces) part.dispose()
      pieces.length = 0
      const mesh = new THREE.Mesh(combined, material)
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.position.set(...at)
      parent.add(mesh)
      return mesh
    },
  }
}

function joint(parent: THREE.Object3D, x = 0, y = 0, z = 0) {
  const part = new THREE.Group()
  part.position.set(x, y, z)
  parent.add(part)
  return part
}

function clay() {
  return new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.86 })
}

const skin = '#edb287'
const hair = '#62412f'
const jacket = '#399489'
const boots = '#9b6442'
const ink = '#42332e'

export function createVisitor(): IslandCharacter {
  const group = new THREE.Group()
  const body = joint(group)
  const material = clay()
  const torso = sculpt(material)
  torso.oval('#41596a', [0, 0.43, 0], [0.18, 0.13, 0.145])
  torso.turned(
    jacket,
    [0, 0.42, 0],
    [
      [0, 0],
      [0.194, 0.012],
      [0.2, 0.07],
      [0.206, 0.22],
      [0.18, 0.28],
      [0.091, 0.3],
      [0, 0.3],
    ],
    0.8,
  )
  torso.oval('#f6d9a3', [0, 0.67, 0.125], [0.085, 0.062, 0.037])
  torso.oval(
    '#438779',
    [-0.063, 0.67, 0.15],
    [0.08, 0.038, 0.023],
    [0, 0, -0.45],
  )
  torso.oval('#438779', [0.063, 0.67, 0.15], [0.08, 0.038, 0.023], [0, 0, 0.45])
  for (const y of [0.5, 0.57, 0.625])
    torso.oval('#f5d597', [0, y, 0.166], [0.012, 0.012, 0.009])
  torso.oval('#d9805b', [0, 0.59, -0.156], [0.169, 0.186, 0.099])
  torso.oval('#eea078', [0, 0.665, -0.203], [0.158, 0.082, 0.068])
  torso.oval('#ffe1aa', [0, 0.62, -0.267], [0.028, 0.029, 0.012])
  for (const side of [-1, 1]) {
    torso.oval(
      '#e5a177',
      [side * 0.137, 0.624, 0.102],
      [0.025, 0.113, 0.037],
      [0.08, 0, side * 0.13],
    )
  }
  torso.mesh(body)

  const head = joint(body, 0, 0.982, 0)
  const face = sculpt(material)
  face.oval(skin, [0, 0, 0], [0.283, 0.278, 0.248])
  face.oval(hair, [0, 0.078, -0.058], [0.287, 0.244, 0.229])
  face.oval(skin, [0, -0.027, 0.054], [0.264, 0.225, 0.211])
  face.oval(skin, [0, -0.041, 0.262], [0.042, 0.035, 0.037])
  face.oval(
    '#ae7159',
    [0.004, -0.098, 0.25],
    [0.039, 0.008, 0.008],
    [0, 0, 0.09],
  )
  for (const side of [-1, 1]) {
    face.oval(skin, [side * 0.265, -0.015, -0.002], [0.052, 0.073, 0.044])
    face.oval('#df947c', [side * 0.274, -0.018, 0.026], [0.026, 0.039, 0.012])
    face.oval(hair, [side * 0.246, 0.071, 0.035], [0.04, 0.1, 0.074])
    face.oval(
      '#e79b82',
      [side * 0.171, -0.073, 0.206],
      [0.046, 0.021, 0.013],
      [0, side * 0.49, side * 0.08],
    )
    face.oval(
      hair,
      [side * 0.108, 0.077, 0.228],
      [0.052, 0.013, 0.01],
      [0, side * 0.32, side * 0.08],
    )
  }
  for (const [x, y, angle] of [
    [-0.15, 0.144, -0.4],
    [-0.049, 0.158, -0.72],
    [0.073, 0.168, -0.65],
  ]) {
    face.oval(hair, [x, y, 0.185], [0.079, 0.099, 0.04], [0, 0, angle])
  }
  // A broad brim and a tapered crown make the explorer readable from above.
  face.turned(
    '#e2b96c',
    [0, 0.192, -0.01],
    [
      [0, -0.016],
      [0.287, -0.016],
      [0.382, -0.031],
      [0.4, -0.023],
      [0.393, -0.004],
      [0.29, 0.03],
      [0.275, 0.092],
      [0.229, 0.199],
      [0.169, 0.23],
      [0.04, 0.232],
      [0, 0.226],
    ],
    0.9,
    [-0.065, 0, -0.055],
  )
  face.turned(
    '#c57b4c',
    [0, 0.192, -0.01],
    [
      [0.286, 0.032],
      [0.279, 0.076],
      [0.273, 0.093],
    ],
    0.907,
    [-0.065, 0, -0.055],
  )
  face.oval(
    '#6a9765',
    [0.259, 0.286, 0.042],
    [0.028, 0.09, 0.018],
    [0.24, 0, -0.54],
  )
  face.mesh(head)

  const eyes = sculpt(material)
  for (const side of [-1, 1]) {
    eyes.oval(
      ink,
      [side * 0.105, 0, 0.245],
      [0.025, 0.035, 0.014],
      [0, side * 0.28, 0],
    )
    eyes.oval(
      '#fff4de',
      [side * 0.105 - 0.006, 0.011, 0.259],
      [0.006, 0.008, 0.003],
    )
  }
  const gaze = eyes.mesh(head, [0, 0.021, 0])

  const legs: {
    side: number
    thigh: THREE.Mesh
    calf: THREE.Mesh
    shoe: THREE.Mesh
  }[] = []
  const arms: THREE.Mesh[] = []
  const down = new THREE.Vector3(0, -1, 0)
  const direction = new THREE.Vector3()
  const hip = new THREE.Vector3(),
    knee = new THREE.Vector3(),
    ankle = new THREE.Vector3()
  for (const side of [-1, 1]) {
    const thigh = sculpt(material)
    thigh.oval('#3e556d', [0, -0.091, 0], [0.087, 0.125, 0.083])
    const calf = sculpt(material)
    calf.oval('#fff0cb', [0, -0.095, 0], [0.071, 0.112, 0.065])
    calf.oval('#d39a5c', [0, -0.107, 0], [0.074, 0.026, 0.07])
    const shoe = sculpt(material)
    shoe.oval(boots, [0, -0.016, 0.059], [0.098, 0.077, 0.148])
    shoe.oval('#573c34', [0, -0.067, 0.055], [0.101, 0.028, 0.147])
    shoe.oval('#d79158', [0, 0.026, 0.093], [0.084, 0.055, 0.104])
    legs.push({
      side,
      thigh: thigh.mesh(group),
      calf: calf.mesh(group),
      shoe: shoe.mesh(group),
    })

    const arm = sculpt(material)
    arm.oval(
      jacket,
      [side * 0.022, -0.045, 0],
      [0.078, 0.103, 0.092],
      [0, 0, side * 0.19],
    )
    arm.oval(
      '#72b7a3',
      [side * 0.034, -0.112, 0.006],
      [0.072, 0.043, 0.08],
      [0, 0, side * 0.19],
    )
    arm.oval(
      skin,
      [side * 0.039, -0.179, 0.008],
      [0.052, 0.087, 0.058],
      [0, 0, side * 0.12],
    )
    arms.push(arm.mesh(body, [side * 0.19, 0.665, 0]))
  }

  function poseSegment(
    segment: THREE.Mesh,
    from: THREE.Vector3,
    to: THREE.Vector3,
    length: number,
  ) {
    direction.subVectors(to, from)
    segment.position.copy(from)
    segment.scale.y = direction.length() / length
    segment.quaternion.setFromUnitVectors(down, direction.normalize())
  }
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.33, 24),
    new THREE.MeshBasicMaterial({
      color: '#24382e',
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.scale.y = 0.85
  shadow.position.y = 0.015
  group.add(shadow)
  legs.forEach(({ shoe, calf }) => {
    shoe.name = 'visitor boot'
    calf.name = 'visitor calf'
  })
  group.name = 'visitor'
  let gait = 0
  let previous = 0
  let effort = 0
  const animate: IslandCharacter['animate'] = (
    time,
    moving,
    reduced,
    distance,
  ) => {
    const dt = Math.min(0.1, Math.max(0, time - previous))
    previous = time
    const target = moving && !reduced ? 1 : 0
    effort = reduced
      ? 0
      : THREE.MathUtils.damp(effort, target, moving ? 22 : 13, dt)
    if (target) gait = (gait + (distance ?? dt * 3.1) / 1.44) % 1
    const sway = Math.sin(gait * Math.PI * 2) * effort
    const bounce = (0.5 - 0.5 * Math.cos(gait * Math.PI * 4)) * 0.074 * effort
    body.position.set(sway * 0.038, bounce, 0)
    body.rotation.set(0.12 * effort, -0.095 * sway, -0.08 * sway)
    head.rotation.z = reduced
      ? 0
      : 0.065 * sway + Math.sin(time * 1.7) * 0.015 * (1 - effort)
    gaze.scale.y = reduced
      ? 1
      : Math.min(1, Math.abs(((time + 1.2) % 4.7) - 2) * 13 + 0.08)

    legs.forEach(({ side, thigh, calf, shoe }, index) => {
      const phase = (gait + index * 0.5) % 1
      const onGround = phase < 0.56
      const swing = THREE.MathUtils.clamp((phase - 0.56) / 0.44, 0, 1)
      const reach = onGround
        ? 0.31 - (0.62 * phase) / 0.56
        : -0.31 + 0.62 * THREE.MathUtils.smoothstep(swing, 0, 1)
      const lift = Math.sin(Math.PI * swing) * effort
      hip.set(side * 0.111 + body.position.x, 0.348 + bounce, 0)
      ankle.set(side * 0.117, 0.091 + 0.205 * lift, reach * effort)
      knee.lerpVectors(hip, ankle, 0.53)
      knee.z += 0.04 + 0.158 * lift
      poseSegment(thigh, hip, knee, 0.183)
      poseSegment(calf, knee, ankle, 0.178)
      shoe.position.copy(ankle)
      shoe.rotation.set(0.42 * lift * Math.cos(swing * Math.PI), side * 0.12, 0)
      arms[index].rotation.x = reach * effort * 2.35
    })
  }
  animate(0, false, false)
  return { group, animate }
}

export function createGuide(): IslandCharacter {
  const group = new THREE.Group()
  const bird = joint(group)
  const material = clay()
  const plumes = sculpt(material)
  plumes.oval('#568897', [0, 0.33, -0.015], [0.241, 0.245, 0.232])
  plumes.oval('#fff0ca', [0, 0.32, 0.102], [0.196, 0.196, 0.174])
  plumes.oval('#588b98', [0, 0.59, 0.043], [0.242, 0.205, 0.226])
  plumes.oval('#f3dfac', [0, 0.54, 0.145], [0.193, 0.126, 0.153])
  const beakTilt: Vec3 = [Math.PI * 0.5, 0, 0]
  plumes.turned(
    '#dca456',
    [0, 0.54, 0.267],
    [
      [0.066, 0],
      [0.056, 0.041],
      [0.009, 0.109],
      [0, 0.11],
    ],
    0.68,
    beakTilt,
  )
  for (const side of [-1, 1]) {
    plumes.oval(
      ink,
      [side * 0.096, 0.611, 0.254],
      [0.023, 0.029, 0.015],
      [0, side * 0.31, 0],
    )
    plumes.oval(
      '#fff6df',
      [side * 0.096 - 0.003, 0.62, 0.266],
      [0.006, 0.007, 0.004],
    )
    plumes.oval(
      '#cf936b',
      [side * 0.168, 0.551, 0.207],
      [0.035, 0.017, 0.009],
      [0, side * 0.57, 0],
    )
    plumes.oval('#bc7b46', [side * 0.101, 0.072, 0], [0.031, 0.06, 0.029])
    plumes.oval('#dca456', [side * 0.101, 0.031, 0.035], [0.061, 0.029, 0.09])
    plumes.oval(
      '#426c7e',
      [side * 0.057, 0.302, -0.208],
      [0.054, 0.039, 0.151],
      [0.32, side * 0.31, 0],
    )
  }
  plumes.turned(
    '#e48f62',
    [0, 0.434, 0.017],
    [
      [0.187, -0.018],
      [0.216, 0.005],
      [0.21, 0.04],
      [0.183, 0.052],
    ],
    1.04,
  )
  plumes.oval(
    '#e99a6c',
    [-0.083, 0.406, 0.212],
    [0.052, 0.098, 0.018],
    [0.06, 0, -0.47],
  )
  plumes.oval(
    '#568897',
    [-0.019, 0.785, 0.029],
    [0.039, 0.088, 0.027],
    [0.29, 0, 0.4],
  )
  plumes.oval(
    '#79a6a0',
    [0.029, 0.78, 0.043],
    [0.026, 0.063, 0.023],
    [0.32, 0, -0.35],
  )
  plumes.mesh(bird)
  const wings = [-1, 1].map((side) => {
    const wing = sculpt(material)
    wing.oval(
      '#467887',
      [side * 0.013, -0.092, -0.04],
      [0.076, 0.137, 0.105],
      [0.39, 0, side * 0.08],
    )
    wing.oval(
      '#75a1a0',
      [side * 0.055, -0.086, -0.055],
      [0.037, 0.076, 0.091],
      [0.39, 0, side * 0.2],
    )
    return wing.mesh(bird, [side * 0.19, 0.419, 0])
  })
  group.name = 'guide'
  return {
    group,
    animate(time, moving, reduced) {
      const pulse = reduced ? 0 : Math.sin(time * (moving ? 7 : 2.1))
      bird.position.y = moving ? Math.abs(pulse) * 0.075 : pulse * 0.009
      bird.rotation.z = pulse * 0.025
      wings[0].rotation.z = -0.1 - 0.08 * pulse
      wings[1].rotation.z = 0.1 + 0.08 * pulse
    },
  }
}
