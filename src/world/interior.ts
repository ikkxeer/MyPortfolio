import * as T from 'three'
import { Batch, ModelKit, wood, timber, trim } from './modelKit'
import { pickable } from './village'

export function makeInterior() {
  const scene = new T.Scene()
  scene.background = new T.Color('#477f75')
  const kit = new ModelKit()
  const room = new Batch(kit)
  room.block([0, -0.24, 0], [8.5, 0.46, 6.2], timber, [0, 0, 0], true)
  for (let i = 0; i < 14; i++)
    room.block(
      [-3.9 + i * 0.6, -0.03, 0],
      [0.59, 0.08, 6],
      i % 3 ? '#d9aa75' : '#cca06c',
    )
  room.block([0, 1.52, -3], [8.45, 3.1, 0.2], '#d7e4bc', [0, 0, 0], true)
  room.block([-4.15, 1.52, 0], [0.2, 3.1, 6], '#c8d6a6', [0, 0, 0], true)
  for (const x of [-2.65, 0.05, 2.65]) {
    room.block([x, 1.92, -2.85], [1.4, 1.3, 0.18], timber, [0, 0, 0], true)
    room.block(
      [x, 1.92, -2.735],
      [1.23, 1.12, 0.085],
      '#a7d7d7',
      [0, 0, 0],
      false,
      kit.glass,
    )
    room.block([x, 1.92, -2.67], [0.07, 1.2, 0.05], trim)
    room.block([x, 1.92, -2.67], [1.3, 0.07, 0.05], trim)
  }
  room.block([0, 0.045, 0.1], [3.45, 0.055, 2.53], '#438377', [0, 0, 0], true)
  room.block([0, 0.077, 0.1], [3.06, 0.025, 2.13], '#76aa90', [0, 0, 0], true)
  room.block([-2.95, 0.31, -0.45], [1.2, 0.52, 2.3], '#a97660', [0, 0, 0], true)
  room.block(
    [-2.95, 0.66, -0.46],
    [1.06, 0.34, 2.1],
    '#dfaa81',
    [0, 0, 0],
    true,
  )
  room.block(
    [-3.43, 0.92, -0.45],
    [0.25, 1.0, 2.26],
    '#b87564',
    [0, 0, 0],
    true,
  )
  for (const z of [-1.07, 0.04])
    room.block(
      [-2.98, 0.84, z],
      [0.48, 0.35, 0.56],
      '#f7d278',
      [0, -0.24, 0.1],
      true,
    )
  room.block([2.77, 0.67, -2.18], [2, 0.13, 0.8], wood, [0, 0, 0], true)
  for (const x of [1.95, 3.57])
    room.block([x, 0.31, -2.17], [0.14, 0.64, 0.64], timber)
  room.block([2.77, 1.04, -2.4], [0.88, 0.55, 0.12], '#385751', [0, 0, 0], true)
  room.block([2.77, 1.06, -2.33], [0.74, 0.42, 0.032], '#81c4b1')
  room.block([2.77, 0.755, -2.02], [0.61, 0.045, 0.22], '#b7c6aa')
  for (const [x, z] of [
    [-3.5, 2.18],
    [3.5, 1.93],
  ]) {
    room.cylinder([x, 0.29, z], 0.38, 0.23, 0.55, '#bc775f', 12)
    for (let i = 0; i < 6; i++) {
      const theta = (i * Math.PI) / 3
      room.ball(
        [
          x + Math.cos(theta) * 0.25,
          0.85 + (i % 2) * 0.17,
          z + Math.sin(theta) * 0.25,
        ],
        [0.23, 0.46, 0.17],
        i % 2 ? '#91b773' : '#678e63',
        1,
        [0.35, theta, 0.26],
      )
    }
  }
  const album = new Batch(kit)
  album.cylinder([0, 0.42, 0], 0.53, 0.53, 0.14, wood, 20)
  album.cylinder([0, 0.2, 0], 0.14, 0.21, 0.4, timber, 12)
  album.block([0, 0.54, 0], [0.49, 0.09, 0.36], '#d48152', [0, -0.25, 0], true)
  album.block(
    [0, 0.56, 0.03],
    [0.46, 0.045, 0.31],
    '#ffffd7',
    [0, -0.25, 0],
    true,
  )
  const profile = pickable(album.finish(), 'about', 0.12, -1.62)
  const exit = new Batch(kit)
  exit.block([0, 0.04, 0], [1.72, 0.09, 0.52], '#efb864', [0, 0, 0], true)
  for (const side of [-1, 1])
    exit.stick([side * 0.39, 0.1, -0.02], [0, 0.1, 0.22], 0.035, '#835a44')
  const door = pickable(exit.finish(), 'exit', 0, 2.6)
  const sun = new T.DirectionalLight('#ffe4ad', 2.4)
  sun.position.set(3, 8, 5)
  scene.add(
    room.finish(),
    profile,
    door,
    sun,
    new T.HemisphereLight('#fff5d6', '#d9a580', 2),
  )
  kit.clearTemplates()
  return { scene, interactives: [profile, door] }
}
