/**
 * Invitación Jacinta — todo lo editable está aquí.
 * WhatsApp: no mostrar el número en la UI; solo se usa en wa.me.
 */

export const HOST_NAME = "Jacinta";
export const HOST_FULL_NAME = "Jacinta Salfate";
export const AGE_TURNING = 6;

/** Cumpleaños real */
export const BIRTHDAY_DATE_LABEL = "lunes 20 de julio de 2026";
/** Día de la fiesta */
export const CELEBRATION_DATE_LABEL = "sábado 25 de julio de 2026";
export const EVENT_DATE = new Date("2026-07-25T16:00:00");
export const EVENT_TIME_LABEL = "16:00 hrs";

export const THEME = "Pandas";
export const ADDRESS = "Loma del Trueno 0129, Puente Alto";
export const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=Loma+del+Trueno+0129+Puente+Alto";

/** Qué habrá en la fiesta (pantalla Fiesta). */
export const PARTY_HIGHLIGHTS = [
  { title: "Juegos", body: "Diversión para todos los amiguitos." },
  { title: "Concursos", body: "Retos panda con mucho glitter y risas." },
  { title: "Premios", body: "Sorpresas para quienes se animen a participar." },
] as const;

/** WhatsApp confirmación (no mostrar el número en la UI). Chile: 56 + 9 + 8 dígitos. */
export const WHATSAPP_NUMBER = "56951769102";

export const TAGLINE = "Juguetona, risueña y muy top — ¡cumplo 6!";

export type PlaylistTrack = {
  id: string;
  label: string;
  subtitle: string;
  youtubeId: string;
  accent: string;
};

export const PLAYLIST: PlaylistTrack[] = [
  {
    id: "rhenne",
    label: "Rhenné",
    subtitle: "Lara Campos",
    youtubeId: "_zAAn9fMWd0",
    accent: "#ff4f8b",
  },
  {
    id: "maximo",
    label: "Vive al Máximo",
    subtitle: "Arta · Maximo House",
    youtubeId: "bBOprUXd2M0",
    accent: "#2db87a",
  },
  {
    id: "skz",
    label: "Stray Kids",
    subtitle: "Para bailar fuerte",
    youtubeId: "OvioeS1ZZ7o",
    accent: "#1a1a1a",
  },
  {
    id: "katseye",
    label: "Touch",
    subtitle: "KATSEYE",
    youtubeId: "l9CZykYZkOQ",
    accent: "#c45cff",
  },
];

export type LipColor = {
  id: string;
  name: string;
  hex: string;
};

export const LIP_COLORS: LipColor[] = [
  { id: "rosa", name: "Rosa glam", hex: "#ff4f8b" },
  { id: "coral", name: "Coral top", hex: "#ff6b4a" },
  { id: "fucsia", name: "Fucsia wow", hex: "#e91e8c" },
  { id: "cereza", name: "Cereza", hex: "#c4183b" },
];

export const FUN_FACTS = [
  {
    id: "maximo",
    title: "Maximo House",
    body: "Le encanta ver la Maximo House en YouTube (¡y cantar con Arta!).",
  },
  {
    id: "makeup",
    title: "Glam time",
    body: "Labiales, pintura de uñas y maquillaje: es muy top.",
  },
  {
    id: "kpop",
    title: "Stray Kids & KATSEYE",
    body: "K-pop mode on — energía, bailes y actitud.",
  },
  {
    id: "juguetes",
    title: "Juguetes",
    body: "Le encantan las cocinitas, las muñecas y todo lo que invite a imaginar y jugar.",
  },
  {
    id: "colomba",
    title: "Colomba",
    body: "Su perrita Colomba es parte del squad panda — ¡guau!",
  },
] as const;
