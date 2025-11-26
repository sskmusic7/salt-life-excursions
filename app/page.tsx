import { Hero } from '@/components/home/Hero'
import { FeaturedActivities } from '@/components/home/FeaturedActivities'
import { Categories } from '@/components/home/Categories'
// import { LocationShowcase } from '@/components/home/LocationShowcase'
import { PackageDeals } from '@/components/home/PackageDeals'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedActivities />
      {/* <LocationShowcase /> */}
      <PackageDeals />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  )
}

