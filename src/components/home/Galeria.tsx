import { useState } from "react";
import { X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CATEGORIAS, FOTOS, type CategoriaFoto } from "@/lib/fotos";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Galeria() {
  const [filtro, setFiltro] = useState<CategoriaFoto | "Todas">("Todas");
  const [abierta, setAbierta] = useState<number | null>(null);

  const fotos = FOTOS.filter((f) => filtro === "Todas" || f.categoria === filtro);

  return (
    <section id="galeria" className="bg-navy py-16 text-primary-foreground md:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.16em] uppercase text-secondary">
            Trabajos reales de TRANSMUDAR
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Así cuidamos cada detalle
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Una mudanza segura comienza mucho antes de encender el vehículo. Protegemos tus
            pertenencias para reducir riesgos durante todo el traslado.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar galería">
          {(["Todas", ...CATEGORIAS] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFiltro(cat)}
              aria-pressed={filtro === cat}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                filtro === cat
                  ? "border-secondary bg-secondary text-navy"
                  : "border-primary-foreground/25 text-primary-foreground/85 hover:border-secondary hover:text-secondary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {fotos.map((foto) => {
            const index = FOTOS.indexOf(foto);
            return (
              <button
                key={foto.url}
                type="button"
                onClick={() => setAbierta(index)}
                className="group relative block w-full overflow-hidden rounded-2xl focus-visible:outline-offset-4"
                aria-label={`Ampliar fotografía: ${foto.alt}`}
              >
                <img
                  src={foto.url}
                  alt={foto.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/35" />
                <span className="absolute bottom-3 left-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {foto.categoria}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={abierta !== null} onOpenChange={(o) => !o && setAbierta(null)}>
        <DialogContent
          className="max-w-4xl border-none bg-transparent p-0 shadow-none"
        >
          {abierta !== null && FOTOS[abierta] && (
            <figure className="relative">
              <DialogTitle className="sr-only">{FOTOS[abierta]!.alt}</DialogTitle>
              <img
                src={FOTOS[abierta]!.url}
                alt={FOTOS[abierta]!.alt}
                className="max-h-[80svh] w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-3 text-center text-sm text-primary-foreground">
                {FOTOS[abierta]!.alt}
              </figcaption>
              <button
                type="button"
                onClick={() => setAbierta(null)}
                aria-label="Cerrar imagen"
                className="absolute -top-3 -right-2 grid h-11 w-11 place-items-center rounded-full bg-background text-foreground shadow-lift"
              >
                <X className="h-5 w-5" />
              </button>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
