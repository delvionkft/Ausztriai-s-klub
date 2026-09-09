import type { Dictionary } from '@/i18n';

/**
 * ÚTVONALAK ÉS NAVIGÁCIÓ
 * ----------------------------------------------------------------------------
 * Egyetlen link sincs beégetve komponensbe — mind innen jön.
 */
export const routes = {
  home: '/',
  snowReport: '/hojelentes',
  slopeMap: '/palyaterkep',
  lifts: '/felvonok',
  webcams: '/felvonok#webkamerak',
  tickets: '/jegyek',
  skiSchool: '/siiskola',
  rental: '/siiskola#kolcsonzo',
  service: '/siiskola#szerviz',
  stay: '/szallas',
  groups: '/csoportoknak',
  availability: '/szallas/arak-es-idopontok',
  inquiry: '/szallas/ajanlatkeres',
  experiences: '/elmenyek',
  events: '/elmenyek#esemenyek',
  contact: '/kapcsolat',
  directions: '/kapcsolat#megkozelites',
  faq: '/kapcsolat#gyik',
  about: '/kapcsolat#rolunk',
  houseRules: '/hazirend',
  privacy: '/adatkezeles',
  cookies: '/sutik',
  terms: '/aszf',
  imprint: '/impresszum',
  account: '/kapcsolat#berletkezeles',
} as const;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup extends NavItem {
  children?: NavItem[];
}

/** Fő menü — pontosan a specifikáció szerinti hat pont. */
export function buildMainNav(t: Dictionary): NavGroup[] {
  return [
    {
      label: t.nav.mountain,
      href: routes.snowReport,
      children: [
        { label: t.nav.snowReport, href: routes.snowReport, description: t.snow.lead },
        { label: t.nav.slopeMap, href: routes.slopeMap, description: t.map.lead },
        { label: t.nav.lifts, href: routes.lifts, description: t.lifts.lead },
        { label: t.nav.webcams, href: routes.webcams, description: t.lifts.webcamLead },
      ],
    },
    { label: t.nav.tickets, href: routes.tickets },
    {
      label: t.nav.school,
      href: routes.skiSchool,
      children: [
        { label: t.school.title, href: routes.skiSchool, description: t.school.lead },
        { label: t.nav.rental, href: routes.rental, description: t.school.rentalLead },
      ],
    },
    {
      label: t.nav.stay,
      href: routes.stay,
      children: [
        { label: t.nav.guesthouse, href: routes.stay, description: t.stay.lead },
        { label: t.nav.groups, href: routes.groups, description: t.groups.lead },
        { label: t.nav.availability, href: routes.availability, description: t.availability.lead },
        { label: t.nav.inquiry, href: routes.inquiry, description: t.inquiry.responseTime },
      ],
    },
    { label: t.nav.experiences, href: routes.experiences },
    {
      label: t.nav.info,
      href: routes.contact,
      children: [
        { label: t.nav.directions, href: routes.directions },
        { label: t.nav.faq, href: routes.faq },
        { label: t.nav.contact, href: routes.contact },
        { label: t.nav.legal, href: routes.imprint },
      ],
    },
  ];
}

/** Szállás al-navigáció. */
export function buildStaySubNav(t: Dictionary): NavItem[] {
  return [
    { label: t.nav.guesthouse, href: routes.stay },
    { label: t.nav.availability, href: routes.availability },
    { label: t.nav.inquiry, href: routes.inquiry },
  ];
}

/** Lábléc oszlopok. */
export function buildFooterNav(t: Dictionary): Array<{ title: string; items: NavItem[] }> {
  return [
    {
      title: t.footer.about,
      items: [
        { label: t.nav.about, href: routes.about },
        { label: t.nav.snowReport, href: routes.snowReport },
        { label: t.nav.slopeMap, href: routes.slopeMap },
        { label: t.nav.lifts, href: routes.lifts },
        { label: t.nav.webcams, href: routes.webcams },
      ],
    },
    {
      title: t.footer.services,
      items: [
        { label: t.nav.tickets, href: routes.tickets },
        { label: t.school.title, href: routes.skiSchool },
        { label: t.nav.rental, href: routes.rental },
        { label: t.nav.service, href: routes.service },
        { label: t.nav.experiences, href: routes.experiences },
      ],
    },
    {
      title: t.footer.stay,
      items: [
        { label: t.nav.guesthouse, href: routes.stay },
        { label: t.nav.groups, href: routes.groups },
        { label: t.nav.availability, href: routes.availability },
        { label: t.nav.prices, href: routes.availability },
        { label: t.nav.inquiry, href: routes.inquiry },
      ],
    },
    {
      title: t.footer.info,
      items: [
        { label: t.nav.directions, href: routes.directions },
        { label: t.nav.contact, href: routes.contact },
        { label: t.nav.faq, href: routes.faq },
        { label: t.nav.houseRules, href: routes.houseRules },
        { label: t.nav.legal, href: routes.imprint },
      ],
    },
  ];
}

/** Jogi és egyéb linkek a lábléc alsó sorában. */
export function buildLegalNav(t: Dictionary): NavItem[] {
  return [
    { label: t.nav.houseRules, href: routes.houseRules },
    { label: 'Adatkezelési tájékoztató', href: routes.privacy },
    { label: 'Sütikezelés', href: routes.cookies },
    { label: 'ÁSZF', href: routes.terms },
    { label: 'Impresszum', href: routes.imprint },
    { label: 'Bérletkezelés', href: routes.account },
  ];
}
