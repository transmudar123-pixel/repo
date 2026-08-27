import { useEffect, useState } from "react";

/**
 * Observa las secciones de la página y devuelve el id de la que se está viendo.
 */
export function useSeccionActiva(ids: string[], enabled = true) {
  const [activa, setActiva] = useState<string>("");

  useEffect(() => {
    if (!enabled) {
      setActiva("");
      return;
    }

    const elementos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .sort((a, b) => a.offsetTop - b.offsetTop);

    if (elementos.length === 0) return;

    const calcular = () => {
      const linea = window.scrollY + 220;
      let actual = "";
      for (const el of elementos) {
        if (el.offsetTop <= linea) actual = el.id;
      }
      // Si estamos al final de la página, marcar la última sección visible
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 24) {
        const ultima = elementos[elementos.length - 1];
        if (ultima) actual = ultima.id;
      }
      if (window.scrollY < 120) actual = elementos[0]?.id ?? "";
      setActiva(actual);
    };

    calcular();
    window.addEventListener("scroll", calcular, { passive: true });
    window.addEventListener("resize", calcular);
    return () => {
      window.removeEventListener("scroll", calcular);
      window.removeEventListener("resize", calcular);
    };
  }, [enabled, ids.join("|")]);

  return activa;
}
