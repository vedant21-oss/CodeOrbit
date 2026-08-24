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
    <header className="h-14 border-b border-white/[0.06] bg-[#07080D]/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
      
      {/* Brand & Connection Badge */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setViewMode('landing')}
          className="flex items-center space-x-2.5 group focus:outline-none"
        >
          <div className="w-7 h-7 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-md shadow-[#FF6B00]/20">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-bold text-white tracking-tight text-sm">CodeOrbit</span>
        </button>

        <div className="h-3.5 w-px bg-white/10 hidden sm:block" />

        {/* Live Device Connection Status */}
        <div className="hidden sm:flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-slate-300 font-mono">iQOO 13 Pro Live</span>
        </div>
      </div>

      {/* CENTER: Command Bar Trigger */}
      <div className="flex-1 max-w-sm mx-4 hidden md:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-[#FF6B00]/40 text-xs text-slate-400 hover:text-slate-200 flex items-center justify-between transition-all group"
        >
          <div className="flex items-center space-x-2 truncate">
            <Search className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span className="truncate">Search commands or codebase...</span>
          </div>

          <div className="flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-black/50 border border-white/[0.08] text-[10px] font-mono text-slate-400">
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
          className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-300 md:hidden hover:text-white"
        >
          <Search className="w-4 h-4 text-[#FF6B00]" />
        </button>

        {/* View Mode Pills */}
        <div className="flex items-center bg-black/60 p-1 rounded-lg border border-white/[0.06] text-xs">
          <button
            onClick={() => setViewMode('landing')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              viewMode === 'landing'
                ? 'bg-white/[0.1] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Landing
          </button>
          
          <button
            onClick={() => { setViewMode('console'); setShowPhoneFrame(false); }}
            className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center space-x-1.5 ${
              viewMode === 'console' && !showPhoneFrame
                ? 'bg-[#FF6B00] text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Console</span>
          </button>

          <button
            onClick={() => { setViewMode('console'); setShowPhoneFrame(!showPhoneFrame); }}
            className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center space-x-1.5 ${
              showPhoneFrame
                ? 'bg-[#FF6B00] text-white font-semibold shadow-sm'
                : 'text-[#FF6B00] hover:bg-[#FF6B00]/10'
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
