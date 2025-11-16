/**
 * GetYourGuide Supplier API TypeScript Type Definitions
 * Based on official GetYourGuide Supplier API documentation
 * 
 * NOTE: This is a SUPPLIER-SIDE API - GetYourGuide calls YOUR endpoints
 */

// ============================================================================
// Common Types
// ============================================================================

export type TicketCategory =
  | 'ADULT'
  | 'CHILD'
  | 'YOUTH'
  | 'INFANT'
  | 'SENIOR'
  | 'STUDENT'
  | 'EU_CITIZEN'
  | 'MILITARY'
  | 'EU_CITIZEN_STUDENT'
  | 'COLLECTIVE'
  | 'GROUP'

export type ErrorCode =
  | 'AUTHORIZATION_FAILURE'
  | 'INVALID_PRODUCT'
  | 'VALIDATION_FAILURE'
  | 'INTERNAL_SYSTEM_FAILURE'
  | 'NO_AVAILABILITY'
  | 'INVALID_TICKET_CATEGORY'
  | 'INVALID_PARTICIPANTS_CONFIGURATION'
  | 'INVALID_RESERVATION'
  | 'INVALID_BOOKING'
  | 'INVALID_SUPPLIER'
  | 'CANCELLATION_NOT_ALLOWED'
  | 'CANCELLATION_DEADLINE_PASSED'
  | 'REFUND_NOT_AVAILABLE'

export interface GYGError {
  errorCode: ErrorCode
  errorMessage: string
  ticketCategory?: TicketCategory
  participantsConfiguration?: ParticipantsConfiguration
  groupConfiguration?: GroupConfiguration
}

export interface ParticipantsConfiguration {
  min: number
  max: number | null
}

export interface GroupConfiguration {
  max: number
}

// ============================================================================
// Availability Query Types
// ============================================================================

export interface AvailabilityQueryRequest {
  productId: string
  from: string // ISO 8601 datetime
  to: string // ISO 8601 datetime
  cutoffSeconds?: number
}

export interface AvailabilityQueryResponse {
  availabilities: Availability[]
}

export interface Availability {
  dateTime: string // ISO 8601 datetime
  vacancies: number | null
  vacanciesByCategory?: VacanciesByCategory[]
  openingTimes?: OpeningTime[]
  currency?: string
  pricesByCategory?: PriceByCategory[]
  tieredPricesByCategory?: TieredPriceByCategory[]
}

export interface VacanciesByCategory {
  ticketCategory: TicketCategory
  vacancies: number | null
}

export interface OpeningTime {
  fromTime: string // HH:mm format
  toTime: string // HH:mm format
}

export interface PriceByCategory {
  ticketCategory: TicketCategory
  retailPrice: number
}

export interface TieredPriceByCategory {
  ticketCategory: TicketCategory
  tiers: PriceTier[]
}

export interface PriceTier {
  minParticipants: number
  maxParticipants: number | null
  retailPrice: number
}

// ============================================================================
// Reservation Types
// ============================================================================

export interface ReservationRequest {
  productId: string
  dateTime: string // ISO 8601 datetime
  tickets: TicketRequest[]
  reservationReference: string // GetYourGuide's reference
  retailPrice?: number
  currency?: string
}

export interface TicketRequest {
  ticketCategory: TicketCategory
  quantity: number
}

export interface ReservationResponse {
  supplierReservationReference: string
  reservationExpiration: string // ISO 8601 datetime
}

// ============================================================================
// Reservation Cancellation Types
// ============================================================================

export interface ReservationCancellationRequest {
  supplierReservationReference: string
  reservationReference: string // GetYourGuide's reference
}

export interface ReservationCancellationResponse {
  success: boolean
}

// ============================================================================
// Booking Types
// ============================================================================

export interface BookingRequest {
  supplierReservationReference: string
  reservationReference: string // GetYourGuide's reference
  bookingReference: string // GetYourGuide's booking reference
  productId: string
  dateTime: string // ISO 8601 datetime
  tickets: TicketRequest[]
  customer: Customer
  retailPrice?: number
  currency?: string
}

export interface Customer {
  name: string
  surname: string
  email: string
  phoneNumber?: string
  country?: string
}

export interface BookingResponse {
  supplierBookingReference: string
  tickets: Ticket[]
}

export interface Ticket {
  ticketCode: string
  ticketCategory: TicketCategory
  ticketUrl?: string
}

// ============================================================================
// Booking Cancellation Types
// ============================================================================

export interface BookingCancellationRequest {
  supplierBookingReference: string
  bookingReference: string // GetYourGuide's reference
}

export interface BookingCancellationResponse {
  success: boolean
  refundAmount?: number
  currency?: string
}

// ============================================================================
// GetYourGuide-side Endpoints (Supplier calls these)
// ============================================================================

/**
 * Notify Availability Updated
 * Suppliers must call this to notify GetYourGuide of availability changes
 */
export interface NotifyAvailabilityUpdateRequest {
  productId: string
  availabilities: Availability[]
}

export interface NotifyAvailabilityUpdateResponse {
  success: boolean
}

/**
 * Ticket Redemption
 * Optional endpoint to notify GetYourGuide when tickets are redeemed
 */
export interface TicketRedemptionByCodeRequest {
  ticketCode: string
  redemptionDateTime: string // ISO 8601 datetime
}

export interface TicketRedemptionByBookingRequest {
  bookingReference: string
  redemptionDateTime: string // ISO 8601 datetime
}

export interface TicketRedemptionResponse {
  success: boolean
}

/**
 * Reactivate Product
 * Optional endpoint to reactivate a deactivated product
 */
export interface ReactivateProductRequest {
  productId: string
}

export interface ReactivateProductResponse {
  success: boolean
}

/**
 * Product Details
 * Get product details from GetYourGuide
 */
export interface ProductDetailsRequest {
  externalProductId: string
}

export interface ProductDetailsResponse {
  productId: string
  title: string
  description: string
  // Add more fields as needed
}

/**
 * Products List
 * Get list of products for a supplier
 */
export interface ProductsListRequest {
  supplierId: string
  page?: number
  pageSize?: number
}

export interface ProductsListResponse {
  products: Array<{
    productId: string
    title: string
    status: 'ACTIVE' | 'INACTIVE'
  }>
  totalCount: number
}

// ============================================================================
// Internal State Management Types
// ============================================================================

export interface ReservationState {
  id: string
  supplierReservationReference: string
  reservationReference: string
  productId: string
  dateTime: string
  tickets: TicketRequest[]
  retailPrice?: number
  currency?: string
  expiresAt: Date
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'BOOKED'
  createdAt: Date
  updatedAt: Date
}

export interface BookingState {
  id: string
  supplierBookingReference: string
  bookingReference: string
  supplierReservationReference: string
  productId: string
  dateTime: string
  tickets: TicketRequest[]
  customer: Customer
  retailPrice?: number
  currency?: string
  generatedTickets: Ticket[]
  status: 'CONFIRMED' | 'CANCELLED'
  createdAt: Date
  updatedAt: Date
  cancelledAt?: Date
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface GYGSupplierConfig {
  username: string
  password: string
  baseUrl: string
  supplierId: string
  reservationHoldMinutes?: number // Default: 60 minutes
}

export interface GYGClientConfig {
  username: string
  password: string
  baseUrl: string
}


