import { StaySubNav } from '@/components/layout/StaySubNav';

/** A szállásoldalak közös al-navigációt kapnak. */
export default function StayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StaySubNav />
      {children}
    </>
  );
}
