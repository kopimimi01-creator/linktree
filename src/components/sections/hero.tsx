import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative h-48 md:h-64 w-full">
        <Image
          src="https://jelajahnesia.id/wp-content/uploads/2025/02/layout-artikel-4x3cm-8.jpg"
          alt="Coffee beans background"
          fill
          className="object-cover"
          priority
          data-ai-hint="coffee beans"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative flex flex-col items-center -mt-16 md:-mt-24 pb-12 pt-4">
          <Avatar className="w-32 h-32 md:w-48 md:h-48 border-4 border-background shadow-lg">
            <AvatarImage src="https://i.imgur.com/eaZrsKJ.jpeg" alt="Kopimi Cafe logo" data-ai-hint="cafe logo"/>
            <AvatarFallback>KC</AvatarFallback>
          </Avatar>
          <div className="text-center mt-4">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Kopimi Cafe</h1>
            <p className="mt-2 text-lg text-muted-foreground">yang penting kamu</p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="transition-transform transform hover:scale-105 shadow-md">
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="transition-transform transform hover:scale-105 shadow-md">
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
