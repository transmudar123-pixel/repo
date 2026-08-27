export type ItemInventario = { key: string; label: string };
export type CategoriaInventario = { key: string; titulo: string; items: ItemInventario[] };

export const CATEGORIAS_INVENTARIO: CategoriaInventario[] = [
  {
    key: "sala",
    titulo: "Sala",
    items: [
      { key: "sofa2", label: "Sofá 2 puestos" },
      { key: "sofa3", label: "Sofá 3 puestos" },
      { key: "sofaL", label: "Sofá en L" },
      { key: "poltronas", label: "Poltronas" },
      { key: "mesaCentro", label: "Mesa de centro" },
      { key: "mesaAuxiliar", label: "Mesa auxiliar" },
      { key: "biblioteca", label: "Biblioteca" },
      { key: "muebleTv", label: "Mueble de TV" },
      { key: "salaOtro", label: "Otro (sala)" },
    ],
  },
  {
    key: "comedor",
    titulo: "Comedor",
    items: [
      { key: "mesa2", label: "Mesa 2 puestos" },
      { key: "mesa4", label: "Mesa 4 puestos" },
      { key: "mesa6", label: "Mesa 6 puestos" },
      { key: "mesa8", label: "Mesa 8 puestos o más" },
      { key: "sillas", label: "Número de sillas" },
      { key: "buffet", label: "Buffet / aparador" },
    ],
  },
  {
    key: "habitaciones",
    titulo: "Habitaciones",
    items: [
      { key: "camaSencilla", label: "Cama sencilla" },
      { key: "camaSemidoble", label: "Cama semidoble" },
      { key: "camaDoble", label: "Cama doble" },
      { key: "camaQueen", label: "Cama Queen" },
      { key: "camaKing", label: "Cama King" },
      { key: "colchones", label: "Colchones" },
      { key: "mesasNoche", label: "Mesas de noche" },
      { key: "comodas", label: "Cómodas" },
      { key: "tocadores", label: "Tocadores" },
      { key: "armarios", label: "Armarios" },
      { key: "escritoriosHab", label: "Escritorios" },
    ],
  },
  {
    key: "electrodomesticos",
    titulo: "Electrodomésticos",
    items: [
      { key: "neveraPequena", label: "Nevera pequeña" },
      { key: "neveraConvencional", label: "Nevera convencional" },
      { key: "neveraDosPuertas", label: "Nevera de dos puertas" },
      { key: "nevecon", label: "Nevecón" },
      { key: "lavadora", label: "Lavadora" },
      { key: "secadora", label: "Secadora" },
      { key: "lavavajillas", label: "Lavavajillas" },
      { key: "microondas", label: "Microondas" },
      { key: "horno", label: "Horno" },
      { key: "estufa", label: "Estufa" },
    ],
  },
  {
    key: "oficina",
    titulo: "Oficina / estudio",
    items: [
      { key: "escritorios", label: "Escritorios" },
      { key: "sillasEscritorio", label: "Sillas de escritorio" },
      { key: "archivadores", label: "Archivadores" },
      { key: "computadores", label: "Computadores" },
      { key: "impresoras", label: "Impresoras" },
      { key: "otrosEquipos", label: "Otros equipos" },
    ],
  },
  {
    key: "cajas",
    titulo: "Cajas y objetos",
    items: [
      { key: "cajas", label: "Cajas (aproximado)" },
      { key: "maletas", label: "Maletas" },
      { key: "bolsas", label: "Bolsas" },
      { key: "cuadros", label: "Cuadros" },
      { key: "espejos", label: "Espejos" },
      { key: "plantas", label: "Plantas" },
    ],
  },
];

export const TAMANOS_TV = [
  'Menos de 32"',
  '32" a 43"',
  '44" a 55"',
  '56" a 65"',
  '66" a 75"',
  'Más de 75"',
];

export const ELEMENTOS_ESPECIALES = [
  "Piano",
  "Caja fuerte",
  "Mesa de mármol",
  "Cristales",
  "Obras de arte",
  "Antigüedades",
  "Acuario",
  "Elementos especialmente pesados",
  "Otro",
];

export const TIPOS_INMUEBLE = ["Apartamento", "Casa", "Oficina", "Bodega", "Otro"];
