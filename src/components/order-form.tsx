
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/components/sections/menu';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const MapPicker = dynamic(() => import('@/components/map-picker'), {
  ssr: false,
});

const orderSchema = z.object({
  customerName: z.string().min(1, 'Nama tidak boleh kosong'),
  address: z.string().min(10, 'Alamat terlalu pendek'),
  addressDetails: z.string().optional(),
});

export default function OrderForm() {
  const { cart, totalPrice } = useCart();
  const [isMapOpen, setMapOpen] = useState(false);

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: '',
      address: '',
      addressDetails: '',
    },
  });

  const handleAddressSelect = (selectedAddress: string) => {
    form.setValue('address', selectedAddress, { shouldValidate: true });
    setMapOpen(false);
  };

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

  return (
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
                <Textarea placeholder="Pilih dari peta atau isi manual..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <Dialog open={isMapOpen} onOpenChange={setMapOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" /> Pilih Lokasi dari Peta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Pilih Lokasi Pengiriman</DialogTitle>
            </DialogHeader>
            <div className="h-full w-full flex-1">
               {isMapOpen && <MapPicker onLocationSelect={handleAddressSelect} />}
            </div>
          </DialogContent>
        </Dialog>
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
  );
}
