/**
 * GetYourGuide API Error Handling
 * Standard error responses as per GetYourGuide specifications
 */

import type { GYGError, ErrorCode } from './types'

/**
 * Create a standard GYG error response
 */
export function createGYGError(errorCode: ErrorCode, errorMessage: string, additional?: Partial<GYGError>): GYGError {
  return {
    errorCode,
    errorMessage,
    ...additional,
  }
}

/**
 * Common error responses
 */
export const GYGErrors = {
  authorizationFailure: (message?: string): GYGError =>
    createGYGError(
      'AUTHORIZATION_FAILURE',
      message || 'The provided authentication credentials are not valid'
    ),

  invalidProduct: (productId: string): GYGError =>
    createGYGError(
      'INVALID_PRODUCT',
      `Product ${productId} does not exist or is not available`
    ),

  validationFailure: (message: string): GYGError =>
    createGYGError('VALIDATION_FAILURE', message),

  internalSystemFailure: (message?: string): GYGError =>
    createGYGError(
      'INTERNAL_SYSTEM_FAILURE',
      message || 'An unexpected error occurred'
    ),

  noAvailability: (requested: number, available: number): GYGError =>
    createGYGError(
      'NO_AVAILABILITY',
      `This activity is sold out; requested ${requested}; available ${available}`
    ),

  invalidTicketCategory: (ticketCategory: string): GYGError =>
    createGYGError(
      'INVALID_TICKET_CATEGORY',
      `The ticket category ${ticketCategory} is not sellable`,
      { ticketCategory: ticketCategory as any }
    ),

  invalidParticipantsConfiguration: (
    message: string,
    min: number,
    max: number | null,
    groupMax?: number
  ): GYGError => {
    const error: GYGError = {
      errorCode: 'INVALID_PARTICIPANTS_CONFIGURATION',
      errorMessage: message,
      participantsConfiguration: { min, max },
    }

    if (groupMax !== undefined) {
      error.groupConfiguration = { max: groupMax }
    }

    return error
  },

  invalidReservation: (message?: string): GYGError =>
    createGYGError(
      'INVALID_RESERVATION',
      message || 'The specified reservation does not exist or has expired'
    ),

  invalidBooking: (message?: string): GYGError =>
    createGYGError(
      'INVALID_BOOKING',
      message || 'The specified booking does not exist or cannot be cancelled'
    ),

  invalidSupplier: (supplierId: string): GYGError =>
    createGYGError(
      'INVALID_SUPPLIER',
      `Supplier ${supplierId} does not exist or is not configured`
    ),

  cancellationNotAllowed: (message?: string): GYGError =>
    createGYGError(
      'CANCELLATION_NOT_ALLOWED',
      message || 'This booking cannot be cancelled'
    ),

  cancellationDeadlinePassed: (message?: string): GYGError =>
    createGYGError(
      'CANCELLATION_DEADLINE_PASSED',
      message || 'The cancellation deadline has passed'
    ),

  refundNotAvailable: (message?: string): GYGError =>
    createGYGError(
      'REFUND_NOT_AVAILABLE',
      message || 'No refund is available for this cancellation'
    ),
}

/**
 * Validate datetime format (ISO 8601 with timezone)
 */
export function validateDateTime(dateTime: string, fieldName: string = 'dateTime'): string | null {
  try {
    const date = new Date(dateTime)
    if (isNaN(date.getTime())) {
      return `Invalid ${fieldName}: must be a valid ISO 8601 datetime`
    }

    // Check if it includes timezone
    if (!dateTime.includes('+') && !dateTime.includes('Z') && !dateTime.endsWith('00:00')) {
      return `Invalid ${fieldName}: must include timezone offset (e.g., +02:00)`
    }

    return null
  } catch (error) {
    return `Invalid ${fieldName}: ${error instanceof Error ? error.message : 'unknown error'}`
  }
}

/**
 * Validate date range
 */
export function validateDateRange(from: string, to: string): string | null {
  const fromError = validateDateTime(from, 'from')
  if (fromError) return fromError

  const toError = validateDateTime(to, 'to')
  if (toError) return toError

  const fromDate = new Date(from)
  const toDate = new Date(to)

  if (fromDate >= toDate) {
    return 'Invalid date range: "from" must be before "to"'
  }

  return null
}

/**
 * Validate that datetime is in the future
 */
export function validateFutureDateTime(dateTime: string): string | null {
  const validationError = validateDateTime(dateTime)
  if (validationError) return validationError

  const date = new Date(dateTime)
  const now = new Date()

  if (date < now) {
    return 'The requested travel date is in the past'
  }

  return null
}


