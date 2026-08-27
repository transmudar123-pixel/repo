import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { COMPARADOR } from "@/lib/planes";

function Marca({ activo }: { activo: boolean }) {
  return activo ? (
    <>
      <Check className="mx-auto h-5 w-5 text-mint-deep" aria-hidden="true" />
      <span className="sr-only">Incluido</span>
    </>
  ) : (
    <>
      <Minus className="mx-auto h-5 w-5 text-muted-foreground/50" aria-hidden="true" />
      <span className="sr-only">No incluido</span>
    </>
  );
}

export function Comparador() {
  return (
    <section className="bg-surface section-y">
      <div className="container-page">
        <Reveal>
          <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
            ¿Qué incluye cada plan?
          </h2>
        </Reveal>

        {/* Escritorio: tabla */}
        <Reveal className="mt-8 hidden overflow-hidden rounded-3xl border border-border bg-card shadow-soft md:block">
          <table className="w-full text-sm">
            <caption className="sr-only">Comparación de los planes Básico, Plus y Premium</caption>
            <thead>
              <tr className="bg-navy text-primary-foreground">
                <th scope="col" className="px-6 py-4 text-left font-bold">
                  Servicio
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Básico
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Plus
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARADOR.map((fila, i) => (
                <tr key={fila.servicio} className={i % 2 ? "bg-muted/40" : undefined}>
                  <th scope="row" className="px-6 py-3.5 text-left font-medium">
                    {fila.servicio}
                  </th>
                  <td className="px-6 py-3.5 text-center">
                    <Marca activo={fila.basico} />
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <Marca activo={fila.plus} />
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <Marca activo={fila.premium} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Móvil: tarjetas */}
        <div className="mt-8 grid gap-4 md:hidden">
          {(["basico", "plus", "premium"] as const).map((plan) => (
            <div
              key={plan}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <h3 className="text-lg font-extrabold uppercase">
                {plan === "basico" ? "Básico" : plan === "plus" ? "Plus" : "Premium"}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {COMPARADOR.map((fila) => (
                  <li key={fila.servicio} className="flex items-center justify-between gap-3">
                    <span
                      className={fila[plan] ? "font-medium" : "text-muted-foreground line-through"}
                    >
                      {fila.servicio}
                    </span>
                    <Marca activo={fila[plan]} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
