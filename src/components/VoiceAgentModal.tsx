import React, { useState } from 'react';
import { Mic, X, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (cmd: string) => void;
}

export const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({
  isOpen,
  onClose,
  onSelectCommand,
}) => {
  const [isListening, setIsListening] = useState(true);
  const [spokenText, setSpokenText] = useState<string | null>(null);

  const sampleCommands = [
    "Why did my build fail?",
    "Analyze authentication middleware",
    "Review PR 142",
    "Explain the critical security issue",
    "Generate fix for auth error",
    "Run tests on laptop runner",
  ];

  const handleChooseCommand = (cmd: string) => {
    setSpokenText(cmd);
    setIsListening(false);
    setTimeout(() => {
      onSelectCommand(cmd);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-900 rounded-3xl border border-surface-800 p-5 space-y-4 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-iqoo-amber/20 flex items-center justify-center text-iqoo-amber">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">iQOO Voice Developer Agent</h3>
              <p className="text-[11px] text-surface-400">Speak commands directly to your pocket command center</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-surface-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Waveform Animation Area */}
        <div className="p-6 bg-surface-950 rounded-2xl border border-surface-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-iqoo-amber/20 border border-iqoo-amber/40 flex items-center justify-center mx-auto text-iqoo-amber shadow-iqoo">
            <Mic className="w-8 h-8 animate-pulse" />
          </div>

          {/* Dynamic Waveform Bars */}
          <div className="flex items-center justify-center space-x-1 h-8">
            <div className="w-1 bg-iqoo-amber rounded-full wave-bar-1" />
            <div className="w-1 bg-iqoo-amber rounded-full wave-bar-2" />
            <div className="w-1 bg-iqoo-amber rounded-full wave-bar-3" />
            <div className="w-1 bg-iqoo-amber rounded-full wave-bar-4" />
            <div className="w-1 bg-iqoo-amber rounded-full wave-bar-5" />
          </div>

          <p className="text-xs font-semibold text-iqoo-amber">
            {spokenText ? `Recognized: "${spokenText}"` : 'Listening for iQOO voice command...'}
          </p>
        </div>

        {/* Quick Voice Command Chips */}
        <div>
          <p className="text-[11px] font-semibold text-surface-400 mb-2 uppercase tracking-wider">
            Tap a demo voice command to execute:
          </p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {sampleCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleChooseCommand(cmd)}
                className="w-full p-2.5 rounded-xl bg-surface-950 border border-surface-800 hover:border-iqoo-amber/40 text-left text-xs text-surface-200 hover:text-white flex items-center justify-between group transition-all"
              >
                <span>"{cmd}"</span>
                <ArrowRight className="w-3.5 h-3.5 text-surface-500 group-hover:text-iqoo-amber group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
