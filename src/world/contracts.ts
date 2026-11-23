import type { Place, Zone } from '../data/village'
export type Target = Place | 'exit'
export interface VillageEvents {
  open: (place: Place, project?: number) => void
  position: (
    x: number,
    z: number,
    near: Target | null,
    project?: number,
  ) => void
  hover: (place: Target | null, project?: number) => void
  inside: (value: boolean) => void
  fail: () => void
}
export interface VillageController {
  pause: (value: boolean) => void
  zoom: (delta: number) => void
  travel: (place: Zone) => void
  touch: (x: number, y: number) => void
  leave: () => void
  interact: () => void
  dispose: () => void
}
