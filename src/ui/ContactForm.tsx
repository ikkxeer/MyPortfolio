import { useState, type FormEvent } from 'react'
import type { Lang } from '../data/village'
// Set a verified public form ID at build time to enable delivery from the mailbox.
const id = import.meta.env.VITE_FORMSPREE_ID?.trim()
const labels = {
  es: [
    'Tu correo',
    'Mensaje',
    'Enviar mensaje',
    'Enviando…',
    'Mensaje enviado. ¡Gracias por escribir!',
    'No se pudo enviar. Revisa la conexión y vuelve a intentarlo.',
  ],
  ca: [
    'El teu correu',
    'Missatge',
    'Enviar el missatge',
    'Enviant…',
    'Missatge enviat. Gràcies per escriure!',
    'No s’ha pogut enviar. Comprova la connexió i torna-ho a provar.',
  ],
  en: [
    'Your email',
    'Message',
    'Send message',
    'Sending…',
    'Message sent. Thanks for writing!',
    'Delivery failed. Check your connection and try again.',
  ],
}
export default function ContactForm({ lang }: { lang: Lang }) {
  const [state, setState] = useState<
    'idle' | 'sending' | 'success' | 'failure'
  >('idle')
  if (!id || !/^[a-z0-9]{8}$/i.test(id)) return null
  const [email, message, send, sending, success, error] = labels[lang]
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'sending') return
    const form = event.currentTarget,
      body = new FormData(form)
    setState('sending')
    try {
      const result = await fetch('https://formspree.io/f/' + id, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      })
      if (!result.ok) throw new Error()
      form.reset()
      setState('success')
    } catch {
      setState('failure')
    }
  }
  return (
    <form className="mail-form" onSubmit={submit}>
      <label>
        {email}
        <input required type="email" name="email" autoComplete="email" />
      </label>
      <label>
        {message}
        <textarea name="message" rows={4} required maxLength={5000} />
      </label>
      <button className="primary small" disabled={state === 'sending'}>
        {state === 'sending' ? sending : send}
      </button>
      <p role="status">
        {state === 'success' ? success : state === 'failure' ? error : ''}
      </p>
    </form>
  )
}
