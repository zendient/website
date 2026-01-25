import { describe, it, expect } from 'vitest';
import { ElementalTheme } from '../types/elemental';
import { useHaiku } from './haiku';

describe('haiku utilities', () => {
  describe('useHaiku', () => {
    it('returns a haiku with required properties', () => {
      const haiku = useHaiku();
      expect(haiku).toHaveProperty('title');
      expect(haiku).toHaveProperty('lines');
      expect(haiku).toHaveProperty('elementalTheme');
      expect(haiku).toHaveProperty('renderTime');
    });

    it('haiku lines are a 3-element array of strings', () => {
      const haiku = useHaiku();
      expect(Array.isArray(haiku.lines)).toBe(true);
      expect(haiku.lines).toHaveLength(3);
      haiku.lines.forEach((line) => {
        expect(typeof line).toBe('string');
        expect(line.length).toBeGreaterThan(0);
      });
    });

    it('haiku renderTime is a positive number', () => {
      const haiku = useHaiku();
      expect(typeof haiku.renderTime).toBe('number');
      expect(haiku.renderTime).toBeGreaterThan(0);
    });

    it('returns the same haiku singleton on multiple calls', () => {
      const haiku1 = useHaiku();
      const haiku2 = useHaiku();
      expect(haiku1).toEqual(haiku2);
    });

    it('title is a non-empty string', () => {
      const haiku = useHaiku();
      expect(typeof haiku.title).toBe('string');
      expect(haiku.title.length).toBeGreaterThan(0);
    });

    it('elementalTheme is valid', () => {
      const haiku = useHaiku();
      expect(Object.values(ElementalTheme)).toContain(haiku.elementalTheme);
    });
  });
});
