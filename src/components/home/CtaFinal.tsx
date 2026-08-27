import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { FOTO_CTA } from "@/lib/fotos";
import { waLink } from "@/lib/brand";

export function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <img
        src={FOTO_CTA.url}
        alt={FOTO_CTA.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy/75" />
      <Reveal className="container-page relative py-20 text-center text-primary-foreground md:py-28">
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold sm:text-4xl md:text-5xl">
          Tu próxima mudanza puede ser mucho más sencilla.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-primary-foreground/85">
          Cuéntanos qué necesitas mover y nosotros te ayudamos a organizar el resto.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-base font-bold">
            <Link to="/cotizar">Cotizar mi mudanza</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 border-primary-foreground/40 bg-transparent px-8 text-base font-semibold text-primary-foreground hover:bg-primary-foreground hover:text-navy"
          >
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Hablar por WhatsApp
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
