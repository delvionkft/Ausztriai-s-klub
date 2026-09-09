/**
 * KÖZPONTI TÍPUSOK
 * ----------------------------------------------------------------------------
 * Minden üzleti adat ezekre a típusokra épül. Az adatforrás cseréjekor
 * (mock -> éles API) csak a `src/services/*` rétegnek kell ugyanezt visszaadnia.
 */

export type Locale = 'hu' | 'de' | 'en';

/** Nyelvfüggő szöveg. A `hu` kötelező, ez a visszaesési nyelv. */
export interface Localized {
  hu: string;
  de?: string;
  en?: string;
}

/* -------------------------------------------------------------------------- */
/*  Síközpont és státusz                                                      */
/* -------------------------------------------------------------------------- */

export interface ResortInfo {
  name: string;
  shortName: string;
  legalName: string;
  tagline: Localized;
  region: string;
  country: string;
  altitudeValleyM: number;
  altitudePeakM: number;
  totalSlopeLengthKm: number;
  verticalDropM: number;
  liftCount: number;
  slopeCount: number;
  snowmakingCoveragePercent: number;
  seasonStart: string;
  seasonEnd: string;
}

export type OperationalStatus = 'open' | 'partial' | 'closed' | 'maintenance' | 'preparing';

export interface ResortStatus {
  status: OperationalStatus;
  message: Localized;
  snowDepthMountainCm: number;
  snowDepthValleyCm: number;
  freshSnow24hCm: number;
  freshSnow48hCm: number;
  freshSnow72hCm: number;
  temperatureMountainC: number;
  temperatureValleyC: number;
  windSpeedKmh: number;
  windDirection: string;
  snowCondition: Localized;
  liftsOpen: number;
  liftsTotal: number;
  slopesOpen: number;
  slopesTotal: number;
  slopeKmOpen: number;
  avalancheLevel: 1 | 2 | 3 | 4 | 5;
  nightSkiingToday: boolean;
  updatedAt: string;
}

export interface ForecastDay {
  date: string;
  label: Localized;
  icon: 'sun' | 'partly' | 'cloud' | 'snow' | 'heavy-snow' | 'wind';
  summary: Localized;
  tempMinC: number;
  tempMaxC: number;
  newSnowCm: number;
  windKmh: number;
  sunHours: number;
}

/* -------------------------------------------------------------------------- */
/*  Pályák és felvonók                                                        */
/* -------------------------------------------------------------------------- */

export type SlopeDifficulty = 'blue' | 'red' | 'black' | 'skiroute';
export type SlopeStatus = 'open' | 'closed' | 'groomed' | 'preparing';

export interface Slope {
  id: string;
  number: string;
  name: string;
  difficulty: SlopeDifficulty;
  lengthM: number;
  verticalM: number;
  status: SlopeStatus;
  snowmaking: boolean;
  floodlit: boolean;
  lastGroomed: string;
  description: Localized;
  /** SVG útvonal a pályatérképen (viewBox 0 0 1200 800). */
  path: string;
  /** Címke pozíciója a térképen. */
  labelAt: { x: number; y: number };
}

export type LiftType = 'gondola' | 'chairlift-6' | 'chairlift-4' | 'tbar' | 'carpet';
export type LiftStatus = 'running' | 'stopped' | 'maintenance' | 'closed';

export interface Lift {
  id: string;
  name: string;
  type: LiftType;
  status: LiftStatus;
  capacityPerHour: number;
  rideTimeMin: number;
  baseAltitudeM: number;
  topAltitudeM: number;
  operatingHours: string;
  nightOperation: string | null;
  note: Localized;
  imageKey: string;
  /** SVG vonal a pályatérképen. */
  path: string;
  labelAt: { x: number; y: number };
}

export interface MountainPoi {
  id: string;
  name: string;
  kind: 'restaurant' | 'hut' | 'ski-school' | 'rental' | 'parking' | 'closed-area';
  at: { x: number; y: number };
  description: Localized;
  openingHours?: string;
}

/* -------------------------------------------------------------------------- */
/*  Webkamerák                                                                */
/* -------------------------------------------------------------------------- */

export interface Webcam {
  id: string;
  name: string;
  location: string;
  altitudeM: number;
  imageKey: string;
  /** Éles streamhez: a szolgáltató URL-je. Amíg üres, az imageKey kép jelenik meg. */
  streamUrl: string | null;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*  Nyitvatartás                                                              */
/* -------------------------------------------------------------------------- */

export interface OpeningRule {
  id: string;
  label: Localized;
  detail: Localized;
  hours: string;
  icon: 'clock' | 'moon' | 'calendar' | 'alert' | 'snowflake';
  highlight?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Jegyek                                                                    */
/* -------------------------------------------------------------------------- */

export type AgeGroup = 'adult' | 'youth' | 'child' | 'student' | 'senior';
export type TicketDuration = 'half-day' | 'day' | 'multi-day' | 'season' | 'night' | 'points';

export interface TicketType {
  id: string;
  name: Localized;
  duration: TicketDuration;
  description: Localized;
  /** Ár korosztályonként, EUR-ban, főszezoni alapár. */
  prices: Partial<Record<AgeGroup, number>>;
  /** Többnapos jegynél a napok száma. */
  days?: number;
  popular?: boolean;
  benefits: Localized[];
}

export interface SeasonPricePeriod {
  id: string;
  label: Localized;
  from: string;
  to: string;
  tier: 'low' | 'mid' | 'high' | 'peak';
  adultDayPrice: number;
}

export interface Discount {
  id: string;
  title: Localized;
  description: Localized;
  icon: 'users' | 'graduation-cap' | 'heart' | 'building-2' | 'baby' | 'calendar-check';
  value: Localized;
}

/* -------------------------------------------------------------------------- */
/*  Síiskola és kölcsönző                                                     */
/* -------------------------------------------------------------------------- */

export interface SkiSchoolPackage {
  id: string;
  name: Localized;
  audience: Localized;
  durationLabel: Localized;
  includes: Localized[];
  priceEur: number;
  priceNote: Localized;
  featured?: boolean;
  imageKey: string;
}

export interface Instructor {
  id: string;
  /** Demonstrációs profil — a végleges oktatói adatokat a síiskola adja meg. */
  displayName: string;
  role: Localized;
  languages: string[];
  levels: Localized[];
  bio: Localized;
  imageKey: string;
  certification: Localized;
}

export interface RentalItem {
  id: string;
  category: Localized;
  level: Localized;
  includes: Localized[];
  pricePerDayEur: number;
  pricePerWeekEur: number;
  sizes: string;
  icon: 'skis' | 'snowboard' | 'boots' | 'helmet' | 'poles' | 'kids';
}

export interface ServiceItem {
  id: string;
  name: Localized;
  description: Localized;
  priceEur: number | null;
  priceLabel: Localized;
}

/* -------------------------------------------------------------------------- */
/*  Vendégház                                                                 */
/* -------------------------------------------------------------------------- */

export interface Guesthouse {
  name: string;
  lead: Localized;
  description: Localized[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  distanceToSlopeM: number;
  parkingSpaces: number;
  sizeSqm: number;
  checkIn: string;
  checkOut: string;
  minNights: number;
  addressLine: string;
  coordinates: { lat: number; lng: number };
}

export interface RoomBed {
  type: Localized;
  count: number;
}

export interface Room {
  id: string;
  name: Localized;
  floor: 'ground' | 'first' | 'attic';
  sizeSqm: number;
  sleeps: number;
  beds: RoomBed[];
  ensuite: boolean;
  features: Localized[];
  imageKey: string;
}

export interface FloorPlan {
  id: 'ground' | 'first' | 'attic';
  label: Localized;
  summary: Localized;
  rooms: Localized[];
  beds: number;
}

export type AvailabilityState = 'free' | 'booked' | 'option' | 'blocked-min-nights' | 'past';

export interface AvailabilityDay {
  date: string;
  state: Exclude<AvailabilityState, 'past'>;
  /** Éjszakánkénti ár EUR-ban a teljes házra. */
  priceEur: number;
  minNights: number;
  seasonLabel: Localized;
}

export interface AccommodationFees {
  cleaningFeeEur: number;
  touristTaxPerPersonPerNightEur: number;
  linenFeePerPersonEur: number;
  depositEur: number;
  petFeePerNightEur: number;
}

/* -------------------------------------------------------------------------- */
/*  Élmények, események, hírek                                                */
/* -------------------------------------------------------------------------- */

export type Season = 'winter' | 'summer' | 'all-year';

export interface Experience {
  id: string;
  title: Localized;
  description: Localized;
  season: Season;
  imageKey: string;
  href: string;
  duration?: Localized;
}

export interface EventItem {
  id: string;
  title: Localized;
  date: string;
  endDate?: string;
  category: Localized;
  location: string;
  excerpt: Localized;
  imageKey: string;
  href: string;
}

export interface NewsItem {
  id: string;
  title: Localized;
  date: string;
  category: Localized;
  excerpt: Localized;
  imageKey: string;
  href: string;
}

/* -------------------------------------------------------------------------- */
/*  GYIK, kapcsolat                                                           */
/* -------------------------------------------------------------------------- */

export type FaqCategory =
  | 'tickets' | 'slopes' | 'ski-school' | 'rental'
  | 'accommodation' | 'arrival' | 'payment' | 'booking';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: Localized;
  answer: Localized;
}

export interface TravelOption {
  id: string;
  mode: 'car' | 'bus' | 'train' | 'plane';
  title: Localized;
  detail: Localized;
  distance: string;
  duration: string;
  hub: string;
}

/* -------------------------------------------------------------------------- */
/*  Galéria                                                                   */
/* -------------------------------------------------------------------------- */

export type GalleryCategory =
  | 'common' | 'bedrooms' | 'bathrooms' | 'kitchen' | 'ski-storage' | 'exterior';

export interface GalleryImage {
  id: string;
  imageKey: string;
  category: GalleryCategory;
  caption: Localized;
}

/* -------------------------------------------------------------------------- */
/*  Űrlapok                                                                   */
/* -------------------------------------------------------------------------- */

export interface InquiryPayload {
  arrival: string;
  departure: string;
  guests: number;
  groupType: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

export interface SubmitResult {
  ok: boolean;
  reference?: string;
  error?: string;
}
