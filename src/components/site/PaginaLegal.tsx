import type { ReactNode } from "react";

export function PaginaLegal({
  titulo,
  intro,
  children,
}: {
  titulo: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <article className="container-page max-w-3xl py-14 md:py-20">
      <h1 className="text-3xl font-extrabold sm:text-4xl">{titulo}</h1>
      <p className="mt-4 text-muted-foreground">{intro}</p>
      <div className="mt-10 space-y-8 text-sm leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
      <p className="mt-12 text-xs text-muted-foreground">
        Este documento es una versión inicial preparada para el sitio web de TRANSMUDAR y puede
        ajustarse con la revisión legal correspondiente.
      </p>
    </article>
  );
}
