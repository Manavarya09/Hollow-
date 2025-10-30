import React from 'react';
import { Theme } from '../types';

interface ThemeSwitcherProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const THEMES: { name: Theme; color: string }[] = [
  { name: 'paper', color: '#F1F1F1' },
  { name: 'dark', color: '#121212' },
  { name: 'sepia', color: '#f4e8d5' },
];

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  return (
    <div className="flex items-center space-x-2">
      {THEMES.map(({ name, color }) => (
        <button
          key={name}
          title={`Switch to ${name} theme`}
          onClick={() => setTheme(name)}
          className={`w-5 h-5 rounded-full border-2 transition-transform duration-200 ${
            theme === name ? 'border-[var(--color-text-primary)] scale-110' : 'border-transparent hover:scale-110'
          }`}
          style={{ backgroundColor: color }}
          aria-pressed={theme === name}
        />
      ))}
    </div>
  );
};
