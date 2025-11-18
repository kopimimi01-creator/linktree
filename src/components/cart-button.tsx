
'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartButton() {
  const { totalItems } = useCart();

  return (
    <Button asChild variant="outline">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="ml-2 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
            {totalItems}
          </span>
        )}
        <span className="sr-only">Buka Keranjang</span>
      </Link>
    </Button>
  );
}
