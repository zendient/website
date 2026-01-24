import { parse } from 'yaml';
import haikusYaml from '../data/haikus.yaml?raw';
import { ElementalTheme } from '../types/elemental';
import { weightedRandomElement } from './elementalTheme';

// Animation timing constants for haiku typing effect
export const KEYSTROKE_DURATION = 24;
export const DELAY_OFFSET = 1500;
export const TEXT_GAP = 1800;
export const PERSISTENCE_DURATION = 3000;

export interface Haiku {
  title: string;
  lines: [string, string, string];
  elementalTheme: ElementalTheme;
}

export interface HaikuWithTiming extends Haiku {
  renderTime: number;
}

const data = parse(haikusYaml) as Record<string, any>;

function calculateRenderTime(lines: string[]): number {
  let cumulativeTime = DELAY_OFFSET;
  lines.forEach((line, index) => {
    if (index > 0) cumulativeTime += TEXT_GAP;
    cumulativeTime += line.length * KEYSTROKE_DURATION;
  });
  return cumulativeTime;
}


function getRandomHaikuForTheme(theme: ElementalTheme): Haiku {
  const haikusArray = data[theme] ?? [];
  const randomIndex = Math.floor(Math.random() * haikusArray.length);
  const haiku = haikusArray[randomIndex];
  const [title, linesStr] = Object.entries(haiku)[0];
  const lines = (linesStr as string)
    .trim()
    .split('\n')
    .map((line: string) => line.trim())
    .filter(Boolean) as [string, string, string];

  return { title, lines, elementalTheme: theme };
}

// Module-level singletons - selected once when module loads
export const selectedTheme = weightedRandomElement();

const selectedHaikuData = getRandomHaikuForTheme(selectedTheme);

export const currentHaiku: HaikuWithTiming = {
  ...selectedHaikuData,
  renderTime: calculateRenderTime(selectedHaikuData.lines),
};

// Hook that returns the haiku singleton (no provider needed!)
export function useHaiku(): HaikuWithTiming {
  return currentHaiku;
}
