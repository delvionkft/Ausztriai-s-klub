import type { Metadata } from 'next';
import { siteConfig } from '@/data/site.config';

/**
 * Egységes oldal-metaadat generátor.
 * Minden oldal saját title / description / canonical / OG adatot kap.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${input.path}`;
  const image = input.ogImage ?? siteConfig.ogImage;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: {
        hu: url,
        de: url,
        en: url,
      },
    },
    openGraph: {
      type: 'website',
      url,
      title: `${input.title} — ${siteConfig.name}`,
      description: input.description,
      siteName: siteConfig.name,
      locale: 'hu_HU',
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${input.title} — ${siteConfig.name}`,
      description: input.description,
      images: [image],
    },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/** JSON-LD beillesztő — a `<script type="application/ld+json">` tartalma. */
export function jsonLd(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  return { __html: JSON.stringify(data) };
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
