import { Separator } from "@/components/ui/separator";

const menu = {
  "Coffee Series": [
    { name: "Americano", price: "3.50" },
    { name: "Coffee Tubruk", price: "3.00" },
    { name: "Salted Caramel Latte", price: "5.00" },
    { name: "Caramel Latte", price: "4.50" },
    { name: "Vanilla Latte", price: "4.50" },
    { name: "Coffee Latte", price: "4.50" },
    { name: "Kopi Susu Gula Aren", price: "5.00" },
  ],
  "Non-Coffee Series": [
    { name: "Matcha Latte", price: "5.00" },
    { name: "Chai Latte", price: "5.00" },
    { name: "Hot Chocolate", price: "4.50" },
    { name: "Herbal Tea", price: "3.50" },
  ],
  "Signature Blends": [
    { name: "The Kopimi", price: "6.00" },
    { name: "Forest Whisper", price: "5.50" },
    { name: "Golden Hour", price: "5.50" },
    { name: "Velvet Cloud", price: "6.00" },
  ],
  "Seasonal Items": [
    { name: "Pumpkin Spice", price: "5.50" },
    { name: "Iced Lavender", price: "5.50" },
    { name: "Gingerbread Latte", price: "6.00" },
    { name: "Peppermint Mocha", price: "6.00" },
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
                    <span>${item.price}</span>
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
