
import { MapPin } from 'lucide-react';

export default function LocationSection() {
  const address = "Jl. Palebon Raya, Palebon, Kec. Pedurungan, Kota Semarang, Jawa Tengah 50246";
  const gmapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.038379434057!2d110.4662824!3d-7.0065642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708d75283f5e55%3A0x1b3052a657c9179!2sKopimi%20Cafe!5e0!3m2!1sen!2sid!4v1687854652135!5m2!1sen!2sid";

  return (
    <section id="location" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center text-secondary-foreground">Temukan Kami</h2>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full h-80 lg:h-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={gmapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kopimi Cafe Location"
            ></iframe>
          </div>
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xl font-semibold">
              <MapPin className="w-6 h-6 text-primary" />
              <span>Alamat Kami</span>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">
              {address}
            </p>
            <a 
              href="https://maps.app.goo.gl/tWrzWAftGAF1XAyh6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Lihat di Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
