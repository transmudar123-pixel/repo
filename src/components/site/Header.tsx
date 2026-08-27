import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";
import camion from "@/assets/logo-camion.png";
import { BRAND, NAV, waLink } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSeccionActiva } from "@/hooks/useSeccionActiva";

const SECCIONES = NAV.map((item) => item.hash).filter(Boolean);
const OFFSET_HEADER = 120;

/** Desplaza hasta la sección compensando el alto del encabezado con pestañas. */
function irASeccion(id: string) {
  const scrollTo = () => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - OFFSET_HEADER;
    window.scrollTo({ top, behavior: "smooth" });
  };
  scrollTo();
  // El contenido puede crecer al cargar imágenes: reajustamos al terminar.
  window.setTimeout(scrollTo, 600);
  if (history.replaceState) history.replaceState(null, "", `#${id}`);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const seccionActiva = useSeccionActiva(SECCIONES, pathname === "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* Franja superior verde con marca */}
      <div
        className={cn(
          "bg-mint transition-shadow duration-300",
          scrolled ? "shadow-soft rounded-b-2xl" : "rounded-b-2xl",
        )}
      >
        <div className="container-page grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-3">
          {/* Espaciador izquierdo para centrar la marca */}
          <div aria-hidden="true" />

          {/* Bloque de marca: TRANSMUDAR + camión */}
          <Link
            to="/"
            className="flex min-w-0 items-center justify-center gap-2 sm:gap-3"
            aria-label="TRANSMUDAR — inicio"
          >
            <span className="font-display text-2xl font-black uppercase tracking-wide text-navy sm:text-3xl md:text-4xl">
              TRANSMUDAR
            </span>
            <img
              src={camion}
              alt="Camión de mudanzas TRANSMUDAR"
              className="h-9 w-auto shrink-0 sm:h-11"
            />
          </Link>

          {/* Botones de acción y menú hamburguesa a la derecha */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <Button
                asChild
                size="sm"
                className="bg-navy text-mint hover:bg-navy-soft"
              >
                <Link to="/cotizar">Cotiza tu mudanza</Link>
              </Button>

              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-navy text-navy hover:bg-navy/10"
              >
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>

            {/* Menú hamburguesa en móvil */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-navy/30 text-navy sm:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Pestañas de secciones */}
      <div className="relative border-t border-border/70 bg-background/95 backdrop-blur">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent xl:hidden"
        />
        <nav
          aria-label="Secciones de la página"
          className="container-page flex snap-x snap-mandatory items-stretch gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {NAV.map((item) => {
            const activa = pathname === "/" && seccionActiva === item.hash;
            return (
              <Link
                key={item.label}
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                onClick={(e) => {
                  if (pathname === "/" && item.hash) {
                    e.preventDefault();
                    irASeccion(item.hash);
                  }
                }}
                aria-current={activa ? "true" : undefined}
                className={cn(
                  "relative shrink-0 snap-start rounded-t-lg px-3 py-3 text-sm font-semibold whitespace-nowrap transition-colors",
                  activa
                    ? "text-primary"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-2 bottom-0 h-[3px] rounded-full transition-all",
                    activa ? "bg-primary opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <div className="border-t border-border bg-background sm:hidden">
          <nav className="container-page grid gap-2 py-3" aria-label="Acciones rápidas">
            <Button asChild size="lg">
              <Link to="/cotizar" onClick={() => setOpen(false)}>
                Cotiza tu mudanza
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp {BRAND.telefonoFormateado}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
