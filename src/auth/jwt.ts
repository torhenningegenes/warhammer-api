import { decode, sign, verify } from 'hono/jwt'

const secret = process.env.JWT_SECRET_KEY

if (!secret) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables')
}

export async function createToken(
  payload: Record<string, unknown>,
): Promise<string> {
    if (!secret) {
        throw new Error('JWT_SECRET_KEY is not defined in environment variables')
    }
  // Add expiration to payload
  const expPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
  }
  return await sign(expPayload, secret)
}

export async function verifyToken(
  token: string,
): Promise<Record<string, unknown> | null> {
    if (!secret) {
        throw new Error('JWT_SECRET_KEY is not defined in environment variables')
    }
  try {

    return await verify(token, secret)
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    return decode(token)
  } catch (error) {
    console.error('Token decoding failed:', error)
    return null
  }
}
