import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export default function Logo({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('font-bold font-headline tracking-wider', className)}>
      Kopimi Cafe
    </div>
  );
}
