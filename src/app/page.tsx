import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import OpeningHoursSection from '@/components/sections/opening-hours';
import ExperienceSection from '@/components/sections/experience';
import MenuSection from '@/components/sections/menu';
import StorySection from '@/components/sections/story';
import LocationSection from '@/components/sections/location';
import CtaSection from '@/components/sections/cta';
import OrderOnlineSection from '@/components/sections/order-online';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <OpeningHoursSection />
        <ExperienceSection />
        <MenuSection />
        <StorySection />
        <LocationSection />
        <OrderOnlineSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
