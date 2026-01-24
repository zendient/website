import { parse } from 'yaml';
import haikusYaml from '../data/haikus.yaml?raw';
import { ElementalTheme } from '../types/elemental';

export interface Haiku {
  title: string;
  lines: [string, string, string];
  elementalTheme: ElementalTheme;
}

const data = parse(haikusYaml) as Record<string, any>;

function weightedRandomElement() {
  // Select an ElementalTheme by weight
  const elements = Object.values(ElementalTheme)
    .filter((element) => data[element])
    .map((element) => ({
      element,
      weight: data[element].weight ?? 1,
    }));

  const totalWeight = elements.reduce((sum, t) => sum + t.weight, 0);
  let random = Math.random() * totalWeight;

  let selectedElement = elements[0].element;
  for (const t of elements) {
    random -= t.weight;
    if (random <= 0) {
      selectedElement = t.element;
      break;
    }
  }
  return selectedElement;
}

export { weightedRandomElement };

export function getRandomHaiku(): Haiku {

  // Choose a theme
  let elementalTheme = weightedRandomElement();

  // Choose a random haiku from the chosen theme
  const haikusArray = data[elementalTheme].haikus ?? [];
  const randomIndex = Math.floor(Math.random() * haikusArray.length);

  // Load the selected haiku
  const haiku = haikusArray[randomIndex];
  const [title, linesStr] = Object.entries(haiku)[0];
  const lines = (linesStr as string)
    .trim()
    .split('\n')
    .map((line: string) => line.trim())
    .filter(Boolean) as [string, string, string];

  return { title, lines, elementalTheme };
}
