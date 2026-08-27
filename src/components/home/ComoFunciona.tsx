import { ClipboardList, FileText, PackageCheck, Truck } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const pasos = [
  {
    icon: ClipboardList,
    titulo: "Cuéntanos tu mudanza",
    texto: "Indica desde dónde sales, hacia dónde vas y qué necesitas transportar.",
  },
  {
    icon: FileText,
    titulo: "Recibe tu cotización",
    texto:
      "Revisamos las características de tu mudanza y te presentamos la alternativa adecuada.",
  },
  {
    icon: PackageCheck,
    titulo: "Preparamos todo",
    texto:
      "Nuestro equipo realiza el desarme, protección y empaque correspondiente al servicio contratado.",
  },
  {
    icon: Truck,
    titulo: "Nos encargamos del traslado",
    texto:
      "Cargamos, transportamos, descargamos y, según tu plan, volvemos a instalar tus elementos.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="section-y">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">¿Cómo funciona?</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Mudarte puede ser más fácil
          </h2>
        </Reveal>

        <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute top-7 left-7 hidden h-px w-[calc(100%-3.5rem)] bg-gradient-to-r from-mint via-mint-deep/60 to-mint md:block"
          />
          {pasos.map((paso, i) => (
            <Reveal as="li" key={paso.titulo} delay={i * 110} className="relative">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-navy text-secondary shadow-card">
                <paso.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xs font-bold tracking-[0.16em] uppercase text-mint-deep">
                Paso {i + 1}
              </p>
              <h3 className="mt-1 text-lg font-bold">{paso.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{paso.texto}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
