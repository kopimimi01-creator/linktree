'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const getGreeting = () => {
  // We get the time in Asia/Jakarta timezone
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };
  const formatter = new Intl.DateTimeFormat([], options);
  const hour = parseInt(formatter.format(new Date()));

  if (hour >= 4 && hour < 11) {
    return 'Selamat Pagi';
  } else if (hour >= 11 && hour < 15) {
    return 'Selamat Siang';
  } else if (hour >= 15 && hour < 19) {
    return 'Selamat Sore';
  } else {
    return 'Selamat Malam';
  }
};

export default function OpeningHoursSection() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-background text-foreground px-4 py-2 rounded-full text-sm font-medium mb-4 shadow">
            <Clock className="w-4 h-4 text-primary" />
            <span>We are open</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">{greeting}!</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Kami menunggumu. Secangkir kebahagiaan hangat siap menemani harimu dari pagi hingga malam.
          </p>
          <p className="mt-2 font-semibold text-foreground/90">Setiap Hari: 08:00 - 22:00</p>
        </div>
      </div>
    </section>
  );
}
