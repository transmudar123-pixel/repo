import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera, ListChecks, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { FOTO_COTIZAR } from "@/lib/fotos";
import { waLink } from "@/lib/brand";

export function CtaCotizar() {
  const foto = FOTO_COTIZAR;
  return (
    <section className="bg-surface section-y">
      <div className="container-page overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="grid lg:grid-cols-2">
          <Reveal className="p-8 md:p-12">
            <p className="eyebrow">Cotiza tu mudanza</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Cuéntanos tu mudanza en 5 pasos
            </h2>
            <p className="mt-4 text-muted-foreground">
              Un formulario sencillo, pensado para el celular: dónde estás, hacia dónde vas, qué
              vamos a mover y el nivel de servicio que prefieres.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3">
                <ListChecks className="h-5 w-5 shrink-0 text-mint-deep" aria-hidden="true" />
                Inventario guiado con contadores, sin escribir listas largas.
              </li>
              <li className="flex gap-3">
                <Camera className="h-5 w-5 shrink-0 text-mint-deep" aria-hidden="true" />
                Puedes adjuntar fotos para una cotización más precisa.
              </li>
              <li className="flex gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-mint-deep" aria-hidden="true" />
                Al terminar continúas por WhatsApp con la información ya organizada.
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-13 font-bold">
                <Link to="/cotizar">
                  Cotizar mi mudanza
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-13 font-semibold">
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  Hablar por WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>

          <div className="relative min-h-[280px]">
            <img
              src={foto.url}
              alt={foto.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
