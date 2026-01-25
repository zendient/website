import { ElementalTheme } from '../types/elemental';

/**
 * Static class for managing elemental theme data including weights and zen descriptions
 */
export class ElementalThemeData {
  // Weights for each elemental theme - determines selection probability
  private static readonly WEIGHTS: Record<ElementalTheme, number> = {
    [ElementalTheme.Water]: 1,
    [ElementalTheme.Air]: 0.8,
    [ElementalTheme.Earth]: 0.6,
    [ElementalTheme.Fire]: 0.5,
  };

  // Zen descriptions following the Narrative Arc structure
  private static readonly DESCRIPTIONS: Record<ElementalTheme, string> = {
    [ElementalTheme.Water]:
      'Of the kinds of water, there is first the division into the liquid and the fusible... The liquid kind... is soft and fluid. The fusible kind... is composed of large and uniform grains, and is more stable than the other.',
    [ElementalTheme.Air]:
      'So it is with air: there is the brightest variety which we call aether, the muddiest which we call mist and darkness, and other kinds for which we have no name...',
    [ElementalTheme.Earth]:
      'There are also many kinds of earth... there is stone, which the water which is mixed with earth does not dissolve... there is also the earthenware kind... and there is also salt, a body dear to the gods.',
    [ElementalTheme.Fire]:
      'Of fire, there are many kinds: for example, flame; and that which issues from flame, which does not burn but provides light to the eyes; and that which is left in the embers of fire when the flame is quenched.',
  };

  /**
   * Gets the weight for a specific elemental theme
   * @param element The elemental theme
   * @returns The weight of the element
   */
  public static weight(element: ElementalTheme): number {
    return this.WEIGHTS[element] ?? 1;
  }

  /**
   * Gets all elemental weights
   * @returns Record of all elemental themes and their weights
   */
  public static allWeights(): Record<ElementalTheme, number> {
    return { ...this.WEIGHTS };
  }

  /**
   * Selects a random ElementalTheme based on weighted probabilities
   * @returns A randomly selected ElementalTheme
   */
  public static random(): ElementalTheme {
    const elements = Object.values(ElementalTheme).map((element) => ({
      element,
      weight: this.WEIGHTS[element] ?? 1,
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
   * Gets the zen description for a specific elemental theme
   * @param element The elemental theme
   * @returns The zen description for the element
   */
  public static description(element: ElementalTheme): string {
    return this.DESCRIPTIONS[element] ?? '';
  }
}
