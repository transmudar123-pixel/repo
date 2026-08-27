import { Link } from "@tanstack/react-router";
import { Check, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { PLANES } from "@/lib/planes";
import { cn } from "@/lib/utils";

export function Planes() {
  return (
    <section id="planes" className="section-y">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Elige cómo quieres mudarte</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Una mudanza para cada necesidad
          </h2>
          <p className="mt-4 text-muted-foreground">
            Desde el transporte esencial hasta un servicio completo de empaque, protección e
            instalación.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
          {PLANES.map((plan, i) => {
            const isPlus = plan.id === "plus";
            const isPremium = plan.id === "premium";
            return (
              <Reveal
                as="article"
                key={plan.id}
                delay={i * 100}
                className={cn(
                  "flex h-full flex-col rounded-3xl border bg-card p-7 shadow-card transition-transform duration-300 hover:-translate-y-1",
                  isPlus && "border-mint-deep lg:-mt-4 lg:p-9 lg:shadow-lift",
                  isPremium && "border-navy/25 bg-navy text-primary-foreground",
                  !isPlus && !isPremium && "border-border",
                )}
              >
                {plan.destacado && (
                  <span
                    className={cn(
                      "mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-[0.12em] uppercase",
                      isPlus ? "bg-mint-deep text-white" : "bg-secondary text-navy",
                    )}
                  >
                    {isPlus ? (
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {plan.destacado}
                  </span>
                )}

                <h3 className={cn("text-2xl font-extrabold", isPlus && "lg:text-3xl")}>
                  {plan.nombre}
                </h3>
                <p
                  className={cn(
                    "mt-3 text-sm",
                    isPremium ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {plan.descripcion}
                </p>

                <p
                  className={cn(
                    "mt-6 text-xs font-bold tracking-[0.12em] uppercase",
                    isPremium ? "text-secondary" : "text-mint-deep",
                  )}
                >
                  {plan.incluyeTitulo}
                </p>
                <ul className="mt-3 flex-1 space-y-2.5 text-sm">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          isPremium ? "text-secondary" : "text-mint-deep",
                        )}
                        aria-hidden="true"
                      />
                      <span className={isPremium ? "text-primary-foreground/90" : undefined}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  variant={isPremium ? "secondary" : isPlus ? "default" : "outline"}
                  className="mt-7 h-12 w-full font-bold"
                >
                  <Link to="/cotizar" search={{ plan: plan.id }}>
                    {plan.cta}
                  </Link>
                </Button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
