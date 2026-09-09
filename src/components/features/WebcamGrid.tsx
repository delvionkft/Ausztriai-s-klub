'use client';

import { Camera } from 'lucide-react';
import { getWebcams } from '@/services/statusService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/States';
import { WebcamCard } from './WebcamCard';
import type { Webcam } from '@/types';

export function WebcamGrid({ limit }: { limit?: number }) {
  const { data, state, error, reload } = useAsyncData<Webcam[]>(getWebcams, []);
  const visible = limit ? (data ?? []).slice(0, limit) : (data ?? []);

  if (state === 'loading') {
    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
        {Array.from({ length: limit ?? 4 }).map((_, index) => (
          <li key={index}>
            <Skeleton className="h-[248px] w-full rounded-card" />
          </li>
        ))}
      </ul>
    );
  }

  if (state === 'error') return <ErrorState description={error ?? undefined} onRetry={reload} />;

  if (visible.length === 0) {
    return (
      <EmptyState
        icon={<Camera aria-hidden="true" className="h-5 w-5" />}
        title="Még nincs bekötött webkamera"
        description="A kamerák a képforrás megadása után automatikusan megjelennek."
      />
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {visible.map((webcam) => (
        <WebcamCard key={webcam.id} webcam={webcam} />
      ))}
    </ul>
  );
}
