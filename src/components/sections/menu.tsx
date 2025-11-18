"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Clock, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export const menu = {
  "Coffee Series": [
    { name: "Americano", price: 15000 },
    { name: "Coffee Tubruk", price: 12000 },
    { name: "Salted Caramel Latte", price: 23000 },
    { name: "Caramel Latte", price: 23000 },
    { name: "Vanilla Latte", price: 23000 },
    { name: "Coffee Latte", price: 23000 },
    { name: "Kopi Susu Gula Aren", price: 20000 },
  ],
  "Non-Coffee Series": [
    { name: "Matcha Latte", price: 25000 },
    { name: "Chocolate Latte", price: 20000 },
    { name: "Taro Latte", price: 23000 },
    { name: "Teh Tarik Medium", price: 15000 },
    { name: "Teh Tarik Large", price: 20000 },
    { name: "Teh Tarik 1L", price: 100000 },
  ],
};

export const bundles = [
  { name: "Vanilla Latte + Teh Tarik Large", price: 30000 },
  { name: "Salted Caramel Latte + Teh Tarik Large", price: 30000 },
  { name: "Caramel Latte + Teh Tarik Large", price: 30000 },
];

export const formatPrice = (price: number) => {
  return `Rp ${price.toLocaleString('id-ID')}`;
};

export const calculateDiscountedPrice = (price: number) => {
  return price * 0.9;
};

// Re-usable promo logic component
export const Promos = ({ onGoldenHourChange }: { onGoldenHourChange?: (isActive: boolean) => void }) => {
  const [isGoldenHour, setIsGoldenHour] = useState(false);
  const [showBundling, setShowBundling] = useState(false);
  const [bundlingCountdown, setBundlingCountdown] = useState("");
  const [goldenHourCountdown, setGoldenHourCountdown] = useState("");

  useEffect(() => {
    const timerLoop = () => {
      const now = new Date();
      const jakartaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
      
      const currentHour = jakartaTime.getHours();
      const goldenHourActive = currentHour >= 8 && currentHour < 13;
      
      if (isGoldenHour !== goldenHourActive) {
        setIsGoldenHour(goldenHourActive);
        onGoldenHourChange?.(goldenHourActive);
      }

      let goldenHourTarget = new Date(jakartaTime);
      goldenHourTarget.setHours(13, 0, 0, 0); // End of promo today

      if (currentHour >= 13) {
        goldenHourTarget.setDate(goldenHourTarget.getDate() + 1);
        goldenHourTarget.setHours(8, 0, 0, 0);
      } else if (currentHour < 8) {
        goldenHourTarget.setHours(8, 0, 0, 0);
      }

      const ghDifference = goldenHourTarget.getTime() - jakartaTime.getTime();
      if (goldenHourActive) {
          const hours = Math.floor((ghDifference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((ghDifference / 1000 / 60) % 60);
          const seconds = Math.floor((ghDifference / 1000) % 60);
          setGoldenHourCountdown(`${hours}j ${minutes}m ${seconds}d`);
      } else {
        setGoldenHourCountdown("");
      }

      const currentYear = now.getFullYear();
      const promoEndDate = new Date(currentYear, 10, 30, 23, 59, 59);

      if (now > promoEndDate) {
        setShowBundling(false);
        setBundlingCountdown("");
      } else {
        setShowBundling(true);
        const difference = promoEndDate.getTime() - now.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setBundlingCountdown(`${days}h ${hours}j ${minutes}m ${seconds}d`);
      }
    };
    
    timerLoop();
    const interval = setInterval(timerLoop, 1000);

    return () => clearInterval(interval);
  }, [isGoldenHour, onGoldenHourChange]);

  const isOrderPage = typeof window !== 'undefined' && window.location.pathname.includes('/order');
  const textColor = isOrderPage ? 'text-foreground' : 'text-primary-foreground';
  const headingColor = isOrderPage ? 'text-primary' : 'text-amber-300';
  const priceColor = isOrderPage ? 'text-amber-500' : 'text-amber-300';
  const itemColor = isOrderPage ? 'text-muted-foreground' : 'text-primary-foreground/90';
  const separatorColor = isOrderPage ? 'bg-border' : 'bg-primary-foreground/20';
  const countdownColor = isOrderPage ? 'text-amber-600' : 'text-amber-300';
  const countdownBgColor = isOrderPage ? 'bg-amber-100' : 'bg-amber-300/10';

  return (
    <div className="space-y-12">
        {isGoldenHour && (
        <div>
            <div className={`flex items-center gap-4`}>
            <Sparkles className={`w-7 h-7 ${priceColor}`} />
            <h3 className={`text-2xl font-headline font-semibold ${priceColor}`}>Golden Hours</h3>
            </div>
            <Separator className={`my-4 ${separatorColor}`} />
            <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-baseline">
                <span className={`text-lg ${itemColor}`}>Diskon 10% untuk semua varian kopi</span>
                <div className={`flex items-center gap-2 mt-2 sm:mt-0 ${countdownBgColor} ${countdownColor} px-3 py-1 rounded-full text-sm`}>
                <Clock className="w-4 h-4"/> 
                <span className="font-semibold">Berakhir Pukul 13.00 WIB</span>
                </div>
            </div>
                {goldenHourCountdown && (
                <div className="mt-4 text-center">
                    <p className={`text-sm ${countdownColor}/80`}>Promo Berakhir Dalam:</p>
                    <p className={`text-xl font-bold font-mono tracking-widest ${countdownColor}`}>{goldenHourCountdown}</p>
                </div>
            )}
            <p className={`text-sm ${itemColor} opacity-60`}>*Kecuali menu Non-Coffee & Teh Tarik 1L.</p>
            </div>
        </div>
        )}

        {showBundling && (
        <div>
            <div className={`flex items-center gap-4`}>
            <Gift className={`w-7 h-7 ${priceColor}`} />
            <h3 className={`text-2xl font-headline font-semibold ${priceColor}`}>Promo Bundling</h3>
            </div>
            <Separator className={`my-4 ${separatorColor}`} />
            <ul className="space-y-4">
            {bundles.map((bundle) => (
                <li key={bundle.name} className="flex justify-between items-baseline">
                <span className={itemColor}>{bundle.name}</span>
                <span className={`font-semibold ${priceColor}`}>{formatPrice(bundle.price)}</span>
                </li>
            ))}
            </ul>
            {bundlingCountdown && (
            <div className="mt-4 text-center">
                <p className={`text-sm ${countdownColor}/80`}>Promo Berakhir Dalam:</p>
                <p className={`text-xl font-bold font-mono tracking-widest ${countdownColor}`}>{bundlingCountdown}</p>
            </div>
            )}
        </div>
        )}
    </div>
  )
}


export default function MenuSection() {
  const [isGoldenHour, setIsGoldenHour] = useState(false);

  useEffect(() => {
    const timerLoop = () => {
      const now = new Date();
      const jakartaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
      const currentHour = jakartaTime.getHours();
      const goldenHourActive = currentHour >= 8 && currentHour < 13;
      setIsGoldenHour(goldenHourActive);
    };
    
    timerLoop();
    const interval = setInterval(timerLoop, 1000);
    return () => clearInterval(interval);
  }, []);

  const isOrderPage = typeof window !== 'undefined' && window.location.pathname.includes('/order');
  if (isOrderPage) return null;
  
  const bgColor = 'bg-[#06261C]';
  const textColor = 'text-primary-foreground';
  const headingColor = 'text-amber-300';
  const separatorColor = 'bg-primary-foreground/20';
  const priceColor = 'font-semibold';
  const itemColor = 'text-primary-foreground/90';

  return (
    <section className={`py-20 md:py-32 ${bgColor} ${textColor}`}>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center">Explore Our Menu</h2>

        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          <Promos />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-12">
            {Object.entries(menu).map(([category, items]) => (
              <div key={category}>
                <h3 className={`text-2xl font-headline font-semibold ${headingColor}`}>{category}</h3>
                <Separator className={`my-4 ${separatorColor}`} />
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.name} className="flex justify-between items-baseline">
                      <span className={itemColor}>{item.name}</span>
                      {isGoldenHour && category === 'Coffee Series' ? (
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground line-through text-sm">
                            {formatPrice(item.price)}
                          </span>
                          <span className="font-semibold text-amber-300">
                            {formatPrice(calculateDiscountedPrice(item.price))}
                          </span>
                        </div>
                      ) : (
                        <span className={priceColor}>{formatPrice(item.price)}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}