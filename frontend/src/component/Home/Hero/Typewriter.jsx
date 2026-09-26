import { useEffect, useRef, useState } from 'react'
import './Herosection.css'

export default function Typewriter({
  text,
  speed = 80,
  startDelay = 250,
  cursorHoldMs = 1600,
  instant = false,
  onComplete,
}) {
  const [display, setDisplay] = useState(instant ? text : '')
  const [showCursor, setShowCursor] = useState(!instant)
  const completeRef = useRef(onComplete)

  useEffect(() => {
    completeRef.current = onComplete
  })

  useEffect(() => {
    if (instant) {
      completeRef.current?.()
      return
    }

    let index = 0
    let interval
    let holdTimeout

    const start = setTimeout(() => {
      interval = setInterval(() => {
        index += 1
        setDisplay(text.slice(0, index))

        if (index >= text.length) {
          clearInterval(interval)
          completeRef.current?.()
          holdTimeout = setTimeout(() => setShowCursor(false), cursorHoldMs)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(start)
      clearInterval(interval)
      clearTimeout(holdTimeout)
    }
  }, [text, speed, startDelay, cursorHoldMs, instant])

  return (
    <span className="typewriter">
      {display}
      {showCursor && <span className="typewriter__cursor" aria-hidden="true" />}
    </span>
  )
}