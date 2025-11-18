'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, Trash2, MapPin, RefreshCw } from 'lucide-react';
import MenuSection, { menu, bundles, formatPrice, calculateDiscountedPrice } from '@/components/sections/menu';


const orderSchema = z.object({
  customerName: z.string().min(1, 'Nama tidak boleh kosong'),
  address: z.string().min(10, 'Alamat terlalu pendek'),
  addressDetails: z.string().optional(),
});

type MenuItem = {
  name: string;
  price: number;
};

type CartItem = MenuItem & {
  quantity: number;
};

type OrderFormProps = {
  menuData: {
    [category: string]: MenuItem[];
  };
};

export default function OrderForm({ menuData }: OrderFormProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: '',
      address: '',
      addressDetails: '',
    },
  });

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.name !== name);
      }
      return prevCart.map((item) => (item.name === name ? { ...item, quantity } : item));
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppMessage = (data: z.infer<typeof orderSchema>) => {
    let message = `Halo Kopimi Cafe, saya mau pesan:\n\n`;
    cart.forEach((item) => {
      message += `${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\n*Total Pesanan: ${formatPrice(totalPrice)}*\n`;
    message += `\n---\n\n*Detail Pengiriman:*\n`;
    message += `Nama: ${data.customerName}\n`;
    message += `Alamat: ${data.address}\n`;
    if (data.addressDetails) {
      message += `Detail Lokasi: ${data.addressDetails}\n`;
    }
    message += `\nMohon siapkan pesanan saya. Pengiriman menggunakan Maxim (ongkir ditanggung di tempat).\n\nTerima kasih!`;
    return encodeURIComponent(message);
  };
  
  const onSubmit = (data: z.infer<typeof orderSchema>) => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }
    const phoneNumber = '628179078878';
    const message = generateWhatsAppMessage(data);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const autofillLocation = () => {
    form.setValue('address', "Mencari lokasi...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Simple reverse geocoding approximation using a public API
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              if (data && data.display_name) {
                form.setValue('address', data.display_name);
              } else {
                form.setValue('address', `Koordinat: ${latitude}, ${longitude}`);
              }
            })
            .catch(() => {
              alert('Gagal mendapatkan nama alamat. Menggunakan koordinat.');
              form.setValue('address', `Koordinat: ${latitude}, ${longitude}`);
            });
        },
        (error) => {
          alert(`Gagal mendapatkan lokasi: ${error.message}`);
          form.setValue('address', "");
        }
      );
    } else {
      alert('Geolocation tidak didukung oleh browser ini.');
      form.setValue('address', "");
    }
  };


  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <MenuSection />
        </div>
      </div>
      
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
            <span className="sr-only">Buka Keranjang</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Keranjang Anda</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto -mx-6 px-6">
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center mt-8">Keranjang belanja Anda kosong.</p>
            ) : (
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.name} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
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
          </div>
          {cart.length > 0 && (
            <SheetFooter className="mt-auto border-t pt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Anda</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat Lengkap</FormLabel>
                          <FormControl>
                            <div className="relative">
                               <Textarea placeholder="Jl. Pahlawan No. 123..." {...field} />
                               <div className="absolute top-1 right-1 flex items-center">
                                <Button type="button" size="icon" variant="ghost" className="h-8 w-8" onClick={autofillLocation}>
                                  <MapPin className="h-4 w-4" />
                                  <span className="sr-only">Gunakan lokasi saat ini</span>
                                </Button>
                                <Button type="button" size="icon" variant="ghost" className="h-8 w-8" onClick={autofillLocation}>
                                  <RefreshCw className="h-4 w-4" />
                                  <span className="sr-only">Segarkan lokasi</span>
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="addressDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detail Lokasi (Opsional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Rumah cat hijau, depan taman" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" size="lg">
                      Pesan via WhatsApp
                    </Button>
                  </form>
                </Form>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
