import * as T from 'three'
import { daylight } from './daylight'

export function makeSky(scene: T.Scene, low: boolean) {
  const sky = new T.Color(),
    seaColor = new T.Color(),
    tmp = new T.Color()
  scene.background = sky
  const fog = new T.Fog(0xa6dce5, 43, 118)
  scene.fog = fog
  const hemi = new T.HemisphereLight(0xfff6d8, 0xc2c794, 1.65)
  const sun = new T.DirectionalLight(0xffecc6, 2.6)
  sun.castShadow = true
  sun.shadow.mapSize.set(low ? 512 : 1024, low ? 512 : 1024)
  Object.assign(sun.shadow.camera, {
    left: -23,
    right: 23,
    top: 19,
    bottom: -19,
    near: 0.1,
    far: 75,
  })
  sun.shadow.bias = -0.0005
  sun.shadow.normalBias = 0.035
  scene.add(hemi, sun)
  const sea = new T.Mesh(
    new T.PlaneGeometry(350, 350),
    new T.MeshStandardMaterial({ color: 0x66bfc6, roughness: 0.68 }),
  )
  sea.rotation.x = -Math.PI / 2
  sea.position.y = -0.88
  sea.receiveShadow = true
  scene.add(sea)
  // Batches of tiny painterly wavelets keep the water readable at every zoom.
  const waveMat = new T.MeshBasicMaterial({
    color: 0xe0faf1,
    transparent: true,
    opacity: 0.44,
  })
  const waves = new T.InstancedMesh(
    new T.SphereGeometry(1, 6, 3),
    waveMat,
    low ? 190 : 420,
  )
  const proxy = new T.Object3D()
  let seed = 735
  function random() {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  for (let i = 0; i < waves.count; i++) {
    proxy.position.set((random() - 0.5) * 110, -0.864, (random() - 0.5) * 110)
    proxy.scale.set(0.08 + random() ** 2 * 0.73, 0.013, 0.025 + random() * 0.07)
    proxy.updateMatrix()
    waves.setMatrixAt(i, proxy.matrix)
  }
  scene.add(waves)
  const cloudMat = new T.MeshLambertMaterial({
    color: 0xfff6df,
    flatShading: true,
  })
  const cloudGeo = new T.IcosahedronGeometry(1, 1)
  const clouds = new T.Group()
  for (let i = 0; i < 12; i++) {
    const group = new T.Group()
    group.position.set(
      -57 + i * 9 + random() * 5,
      3 + random() * 7,
      -25 - random() * 18,
    )
    for (let j = 0; j < 4; j++) {
      const puff = new T.Mesh(cloudGeo, cloudMat)
      puff.position.set(j * 1.4, Math.sin(j) * 0.65, 0)
      puff.scale.set(1.8, 0.8 + random(), 1.3)
      group.add(puff)
    }
    clouds.add(group)
  }
  scene.add(clouds)
  const starPos = []
  for (let i = 0; i < 230; i++)
    starPos.push((random() - 0.5) * 150, random() * 36 + 4, -28 - random() * 45)
  const sg = new T.BufferGeometry()
  sg.setAttribute('position', new T.Float32BufferAttribute(starPos, 3))
  const starMat = new T.PointsMaterial({
    color: '#fff8d4',
    size: 0.15,
    transparent: true,
    fog: false,
  })
  const stars = new T.Points(sg, starMat)
  scene.add(stars)
  const orb = new T.Mesh(
    new T.SphereGeometry(2.2, 20, 12),
    new T.MeshBasicMaterial({ color: '#fff6c4', fog: false }),
  )
  scene.add(orb)
  // Small luminous points hover just above the meadow when the local sun sets.
  const fliesGeometry = new T.BufferGeometry()
  const fireflies = new Float32Array((low ? 12 : 28) * 3)
  for (let i = 0; i < fireflies.length; i += 3) {
    fireflies[i] = (random() - 0.5) * 23
    fireflies[i + 1] = 0.45 + random() * 0.9
    fireflies[i + 2] = (random() - 0.5) * 14
  }
  const resting = fireflies.slice()
  fliesGeometry.setAttribute('position', new T.BufferAttribute(fireflies, 3))
  const flyMaterial = new T.PointsMaterial({
    color: '#ffe895',
    size: 0.095,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: T.AdditiveBlending,
  })
  const flies = new T.Points(fliesGeometry, flyMaterial)
  scene.add(flies)
  function update(date: Date) {
    const s = daylight(date)
    sky.set(s.a[1]).lerp(tmp.set(s.b[1]), s.mix)
    fog.color.copy(sky)
    seaColor.set(s.a[2]).lerp(tmp.set(s.b[2]), s.mix)
    sea.material.color.copy(seaColor)
    sun.color.set(s.a[3]).lerp(tmp.set(s.b[3]), s.mix)
    sun.intensity = s.intensity
    const angle = ((s.hour - 6) / 12) * Math.PI
    sun.position.set(
      -Math.cos(angle) * 19,
      7 + Math.abs(Math.sin(angle)) * 24,
      -10,
    )
    hemi.intensity = 1.65 - s.night * 0.94
    hemi.color.set('#fff3d8').lerp(tmp.set('#b6cfff'), s.night)
    flies.visible = s.night > 0.18
    flyMaterial.opacity = s.night
    starMat.opacity = s.night
    waveMat.opacity = 0.42 - s.night * 0.25
    orb.material.color.set(s.night > 0.55 ? '#e5e9ff' : '#ffebae')
    orb.position.set(
      Math.cos(angle) * 24,
      4 + Math.abs(Math.sin(angle)) * 10,
      -35,
    )
    return s.night
  }
  return {
    update,
    animate: (t: number) => {
      if (flies.visible) {
        for (let i = 0; i < fireflies.length; i += 3) {
          fireflies[i] = resting[i] + Math.sin(t * 0.67 + i) * 0.22
          fireflies[i + 1] = resting[i + 1] + Math.cos(t * 0.92 + i) * 0.18
        }
        fliesGeometry.attributes.position.needsUpdate = true
      }
      clouds.position.x = Math.sin(t * 0.019) * 5
      waves.position.x = Math.sin(t * 0.4) * 0.25
      waves.position.z = Math.cos(t * 0.32) * 0.08
    },
  }
}
