import type { Metadata, Viewport } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { AnalyticsScripts } from '@/components/layout/AnalyticsScripts';
import { siteConfig, resortInfo } from '@/data/site.config';
import { contactInfo, fullAddress, socialLinks } from '@/data/contact';
import { jsonLd } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.defaultTitle, template: `%s — ${resortInfo.name}` },
  description: siteConfig.defaultDescription,
  applicationName: resortInfo.name,
  authors: [{ name: resortInfo.legalName }],
  keywords: ['síközpont', 'sípálya', 'hójelentés', 'síbérlet', 'síiskola', 'vendégház', 'csoportos szállás', 'Ausztria'],
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    alternateLocale: ['de_AT', 'en_GB'],
    siteName: resortInfo.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: resortInfo.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/** LocalBusiness / TouristAttraction strukturált adat — minden oldalon. */
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': ['SkiResort', 'TouristAttraction', 'LocalBusiness'],
  name: resortInfo.name,
  legalName: resortInfo.legalName,
  description: siteConfig.defaultDescription,
  url: siteConfig.url,
  telephone: contactInfo.phone,
  email: contactInfo.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contactInfo.addressLine1,
    postalCode: contactInfo.postalCode,
    addressLocality: contactInfo.city,
    addressRegion: contactInfo.region,
    addressCountry: contactInfo.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: contactInfo.coordinates.lat,
    longitude: contactInfo.coordinates.lng,
  },
  sameAs: socialLinks.map((s) => s.href),
  openingHours: 'Mo-Su 08:30-16:30',
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  areaServed: fullAddress,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        {/* A betűkészletek `display=swap`-pel töltődnek, így a szöveg azonnal
            olvasható. Szándékosan nem `next/font`, hogy a projekt build közben
            ne igényeljen hálózati elérést, és más környezetbe is átvihető legyen. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationLd)} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
