import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "¿Realizan mudanzas fuera de la ciudad?",
    a: "Sí. TRANSMUDAR presta servicios de mudanza a nivel local y nacional.",
  },
  {
    q: "¿Ustedes empacan los muebles?",
    a: "Sí. El nivel de protección depende del servicio contratado. Los planes Plus y Premium ofrecen alternativas de embalaje adicionales.",
  },
  {
    q: "¿Desarman y vuelven a armar los muebles?",
    a: "El Plan Básico ya contempla arme y desarme de muebles básicos. Para elementos especiales la viabilidad puede revisarse durante la cotización.",
  },
  {
    q: "¿Puedo enviar fotos para recibir una cotización?",
    a: "Sí. El formulario permite adjuntar fotografías para entender mejor el volumen y características de la mudanza.",
  },
  {
    q: "¿Transportan televisores?",
    a: "Sí. Durante la cotización debe indicarse cantidad, tamaño y si se encuentran instalados en pared.",
  },
  {
    q: "¿Pueden trasladar elementos que no caben por las escaleras?",
    a: "TRANSMUDAR cuenta con servicio de movimiento de muebles por fachada. Debe evaluarse previamente cada caso.",
  },
  {
    q: "¿Hacen mudanzas de oficinas?",
    a: "Sí. También realizamos traslados de oficinas y elementos relacionados con eventos.",
  },
  {
    q: "¿Puedo guardar temporalmente mis muebles?",
    a: "TRANSMUDAR también ofrece renta de bodegas. La disponibilidad debe confirmarse directamente.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="section-y">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Resolvemos tus dudas antes de mudarte
          </h2>
          <p className="mt-4 text-muted-foreground">
            Si tu caso es particular, escríbenos por WhatsApp y lo revisamos contigo con calma.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-bold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
