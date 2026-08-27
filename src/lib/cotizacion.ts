import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { BRAND } from "@/lib/brand";
import type { PlanId } from "@/lib/planes";

export type Inmueble = {
  ciudad: string;
  direccion: string;
  tipo: string;
  piso: string;
  ascensor: string;
  ascensorMudanzas: string;
  parqueo: string;
  restriccionHorario?: string;
  detalleHorario?: string;
};

export type Televisor = { cantidad: number; tamano: string; enPared: string };

export type FormularioCotizacion = {
  origen: Inmueble;
  destino: Inmueble;
  inventario: Record<string, number>;
  camaRequiereDesarme: string;
  televisores: Televisor[];
  elementosEspeciales: string[];
  elementoEspecialOtro: string;
  plan: PlanId | "recomiendenme" | "";
  serviciosAdicionales: string[];
  fechaEstimada: string;
  horarioPreferido: string;
  nombre: string;
  telefono: string;
  whatsapp: string;
  email: string;
  observaciones: string;
  autorizacion: boolean;
};

export const INMUEBLE_VACIO: Inmueble = {
  ciudad: "",
  direccion: "",
  tipo: "",
  piso: "",
  ascensor: "",
  ascensorMudanzas: "",
  parqueo: "",
  restriccionHorario: "",
  detalleHorario: "",
};

export const FORM_VACIO: FormularioCotizacion = {
  origen: { ...INMUEBLE_VACIO },
  destino: { ...INMUEBLE_VACIO },
  inventario: {},
  camaRequiereDesarme: "",
  televisores: [],
  elementosEspeciales: [],
  elementoEspecialOtro: "",
  plan: "",
  serviciosAdicionales: [],
  fechaEstimada: "",
  horarioPreferido: "",
  nombre: "",
  telefono: "",
  whatsapp: "",
  email: "",
  observaciones: "",
  autorizacion: false,
};

export const NOMBRE_PLAN: Record<string, string> = {
  basico: "Básico",
  plus: "Plus",
  premium: "Premium",
  recomiendenme: "Por recomendar (TRANSMUDAR sugiere)",
};

export function esNacional(form: FormularioCotizacion) {
  const a = form.origen.ciudad.trim().toLowerCase();
  const b = form.destino.ciudad.trim().toLowerCase();
  return Boolean(a && b && a !== b);
}

export function mensajeWhatsApp(form: FormularioCotizacion) {
  const lineas = [
    "Hola TRANSMUDAR. Acabo de solicitar una cotización desde la página web.",
    `Nombre: ${form.nombre}`,
    `Origen: ${form.origen.ciudad}`,
    `Destino: ${form.destino.ciudad}`,
    `Plan de interés: ${NOMBRE_PLAN[form.plan] ?? "Por definir"}`,
    form.fechaEstimada ? `Fecha: ${form.fechaEstimada}` : null,
    "Quisiera recibir información sobre mi cotización.",
  ].filter(Boolean);
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(lineas.join("\n"))}`;
}

async function subirFotos(fotos: File[], carpeta: string) {
  const rutas: string[] = [];
  for (const [i, file] of fotos.entries()) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const ruta = `${carpeta}/${Date.now()}-${i}.${ext}`;
    const { error } = await supabase.storage.from("cotizaciones").upload(ruta, file, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
    if (!error) rutas.push(ruta);
  }
  return rutas;
}

export async function enviarCotizacion(form: FormularioCotizacion, fotos: File[]) {
  const carpeta = crypto.randomUUID();
  const rutas = fotos.length ? await subirFotos(fotos, carpeta) : [];

  const { error } = await supabase.from("solicitudes_cotizacion").insert({
    nombre: form.nombre.trim(),
    telefono: form.telefono.trim(),
    whatsapp: form.whatsapp.trim() || form.telefono.trim(),
    email: form.email.trim() || null,
    origen: form.origen as unknown as Json,
    destino: form.destino as unknown as Json,
    es_nacional: esNacional(form),
    inventario: {
      items: form.inventario,
      camaRequiereDesarme: form.camaRequiereDesarme,
      televisores: form.televisores,
      elementosEspeciales: form.elementosEspeciales,
      elementoEspecialOtro: form.elementoEspecialOtro,
    } as unknown as Json,
    plan: form.plan || null,
    servicios_adicionales: form.serviciosAdicionales,
    fecha_estimada: form.fechaEstimada || null,
    horario_preferido: form.horarioPreferido || null,
    observaciones: form.observaciones.trim() || null,
    fotos: rutas,
  });

  if (error) throw error;
  return { fotosSubidas: rutas.length };
}
