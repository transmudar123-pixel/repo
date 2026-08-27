import { createFileRoute } from "@tanstack/react-router";
import { PaginaLegal } from "@/components/site/PaginaLegal";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/tratamiento-de-datos")({
  head: () => ({
    meta: [
      { title: "Tratamiento de datos personales | TRANSMUDAR" },
      {
        name: "description",
        content:
          "Autorización y política de tratamiento de datos personales de TRANSMUDAR conforme a la normativa colombiana.",
      },
      { property: "og:title", content: "Tratamiento de datos personales | TRANSMUDAR" },
      {
        property: "og:description",
        content:
          "Conoce la autorización, finalidades y derechos frente al tratamiento de datos personales en TRANSMUDAR.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PaginaLegal
      titulo="Tratamiento de datos personales"
      intro="Política de tratamiento de datos de TRANSMUDAR, en el marco de la Ley 1581 de 2012 y sus decretos reglamentarios."
    >
      <section>
        <h2>Responsable</h2>
        <p>
          TRANSMUDAR — Servicio de mudanzas. Teléfono y WhatsApp {BRAND.telefonoFormateado}.
        </p>
      </section>
      <section>
        <h2>Autorización</h2>
        <p>
          Al marcar la casilla de autorización en el formulario de cotización, autorizas a TRANSMUDAR
          a tratar tus datos personales para gestionar tu solicitud y contactarte por los canales que
          suministraste.
        </p>
      </section>
      <section>
        <h2>Finalidades del tratamiento</h2>
        <ul>
          <li>Elaborar la cotización del servicio de mudanza solicitado.</li>
          <li>Comunicarnos contigo durante el proceso de cotización y prestación del servicio.</li>
          <li>Llevar el registro interno de solicitudes y su estado.</li>
        </ul>
      </section>
      <section>
        <h2>Derechos del titular</h2>
        <ul>
          <li>Conocer, actualizar y rectificar tus datos personales.</li>
          <li>Solicitar prueba de la autorización otorgada.</li>
          <li>Revocar la autorización o solicitar la supresión de los datos.</li>
        </ul>
        <p>
          Para ejercer estos derechos comunícate al {BRAND.telefonoFormateado}. Atenderemos tu
          solicitud dentro de los términos legales.
        </p>
      </section>
    </PaginaLegal>
  ),
});
