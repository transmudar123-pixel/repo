import { createFileRoute } from "@tanstack/react-router";
import { Wizard } from "@/components/cotizador/Wizard";

type Busqueda = { plan?: string | undefined };

export const Route = createFileRoute("/cotizar")({
  validateSearch: (search: Record<string, unknown>): Busqueda => ({
    plan: typeof search["plan"] === "string" ? (search["plan"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Cotiza tu mudanza | TRANSMUDAR" },
      {
        name: "description",
        content:
          "Cuéntanos tu mudanza en 5 pasos y recibe una cotización de TRANSMUDAR: origen, destino, inventario, plan y fotos.",
      },
      { property: "og:title", content: "Cotiza tu mudanza con TRANSMUDAR" },
      {
        property: "og:description",
        content:
          "Formulario guiado para cotizar tu mudanza local o nacional. Adjunta fotos y continúa por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cotizar,
});

function Cotizar() {
  const { plan } = Route.useSearch();

  return (
    <div className="bg-surface">
      <div className="container-page py-12 md:py-16">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow">Cotiza tu mudanza</p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Nos encargamos de tu mudanza de principio a fin
          </h1>
          <p className="mt-4 text-muted-foreground">
            Respóndenos unas preguntas sencillas. Con esa información preparamos una cotización
            ajustada a tu mudanza.
          </p>
        </header>
        <Wizard planInicial={plan} />
      </div>
    </div>
  );
}
