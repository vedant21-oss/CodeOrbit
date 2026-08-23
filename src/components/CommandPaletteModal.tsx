import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Camera, 
  Play, 
  GitPullRequest, 
  ShieldAlert, 
  Bug, 
  FolderGit2, 
  Mic, 
  X,
  ArrowRight,
  Zap,
  Terminal,
  Sliders,
  Command
} from 'lucide-react';
import { NavigationTab } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavigationTab) => void;
  onGenerateFix: () => void;
  onRunTests: () => void;
  onOpenCamera: () => void;
  onOpenVoice: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onGenerateFix,
  onRunTests,
  onOpenCamera,
  onOpenVoice,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      id: 'fix',
      title: '⚡ Auto-Fix Active Issue',
      subtitle: 'Apply AI patch to authMiddleware.ts (1-Click)',
      icon: Sparkles,
      color: 'text-iqoo-amber bg-iqoo-amber/15',
      action: () => { onGenerateFix(); onClose(); }
    },
    {
      id: 'tests',
      title: '▶️ Run Test Suite',
      subtitle: 'Execute 17 sandbox tests on laptop runner',
      icon: Play,
      color: 'text-emerald-400 bg-emerald-500/15',
      action: () => { onRunTests(); onClose(); }
    },
    {
      id: 'camera',
      title: '📷 Scan Error Screen',
      subtitle: 'Point phone camera at screen error traceback',
      icon: Camera,
      color: 'text-iqoo-amber bg-iqoo-amber/15',
      action: () => { onOpenCamera(); onClose(); }
    },
    {
      id: 'voice',
      title: '🎙 Voice Command',
      subtitle: 'Ask CodeOrbit AI using iQOO voice agent',
      icon: Mic,
      color: 'text-blue-400 bg-blue-500/15',
      action: () => { onOpenVoice(); onClose(); }
    },
  ];

  const navigationActions = [
    { label: 'Go to Workspace Overview', icon: Zap, tab: 'home' as NavigationTab, shortcut: '⌘1' },
    { label: 'Explore Repository Files', icon: FolderGit2, tab: 'repository' as NavigationTab, shortcut: '⌘2' },
    { label: 'Inspect AI Root Cause', icon: Bug, tab: 'debugger' as NavigationTab, shortcut: '⌘3' },
    { label: 'Review Pull Request #142', icon: GitPullRequest, tab: 'prs' as NavigationTab, shortcut: '⌘5' },
    { label: 'Security Vulnerabilities', icon: ShieldAlert, tab: 'security' as NavigationTab, shortcut: '⌘6' },
    { label: 'Settings & Connections', icon: Sliders, tab: 'settings' as NavigationTab, shortcut: '⌘8' },
  ];

  const filteredNav = navigationActions.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-start justify-center pt-24 p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#07080E]/95 rounded-2xl border border-white/[0.12] shadow-2xl overflow-hidden flex flex-col space-y-0 ring-1 ring-white/[0.08]">
        
        {/* Raycast Search Input */}
        <div className="px-4 py-3 border-b border-white/[0.08] flex items-center space-x-3 bg-white/[0.02]">
          <Search className="w-4 h-4 text-iqoo-amber shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. 'fix', 'test', 'security')..."
            className="flex-1 bg-transparent text-sm text-white placeholder-surface-400 focus:outline-none"
          />
          <span className="px-2 py-0.5 rounded bg-white/[0.06] text-surface-400 text-[10px] font-mono border border-white/[0.08]">
            ESC to close
          </span>
        </div>

        {/* Action List */}
        <div className="p-3 space-y-3 max-h-[380px] overflow-y-auto">
          
          {/* Quick Actions */}
          {!query && (
            <div>
              <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-2 px-1">
                Suggested Actions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickActions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.id}
                      onClick={act.action}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-iqoo-amber/40 text-left transition-all group flex items-start space-x-3 hover:bg-white/[0.06]"
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${act.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-white block group-hover:text-iqoo-amber transition-colors">
                          {act.title}
                        </span>
                        <span className="text-[11px] text-surface-400 truncate block">
                          {act.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div>
            <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-2 px-1">
              Navigation & Views
            </p>
            <div className="space-y-1">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.tab}
                    onClick={() => {
                      onSelectTab(item.tab);
                      onClose();
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-iqoo-amber/40 hover:bg-white/[0.05] text-xs text-surface-200 hover:text-white flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-surface-400 group-hover:text-iqoo-amber transition-colors" />
                      <span className="font-medium">{item.label}</span>
                    </div>

                    {item.shortcut && (
                      <span className="text-[10px] text-surface-500 font-mono">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.08] flex items-center justify-between text-[11px] text-surface-400">
          <span className="flex items-center space-x-1.5">
            <Zap className="w-3 h-3 text-iqoo-amber" />
            <span>CodeOrbit Raycast Palette</span>
          </span>
          <span className="font-mono text-[10px]">Press ⌘K anytime</span>
        </div>

      </div>
    </div>
  );
};
