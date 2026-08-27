import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { BRAND, waLink } from "@/lib/brand";

const enlaces = [
  { label: "Inicio", to: "/", hash: "" },
  { label: "Servicios", to: "/", hash: "servicios" },
  { label: "Planes", to: "/", hash: "planes" },
  { label: "Galería", to: "/", hash: "galeria" },
  { label: "Cotización", to: "/cotizar", hash: "" },
  { label: "Preguntas frecuentes", to: "/", hash: "faq" },
];

const legales = [
  { label: "Política de privacidad", to: "/privacidad" },
  { label: "Tratamiento de datos", to: "/tratamiento-de-datos" },
  { label: "Términos y condiciones", to: "/terminos-y-condiciones" },
];

export function Footer() {
  return (
    <footer id="contacto" className="bg-navy text-primary-foreground">
      <div className="container-page pt-14">
        {/* Marca sin logo */}
        <div className="mb-10 text-center">
          <p className="font-display text-3xl font-black uppercase tracking-wide text-secondary sm:text-4xl">
            {BRAND.nombre}
          </p>
          <p className="mt-1 text-sm text-primary-foreground/70">
            {BRAND.tagline}
          </p>
        </div>

        {/* Columnas de información */}
        <div className="grid gap-10 pb-14 md:grid-cols-3">
          {/* Contacto directo */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.16em] uppercase text-secondary">
              Contacto
            </h3>
            <a
              href={`tel:+57${BRAND.telefono}`}
              className="mt-4 flex items-center gap-2 text-primary-foreground/85 hover:text-secondary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {BRAND.telefonoFormateado}
            </a>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir a TRANSMUDAR por WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-xl bg-primary-foreground/10 transition-colors hover:bg-secondary hover:text-navy"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={BRAND.instagram || waLink("Hola TRANSMUDAR, ¿cuál es su Instagram?")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de TRANSMUDAR"
                className="grid h-11 w-11 place-items-center rounded-xl bg-primary-foreground/10 transition-colors hover:bg-secondary hover:text-navy"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={BRAND.email ? `mailto:${BRAND.email}` : waLink("Hola TRANSMUDAR, ¿cuál es su correo electrónico?")}
                aria-label="Correo electrónico de TRANSMUDAR"
                className="grid h-11 w-11 place-items-center rounded-xl bg-primary-foreground/10 transition-colors hover:bg-secondary hover:text-navy"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navegación rápida */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.16em] uppercase text-secondary">
              Páginas
            </h3>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 md:grid-cols-1">
              {enlaces.map((e) => (
                <li key={e.label}>
                  <Link
                    to={e.to}
                    {...(e.hash ? { hash: e.hash } : {})}
                    className="text-primary-foreground/80 hover:text-secondary"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.16em] uppercase text-secondary">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {legales.map((e) => (
                <li key={e.label}>
                  <Link to={e.to} className="text-primary-foreground/80 hover:text-secondary">
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10 py-5">
        <p className="container-page text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} {BRAND.nombre} — {BRAND.tagline}. Bogotá, Colombia.
        </p>
      </div>
    </footer>
  );
}
