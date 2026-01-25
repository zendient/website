import React, { useEffect, useMemo, useState, useRef } from "react";
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
  const [finalCursorState, setFinalCursorState] = useState<{ lineIndex: number | null; isFinal: boolean } | null>(null);
  const hasInitializedRef = useRef(false);

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

    const timings = texts.map((text, lineIndex) => {
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

    // Adjust show times to avoid collisions with previous line's hide time
    // This creates a brief gap where no cursor is visible between lines
    for (let i = 1; i < timings.length; i++) {
      const prevHideTime = timings[i - 1].hideTime;
      if (prevHideTime !== null && timings[i].showTime === prevHideTime) {
        timings[i].showTime += 1; // Add 1ms delay to create visible gap
      }
    }

    return timings;
  }, [cursor, texts, keystrokeDuration, textGap, lineDelays]);


  /* Cursor Rendering */
  useEffect(() => {
    if (!cursorTimings || finalCursorState?.isFinal) return;

    // Reset the initialization flag when timings change
    hasInitializedRef.current = false;
    const timeouts: NodeJS.Timeout[] = [];
    const lastLineIndex = cursorTimings.length - 1;

    cursorTimings.forEach(({ showTime, hideTime }, lineIndex) => {
      const isLastLine = lineIndex === lastLineIndex;

      // Use immediate state update for first line with showTime=0, otherwise use setTimeout
      if (showTime === 0 && !hasInitializedRef.current) {
        hasInitializedRef.current = true;
        setCursorLineIndex(lineIndex);
      } else if (showTime > 0) {
        timeouts.push(setTimeout(() => setCursorLineIndex(lineIndex), showTime));
      }

      if (hideTime !== null) {
        // Cursor has a defined hide time
        if (isLastLine) {
          // Last line with finite persistence - hide and mark final
          timeouts.push(setTimeout(() => {
            setCursorLineIndex(null);
            setFinalCursorState({ lineIndex: null, isFinal: true });
          }, hideTime));
        } else {
          // Non-last line - just let cursor hide naturally (next line will take over)
          timeouts.push(setTimeout(() => {
            setCursorLineIndex(null);
          }, hideTime));
        }
      } else if (isLastLine) {
        // Last line with infinite persistence - mark as final when cursor reaches it
        timeouts.push(setTimeout(() => {
          setFinalCursorState({ lineIndex: lastLineIndex, isFinal: true });
        }, showTime));
      }
    });

    return () => timeouts.forEach(clearTimeout);
  }, [cursorTimings, finalCursorState?.isFinal]);


  // Use final cursor state if animation is complete, otherwise use current state
  const displayCursorLineIndex = finalCursorState?.isFinal ? finalCursorState.lineIndex : cursorLineIndex;

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
            {displayCursorLineIndex === index && <TypingTextCursor />}
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
