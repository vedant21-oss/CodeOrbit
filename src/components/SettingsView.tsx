import React from 'react';
import { Settings, Smartphone, Laptop, GitBranch, Cpu, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { SyncState, AIRuntimeMode } from '../types';

interface SettingsViewProps {
  syncState: SyncState;
  onToggleDemoMode: () => void;
  onChangeRuntime: (runtime: AIRuntimeMode) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  syncState,
  onToggleDemoMode,
  onChangeRuntime,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 p-5 rounded-2xl bg-surface-900 border border-surface-800">
        <div className="w-10 h-10 rounded-xl bg-iqoo-amber/20 flex items-center justify-center text-iqoo-amber">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">CodeOrbit AI Settings</h2>
          <p className="text-xs text-surface-400">Configure phone ↔ laptop sync, AI runtime, and integrations</p>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        {/* Connections */}
        <div className="p-5 rounded-2xl bg-surface-900 border border-surface-800 space-y-3">
          <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">System Connections</h3>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-950 border border-surface-800">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-iqoo-amber" />
              <span>iQOO Smartphone Connection</span>
            </div>
            <span className="text-emerald-400 font-bold">🟢 Connected ({syncState.phoneDeviceModel})</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-950 border border-surface-800">
            <div className="flex items-center space-x-2">
              <Laptop className="w-4 h-4 text-emerald-400" />
              <span>Laptop Execution Sandbox</span>
            </div>
            <span className="text-emerald-400 font-bold">🟢 Connected (MacBook Pro M3 Max)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-950 border border-surface-800">
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-blue-400" />
              <span>GitHub Integration</span>
            </div>
            <span className="text-emerald-400 font-bold">🟢 Connected (@vedantsachinmalode)</span>
          </div>
        </div>

        {/* AI Runtime Selector */}
        <div className="p-5 rounded-2xl bg-surface-900 border border-surface-800 space-y-3">
          <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">AI Reasoning Runtime</h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onChangeRuntime('phone-local')}
              className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                syncState.aiRuntime === 'phone-local'
                  ? 'bg-iqoo-amber text-white font-bold border-iqoo-amber'
                  : 'bg-surface-950 text-surface-400 border-surface-800'
              }`}
            >
              <Smartphone className="w-4 h-4 mx-auto" />
              <span className="block text-xs">📱 Phone Local</span>
            </button>

            <button
              onClick={() => onChangeRuntime('laptop-connected')}
              className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                syncState.aiRuntime === 'laptop-connected'
                  ? 'bg-iqoo-amber text-white font-bold border-iqoo-amber'
                  : 'bg-surface-950 text-surface-400 border-surface-800'
              }`}
            >
              <Laptop className="w-4 h-4 mx-auto" />
              <span className="block text-xs">💻 Laptop Connected</span>
            </button>

            <button
              onClick={() => onChangeRuntime('server-cloud')}
              className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                syncState.aiRuntime === 'server-cloud'
                  ? 'bg-iqoo-amber text-white font-bold border-iqoo-amber'
                  : 'bg-surface-950 text-surface-400 border-surface-800'
              }`}
            >
              <Cpu className="w-4 h-4 mx-auto" />
              <span className="block text-xs">☁ Server Cloud</span>
            </button>
          </div>
        </div>

        {/* Hackathon Demo Mode */}
        <div className="p-5 rounded-2xl bg-surface-900 border border-surface-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white">Hackathon Demo Mode</h3>
            <p className="text-surface-400 text-[11px]">Deterministic demo repository & camera tracebacks</p>
          </div>

          <button
            onClick={onToggleDemoMode}
            className="text-iqoo-amber text-2xl"
          >
            {syncState.isDemoMode ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-surface-600" />}
          </button>
        </div>

        {/* About Section */}
        <div className="p-5 rounded-2xl bg-surface-900 border border-surface-800 text-surface-400 space-y-1 text-[11px]">
          <p className="font-bold text-white text-xs">CodeOrbit AI v1.0.0</p>
          <p>Built for iQOO Hackathon — Developer Tools Track.</p>
          <p>Tagline: Your AI development command center.</p>
        </div>
      </div>
    </div>
  );
};
