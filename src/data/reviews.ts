import type { Review } from '@/types';

/**
 * VÉLEMÉNYEK — KORÁBBI CSOPORTOKTÓL (drótváz 08/05)
 * A vélemények valós vendégektől származnak majd. Kitalált szöveget nem
 * használunk: a `quote` mező addig a beillesztés helyét jelöli.
 */
export const reviews: Review[] = [
  { id: 'review-1', author: null, groupType: 'Baráti síút', quote: '', date: null, rating: null },
  { id: 'review-2', author: null, groupType: 'Több család', quote: '', date: null, rating: null },
  { id: 'review-3', author: null, groupType: 'Sportklub', quote: '', date: null, rating: null },
];

export const reviewsPlaceholderNote =
  'A vendégvélemények a tulajdonos által jóváhagyott, valós visszajelzésekkel töltődnek fel. Kitalált értékelést nem jelenítünk meg.';
