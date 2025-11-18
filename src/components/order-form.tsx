
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
import { MapPin, LocateFixed } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const orderSchema = z.object({
  customerName: z.string().min(1, 'Nama tidak boleh kosong'),
  address: z.string().min(10, 'Alamat terlalu pendek'),
  addressDetails: z.string().optional(),
});

export default function OrderForm() {
  const { cart, totalPrice } = useCart();
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: '',
      address: '',
      addressDetails: '',
    },
  });

  const handleAutoLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation tidak didukung",
        description: "Browser Anda tidak mendukung fitur lokasi otomatis.",
      });
      return;
    }

    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          if (data && data.display_name) {
            form.setValue('address', data.display_name, { shouldValidate: true });
            toast({
              title: "Lokasi Ditemukan",
              description: "Alamat telah diisi secara otomatis.",
            });
          } else {
            throw new Error("Alamat tidak ditemukan.");
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Gagal Mengambil Alamat",
            description: "Tidak dapat menemukan alamat dari lokasi Anda.",
          });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        let title = "Gagal Mendapatkan Lokasi";
        let description = "Terjadi kesalahan saat mencoba mendapatkan lokasi Anda.";
        if (error.code === error.PERMISSION_DENIED) {
            title = "Izin Lokasi Ditolak"
            description = "Anda perlu memberikan izin akses lokasi di browser Anda.";
        }
        toast({ variant: "destructive", title, description });
        setIsLocating(false);
      }
    );
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
              <div className="flex justify-between items-center">
                <FormLabel>Alamat Lengkap</FormLabel>
                <Button 
                  type="button" 
                  variant="link" 
                  className="h-auto p-0 text-xs" 
                  onClick={handleAutoLocation}
                  disabled={isLocating}
                >
                  <LocateFixed className="mr-1 h-3 w-3" />
                  {isLocating ? 'Mencari...' : 'Gunakan Lokasi Saat Ini'}
                </Button>
              </div>
              <FormControl>
                <Textarea placeholder="Masukkan alamat lengkap Anda..." {...field} />
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
  );
}
