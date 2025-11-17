import { Award, Armchair, Gem } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-headline font-bold">Awal Mula Sebuah Pagi</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Di Kopimi Cafe, kami percaya pada kenikmatan sederhana dari minuman yang dibuat sepenuh hati. Kami telah menciptakan ruang yang terasa seperti rumah kedua—hangat, ramah, dan selalu siap menyambutmu dengan senyuman.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-secondary rounded-full">
              <Award className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold font-headline">Kualitas</h3>
              <p className="mt-2 text-muted-foreground">Bahan-bahan terbaik, diracik dengan ahli.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-secondary rounded-full">
              <Armchair className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold font-headline">Kenyamanan</h3>
              <p className="mt-2 text-muted-foreground">Suasana nyaman untuk bersantai dan mengisi daya.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-secondary rounded-full">
              <Gem className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold font-headline">Kerajinan</h3>
              <p className="mt-2 text-muted-foreground">Setiap minuman dibuat dengan semangat dan presisi.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
