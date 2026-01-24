import React, { useEffect, useMemo, useState } from "react";
import { TypingText, TypingTextCursor, type TypingTextProps } from "./animate-ui/primitives/texts/typing";

interface CursorConfig {
  showImmediately?: boolean;
  persistenceDuration?: number | null;
}

interface SequencedTypingTextProps extends Omit<TypingTextProps, "text" | "delay" | "duration"> {
  texts: string[];
  keystrokeDuration?: number;
  delayOffset?: number;
  textGap?: number;
  cursor?: CursorConfig;
  reserveSpace?: boolean; // Whether to reserve vertical space for all lines to prevent layout shift
}

/**
 * Renders a sequence of TypingText components with automatically calculated delays.
 * Each text starts after the previous one completes (based on text length × keystrokeDuration).
 * Only one cursor is shown at a time, following the current typing line.
 *
 * @param texts - Array of strings to type
 * @param keystrokeDuration - Time in ms per character (default: 20)
 * @param delayOffset - Initial delay before first text starts, accounting for any preceding animations (default: 500)
 * @param textGap - Gap between each line. Cursor stays on finished line for textGap/2, then switches to next line for textGap/2 before typing starts (default: 0)
 * @param cursor - Cursor configuration object (default: undefined, cursor disabled)
 *   - showImmediately: Show cursor right away vs wait for delayOffset (default: false)
 *   - persistenceDuration: How long cursor persists after last line finishes (ms). null = forever (default: null)
 * @param reserveSpace - Whether to reserve vertical space for all lines to prevent layout shift (default: false)
 */
export function SequencedTypingText({
  texts,
  keystrokeDuration = 20,
  delayOffset = 500,
  textGap = 0,
  cursor,
  reserveSpace = false,
  ...typingTextProps
}: SequencedTypingTextProps) {
  const [cursorLineIndex, setCursorLineIndex] = useState<number | null>(null);

  // Pre-calculate all delays once
  const lineDelays = useMemo(() => {
    let cumulativeTime = delayOffset;
    return texts.map((text, index) => {
      const delay = cumulativeTime + (index > 0 ? textGap : 0);
      cumulativeTime = delay + text.length * keystrokeDuration;
      return delay;
    });
  }, [texts, keystrokeDuration, delayOffset, textGap]);

  // Pre-calculate cursor show/hide timings for each line
  const cursorTimings = useMemo(() => {
    if (!cursor) return null;

    const { showImmediately = false, persistenceDuration = null } = cursor;

    return texts.map((text, lineIndex) => {
      const isFirstLine = lineIndex === 0;
      const isLastLine = lineIndex === texts.length - 1;
      const lineDuration = text.length * keystrokeDuration;
      const lineTypingStartTime = lineDelays[lineIndex];

      // Calculate show time
      let showTime = lineTypingStartTime;
      if (!isFirstLine && textGap > 0) {
        showTime -= textGap / 2;
      }
      if (isFirstLine && showImmediately) {
        showTime = 0;
      }

      // Calculate hide time
      let hideTime: number | null = lineTypingStartTime + lineDuration;
      if (isLastLine) {
        hideTime = persistenceDuration !== null ? hideTime + persistenceDuration : null;
      } else {
        hideTime += textGap / 2;
      }

      return { showTime, hideTime };
    });
  }, [cursor, texts, keystrokeDuration, textGap, lineDelays]);


  /* Cursor Rendering */
  useEffect(() => {
    if (!cursorTimings) return;

    const timeouts: NodeJS.Timeout[] = [];

    cursorTimings.forEach(({ showTime, hideTime }, lineIndex) => {
      timeouts.push(setTimeout(() => setCursorLineIndex(lineIndex), showTime));

      if (hideTime !== null) {
        timeouts.push(setTimeout(() => setCursorLineIndex(null), hideTime));
      }
    });

    return () => timeouts.forEach(clearTimeout);
  }, [cursorTimings]);


  const content = (
    <>
      {texts.map((text, index) => (
        <React.Fragment key={index}>
          <TypingText
            text={text}
            delay={lineDelays[index]}
            duration={keystrokeDuration}
            inView={true}
            {...typingTextProps}
          >
            {cursorLineIndex === index && <TypingTextCursor />}
          </TypingText>
          {index < texts.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );

  // If reserveSpace is enabled, wrap in a container with min-height based on line count
  if (reserveSpace) {
    return (
      <span
        style={{
          display: 'inline-block',
          minHeight: `${texts.length}lh`, // Uses CSS line-height units
        }}
      >
        {content}
      </span>
    );
  }

  return content;
}
