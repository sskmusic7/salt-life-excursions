# Google Integration Guide for Salt Life TCI

## 📍 Google Maps Integration

### Current Implementation
The website includes Google Maps placeholders throughout:
- **Itinerary Builder**: Interactive map showing selected activities
- **Activity Detail Pages**: Location maps for each excursion
- **Homepage**: Map showcasing activity locations across Turks & Caicos

### Setting Up Google Maps API

1. **Get API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable APIs: Maps JavaScript API, Places API, Geocoding API
   - Create credentials → API Key
   - Restrict key (HTTP referrers for your domain)

2. **Add to Environment Variables**
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

3. **Install Google Maps Package**
   ```bash
   npm install @react-google-maps/api
   ```

4. **Update GoogleMap Component**
   Replace the placeholder in `/components/shared/GoogleMap.tsx` with real implementation:

   ```tsx
   import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
   
   export function GoogleMap({ activities, center, zoom }) {
     return (
       <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
         <GoogleMap
           mapContainerStyle={{ width: '100%', height: '400px' }}
           center={center}
           zoom={zoom}
         >
           {activities.map((activity, index) => (
             <Marker
               key={activity.id}
               position={activity.coordinates}
               label={(index + 1).toString()}
             />
           ))}
         </GoogleMap>
       </LoadScript>
     );
   }
   ```

### Cost Considerations
- Maps JavaScript API: $7 per 1,000 loads (first 28,000 free/month)
- Places API: $17 per 1,000 requests
- **Tip**: Implement caching and only load maps when visible

---

## 🔍 Sourcing Activities from Google

### Important Legal & Ethical Considerations

#### ⚠️ Web Scraping Limitations
**You CANNOT legally scrape Google Search results** for the following reasons:

1. **Google Terms of Service Violation**
   - Automated querying violates Google's ToS
   - Can result in IP bans and legal action

2. **Copyright & Intellectual Property**
   - Business descriptions, images, and content are copyrighted
   - Using without permission is copyright infringement

3. **Business Data Privacy**
   - Business contact info and details are private data
   - GDPR/CCPA regulations protect this information

### ✅ LEGAL Alternative Approaches

#### Option 1: Google Places API (Recommended)
**What it does**: Officially access business data with Google's permission

**Implementation**:
```javascript
// Example: Search for excursions in Turks & Caicos
const response = await fetch(
  `https://maps.googleapis.com/maps/api/place/textsearch/json?query=excursions+in+turks+and+caicos&key=YOUR_API_KEY`
);

const data = await response.json();
// Returns: name, address, phone, rating, photos
```

**Limitations**:
- Basic info only (name, location, rating)
- NO detailed descriptions
- NO pricing information
- Photos require attribution
- Rate limits apply

**Cost**: $32 per 1,000 requests (1,000 free/month)

#### Option 2: Manual Provider Onboarding (Best Approach)
**Why this is better**:
1. ✅ **100% Legal** - Direct partnerships
2. ✅ **Better Quality** - Curated, verified providers
3. ✅ **Revenue Sharing** - Commission-based model
4. ✅ **Full Control** - Exclusive deals, pricing
5. ✅ **Customer Trust** - Verified providers badge

**Implementation Process**:
```
1. Research local Turks & Caicos excursion providers
2. Contact them directly (email, phone)
3. Propose partnership (commission-based listing)
4. Collect high-quality images, descriptions, pricing
5. Sign agreement and onboard to platform
6. Manual data entry via Provider Portal
```

#### Option 3: Content Partnerships & Licensing
- Partner with travel content platforms (Viator, GetYourGuide API)
- License activity data from aggregators
- Affiliate marketing programs

---

## 🏠 Homepage Maps Implementation

### Current Features
The homepage now includes interactive map sections:

1. **Hero Section Map Preview**
   - Shows Turks & Caicos overview
   - Highlights popular activity zones

2. **Featured Activities Map**
   - Pins for each featured excursion
   - Click to view details

3. **Location Showcase**
   - Interactive exploration of the islands
   - Filter activities by region

### Adding Real Maps to Homepage

Update `/app/page.tsx` to include:

```tsx
import { GoogleMap } from '@/components/shared/GoogleMap';

// In your component
<section className="py-20 bg-white">
  <div className="container-custom">
    <h2 className="text-4xl font-bold text-center mb-12">
      Explore Activities Across Turks & Caicos
    </h2>
    <GoogleMap
      activities={featuredActivities}
      center={{ lat: 21.7907, lng: -72.2584 }}
      zoom={11}
    />
  </div>
</section>
```

---

## 📊 Recommended Data Strategy

### Phase 1: Manual Curation (Launch)
- Manually onboard 15-20 top providers
- Focus on quality over quantity
- Build trust and reputation

### Phase 2: Provider Self-Service (Growth)
- Open provider registration portal
- Implement approval workflow
- Scale through word-of-mouth

### Phase 3: API Integrations (Scale)
- Integrate with travel APIs (if budget allows)
- Automated data syncing
- Real-time availability updates

---

## 🚀 Quick Start Checklist

- [ ] Get Google Maps API key
- [ ] Add API key to `.env.local`
- [ ] Install `@react-google-maps/api`
- [ ] Update GoogleMap component with real implementation
- [ ] Test maps on all pages
- [ ] Reach out to 10-15 local Turks & Caicos providers
- [ ] Manually input first batch of activities
- [ ] Set up provider onboarding workflow
- [ ] Launch with curated, verified content

---

## 💡 Best Practices

### For Google Maps
1. **Lazy Load**: Only load maps when user scrolls to them
2. **Cache Results**: Store geocoded locations in database
3. **Optimize Markers**: Use marker clustering for many activities
4. **Mobile Friendly**: Ensure maps are touch-responsive

### For Activity Data
1. **Quality > Quantity**: Better to have 20 great activities than 200 mediocre ones
2. **Verify Everything**: Check all provider info before publishing
3. **High-Res Images**: Require professional photos
4. **Detailed Descriptions**: Work with providers to write compelling copy
5. **Keep Updated**: Regular audits of pricing and availability

---

## 🆘 Support Resources

- **Google Maps Documentation**: https://developers.google.com/maps/documentation
- **Places API Docs**: https://developers.google.com/maps/documentation/places
- **React Google Maps**: https://react-google-maps-api-docs.netlify.app/

---

**Remember**: The most successful marketplace platforms focus on quality partnerships and manual curation in their early stages. Automated scraping is neither legal nor sustainable. Build trust with providers and customers through verified, high-quality content! 🌴


