import { TestResultItem, TestSuiteResult } from '../types';
import { AuthenticationMiddleware } from './authMiddleware';

export class DemoTestRunner {
  private static initialTests: TestResultItem[] = [
    { id: 'test_1', name: 'AuthMiddleware > validate basic bearer token', status: 'passed', durationMs: 12, filePath: 'tests/auth.test.ts' },
    { id: 'test_2', name: 'AuthMiddleware > extract user context from valid JWT', status: 'passed', durationMs: 18, filePath: 'tests/auth.test.ts' },
    { id: 'test_3', name: 'AuthMiddleware > handle undefined authorization header', status: 'failed', durationMs: 45, errorMessage: 'TypeError: Cannot read properties of undefined (reading replace) at line 42', filePath: 'tests/auth.test.ts' },
    { id: 'test_4', name: 'AuthMiddleware > handle empty bearer token string', status: 'failed', durationMs: 38, errorMessage: 'TypeError: Cannot read properties of null at line 42', filePath: 'tests/auth.test.ts' },
    { id: 'test_5', name: 'AuthMiddleware > reject malformed authorization format', status: 'failed', durationMs: 22, errorMessage: 'AuthContext initialization error before validation', filePath: 'tests/auth.test.ts' },
    { id: 'test_6', name: 'ApiConfig > environment variables fallback', status: 'passed', durationMs: 8, filePath: 'tests/config.test.ts' },
    { id: 'test_7', name: 'ApiConfig > default port binding 8080', status: 'passed', durationMs: 5, filePath: 'tests/config.test.ts' },
    { id: 'test_8', name: 'PaymentService > process valid credit card charge', status: 'passed', durationMs: 140, filePath: 'tests/payment.test.ts' },
    { id: 'test_9', name: 'PaymentService > reject zero or negative amount', status: 'passed', durationMs: 14, filePath: 'tests/payment.test.ts' },
    { id: 'test_10', name: 'UserService > retrieve profile by user ID', status: 'passed', durationMs: 32, filePath: 'tests/user.test.ts' },
    { id: 'test_11', name: 'UserService > update email preferences', status: 'passed', durationMs: 27, filePath: 'tests/user.test.ts' },
    { id: 'test_12', name: 'HealthCheck > /api/health endpoint status 200', status: 'passed', durationMs: 9, filePath: 'tests/health.test.ts' },
    { id: 'test_13', name: 'GraphEngine > index codebase dependency graph', status: 'passed', durationMs: 88, filePath: 'tests/graph.test.ts' },
    { id: 'test_14', name: 'SecurityScanner > scan hardcoded secrets in config', status: 'passed', durationMs: 52, filePath: 'tests/security.test.ts' },
    { id: 'test_15', name: 'PRReviewer > compute pull request quality score', status: 'passed', durationMs: 61, filePath: 'tests/pr.test.ts' },
    { id: 'test_16', name: 'Database > connection pool initialization', status: 'passed', durationMs: 110, filePath: 'tests/db.test.ts' },
    { id: 'test_17', name: 'Database > transaction rollback on query failure', status: 'passed', durationMs: 95, filePath: 'tests/db.test.ts' },
  ];

  public static runTests(isFixApplied: boolean = false): TestSuiteResult {
    const tests = this.initialTests.map(t => {
      if (isFixApplied && t.status === 'failed') {
        return {
          ...t,
          status: 'passed' as const,
          errorMessage: undefined,
          durationMs: Math.floor(Math.random() * 20) + 10,
        };
      }
      return { ...t };
    });

    const passed = tests.filter(t => t.status === 'passed').length;
    const failed = tests.filter(t => t.status === 'failed').length;

    return {
      total: tests.length,
      passed,
      failed,
      running: 0,
      progressPercent: 100,
      isCompleted: true,
      tests,
      timestamp: new Date().toLocaleTimeString(),
    };
  }
}
