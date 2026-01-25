import { ElementalTheme } from '../types/elemental';

// Weights for each elemental theme - determines selection probability
const ELEMENTAL_WEIGHTS: Record<ElementalTheme, number> = {
  [ElementalTheme.Water]: 1,
  [ElementalTheme.Air]: 0.8,
  [ElementalTheme.Earth]: 0.4,
  [ElementalTheme.Fire]: 0.3,
};

/**
 * Selects a random ElementalTheme based on weighted probabilities
 * @returns A randomly selected ElementalTheme
 */
export function weightedRandomElement(): ElementalTheme {
  const elements = Object.values(ElementalTheme).map((element) => ({
    element,
    weight: ELEMENTAL_WEIGHTS[element] ?? 1,
  }));

  const totalWeight = elements.reduce((sum, t) => sum + t.weight, 0);
  let random = Math.random() * totalWeight;

  let selectedElement = elements[0];
  for (const t of elements) {
    random -= t.weight;
    if (random <= 0) {
      selectedElement = t;
      break;
    }
  }
  return selectedElement.element;
}

/**
 * Gets the weight for a specific elemental theme
 * @param element The elemental theme
 * @returns The weight of the element
 */
export function getElementalWeight(element: ElementalTheme): number {
  return ELEMENTAL_WEIGHTS[element] ?? 1;
}

/**
 * Gets all elemental weights
 * @returns Record of all elemental themes and their weights
 */
export function getAllElementalWeights(): Record<ElementalTheme, number> {
  return { ...ELEMENTAL_WEIGHTS };
}
