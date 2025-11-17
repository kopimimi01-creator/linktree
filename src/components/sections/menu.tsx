import { Separator } from "@/components/ui/separator";
import { Clock, Sparkles } from "lucide-react";

const menu = {
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

const formatPrice = (price: number) => {
  return `Rp ${price.toLocaleString('id-ID')}`;
};

const calculateDiscountedPrice = (price: number) => {
  return price * 0.9;
};

export default function MenuSection() {
  return (
    <section className="py-20 md:py-32 bg-[#06261C] text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center">Explore Our Menu</h2>

        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          <div>
            <div className="flex items-center gap-4">
              <Sparkles className="w-7 h-7 text-amber-300" />
              <h3 className="text-2xl font-headline font-semibold text-amber-300">Golden Hours</h3>
            </div>
            <Separator className="my-4 bg-primary-foreground/20" />
            <div className="space-y-4 text-primary-foreground/90">
              <div className="flex flex-col sm:flex-row justify-between">
                <span>Diskon 10% untuk semua varian kopi</span>
                <span className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Clock className="w-5 h-5"/> 08.00 - 13.00
                </span>
              </div>
              <p className="text-sm text-primary-foreground/60">*Kecuali menu Non-Coffee & Teh Tarik 1L.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {Object.entries(menu).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-2xl font-headline font-semibold text-amber-300">{category}</h3>
                <Separator className="my-4 bg-primary-foreground/20" />
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.name} className="flex justify-between items-baseline">
                      <span>{item.name}</span>
                      {category === 'Coffee Series' ? (
                        <div className="flex items-center gap-3">
                          <span className="text-primary-foreground/50 line-through text-sm">
                            {formatPrice(item.price)}
                          </span>
                          <span className="font-semibold text-amber-300">
                            {formatPrice(calculateDiscountedPrice(item.price))}
                          </span>
                        </div>
                      ) : (
                        <span>{formatPrice(item.price)}</span>
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
