import { describe, it, expect } from 'vitest';
import { ElementalTheme } from '../types/elemental';
import { weightedRandomElement } from './haiku';

describe('weightedRandomElement', () => {
  it('returns a valid ElementalTheme', () => {
    const result = weightedRandomElement();
    expect(Object.values(ElementalTheme)).toContain(result);
  });

  it('respects weights (Water should be selected most often)', () => {
    const iterations = 1000;
    const counts: Record<string, number> = {
      Water: 0,
      Air: 0,
      Earth: 0,
      Fire: 0,
    };

    for (let i = 0; i < iterations; i++) {
      const theme = weightedRandomElement();
      counts[theme]++;
    }

    // Water weight: 1, Air weight: 0.8, Earth weight: 0.4, Fire weight: 0.3
    // Expected ratios: Water ~42%, Air ~34%, Earth ~17%, Fire ~10%
    // Using loose bounds to account for randomness
    expect(counts.Water).toBeGreaterThan(counts.Air);
    expect(counts.Air).toBeGreaterThan(counts.Earth);
    expect(counts.Earth).toBeGreaterThan(counts.Fire);
  });

  it('never returns an invalid theme', () => {
    const iterations = 100;
    const validThemes = Object.values(ElementalTheme);

    for (let i = 0; i < iterations; i++) {
      const result = weightedRandomElement();
      expect(validThemes).toContain(result);
    }
  });
});
