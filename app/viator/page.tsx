/**
 * Redirect /viator to /activities
 * All activities are now on the main activities page
 */

import { redirect } from 'next/navigation'

export default function ViatorPage() {
  redirect('/activities')
}
