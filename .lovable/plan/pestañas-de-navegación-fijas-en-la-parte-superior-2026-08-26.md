# Pestañas de navegación fijas en la parte superior

Convertir el menú superior en una barra de **pestañas** siempre visible, sin cambiar la estructura ni el diseño actual de la página. Cada pestaña lleva a la sección correspondiente de la misma página (Inicio, Servicios, Planes, Galería, ¿Cómo funciona?, Preguntas frecuentes, Contacto).

## Qué se verá

- Debajo del logo y el botón "Cotiza tu mudanza" aparece una barra de pestañas fija al hacer scroll, con separación clara del contenido.
- La pestaña de la sección que se está viendo queda marcada (color azul e indicador inferior), y se actualiza automáticamente al desplazarse.
- Al hacer clic, la página se desliza suavemente hasta la sección, dejando el espacio justo para que el título no quede tapado por el encabezado.
- En móvil y tablet las pestañas se muestran en una fila deslizable horizontalmente (con desvanecido en los bordes), así no se rompe el diseño ni aparece un menú tapando el contenido. El menú hamburguesa se mantiene como alternativa.
- En las páginas internas (Cotizar, páginas legales) las pestañas siguen funcionando: llevan al inicio y luego a la sección.

## Detalles técnicos

- `src/components/site/Header.tsx`: añadir una segunda fila con las pestañas (`role="tablist"` semántico con enlaces), scroll horizontal con `overflow-x-auto` y `snap`, estado activo por scrollspy.
- Nuevo hook `src/hooks/useSeccionActiva.ts` con `IntersectionObserver` sobre los IDs de secciones para resaltar la pestaña activa.
- `src/lib/brand.ts`: mantener `NAV` como única fuente de las pestañas.
- Añadir los `id` que faltan para que todas las pestañas tengan destino: `contacto` en el footer (`src/components/site/Footer.tsx`) e `inicio` en el Hero (`src/components/home/Hero.tsx`).
- Ajustar el desplazamiento con `scroll-margin-top` en las secciones (vía clase utilitaria en `src/styles.css`) para compensar la altura del encabezado con pestañas.
- Revisar el `padding-top` del contenido en `src/routes/__root.tsx` para que el aumento de altura del encabezado no tape el Hero.
