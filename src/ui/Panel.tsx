import { useEffect, useRef, type CSSProperties } from 'react'
import {
  X,
  Map,
  Gamepad2,
  Footprints,
  MousePointer2,
  Hand,
  ZoomIn,
  BookOpen,
  ExternalLink,
  ArrowLeft,
  CodeXml,
  Lightbulb,
  Handshake,
  Sprout,
  ChevronRight,
  ScrollText,
  Bird,
  MessagesSquare,
  BookMarked,
  Compass,
} from 'lucide-react'
import {
  copy,
  placeKeys,
  topicKeys,
  zones,
  type Lang,
  type Panel,
  type Zone,
} from '../data/village'
import { exhibitColors } from '../data/exhibits'
import { portfolio } from '../data/portfolio'
import ContactForm from './ContactForm'
import VillageMap, { ZoneIcon } from './Map'
import ProjectIcon from './ProjectIcon'
const exhibitStyle = (index: number) =>
  ({ '--exhibit-color': exhibitColors[index] }) as CSSProperties
const skillIcons = [Lightbulb, Handshake, Sprout]
export default function Journal({
  page,
  lang,
  project,
  setProject,
  open,
  close,
  visit,
  position,
  fallback,
  useMap,
}: {
  page: Panel
  lang: Lang
  project: number | null
  setProject: (i: number | null) => void
  open: (v: Panel) => void
  close: () => void
  visit: (zone: Zone) => void
  position: [number, number]
  fallback: boolean
  useMap: () => void
}) {
  const t = copy[lang],
    data = portfolio(lang),
    dialog = useRef<HTMLDialogElement>(null),
    isZone = zones.includes(page as Zone)
  useEffect(() => {
    const el = dialog.current,
      previous = document.activeElement
    if (!el) return
    el.showModal()
    return () => {
      el.close()
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus()
    }
  }, [])
  const title = isZone
    ? t[placeKeys[page as Zone]]
    : page === 'map'
      ? t.map
      : page === 'npc'
        ? t.guideName
        : page === 'intro'
          ? t.intro
          : page === 'subjects'
            ? t.subjects
            : t.guide
  const MainIcon =
    page === 'map'
      ? Map
      : page === 'npc'
        ? Bird
        : page === 'subjects'
          ? BookOpen
          : Gamepad2
  return (
    <dialog
      ref={dialog}
      className={'journal ' + (page === 'npc' ? 'dialogue' : '')}
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      aria-labelledby="dialog-title"
    >
      <article>
        <header className="journal-head">
          <span className="journal-emblem">
            {isZone ? (
              <ZoneIcon id={page as Zone} size={27} />
            ) : (
              <MainIcon size={27} />
            )}
          </span>
          <div>
            {isZone && <small>{t[topicKeys[page as Zone]]}</small>}
            <h2 id="dialog-title">{title}</h2>
          </div>
          <button className="round close" aria-label={t.close} onClick={close}>
            <X size={20} />
          </button>
        </header>
        <div className="journal-body" key={page + (project ?? '')}>
          {(page === 'intro' || page === 'controls') && (
            <>
              {page === 'intro' && <p>{t.introBody}</p>}
              <div className="keyrow">
                <Footprints />
                <b>{t.move}</b>
                <span>
                  <kbd>WASD</kbd> <kbd>↑↓←→</kbd>
                </span>
              </div>
              <div className="keyrow">
                <Hand />
                <b>{t.interact}</b>
                <kbd>E</kbd>
              </div>
              <div className="keyrow">
                <ZoomIn />
                <b>{t.zoom}</b>
                <span>
                  {t.wheel} · <kbd>+ / −</kbd>
                </span>
              </div>
              <div className="keyrow">
                <Map />
                <b>{t.map}</b>
                <kbd>M</kbd>
              </div>
              <p className="note">
                <MousePointer2 size={23} />
                {t.walkClick}
              </p>
              {page === 'controls' && (
                <button className="list-link" onClick={useMap}>
                  <Map />
                  {t.mapMode}
                  <ChevronRight />
                </button>
              )}
              {page === 'intro' && (
                <div className="action-row">
                  <button className="primary small" onClick={close}>
                    {t.play}
                  </button>
                  <button className="link-button" onClick={close}>
                    {t.skip}
                  </button>
                </div>
              )}
            </>
          )}
          {page === 'map' && (
            <>
              <VillageMap lang={lang} position={position} visit={visit} />
              <p>{fallback ? t.mapFallback : t.mapTip}</p>
              <div className="destinations">
                {zones.map((id) => (
                  <button key={id} onClick={() => visit(id)}>
                    <ZoneIcon id={id} />
                    <span>
                      {t[placeKeys[id]]}
                      <small>{t[topicKeys[id]]}</small>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </>
          )}
          {page === 'about' && (
            <>
              <div className="profile">
                <img src="/art/iker.webp" alt={data.name} />
                <div>
                  <h3>{data.name}</h3>
                  <b>{data.role}</b>
                </div>
              </div>
              <p>{data.bio}</p>
              <button className="list-link" onClick={() => open('tech')}>
                <Compass /> {t.tech} <ChevronRight />
              </button>
            </>
          )}
          {page === 'tech' && (
            <div className="books">
              {data.tech.map((tech) => (
                <section key={tech.name}>
                  <span className="book-symbol">{tech.symbol}</span>
                  <div>
                    <h3>{tech.name}</h3>
                    <p>{tech.description}</p>
                  </div>
                </section>
              ))}
            </div>
          )}
          {page === 'projects' &&
            (project === null ? (
              <div className="exhibits">
                {!fallback && (
                  <button onClick={() => visit('projects')}>
                    <Map size={20} />
                    {t.visit} · {t.projectsPlace}
                  </button>
                )}
                {data.projects.map((p, i) => (
                  <button key={p.name} onClick={() => setProject(i)}>
                    <span className="artifact" style={exhibitStyle(i)}>
                      <ProjectIcon index={i} size={27} />
                    </span>
                    <span>
                      <b>{p.name}</b>
                      <small>{p.tags.join(' · ')}</small>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  className="link-button"
                  onClick={() => setProject(null)}
                >
                  <ArrowLeft size={16} />
                  {t.projects}
                </button>
                <div className="project-art" style={exhibitStyle(project)}>
                  <ProjectIcon index={project} size={60} />
                </div>
                <h3>{data.projects[project].name}</h3>
                <div className="tags">
                  {data.projects[project].tags.map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </div>
                <p>{data.projects[project].description}</p>
                <a
                  className="primary small"
                  href={data.projects[project].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.repos}
                  <ExternalLink size={16} />
                </a>
              </>
            ))}
          {page === 'journey' && (
            <>
              <button className="list-link" onClick={() => open('subjects')}>
                <BookMarked />
                {t.subjects}
                <ChevronRight />
              </button>
              <div className="timeline">
                {data.journey.map((item) => (
                  <section key={item.date + item.title}>
                    <small>{item.date}</small>
                    <h3>{item.title}</h3>
                    {item.place && <b>{item.place}</b>}
                    <p>{item.description}</p>
                  </section>
                ))}
              </div>
            </>
          )}
          {page === 'subjects' && (
            <>
              <button className="link-button" onClick={() => open('journey')}>
                <ArrowLeft size={16} />
                {t.journey}
              </button>
              <div className="books">
                {data.subjects.map((v) => (
                  <section key={v.title}>
                    <ScrollText />
                    <div>
                      <h3>{v.title}</h3>
                      <p>{v.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </>
          )}
          {page === 'skills' && (
            <div className="books">
              {data.skills.map((v, i) => {
                const Icon = skillIcons[i]
                return (
                  <section key={v.title}>
                    <Icon />
                    <div>
                      <h3>{v.title}</h3>
                      <p>{v.description}</p>
                    </div>
                  </section>
                )
              })}
            </div>
          )}
          {page === 'contact' && (
            <>
              <p>{t.contactBody}</p>
              <a
                className="list-link"
                href={data.github}
                target="_blank"
                rel="noreferrer"
              >
                <CodeXml />
                GitHub · ikkxeer
                <ExternalLink size={17} />
              </a>
              <a
                className="list-link"
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <MessagesSquare />
                LinkedIn · Iker Aramburu
                <ExternalLink size={17} />
              </a>
              <ContactForm lang={lang} />
            </>
          )}
          {page === 'npc' && (
            <>
              <p className="speech">{t.npcLine}</p>
              <button className="primary small" onClick={() => open('map')}>
                <Map size={18} />
                {t.map}
              </button>
            </>
          )}
        </div>
      </article>
    </dialog>
  )
}
