import type { Metadata, Viewport } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { I18nProvider } from '@/i18n/I18nProvider';
import { siteConfig } from '@/data/site.config';
import { skiResortSchema, websiteSchema } from '@/lib/structuredData';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s — ${siteConfig.defaultTitle.split(' — ')[0]}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.defaultTitle,
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    siteName: siteConfig.defaultTitle,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.defaultTitle }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
    // Háromnyelvű működés: amint a nyelvenkénti útvonalak élesednek
    // (pl. /de, /en), itt kell a valós URL-eket megadni.
    languages: { hu: '/', de: '/', en: '/' },
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.defaultLocale}>
      <head>
        <JsonLd data={[websiteSchema(), skiResortSchema()]} />
      </head>
      <body>
        <I18nProvider>
          <SiteShell>{children}</SiteShell>
        </I18nProvider>
      </body>
    </html>
  );
}
