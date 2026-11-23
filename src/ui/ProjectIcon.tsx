import {
  Terminal,
  Database,
  BookOpen,
  Rocket,
  Server,
  ShieldCheck,
} from 'lucide-react'

const icons = [Terminal, Database, BookOpen, Rocket, Server, ShieldCheck]

export default function ProjectIcon({
  index,
  size,
}: {
  index: number
  size: number
}) {
  const Icon = icons[index]
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />
}
