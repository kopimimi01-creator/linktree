import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, Instagram, Facebook } from "lucide-react";
import Logo from "@/components/logo";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


export default function Footer() {
  const whatsappNumber = "628179078878";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const instagramUrl = "https://www.instagram.com/kopimi.daily";

  return (
    <footer className="bg-primary text-primary-foreground/70">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-2">
            <Logo className="text-primary-foreground text-2xl" />
            <p className="mt-4 max-w-sm">Dibuat dengan hati, disajikan dengan senyuman. Dosis kehangatan dan sambutan harianmu. Yang Penting Kamu</p>
            <div className="flex space-x-4 mt-6">
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon className="w-6 h-6 hover:text-primary-foreground transition-colors" /></Link>
              <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-primary-foreground transition-colors" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-primary-foreground transition-colors" /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold font-headline text-base text-primary-foreground/90">Jam Buka</h4>
            <ul className="mt-4 space-y-2">
              <li>Setiap Hari: 08:00 - 22:00</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold font-headline text-base text-primary-foreground/90">Kontak</h4>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0"/> <span>+62 817-9078-878</span></li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-1"/>
                <Link href="https://maps.app.goo.gl/tWrzWAftGAF1XAyh6" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
                  Jl. Palebon Raya, Palebon, Kec. Pedurungan, Kota Semarang, Jawa Tengah 50246
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-primary-foreground/20" />
        <div className="text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Kopimi Cafe. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
