import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-background rounded-2xl p-12 md:p-20 shadow-lg text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-foreground">Hadirkan Kehangatan di Harimu</h2>
          <div className="mt-8">
            <Button size="lg" className="transition-transform transform hover:scale-105 shadow-md">
              Pesan Sekarang
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
