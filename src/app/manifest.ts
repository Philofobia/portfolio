/**
 * Web app manifest. TODO(phase 4): real icons, localized name.
 */
import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Marco Fobia — Fullstack Engineer',
    short_name: 'Marco Fobia',
    start_url: '/',
    display: 'standalone',
    background_color: '#1b1b1c',
    theme_color: '#1b1b1c',
    icons: []
  };
}
