/**
 * Catch-all inside the locale segment: unknown paths render the locale's
 * not-found.tsx (with header/footer) instead of the bare framework 404.
 */
import {notFound} from 'next/navigation';

export default function CatchAllPage() {
  notFound();
}
