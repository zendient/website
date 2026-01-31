import { useContext } from 'react';
import { ElementalTheme } from '../types/elemental';
import { ElementalThemeContext } from '../components/ElementalThemeProvider';

export function useElementalTheme(): ElementalTheme {
  const context = useContext(ElementalThemeContext);
  if (!context) {
    throw new Error('useElementalTheme must be used within ElementalThemeProvider');
  }
  return context;
}
