import { Button } from "@/components/ui/button";
import AbstractShape1 from "@/components/icons/abstract-shape-1";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-primary text-primary-foreground py-32 md:py-48 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-[0.03]">
        <AbstractShape1 className="w-[800px] h-[800px] text-primary-foreground" />
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">A Warm Welcome In Every Cup</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/80">Kopimi Cafe — Crafted With Heart</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="transition-transform transform hover:scale-105 shadow-md">
            Order Now
          </Button>
          <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-transform transform hover:scale-105 shadow-md">
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
