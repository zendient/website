import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ElementalThemeProvider, useElementalTheme } from './ElementalThemeProvider';
import { ElementalTheme } from '../types/elemental';

// Test component that uses the hook
function TestComponent() {
  const theme = useElementalTheme();
  return <div data-testid="theme-display">{theme}</div>;
}

describe('ElementalThemeProvider', () => {
  describe('Provider', () => {
    it('renders children', () => {
      render(
        <ElementalThemeProvider>
          <div data-testid="child">Test Child</div>
        </ElementalThemeProvider>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('provides a valid ElementalTheme to children', () => {
      render(
        <ElementalThemeProvider>
          <TestComponent />
        </ElementalThemeProvider>
      );
      const themeDisplay = screen.getByTestId('theme-display');
      expect(Object.values(ElementalTheme)).toContain(
        themeDisplay.textContent as ElementalTheme
      );
    });
  });

  describe('useElementalTheme hook', () => {
    it('returns a valid ElementalTheme when used within provider', () => {
      render(
        <ElementalThemeProvider>
          <TestComponent />
        </ElementalThemeProvider>
      );
      const themeDisplay = screen.getByTestId('theme-display');
      const theme = themeDisplay.textContent;
      expect(['Water', 'Air', 'Earth', 'Fire']).toContain(theme);
    });

    it('throws error when used outside of ElementalThemeProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useElementalTheme must be used within ElementalThemeProvider');

      consoleSpy.mockRestore();
    });

    it('returns the same theme to multiple consumers', () => {
      function MultiConsumer() {
        const theme1 = useElementalTheme();
        const theme2 = useElementalTheme();
        return (
          <div>
            <span data-testid="theme1">{theme1}</span>
            <span data-testid="theme2">{theme2}</span>
          </div>
        );
      }

      render(
        <ElementalThemeProvider>
          <MultiConsumer />
        </ElementalThemeProvider>
      );

      expect(screen.getByTestId('theme1').textContent).toBe(
        screen.getByTestId('theme2').textContent
      );
    });
  });
});
