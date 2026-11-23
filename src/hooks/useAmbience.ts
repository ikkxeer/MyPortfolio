import { useEffect, useState } from 'react'

/** Original surf and two-tone bird calls, synthesized locally after a gesture. */
export function useAmbience() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!on) return
    const ctx = new AudioContext(),
      gain = ctx.createGain(),
      filter = ctx.createBiquadFilter()
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate),
      data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    const surf = ctx.createBufferSource()
    surf.buffer = buffer
    surf.loop = true
    filter.type = 'lowpass'
    filter.frequency.value = 480
    gain.gain.value = 0.035
    surf.connect(filter).connect(gain).connect(ctx.destination)
    surf.start()
    const lfo = ctx.createOscillator(),
      depth = ctx.createGain()
    lfo.frequency.value = 0.12
    depth.gain.value = 0.014
    lfo.connect(depth).connect(gain.gain)
    lfo.start()
    function chirp() {
      if (document.hidden) return
      const night = new Date().getHours() < 6 || new Date().getHours() > 20
      for (const delay of [0, 0.18]) {
        const bird = ctx.createOscillator(),
          volume = ctx.createGain(),
          t = ctx.currentTime + delay
        bird.frequency.setValueAtTime(night ? 980 : 2050, t)
        bird.frequency.exponentialRampToValueAtTime(
          night ? 760 : 2980,
          t + 0.13,
        )
        volume.gain.setValueAtTime(0.0001, t)
        volume.gain.exponentialRampToValueAtTime(0.014, t + 0.035)
        volume.gain.exponentialRampToValueAtTime(0.0001, t + 0.17)
        bird.connect(volume).connect(ctx.destination)
        bird.start(t)
        bird.stop(t + 0.19)
        bird.onended = () => {
          bird.disconnect()
          volume.disconnect()
        }
      }
    }
    void ctx.resume()
    const id = window.setInterval(chirp, 7600)
    const visibility = () => {
      if (document.hidden) void ctx.suspend()
      else void ctx.resume()
    }
    document.addEventListener('visibilitychange', visibility)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', visibility)
      surf.stop()
      lfo.stop()
      void ctx.close()
    }
  }, [on])
  return [on, () => setOn((v) => !v)] as const
}
