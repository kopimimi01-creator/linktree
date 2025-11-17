import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-screen text-primary-foreground overflow-hidden">
      <Image
        src="https://picsum.photos/seed/hero-coffee/1920/1080"
        alt="A cozy coffee shop interior"
        fill
        className="object-cover"
        priority
        data-ai-hint="cozy coffee shop"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight text-white shadow-text">A Warm Welcome In Every Cup</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90 shadow-text">Kopimi Cafe — Crafted With Heart</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="transition-transform transform hover:scale-105 shadow-md">
            Order Now
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-transform transform hover:scale-105 shadow-md backdrop-blur-sm bg-white/10">
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
