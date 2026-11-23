import {
  Batch,
  type ModelKit,
  clay,
  timber,
  trim,
  wood,
  type XZ,
  type XYZ,
} from './modelKit'
import * as T from 'three'

function windowBox(
  b: Batch,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  shutters: boolean,
) {
  b.block([x, y, z], [w + 0.17, h + 0.17, 0.11], timber)
  b.block(
    [x, y, z + 0.075],
    [w, h, 0.055],
    '#8bb5ad',
    [0, 0, 0],
    false,
    b.kit.glass,
  )
  b.block([x, y, z + 0.11], [0.055, h + 0.04, 0.08], trim)
  b.block([x, y + 0.03, z + 0.115], [w + 0.02, 0.055, 0.08], trim)
  b.block([x, y - h / 2 - 0.09, z + 0.075], [w + 0.28, 0.1, 0.28], trim)
  if (shutters)
    for (const side of [-1, 1]) {
      b.block(
        [x + side * (w / 2 + 0.19), y, z + 0.015],
        [0.25, h + 0.18, 0.1],
        '#688f81',
      )
      for (let row = -1; row <= 1; row++)
        b.block(
          [x + side * (w / 2 + 0.19), y + 0.18 * row, z + 0.076],
          [0.23, 0.035, 0.022],
          '#aac6a2',
        )
    }
}
function arch(b: Batch, x: number, z: number, w: number, h: number, c: string) {
  const points: XZ[] = [
    [-w / 2, 0],
    [w / 2, 0],
  ]
  for (let i = 0; i <= 8; i++) {
    const a = (i * Math.PI) / 8
    points.push([(Math.cos(a) * w) / 2, h - w / 2 + (Math.sin(a) * w) / 2])
  }
  b.prism(points, 0.1, c, [x, 0.1, z])
}
function door(b: Batch, x: number, z: number, c: string) {
  arch(b, x, z, 0.88, 1.44, timber)
  arch(b, x, z + 0.09, 0.7, 1.32, c)
  for (const dx of [-0.22, 0, 0.22])
    b.block([x + dx, 0.61, z + 0.202], [0.019, 0.92, 0.012], wood)
  b.ball([x + 0.21, 0.71, z + 0.23], [0.057, 0.057, 0.057], '#f8c85a')
  b.block([x, 0.09, z + 0.32], [1.12, 0.15, 0.64], '#baaa88', [0, 0, 0], true)
}
function roof(
  b: Batch,
  w: number,
  d: number,
  eave: number,
  peak: number,
  c: string,
  seam: string,
) {
  b.prism(
    [
      [-w / 2, eave],
      [w / 2, eave],
      [0, peak],
    ],
    d,
    '#e4ce9b',
    [0, 0, -d / 2],
  )
  const slope = Math.atan2(peak - eave, w / 2),
    run = Math.hypot(w / 2, peak - eave)
  for (const side of [-1, 1]) {
    const r: XYZ = [0, 0, -side * slope]
    b.block(
      [(side * w) / 4, (peak + eave) / 2 + 0.06, 0],
      [run + 0.28, 0.19, d + 0.6],
      c,
      r,
      true,
    )
    for (let i = 0; i < 5; i++) {
      const t = (i + 0.6) / 5
      b.block(
        [(side * t * w) / 2, peak - (peak - eave) * t + 0.145, 0],
        [0.06, 0.065, d + 0.52],
        seam,
        r,
        true,
      )
    }
    for (const end of [-1, 1])
      b.stick(
        [0, peak + 0.13, end * (d / 2 + 0.25)],
        [side * (w / 2 + 0.1), eave, end * (d / 2 + 0.25)],
        0.073,
        trim,
      )
    b.block(
      [side * (w / 2 + 0.03), eave - 0.035, 0],
      [0.14, 0.13, d + 0.58],
      timber,
    )
  }
  b.block([0, peak + 0.2, 0], [0.2, 0.15, d + 0.63], seam, [0, 0, 0], true)
}
export function building(
  kit: ModelKit,
  zone: 'about' | 'tech' | 'journey' | 'skills',
) {
  const b = new Batch(kit)
  const isLab = zone === 'tech',
    isCafe = zone === 'skills',
    station = zone === 'journey',
    home = zone === 'about'
  const w = station ? 3.9 : isLab ? 3.3 : 3.0,
    d = isLab ? 2.7 : 2.3,
    eave = isLab ? 2.15 : 1.92,
    peak = isCafe ? 2.8 : 3.19,
    face = d / 2
  const color = home
    ? '#f4dca3'
    : station
      ? '#e7bd7c'
      : isCafe
        ? '#f5d9a5'
        : '#c4d6bf'
  const roofColor = home
    ? '#b9573f'
    : isLab
      ? '#488477'
      : isCafe
        ? '#d78a47'
        : '#577d85'
  const seam = home
    ? '#dc8057'
    : isLab
      ? '#71a592'
      : isCafe
        ? '#eaa85a'
        : '#78969a'
  b.block([0, 0.09, 0], [w + 0.24, 0.22, d + 0.22], '#a59b83', [0, 0, 0], true)
  b.block([0, eave / 2 + 0.09, 0], [w, eave, d], color, [0, 0, 0], true)
  for (const s of [-1, 1]) {
    for (const z of [-1, 1])
      b.block(
        [s * (w / 2 - 0.04), eave / 2 + 0.07, z * (d / 2 - 0.02)],
        [0.14, eave, 0.15],
        timber,
      )
    b.block([(s * w) / 2, 0.45, 0], [0.08, 0.15, d], wood)
    b.block([s * (w / 2 + 0.035), 1.2, -0.1], [0.09, 0.87, 0.9], timber)
    b.block(
      [s * (w / 2 + 0.092), 1.2, -0.1],
      [0.04, 0.71, 0.72],
      '#95c2bb',
      [0, 0, 0],
      false,
      kit.glass,
    )
    b.block([s * (w / 2 + 0.13), 1.2, -0.1], [0.06, 0.06, 0.75], trim)
    b.block([s * (w / 2 + 0.13), 1.2, -0.1], [0.06, 0.73, 0.06], trim)
  }
  b.block([0, 0.41, face + 0.01], [w, 0.14, 0.1], wood)
  roof(b, w + 0.14, d, eave, peak, roofColor, seam)
  if (home || isCafe) {
    b.block([-0.85, 2.53, -0.43], [0.46, 1.33, 0.46], '#a96e53')
    b.block([-0.85, 3.23, -0.43], [0.59, 0.17, 0.59], clay)
    for (let i = 0; i < 3; i++)
      b.block([-0.85, 2.49 + i * 0.22, -0.19], [0.45, 0.025, 0.02], '#c98961')
  }
  if (home) {
    door(b, -0.59, face, '#7c9c82')
    windowBox(b, 0.68, 1.16, face, 0.7, 0.67, true)
    b.ball([0, 2.4, face + 0.05], [0.3, 0.3, 0.1], timber, 1)
    b.ball(
      [0, 2.4, face + 0.16],
      [0.21, 0.21, 0.04],
      '#edbd78',
      1,
      [0, 0, 0],
      kit.glass,
    )
    b.block([0.68, 0.66, face + 0.22], [1.16, 0.22, 0.3], '#a56a42')
    for (let i = 0; i < 7; i++) {
      b.ball(
        [0.21 + i * 0.15, 0.82, face + 0.23],
        [0.17, 0.12, 0.14],
        '#638d52',
      )
      b.ball(
        [0.25 + i * 0.14, 0.91, face + 0.28],
        [0.085, 0.085, 0.085],
        i % 2 ? '#ed8d77' : '#eaac4e',
      )
    }
  } else if (isLab) {
    // Open-front wood and metal workbench, framed by a roll-up shop door.
    b.block(
      [-0.48, 1.02, face + 0.045],
      [2.06, 1.76, 0.14],
      '#3c5547',
      [0, 0, 0],
      true,
    )
    for (const x of [-1.49, 0.51])
      b.block([x, 0.98, face + 0.15], [0.13, 1.83, 0.23], timber)
    for (let j = 0; j < 5; j++)
      b.block(
        [-0.49, 1.58 + j * 0.072, face + 0.17],
        [1.92, 0.062, 0.23],
        j % 2 ? '#76958a' : '#9ab2a0',
      )
    b.block(
      [-0.5, 0.76, face + 0.33],
      [1.86, 0.11, 0.63],
      '#c08b60',
      [0, 0, 0],
      true,
    )
    for (const x of [-1.26, 0.27])
      b.block([x, 0.36, face + 0.44], [0.13, 0.72, 0.14], timber)
    b.block(
      [-0.91, 1.04, face + 0.26],
      [0.72, 0.44, 0.12],
      '#253c39',
      [0, 0, 0],
      true,
    )
    b.block([-0.91, 1.04, face + 0.332], [0.61, 0.33, 0.027], '#6caa91')
    for (const [x, y, width] of [
      [-0.98, 1.12, 0.28],
      [-0.94, 1.05, 0.32],
      [-1.05, 0.98, 0.14],
    ])
      b.block([x, y, face + 0.35], [width, 0.019, 0.012], '#f4df98')
    b.block([-0.88, 0.832, face + 0.53], [0.56, 0.045, 0.21], '#aac2a8')
    b.block(
      [0.18, 0.91, face + 0.47],
      [0.34, 0.25, 0.26],
      '#dd875e',
      [0, 0.08, 0],
      true,
    )
    b.stick(
      [0.18, 1.04, face + 0.47],
      [0.18, 1.22, face + 0.47],
      0.043,
      '#ebc86d',
    )
    door(b, 1.02, face, '#7ba091')
    // A coding symbol on the fascia identifies the workshop from across the path.
    const signZ = face + 0.19
    b.block([0, 2.36, signZ], [1.91, 0.58, 0.13], '#2e5c50', [0, 0, 0], true)
    for (const direction of [-1, 1]) {
      const tip = direction * 0.56
      const inner = direction * 0.34
      b.stick(
        [inner, 2.53, signZ + 0.1],
        [tip, 2.36, signZ + 0.1],
        0.042,
        '#fbe2a4',
      )
      b.stick(
        [tip, 2.36, signZ + 0.1],
        [inner, 2.19, signZ + 0.1],
        0.042,
        '#fbe2a4',
      )
    }
    b.stick(
      [-0.1, 2.19, signZ + 0.105],
      [0.1, 2.53, signZ + 0.105],
      0.035,
      '#91cbb0',
    )
  } else if (station) {
    door(b, 0, face, '#8aaca0')
    for (const s of [-1, 1])
      windowBox(b, s * 1.12, 1.16, face, 0.74, 0.75, false)
    b.cylinder([0, 2.51, face + 0.11], 0.39, 0.39, 0.15, timber, 16, [
      Math.PI / 2,
      0,
      0,
    ])
    b.cylinder([0, 2.51, face + 0.2], 0.31, 0.31, 0.05, '#fff1c8', 16, [
      Math.PI / 2,
      0,
      0,
    ])
    b.stick([0, 2.51, face + 0.24], [0, 2.74, face + 0.24], 0.024, timber)
    b.stick([0, 2.51, face + 0.24], [0.17, 2.47, face + 0.24], 0.023, timber)
    for (const s of [-1, 1])
      b.stick(
        [s * 1.72, 0.14, face + 0.8],
        [s * 1.72, 1.99, face + 0.8],
        0.07,
        timber,
      )
    b.block(
      [0, 1.98, face + 0.49],
      [w + 0.2, 0.13, 1.08],
      roofColor,
      [0.15, 0, 0],
      true,
    )
    b.block(
      [0, 0.06, face + 0.55],
      [w + 0.32, 0.12, 1.17],
      '#c3af8d',
      [0, 0, 0],
      true,
    )
  } else {
    door(b, -0.83, face, '#be8457')
    windowBox(b, 0.53, 1.06, face, 1.26, 0.94, false)
    for (let i = 0; i < 9; i++) {
      const x = (i - 4) * 0.34,
        c = i % 2 ? '#fff1cf' : '#dd8968'
      b.block([x, 1.86, face + 0.29], [0.345, 0.1, 0.91], c, [0.21, 0, 0])
      b.cylinder([x, 1.72, face + 0.72], 0.18, 0.18, 0.09, c, 10, [
        Math.PI / 2,
        0,
        0,
      ])
    }
    for (const x of [-1.38, 1.38])
      b.stick([x, 0.13, face + 0.68], [x, 1.75, face + 0.68], 0.046, wood)
    // A teacup and curved handle above the shopfront.
    b.cylinder([0, 2.65, face + 0.15], 0.26, 0.15, 0.31, '#fff3ce', 12)
    b.ball([0, 2.81, face + 0.15], [0.2, 0.02, 0.2], '#80573e', 1)
    b.stick([0.23, 2.75, face + 0.14], [0.41, 2.72, face + 0.14], 0.05, trim)
    b.stick([0.41, 2.72, face + 0.14], [0.25, 2.55, face + 0.14], 0.05, trim)
  }
  return b.finish()
}
export function lighthouse(b: Batch, x: number, z: number) {
  const y = 0.6
  b.cylinder([x, 0.17, z], 1.51, 1.8, 0.42, '#c29b68', 12)
  b.cylinder([x, 0.41, z], 1.44, 1.53, 0.19, '#9dbb6c', 12)
  for (let i = 0; i < 5; i++)
    b.cylinder(
      [x, y + 0.45 + i * 0.9, z],
      0.96 - (i + 1) * 0.089,
      0.96 - i * 0.089,
      0.91,
      i % 2 ? '#cb614b' : '#fff0ce',
      14,
    )
  archAtBase()
  b.cylinder([x, 5.08, z], 0.86, 0.76, 0.16, timber, 16)
  b.cylinder(
    [x, 5.46, z],
    0.46,
    0.46,
    0.73,
    '#fed89a',
    12,
    [0, 0, 0],
    b.kit.glass,
  )
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5,
      dx = Math.cos(a),
      dz = Math.sin(a)
    b.stick(
      [x + 0.73 * dx, 5.13, z + 0.73 * dz],
      [x + 0.73 * dx, 5.43, z + 0.73 * dz],
      0.029,
      timber,
    )
    b.stick(
      [x + 0.73 * dx, 5.42, z + 0.73 * dz],
      [
        x + 0.73 * Math.cos(a + Math.PI / 5),
        5.42,
        z + 0.73 * Math.sin(a + Math.PI / 5),
      ],
      0.026,
      timber,
    )
    if (i % 2 === 0)
      b.stick(
        [x + 0.45 * dx, 5.15, z + 0.45 * dz],
        [x + 0.45 * dx, 5.84, z + 0.45 * dz],
        0.042,
        timber,
      )
  }
  b.cylinder([x, 6.02, z], 0.09, 0.82, 0.48, '#b95a47', 14)
  b.ball([x, 6.32, z], [0.1, 0.13, 0.1], '#c99a55', 1)
  function archAtBase() {
    b.block([x, 1.08, z + 0.88], [0.5, 0.95, 0.11], wood, [0, 0, 0], true)
    for (let i = 0; i < 2; i++)
      b.block(
        [x, 2.73 + i * 1.65, z + 0.74 - i * 0.17],
        [0.22, 0.38, 0.08],
        '#5f8584',
        [0, 0, 0],
        true,
      )
  }
}
export function exhibit(kit: ModelKit, i: number) {
  const b = new Batch(kit)
  const color = [
    '#71ab9c',
    '#d48e66',
    '#8c9ebc',
    '#b0ac6f',
    '#8daab6',
    '#ce9788',
  ][i]
  b.cylinder([0, 0.065, 0], 0.76, 0.82, 0.13, '#cdb694', 8)
  b.block([0, 0.42, 0], [1.05, 0.7, 0.67], wood, [0, 0, 0], true)
  b.block([0, 0.44, 0.35], [0.72, 0.34, 0.035], trim, [0, 0, 0], true)
  b.block([0, 0.81, 0], [1.24, 0.13, 0.82], '#e6c99d', [0, 0, 0], true)
  if (i === 0 || i === 3 || i === 5) {
    b.block([0, 1.2, -0.02], [0.83, 0.59, 0.37], color, [-0.07, 0, 0], true)
    b.block([0, 1.22, 0.186], [0.65, 0.4, 0.02], '#324e51')
    b.stick([-0.22, 1.33, 0.207], [-0.14, 1.25, 0.207], 0.02, '#b3d8a0')
    b.stick([-0.14, 1.25, 0.207], [-0.22, 1.18, 0.207], 0.02, '#b3d8a0')
    b.block([-0.04, 1.18, 0.21], [0.11, 0.032, 0.018], '#b3d8a0')
    b.block([0, 0.91, 0.27], [0.59, 0.065, 0.21], color, [0.13, 0, 0], true)
    if (i === 5) b.ball([0.34, 1.56, -0.08], [0.075, 0.07, 0.075], '#e1b45f', 1)
  } else if (i === 1) {
    for (let j = 0; j < 3; j++) {
      b.block(
        [-0.25 + j * 0.24, 1.13, -0.03],
        [0.18, 0.5 + 0.09 * (j % 2), 0.42],
        [color, '#699686', trim][j],
        [0, 0, j === 2 ? -0.13 : 0],
        true,
      )
      b.block([-0.25 + j * 0.24, 1.24, 0.2], [0.12, 0.055, 0.01], trim)
    }
  } else if (i === 2) {
    b.prism(
      [
        [-0.46, 0],
        [-0.07, -0.05],
        [0, 0.01],
        [0.06, -0.05],
        [0.46, 0],
        [0.45, 0.09],
        [0.06, 0.06],
        [0, 0.1],
        [-0.06, 0.06],
        [-0.46, 0.09],
      ],
      0.45,
      '#fff0cb',
      [0, 1.02, -0.18],
      [0.12, 0, 0],
    )
    b.stick([0.12, 1.03, 0.19], [0.36, 1.47, -0.09], 0.044, color)
  } else
    for (let j = 0; j < 3; j++) {
      const pos: XYZ = [(j - 1) * 0.26, 1.02 + (j % 2) * 0.28, 0]
      b.block(
        pos,
        [0.36, 0.34, 0.36],
        j === 1 ? trim : color,
        [0, j * 0.22, 0],
        true,
      )
    }
  return b.finish()
}
export function pickable(
  group: T.Group,
  zone: string,
  x: number,
  z: number,
  project?: number,
) {
  group.position.set(x, 0, z)
  group.name = zone
  group.userData.zone = zone
  if (project !== undefined) group.userData.project = project
  return group
}
