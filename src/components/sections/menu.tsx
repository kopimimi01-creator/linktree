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
const Promos = () => {
  const [isGoldenHour, setIsGoldenHour] = useState(false);
  const [showBundling, setShowBundling] = useState(false);
  const [bundlingCountdown, setBundlingCountdown] = useState("");
  const [goldenHourCountdown, setGoldenHourCountdown] = useState("");

  useEffect(() => {
    const timerLoop = () => {
      // Common time setup
      const now = new Date();
      const jakartaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
      
      // Golden Hour logic
      const currentHour = jakartaTime.getHours();
      const goldenHourActive = currentHour >= 8 && currentHour < 13;
      setIsGoldenHour(goldenHourActive);

      let goldenHourTarget = new Date(jakartaTime);
      goldenHourTarget.setHours(13, 0, 0, 0); // End of promo today

      if (currentHour >= 13) { // If past promo time, target is tomorrow
        goldenHourTarget.setDate(goldenHourTarget.getDate() + 1);
        goldenHourTarget.setHours(8, 0, 0, 0);
      } else if (currentHour < 8) { // If before promo time, target is start of promo
        goldenHourTarget.setHours(8, 0, 0, 0);
      }

      const ghDifference = goldenHourTarget.getTime() - jakartaTime.getTime();
      if (goldenHourActive) {
          const hours = Math.floor((ghDifference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((ghDifference / 1000 / 60) % 60);
          const seconds = Math.floor((ghDifference / 1000) % 60);
          setGoldenHourCountdown(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setGoldenHourCountdown("");
      }

      // Bundling promo & countdown logic
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
        setBundlingCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };
    
    timerLoop();
    const interval = setInterval(timerLoop, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
        {isGoldenHour && (
        <div>
            <div className="flex items-center gap-4">
            <Sparkles className="w-7 h-7 text-amber-300" />
            <h3 className="text-2xl font-headline font-semibold text-amber-300">Golden Hours</h3>
            </div>
            <Separator className="my-4 bg-primary-foreground/20" />
            <div className="space-y-4 text-primary-foreground/90">
            <div className="flex flex-col sm:flex-row justify-between items-baseline">
                <span className="text-lg">Diskon 10% untuk semua varian kopi</span>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 bg-amber-300/10 text-amber-300 px-3 py-1 rounded-full text-sm">
                <Clock className="w-4 h-4"/> 
                <span className="font-semibold">Berakhir Pukul 13.00 WIB</span>
                </div>
            </div>
                {goldenHourCountdown && (
                <div className="mt-4 text-center">
                    <p className="text-sm text-amber-300/80">Promo Berakhir Dalam:</p>
                    <p className="text-xl font-bold font-mono tracking-widest text-amber-300">{goldenHourCountdown}</p>
                </div>
            )}
            <p className="text-sm text-primary-foreground/60">*Kecuali menu Non-Coffee & Teh Tarik 1L.</p>
            </div>
        </div>
        )}

        {showBundling && (
        <div>
            <div className="flex items-center gap-4">
            <Gift className="w-7 h-7 text-amber-300" />
            <h3 className="text-2xl font-headline font-semibold text-amber-300">Promo Bundling</h3>
            </div>
            <Separator className="my-4 bg-primary-foreground/20" />
            <ul className="space-y-4">
            {bundles.map((bundle) => (
                <li key={bundle.name} className="flex justify-between items-baseline">
                <span className="text-primary-foreground/90">{bundle.name}</span>
                <span className="font-semibold text-amber-300">{formatPrice(bundle.price)}</span>
                </li>
            ))}
            </ul>
            {bundlingCountdown && (
            <div className="mt-4 text-center">
                <p className="text-sm text-amber-300/80">Promo Berakhir Dalam:</p>
                <p className="text-xl font-bold font-mono tracking-widest text-amber-300">{bundlingCountdown}</p>
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
  const bgColor = isOrderPage ? 'bg-transparent' : 'bg-[#06261C]';
  const textColor = isOrderPage ? 'text-foreground' : 'text-primary-foreground';
  const headingColor = isOrderPage ? 'text-primary' : 'text-amber-300';
  const separatorColor = isOrderPage ? 'bg-border' : 'bg-primary-foreground/20';
  const priceColor = isOrderPage ? 'text-foreground font-semibold' : 'font-semibold';
  const itemColor = isOrderPage ? 'text-muted-foreground' : 'text-primary-foreground/90';

  return (
    <section className={`py-20 md:py-32 ${bgColor} ${textColor}`}>
      <div className="container mx-auto px-4 md:px-6">
        {!isOrderPage && <h2 className="text-4xl md:text-5xl font-headline font-bold text-center">Explore Our Menu</h2>}

        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          <Promos />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
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
                { isOrderPage &&
                  <div className="mt-4 grid grid-cols-1 gap-4">
                  {items.map((item) => (
                    <div key={item.name} className="border rounded-lg p-4 flex flex-col justify-between shadow-sm">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-muted-foreground">{formatPrice(item.price)}</p>
                      </div>
                      <Button onClick={() => {
                        // This will require lifting state up to OrderForm, or using a context.
                        // For now, this button on the menu section won't add to cart.
                        alert(`${item.name} ditambahkan (fungsi placeholder)`);
                      }} className="mt-4 w-full">Tambah</Button>
                    </div>
                  ))}
                </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
