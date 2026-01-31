import { createContext, ReactNode } from 'react';
import { ElementalTheme } from '../types/elemental';
import { selectedTheme } from '../utils/haiku';

export const ElementalThemeContext = createContext<ElementalTheme | undefined>(undefined);

export function ElementalThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ElementalThemeContext.Provider value={selectedTheme}>
      {children}
    </ElementalThemeContext.Provider>
  );
}
