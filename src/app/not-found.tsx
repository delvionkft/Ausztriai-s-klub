import Link from 'next/link';
import { Compass, Home, Map, Snowflake, Ticket } from 'lucide-react';
import { routes } from '@/data/navigation';
import { Media } from '@/components/ui/Media';
import { ButtonLink } from '@/components/ui/Button';

/** EGYEDI 404 OLDAL — továbbvezető linkekkel, nem zsákutcával. */
export const metadata = {
  title: 'Ez az oldal nincs a térképen',
  robots: { index: false, follow: true },
};

const SHORTCUTS = [
  { href: routes.snowReport, label: 'Hójelentés', icon: Snowflake },
  { href: routes.slopeMap, label: 'Pályatérkép', icon: Map },
  { href: routes.tickets, label: 'Jegyek', icon: Ticket },
  { href: routes.stay, label: 'Vendégház', icon: Compass },
];

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Media mediaKey="hero-snow" overlay="strong" sizes="100vw" className="h-full w-full" priority />
      </div>

      <div className="container-page py-24 text-center">
        <p className="font-display text-[5rem] font-extrabold leading-none text-glacier-300 lg:text-[7rem]">404</p>
        <h1 className="mt-4 text-display text-white">Ez az oldal nincs a térképen</h1>
        <p className="mx-auto mt-5 max-w-lg text-lead text-frost-200">
          Lehet, hogy elírtad a címet, vagy áthelyeztük a tartalmat. Innen viszont könnyen továbbjutsz.
        </p>

        <div className="mt-9 flex justify-center">
          <ButtonLink href={routes.home} size="lg">
            <Home aria-hidden="true" className="h-5 w-5" />
            Vissza a kezdőlapra
          </ButtonLink>
        </div>

        <ul className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {SHORTCUTS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-card border border-white/20 bg-white/10 px-3 py-4 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-glacier-400/60 hover:bg-white/20"
              >
                <item.icon aria-hidden="true" className="h-5 w-5 text-glacier-300" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
