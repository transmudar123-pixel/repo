import { Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

/**
 * PLACEHOLDERS: TRANSMUDAR aún no ha entregado testimonios reales.
 * No se publican calificaciones ni reseñas inventadas. Cuando existan
 * testimonios verdaderos, reemplaza los objetos de este arreglo.
 */
const testimonios = [
  { nombre: "Espacio disponible", detalle: "Mudanza de apartamento" },
  { nombre: "Espacio disponible", detalle: "Traslado de oficina" },
  { nombre: "Espacio disponible", detalle: "Mudanza nacional" },
];

export function Testimonios() {
  return (
    <section className="bg-surface section-y">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Testimonios</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Clientes que ya se mudaron con nosotros
          </h2>
          <p className="mt-4 text-muted-foreground">
            Estamos recopilando las experiencias de nuestros clientes. Muy pronto encontrarás aquí
            sus testimonios reales.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonios.map((t, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 100}
              className="rounded-2xl border border-dashed border-border bg-card p-6"
            >
              <Quote className="h-7 w-7 text-mint-deep" aria-hidden="true" />
              <p className="mt-4 text-sm text-muted-foreground">
                Testimonio pendiente de publicación. Este espacio está reservado para el comentario
                de un cliente real de TRANSMUDAR.
              </p>
              <p className="mt-5 text-sm font-bold">{t.nombre}</p>
              <p className="text-xs text-muted-foreground">{t.detalle}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
