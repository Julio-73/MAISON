import { media } from "../config/media";

export interface CollectionItem {
  id: string; num: string; title: string; subtitle: string;
  price: number; img: string; desc: string; tags?: string[];
}

export interface LookbookItem {
  id: string; code: string; name: string; category: string;
  price: number; img: string; fabric: string; origin: string;
}

export interface LookItem {
  img: string; title: string; code: string;
}

export interface TestimonialItem {
  quote: string; author: string; role: string;
}

export interface StatItem { n: string; l: string; }

export interface ShowroomItem {
  city: string; country: string; address: string;
  flag: string; hours: string;
}

export interface StepItem {
  num: string; title: string; subtitle: string;
  desc: string; img: string;
}

export interface ProcessStep {
  title: string; desc: string;
}

export const collections: CollectionItem[] = [
  { id: "c1", num: "01", title: "Lumière", subtitle: "Colección Otoño", price: 3400, img: media.collection1, desc: "Una oda a la luz dorada del otoño parisino. Sedas crudas, lanas vírgenes y bordados a mano que respiran calma y sofisticación.", tags: ["12 piezas", "Edición limitada"] },
  { id: "c2", num: "02", title: "Écho", subtitle: "Atelier Privé", price: 4200, img: media.collection2, desc: "Texturas esculpidas, pliegues arquitectónicos. Una colección que explora el silencio entre las formas y la piel.", tags: ["8 piezas únicas", "Hecho a medida"] },
  { id: "c3", num: "03", title: "Nuit", subtitle: "Gala · Couture", price: 5800, img: media.collection3, desc: "La noche como escenario. Negros profundos, lentejuelas tejidas a mano y volúmenes que desafían la gravedad.", tags: ["6 piezas", "Pasarela exclusiva"] },
];

export const lookbookProducts: LookbookItem[] = [
  { id: "n01", code: "M·N·01", name: "Vestido Lumière", category: "Haute Couture", price: 18500, img: media.pexelsEditorial1, fabric: "Seda cruda · Encaje Calais", origin: "Hecho en París" },
  { id: "n02", code: "M·N·02", name: "Abrigo Écho", category: "Atelier Privé", price: 12200, img: media.pexelsEditorial3, fabric: "Lana virgen · Cachemira", origin: "Hecho en París" },
  { id: "n03", code: "M·N·03", name: "Conjunto Nuit", category: "Gala", price: 24800, img: media.pexelsEditorial8, fabric: "Terciopelo · Cristales Swarovski", origin: "Hecho en París" },
  { id: "n04", code: "M·N·04", name: "Traje Construit", category: "Sastrería", price: 9800, img: media.pexelsEditorial7, fabric: "Lana fría · Forro seda", origin: "Hecho en París" },
];

export const looks: LookItem[] = [
  { img: media.look1, title: "Noir Silhouette", code: "L·01" },
  { img: media.look2, title: "Rouge Mémoire", code: "L·02" },
  { img: media.look3, title: "Beige Construit", code: "L·03" },
  { img: media.look4, title: "Cuir Sculpté", code: "L·04" },
];

export const testimonialData: TestimonialItem[] = [
  { quote: "Maison no solo diseña vestidos, esculpe identidades. Una experiencia de alta costura inigualable en la era del fast fashion.", author: "Vogue España", role: "Editorial de Moda" },
  { quote: "El abrigo Écho que encargué es una obra de arte. El nivel de detalle en el forro de seda y los acabados a mano justifica cada segundo de espera.", author: "Elena R.", role: "Clienta Privada · Milán" },
  { quote: "Una visión singular que fusiona la tradición artesanal francesa con líneas arquitectónicas modernas. Absolutamente sublime.", author: "Le Figaro", role: "Crítica de Alta Costura" },
];

export const showroomData: ShowroomItem[] = [
  { city: "Paris", country: "France", address: "12 Rue de Sévigné, 75004", flag: "🇫🇷", hours: "Mar–Sam · 11h–19h" },
  { city: "Milano", country: "Italia", address: "Via della Spiga 27, 20121", flag: "🇮🇹", hours: "Mar–Sab · 10h–19h" },
  { city: "Tokyo", country: "日本", address: "Aoyama 5-6-23, Minato", flag: "🇯🇵", hours: "火–土 · 11時–20時" },
  { city: "New York", country: "USA", address: "688 Madison Avenue, 10065", flag: "🇺🇸", hours: "Mon–Sat · 10am–7pm" },
];

export const processSteps: StepItem[] = [
  { num: "01", title: "Croquis", subtitle: "Semana 1", desc: "El director artístico interpreta su visión. 8 a 12 croquis preliminares sobre papel algodón.", img: media.pexelsEditorial5 },
  { num: "02", title: "Patronaje", subtitle: "Semana 2-3", desc: "El patrón se construye directamente sobre su cuerpo. Tres pruebas mínimas para ajustar la silueta.", img: media.pexelsEditorial6 },
  { num: "03", title: "Tela", subtitle: "Semana 4", desc: "Selección de textiles en los archivos históricos: sedas de Lyon, encajes de Calais, tweeds de Escocia.", img: media.pexelsEditorial4 },
  { num: "04", title: "Bordado", subtitle: "Semana 5-10", desc: "Hasta 800 horas de bordado a mano en colaboración con Lesage. Cristales, plumas, lentejuelas.", img: media.pexelsEditorial2 },
  { num: "05", title: "Pasarela", subtitle: "Semana 12", desc: "La pieza se presenta en una sesión privada. Ajustes finales. Embalaje en nuestro cofre de lino.", img: media.pexelsRunway1 },
];

export const atelierStats: StatItem[] = [
  { n: "1.200", l: "Horas por pieza" }, { n: "100%", l: "Hecho a mano" },
  { n: "37", l: "Años de oficio" }, { n: "23", l: "Países servidos" },
];

export const atelierPillars: ProcessStep[] = [
  { title: "Patronaje", desc: "Cada molde se construye sobre maniquí individual. La tela se corta a ojo, a mano, con tijeras de sastre heredadas." },
  { title: "Bordado", desc: "Lesage, Lemarié y nuestro propio atelier colaboran en bordados que requieren hasta 800 horas por pieza." },
  { title: "Sastrería", desc: "Sastres de quinta generación terminan cada costura a mano. La pajarita final nunca se cose: se ata." },
];

let cmsUrl = import.meta.env.VITE_CMS_URL || "";

export function setCmsUrl(url: string) { cmsUrl = url; }
export function getCmsUrl() { return cmsUrl; }

async function fetchCms<T>(endpoint: string): Promise<T | null> {
  if (!cmsUrl) return null;
  try {
    const res = await fetch(`${cmsUrl}/api/${endpoint}`);
    if (!res.ok) return null;
    return (await res.json()).data;
  } catch { return null; }
}

export async function getCollections() {
  const api = await fetchCms<CollectionItem[]>("collections");
  return api || collections;
}

export async function getProducts() {
  const api = await fetchCms<LookbookItem[]>("products");
  return api || lookbookProducts;
}

export async function getTestimonials() {
  const api = await fetchCms<TestimonialItem[]>("testimonials");
  return api || testimonialData;
}

export async function getShowrooms() {
  const api = await fetchCms<ShowroomItem[]>("showrooms");
  return api || showroomData;
}