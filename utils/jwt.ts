import jwt, { Secret } from 'jsonwebtoken';

const KEY: Secret | undefined = process.env.KEY;

if (!KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables');
}

// Genera un token JWT
export function generateToken(payload: object): string {
  if (!KEY) {
    throw new Error('SECRET_KEY is not defined');
  }
  return jwt.sign(payload, KEY, { expiresIn: '1h' });
}

// Verifica un token JWT
export function verifyToken(token: string): any {
  if (!KEY) {
    throw new Error('SECRET_KEY is not defined');
  }
  try {
    return jwt.verify(token, KEY);
  } catch (err) {
    throw new Error('Token inválido o expirado');
  }
}
