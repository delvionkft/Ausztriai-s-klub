import { redirect } from 'next/navigation';
import { routes } from '@/data/navigation';

/** Régi útvonal — átirányítás az aktuális címre, hogy a meglévő linkek működjenek. */
export default function Page() {
  redirect(routes.availability);
}
