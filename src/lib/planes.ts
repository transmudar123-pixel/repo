export type PlanId = "basico" | "plus" | "premium";

export type Plan = {
  id: PlanId;
  nombre: string;
  descripcion: string;
  destacado?: string;
  incluyeTitulo: string;
  items: string[];
  cta: string;
};

export const PLANES: Plan[] = [
  {
    id: "basico",
    nombre: "BÁSICO",
    descripcion: "Lo esencial para trasladar tus pertenencias de forma segura y organizada.",
    incluyeTitulo: "Incluye",
    items: [
      "3 operarios",
      "Arme y desarme de muebles básicos",
      "Cargue",
      "Descargue",
      "Vehículo tipo furgón acondicionado para la mudanza",
    ],
    cta: "Cotizar Básico",
  },
  {
    id: "plus",
    nombre: "PLUS",
    descripcion: "Mayor protección para tus muebles durante todo el traslado.",
    destacado: "Más elegido",
    incluyeTitulo: "Incluye todo el Plan Básico, más",
    items: [
      "Embalaje de los muebles con plástico vinipel",
      "Protección con mantas de algodón",
      "Mayor protección durante cargue, transporte y descargue",
    ],
    cta: "Cotizar Plus",
  },
  {
    id: "premium",
    nombre: "PREMIUM",
    descripcion:
      "Nos encargamos prácticamente de todo para que tú tengas que preocuparte lo menos posible.",
    destacado: "Servicio más completo",
    incluyeTitulo: "Incluye todo el Plan Plus, más",
    items: [
      "Embalaje de los elementos en cajas",
      "Protección especial para objetos delicados",
      "Organización y protección de elementos pequeños",
      "Instalación de cuadros",
      "Instalación de televisores",
      "Instalación de lavadora",
      "Instalación de secadora",
      "Instalación de neveras y nevecones",
      "Apoyo en la instalación de otros elementos de la mudanza",
    ],
    cta: "Quiero Premium",
  },
];

export const COMPARADOR: { servicio: string; basico: boolean; plus: boolean; premium: boolean }[] = [
  { servicio: "Operarios", basico: true, plus: true, premium: true },
  { servicio: "Furgón acondicionado", basico: true, plus: true, premium: true },
  { servicio: "Cargue y descargue", basico: true, plus: true, premium: true },
  { servicio: "Arme y desarme básico", basico: true, plus: true, premium: true },
  { servicio: "Vinipel", basico: false, plus: true, premium: true },
  { servicio: "Mantas de algodón", basico: false, plus: true, premium: true },
  { servicio: "Empaque en cajas", basico: false, plus: false, premium: true },
  { servicio: "Protección especial", basico: false, plus: false, premium: true },
  { servicio: "Instalación de elementos", basico: false, plus: false, premium: true },
];

export const SERVICIOS_ADICIONALES = [
  "Empaque",
  "Renta de bodega",
  "Movimiento de muebles por fachada",
  "Traslado de oficina",
  "Traslado de evento",
  "Servicio express",
  "Otro",
];
