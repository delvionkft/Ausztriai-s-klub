/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // MIGRÁCIÓ (Emergent): ha nem Next.js alatt fut, a next/image helyett
    // a src/components/ui/Media.tsx belsejében sima <img> tagre kell váltani.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
};

export default nextConfig;
