/**
 * Viator Partner API (2.0) TypeScript Type Definitions
 * Based on official Viator API documentation
 */

// ============================================================================
// Common Types
// ============================================================================

export interface Location {
  ref: string
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Address {
  street?: string
  administrativeArea?: string
  city?: string
  state?: string
  country: string
  countryCode: string
  postcode?: string
}

export interface LocationDetails {
  provider: string
  reference: string
  name: string
  address: Address
  center: Coordinates
}

// ============================================================================
// Product Types
// ============================================================================

export type AgeBand = 'ADULT' | 'CHILD' | 'INFANT' | 'YOUTH' | 'SENIOR' | 'TRAVELER'

export interface AgeBandInfo {
  ageBand: AgeBand
  startAge: number
  endAge: number
  minTravelersPerBooking: number
  maxTravelersPerBooking: number
}

export interface ProductOption {
  productOptionCode: string
  description: string
  title: string
  languageGuides?: string[]
}

export interface PricingInfo {
  type: 'PER_PERSON' | 'UNIT'
  ageBands: AgeBandInfo[]
  unitType?: 'VEHICLE' | 'ROOM' | 'PACKAGE' | 'GROUP' | 'BIKE' | 'BOAT' | 'AIRCRAFT'
}

export interface Duration {
  fixedDurationInMinutes?: number
  variableDurationFromMinutes?: number
  variableDurationToMinutes?: number
}

export interface CancellationPolicy {
  type: 'STANDARD' | 'CUSTOM' | 'ALL_SALES_FINAL'
  description: string
  cancelIfBadWeather: boolean
  cancelIfInsufficientTravelers: boolean
  refundEligibility: RefundEligibility[]
}

export interface RefundEligibility {
  dayRangeMin: number
  dayRangeMax?: number
  percentageRefundable: number
  startTimestamp?: string
  endTimestamp?: string
}

export interface ProductImage {
  imageSource: string
  caption?: string
  isCover: boolean
  variants: ImageVariant[]
}

export interface ImageVariant {
  url: string
  width: number
  height: number
}

export interface ItineraryItem {
  pointOfInterestLocation?: {
    location: Location
    attractionId?: number
  }
  duration: Duration
  passByWithoutStopping?: boolean
  admissionIncluded?: 'YES' | 'NO' | 'NOT_APPLICABLE'
  description: string
}

export interface Itinerary {
  itineraryType: 'STANDARD' | 'ACTIVITY' | 'MULTI_DAY_TOUR' | 'HOP_ON_HOP_OFF' | 'UNSTRUCTURED'
  skipTheLine: boolean
  privateTour?: boolean
  maxTravelersInSharedTour?: number
  duration: Duration
  itineraryItems?: ItineraryItem[]
  unstructuredDescription?: string
  unstructuredItinerary?: string
}

export interface Product {
  productCode: string
  title: string
  description: string
  productUrl: string
  productOptions: ProductOption[]
  pricingInfo: PricingInfo
  cancellationPolicy: CancellationPolicy
  images: ProductImage[]
  itinerary: Itinerary
  bookingQuestions: string[]
  duration: Duration
  tags: string[]
  locations: Location[]
  destId?: number
  reviewsInfo?: ReviewsInfo
}

export interface ReviewsInfo {
  combinedAverageRating: number
  totalReviews: number
}

// ============================================================================
// Availability Types
// ============================================================================

export interface PricingDetails {
  pricingPackageType: 'PER_PERSON' | 'PER_UNIT'
  minTravelers: number
  ageBand: AgeBand
  price: {
    original: PriceBreakdown
    special?: SpecialPriceBreakdown
  }
}

export interface PriceBreakdown {
  recommendedRetailPrice: number
  partnerNetPrice: number
  bookingFee: number
  partnerTotalPrice: number
}

export interface SpecialPriceBreakdown extends PriceBreakdown {
  offerStartDate: string
  offerEndDate: string
}

export interface UnavailableDate {
  date: string
  reason: 'SOLD_OUT' | 'UNAVAILABLE'
}

export interface TimedEntry {
  startTime: string
  unavailableDates: UnavailableDate[]
}

export interface PricingRecord {
  daysOfWeek: string[]
  timedEntries: TimedEntry[]
  pricingDetails: PricingDetails[]
}

export interface Season {
  startDate: string
  endDate?: string
  pricingRecords: PricingRecord[]
}

export interface BookableItem {
  productOptionCode: string
  seasons: Season[]
}

export interface AvailabilitySchedule {
  productCode: string
  bookableItems: BookableItem[]
  currency: string
  summary: {
    fromPrice: number
  }
}

// ============================================================================
// Availability Check Types
// ============================================================================

export interface AvailabilityCheckRequest {
  productCode: string
  productOptionCode: string
  travelDate: string
  startTime?: string
  paxMix: PaxMix[]
}

export interface PaxMix {
  ageBand: AgeBand
  numberOfTravelers: number
}

export interface AvailabilityCheckResponse {
  productCode: string
  productOptionCode: string
  available: boolean
  travelDate: string
  startTime?: string
  pricing?: {
    summary: PriceBreakdown
    breakdown: PricingDetails[]
  }
  currency: string
}

// ============================================================================
// Booking Types
// ============================================================================

export interface BookingQuestionAnswer {
  question: string
  answer: string
  unit?: string
  travelerNum?: number
}

export interface BookerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface Communication {
  email: string
  phone: string
}

export interface CartBookingRequest {
  items: BookingItem[]
  bookerInfo: BookerInfo
  communication: Communication
}

export interface BookingItem {
  partnerItemRef: string
  productCode: string
  productOptionCode: string
  travelDate: string
  startTime?: string
  paxMix: PaxMix[]
  bookingQuestionAnswers?: BookingQuestionAnswer[]
}

export interface BookingResponse {
  bookingRef: string
  status: 'CONFIRMED' | 'PENDING' | 'REJECTED' | 'ON_HOLD'
  items: BookedItem[]
  totalPrice: PriceBreakdown
  currency: string
  voucherURL?: string
  voucherPDFURL?: string
}

export interface BookedItem {
  itemRef: string
  partnerItemRef: string
  productCode: string
  productOptionCode: string
  travelDate: string
  status: string
  pricing: PriceBreakdown
}

// ============================================================================
// Search Types
// ============================================================================

export interface SearchRequest {
  searchTerm: string
  searchType?: 'PRODUCTS' | 'DESTINATIONS' | 'ATTRACTIONS'
  destId?: number
  startDate?: string
  endDate?: string
  topX?: number
  currency?: string
}

export interface SearchResultProduct {
  productCode: string
  title: string
  description: string
  productUrl: string
  rating: number
  reviewCount: number
  fromPrice: number
  currency: string
  images: ProductImage[]
  duration: Duration
  destId: number
}

export interface SearchResponse {
  products: SearchResultProduct[]
  totalCount: number
}

// ============================================================================
// Product Search Types
// ============================================================================

export interface ProductSearchRequest {
  filtering?: {
    destination?: string // Destination ID as string (e.g., "732")
    tags?: string[]
    destId?: number // Legacy support, prefer 'destination'
    startDate?: string
    endDate?: string
    priceMin?: number
    priceMax?: number
    durationMinutes?: {
      from?: number
      to?: number
    }
  }
  pagination?: {
    offset?: number
    limit?: number
  }
  sorting?: {
    sortBy?: 'PRICE_FROM_LOW_TO_HIGH' | 'PRICE_FROM_HIGH_TO_LOW' | 'REVIEW_AVG_RATING_D' | 'POPULARITY'
  }
  currency?: string
}

// ============================================================================
// Reviews Types
// ============================================================================

export interface ReviewRequest {
  productCode: string
  pagination?: {
    offset?: number
    limit?: number
  }
}

export interface Review {
  reviewId: string
  rating: number
  title: string
  text: string
  publishedDate: string
  provider: 'VIATOR' | 'TRIPADVISOR'
  travelerName: string
  helpfulVotes: number
  photosInfo?: ReviewPhoto[]
}

export interface ReviewPhoto {
  photoURL: string
  caption?: string
}

export interface ReviewResponse {
  productCode: string
  reviews: Review[]
  totalCount: number
  averageRating: number
}

// ============================================================================
// Destinations Types
// ============================================================================

export interface Destination {
  destId: number
  destinationName: string
  destinationUrlName: string
  parentId?: number
  timeZone: string
  iataCode?: string
  lookupId?: string
}

export interface DestinationsResponse {
  destinations: Destination[]
}

// ============================================================================
// Attractions Types
// ============================================================================

export interface Attraction {
  attractionId: number
  title: string
  description: string
  location: LocationDetails
  images: ProductImage[]
  rating?: number
  reviewCount?: number
}

export interface AttractionSearchRequest {
  searchTerm?: string
  destId?: number
  latitude?: number
  longitude?: number
  radiusKm?: number
}

// ============================================================================
// API Response Wrapper
// ============================================================================

export interface ViatorAPIError {
  code: string
  message: string
  timestamp: string
  trackingId: string
}

export interface ViatorAPIResponse<T> {
  data?: T
  error?: ViatorAPIError
}


