import { createFileRoute } from "@tanstack/react-router";
import { PaginaLegal } from "@/components/site/PaginaLegal";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad | TRANSMUDAR" },
      {
        name: "description",
        content:
          "Conoce cómo TRANSMUDAR recolecta, usa y protege la información personal que envías al solicitar una cotización de mudanza.",
      },
      { property: "og:title", content: "Política de privacidad | TRANSMUDAR" },
      {
        property: "og:description",
        content: "Cómo tratamos y protegemos la información de nuestros clientes en TRANSMUDAR.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PaginaLegal
      titulo="Política de privacidad"
      intro="En TRANSMUDAR cuidamos tu información con el mismo criterio con el que cuidamos tus pertenencias."
    >
      <section>
        <h2>Información que recolectamos</h2>
        <p>
          Cuando solicitas una cotización recolectamos los datos que ingresas en el formulario:
          nombre, número de celular, WhatsApp, correo electrónico, direcciones de origen y destino,
          características del inmueble, inventario de elementos a trasladar, fechas, observaciones y
          las fotografías que decidas adjuntar.
        </p>
      </section>
      <section>
        <h2>Finalidad</h2>
        <ul>
          <li>Preparar y enviarte la cotización de tu mudanza.</li>
          <li>Contactarte por teléfono, WhatsApp o correo para aclarar detalles del servicio.</li>
          <li>Organizar la operación logística en caso de que contrates el servicio.</li>
        </ul>
      </section>
      <section>
        <h2>Conservación y seguridad</h2>
        <p>
          Las solicitudes y las fotografías se almacenan en una base de datos y en un espacio de
          almacenamiento de acceso restringido. Solo el personal autorizado de TRANSMUDAR consulta
          esa información.
        </p>
      </section>
      <section>
        <h2>Tus derechos</h2>
        <p>
          Puedes solicitar conocer, actualizar, rectificar o eliminar tu información escribiendo al{" "}
          número {BRAND.telefonoFormateado}.
        </p>
      </section>
    </PaginaLegal>
  ),
});
