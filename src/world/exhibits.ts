import { exhibitColors } from '../data/exhibits'
import { Batch, timber, trim, type ModelKit } from './modelKit'

const porcelain = '#fff3cd'
const brass = '#f1c071'
const pine = '#48645d'

export function exhibit(kit: ModelKit, index: number) {
  const b = new Batch(kit)
  const color = exhibitColors[index]
  b.cylinder([0, 0.07, 0], 0.78, 0.81, 0.14, '#967356', 16)
  b.cylinder([0, 0.157, 0], 0.72, 0.77, 0.09, porcelain, 16)
  b.block([0, 0.38, 0], [1.12, 0.43, 0.76], color, [0, 0, 0], true)
  b.block([0, 0.6, 0], [1.3, 0.12, 0.91], porcelain, [0, 0, 0], true)
  b.block([0, 0.387, 0.4], [0.67, 0.21, 0.05], porcelain, [0, 0, 0], true)
  b.block([0, 0.382, 0.434], [0.33, 0.031, 0.013], color)
  for (const x of [-0.262, 0.262])
    b.ball([x, 0.387, 0.437], [0.032, 0.032, 0.011], brass, 1)

  switch (index) {
    case 0: {
      // Terminal, sweeping brush and bright command on the screen.
      b.block(
        [-0.12, 1.04, -0.08],
        [0.95, 0.72, 0.37],
        '#7caebb',
        [-0.09, 0, 0],
        true,
      )
      b.block(
        [-0.12, 1.07, 0.127],
        [0.78, 0.53, 0.036],
        '#284d5d',
        [-0.09, 0, 0],
        true,
      )
      b.stick([-0.4, 1.21, 0.17], [-0.23, 1.1, 0.167], 0.025, '#b4f9d9')
      b.stick([-0.23, 1.1, 0.167], [-0.4, 0.99, 0.16], 0.025, '#b4f9d9')
      b.block([-0.07, 0.99, 0.16], [0.18, 0.051, 0.034], '#b4f9d9')
      b.stick([0.35, 0.8, 0.36], [0.56, 1.39, 0.29], 0.045, brass)
      b.block(
        [0.34, 0.775, 0.365],
        [0.26, 0.15, 0.18],
        '#e6a66d',
        [0, 0, -0.32],
        true,
      )
      break
    }
    case 1: {
      // Stacked database drums and student index cards.
      for (const y of [0.77, 0.975, 1.18])
        b.cylinder(
          [-0.12, y, -0.03],
          0.38,
          0.38,
          0.18,
          y > 1.1 ? '#eab97e' : color,
          18,
        )
      for (const y of [0.865, 1.07])
        b.cylinder([-0.12, y, -0.03], 0.33, 0.33, 0.045, porcelain, 18)
      for (let i = 0; i < 3; i++) {
        b.block(
          [0.32 + i * 0.069, 0.9 + i * 0.069, 0.3 - i * 0.053],
          [0.25, 0.32, 0.038],
          porcelain,
          [-0.2, -0.12, 0.16],
          true,
        )
        b.block(
          [0.32 + i * 0.069, 0.93 + i * 0.069, 0.332 - i * 0.053],
          [0.15, 0.035, 0.012],
          '#53796e',
          [-0.2, -0.12, 0.16],
        )
      }
      break
    }
    case 2: {
      // An open coding notebook and its oversized pencil.
      for (const side of [-1, 1]) {
        b.block(
          [side * 0.245, 0.95, 0.016],
          [0.53, 0.16, 0.65],
          color,
          [0.32, 0, side * 0.22],
          true,
        )
        b.block(
          [side * 0.237, 1.012, 0.034],
          [0.48, 0.11, 0.59],
          porcelain,
          [0.32, 0, side * 0.22],
          true,
        )
        for (const z of [-0.14, 0.015, 0.17])
          b.block(
            [side * 0.25, 1.092 - z * 0.32, z],
            [0.27, 0.015, 0.026],
            '#75a583',
            [0.32, 0, side * 0.22],
          )
      }
      b.stick([-0.27, 1.15, 0.2], [0.35, 1.4, -0.14], 0.053, '#dd974d', 6)
      b.stick([-0.35, 1.12, 0.245], [-0.27, 1.15, 0.2], 0.032, timber, 6)
      break
    }
    case 3: {
      // A launch rocket with swept fins and a painted porthole.
      b.cylinder([0, 0.745, 0], 0.34, 0.41, 0.12, pine, 14)
      b.cylinder([0, 1.08, 0], 0.19, 0.23, 0.6, porcelain, 18)
      b.cylinder([0, 1.465, 0], 0.015, 0.19, 0.28, color, 18)
      b.ball([0, 1.19, 0.193], [0.111, 0.111, 0.036], brass, 1)
      b.ball([0, 1.19, 0.216], [0.074, 0.074, 0.028], '#557c91', 1)
      for (const side of [-1, 1])
        b.prism(
          [
            [side * 0.12, 0.8],
            [side * 0.38, 0.78],
            [side * 0.16, 1.18],
          ],
          0.11,
          color,
          [0, 0, -0.055],
        )
      break
    }
    case 4: {
      // A rack of virtual machines, with drives and indicator lights.
      b.block([0.03, 1.08, 0], [0.81, 0.83, 0.57], color, [0, -0.12, 0], true)
      for (const y of [0.83, 1.06, 1.29]) {
        b.block(
          [0, y, 0.29],
          [0.67, 0.151, 0.07],
          '#d3cce6',
          [0, -0.12, 0],
          true,
        )
        b.block([-0.11, y, 0.343], [0.33, 0.036, 0.016], '#504975')
        b.ball([0.22, y, 0.349], [0.03, 0.03, 0.017], '#80dca9', 1)
      }
      break
    }
    case 5: {
      // A scanner and its shield badge.
      b.block([0, 0.76, 0], [0.85, 0.22, 0.61], pine, [0, 0, 0], true)
      const shield: [number, number][] = [
        [0, 0.86],
        [-0.33, 1.09],
        [-0.37, 1.49],
        [0, 1.61],
        [0.37, 1.49],
        [0.33, 1.09],
      ]
      b.prism(shield, 0.17, color, [0, 0, -0.08], [0, 0, 0], 0.025)
      b.stick([-0.16, 1.24, 0.128], [-0.045, 1.13, 0.128], 0.042, porcelain)
      b.stick([-0.045, 1.13, 0.128], [0.182, 1.4, 0.128], 0.042, porcelain)
      break
    }
  }
  return b.finish()
}

export function decoratePlaza(b: Batch) {
  const back = 2.23
  // Tall pennants frame the exhibition without closing off its walkways.
  for (const x of [-8.37, -3.58]) {
    b.cylinder([x, 0.093, back], 0.19, 0.25, 0.185, '#a3876e', 12)
    b.stick([x, 0.12, back], [x, 2.14, back], 0.063, timber)
    b.ball([x, 2.19, back], [0.13, 0.14, 0.13], brass)
  }
  const line = (x: number) => 1.82 + 0.072 * (x + 5.98) ** 2
  for (let i = 0; i < 12; i++) {
    const x = -8.37 + i * 0.4
    b.stick(
      [x, line(x), back],
      [x + 0.4, line(x + 0.4), back],
      0.017,
      timber,
      5,
    )
    b.prism(
      [
        [x + 0.045, line(x) - 0.01],
        [x + 0.32, line(x + 0.32) - 0.01],
        [x + 0.19, line(x + 0.19) - 0.29],
      ],
      0.024,
      exhibitColors[i % exhibitColors.length],
      [0, 0, back],
    )
  }
  for (const x of [-8.31, -3.71]) {
    b.cylinder([x, 0.23, 6.04], 0.22, 0.16, 0.28, '#ba7355', 10)
    for (let j = 0; j < 3; j++) {
      const stem = x + (j - 1) * 0.105
      b.stick(
        [x, 0.34, 6.04],
        [stem, 0.62 + (j % 2) * 0.13, 6.04],
        0.024,
        '#4c805d',
      )
      b.ball(
        [stem, 0.63 + (j % 2) * 0.13, 6.04],
        [0.102, 0.074, 0.086],
        j % 2 ? porcelain : '#efa47c',
        1,
      )
    }
  }
  for (const z of [4.34, 6.03])
    for (let i = 0; i < 12; i++)
      b.block(
        [-8.25 + 0.386 * i, 0.083, z],
        [0.352, 0.027, 0.36],
        i % 3 === 0 ? trim : '#e5cea7',
        [0, 0.025 * (i % 2), 0],
        true,
      )
}
