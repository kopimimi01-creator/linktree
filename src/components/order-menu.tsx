
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { Promos, formatPrice, calculateDiscountedPrice } from '@/components/sections/menu';
import { useToast } from '@/hooks/use-toast';

type MenuItem = {
  name: string;
  price: number;
};

type OrderMenuProps = {
  menuData: {
    [category: string]: MenuItem[];
  };
};

export default function OrderMenu({ menuData }: OrderMenuProps) {
  const [isGoldenHour, setIsGoldenHour] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: MenuItem) => {
    const price = (isGoldenHour && menuData['Coffee Series'].some(coffee => coffee.name === item.name)) 
                  ? calculateDiscountedPrice(item.price) 
                  : item.price;
    
    const itemWithCorrectPrice = { ...item, price };
    addToCart(itemWithCorrectPrice);
    toast({
        title: "Ditambahkan ke keranjang",
        description: `${item.name} telah ditambahkan.`,
    })
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3">
        <div className="space-y-12">
          <Promos onGoldenHourChange={setIsGoldenHour} />
          {Object.entries(menuData).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-2xl font-headline font-semibold text-primary mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <div key={item.name} className="border rounded-lg p-4 flex flex-col justify-between shadow-sm">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      {isGoldenHour && category === 'Coffee Series' ? (
                        <div className="flex items-center gap-2">
                          <p className="text-muted-foreground line-through text-sm">{formatPrice(item.price)}</p>
                          <p className="text-amber-500 font-semibold">{formatPrice(calculateDiscountedPrice(item.price))}</p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">{formatPrice(item.price)}</p>
                      )}
                    </div>
                    <Button onClick={() => handleAddToCart(item)} className="mt-4 w-full">
                      Tambah
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
