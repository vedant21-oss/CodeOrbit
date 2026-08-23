import React, { useState } from 'react';
import { 
  FolderGit2, 
  FileCode, 
  GitBranch, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  GitCommit, 
  Code2, 
  ExternalLink,
  ShieldAlert,
  Bug,
  ChevronRight,
  FileText
} from 'lucide-react';
import { RepositoryInfo, IssueItem, NavigationTab } from '../types';

interface RepositoryViewProps {
  repo: RepositoryInfo;
  issue: IssueItem;
  onNavigateTab: (tab: NavigationTab) => void;
  onGenerateFix: () => void;
}

export const RepositoryView: React.FC<RepositoryViewProps> = ({
  repo,
  issue,
  onNavigateTab,
  onGenerateFix,
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('src/middleware/authMiddleware.ts');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const demoFiles = [
    {
      path: 'src/middleware/authMiddleware.ts',
      lines: 84,
      lang: 'TypeScript',
      status: 'issue',
      desc: 'Bug Target: Null pointer on line 42',
      snippet: `// src/middleware/authMiddleware.ts
export class AuthenticationMiddleware {
  static validateRequestBroken(req: any, res: any, next: any) {
    const token = req.headers['authorization'];
    // Line 42 - Potential TypeError if token string is undefined!
    const bearer = token.replace('Bearer ', '');
    return next();
  }
}`
    },
    {
      path: 'src/config/apiConfig.ts',
      lines: 32,
      lang: 'TypeScript',
      status: 'security',
      desc: 'Security Alert: Hardcoded production credential',
      snippet: `// src/config/apiConfig.ts
export const API_CONFIG = {
  baseUrl: 'https://api.codeorbit.io/v1',
  // SECURITY WARNING: Hardcoded secret key!
  jwtSecret: 'sk_live_998234_prod_key_codeorbit',
  timeoutMs: 5000,
};`
    },
    {
      path: 'src/controllers/authController.ts',
      lines: 120,
      lang: 'TypeScript',
      status: 'normal',
      desc: 'Auth controller handling login & JWT token creation',
      snippet: `// src/controllers/authController.ts
import { AuthenticationMiddleware } from '../middleware/authMiddleware';

export const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Authenticate user & issue token
};`
    },
    {
      path: 'src/services/paymentService.ts',
      lines: 95,
      lang: 'TypeScript',
      status: 'normal',
      desc: 'Stripe integration service wrapper',
      snippet: `// src/services/paymentService.ts
export class PaymentService {
  async processTransaction(amount: number, currency: string) {
    // Process payment securely
  }
}`
    },
    {
      path: 'src/__tests__/auth.test.ts',
      lines: 156,
      lang: 'TypeScript',
      status: 'test',
      desc: '17 Unit & Integration test cases for Auth flow',
      snippet: `// src/__tests__/auth.test.ts
describe('Authentication Suite', () => {
  it('should validate request headers safely', () => {
    // Test execution runner target
  });
});`
    }
  ];

  const filteredFiles = demoFiles.filter(f => 
    f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeFileObject = demoFiles.find(f => f.path === selectedFile) || demoFiles[0];

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl gap-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-iqoo-amber to-iqoo-orange flex items-center justify-center text-white shadow-iqoo font-semibold">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-tight font-mono">
                {repo.owner} / {repo.name}
              </h2>
              <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-500/15 text-emerald-400 font-medium border border-emerald-500/25">
                ✓ AI Indexed
              </span>
            </div>
            <p className="text-xs text-surface-400 mt-0.5">
              CodeOrbit AST Indexing • 248 files • Branch: <span className="text-white font-mono">main</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] text-surface-300">
            <GitCommit className="w-3.5 h-3.5 text-iqoo-amber" />
            <span className="font-mono">63f2990</span>
          </div>
          
          <button
            onClick={() => onNavigateTab('graph')}
            className="px-3.5 py-1.5 rounded-xl bg-iqoo-amber hover:bg-iqoo-orange text-white font-semibold shadow-iqoo flex items-center space-x-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dependency Graph</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <span className="text-[10px] text-surface-400 block font-medium uppercase tracking-wider">Total Files</span>
          <span className="text-base font-bold text-white font-mono">248 Files</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <span className="text-[10px] text-surface-400 block font-medium uppercase tracking-wider">AST Nodes</span>
          <span className="text-base font-bold text-iqoo-amber font-mono">1,420 Nodes</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-amber-500/30">
          <span className="text-[10px] text-surface-400 block font-medium uppercase tracking-wider">Open Diagnostics</span>
          <span className="text-base font-bold text-amber-400 font-mono">1 Issue</span>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-red-500/30">
          <span className="text-[10px] text-surface-400 block font-medium uppercase tracking-wider">Security Alerts</span>
          <span className="text-base font-bold text-red-400 font-mono">1 Critical</span>
        </div>
      </div>

      {/* File Tree & Code Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left: File List */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white tracking-tight">
              File Explorer
            </span>
            <span className="text-[10px] text-surface-400 font-mono">{filteredFiles.length} files</span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-surface-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter files..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs text-white placeholder-surface-500 focus:outline-none focus:border-iqoo-amber"
            />
          </div>

          <div className="space-y-1">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file.path)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-iqoo-amber/15 border-iqoo-amber/40 text-iqoo-amber font-semibold'
                      : 'bg-black/20 border-white/[0.06] text-surface-300 hover:text-white hover:border-white/[0.12]'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate pr-2">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${
                      file.status === 'issue' ? 'text-amber-400' :
                      file.status === 'security' ? 'text-red-400' : 'text-surface-400'
                    }`} />
                    <span className="truncate">{file.path}</span>
                  </div>

                  {file.status === 'issue' && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 shrink-0">
                      Bug L42
                    </span>
                  )}
                  {file.status === 'security' && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 shrink-0">
                      Secret
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Code Inspector */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-iqoo-amber" />
                <span className="font-mono text-xs font-semibold text-white">
                  {activeFileObject.path}
                </span>
                <span className="text-[11px] text-surface-400">({activeFileObject.lines} lines)</span>
              </div>

              {activeFileObject.status === 'issue' && (
                <button
                  onClick={() => onNavigateTab('debugger')}
                  className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-medium flex items-center space-x-1"
                >
                  <Bug className="w-3.5 h-3.5" />
                  <span>Inspect Root Cause →</span>
                </button>
              )}

              {activeFileObject.status === 'security' && (
                <button
                  onClick={() => onNavigateTab('security')}
                  className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 text-xs font-medium flex items-center space-x-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Inspect Security Alert →</span>
                </button>
              )}
            </div>

            <p className="text-xs text-surface-300">
              {activeFileObject.desc}
            </p>

            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.08] font-mono text-xs text-surface-200 overflow-x-auto leading-relaxed">
              <pre>{activeFileObject.snippet}</pre>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-surface-400">
                <Sparkles className="w-4 h-4 text-iqoo-amber" />
                <span>CodeOrbit AI indexed AST for this file with 100% precision.</span>
              </div>
              <button
                onClick={onGenerateFix}
                className="px-3.5 py-1.5 rounded-xl bg-iqoo-amber text-white font-semibold hover:bg-iqoo-orange transition-all"
              >
                Auto-Fix (1-Click)
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
