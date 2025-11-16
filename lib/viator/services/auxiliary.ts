/**
 * Viator Auxiliary Services
 * Handles exchange rates and supplier information
 */

import { getViatorClient } from '../client'

export class ViatorAuxiliaryService {
  /**
   * Get exchange rates
   * Endpoint: GET /exchange-rates
   */
  static async getExchangeRates(language?: string): Promise<{
    date: string
    rates: Record<string, number>
    baseCurrency: string
  }> {
    const client = getViatorClient()
    return client.get('/partner/exchange-rates', { language })
  }

  /**
   * Search suppliers by product codes
   * Endpoint: POST /suppliers/search/product-codes
   * Note: Available to Full-access + Booking Affiliate and Merchant partners only
   */
  static async searchSuppliersByProductCodes(
    productCodes: string[],
    language?: string
  ): Promise<{
    suppliers: Array<{
      supplierId: string
      supplierName: string
      productCodes: string[]
      supplierAgreedToLegalCompliance: boolean
      registrationCountry?: string
      tradeRegisterName?: string
      registeredBusinessNumber?: string
      contactDetails?: {
        email?: string
        phone?: string
        address?: string
        countryCode?: string
      }
    }>
  }> {
    const client = getViatorClient()
    return client.post(
      '/partner/suppliers/search/product-codes',
      { productCodes },
      { language }
    )
  }
}


