/**
 * CodeOrbit Demo Repository — API Configuration
 * SECURITY ISSUE: Hardcoded API Credential detected in production config
 */

export const ApiConfig = {
  env: 'production',
  port: 8080,
  // CRITICAL SECURITY ISSUE: Hardcoded secret key
  secretKey: "sk_live_9982347192837498127394", // Vulnerability: Credential leak in source control
  timeout: 5000,
};

export const SecurityRemediationConfig = {
  env: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.PORT || '8080', 10),
  // SECURE PATCH: Read secret key safely from environment variable
  secretKey: process.env.JWT_SECRET_KEY || '',
  timeout: 5000,
};
