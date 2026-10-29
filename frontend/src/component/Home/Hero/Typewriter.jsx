
import React, { useEffect, useRef, useState } from "react";
import "./Typewriter.css";

export default function Typewriter({
  text = "",
  highlight = "",
  speed = 38,
  onComplete,
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const callbackRef = useRef(onComplete);
  const fullText = `${text}${highlight}`;

  useEffect(() => {
    callbackRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let count = 0;
    let timeoutId;

    setVisibleCount(0);

    const typeNext = () => {
      count += 1;
      setVisibleCount(count);

      if (count < fullText.length) {
        timeoutId = window.setTimeout(typeNext, speed);
      } else {
        callbackRef.current?.();
      }
    };

    if (!fullText.length) {
      callbackRef.current?.();
      return undefined;
    }

    timeoutId = window.setTimeout(typeNext, speed);

    return () => window.clearTimeout(timeoutId);
  }, [fullText, speed]);

  const visibleText = fullText.slice(0, visibleCount);
  const visibleBefore = visibleText.slice(
    0,
    Math.min(visibleText.length, text.length)
  );

  const visibleHighlight =
    visibleText.length > text.length
      ? visibleText.slice(text.length)
      : "";

  return (
    <span className="typewriter-text">
      {visibleBefore}
      {visibleHighlight && (
        <span className="typewriter-highlight">
          {visibleHighlight}
        </span>
      )}
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
