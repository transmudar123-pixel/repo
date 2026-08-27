import { createFileRoute } from "@tanstack/react-router";
import { PaginaLegal } from "@/components/site/PaginaLegal";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/terminos-y-condiciones")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones | TRANSMUDAR" },
      {
        name: "description",
        content:
          "Condiciones generales del servicio de mudanzas, cotizaciones, planes y responsabilidades de TRANSMUDAR.",
      },
      { property: "og:title", content: "Términos y condiciones | TRANSMUDAR" },
      {
        property: "og:description",
        content: "Condiciones generales del servicio de mudanzas y cotizaciones de TRANSMUDAR.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PaginaLegal
      titulo="Términos y condiciones"
      intro="Condiciones generales que aplican al uso de este sitio web y a la solicitud de servicios de mudanza con TRANSMUDAR."
    >
      <section>
        <h2>Cotizaciones</h2>
        <p>
          La información enviada a través del formulario permite estimar el alcance de la mudanza.
          Los valores del servicio se comunican directamente por TRANSMUDAR y pueden ajustarse si las
          condiciones reales del inmueble, los accesos o el inventario difieren de lo informado.
        </p>
      </section>
      <section>
        <h2>Alcance de los planes</h2>
        <p>
          Los planes Básico, Plus y Premium incluyen las actividades descritas en este sitio. Las
          actividades adicionales, elementos especiales o instalaciones no contempladas deben
          acordarse previamente.
        </p>
      </section>
      <section>
        <h2>Responsabilidades del cliente</h2>
        <ul>
          <li>Informar restricciones de horario, accesos y condiciones del inmueble.</li>
          <li>Reportar elementos delicados, frágiles o de alto valor antes del traslado.</li>
          <li>Gestionar los permisos que exija la administración del edificio o conjunto.</li>
        </ul>
      </section>
      <section>
        <h2>Contacto</h2>
        <p>
          Cualquier inquietud sobre estas condiciones puede tratarse al {BRAND.telefonoFormateado}.
        </p>
      </section>
    </PaginaLegal>
  ),
});
