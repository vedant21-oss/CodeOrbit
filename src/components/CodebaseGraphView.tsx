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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white border border-slate-200 shadow-xs gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EA580C]">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Codebase & Dependency Graph
            </h2>
            <p className="text-xs text-slate-500">
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
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 w-56 focus:outline-none focus:border-[#EA580C]"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-[#EA580C] text-white hover:bg-orange-600 text-xs"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Query Result Card */}
      {queryResult && (
        <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 space-y-1.5 text-xs shadow-2xs">
          <div className="flex items-center space-x-1.5 text-[#EA580C] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Codebase Intelligence Result</span>
          </div>
          <p className="text-slate-800 leading-relaxed">{queryResult.answer}</p>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {queryResult.relevantFiles.map((file, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-white font-mono text-[10px] text-[#EA580C] border border-slate-200 shadow-2xs">
                📄 {file}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Graph Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Graph Canvas */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
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
                    ? 'bg-[#EA580C] text-white font-bold border-[#EA580C] shadow-2xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300'
                }`}
              >
                🖥 Login View
              </button>
            </div>

            <div className="h-4 w-px bg-orange-400" />

            {/* Row 2 */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSelectedNode(nodes[1])}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono w-44 text-center ${
                  selectedNode.id === nodes[1].id
                    ? 'bg-[#EA580C] text-white font-bold border-[#EA580C] shadow-2xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300'
                }`}
              >
                🎮 Auth Controller
              </button>
            </div>

            <div className="h-4 w-px bg-orange-400" />

            {/* Row 3 */}
            <div className="w-full flex justify-center space-x-3">
              <button
                onClick={() => setSelectedNode(nodes[2])}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono w-48 text-center ${
                  selectedNode.id === nodes[2].id
                    ? 'bg-[#EA580C] text-white font-bold border-[#EA580C] shadow-2xs'
                    : 'bg-slate-50 text-amber-700 border-amber-300 hover:border-[#EA580C]'
                }`}
              >
                🛡 Auth Middleware (L42)
              </button>

              <button
                onClick={() => setSelectedNode(nodes[3])}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono w-44 text-center ${
                  selectedNode.id === nodes[3].id
                    ? 'bg-[#EA580C] text-white font-bold border-[#EA580C] shadow-2xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300'
                }`}
              >
                👤 User Service
              </button>
            </div>

            <div className="h-4 w-px bg-orange-400" />

            {/* Row 4 */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSelectedNode(nodes[5])}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono w-44 text-center ${
                  selectedNode.id === nodes[5].id
                    ? 'bg-[#EA580C] text-white font-bold border-[#EA580C] shadow-2xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300'
                }`}
              >
                🗄 PostgreSQL DB
              </button>
            </div>

          </div>
        </div>

        {/* Node Inspector */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
            Node AST Inspector
          </h3>

          <div className="space-y-2.5">
            <div>
              <span className="text-[10px] text-slate-500 font-mono block">Symbol Name</span>
              <span className="text-xs font-bold text-slate-900 font-mono">{selectedNode.name}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-mono block">File Path</span>
              <span className="text-xs text-[#EA580C] font-mono">{selectedNode.path}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-mono block">Risk Profile</span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded inline-block mt-0.5 ${
                selectedNode.risk === 'high' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {selectedNode.risk} Risk Node
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-mono block">Dependencies ({selectedNode.dependencies.length})</span>
              <p className="text-xs text-slate-700 font-mono">
                {selectedNode.dependencies.length > 0 ? selectedNode.dependencies.join(', ') : 'None'}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-mono block">Dependents ({selectedNode.dependents.length})</span>
              <p className="text-xs text-slate-700 font-mono">
                {selectedNode.dependents.length > 0 ? selectedNode.dependents.join(', ') : 'None'}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
