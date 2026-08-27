import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Trash2,
  Tv,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contador } from "@/components/cotizador/Contador";
import {
  CATEGORIAS_INVENTARIO,
  ELEMENTOS_ESPECIALES,
  TAMANOS_TV,
  TIPOS_INMUEBLE,
} from "@/components/cotizador/data";
import { PLANES, SERVICIOS_ADICIONALES } from "@/lib/planes";
import {
  FORM_VACIO,
  NOMBRE_PLAN,
  enviarCotizacion,
  esNacional,
  mensajeWhatsApp,
  type FormularioCotizacion,
  type Inmueble,
} from "@/lib/cotizacion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STORAGE_KEY = "transmudar-cotizacion";
const TOTAL_PASOS = 5;
const SI_NO = ["Sí", "No"];

function Campo({
  label,
  children,
  error,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  error?: string | undefined;
  htmlFor?: string | undefined;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor} className="text-sm font-semibold">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function Opciones({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string | undefined;
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-2 text-sm font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className={cn(
              "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
              value === opt
                ? "border-navy bg-navy text-primary-foreground"
                : "border-border bg-card hover:bg-muted",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </fieldset>
  );
}

function PasoInmueble({
  tipo,
  valor,
  set,
  errores,
}: {
  tipo: "origen" | "destino";
  valor: Inmueble;
  set: (patch: Partial<Inmueble>) => void;
  errores: Record<string, string>;
}) {
  const p = tipo;
  return (
    <div className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo
          label={tipo === "origen" ? "Ciudad de origen" : "Ciudad de destino"}
          htmlFor={`${p}-ciudad`}
          error={errores[`${p}.ciudad`]}
        >
          <Input
            id={`${p}-ciudad`}
            value={valor.ciudad}
            onChange={(e) => set({ ciudad: e.target.value })}
            placeholder="Ej: Bogotá"
            autoComplete="address-level2"
          />
        </Campo>
        <Campo
          label={tipo === "origen" ? "Dirección de origen" : "Dirección de destino"}
          htmlFor={`${p}-direccion`}
          error={errores[`${p}.direccion`]}
        >
          <Input
            id={`${p}-direccion`}
            value={valor.direccion}
            onChange={(e) => set({ direccion: e.target.value })}
            placeholder="Ej: Calle 63 # 12-45, Chapinero"
          />
        </Campo>
        <Campo label="Tipo de inmueble" error={errores[`${p}.tipo`]}>
          <Select value={valor.tipo} onValueChange={(v) => set({ tipo: v })}>
            <SelectTrigger aria-label="Tipo de inmueble">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {TIPOS_INMUEBLE.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Campo>
        <Campo label="Piso" htmlFor={`${p}-piso`}>
          <Input
            id={`${p}-piso`}
            value={valor.piso}
            onChange={(e) => set({ piso: e.target.value })}
            placeholder="Ej: 5"
            inputMode="numeric"
          />
        </Campo>
      </div>

      <Opciones
        label="¿Tiene ascensor?"
        value={valor.ascensor}
        onChange={(v) => set({ ascensor: v })}
        options={["Sí", "No", "No aplica"]}
      />
      <Opciones
        label="¿El ascensor permite mudanzas?"
        value={valor.ascensorMudanzas}
        onChange={(v) => set({ ascensorMudanzas: v })}
        options={["Sí", "No", "No sé"]}
      />
      <Opciones
        label="¿El vehículo puede estacionar cerca de la entrada?"
        value={valor.parqueo}
        onChange={(v) => set({ parqueo: v })}
        options={["Sí", "No", "No sé"]}
      />

      {tipo === "origen" && (
        <>
          <Opciones
            label="¿Existen restricciones de horario para realizar la mudanza?"
            value={valor.restriccionHorario || ""}
            onChange={(v) => set({ restriccionHorario: v })}
            options={SI_NO}
          />
          {valor.restriccionHorario === "Sí" && (
            <Campo label="Cuéntanos el horario permitido" htmlFor="detalle-horario">
              <Textarea
                id="detalle-horario"
                value={valor.detalleHorario || ""}
                onChange={(e) => set({ detalleHorario: e.target.value })}
                placeholder="Ej: solo de lunes a viernes entre 8:00 a.m. y 4:00 p.m."
              />
            </Campo>
          )}
        </>
      )}
    </div>
  );
}

export function Wizard({ planInicial }: { planInicial?: string | undefined }) {
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState<FormularioCotizacion>(FORM_VACIO);
  const [fotos, setFotos] = useState<File[]>([]);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [resumen, setResumen] = useState(false);

  // Restaura y conserva la información entre pasos y recargas.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setForm({ ...FORM_VACIO, ...JSON.parse(raw) });
    } catch {
      /* ignora almacenamiento no disponible */
    }
    if (planInicial && ["basico", "plus", "premium"].includes(planInicial)) {
      setForm((f) => ({ ...f, plan: planInicial as FormularioCotizacion["plan"] }));
    }
  }, [planInicial]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* ignora almacenamiento no disponible */
    }
  }, [form]);

  const nacional = useMemo(() => esNacional(form), [form]);
  const inventarioResumen = useMemo(
    () =>
      CATEGORIAS_INVENTARIO.flatMap((cat) =>
        cat.items
          .filter((i) => (form.inventario[i.key] ?? 0) > 0)
          .map((i) => `${form.inventario[i.key]} ${i.label.toLowerCase()}`),
      ),
    [form.inventario],
  );

  const set = (patch: Partial<FormularioCotizacion>) => setForm((f) => ({ ...f, ...patch }));
  const setInmueble = (tipo: "origen" | "destino", patch: Partial<Inmueble>) =>
    setForm((f) => ({ ...f, [tipo]: { ...f[tipo], ...patch } }));

  function validar(actual: number) {
    const e: Record<string, string> = {};
    if (actual === 1) {
      if (!form.origen.ciudad.trim()) e["origen.ciudad"] = "Indícanos la ciudad de origen.";
      if (!form.origen.direccion.trim()) e["origen.direccion"] = "Necesitamos la dirección.";
      if (!form.origen.tipo) e["origen.tipo"] = "Selecciona el tipo de inmueble.";
    }
    if (actual === 2) {
      if (!form.destino.ciudad.trim()) e["destino.ciudad"] = "Indícanos la ciudad de destino.";
      if (!form.destino.direccion.trim()) e["destino.direccion"] = "Necesitamos la dirección.";
      if (!form.destino.tipo) e["destino.tipo"] = "Selecciona el tipo de inmueble.";
    }
    if (actual === 4 && !form.plan) e["plan"] = "Selecciona un plan o pide nuestra recomendación.";
    if (actual === 5) {
      if (!form.nombre.trim()) e["nombre"] = "Escribe tu nombre completo.";
      if (!/^\d{7,15}$/.test(form.telefono.replace(/\D/g, "")))
        e["telefono"] = "Escribe un número de celular válido.";
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e["email"] = "Revisa el correo electrónico.";
      if (!form.autorizacion) e["autorizacion"] = "Necesitamos tu autorización para contactarte.";
    }
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  function avanzar() {
    if (!validar(paso)) {
      toast.error("Revisa los campos marcados para continuar.");
      return;
    }
    if (paso === TOTAL_PASOS) {
      setResumen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPaso((p) => p + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retroceder() {
    if (resumen) {
      setResumen(false);
      return;
    }
    setPaso((p) => Math.max(1, p - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function enviar() {
    setEnviando(true);
    try {
      await enviarCotizacion(form, fotos);
      setEnviado(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* noop */
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-card md:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-mint-deep" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-extrabold">¡Recibimos tu solicitud!</h1>
        <p className="mt-4 text-muted-foreground">
          Gracias por confiar en TRANSMUDAR. Revisaremos la información de tu mudanza para ofrecerte
          la mejor alternativa.
        </p>
        <div className="mt-8 grid gap-3">
          <Button asChild size="lg" className="h-13 font-bold">
            <a href={mensajeWhatsApp(form)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Continuar por WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {!resumen && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>
              Paso {paso} de {TOTAL_PASOS}
            </span>
            <span className="text-muted-foreground">
              {["¿De dónde salimos?", "¿A dónde vamos?", "Inventario", "Servicio", "Contacto"][
                paso - 1
              ]}
            </span>
          </div>
          <Progress value={(paso / TOTAL_PASOS) * 100} className="mt-3 h-2" />
        </div>
      )}

      <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-9">
        {resumen ? (
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Tu mudanza</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Revisa la información antes de enviarla. TRANSMUDAR analizará estos datos para
              preparar tu cotización.
            </p>

            <dl className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">Origen</dt>
                <dd className="mt-1 font-semibold">
                  {form.origen.ciudad} — {form.origen.direccion}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Destino</dt>
                <dd className="mt-1 font-semibold">
                  {form.destino.ciudad} — {form.destino.direccion}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Plan</dt>
                <dd className="mt-1 font-semibold">{NOMBRE_PLAN[form.plan] ?? "Por definir"}</dd>
              </div>
              <div>
                <dt className="eyebrow">Fecha</dt>
                <dd className="mt-1 font-semibold">{form.fechaEstimada || "Por definir"}</dd>
              </div>
            </dl>

            <div className="mt-7">
              <p className="eyebrow">Inventario</p>
              {inventarioResumen.length || form.televisores.length ? (
                <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
                  {inventarioResumen.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                  {form.televisores.map((tv, i) => (
                    <li key={`tv-${i}`}>
                      • {tv.cantidad} televisor(es) {tv.tamano}
                      {tv.enPared === "Sí" ? " (instalado en pared)" : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">Sin elementos registrados.</p>
              )}
            </div>

            <div className="mt-6">
              <p className="eyebrow">Servicios adicionales</p>
              <p className="mt-2 text-sm">
                {form.serviciosAdicionales.length
                  ? form.serviciosAdicionales.join(", ")
                  : "Ninguno."}
              </p>
            </div>

            {form.elementosEspeciales.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow">Elementos especiales</p>
                <p className="mt-2 text-sm">{form.elementosEspeciales.join(", ")}</p>
              </div>
            )}

            {fotos.length > 0 && (
              <p className="mt-6 text-sm text-muted-foreground">
                {fotos.length} fotografía(s) adjunta(s).
              </p>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" size="lg" onClick={retroceder} className="h-13">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Editar información
              </Button>
              <Button size="lg" onClick={enviar} disabled={enviando} className="h-13 font-bold">
                {enviando ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-5 w-5" />
                )}
                Solicitar cotización
              </Button>
            </div>
          </div>
        ) : (
          <>
            {paso === 1 && (
              <>
                <h2 className="text-2xl font-extrabold sm:text-3xl">
                  Cuéntanos dónde comienza tu mudanza
                </h2>
                <div className="mt-7">
                  <PasoInmueble
                    tipo="origen"
                    valor={form.origen}
                    set={(p) => setInmueble("origen", p)}
                    errores={errores}
                  />
                </div>
              </>
            )}

            {paso === 2 && (
              <>
                <h2 className="text-2xl font-extrabold sm:text-3xl">¿A dónde vamos?</h2>
                {nacional && (
                  <p className="mt-4 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-navy">
                    Las ciudades son diferentes: tu mudanza sería posiblemente nacional. Lo tenemos
                    en cuenta en la cotización.
                  </p>
                )}
                <div className="mt-7">
                  <PasoInmueble
                    tipo="destino"
                    valor={form.destino}
                    set={(p) => setInmueble("destino", p)}
                    errores={errores}
                  />
                </div>
              </>
            )}

            {paso === 3 && (
              <>
                <h2 className="text-2xl font-extrabold sm:text-3xl">¿Qué vamos a transportar?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Usa los contadores. No necesitas ser exacto: es para estimar el volumen.
                </p>

                <div className="mt-7 grid gap-8">
                  {CATEGORIAS_INVENTARIO.map((cat) => (
                    <section key={cat.key}>
                      <h3 className="text-sm font-bold tracking-[0.14em] uppercase text-mint-deep">
                        {cat.titulo}
                      </h3>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {cat.items.map((item) => (
                          <Contador
                            key={item.key}
                            label={item.label}
                            value={form.inventario[item.key] ?? 0}
                            onChange={(n) =>
                              set({ inventario: { ...form.inventario, [item.key]: n } })
                            }
                          />
                        ))}
                      </div>
                      {cat.key === "habitaciones" && (
                        <div className="mt-4">
                          <Opciones
                            label="¿Alguna cama requiere desarme?"
                            value={form.camaRequiereDesarme}
                            onChange={(v) => set({ camaRequiereDesarme: v })}
                            options={["Sí", "No", "No sé"]}
                          />
                        </div>
                      )}
                    </section>
                  ))}

                  <section>
                    <h3 className="text-sm font-bold tracking-[0.14em] uppercase text-mint-deep">
                      Televisores
                    </h3>
                    <div className="mt-3 grid gap-4">
                      {form.televisores.map((tv, idx) => (
                        <div key={idx} className="rounded-2xl border border-border p-4">
                          <div className="flex items-center justify-between">
                            <p className="flex items-center gap-2 text-sm font-bold">
                              <Tv className="h-4 w-4 text-mint-deep" aria-hidden="true" />
                              Televisor {idx + 1}
                            </p>
                            <button
                              type="button"
                              aria-label={`Eliminar televisor ${idx + 1}`}
                              onClick={() =>
                                set({ televisores: form.televisores.filter((_, i) => i !== idx) })
                              }
                              className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-4 grid gap-4">
                            <Contador
                              label="Cantidad"
                              value={tv.cantidad}
                              onChange={(n) =>
                                set({
                                  televisores: form.televisores.map((t, i) =>
                                    i === idx ? { ...t, cantidad: n } : t,
                                  ),
                                })
                              }
                            />
                            <Campo label="Tamaño aproximado">
                              <Select
                                value={tv.tamano}
                                onValueChange={(v) =>
                                  set({
                                    televisores: form.televisores.map((t, i) =>
                                      i === idx ? { ...t, tamano: v } : t,
                                    ),
                                  })
                                }
                              >
                                <SelectTrigger aria-label="Tamaño del televisor">
                                  <SelectValue placeholder="Selecciona el tamaño" />
                                </SelectTrigger>
                                <SelectContent>
                                  {TAMANOS_TV.map((t) => (
                                    <SelectItem key={t} value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </Campo>
                            <Opciones
                              label="¿El televisor se encuentra instalado en pared?"
                              value={tv.enPared}
                              onChange={(v) =>
                                set({
                                  televisores: form.televisores.map((t, i) =>
                                    i === idx ? { ...t, enPared: v } : t,
                                  ),
                                })
                              }
                              options={SI_NO}
                            />
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          set({
                            televisores: [
                              ...form.televisores,
                              { cantidad: 1, tamano: "", enPared: "" },
                            ],
                          })
                        }
                      >
                        Agregar televisor
                      </Button>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold tracking-[0.14em] uppercase text-mint-deep">
                      Elementos especiales
                    </h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {ELEMENTOS_ESPECIALES.map((el) => {
                        const id = `esp-${el}`;
                        const marcado = form.elementosEspeciales.includes(el);
                        return (
                          <label
                            key={el}
                            htmlFor={id}
                            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium"
                          >
                            <Checkbox
                              id={id}
                              checked={marcado}
                              onCheckedChange={(c) =>
                                set({
                                  elementosEspeciales: c
                                    ? [...form.elementosEspeciales, el]
                                    : form.elementosEspeciales.filter((x) => x !== el),
                                })
                              }
                            />
                            {el}
                          </label>
                        );
                      })}
                    </div>
                    {form.elementosEspeciales.includes("Otro") && (
                      <div className="mt-4">
                        <Campo label="Descríbenos ese elemento" htmlFor="esp-otro">
                          <Textarea
                            id="esp-otro"
                            value={form.elementoEspecialOtro}
                            onChange={(e) => set({ elementoEspecialOtro: e.target.value })}
                          />
                        </Campo>
                      </div>
                    )}
                  </section>
                </div>
              </>
            )}

            {paso === 4 && (
              <>
                <h2 className="text-2xl font-extrabold sm:text-3xl">
                  ¿Qué nivel de servicio necesitas?
                </h2>
                <div className="mt-6 grid gap-4">
                  {PLANES.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => set({ plan: plan.id })}
                      aria-pressed={form.plan === plan.id}
                      className={cn(
                        "rounded-2xl border p-5 text-left transition-colors",
                        form.plan === plan.id
                          ? "border-navy bg-accent"
                          : "border-border hover:bg-muted",
                      )}
                    >
                      <p className="text-lg font-extrabold">{plan.nombre}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{plan.descripcion}</p>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => set({ plan: "recomiendenme" })}
                    aria-pressed={form.plan === "recomiendenme"}
                    className={cn(
                      "rounded-2xl border border-dashed p-5 text-left text-sm font-semibold transition-colors",
                      form.plan === "recomiendenme"
                        ? "border-navy bg-accent"
                        : "border-border hover:bg-muted",
                    )}
                  >
                    No estoy seguro, quiero que TRANSMUDAR me recomiende uno.
                  </button>
                </div>
                {errores["plan"] && (
                  <p className="mt-3 text-xs font-medium text-destructive">{errores["plan"]}</p>
                )}

                <div className="mt-8">
                  <h3 className="text-sm font-bold tracking-[0.14em] uppercase text-mint-deep">
                    Servicios adicionales
                  </h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {SERVICIOS_ADICIONALES.map((s) => {
                      const id = `adic-${s}`;
                      return (
                        <label
                          key={s}
                          htmlFor={id}
                          className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium"
                        >
                          <Checkbox
                            id={id}
                            checked={form.serviciosAdicionales.includes(s)}
                            onCheckedChange={(c) =>
                              set({
                                serviciosAdicionales: c
                                  ? [...form.serviciosAdicionales, s]
                                  : form.serviciosAdicionales.filter((x) => x !== s),
                              })
                            }
                          />
                          {s}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <Campo label="Fecha estimada de la mudanza" htmlFor="fecha">
                    <Input
                      id="fecha"
                      type="date"
                      value={form.fechaEstimada}
                      onChange={(e) => set({ fechaEstimada: e.target.value })}
                    />
                  </Campo>
                  <Opciones
                    label="Horario preferido"
                    value={form.horarioPreferido}
                    onChange={(v) => set({ horarioPreferido: v })}
                    options={["Mañana", "Tarde", "Por definir"]}
                  />
                </div>
              </>
            )}

            {paso === 5 && (
              <>
                <h2 className="text-2xl font-extrabold sm:text-3xl">Ya casi terminamos</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Las fotos nos ayudan a conocer mejor el volumen de tu mudanza y darte una
                  cotización más precisa.
                </p>

                <div className="mt-6">
                  <Label
                    htmlFor="fotos"
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/40 px-6 py-9 text-center"
                  >
                    <Camera className="h-7 w-7 text-mint-deep" aria-hidden="true" />
                    <span className="text-sm font-semibold">Agregar fotografías</span>
                    <span className="text-xs text-muted-foreground">
                      Desde la cámara, la galería o tu computador
                    </span>
                  </Label>
                  <input
                    id="fotos"
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => setFotos((prev) => [...prev, ...Array.from(e.target.files ?? [])])}
                  />
                  {fotos.length > 0 && (
                    <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {fotos.map((f, i) => (
                        <li key={`${f.name}-${i}`} className="relative">
                          <img
                            src={URL.createObjectURL(f)}
                            alt={`Fotografía adjunta ${i + 1}`}
                            className="aspect-square w-full rounded-xl object-cover"
                          />
                          <button
                            type="button"
                            aria-label={`Quitar fotografía ${i + 1}`}
                            onClick={() => setFotos(fotos.filter((_, x) => x !== i))}
                            className="absolute -top-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-background shadow-soft"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Campo label="Nombre completo" htmlFor="nombre" error={errores["nombre"]}>
                    <Input
                      id="nombre"
                      value={form.nombre}
                      onChange={(e) => set({ nombre: e.target.value })}
                      autoComplete="name"
                    />
                  </Campo>
                  <Campo label="Número de celular" htmlFor="telefono" error={errores["telefono"]}>
                    <Input
                      id="telefono"
                      type="tel"
                      inputMode="tel"
                      value={form.telefono}
                      onChange={(e) => set({ telefono: e.target.value })}
                      autoComplete="tel"
                      placeholder="Ej: 311 254 3114"
                    />
                  </Campo>
                  <Campo label="WhatsApp (si es diferente)" htmlFor="whatsapp">
                    <Input
                      id="whatsapp"
                      type="tel"
                      inputMode="tel"
                      value={form.whatsapp}
                      onChange={(e) => set({ whatsapp: e.target.value })}
                    />
                  </Campo>
                  <Campo label="Correo electrónico" htmlFor="email" error={errores["email"]}>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set({ email: e.target.value })}
                      autoComplete="email"
                    />
                  </Campo>
                </div>

                <div className="mt-6">
                  <Campo label="Observaciones adicionales" htmlFor="observaciones">
                    <Textarea
                      id="observaciones"
                      value={form.observaciones}
                      onChange={(e) => set({ observaciones: e.target.value })}
                      placeholder="Cuéntanos cualquier detalle que debamos tener en cuenta."
                    />
                  </Campo>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="autorizacion"
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Checkbox
                      id="autorizacion"
                      checked={form.autorizacion}
                      onCheckedChange={(c) => set({ autorizacion: Boolean(c) })}
                      className="mt-0.5"
                    />
                    <span>
                      Autorizo ser contactado por TRANSMUDAR para recibir información sobre esta
                      solicitud de cotización. Consulta la{" "}
                      <Link
                        to="/tratamiento-de-datos"
                        className="font-semibold text-navy underline"
                      >
                        política de tratamiento de datos
                      </Link>
                      .
                    </span>
                  </label>
                  {errores["autorizacion"] && (
                    <p className="mt-2 text-xs font-medium text-destructive">
                      {errores["autorizacion"]}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button
                variant="outline"
                size="lg"
                onClick={retroceder}
                disabled={paso === 1}
                className="h-13"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Atrás
              </Button>
              <Button size="lg" onClick={avanzar} className="h-13 font-bold">
                {paso === TOTAL_PASOS ? "Ver resumen" : "Continuar"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
