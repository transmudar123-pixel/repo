// Fotos temporales (marcador de posición) mientras se suben las fotos reales
// del proyecto. Reemplaza estas URLs por imágenes reales en /src/assets/fotos
// cuando estén disponibles (ver README para instrucciones).
function placeholder(categoria: string, indice: number): string {
  const colores = ["cbd5e1", "bae6fd", "fde68a", "fecaca", "bbf7d0"];
  const color = colores[indice % colores.length];
  const texto = encodeURIComponent(`${categoria} ${indice + 1}`);
  return `https://placehold.co/800x600/${color}/334155?text=${texto}`;
}

export type CategoriaFoto =
  | "Protección"
  | "Embalaje"
  | "Cargue"
  | "Transporte"
  | "Muebles delicados";

export type Foto = {
  url: string;
  alt: string;
  categoria: CategoriaFoto;
};

export const FOTOS: Foto[] = [
  {
    url: placeholder("Proteccion", 0),
    alt: "Operario de TRANSMUDAR junto a muebles embalados con vinipel antes del traslado",
    categoria: "Protección",
  },
  {
    url: placeholder("Proteccion", 1),
    alt: "Sofá protegido con plástico vinipel y esquineros durante una mudanza",
    categoria: "Protección",
  },
  {
    url: placeholder("Cargue", 2),
    alt: "Muebles embalados y apilados de forma organizada para el cargue",
    categoria: "Cargue",
  },
  {
    url: placeholder("Proteccion", 3),
    alt: "Sofás y sillas protegidos con papel kraft en la sala de un apartamento",
    categoria: "Protección",
  },
  {
    url: placeholder("Proteccion", 4),
    alt: "Sala completa con muebles protegidos y listos para la mudanza",
    categoria: "Protección",
  },
  {
    url: placeholder("Embalaje", 5),
    alt: "Silla de comedor embalada y marcada para identificarla en el traslado",
    categoria: "Embalaje",
  },
  {
    url: placeholder("Embalaje", 6),
    alt: "Mesa de comedor protegida con plástico vinipel sobre el piso",
    categoria: "Embalaje",
  },
  {
    url: placeholder("Embalaje", 7),
    alt: "Mesa embalada junto al rollo de vinipel usado para protegerla",
    categoria: "Embalaje",
  },
  {
    url: placeholder("Delicados", 8),
    alt: "Caja de cartón marcada como frágil para transportar un cuadro",
    categoria: "Muebles delicados",
  },
  {
    url: placeholder("Delicados", 9),
    alt: "Objeto delicado protegido con plástico burbuja dentro de una caja",
    categoria: "Muebles delicados",
  },
  {
    url: placeholder("Delicados", 10),
    alt: "Elemento frágil envuelto en plástico burbuja y empacado en caja",
    categoria: "Muebles delicados",
  },
  {
    url: placeholder("Embalaje", 11),
    alt: "Caja marcada con indicaciones de manejo frágil para un cuadro",
    categoria: "Embalaje",
  },
  {
    url: placeholder("Transporte", 12),
    alt: "Furgones acondicionados de TRANSMUDAR listos para una mudanza",
    categoria: "Transporte",
  },
  {
    url: placeholder("Transporte", 13),
    alt: "Furgón cargado con muebles protegidos durante el traslado",
    categoria: "Transporte",
  },
  {
    url: placeholder("Transporte", 14),
    alt: "Cajas y canastillas organizadas dentro de una bodega",
    categoria: "Transporte",
  },
  {
    url: placeholder("Transporte", 15),
    alt: "Almacenamiento ordenado de cajas y elementos de una mudanza en bodega",
    categoria: "Transporte",
  },
  {
    url: placeholder("Delicados", 16),
    alt: "Canastilla con objetos pequeños protegidos individualmente",
    categoria: "Muebles delicados",
  },
  {
    url: placeholder("Embalaje", 17),
    alt: "Televisor embalado y protegido antes de desinstalarlo de la pared",
    categoria: "Embalaje",
  },
  {
    url: placeholder("Cargue", 18),
    alt: "Cama desarmada con sus piezas protegidas y organizadas",
    categoria: "Cargue",
  },
  {
    url: placeholder("Cargue", 19),
    alt: "Colchón protegido y listo para el cargue en la habitación",
    categoria: "Cargue",
  },
];

export const FOTO_HERO = FOTOS[0] as Foto;
export const FOTO_CTA = FOTOS[4] as Foto;
export const FOTO_COTIZAR = FOTOS[13] as Foto;
export const CATEGORIAS: CategoriaFoto[] = [
  "Protección",
  "Embalaje",
  "Cargue",
  "Transporte",
  "Muebles delicados",
];
