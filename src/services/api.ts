export interface StrapiCollection {
  id: number; documentId: string;
  title: string; subtitle: string; num: string;
  price: number; desc: string; tags: string[];
  image?: { url: string };
  createdAt: string; publishedAt: string;
}

export interface StrapiProduct {
  id: number; documentId: string;
  name: string; code: string; category: string;
  price: number; fabric: string; origin: string;
  image?: { url: string };
  createdAt: string; publishedAt: string;
}

export interface StrapiTestimonial {
  id: number; documentId: string;
  quote: string; author: string; role: string;
  createdAt: string; publishedAt: string;
}

export interface StrapiShowroom {
  id: number; documentId: string;
  city: string; country: string; address: string;
  flag: string; hours: string;
  createdAt: string; publishedAt: string;
}

export interface StrapiHero {
  id: number; documentId: string;
  title: string; subtitle: string; description: string;
  cta: string; secondaryCta: string;
  videoUrl?: string;
  createdAt: string; publishedAt: string;
}

export interface StrapiMTM {
  id: number; documentId: string;
  garment: string; details: string; fabric: string; color: string;
  clientName: string; clientEmail: string; clientPhone: string;
  deliveryDate: string; notes: string; status: "pending" | "contacted" | "in-progress" | "completed" | "declined";
  createdAt: string; publishedAt: string;
}

export interface StrapiAppointment {
  id: number; documentId: string;
  date: string; time: string;
  name: string; email: string; phone: string;
  service: string; notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string; publishedAt: string;
}

export const STRAPI_CONTENT_TYPES = [
  { name: "Collection", apiId: "collections", attributes: ["title", "subtitle", "num", "price", "desc", "tags", "image"] },
  { name: "Product", apiId: "products", attributes: ["name", "code", "category", "price", "fabric", "origin", "image"] },
  { name: "Testimonial", apiId: "testimonials", attributes: ["quote", "author", "role"] },
  { name: "Showroom", apiId: "showrooms", attributes: ["city", "country", "address", "flag", "hours"] },
  { name: "Hero", apiId: "hero", attributes: ["title", "subtitle", "description", "cta", "secondaryCta", "videoUrl"] },
  { name: "MadeToMeasure", apiId: "made-to-measures", attributes: ["garment", "details", "fabric", "color", "clientName", "clientEmail", "clientPhone", "deliveryDate", "notes", "status"] },
  { name: "Appointment", apiId: "appointments", attributes: ["date", "time", "name", "email", "phone", "service", "notes", "status"] },
];