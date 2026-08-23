/**
 * CodeOrbit Demo Repository — Authentication Middleware
 * BUG LOCATION: Line 42 - Unhandled token dereference prior to context validation.
 */

export interface AuthContext {
  userId?: string;
  role?: string;
  isAuthenticated: boolean;
}

export class AuthenticationMiddleware {
  // BROKEN STATE (Original Code with bug):
  // Line 42 attempts to verify token directly without checking if token exists or context is initialized
  public static validateRequestBroken(authHeader?: string): AuthContext {
    // Line 40
    // Line 41: Extract token
    // Line 42 (BUG): Uncaught null dereference / JWT token validation before context check
    const token = authHeader!.replace('Bearer ', '');
    
    if (!authHeader) {
      throw new Error("Missing Authorization Header");
    }
    
    return {
      userId: "usr_99823",
      role: "developer",
      isAuthenticated: true,
    };
  }

  // FIXED STATE (After CodeOrbit AI Fix Agent applies patch):
  public static validateRequestFixed(authHeader?: string): AuthContext {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { isAuthenticated: false };
    }

    const token = authHeader.substring(7);
    if (!token || token.trim() === '') {
      return { isAuthenticated: false };
    }

    return {
      userId: "usr_99823",
      role: "developer",
      isAuthenticated: true,
    };
  }
}
