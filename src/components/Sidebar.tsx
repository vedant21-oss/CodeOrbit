import React from 'react';
import { 
  Home, 
  FolderGit2, 
  Network, 
  Bug, 
  GitPullRequest, 
  ShieldAlert, 
  TestTube2, 
  Activity, 
  Settings,
  Smartphone,
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: any;
  shortcut?: string;
  dot?: 'amber' | 'red';
  count?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const sections: NavSection[] = [
    {
      title: 'WORKSPACE',
      items: [
        { id: 'home', label: 'Overview', icon: Home, shortcut: '⌘1' },
        { id: 'repository', label: 'Files & Code', icon: FolderGit2, shortcut: '⌘2' },
        { id: 'debugger', label: 'AI Debugger', icon: Bug, dot: 'amber', shortcut: '⌘3' },
        { id: 'graph', label: 'Codebase Graph', icon: Network, shortcut: '⌘4' },
      ]
    },
    {
      title: 'DEVELOPMENT',
      items: [
        { id: 'prs', label: 'Pull Requests', icon: GitPullRequest, count: '1', shortcut: '⌘5' },
        { id: 'security', label: 'Security Auditor', icon: ShieldAlert, dot: 'red', shortcut: '⌘6' },
        { id: 'tests', label: 'Test Sandbox', icon: TestTube2, count: '17', shortcut: '⌘7' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'activity', label: 'Timeline', icon: Activity },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-56 border-r border-white/[0.06] bg-[#07080D]/90 backdrop-blur-xl p-3 flex flex-col justify-between hidden md:flex shrink-0 select-none">
      
      <div className="space-y-4">
        
        {/* Repo Info Header Box */}
        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Repository</span>
            <span className="text-emerald-400 font-mono text-[9px] flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span>Indexed</span>
            </span>
          </div>
          <p className="font-semibold text-white text-xs tracking-tight truncate">
            codeorbit-demo
          </p>
          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono">
            <span>main</span>
            <span>•</span>
            <span>248 files</span>
          </div>
        </div>

        {/* Grouped Navigation */}
        <div className="space-y-3.5">
          {sections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-0.5">
              <p className="px-2 text-[9px] font-semibold text-slate-500 tracking-wider uppercase font-mono mb-1">
                {sec.title}
              </p>
              
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as NavigationTab)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all group ${
                        isActive
                          ? 'bg-white/[0.08] text-white font-semibold border border-white/[0.08]'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-[#FF6B00]' : 'text-slate-400 group-hover:text-slate-200'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center space-x-1 shrink-0">
                        {item.dot === 'amber' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                        )}
                        {item.dot === 'red' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        )}
                        {item.count && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-400 font-mono">
                            {item.count}
                          </span>
                        )}
                        {item.shortcut && (
                          <span className="text-[10px] text-slate-500 font-mono hidden group-hover:inline-block">
                            {item.shortcut}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Footer Device Status */}
      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1 text-xs">
        <div className="flex items-center space-x-1.5 text-[#FF6B00] font-semibold text-[11px]">
          <Smartphone className="w-3.5 h-3.5" />
          <span>iQOO 13 Pro Connected</span>
        </div>
        <p className="text-slate-400 text-[10px] leading-relaxed">
          Commands from your phone execute live on laptop host.
        </p>
      </div>

    </aside>
  );
};
