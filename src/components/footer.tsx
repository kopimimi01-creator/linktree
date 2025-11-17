import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, Twitter, Instagram, Facebook } from "lucide-react";
import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="bg-[#06261C] text-primary-foreground/70">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-2">
            <Logo className="text-primary-foreground text-2xl" />
            <p className="mt-4 max-w-sm">Crafted with heart, served with a smile. Your daily dose of warmth and welcome.</p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" aria-label="Twitter"><Twitter className="w-6 h-6 hover:text-primary-foreground transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-primary-foreground transition-colors" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-primary-foreground transition-colors" /></Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold font-headline text-base text-primary-foreground/90">Hours</h4>
            <ul className="mt-4 space-y-2">
              <li>Mon-Fri: 7am - 6pm</li>
              <li>Sat-Sun: 8am - 5pm</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold font-headline text-base text-primary-foreground/90">Contact</h4>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0"/> <span>(123) 456-7890</span></li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0"/> <span>123 Cafe Street, Townsville</span></li>
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
