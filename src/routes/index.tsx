import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Beneficios } from "@/components/home/Beneficios";
import { Planes } from "@/components/home/Planes";
import { Comparador } from "@/components/home/Comparador";
import { OtrosServicios } from "@/components/home/OtrosServicios";
import { Galeria } from "@/components/home/Galeria";
import { ComoFunciona } from "@/components/home/ComoFunciona";
import { CtaCotizar } from "@/components/home/CtaCotizar";
import { Testimonios } from "@/components/home/Testimonios";
import { Faq } from "@/components/home/Faq";
import { CtaFinal } from "@/components/home/CtaFinal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRANSMUDAR | Mudanzas seguras y profesionales en Bogotá" },
      {
        name: "description",
        content:
          "Servicio de mudanzas, empaque, transporte, bodegaje y traslado de muebles. Mudanzas locales y nacionales. Cotiza tu mudanza con TRANSMUDAR.",
      },
      { property: "og:title", content: "TRANSMUDAR | Mudanzas seguras y profesionales" },
      {
        property: "og:description",
        content:
          "Protegemos, transportamos e instalamos tus pertenencias. Planes Básico, Plus y Premium para hogares, oficinas y eventos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Beneficios />
      <Planes />
      <Comparador />
      <OtrosServicios />
      <Galeria />
      <ComoFunciona />
      <CtaCotizar />
      <Testimonios />
      <Faq />
      <CtaFinal />
    </>
  );
}
