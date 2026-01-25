import { createContext, useContext, ReactNode } from 'react';
import { ElementalTheme } from '../types/elemental';
import { selectedTheme } from '../utils/haiku';

const ElementalThemeContext = createContext<ElementalTheme | undefined>(undefined);

export function ElementalThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ElementalThemeContext.Provider value={selectedTheme}>
      {children}
    </ElementalThemeContext.Provider>
  );
}

export function useElementalTheme(): ElementalTheme {
  const context = useContext(ElementalThemeContext);
  if (!context) {
    throw new Error('useElementalTheme must be used within ElementalThemeProvider');
  }
  return context;
}
