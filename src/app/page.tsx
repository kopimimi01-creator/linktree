import Header from '@/components/header';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ExperienceSection from '@/components/sections/experience';
import MenuSection from '@/components/sections/menu';
import StorySection from '@/components/sections/story';
import CtaSection from '@/components/sections/cta';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <MenuSection />
        <StorySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
