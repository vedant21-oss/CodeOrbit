import React, { useState } from 'react';
import { DependencyNode } from '../types';
import { Network, Search, ArrowRight, FileCode, ShieldAlert, Sparkles } from 'lucide-react';
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
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-surface-900 border border-surface-800 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-iqoo-amber/20 border border-iqoo-amber/40 flex items-center justify-center text-iqoo-amber">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Codebase & Dependency Graph Engine
            </h2>
            <p className="text-xs text-surface-400">
              Interactive topological mapping for codeorbit-demo (248 files indexed)
            </p>
          </div>
        </div>

        {/* AI Query Form */}
        <form onSubmit={handleSearchGraph} className="flex items-center space-x-2">
          <input
            type="text"
            value={graphQuery}
            onChange={(e) => setGraphQuery(e.target.value)}
            placeholder="Ask: 'Where is authentication implemented?'"
            className="px-3.5 py-2 rounded-xl bg-surface-950 border border-surface-800 text-xs text-white placeholder-surface-500 w-64 focus:outline-none focus:border-iqoo-amber"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-iqoo-amber text-white font-bold hover:bg-iqoo-orange text-xs"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Query Result Card */}
      {queryResult && (
        <div className="p-4 rounded-2xl bg-iqoo-amber/10 border border-iqoo-amber/30 space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-iqoo-amber font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Codebase Intelligence Result</span>
          </div>
          <p className="text-surface-200 leading-relaxed">{queryResult.answer}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {queryResult.relevantFiles.map((file, idx) => (
              <span key={idx} className="px-2 py-1 rounded bg-surface-900 font-mono text-[11px] text-iqoo-amber border border-surface-800">
                📄 {file}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Visual Topological Graph Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Graph Topology Canvas */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-surface-900 border border-surface-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-bold text-surface-300">
            <span>DEPENDENCY FLOW ARCHITECTURE</span>
            <span className="text-surface-400">Select node to view AST breakdown</span>
          </div>

          {/* SVG Connection Diagram */}
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            
            {/* Row 1: UI */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSelectedNode(nodes[0])}
                className={`p-3 rounded-2xl border transition-all text-xs font-mono w-48 text-center ${
                  selectedNode.id === nodes[0].id
                    ? 'bg-iqoo-amber text-white font-bold shadow-iqoo border-iqoo-amber'
                    : 'bg-surface-950 text-surface-200 border-surface-800 hover:border-iqoo-amber/40'
                }`}
              >
                🖥 Login View (Component)
              </button>
            </div>

            <div className="h-6 w-0.5 bg-iqoo-amber/60" />

            {/* Row 2: Controller */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSelectedNode(nodes[1])}
                className={`p-3 rounded-2xl border transition-all text-xs font-mono w-48 text-center ${
                  selectedNode.id === nodes[1].id
                    ? 'bg-iqoo-amber text-white font-bold shadow-iqoo border-iqoo-amber'
                    : 'bg-surface-950 text-surface-200 border-surface-800 hover:border-iqoo-amber/40'
                }`}
              >
                🎮 Auth Controller
              </button>
            </div>

            <div className="h-6 w-0.5 bg-iqoo-amber/60" />

            {/* Row 3: Middleware & Service */}
            <div className="w-full flex justify-center space-x-4">
              <button
                onClick={() => setSelectedNode(nodes[2])}
                className={`p-3 rounded-2xl border transition-all text-xs font-mono w-52 text-center ${
                  selectedNode.id === nodes[2].id
                    ? 'bg-iqoo-amber text-white font-bold shadow-iqoo border-iqoo-amber'
                    : 'bg-surface-950 text-amber-400 border-amber-500/40 hover:border-iqoo-amber'
                }`}
              >
                🛡 Auth Middleware (L42 Bug)
              </button>

              <button
                onClick={() => setSelectedNode(nodes[3])}
                className={`p-3 rounded-2xl border transition-all text-xs font-mono w-48 text-center ${
                  selectedNode.id === nodes[3].id
                    ? 'bg-iqoo-amber text-white font-bold shadow-iqoo border-iqoo-amber'
                    : 'bg-surface-950 text-surface-200 border-surface-800 hover:border-iqoo-amber/40'
                }`}
              >
                👤 User Service
              </button>
            </div>

            <div className="h-6 w-0.5 bg-iqoo-amber/60" />

            {/* Row 4: Database */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSelectedNode(nodes[5])}
                className={`p-3 rounded-2xl border transition-all text-xs font-mono w-48 text-center ${
                  selectedNode.id === nodes[5].id
                    ? 'bg-iqoo-amber text-white font-bold shadow-iqoo border-iqoo-amber'
                    : 'bg-surface-950 text-surface-200 border-surface-800 hover:border-iqoo-amber/40'
                }`}
              >
                🗄 PostgreSQL Database
              </button>
            </div>

          </div>
        </div>

        {/* Right Col: Selected Node Inspector */}
        <div className="p-6 rounded-2xl bg-surface-900 border border-surface-800 space-y-4">
          <h3 className="text-xs font-bold text-surface-300 uppercase tracking-wider">
            Node AST Inspector
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] text-surface-400 block">Symbol Name</span>
              <span className="text-sm font-bold text-white font-mono">{selectedNode.name}</span>
            </div>

            <div>
              <span className="text-[11px] text-surface-400 block">File Path</span>
              <span className="text-xs text-iqoo-amber font-mono">{selectedNode.path}</span>
            </div>

            <div>
              <span className="text-[11px] text-surface-400 block">Risk Score</span>
              <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded inline-block mt-0.5 ${
                selectedNode.risk === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {selectedNode.risk} Risk Node
              </span>
            </div>

            <div>
              <span className="text-[11px] text-surface-400 block">Dependencies ({selectedNode.dependencies.length})</span>
              <p className="text-xs text-surface-300 font-mono">
                {selectedNode.dependencies.length > 0 ? selectedNode.dependencies.join(', ') : 'None'}
              </p>
            </div>

            <div>
              <span className="text-[11px] text-surface-400 block">Dependents ({selectedNode.dependents.length})</span>
              <p className="text-xs text-surface-300 font-mono">
                {selectedNode.dependents.length > 0 ? selectedNode.dependents.join(', ') : 'None'}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
