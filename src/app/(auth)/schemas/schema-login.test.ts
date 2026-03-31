import { describe, it, expect } from 'vitest';
import { SchemaLogin } from './schema-login';

describe('SchemaLogin', () => {
  it('should validate a correct email and password', () => {
    const result = SchemaLogin.safeParse({ email: 'test@example.com', password: 'password123' });
    expect(result.success).toBe(true);
  });

  it('should fail if email is invalid', () => {
    const result = SchemaLogin.safeParse({ email: 'invalid-email', password: 'password123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Enter a valid email');
    }
  });

  it('should fail if password is too short', () => {
    const result = SchemaLogin.safeParse({ email: 'test@example.com', password: '123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password must be at least 6 characters');
    }
  });
});
