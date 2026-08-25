import React, { useState } from 'react';
import { DependencyNode } from '../types';
import { Network, Search, Sparkles } from 'lucide-react';
import { AIOrchestrator } from '../services/aiOrchestrator';

interface CodebaseGraphViewProps {
  nodes: DependencyNode[];
}

export const CodebaseGraphView: React.FC<CodebaseGraphViewProps> = ({ nodes }) => {
  const [selectedNode, setSelectedNode] = useState<DependencyNode>(nodes[2]); // Default Auth Middleware
  const [graphQuery, setGraphQuery] = useState('');
  const [queryResult, setQueryResult] = useState<{ answer: string; relevantFiles: string[] } | null>(null);

  const handleSearchGraph = (e: React.FormEvent) => {
    e.preventDefault();
    if (!graphQuery.trim()) return;
    const res = AIOrchestrator.queryCodebaseIntelligence(graphQuery);
    setQueryResult(res);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00]">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Codebase & Dependency Graph
            </h2>
            <p className="text-xs text-slate-400">
              Interactive topological mapping for codeorbit-demo (248 files indexed)
            </p>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearchGraph} className="flex items-center space-x-1.5">
          <input
            type="text"
            value={graphQuery}
            onChange={(e) => setGraphQuery(e.target.value)}
            placeholder="Ask: 'Where is auth implemented?'"
            className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder-slate-500 w-56 focus:outline-none focus:border-[#FF6B00]"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-[#FF6B00] text-white hover:bg-[#FF5500] text-xs"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Query Result Card */}
      {queryResult && (
        <div className="p-3.5 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 space-y-1.5 text-xs">
          <div className="flex items-center space-x-1.5 text-[#FF6B00] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Codebase Intelligence Result</span>
          </div>
          <p className="text-slate-200 leading-relaxed">{queryResult.answer}</p>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {queryResult.relevantFiles.map((file, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-[#090A0F] font-mono text-[10px] text-[#FF6B00] border border-white/[0.06]">
                📄 {file}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Graph Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Graph Canvas */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
            <span>DEPENDENCY FLOW</span>
            <span className="text-[10px] text-slate-500 font-mono">Select node to inspect AST</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3 py-3">
            
            {/* Row 1 */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSelectedNode(nodes[0])}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono w-44 text-center ${
                  selectedNode.id === nodes[0].id
                    ? 'bg-[#FF6B00] text-white font-bold border-[#FF6B00] shadow-sm'
                    : 'bg-[#090A0F] text-slate-200 border-white/[0.06] hover:border-[#FF6B00]/40'
                }`}
              >
                🖥 Login View
              </button>
            </div>

            <div className="h-4 w-px bg-[#FF6B00]/40" />

            {/* Row 2 */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSelectedNode(nodes[1])}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono w-44 text-center ${
                  selectedNode.id === nodes[1].id
                    ? 'bg-[#FF6B00] text-white font-bold border-[#FF6B00] shadow-sm'
                    : 'bg-[#090A0F] text-slate-200 border-white/[0.06] hover:border-[#FF6B00]/40'
                }`}
              >
                🎮 Auth Controller
              </button>
            </div>

            <div className="h-4 w-px bg-[#FF6B00]/40" />

            {/* Row 3 */}
            <div className="w-full flex justify-center space-x-3">
              <button
                onClick={() => setSelectedNode(nodes[2])}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono w-48 text-center ${
                  selectedNode.id === nodes[2].id
                    ? 'bg-[#FF6B00] text-white font-bold border-[#FF6B00] shadow-sm'
                    : 'bg-[#090A0F] text-amber-400 border-amber-500/30 hover:border-[#FF6B00]'
                }`}
              >
                🛡 Auth Middleware (L42)
              </button>

              <button
                onClick={() => setSelectedNode(nodes[3])}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono w-44 text-center ${
                  selectedNode.id === nodes[3].id
                    ? 'bg-[#FF6B00] text-white font-bold border-[#FF6B00] shadow-sm'
                    : 'bg-[#090A0F] text-slate-200 border-white/[0.06] hover:border-[#FF6B00]/40'
                }`}
              >
                👤 User Service
              </button>
            </div>

            <div className="h-4 w-px bg-[#FF6B00]/40" />

            {/* Row 4 */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSelectedNode(nodes[5])}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono w-44 text-center ${
                  selectedNode.id === nodes[5].id
                    ? 'bg-[#FF6B00] text-white font-bold border-[#FF6B00] shadow-sm'
                    : 'bg-[#090A0F] text-slate-200 border-white/[0.06] hover:border-[#FF6B00]/40'
                }`}
              >
                🗄 PostgreSQL DB
              </button>
            </div>

          </div>
        </div>

        {/* Node Inspector */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Node AST Inspector
          </h3>

          <div className="space-y-2.5">
            <div>
              <span className="text-[10px] text-slate-400 font-mono block">Symbol Name</span>
              <span className="text-xs font-bold text-white font-mono">{selectedNode.name}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-mono block">File Path</span>
              <span className="text-xs text-[#FF6B00] font-mono">{selectedNode.path}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-mono block">Risk Profile</span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded inline-block mt-0.5 ${
                selectedNode.risk === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {selectedNode.risk} Risk Node
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-mono block">Dependencies ({selectedNode.dependencies.length})</span>
              <p className="text-xs text-slate-300 font-mono">
                {selectedNode.dependencies.length > 0 ? selectedNode.dependencies.join(', ') : 'None'}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-mono block">Dependents ({selectedNode.dependents.length})</span>
              <p className="text-xs text-slate-300 font-mono">
                {selectedNode.dependents.length > 0 ? selectedNode.dependents.join(', ') : 'None'}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
