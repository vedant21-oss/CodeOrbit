import React from 'react';
import { 
  Smartphone, 
  Search, 
  Monitor, 
  Zap,
  Command,
  Sparkles,
  CheckCircle2
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
    <header className="h-14 border-b border-white/[0.08] bg-[#07080E]/85 backdrop-blur-2xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
      
      {/* Brand & Live Connection Indicator */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setViewMode('landing')}
          className="flex items-center space-x-2.5 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-iqoo-amber to-iqoo-orange flex items-center justify-center text-white shadow-iqoo font-semibold group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div className="text-left">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white tracking-tight text-base">CodeOrbit</span>
              <span className="text-[10px] tracking-wider font-medium px-1.5 py-0.2 rounded bg-iqoo-amber/10 text-iqoo-amber border border-iqoo-amber/20">
                v1.0
              </span>
            </div>
          </div>
        </button>

        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        {/* Live Device Connection Status */}
        <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-surface-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-surface-200 font-medium">iQOO 13 Pro Live</span>
        </div>
      </div>

      {/* CENTER: Raycast-Style Command Bar Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-iqoo-amber/40 text-xs text-surface-400 hover:text-surface-200 flex items-center justify-between transition-all group shadow-inner"
        >
          <div className="flex items-center space-x-2.5 truncate">
            <Search className="w-3.5 h-3.5 text-iqoo-amber group-hover:scale-110 transition-transform" />
            <span className="truncate">Ask CodeOrbit or search commands...</span>
          </div>

          <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-black/40 border border-white/[0.1] text-[10px] font-mono text-surface-400 group-hover:text-iqoo-amber">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Controls: View Switcher */}
      <div className="flex items-center space-x-3">
        
        {/* Mobile Search Button */}
        <button
          onClick={onOpenCommandPalette}
          className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-surface-300 md:hidden hover:text-white"
        >
          <Search className="w-4 h-4 text-iqoo-amber" />
        </button>

        {/* View Mode Pills */}
        <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/[0.08] text-xs">
          <button
            onClick={() => setViewMode('landing')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              viewMode === 'landing'
                ? 'bg-white/[0.1] text-white shadow-sm'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            Landing
          </button>
          
          <button
            onClick={() => { setViewMode('console'); setShowPhoneFrame(false); }}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
              viewMode === 'console' && !showPhoneFrame
                ? 'bg-iqoo-amber text-white font-semibold shadow-iqoo'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Console</span>
          </button>

          <button
            onClick={() => { setViewMode('console'); setShowPhoneFrame(!showPhoneFrame); }}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
              showPhoneFrame
                ? 'bg-iqoo-amber text-white font-semibold shadow-iqoo'
                : 'text-iqoo-amber hover:bg-iqoo-amber/10'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>📱 Phone View</span>
          </button>
        </div>
      </div>

    </header>
  );
};
