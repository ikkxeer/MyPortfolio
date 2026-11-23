import * as T from 'three'
import {
  Batch,
  ModelKit,
  bark,
  seeded,
  timber,
  trim,
  wood,
  type XZ,
} from './modelKit'
import { building, lighthouse, pickable } from './village'
import { decoratePlaza, exhibit } from './exhibits'
import { exhibitSpots } from '../data/exhibits'

const river = (z: number) =>
  -2.5 + Math.sin(z * 0.64) * 0.14 + Math.sin(z * 0.28) * 0.12
const riverWidth = (z: number) =>
  0.66 + 0.09 * Math.cos(z * 0.72) + 0.035 * Math.cos(z * 1.8)
const endZ = -10.5,
  frontZ = 10.5

function terrain(b: Batch) {
  const rand = seeded(71)
  // Each bank follows one arc of the coastline and returns along the stream.
  const n = 112,
    coast: XZ[] = []
  for (let i = 0; i < n; i++) {
    const a = (2 * Math.PI * i) / n,
      ripple =
        1 +
        0.018 * Math.sin(a * 7) +
        0.012 * Math.cos(a * 11) +
        0.008 * Math.sin(a * 19)
    coast.push([15.65 * Math.cos(a) * ripple, 11.25 * Math.sin(a) * ripple])
  }
  b.horizontal(
    coast.map(([x, z]) => [x * 1.044, z * 1.052]),
    -0.62,
    0.37,
    '#f3d7a2',
    undefined,
    0.1,
  )
  b.horizontal(
    coast.map(([x, z]) => [x * 1.087, z * 1.088]),
    -0.81,
    0.21,
    '#efcc92',
    undefined,
    0.08,
  )
  const nearRiver = (p: XZ, s: number) =>
    s * (p[0] - river(p[1])) - riverWidth(p[1])
  for (const side of [-1, 1]) {
    const outer: XZ[] = []
    for (let i = 0; i < n; i++) {
      const a = coast[i],
        c = coast[(i + 1) % n],
        da = nearRiver(a, side),
        dc = nearRiver(c, side)
      if (da >= 0) outer.push(a)
      if (da >= 0 !== dc >= 0) {
        const k = da / (da - dc)
        outer.push([a[0] + k * (c[0] - a[0]), a[1] + k * (c[1] - a[1])])
      }
    }
    // Rotate at the gap so the coast runs continuously between the two estuary tips.
    let split = 0
    for (let i = 0; i < outer.length; i++)
      if (Math.abs(outer[i][1] - outer[(i + 1) % outer.length][1]) > 9)
        split = i + 1
    const arc = [...outer.slice(split), ...outer.slice(0, split)]
    const last = arc[arc.length - 1][1],
      first = arc[0][1],
      outline = [...arc]
    for (let j = 1; j < 34; j++) {
      const z = last + ((first - last) * j) / 34
      outline.push([river(z) + side * riverWidth(z), z])
    }
    b.horizontal(outline, -0.28, 0.39, '#d4a36a', undefined, 0.155)
    b.horizontal(outline, -0.12, 0.19, '#dbb87d', undefined, 0.105)
    b.horizontal(outline, 0.005, 0.14, '#a3c575', undefined, 0.095)
  }
  const stream: XZ[] = []
  for (const side of [-1, 1])
    for (let i = 0; i <= 40; i++) {
      const z = endZ + ((frontZ - endZ) * (side < 0 ? i : 40 - i)) / 40
      stream.push([river(z) + side * (riverWidth(z) + 0.15), z])
    }
  b.horizontal(stream, -0.145, 0.06, '#63bdb5', b.kit.water)
  // Short stepped waterfalls drop into the inlet at either end of the island.
  for (const s of [-1, 1]) {
    b.block(
      [river(s * 10.54), -0.43, s * 10.56],
      [1.28, 0.6, 0.24],
      '#8bd1c4',
      [0, 0.07 * s, 0],
      true,
      b.kit.water,
    )
    for (let i = 0; i < 5; i++)
      b.ball(
        [river(s * 10.57) + (i - 2) * 0.24, -0.74, s * 10.72],
        [0.25, 0.08, 0.26],
        '#c2ead3',
        1,
      )
  }
  // Pebbled cliff faces keep the silhouette varied even at the waterline.
  for (let i = 0; i < 100; i++) {
    const a = rand() * Math.PI * 2,
      idx = Math.floor((a * n) / (Math.PI * 2)),
      [x, z] = coast[idx]
    if (Math.abs(x - river(z)) < 1.15) continue
    const s = 0.1 + rand() * 0.29
    b.ball(
      [
        x * (1 + rand() * 0.031),
        -0.49 - rand() * 0.22,
        z * (1 + rand() * 0.038),
      ],
      [s * 1.7, s, s * 1.3],
      ['#b6a491', '#c9ac88', '#d6b48a', '#a9a896'][i % 4],
      0,
      [0, rand() * 6, 0.11],
    )
  }
}
function meadow(b: Batch, low: boolean) {
  const rand = seeded(931)
  // Flat islands of a neighbouring grass tone break up broad lawns like painted turf.
  for (let i = 0; i < (low ? 40 : 83); i++) {
    const a = rand() * Math.PI * 2,
      r = Math.sqrt(rand()) * 0.94
    const x = 15.4 * r * Math.cos(a),
      z = 10 * r * Math.sin(a),
      w = 0.18 + rand() * 0.63,
      d = 0.09 + rand() * 0.36
    if (Math.abs(x - river(z)) < 1.25 + w) continue
    const patch: XZ[] = []
    for (let j = 0; j < 7; j++) {
      const angle = (j * Math.PI * 2) / 7,
        scale = 0.72 + rand() * 0.3
      patch.push([
        x + w * scale * Math.cos(angle),
        z + d * scale * Math.sin(angle),
      ])
    }
    b.horizontal(patch, 0.053, 0.003, i % 3 === 0 ? '#aacf80' : '#9ec171')
  }
  for (const [x, z] of [
    [-10.6, 1.1],
    [-8, 1.17],
    [-4.75, 0.85],
    [0.89, 1.2],
    [4.12, 0.96],
    [6.03, 0.83],
    [9.8, 1.14],
    [2.4, 3.24],
    [2.71, 7.15],
    [-7.1, 6.49],
    [6.36, 5.76],
  ]) {
    for (let j = 0; j < 3; j++) {
      const dx = (rand() - 0.5) * 0.47,
        dz = (rand() - 0.5) * 0.3
      b.ball(
        [x + dx, 0.071, z + dz],
        [0.06 + rand() * 0.05, 0.018, 0.033 + rand() * 0.03],
        j % 2 ? '#cbb68b' : '#edd8b0',
        0,
      )
    }
  }
  for (const z of [-8, -6.8, -4.5, -1.5, 2.3, 7.8, 9.3]) {
    const x = river(z) + riverWidth(z) + 0.09
    for (let j = 0; j < 3; j++) {
      const dx = (j - 1) * 0.08,
        dz = rand() * 0.25,
        h = 0.28 + rand() * 0.22
      b.stick(
        [x + dx, 0, z + dz],
        [x + dx + 0.03, h, z + dz],
        0.016,
        '#829653',
        4,
      )
      b.ball([x + dx + 0.03, h, z + dz], [0.038, 0.092, 0.04], '#a2804e', 0)
    }
  }
}
function path(b: Batch, pts: XZ[], width: number, c = '#e8cf9d') {
  const left: XZ[] = [],
    right: XZ[] = []
  pts.forEach(([x, z], i) => {
    const prev = pts[Math.max(0, i - 1)],
      next = pts[Math.min(pts.length - 1, i + 1)]
    const dx = next[0] - prev[0],
      dz = next[1] - prev[1],
      l = Math.hypot(dx, dz) || 1
    left.push([x - ((dz / l) * width) / 2, z + ((dx / l) * width) / 2])
    right.push([x + ((dz / l) * width) / 2, z - ((dx / l) * width) / 2])
  })
  b.horizontal([...left, ...right.reverse()], 0.067, 0.027, c)
}
function bridge(b: Batch, z: number) {
  const x = river(z)
  for (let i = 0; i < 13; i++) {
    const t = i / 12,
      xx = x + (t - 0.5) * 2.9,
      y = 0.12 + 0.18 * Math.sin(t * Math.PI)
    b.block(
      [xx, y, z],
      [0.219, 0.14, 1.49],
      i % 3 === 1 ? '#c7925b' : '#dcac70',
      [0, 0, 0.15 * Math.cos(t * Math.PI)],
      true,
    )
  }
  for (const s of [-1, 1]) {
    const za = z + s * 0.74
    for (const v of [-1, 0, 1]) {
      b.stick(
        [x + 1.28 * v, -0.1, za],
        [x + 1.28 * v, 0.79 + 0.13 * (1 - Math.abs(v)), za],
        0.069,
        wood,
        7,
      )
      b.ball(
        [x + 1.28 * v, 0.84 + 0.13 * (1 - Math.abs(v)), za],
        [0.091, 0.075, 0.091],
        trim,
        1,
      )
    }
    for (const v of [-1, 1])
      b.stick([x, 0.89, za], [x + 1.28 * v, 0.77, za], 0.044, timber)
  }
}
function fence(b: Batch, pts: XZ[]) {
  for (let i = 0; i < pts.length; i++) {
    const [x, z] = pts[i]
    b.block([x, 0.37, z], [0.15, 0.71, 0.16], '#ded0a2', [0, 0, 0], true)
    b.cylinder([x, 0.76, z], 0.025, 0.12, 0.12, trim, 4, [0, Math.PI / 4, 0])
    const next = pts[i + 1]
    if (next)
      for (const y of [0.25, 0.49])
        b.stick([x, y, z], [next[0], y, next[1]], 0.057, trim, 6)
  }
}
function lamp(b: Batch, x: number, z: number) {
  b.cylinder([x, 0.1, z], 0.21, 0.24, 0.18, '#657970', 8)
  b.stick([x, 0.1, z], [x, 1.72, z], 0.073, '#59756b', 8)
  b.cylinder([x, 1.72, z], 0.23, 0.13, 0.11, '#526f65', 8)
  b.cylinder(
    [x, 1.94, z],
    0.2,
    0.155,
    0.35,
    '#ffda94',
    6,
    [0, 0, 0],
    b.kit.glass,
  )
  b.cylinder([x, 2.17, z], 0.07, 0.29, 0.19, '#577466', 8)
  b.ball([x, 2.29, z], [0.065, 0.085, 0.065], trim, 1)
}
function bench(b: Batch, x: number, z: number) {
  for (const s of [-1, 1]) {
    b.block([x + 0.48 * s, 0.19, z], [0.14, 0.37, 0.48], timber)
    b.block([x + 0.48 * s, 0.44, z - 0.21], [0.11, 0.72, 0.11], timber)
  }
  for (let i = -1; i <= 1; i++)
    b.block([x, 0.42, z + i * 0.16], [1.38, 0.1, 0.14], wood, [0, 0, 0], true)
  for (let i = 0; i < 2; i++)
    b.block(
      [x, 0.65 + i * 0.18, z - 0.22],
      [1.35, 0.15, 0.1],
      '#b58557',
      [0, 0, 0],
      true,
    )
}
function bush(b: Batch, x: number, z: number, s: number, c: string) {
  for (let i = -1; i <= 1; i++)
    b.ball(
      [x + i * s * 0.33, 0.23 * s, z],
      [
        s * (0.45 + 0.08 * (1 - Math.abs(i))),
        s * (0.37 + 0.13 * (1 - Math.abs(i))),
        s * 0.43,
      ],
      c,
      1,
      [0, i + 0.4, 0],
      b.kit.leaf,
    )
}
function tree(
  b: Batch,
  x: number,
  z: number,
  s: number,
  i: number,
  pine = false,
) {
  b.stick([x, 0, z], [x + 0.07 * s, 1.44 * s, z], 0.17 * s, bark, 8, 0.68)
  if (pine) {
    for (let j = 0; j < 3; j++)
      b.cylinder(
        [x, (1.05 + 0.57 * j) * s, z],
        0.025,
        (1.01 - 0.2 * j) * s,
        (1.21 - 0.1 * j) * s,
        ['#548e70', '#65a076', '#87b681'][j],
        8,
        [0, i * 0.5 + j * 0.3, 0],
        b.kit.leaf,
      )
  } else {
    const cols =
      i % 3 === 0
        ? ['#77a45c', '#91b864', '#a4c771']
        : i % 3 === 1
          ? ['#73a569', '#88b56f', '#a4c47e']
          : ['#83ac69', '#9cbd75', '#b3cf83']
    for (const side of [-1, 1])
      b.stick(
        [x, 1.03 * s, z],
        [x + side * 0.53 * s, 1.58 * s, z + 0.07 * s],
        0.087 * s,
        bark,
        7,
        0.62,
      )
    b.ball(
      [x - 0.4 * s, 1.64 * s, z + 0.1 * s],
      [0.84 * s, 0.83 * s, 0.84 * s],
      cols[0],
      1,
      [0.13, i, 0.12],
      b.kit.leaf,
    )
    b.ball(
      [x + 0.45 * s, 1.81 * s, z + 0.05 * s],
      [0.87 * s, 0.9 * s, 0.85 * s],
      cols[1],
      1,
      [0.17, i + 0.4, 0],
      b.kit.leaf,
    )
    b.ball(
      [x, 2.13 * s, z - 0.13 * s],
      [0.84 * s, 0.83 * s, 0.8 * s],
      cols[2],
      1,
      [0.25, i * 0.52, -0.1],
      b.kit.leaf,
    )
    if (i % 3 === 0)
      for (let j = 0; j < 6; j++) {
        const a = j * 2.4,
          dx = Math.sin(a) * 0.9 * s,
          dz = Math.cos(a) * 0.83 * s
        b.ball(
          [x + dx, 1.67 * s + (j % 3) * 0.13 * s, z + dz],
          [0.15 * s, 0.16 * s, 0.15 * s],
          j % 2 ? '#eb9861' : '#d87950',
          1,
        )
      }
  }
}
function flower(b: Batch, x: number, z: number, c: string, r: number) {
  const h = 0.22 + 0.11 * r
  b.stick([x, 0, z], [x, h, z], 0.014, '#6e9256', 4)
  b.ball(
    [x - 0.045, h * 0.6, z],
    [0.1, 0.034, 0.035],
    '#7ba561',
    0,
    [0, 0, -0.5],
    b.kit.petals,
  )
  for (let j = 0; j < 5; j++) {
    const a = (j * Math.PI * 2) / 5 + r
    b.ball(
      [x + Math.cos(a) * 0.065, h, z + Math.sin(a) * 0.065],
      [0.08, 0.042, 0.072],
      c,
      0,
      [0, a, 0],
      b.kit.petals,
    )
  }
  b.ball(
    [x, h + 0.028, z],
    [0.053, 0.046, 0.053],
    '#efc45a',
    0,
    [0, 0, 0],
    b.kit.petals,
  )
}
function sign(kit: ModelKit) {
  const b = new Batch(kit)
  for (const s of [-1, 1])
    b.block([s * 0.48, 0.64, 0], [0.13, 1.22, 0.14], wood)
  b.block([0, 1.04, 0], [1.37, 0.8, 0.16], timber, [0, 0, 0], true)
  b.block([0, 1.04, 0.1], [1.17, 0.62, 0.06], '#e9d5a6', [0, 0, 0], true)
  b.ball([0, 1.04, 0.15], [0.43, 0.227, 0.032], '#80ad79', 1)
  b.stick([-0.12, 0.88, 0.18], [0.06, 1.18, 0.18], 0.03, '#7cb8c0', 5)
  for (let i = 0; i < 3; i++)
    b.ball(
      [-0.23 + 0.21 * i, 1.09 + Math.sin(i) * 0.06, 0.18],
      [0.043, 0.043, 0.027],
      ['#ca8159', '#dca54c', '#648c83'][i],
    )
  b.block([0, 1.49, 0], [1.52, 0.16, 0.44], '#729981', [0.09, 0, 0], true)
  return b.finish()
}
function mailbox(kit: ModelKit) {
  const b = new Batch(kit)
  b.block([0, 0.51, 0], [0.21, 0.98, 0.2], wood, [0, 0, 0], true)
  b.block([0, 0.96, 0], [0.7, 0.13, 0.82], trim, [0, 0, 0], true)
  const shape: XZ[] = [
    [-0.32, 0],
    [0.32, 0],
    [0.32, 0.27],
  ]
  for (let j = 0; j <= 8; j++)
    shape.push([
      0.32 * Math.cos((j * Math.PI) / 8),
      0.26 + 0.31 * Math.sin((j * Math.PI) / 8),
    ])
  b.prism(shape, 0.74, '#c96c58', [0, 1, -0.36], [0, 0, 0], 0.025)
  b.block([0, 1.32, 0.411], [0.43, 0.066, 0.025], timber, [0, 0, 0], true)
  b.block([0, 1.16, 0.418], [0.22, 0.07, 0.026], trim)
  b.block([0.37, 1.48, -0.02], [0.047, 0.42, 0.048], wood)
  b.block([0.37, 1.65, 0.09], [0.054, 0.16, 0.24], '#f4c167')
  return b.finish()
}
function pier(b: Batch) {
  for (let i = 0; i < 12; i++)
    b.block(
      [2.5, -0.14, 9.98 + i * 0.28],
      [1.78, 0.16, 0.26],
      i % 3 ? '#b98d59' : '#caa06b',
      [0, 0, 0],
      true,
    )
  for (const s of [-1, 1])
    for (const z of [10.12, 11.6, 12.96]) {
      b.stick(
        [2.5 + s * 0.8, -1.06, z],
        [2.5 + s * 0.8, 0.18, z],
        0.104,
        timber,
      )
      b.cylinder([2.5 + s * 0.8, 0.19, z], 0.117, 0.12, 0.09, trim, 8)
    }
  // Small moored wooden dinghy, with a recessed hull and two transverse seats.
  const x = 4.05,
    z = 11.68
  const hull: XZ[] = [
    [-0.42, -0.63],
    [-0.32, -0.97],
    [0, -1.16],
    [0.32, -0.97],
    [0.42, -0.63],
    [0.42, 0.69],
    [0.26, 0.95],
    [-0.26, 0.95],
    [-0.42, 0.69],
  ]
  const poly = (scale: number): XZ[] =>
    hull.map(([a, b]) => [x + a * scale, z + b * scale])
  b.horizontal(poly(1), -0.47, 0.23, '#a07450', undefined, 0.04)
  b.horizontal(poly(0.84), -0.46, 0.012, '#765742')
  for (const dz of [-0.43, 0.36])
    b.block([x, -0.409, z + dz], [0.72, 0.08, 0.17], '#d2a873')
  b.stick([3.25, -0.09, 11.6], [3.8, -0.43, 11.1], 0.022, trim, 5)
}
function bird(kit: ModelKit) {
  const b = new Batch(kit)
  b.ball([0, 0.29, 0], [0.15, 0.24, 0.32], '#f3e8cb', 1)
  b.ball([0, 0.48, 0.14], [0.15, 0.16, 0.16], '#f7edda', 1)
  b.ball([0, 0.47, 0.31], [0.065, 0.041, 0.102], '#deab61', 0)
  for (const s of [-1, 1]) {
    b.ball(
      [s * 0.137, 0.31, -0.02],
      [0.055, 0.13, 0.25],
      '#9baba3',
      1,
      [0.18, 0, 0],
    )
    b.ball([s * 0.085, 0.5, 0.262], [0.022, 0.022, 0.022], timber, 1)
    b.stick([s * 0.073, 0.04, 0], [s * 0.073, 0.16, 0], 0.019, '#c59255', 5)
  }
  return b.finish()
}

export function createScenery(low: boolean) {
  const kit = new ModelKit(),
    group = new T.Group(),
    staticParts = new Batch(kit),
    objects: T.Object3D[] = [],
    rand = seeded(602)
  terrain(staticParts)
  meadow(staticParts, low)
  path(
    staticParts,
    [
      [-13, 0.7],
      [-10, 1.04],
      [-8, 1.14],
      [-5, 1],
      [-3.8, 1],
    ],
    1.34,
  )
  path(
    staticParts,
    [
      [-1.25, 1],
      [1, 1.12],
      [3.6, 0.95],
      [6.3, 0.86],
      [9, 0.92],
      [11, 1.45],
    ],
    1.4,
  )
  path(
    staticParts,
    [
      [-7, 1.12],
      [-7.4, 0.25],
      [-7.48, -1.84],
    ],
    1.21,
  )
  path(
    staticParts,
    [
      [1.15, 1.06],
      [1.78, -0.92],
      [1.76, -2.79],
      [1.44, -4.78],
    ],
    1.26,
  )
  path(
    staticParts,
    [
      [8.67, 0.91],
      [8.97, -0.08],
      [9, -1.78],
    ],
    1.34,
  )
  path(
    staticParts,
    [
      [10, 1.13],
      [10.62, 2.35],
      [10.7, 4.84],
      [9.7, 5.75],
      [7.11, 5.72],
    ],
    1.2,
  )
  path(
    staticParts,
    [
      [-8.48, 1.05],
      [-8.9, 2.72],
      [-8.84, 5.76],
      [-7.88, 6.47],
      [-3.8, 6.5],
    ],
    1.22,
  )
  path(
    staticParts,
    [
      [-1.2, 6.5],
      [1.13, 6.52],
      [3.6, 6.4],
      [5.25, 5.72],
      [7.9, 5.72],
    ],
    1.34,
  )
  path(
    staticParts,
    [
      [1.38, 1.12],
      [2.42, 2.95],
      [2.79, 4.74],
      [2.83, 6.52],
      [2.62, 8.64],
      [2.48, 10.03],
    ],
    1.13,
  )
  staticParts.horizontal(
    [
      [-8.6, 2.65],
      [-7.99, 2.33],
      [-4.23, 2.42],
      [-3.56, 2.87],
      [-3.56, 5.83],
      [-4.23, 6.27],
      [-7.94, 6.29],
      [-8.54, 5.76],
    ],
    0.077,
    0.045,
    '#d9c49a',
  )
  decoratePlaza(staticParts)
  bridge(staticParts, 1)
  bridge(staticParts, 6.5)
  pier(staticParts)
  lighthouse(staticParts, 11.5, -5.75)
  fence(staticParts, [
    [-10.4, -4.7],
    [-10.5, -3.45],
    [-10.6, -2.12],
    [-10.4, -1],
    [-9.24, -0.9],
  ])
  fence(staticParts, [
    [-5, -5.17],
    [-4.37, -4.25],
    [-4.36, -2.94],
    [-4.28, -1.74],
  ])
  fence(staticParts, [
    [4.15, -6.61],
    [5.4, -6.31],
    [6.4, -5.83],
  ])
  fence(staticParts, [
    [7.23, 7.04],
    [8.48, 7.01],
    [9.65, 6.81],
  ])
  for (const [x, z] of [
    [-8.25, 0.03],
    [0.82, -2.9],
    [9.99, -0.27],
    [6.85, 5.42],
    [-8.55, 6.35],
    [2.05, 8.72],
  ])
    lamp(staticParts, x, z)
  bench(staticParts, -5.92, -0.24)
  bench(staticParts, 5.88, -0.14)
  bench(staticParts, -9.96, 4.01)
  for (const [x, z] of [
    [5.8, 4.75],
    [6.22, 3.08],
  ]) {
    staticParts.cylinder([x, 0.53, z], 0.42, 0.42, 0.1, '#d2a57a', 12)
    staticParts.stick([x, 0.05, z], [x, 0.49, z], 0.071, timber)
    for (const s of [-1, 1]) {
      staticParts.cylinder(
        [x + s * 0.48, 0.27, z],
        0.19,
        0.19,
        0.09,
        '#bc895b',
        8,
      )
      staticParts.stick(
        [x + s * 0.48, 0.04, z],
        [x + s * 0.48, 0.24, z],
        0.046,
        timber,
      )
    }
  }
  const treeSites: XZ[] = [
    [-12, -3],
    [-13.8, 0.1],
    [-11.7, -5.42],
    [-10.2, -6.25],
    [-8.5, -6.68],
    [-6.3, -7.15],
    [-4.56, -8.85],
    [-0.8, -8.68],
    [2.78, -8.88],
    [5.3, -7.69],
    [7.4, -6.71],
    [13.36, -2.26],
    [13.8, -0.3],
    [12.4, 2.29],
    [10.5, 6.49],
    [-11.42, 2.7],
    [-11.13, 5.42],
    [-9.27, 7.25],
    [-6.91, 8.01],
    [0.04, -3.17],
    [4.24, -4.02],
    [4.93, 1.98],
    [0.43, 8.3],
    [5.66, 8.11],
  ]
  treeSites.forEach(([x, z], i) =>
    tree(
      staticParts,
      x,
      z,
      0.77 + rand() * 0.59,
      i,
      i % 5 === 1 || i % 7 === 3,
    ),
  )
  for (const [x, z] of [
    [-8.78, -2],
    [-5.48, -2],
    [-10.24, 1.79],
    [-5, -6.04],
    [0.18, -4.25],
    [2.9, -4.33],
    [7.17, -1.83],
    [10.47, -1.98],
    [7.33, 2.17],
    [8.78, 2.24],
    [-5.31, 7.3],
    [-11, 3.55],
    [-0.42, 7.77],
    [4.47, 7.84],
    [10.67, 5.24],
    [3.98, -2.01],
  ])
    bush(staticParts, x, z, 0.79 + rand() * 0.36, '#79a967')
  const flowerSites: XZ[] = [
    [-8.83, -1.78],
    [-5.3, -1.68],
    [-0.4, -4.35],
    [2.79, -4.29],
    [7.47, -1.55],
    [10.84, -1.46],
    [7.15, 2.02],
    [8.71, 2.07],
    [-8.83, 1.69],
    [-6.49, 7.16],
    [-4.63, 7.1],
    [-0.79, 5.39],
    [4.14, 6.93],
    [0.78, 8.59],
    [-10.31, 3.18],
    [-11.59, -1.4],
    [5.45, -0.61],
  ]
  flowerSites.forEach(([x, z], i) => {
    const c = ['#fcf2c7', '#e89797', '#f3c86a', '#b7a0c8', '#f4b083'][i % 5]
    for (let j = 0; j < (low ? 4 : 7); j++)
      flower(
        staticParts,
        x + (rand() - 0.5) * 1.0,
        z + (rand() - 0.5) * 0.62,
        c,
        rand(),
      )
  })
  // Little tufts, toadstools and beach stones are grouped into pockets off the paths.
  for (let i = 0; i < (low ? 60 : 125); i++) {
    const a = rand() * Math.PI * 2,
      r = 0.77 + rand() * 0.18,
      x = Math.cos(a) * 15 * r,
      z = Math.sin(a) * 10.3 * r
    if (Math.abs(x - river(z)) < 1.13) continue
    for (let j = 0; j < 2; j++)
      staticParts.ball(
        [x + j * 0.06, 0.12, z],
        [0.038, 0.155, 0.04],
        i % 2 ? '#92b86a' : '#81aa62',
        0,
        [0.12, 0, (j - 0.5) * 0.63],
        kit.petals,
      )
    if (i % 11 === 0) {
      staticParts.cylinder([x + 0.12, 0.12, z], 0.044, 0.065, 0.23, trim, 7)
      staticParts.ball([x + 0.12, 0.24, z], [0.142, 0.088, 0.142], '#d68464', 1)
    }
  }
  const add = (g: T.Group) => {
    group.add(g)
    objects.push(g)
    return g
  }
  add(pickable(building(kit, 'about'), 'about', -7, -3))
  add(pickable(building(kit, 'tech'), 'tech', 1, -6))
  add(pickable(building(kit, 'journey'), 'journey', 9, -3))
  add(pickable(building(kit, 'skills'), 'skills', 8, 4))
  exhibitSpots.forEach(
    ([x, z], i) =>
      (add(pickable(exhibit(kit, i), 'projects', x, z, i)).position.y = 0.08),
  )
  add(pickable(mailbox(kit), 'contact', 2, 5.5))
  add(pickable(sign(kit), 'map', 0, 2))
  group.add(staticParts.finish())
  const ripples = new T.InstancedMesh(
    new T.SphereGeometry(1, 8, 4),
    new T.MeshBasicMaterial({
      color: '#d5fff0',
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    }),
    low ? 26 : 58,
  )
  ripples.frustumCulled = false
  const wave = new T.Object3D()
  const flow = Array.from({ length: ripples.count }, () => ({
    start: rand() * 21,
    offset: (rand() - 0.5) * 0.96,
    speed: 0.95 + rand() * 0.9,
    length: 0.12 + rand() * 0.38,
  }))
  function flowRiver(time: number) {
    flow.forEach(({ start, offset, speed, length }, index) => {
      const z = endZ + ((start + time * speed) % 21)
      const fade = Math.min(1, (z - endZ) * 1.5, (frontZ - z) * 1.5)
      wave.position.set(
        river(z) + offset + Math.sin(z * 1.5 + index) * 0.048,
        -0.119,
        z,
      )
      wave.scale.set((0.024 + (index % 3) * 0.012) * fade, 0.009, length * fade)
      wave.rotation.y = 0.17 * Math.cos(z + index)
      wave.updateMatrix()
      ripples.setMatrixAt(index, wave.matrix)
    })
    ripples.instanceMatrix.needsUpdate = true
  }
  flowRiver(0)
  group.add(ripples)
  const seabirds = [
    [2.95, 12.52],
    [-10.9, 6.15],
  ].map(([x, z], i) => {
    const g = bird(kit)
    g.position.set(x, i === 0 ? -0.05 : 0, z)
    g.rotation.y = 1.43 - i * 2.25
    group.add(g)
    return g
  })
  const fliers = [
    [-6.1, -1.1],
    [0.38, 4.6],
    [5.9, -2.4],
    [-6.9, 6.7],
  ]
    .slice(0, low ? 2 : 4)
    .map(([x, z], i) => {
      const butterfly = new T.Group()
      for (const s of [-1, 1]) {
        const b = new Batch(kit)
        b.ball(
          [s * 0.086, 0, 0],
          [0.12, 0.028, 0.092],
          i % 2 ? '#e4b858' : '#d99984',
          1,
        )
        b.ball([s * 0.058, 0, -0.074], [0.078, 0.02, 0.066], '#f2d9a3', 1)
        butterfly.add(b.finish())
      }
      group.add(butterfly)
      return { butterfly, x, z }
    })
  kit.clearTemplates()
  return {
    group,
    interactives: objects,
    animate: (
      time: number,
      night: number,
      px: number,
      pz: number,
      reduced: boolean,
    ) => {
      kit.clock.value = time
      kit.walker.value.set(px, pz)
      kit.motion.value = reduced ? 0 : 1
      kit.glass.emissiveIntensity = 0.04 + night * 1.35
      if (reduced) return
      flowRiver(time)
      seabirds.forEach((g, i) => {
        g.rotation.z = 0.035 * Math.sin(time * 1.46 + i)
        g.rotation.y = 1.43 - i * 2.25 + 0.18 * Math.sin(time * 0.63 + i)
      })
      fliers.forEach(({ butterfly, x, z }, i) => {
        butterfly.visible = night < 0.73
        butterfly.position.set(
          x + 0.51 * Math.sin(time * 0.78 + i),
          0.67 + 0.19 * Math.sin(time * 1.54 + i * 2),
          z + 0.27 * Math.sin(time * 1.29 + i),
        )
        butterfly.rotation.y = time * 0.46 + i
        butterfly.children.forEach((w, j) => {
          w.rotation.z = (j ? 1 : -1) * (0.5 + 0.42 * Math.sin(time * 12 + i))
        })
      })
    },
  }
}
