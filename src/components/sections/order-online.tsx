
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, MessageSquare } from "lucide-react";

export default function OrderOnlineSection() {
  return (
    <section id="order-online" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center text-foreground">Pesan Online</h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
          Nikmati Kopimi Cafe di mana pun kamu berada. Pesan melalui platform favoritmu.
        </p>
        <div className="mt-12 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button size="lg" variant="outline" asChild className="transition-transform transform hover:scale-105">
            <Link href="/order">
              <MessageSquare className="mr-2 h-5 w-5" />
              WhatsApp
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="transition-transform transform hover:scale-105">
            <Link href="https://gofood.link/a/RiJkUdG" target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Gojek
            </Link>
          </Button>
           <Button size="lg" variant="outline" asChild className="transition-transform transform hover:scale-105">
            <Link href="https://r.grab.com/g/6-20251119_125545_ecc35796f16241948535eaa78ce1b690_MEXMPS-6-C7NAT3CAGAXGR6" target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="mr-2 h-5 w-5" />
              GrabFood
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="transition-transform transform hover:scale-105">
            <Link href="https://spf.shopee.co.id/4VUbPKDWMt" target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Shopee Food
            </Link>
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">Pemesanan via WhatsApp akan diantar oleh Maxim (ongkir ditanggung pelanggan).</p>
      </div>
    </section>
  );
}
