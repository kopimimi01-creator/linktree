import AbstractShape2 from "@/components/icons/abstract-shape-2";

export default function StorySection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative w-full h-64 lg:h-full min-h-[300px] flex items-center justify-center">
            <AbstractShape2 className="w-full max-w-md h-auto text-primary" />
          </div>
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Cerita Kami</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Kopimi Cafe dimulai dari mimpi sederhana: menciptakan tempat di mana komunitas bisa berkumpul sambil menikmati minuman istimewa. Kami bukan hanya menyajikan minuman; kami membangun koneksi dan memberikan momen hangat di tengah hari sibukmu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
