import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Compass,
  LogOut,
  Map as MapIcon,
  MapPin,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Volume2,
  VolumeX,
  Globe2,
  ChevronDown,
  Gamepad2,
  Plus,
  Minus,
  Check,
  X,
  Footprints,
} from 'lucide-react'
import {
  copy,
  placeKeys,
  languages,
  type Lang,
  type Zone,
  type Panel,
} from './data/village'
import { portfolio } from './data/portfolio'
import { daylight } from './environment/daylight'
import { useAmbience } from './hooks/useAmbience'
import type {
  Target,
  VillageController,
  VillageEvents,
} from './world/contracts'
import Game from './ui/Game'
import Journal from './ui/Panel'
import VillageMap, { ZoneIcon } from './ui/Map'
const languageNames = { es: 'Español', ca: 'Català', en: 'English' }
function readLang(): Lang {
  try {
    const s = localStorage.getItem('ikers-world-lang')
    return languages.includes(s as Lang) ? (s as Lang) : 'es'
  } catch {
    return 'es'
  }
}
function placeName(
  place: Target | null,
  lang: Lang,
  exhibit?: number,
  inside = false,
) {
  const t = copy[lang]
  if (place === 'projects' && exhibit !== undefined)
    return portfolio(lang).projects[exhibit].name
  if (place === 'exit') return t.leaveHouse
  if (place === 'about' && inside) return t.album
  if (place === 'tech') return t.workshopSign
  return place === 'map'
    ? t.map
    : place === 'npc'
      ? t.guideName
      : place
        ? t[placeKeys[place]]
        : t.path
}
function Clock({ lang }: { lang: Lang }) {
  const [date, setDate] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 10000)
    return () => clearInterval(id)
  }, [])
  const phase = daylight(date).phase,
    Icon = { day: Sun, night: Moon, dawn: Sunrise, dusk: Sunset }[phase],
    t = copy[lang]
  return (
    <div className="clock" title={t.local}>
      <Icon size={22} className={'sun ' + phase} />
      <b>
        {new Intl.DateTimeFormat(lang, {
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h23',
        }).format(date)}
      </b>
      <i />
      <span>{t[phase]}</span>
    </div>
  )
}
function App() {
  const location = useLocation(),
    deep: Panel | null =
      location.pathname === '/sobre-mi'
        ? 'about'
        : location.pathname === '/asignaturas'
          ? 'subjects'
          : null
  const [lang, setLang] = useState<Lang>(readLang),
    [menu, setMenu] = useState(false),
    [sound, toggleSound] = useAmbience()
  const [mode, setMode] = useState<'game' | 'light'>('game'),
    [panel, setPanel] = useState<Panel | null>(deep),
    [project, setProject] = useState<number | null>(null)
  const [pos, setPos] = useState<[number, number]>([2.5, 11.6]),
    [near, setNear] = useState<{ target: Target; exhibit?: number } | null>(
      null,
    ),
    [hover, setHover] = useState<{ target: Target; exhibit?: number } | null>(
      null,
    ),
    [inside, setInside] = useState(false)
  const [ready, setReady] = useState(false),
    [intro, setIntro] = useState(!deep)
  const ctl = useRef<VillageController | null>(null),
    pending = useRef<Zone | null>(null),
    languageBox = useRef<HTMLDivElement>(null)
  const t = copy[lang],
    light = mode === 'light'
  const nearbyExhibit = near?.target === 'projects' ? near.exhibit : undefined
  const hoveredExhibit =
    hover?.target === 'projects' ? hover.exhibit : undefined
  const exhibitIndex = nearbyExhibit ?? hoveredExhibit
  const exhibit =
    exhibitIndex === undefined
      ? undefined
      : {
          ...portfolio(lang).projects[exhibitIndex],
          index: exhibitIndex,
          nearby: nearbyExhibit !== undefined,
        }
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('ikers-world-lang', lang)
    } catch {
      /* Preferences are optional in private sessions. */
    }
  }, [lang])
  useEffect(() => {
    if (!menu) return
    const outside = (e: PointerEvent) => {
      if (!languageBox.current?.contains(e.target as Node)) setMenu(false)
    }
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false)
    }
    window.addEventListener('pointerdown', outside)
    window.addEventListener('keydown', escape)
    return () => {
      window.removeEventListener('pointerdown', outside)
      window.removeEventListener('keydown', escape)
    }
  }, [menu])
  const open = useCallback((p: Panel, i?: number) => {
    setMenu(false)
    setIntro(false)
    setProject(i ?? null)
    setPanel(p)
  }, [])
  const close = useCallback(() => {
    setPanel(null)
    setProject(null)
  }, [])
  const events = useMemo<VillageEvents>(
    () => ({
      open,
      position(x, z, target, exhibit) {
        setPos((old) =>
          Math.abs(old[0] - x) + Math.abs(old[1] - z) > 0.08 ? [x, z] : old,
        )
        setNear((old) =>
          old?.target === target && old?.exhibit === exhibit
            ? old
            : target
              ? { target, exhibit }
              : null,
        )
      },
      hover(target, exhibit) {
        setHover(target ? { target, exhibit } : null)
      },
      inside: setInside,
      fail() {
        setMode('light')
        setInside(false)
        setReady(false)
        setIntro(false)
        setPanel((p) => p ?? 'map')
      },
    }),
    [open],
  )
  const loaded = useCallback(() => {
    setReady(true)
    if (pending.current) {
      ctl.current?.travel(pending.current)
      pending.current = null
    }
  }, [])
  function visit(id: Zone) {
    setIntro(false)
    setProject(null)
    if (light) {
      setPanel(id)
      return
    }
    if (ctl.current?.transitioning()) return
    setPanel(null)
    const arrival = () => {
      if (id !== 'about' && id !== 'projects') open(id)
    }
    if (ctl.current) ctl.current.travel(id, arrival)
    else {
      pending.current = id
      arrival()
    }
  }
  useEffect(() => {
    const action = (e: KeyboardEvent) => {
      if (
        ctl.current?.transitioning() ||
        e.repeat ||
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        menu ||
        panel ||
        e.target instanceof HTMLSelectElement
      )
        return
      if (e.code === 'KeyM') {
        e.preventDefault()
        open('map')
      }
      if (inside && e.code === 'Escape') ctl.current?.leave()
      if (
        intro &&
        [
          'KeyW',
          'KeyA',
          'KeyS',
          'KeyD',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Escape',
        ].includes(e.code)
      )
        setIntro(false)
    }
    window.addEventListener('keydown', action)
    return () => window.removeEventListener('keydown', action)
  }, [menu, panel, intro, open, inside])
  const hasCover = light || !ready
  return (
    <main className={'screen ' + 'playing' + (light ? ' light-mode' : '')}>
      {hasCover && <div className="cover" aria-hidden="true" />}
      {mode === 'game' && (
        <Game
          controller={ctl}
          events={events}
          ready={loaded}
          paused={!!panel || menu}
          workshop={t.workshopSign}
          guide={t.guideName}
          exhibit={exhibit}
          openLabel={t.open}
        />
      )}
      <header className="hud-top">
        <button
          className="brand"
          onClick={() => open('map')}
          aria-label={t.map}
        >
          <span className="brand-icon">
            <Compass size={29} strokeWidth={2.1} />
          </span>
          <span>
            <strong>Iker’s World</strong>
            <small>{t.brand}</small>
          </span>
        </button>
        <div className="tools">
          <Clock lang={lang} />
          <button
            className="round sound"
            onClick={toggleSound}
            aria-pressed={sound}
            title={sound ? t.soundOff : t.soundOn}
            aria-label={sound ? t.soundOff : t.soundOn}
          >
            {sound ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
          <div className="lang-box" ref={languageBox}>
            <button
              className="lang-toggle"
              aria-expanded={menu}
              aria-label={t.language}
              onClick={() => setMenu(!menu)}
            >
              <Globe2 size={17} />
              {lang.toUpperCase()}
              <ChevronDown size={14} />
            </button>
            {menu && (
              <div className="lang-menu">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l)
                      setMenu(false)
                    }}
                    lang={l}
                  >
                    {languageNames[l]}
                    {l === lang && <Check size={15} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      {!ready && !light && !panel && (
        <div className="loading">{t.loading3D}</div>
      )}
      {light && !panel && (
        <section className="light-home">
          <h1>{t.light}</h1>
          <p>{t.mapFallback}</p>
          <button className="primary small" onClick={() => open('map')}>
            <MapIcon />
            {t.map}
          </button>
        </section>
      )}
      {ready && !panel && (
        <>
          <div className="game-tools">
            {inside && (
              <button
                className="round"
                onClick={() => ctl.current?.leave()}
                aria-label={t.leaveHouse}
                title={t.leaveHouse}
              >
                <LogOut size={18} />
              </button>
            )}
            <button
              className="round"
              onClick={() => ctl.current?.zoom(0.12)}
              title={t.zoomIn}
              aria-label={t.zoomIn}
            >
              <Plus />
            </button>
            <button
              className="round"
              onClick={() => ctl.current?.zoom(-0.12)}
              title={t.zoomOut}
              aria-label={t.zoomOut}
            >
              <Minus />
            </button>
            <button
              className="round"
              onClick={() => open('controls')}
              title={t.guide}
              aria-label={t.guide}
            >
              <Gamepad2 />
            </button>
          </div>
          {hover && hover.target !== 'projects' && (
            <div className="hover-name">
              <MapPin size={16} />
              {placeName(hover.target, lang, hover.exhibit, inside)}
            </div>
          )}
          {near && near.target !== 'projects' ? (
            <button className="prompt" onClick={() => ctl.current?.interact()}>
              <kbd>E</kbd>
              {placeName(near.target, lang, near.exhibit, inside)}
            </button>
          ) : !near && intro ? (
            <div className="intro-toast">
              <span className="intro-icon">
                <Footprints />
              </span>
              <div>
                <b>{t.intro}</b>
                <p>{t.walkClick}</p>
                <small>
                  <kbd>WASD</kbd> {t.move} · <kbd>E</kbd> {t.interact}
                </small>
              </div>
              <button
                onClick={() => setIntro(false)}
                aria-label={t.skip}
                title={t.skip}
              >
                <X size={18} />
              </button>
            </div>
          ) : null}
          <div className="touch-pad" role="group" aria-label={t.touch}>
            {[
              [0, -1, '↑'],
              [-1, 0, '←'],
              [1, 0, '→'],
              [0, 1, '↓'],
            ].map(([x, y, label], i) => (
              <button
                key={i}
                aria-label={t.move + ' ' + label}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId)
                  setIntro(false)
                  ctl.current?.touch(Number(x), Number(y))
                }}
                onLostPointerCapture={() => ctl.current?.touch(0, 0)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
      <footer className="hud-bottom">
        <div className="location">
          <span className="loc-icon">
            <MapPin size={20} />
          </span>
          <div>
            <small>{inside ? t.about : t.coast}</small>
            <b>
              {inside
                ? t.interior
                : near
                  ? placeName(near.target, lang, near.exhibit)
                  : t.path}
            </b>
          </div>
        </div>
        <nav className="quick" aria-label={t.access}>
          {(['about', 'projects', 'tech', 'contact'] as Zone[]).map((id) => (
            <button key={id} onClick={() => open(id)} title={t[placeKeys[id]]}>
              <ZoneIcon id={id} size={19} />
              <span>{id === 'about' ? t.who : t[id]}</span>
            </button>
          ))}
        </nav>
        <button className="map-button in-game" onClick={() => open('map')}>
          <VillageMap lang={lang} mini position={pos} />
          <span>
            <MapIcon size={20} />
            {t.map}
            <kbd>M</kbd>
          </span>
        </button>
      </footer>
      {panel && (
        <Journal
          page={panel}
          lang={lang}
          project={project}
          setProject={setProject}
          open={open}
          close={close}
          visit={visit}
          position={pos}
          fallback={light}
          useMap={() => {
            setMode('light')
            setInside(false)
            setIntro(false)
            setPanel('map')
          }}
        />
      )}
    </main>
  )
}
export default App
