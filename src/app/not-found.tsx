import Link from 'next/link';
import type { Metadata } from 'next';
import { Compass, Home } from 'lucide-react';
import { mainNavigation, routes } from '@/data/navigation';
import { AlpineScene } from '@/components/ui/AlpineScene';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Az oldal nem található',
  description: 'A keresett oldal nem érhető el. Válassz a fő menüpontok közül, vagy térj vissza a kezdőlapra.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <AlpineScene variant="dusk" />
        <div className="absolute inset-0 bg-deep-950/70" />
      </div>

      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center py-20 text-center sm:py-28">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-inset ring-white/20">
            <Compass aria-hidden="true" className="h-6 w-6" />
          </span>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-glacier-200">Hiba 404</p>
          <h1 className="mt-3 text-display text-white">Ez az útvonal nem létezik</h1>
          <p className="mt-4 max-w-prose text-[1.02rem] leading-relaxed text-ice-100/85">
            Lehet, hogy elírás történt, vagy az oldal átkerült máshova. Az alábbi menüpontokból biztosan
            megtalálod, amit keresel.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton
              href={routes.home}
              size="lg" variant="onDark"
              icon={<Home aria-hidden="true" className="h-[18px] w-[18px]" />}
            >
              Vissza a kezdőlapra
            </PrimaryButton>
            <SecondaryButton href={routes.snowReport} size="lg" tone="dark">
              Hójelentés
            </SecondaryButton>
          </div>

          <nav aria-label="Fő menüpontok" className="mt-10 w-full">
            <ul className="flex flex-wrap justify-center gap-2">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center rounded-pill border border-white/25 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
