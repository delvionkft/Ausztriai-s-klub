import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { siteConfig } from '@/data/site.config';
import { fees, guesthouse } from '@/data/accommodation';
import { contactInfo } from '@/data/contact';
import { StayView } from './StayView';

export const metadata = pageMetadata({
  title: 'Berghaus Almrausch — teljes ház 22 főig a pálya lábánál',
  description:
    'Vendégház kizárólagos használattal, 22 fő, hat hálószoba, fűtött sítároló és szauna, 250 méterre a völgyállomástól. Alaprajz, galéria és szabad időpontok.',
  path: routes.stay,
});

const lodgingLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: guesthouse.name,
  description: guesthouse.lead.hu,
  url: `${siteConfig.url}${routes.stay}`,
  telephone: contactInfo.phoneSecondary,
  email: contactInfo.bookingEmail,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Almweg 11',
    postalCode: contactInfo.postalCode,
    addressLocality: contactInfo.city,
    addressCountry: contactInfo.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: guesthouse.coordinates.lat,
    longitude: guesthouse.coordinates.lng,
  },
  numberOfRooms: guesthouse.bedrooms,
  petsAllowed: true,
  checkinTime: guesthouse.checkIn,
  checkoutTime: guesthouse.checkOut,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Fűtött sítároló', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Szauna', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Ingyenes parkolás', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Teljes felszereltségű konyha', value: true },
  ],
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Bankkártya, banki átutalás',
  additionalProperty: {
    '@type': 'PropertyValue',
    name: 'Kaució',
    value: `${fees.depositEur} EUR`,
  },
};

export default function StayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          lodgingLd,
          breadcrumbLd([{ name: 'A vendégház', path: routes.stay }]),
        ])}
      />
      <StayView />
    </>
  );
}
