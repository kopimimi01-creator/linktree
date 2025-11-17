import { Separator } from "@/components/ui/separator";

const menu = {
  "Coffee Series": [
    { name: "Americano", price: "15.000" },
    { name: "Coffee Tubruk", price: "12.000" },
    { name: "Salted Caramel Latte", price: "23.000" },
    { name: "Caramel Latte", price: "23.000" },
    { name: "Vanilla Latte", price: "23.000" },
    { name: "Coffee Latte", price: "23.000" },
    { name: "Kopi Susu Gula Aren", price: "20.000" },
  ],
  "Non-Coffee Series": [
    { name: "Matcha Latte", price: "25.000" },
    { name: "Chocolate Latte", price: "20.000" },
    { name: "Taro Latte", price: "23.000" },
    { name: "Teh Tarik Medium", price: "15.000" },
    { name: "Teh Tarik Large", price: "20.000" },
    { name: "Teh Tarik 1L", price: "100.000" },
  ],
};

export default function MenuSection() {
  return (
    <section className="py-20 md:py-32 bg-[#06261C] text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center">Explore Our Menu</h2>
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {Object.entries(menu).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-2xl font-headline font-semibold text-primary-foreground/90">{category}</h3>
              <Separator className="my-4 bg-primary-foreground/20" />
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.price ? `Rp ${item.price}` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
