import OrderForm from '@/components/order-form';
import { menu } from '@/components/sections/menu';
import Logo from '@/components/logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function OrderPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Logo className="text-xl" />
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Pesan Online</h1>
          <p className="mt-4 text-lg text-muted-foreground">Pilih minuman favoritmu dan kami akan siapkan untukmu.</p>
          <p className="text-sm text-muted-foreground">Pengiriman via Maxim, ongkir ditanggung oleh pelanggan.</p>
        </div>
        <OrderForm menuData={menu} />
      </main>
    </div>
  );
}
