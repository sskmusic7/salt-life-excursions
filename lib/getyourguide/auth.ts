/**
 * GetYourGuide API Authentication
 * Handles HTTP Basic Authentication for both directions
 */

import { NextRequest } from 'next/server'
import type { GYGError } from './types'

/**
 * Verify incoming request from GetYourGuide
 * Checks HTTP Basic Auth credentials
 */
export function verifyGYGRequest(request: NextRequest): { valid: boolean; error?: GYGError } {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return {
      valid: false,
      error: {
        errorCode: 'AUTHORIZATION_FAILURE',
        errorMessage: 'Authorization header is missing or invalid',
      },
    }
  }

  try {
    // Decode base64 credentials
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
    const [username, password] = credentials.split(':')

    // Get expected credentials from environment
    const expectedUsername = process.env.GYG_SUPPLIER_USERNAME
    const expectedPassword = process.env.GYG_SUPPLIER_PASSWORD

    if (!expectedUsername || !expectedPassword) {
      console.error('GYG credentials not configured in environment variables')
      return {
        valid: false,
        error: {
          errorCode: 'INTERNAL_SYSTEM_FAILURE',
          errorMessage: 'Server configuration error',
        },
      }
    }

    if (username !== expectedUsername || password !== expectedPassword) {
      return {
        valid: false,
        error: {
          errorCode: 'AUTHORIZATION_FAILURE',
          errorMessage: 'The provided authentication credentials are not valid',
        },
      }
    }

    return { valid: true }
  } catch (error) {
    return {
      valid: false,
      error: {
        errorCode: 'AUTHORIZATION_FAILURE',
        errorMessage: 'Failed to parse authentication credentials',
      },
    }
  }
}

/**
 * Create Basic Auth header for calling GetYourGuide endpoints
 */
export function createGYGAuthHeader(): string {
  const username = process.env.GYG_CLIENT_USERNAME
  const password = process.env.GYG_CLIENT_PASSWORD

  if (!username || !password) {
    throw new Error('GetYourGuide client credentials not configured')
  }

  const credentials = Buffer.from(`${username}:${password}`).toString('base64')
  return `Basic ${credentials}`
}


