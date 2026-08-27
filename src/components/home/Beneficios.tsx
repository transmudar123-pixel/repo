import { PackageCheck, ShieldCheck, Truck, UserCheck } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const beneficios = [
  {
    icon: ShieldCheck,
    titulo: "Protección profesional",
    texto: "Cuidamos tus muebles durante todo el proceso.",
  },
  {
    icon: UserCheck,
    titulo: "Personal capacitado",
    texto: "Equipo preparado para cargue, descargue, arme y desarme.",
  },
  {
    icon: Truck,
    titulo: "Vehículos acondicionados",
    texto: "Furgones preparados para transportar tus pertenencias.",
  },
  {
    icon: PackageCheck,
    titulo: "Servicio personalizado",
    texto: "Cada mudanza se organiza de acuerdo con tus necesidades.",
  },
];

export function Beneficios() {
  return (
    <section className="bg-surface py-12 md:py-16" aria-label="Beneficios de TRANSMUDAR">
      <ul className="container-page flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
        {beneficios.map((b, i) => (
          <Reveal
            as="li"
            key={b.titulo}
            delay={i * 90}
            className="min-w-[78%] snap-start rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 sm:min-w-0"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-navy">
              <b.icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{b.titulo}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.texto}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
