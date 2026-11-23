import type { Place, Zone } from '../data/village'
export interface VillageEvents {
  open: (place: Place, project?: number) => void
  position: (x: number, z: number, near: Place | null) => void
  hover: (place: Place | null) => void
  fail: () => void
}
export interface VillageController {
  pause: (value: boolean) => void
  zoom: (delta: number) => void
  travel: (place: Zone) => void
  touch: (x: number, y: number) => void
  interact: () => void
  dispose: () => void
}
