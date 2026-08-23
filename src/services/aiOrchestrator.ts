import { 
  RepositoryInfo, 
  DependencyNode, 
  RootCause, 
  FixPatch, 
  IssueItem, 
  PullRequestReview, 
  TestSuiteResult 
} from '../types';
import { DemoTestRunner } from '../demo-repo/demoRunner';

export class AIOrchestrator {
  public static getDemoRepository(): RepositoryInfo {
    return {
      id: 'repo_codeorbit_demo',
      name: 'codeorbit-demo',
      owner: 'vedant21-oss',
      branch: 'main',
      fileCount: 248,
      languages: ['TypeScript', 'Node.js', 'Next.js', 'PostgreSQL'],
      lastCommit: '3m ago by @vedantsachinmalode (feat: add authentication endpoints)',
      isIndexed: true,
      isDependencyGraphReady: true,
      isTestRunnerReady: true,
    };
  }

  public static getDependencyGraph(): DependencyNode[] {
    return [
      {
        id: 'node_login',
        name: 'Login View',
        type: 'component',
        path: 'src/components/LoginView.tsx',
        dependencies: ['node_auth_controller'],
        dependents: [],
        risk: 'low',
      },
      {
        id: 'node_auth_controller',
        name: 'Auth Controller',
        type: 'controller',
        path: 'src/controllers/authController.ts',
        dependencies: ['node_auth_middleware', 'node_user_service'],
        dependents: ['node_login'],
        risk: 'high',
      },
      {
        id: 'node_auth_middleware',
        name: 'Auth Middleware',
        type: 'middleware',
        path: 'src/middleware/authMiddleware.ts',
        dependencies: ['node_api_config'],
        dependents: ['node_auth_controller'],
        risk: 'high',
      },
      {
        id: 'node_user_service',
        name: 'User Service',
        type: 'service',
        path: 'src/services/userService.ts',
        dependencies: ['node_database'],
        dependents: ['node_auth_controller'],
        risk: 'medium',
      },
      {
        id: 'node_api_config',
        name: 'API Config',
        type: 'service',
        path: 'src/config/apiConfig.ts',
        dependencies: [],
        dependents: ['node_auth_middleware'],
        risk: 'high',
      },
      {
        id: 'node_database',
        name: 'PostgreSQL DB',
        type: 'database',
        path: 'src/db/connection.ts',
        dependencies: [],
        dependents: ['node_user_service'],
        risk: 'low',
      },
    ];
  }

  public static getDemoIssue(): IssueItem {
    const rootCause: RootCause = {
      filePath: 'src/middleware/authMiddleware.ts',
      lineNumber: 42,
      summary: 'TypeError: Cannot read properties of undefined (reading replace) at line 42',
      description: 'JWT validation occurs before authentication context initialization. When the incoming request contains an empty or malformed Authorization header, `authHeader.replace()` causes an uncaught null pointer exception.',
      confidence: 94,
      affectedFilesCount: 3,
      affectedFiles: [
        'src/middleware/authMiddleware.ts',
        'src/controllers/authController.ts',
        'tests/auth.test.ts'
      ],
    };

    const patch: FixPatch = {
      id: 'patch_auth_42',
      issueId: 'issue_auth_null',
      filePath: 'src/middleware/authMiddleware.ts',
      originalCode: `// Line 42 (BUG): Uncaught null dereference
const token = authHeader!.replace('Bearer ', '');
if (!authHeader) {
  throw new Error("Missing Authorization Header");
}`,
      fixedCode: `// SECURE FIX: Safely check header before extracting token
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return { isAuthenticated: false };
}
const token = authHeader.substring(7);
if (!token || token.trim() === '') {
  return { isAuthenticated: false };
}`,
      diffSummary: '- const token = authHeader!.replace(\'Bearer \', \'\');\n+ if (!authHeader || !authHeader.startsWith(\'Bearer \')) {\n+   return { isAuthenticated: false };\n+ }\n+ const token = authHeader.substring(7);',
      status: 'draft',
    };

    return {
      id: 'issue_auth_null',
      title: 'Build & Test Failure in Auth Middleware',
      severity: 'high',
      category: 'bug',
      filePath: 'src/middleware/authMiddleware.ts',
      lineNumber: 42,
      rootCause,
      patch,
      status: 'open',
    };
  }

  public static getDemoPR(): PullRequestReview {
    return {
      id: 142,
      title: 'feat(auth): refactor JWT verification & update payment service',
      author: 'dev-team',
      branch: 'feature/auth-refactor',
      score: 82,
      bugsCount: 2,
      securityCount: 1,
      missingTestsCount: 4,
      performanceCount: 1,
      summary: 'This PR introduces JWT validation updates and payment processing logic. CodeOrbit AI detected 1 critical security flaw (hardcoded credential), 2 bugs in auth middleware, and 4 unhandled edge-case test paths.',
      findings: [
        {
          id: 'find_1',
          type: 'security',
          severity: 'critical',
          title: 'Hardcoded API Secret Credential',
          description: 'Hardcoded API secret key detected in `src/config/apiConfig.ts:12`. Risk: Credential could be exposed in git repository history.',
          file: 'src/config/apiConfig.ts',
          line: 12,
          suggestedFix: 'Move `secretKey` to environment variable `process.env.JWT_SECRET_KEY`.'
        },
        {
          id: 'find_2',
          type: 'bug',
          severity: 'high',
          title: 'Null Dereference in Auth Middleware',
          description: 'Token extraction occurs before checking Authorization header existence.',
          file: 'src/middleware/authMiddleware.ts',
          line: 42,
          suggestedFix: 'Check `authHeader` existence and `Bearer` prefix before invoking `.substring()`.'
        },
        {
          id: 'find_3',
          type: 'test',
          severity: 'medium',
          title: 'Missing Edge-Case Tests for Payment Timeout',
          description: 'PaymentService does not handle network timeout or duplicate payment transaction IDs.',
          file: 'src/services/paymentService.ts',
          line: 18,
          suggestedFix: 'Add unit tests for network timeouts and duplicate payment ID idempotency.'
        },
        {
          id: 'find_4',
          type: 'performance',
          severity: 'low',
          title: 'Uncached Database Query in Auth Loop',
          description: 'User profile lookup re-queries DB on every authorization request.',
          file: 'src/services/userService.ts',
          line: 34,
          suggestedFix: 'Implement Redis memory caching for user authorization sessions.'
        }
      ]
    };
  }

  public static queryCodebaseIntelligence(query: string): { answer: string; relevantFiles: string[] } {
    const q = query.toLowerCase();
    if (q.includes('auth') || q.includes('login') || q.includes('jwt')) {
      return {
        answer: 'Authentication is implemented in `src/middleware/authMiddleware.ts` and controlled by `src/controllers/authController.ts`. JWT expiry changes will affect session tokens across `authMiddleware.ts`, `userService.ts`, and `LoginView.tsx`.',
        relevantFiles: ['src/middleware/authMiddleware.ts:L42', 'src/controllers/authController.ts:L18', 'src/config/apiConfig.ts:L12']
      };
    } else if (q.includes('payment') || q.includes('checkout')) {
      return {
        answer: 'The payment processing flow is implemented in `src/services/paymentService.ts`. It validates request IDs, amounts, and calls the payment provider gateway.',
        relevantFiles: ['src/services/paymentService.ts:L10', 'tests/payment.test.ts:L15']
      };
    } else if (q.includes('security') || q.includes('credential') || q.includes('secret')) {
      return {
        answer: 'Critical Security Issue: A hardcoded production secret key `sk_live_9982347192837498127394` was found in `src/config/apiConfig.ts`. It should immediately be replaced with an environment variable reference.',
        relevantFiles: ['src/config/apiConfig.ts:L12']
      };
    } else {
      return {
        answer: `CodeOrbit AI searched 248 files in 'codeorbit-demo'. Recommending inspection of core routing and middleware files.`,
        relevantFiles: ['src/middleware/authMiddleware.ts', 'src/services/paymentService.ts', 'src/config/apiConfig.ts']
      };
    }
  }
}
