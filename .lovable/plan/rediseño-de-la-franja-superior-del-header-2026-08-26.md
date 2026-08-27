# Rediseño de la franja superior del header

## Objetivo
Transformar la parte superior del sitio (donde hoy está el logo) en una franja verde menta corporativa que muestre el nombre "TRANSMUDAR" a lo ancho y el logo del camión al final, sin perder la navegación por pestañas ni los botones de acción.

## Cambios propuestos

### 1. Franja superior verde menta
- Fondo `bg-mint` en toda la primera fila del header.
- Sin transparencia ni blur en esa fila; el color es sólido para que el nombre resalte.
- La segunda fila de pestañas conserva su fondo actual (blanco/surface) para mantener legibilidad y separación visual.

### 2. Nombre de la empresa a lo largo + logo del camión
- Reemplazar el logo pequeño actual por un bloque de marca horizontal:
  - Texto "TRANSMUDAR" en mayúsculas, tipografía display (`Archivo`), color navy (`text-navy`), con tracking amplio y tamaño grande que ocupe el ancho disponible.
  - Al final del texto, el logo del camión (imagen oficial `logo-transmudar.png`) como icono de marca.
- En escritorio el nombre se centra/estira dentro de la franja; en móvil se reduce el tamaño para que quepa junto a los botones.

### 3. Botones de acción
- Escritorio: botones "Cotiza tu mudanza" y "WhatsApp" se ubican a la derecha de la franja verde, sobre el fondo menta. Se ajustan los estilos para que sigan legibles (variantes que contrasten con el verde).
- Móvil: solo se conserva el menú hamburguesa; los botones de acción pasan al menú desplegable, como hoy.

### 4. Navegación por pestañas
- Se conserva la segunda fila de pestañas tal cual, con scroll horizontal en móvil y resaltado de sección activa.
- Se ajusta el alto total del header si es necesario para que el padding-top del `<main>` (`pt-[124px]`) siga compensando correctamente las dos filas.

### 5. Ajustes de estilo
- Actualizar `src/components/site/Header.tsx` con la nueva estructura de dos filas.
- Si es necesario, agregar utilidades de tamaño de texto responsivo en `src/styles.css`.
- Verificar contraste del texto navy sobre fondo menta.

## Archivos a modificar
- `src/components/site/Header.tsx` — estructura y estilos del header.
- `src/styles.css` — utilidades de texto responsivo si se requieren.
- `src/routes/__root.tsx` — ajustar `pt-[124px]` si el alto del header cambia.

## Criterios de aceptación
- La franja superior se ve completamente verde menta.
- Se lee "TRANSMUDAR" de forma prominente y, al final, aparece el logo del camión.
- Las pestañas siguen funcionando: scroll suave, activación al hacer scroll y en móvil.
- Los botones "Cotiza tu mudanza" y "WhatsApp" siguen visibles/funcionales en escritorio y móvil.
- El sitio no presenta errores de build ni problemas de espaciado con el contenido.
