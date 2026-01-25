import { describe, it, expect } from 'vitest';
import { ElementalTheme } from '../types/elemental';
import { ElementalThemeData } from './elementalTheme';

describe('ElementalThemeData', () => {
  describe('random', () => {
    it('returns a valid ElementalTheme', () => {
      const result = ElementalThemeData.random();
      expect(Object.values(ElementalTheme)).toContain(result);
    });

    it('respects weights (heaviest elements should be selected most often)', () => {
      const iterations = 1000;
      const weights = ElementalThemeData.allWeights();

      // Initialize counts for all themes
      const counts: Record<string, number> = {};
      Object.values(ElementalTheme).forEach((theme) => {
        counts[theme] = 0;
      });

      for (let i = 0; i < iterations; i++) {
        const theme = ElementalThemeData.random();
        counts[theme]++;
      }

      // Sort themes by weight (descending)
      const sortedThemes = Object.values(ElementalTheme).sort(
        (a, b) => weights[b] - weights[a]
      );

      // Verify that heavier-weighted themes are selected more frequently
      for (let i = 0; i < sortedThemes.length - 1; i++) {
        const heavier = sortedThemes[i];
        const lighter = sortedThemes[i + 1];
        expect(counts[heavier]).toBeGreaterThan(counts[lighter]);
      }
    });

    it('never returns an invalid theme', () => {
      const iterations = 100;
      const validThemes = Object.values(ElementalTheme);

      for (let i = 0; i < iterations; i++) {
        const result = ElementalThemeData.random();
        expect(validThemes).toContain(result);
      }
    });
  });

  describe('allWeights', () => {
    it('returns weights for all ElementalTheme values', () => {
      const weights = ElementalThemeData.allWeights();
      const themesInEnum = Object.values(ElementalTheme);

      // Should have exactly as many weights as themes
      expect(Object.keys(weights)).toHaveLength(themesInEnum.length);

      // Each theme should have a weight
      themesInEnum.forEach((theme) => {
        expect(weights).toHaveProperty(theme);
      });
    });

    it('returns a copy, not a reference to the original', () => {
      const weights1 = ElementalThemeData.allWeights();
      const weights2 = ElementalThemeData.allWeights();
      expect(weights1).toEqual(weights2);
      expect(weights1).not.toBe(weights2);
    });

    it('returns all required theme keys', () => {
      const weights = ElementalThemeData.allWeights();
      Object.values(ElementalTheme).forEach((theme) => {
        expect(weights).toHaveProperty(theme);
      });
    });

    it('all weights are positive numbers', () => {
      const weights = ElementalThemeData.allWeights();
      Object.values(weights).forEach((weight) => {
        expect(typeof weight).toBe('number');
        expect(weight).toBeGreaterThan(0);
      });
    });

    it('weights and enum are in perfect sync', () => {
      const weights = ElementalThemeData.allWeights();
      const enumThemes = Object.values(ElementalTheme);
      const weightKeys = Object.keys(weights);

      // No missing weights: every enum value should have a weight
      enumThemes.forEach((theme) => {
        expect(weightKeys).toContain(theme);
      });

      // No extra weights: every weight key should be in the enum
      weightKeys.forEach((key) => {
        expect(enumThemes).toContain(key as ElementalTheme);
      });

      // Same count ensures we caught everything
      expect(weightKeys).toHaveLength(enumThemes.length);
    });
  });

  describe('description', () => {
    it('returns a non-empty string for each theme', () => {
      Object.values(ElementalTheme).forEach((theme) => {
        const description = ElementalThemeData.description(theme);
        expect(typeof description).toBe('string');
        expect(description.length).toBeGreaterThan(0);
      });
    });

    it('returns theme descriptions that follow the narrative arc', () => {
      const descriptions = Object.values(ElementalTheme).map((theme) => ({
        theme,
        description: ElementalThemeData.description(theme),
      }));

      descriptions.forEach(({ description }) => {
        // Each description should contain multiple sentences or phrases
        const parts = description.split('. ');
        expect(parts.length).toBeGreaterThanOrEqual(2);
      });
    });
  });

  describe('weight', () => {
    it('returns the correct weight for each theme', () => {
      const allWeights = ElementalThemeData.allWeights();
      Object.values(ElementalTheme).forEach((theme) => {
        expect(ElementalThemeData.weight(theme)).toBe(allWeights[theme]);
      });
    });
  });
});
