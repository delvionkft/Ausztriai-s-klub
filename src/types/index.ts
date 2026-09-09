/**
 * Központi adatmodell.
 * Ezek a típusok írják le a teljes weboldal adatszerződését.
 * A backend (Emergent) integrációkor ugyanezeket a shape-eket kell visszaadni.
 */

/** Olyan érték, ami még tulajdonosi adatra vár. `null` = helyőrző jelenik meg. */
export type Pending<T> = T | null;

export type Locale = 'hu' | 'de' | 'en';

export type OperationalStatus = 'open' | 'closed' | 'maintenance' | 'preparing';

export type Season = 'winter' | 'summer';

/* ---------------------------------- Síközpont ---------------------------------- */

export interface ResortInfo {
  /** Márkanév — tulajdonosi adat. */
  name: Pending<string>;
  shortName: Pending<string>;
  tagline: string;
  region: Pending<string>;
  country: Pending<string>;
  altitudeValleyM: Pending<number>;
  altitudePeakM: Pending<number>;
  totalSlopeLengthKm: Pending<number>;
  verticalDropM: Pending<number>;
  liftCount: Pending<number>;
  snowmakingCoveragePercent: Pending<number>;
}

/* ------------------------------- Élő státusz ------------------------------- */

export interface LiveStatus {
  resortStatus: OperationalStatus;
  snowDepthMountainCm: Pending<number>;
  snowDepthValleyCm: Pending<number>;
  temperatureC: Pending<number>;
  liftsOpen: Pending<number>;
  liftsTotal: Pending<number>;
  slopesOpen: Pending<number>;
  slopesTotal: Pending<number>;
  /** ISO 8601 időbélyeg. */
  updatedAt: string;
  season: Season;
}

export interface SnowReport {
  freshSnow24hCm: Pending<number>;
  freshSnow48hCm: Pending<number>;
  freshSnow72hCm: Pending<number>;
  windSpeedKmh: Pending<number>;
  windDirection: Pending<string>;
  snowQuality: Pending<string>;
  avalancheLevel: Pending<number>;
}

export interface ForecastDay {
  /** ISO dátum (YYYY-MM-DD). */
  date: string;
  label: string;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'snow' | 'wind';
  summary: string;
  tempMinC: Pending<number>;
  tempMaxC: Pending<number>;
  freshSnowCm: Pending<number>;
}

/* --------------------------------- Felvonók --------------------------------- */

export type LiftType = 'gondola' | 'chairlift' | 'draglift' | 'carpet' | 'funicular';

export interface Lift {
  id: string;
  name: string;
  type: LiftType;
  status: OperationalStatus;
  /** Üzemidő szövegesen, pl. "09:00 – 16:00". `null` = helyőrző. */
  operatingHours: Pending<string>;
  capacityPerHour: Pending<number>;
  lengthM: Pending<number>;
  verticalM: Pending<number>;
  nightSkiing: boolean;
  note: Pending<string>;
}

/* ---------------------------------- Pályák ---------------------------------- */

export type SlopeDifficulty = 'easy' | 'intermediate' | 'advanced' | 'freeride' | 'toboggan';

export interface Slope {
  id: string;
  name: string;
  difficulty: SlopeDifficulty;
  status: OperationalStatus;
  lengthM: Pending<number>;
  verticalM: Pending<number>;
  snowmaking: boolean;
  nightSkiing: boolean;
  servedByLiftIds: string[];
  note: Pending<string>;
}

/* -------------------------------- Webkamerák -------------------------------- */

export interface Webcam {
  id: string;
  name: string;
  location: Pending<string>;
  altitudeM: Pending<number>;
  /** Kép URL. `null` esetén helyőrző jelenik meg. */
  imageUrl: Pending<string>;
  streamUrl: Pending<string>;
  updatedAt: Pending<string>;
}

/* ---------------------------- Jegyek és bérletek ---------------------------- */

export type AgeGroup = 'child' | 'youth' | 'adult' | 'senior';
export type TicketDuration = 'halfday' | 'day' | 'multiday' | 'season';

export interface TicketProduct {
  id: string;
  name: string;
  duration: TicketDuration;
  description: string;
  /** Demó ár — a végleges árlistát a tulajdonos adja meg. */
  priceByAgeGroup: Record<AgeGroup, Pending<number>>;
  highlights: string[];
  recommendedFor: string;
}

export interface SeasonalPriceBand {
  id: string;
  label: string;
  /** Szorzó a bázisárhoz képest. */
  multiplier: number;
  colorToken: 'low' | 'mid' | 'high';
  /** ISO dátumtartományok (YYYY-MM-DD). */
  ranges: Array<{ from: string; to: string }>;
}

export interface Discount {
  id: string;
  title: string;
  description: string;
  requirement: Pending<string>;
  /** Kedvezmény mértéke százalékban. `null` = tulajdonosi adat. */
  percent: Pending<number>;
}

/* ------------------------------- Nyitvatartás ------------------------------- */

export interface OpeningPeriod {
  id: string;
  label: string;
  /** ISO dátum vagy `null`, ha még nincs kihirdetve. */
  from: Pending<string>;
  to: Pending<string>;
  note: Pending<string>;
}

export interface DailyOpeningHours {
  id: string;
  label: string;
  hours: Pending<string>;
  days: string;
  note: Pending<string>;
}

/* -------------------------------- Események -------------------------------- */

export interface ResortEvent {
  id: string;
  title: string;
  /** ISO dátum. `null` = időpont még nincs kitűzve. */
  date: Pending<string>;
  endDate: Pending<string>;
  category: 'event' | 'news' | 'race' | 'family' | 'gastro';
  season: Season | 'all';
  excerpt: string;
  location: Pending<string>;
  imageKey: Pending<string>;
}

/* ---------------------------- Élmény / programok ---------------------------- */

export interface ExperienceItem {
  id: string;
  title: string;
  season: Season | 'all';
  description: string;
  icon: string;
  detail: Pending<string>;
  imageKey: Pending<string>;
}

/* ---------------------------------- Szállás ---------------------------------- */

export interface AccommodationFact {
  id: string;
  label: string;
  value: Pending<string>;
  icon: string;
}

export interface RoomLayoutFloor {
  id: string;
  floor: string;
  rooms: Array<{
    id: string;
    name: Pending<string>;
    beds: Pending<number>;
    note: Pending<string>;
  }>;
}

export interface AccommodationBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GroupType {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: string[];
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

/* --------------------------------- Galéria --------------------------------- */

export type GalleryCategory = 'common' | 'bedroom' | 'bathroom-kitchen' | 'skiroom' | 'exterior';

export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  caption: string;
  /** `null` esetén dizájnolt helyőrző jelenik meg. */
  src: Pending<string>;
  alt: string;
}

/* -------------------------------- Foglaltság -------------------------------- */

export type AvailabilityState = 'free' | 'booked' | 'option' | 'min-stay-blocked';

export interface AvailabilityDay {
  /** ISO dátum (YYYY-MM-DD). */
  date: string;
  state: AvailabilityState;
}

export interface PricingRules {
  /** Demó bázisár / éjszaka (teljes ház). */
  baseNightlyPrice: Pending<number>;
  cleaningFee: Pending<number>;
  touristTaxPerPersonPerNight: Pending<number>;
  extraMandatoryFees: Array<{ id: string; label: string; amount: Pending<number>; note: Pending<string> }>;
  deposit: Pending<number>;
  currency: string;
  minStayNights: number;
  maxGuests: Pending<number>;
  seasonalMultipliers: Array<{ id: string; label: string; multiplier: number; ranges: Array<{ from: string; to: string }> }>;
}

export interface BookingTerms {
  id: string;
  label: string;
  value: Pending<string>;
  icon: string;
}

/* --------------------------------- Vélemények --------------------------------- */

export interface Review {
  id: string;
  author: Pending<string>;
  groupType: string;
  quote: string;
  date: Pending<string>;
  rating: Pending<number>;
}

/* ------------------------------------ GYIK ------------------------------------ */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  topic: 'general' | 'accommodation' | 'tickets' | 'access' | 'skiing';
}

/* ---------------------------------- Kapcsolat ---------------------------------- */

export interface ContactInfo {
  phone: Pending<string>;
  whatsapp: Pending<string>;
  email: Pending<string>;
  addressLine: Pending<string>;
  postalCode: Pending<string>;
  city: Pending<string>;
  country: Pending<string>;
  gpsLat: Pending<number>;
  gpsLng: Pending<number>;
  officeHours: Pending<string>;
  mapEmbedUrl: Pending<string>;
  social: Array<{ id: string; label: string; url: Pending<string>; icon: string }>;
}

export interface TravelOption {
  id: string;
  mode: 'car' | 'skibus' | 'train' | 'plane';
  title: string;
  description: string;
  distance: Pending<string>;
  duration: Pending<string>;
}

/* ---------------------------------- Oktatás ---------------------------------- */

export interface Instructor {
  id: string;
  name: Pending<string>;
  languages: string[];
  levels: string[];
  specialty: Pending<string>;
}

export interface RentalCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: Array<{ id: string; label: string; detail: Pending<string>; price: Pending<number> }>;
}

/* ---------------------------------- Űrlapok ---------------------------------- */

export interface QuoteRequestPayload {
  arrival: string;
  departure: string;
  guests: number;
  groupType: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string;
}

export interface NewsletterPayload {
  email: string;
}

export interface ServiceResult<T = undefined> {
  ok: boolean;
  message: string;
  data?: T;
}
