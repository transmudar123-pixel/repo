import {
  Building2,
  Boxes,
  CalendarCheck,
  Layers,
  MapPin,
  Move3d,
  PackageOpen,
  Route as RouteIcon,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const servicios = [
  {
    icon: PackageOpen,
    titulo: "Servicio de empaque",
    texto: "Protección y organización de tus pertenencias antes del traslado.",
  },
  {
    icon: MapPin,
    titulo: "Mudanzas locales",
    texto: "Servicio de mudanza dentro de la ciudad.",
  },
  {
    icon: RouteIcon,
    titulo: "Mudanzas nacionales",
    texto: "Traslados entre diferentes ciudades del país.",
  },
  {
    icon: Boxes,
    titulo: "Renta de bodegas",
    texto: "Alternativas de almacenamiento para tus pertenencias cuando lo necesites.",
  },
  {
    icon: Building2,
    titulo: "Traslado de oficinas",
    texto: "Movilización de puestos de trabajo, escritorios, equipos y mobiliario empresarial.",
  },
  {
    icon: CalendarCheck,
    titulo: "Traslado para eventos",
    texto: "Apoyo logístico para movilización de elementos relacionados con eventos.",
  },
  {
    icon: Zap,
    titulo: "Servicios express",
    texto: "Alternativa para requerimientos de traslado más rápidos.",
  },
  {
    icon: Layers,
    titulo: "Servicios consolidados",
    texto: "Opción para optimizar determinados tipos de traslado.",
  },
  {
    icon: Move3d,
    titulo: "Movimiento de muebles por fachada",
    texto:
      "Solución especializada cuando por dimensiones o accesos un elemento no puede movilizarse por escaleras o ascensores.",
  },
];

export function OtrosServicios() {
  return (
    <section id="servicios" className="section-y">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Otros servicios</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Mucho más que una mudanza
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <Reveal
              as="li"
              key={s.titulo}
              delay={(i % 3) * 90}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-navy transition-colors group-hover:bg-navy group-hover:text-secondary">
                <s.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{s.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.texto}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
