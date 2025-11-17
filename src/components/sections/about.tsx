import { Award, Armchair, Gem } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-headline font-bold">Where Good Mornings Begin</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          At Kopimi Cafe, we believe in the simple pleasure of a perfectly crafted beverage. Our process is a labor of love, from sourcing the finest ingredients to the hands that craft your drink. We've created a space that feels like a second home—warm, welcoming, and always ready with a smile.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-secondary rounded-full">
              <Award className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold font-headline">Quality</h3>
              <p className="mt-2 text-muted-foreground">Finest ingredients, expertly prepared.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-secondary rounded-full">
              <Armchair className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold font-headline">Comfort</h3>
              <p className="mt-2 text-muted-foreground">A cozy ambiance to relax and recharge.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-secondary rounded-full">
              <Gem className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold font-headline">Craftsmanship</h3>
              <p className="mt-2 text-muted-foreground">Every drink made with passion and precision.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
