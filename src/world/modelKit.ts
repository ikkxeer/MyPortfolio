import * as T from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

export type XYZ = [number, number, number]
export type XZ = [number, number]
const zero: XYZ = [0, 0, 0]
const unit: XYZ = [1, 1, 1]

/** Small parts are baked with vertex colours into one mesh per animated or pickable object. */
export class ModelKit {
  private templates = new Map<string, T.BufferGeometry>()
  readonly matte = new T.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.94,
  })
  readonly leaf = this.matte.clone()
  readonly petals = this.matte.clone()
  readonly glass = new T.MeshStandardMaterial({
    vertexColors: true,
    emissive: '#ffd275',
    emissiveIntensity: 0.12,
  })
  readonly water = new T.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.38,
    metalness: 0.06,
  })
  readonly clock = { value: 0 }
  readonly walker = { value: new T.Vector2(100, 100) }
  readonly motion = { value: 1 }
  constructor() {
    for (const [material, flower] of [
      [this.leaf, false],
      [this.petals, true],
    ] as const) {
      material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, {
          islandTime: this.clock,
          walker: this.walker,
          motion: this.motion,
        })
        shader.vertexShader =
          'uniform float islandTime; uniform float motion; uniform vec2 walker;\n' +
          shader.vertexShader
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          vec2 here = (modelMatrix * vec4(position, 1.)).xz;
          float sway = sin(islandTime * 1.45 + here.x * .9 + here.y * .68);
          transformed.x += motion * sway * ${flower ? '.023' : '.035'} * clamp(position.y, 0., 3.);
          ${flower ? 'vec2 away = here - walker; transformed.xz += motion * away / max(length(away), .1) * (1. - smoothstep(.2, 1.8, length(away))) * .18;' : ''}`,
        )
      }
      material.customProgramCacheKey = () => (flower ? 'flowers' : 'leaves')
    }
  }
  template(id: string, make: () => T.BufferGeometry) {
    let g = this.templates.get(id)
    if (!g) {
      g = make()
      this.templates.set(id, g)
    }
    return g
  }
  clearTemplates() {
    this.templates.forEach((g) => g.dispose())
    this.templates.clear()
  }
}

export class Batch {
  private parts = new Map<T.Material, T.BufferGeometry[]>()
  readonly kit: ModelKit
  readonly group = new T.Group()
  constructor(kit: ModelKit) {
    this.kit = kit
  }
  put(
    source: T.BufferGeometry,
    color: string,
    p: XYZ = zero,
    s: XYZ = unit,
    rot: XYZ = zero,
    material: T.Material = this.kit.matte,
    quat?: T.Quaternion,
  ) {
    const geo = source.index ? source.toNonIndexed() : source.clone()
    for (const attr of Object.keys(geo.attributes))
      if (attr !== 'position' && attr !== 'normal') geo.deleteAttribute(attr)
    if (!geo.attributes.normal) geo.computeVertexNormals()
    const size = geo.attributes.position.count
    const colors = new Float32Array(size * 3),
      rgb = new T.Color(color)
    for (let i = 0; i < size; i++) rgb.toArray(colors, i * 3)
    geo.setAttribute('color', new T.BufferAttribute(colors, 3))
    geo.applyMatrix4(
      new T.Matrix4().compose(
        new T.Vector3(...p),
        quat ?? new T.Quaternion().setFromEuler(new T.Euler(...rot)),
        new T.Vector3(...s),
      ),
    )
    const items = this.parts.get(material) ?? []
    items.push(geo)
    this.parts.set(material, items)
  }
  block(
    p: XYZ,
    s: XYZ,
    c: string,
    r: XYZ = zero,
    soft = false,
    mat?: T.Material,
  ) {
    const box = this.kit.template(soft ? 'lozenge' : 'box', () =>
      soft
        ? new RoundedBoxGeometry(1, 1, 1, 1, 0.075)
        : new T.BoxGeometry(1, 1, 1),
    )
    this.put(box, c, p, s, r, mat)
  }
  ball(p: XYZ, s: XYZ, c: string, detail = 0, r: XYZ = zero, mat?: T.Material) {
    this.put(
      this.kit.template(
        'ico' + detail,
        () => new T.IcosahedronGeometry(1, detail),
      ),
      c,
      p,
      s,
      r,
      mat,
    )
  }
  cylinder(
    p: XYZ,
    top: number,
    base: number,
    h: number,
    c: string,
    n = 10,
    r: XYZ = zero,
    mat?: T.Material,
  ) {
    const ratio = base > 0 ? top / base : 1
    this.put(
      this.kit.template(
        'cyl' + n + ':' + ratio.toFixed(3),
        () => new T.CylinderGeometry(ratio, 1, 1, n),
      ),
      c,
      p,
      [base, h, base],
      r,
      mat,
    )
  }
  stick(a: XYZ, b: XYZ, radius: number, c: string, n = 7, top = 1) {
    const start = new T.Vector3(...a),
      finish = new T.Vector3(...b),
      delta = finish.clone().sub(start)
    const q = new T.Quaternion().setFromUnitVectors(
      new T.Vector3(0, 1, 0),
      delta.clone().normalize(),
    )
    this.put(
      this.kit.template(
        'pole' + n + ':' + top,
        () => new T.CylinderGeometry(top, 1, 1, n),
      ),
      c,
      start.lerp(finish, 0.5).toArray(),
      [radius, delta.length(), radius],
      zero,
      undefined,
      q,
    )
  }
  prism(
    outline: XZ[],
    depth: number,
    c: string,
    p: XYZ = zero,
    r: XYZ = zero,
    bevel = 0,
    mat?: T.Material,
  ) {
    const sh = new T.Shape()
    outline.forEach(([x, y], i) => {
      if (i) sh.lineTo(x, y)
      else sh.moveTo(x, y)
    })
    sh.closePath()
    const g = new T.ExtrudeGeometry(sh, {
      depth,
      bevelEnabled: bevel > 0,
      bevelSize: bevel,
      bevelThickness: bevel,
      bevelSegments: 1,
      curveSegments: 4,
    })
    this.put(g, c, p, unit, r, mat)
    g.dispose()
  }
  horizontal(
    points: XZ[],
    y: number,
    depth: number,
    c: string,
    mat?: T.Material,
    bevel = 0,
  ) {
    this.prism(
      points.map(([x, z]) => [x, -z]),
      depth,
      c,
      [0, y - depth, 0],
      [-Math.PI / 2, 0, 0],
      bevel,
      mat,
    )
  }
  finish() {
    for (const [material, parts] of this.parts) {
      const geometry = mergeGeometries(parts)
      parts.forEach((g) => g.dispose())
      if (geometry) {
        const mesh = new T.Mesh(geometry, material)
        mesh.castShadow = true
        mesh.receiveShadow = true
        this.group.add(mesh)
      }
    }
    this.parts.clear()
    return this.group
  }
}

export const wood = '#986744',
  trim = '#eed7a0',
  timber = '#79553d',
  bark = '#805f3c',
  clay = '#cf7650'
export function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
}
