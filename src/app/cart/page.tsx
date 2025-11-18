
'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/components/sections/menu';
import OrderForm from '@/components/order-form';
import Logo from '@/components/logo';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo className="text-xl" />
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/order">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Menu
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Keranjang Belanja</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Pesanan Anda</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Keranjang belanja Anda kosong.</p>
                ) : (
                  <div className="divide-y">
                    {cart.map((item) => (
                      <div key={item.name} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.name, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.name, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                        </div>
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => updateQuantity(item.name, 0)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {cart.length > 0 && (
            <div className="lg:col-span-1 sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Detail Pengiriman & Pembayaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <Separator />
                  <OrderForm />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
