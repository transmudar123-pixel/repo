import { Link } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOTO_HERO } from "@/lib/fotos";
import { waLink } from "@/lib/brand";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-navy">
      <img
        src={FOTO_HERO.url}
        alt={FOTO_HERO.alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90"
      />

      <div className="container-page relative flex min-h-[78svh] flex-col justify-center py-20 text-primary-foreground md:py-28">
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary/90 px-4 py-1.5 text-xs font-bold tracking-[0.14em] uppercase text-navy">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Nos encargamos de tu mudanza de principio a fin
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
          Tu mudanza, <span className="text-secondary">en buenas manos.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
          En TRANSMUDAR protegemos, transportamos e instalamos tus pertenencias para que cambiar de
          lugar sea mucho más fácil.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="secondary" className="h-14 text-base font-bold">
            <Link to="/cotizar">Cotizar mi mudanza</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 border-primary-foreground/40 bg-transparent text-base font-semibold text-primary-foreground hover:bg-primary-foreground hover:text-navy"
          >
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Hablar por WhatsApp
            </a>
          </Button>
        </div>

        <p className="mt-8 text-sm text-primary-foreground/70">
          Mudanzas locales y nacionales · Hogares · Oficinas · Eventos
        </p>
      </div>
    </section>
  );
}
