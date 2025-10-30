import React from 'react';
import { View, Theme } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const NavItem: React.FC<{
  label: string;
  viewName: View;
  currentView: View;
  setView: (view: View) => void;
}> = ({ label, viewName, currentView, setView }) => {
  const isActive = currentView === viewName;
  return (
    <button
      onClick={() => setView(viewName)}
      className={`px-3 py-1 text-sm md:text-base transition-colors duration-300 ${
        isActive ? 'text-[var(--color-text-primary)] font-semibold' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
      }`}
    >
      {label}
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({ currentView, setView, theme, setTheme }) => {
  return (
    <header className="sticky top-0 z-10 bg-[var(--color-background)]/80 backdrop-blur-sm border-b border-[var(--color-border)] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-serif tracking-tighter text-[var(--color-text-primary)]">HOLLOW</h1>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <nav className="flex items-center space-x-2 md:space-x-4">
              <NavItem label="The Void" viewName="grid" currentView={currentView} setView={setView} />
              <NavItem label="My Echoes" viewName="dashboard" currentView={currentView} setView={setView} />
              <NavItem label="The Collective" viewName="report" currentView={currentView} setView={setView} />
            </nav>
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};
