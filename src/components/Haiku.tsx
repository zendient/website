import { SequencedTypingText } from './SequencedTypingText';
import { useHaiku, KEYSTROKE_DURATION, DELAY_OFFSET, TEXT_GAP, PERSISTENCE_DURATION } from '../utils/haiku';

export function Haiku() {
  const haiku = useHaiku();

  return (
    <p className="description-text max-w-md mb-6">
      <SequencedTypingText
        texts={haiku.lines}
        keystrokeDuration={KEYSTROKE_DURATION}
        delayOffset={DELAY_OFFSET}
        textGap={TEXT_GAP}
        cursor={{
          showImmediately: false,
          persistenceDuration: PERSISTENCE_DURATION,
        }}
        reserveSpace={true}
      />
    </p>
  );
}
