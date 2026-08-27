# Centrar el bloque de marca en el header

## Objetivo
Centrar horizontalmente el bloque de marca ("TRANSMUDAR" + camión) dentro de la franja verde superior, sin mover los botones de acción de la derecha ni perder la navegación por pestañas.

## Cambios propuestos

### 1. Centrado del bloque de marca
- En `src/components/site/Header.tsx`, convertir la fila verde en un contenedor relativo de tres áreas: izquierda (vacía/reservada), centro (marca) y derecha (botones/menú).
- Posicionar el bloque de marca (`Link` con texto + camión) en el centro absoluto de la franja usando `absolute left-1/2 -translate-x-1/2`.
- Asegurar que el bloque centrado no se solape con los botones de la derecha en escritorio ni con el menú hamburguesa en móvil.

### 2. Conservar botones y menú
- Escritorio: botones "Cotiza tu mudanza" y "WhatsApp" permanecen alineados a la derecha.
- Móvil: solo se muestra el menú hamburguesa a la derecha; la marca centrada queda visible.

### 3. Pestañas y espaciado
- La segunda fila de pestañas se mantiene igual.
- Verificar que el alto total del header no cambie; si cambia, ajustar `pt-[124px]` en `src/routes/__root.tsx`.

## Archivos a modificar
- `src/components/site/Header.tsx` — estructura de la franja superior.
- `src/routes/__root.tsx` — ajuste de `padding-top` solo si es necesario.

## Criterios de aceptación
- El bloque "TRANSMUDAR + camión" aparece centrado en la franja verde.
- Los botones de acción siguen a la derecha en escritorio y el menú hamburguesa en móvil.
- No hay solapamiento entre marca y botones en ningún tamaño de pantalla.
- Las pestañas y el scroll suave siguen funcionando.
- Build sin errores.