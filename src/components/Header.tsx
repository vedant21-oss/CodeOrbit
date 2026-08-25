import React from 'react';
import { 
  Smartphone, 
  Search, 
  Monitor, 
  Zap,
  Command,
} from 'lucide-react';
import { SyncState, AppViewMode, NavigationTab } from '../types';

interface HeaderProps {
  syncState: SyncState;
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  showPhoneFrame: boolean;
  setShowPhoneFrame: (show: boolean) => void;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  syncState,
  viewMode,
  setViewMode,
  showPhoneFrame,
  setShowPhoneFrame,
  onSelectTab,
  onOpenCommandPalette,
}) => {
  return (
    <header className="h-14 border-b border-slate-200 bg-white/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      
      {/* Brand & Connection Badge */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => setViewMode('landing')}
          className="flex items-center space-x-2.5 group focus:outline-none"
        >
          <div className="w-7 h-7 rounded-lg bg-[#EA580C] flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-sm">CodeOrbit</span>
        </button>

        <div className="h-3.5 w-px bg-slate-200 hidden sm:block" />

        {/* Live Connection Badge */}
        <div className="hidden sm:flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-slate-700 font-mono font-medium">iQOO 13 Pro Live</span>
        </div>
      </div>

      {/* CENTER: Command Bar Search Trigger */}
      <div className="flex-1 max-w-sm mx-4 hidden md:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full px-3 py-1.5 rounded-lg bg-slate-100/70 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-xs text-slate-600 hover:text-slate-900 flex items-center justify-between transition-all group"
        >
          <div className="flex items-center space-x-2 truncate">
            <Search className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="truncate">Search commands or codebase...</span>
          </div>

          <div className="flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-500 shadow-2xs">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Controls: View Switcher */}
      <div className="flex items-center space-x-2">
        
        {/* Mobile Search Button */}
        <button
          onClick={onOpenCommandPalette}
          className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 md:hidden hover:text-slate-900"
        >
          <Search className="w-4 h-4 text-[#EA580C]" />
        </button>

        {/* View Mode Pills */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setViewMode('landing')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              viewMode === 'landing'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Landing
          </button>
          
          <button
            onClick={() => { setViewMode('console'); setShowPhoneFrame(false); }}
            className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center space-x-1.5 ${
              viewMode === 'console' && !showPhoneFrame
                ? 'bg-[#EA580C] text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Console</span>
          </button>

          <button
            onClick={() => { setViewMode('console'); setShowPhoneFrame(!showPhoneFrame); }}
            className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center space-x-1.5 ${
              showPhoneFrame
                ? 'bg-[#EA580C] text-white font-semibold shadow-xs'
                : 'text-[#EA580C] hover:bg-orange-50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone View</span>
          </button>
        </div>
      </div>

    </header>
  );
};
