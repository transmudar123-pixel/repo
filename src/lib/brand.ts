export const BRAND = {
  nombre: "TRANSMUDAR",
  tagline: "Servicio de mudanzas",
  telefono: "3112543114",
  telefonoFormateado: "311 254 3114",
  whatsapp: "573112543114",
  instagram: "https://www.instagram.com/transmudar._?igsi=eHJpNGQ0NGdvODM2",
  email: "" as string,
};

export function waLink(mensaje?: string) {
  const texto =
    mensaje ??
    "Hola TRANSMUDAR. Estoy en la página web y quisiera información sobre una mudanza.";
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export const NAV = [
  { label: "Inicio", to: "/", hash: "inicio" },
  { label: "Servicios", to: "/", hash: "servicios" },
  { label: "Planes", to: "/", hash: "planes" },
  { label: "Galería", to: "/", hash: "galeria" },
  { label: "¿Cómo funciona?", to: "/", hash: "como-funciona" },
  { label: "Preguntas frecuentes", to: "/", hash: "faq" },
  { label: "Contacto", to: "/", hash: "contacto" },
];
