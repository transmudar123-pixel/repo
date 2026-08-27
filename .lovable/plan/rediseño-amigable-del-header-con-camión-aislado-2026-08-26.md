# Rediseño amigable del header con camión aislado

## Objetivo
Cambiar la franja superior para que sea más amigable, recupere la esencia del diseño anterior y use solo el camión del logo (sin letras), con el nombre "TRANSMUDAR" al inicio.

## Cambios propuestos

### 1. Crear asset del camión aislado
- Generar una versión del logo oficial (`logo-transmudar.png`) que contenga únicamente el camión, sin el texto "TRANSMUDAR".
- Fondo transparente para que se integre limpiamente sobre el verde menta.
- Guardar el resultado en `src/assets/logo-camion.png`.

### 2. Rediseño de la franja superior
- Mantener el fondo verde menta (`bg-mint`) porque ya identifica la marca, pero suavizar la sensación:
  - Bordes redondeados inferiores (`rounded-b-2xl` o `rounded-b-3xl`) para que la franja no se sienta tan rígida.
  - Sombra sutil para separarla del contenido sin ser pesada.
- Colocar a la izquierda el nombre "TRANSMUDAR" en tipografía display, tamaño mediano-grande, color navy, sin forzarlo a ocupar todo el ancho.
- Justo al lado del texto, el camión aislado como icono de marca.
- A la derecha conservar los botones "Cotiza tu mudanza" y "WhatsApp" en escritorio, y el menú hamburguesa en móvil.

### 3. Recuperar la esencia anterior
- El header vuelve a ser una barra de marca compacta y limpia, no una pancarta que estira el nombre.
- Se mantiene la segunda fila de pestañas para no perder la navegación por secciones.
- En móvil, el nombre y el camión quedan alineados a la izquierda y el menú a la derecha.

### 4. Ajustes de espaciado
- Revisar el alto total del header y, si cambia, ajustar el `padding-top` del `<main>` en `src/routes/__root.tsx` para que el contenido no quede tapado.
- Asegurar que el scroll suave a las secciones siga funcionando con el nuevo alto.

## Archivos a modificar/crear
- `src/assets/logo-camion.png` — nuevo asset con el camión aislado.
- `src/components/site/Header.tsx` — nueva estructura de la franja superior.
- `src/routes/__root.tsx` — ajuste de `padding-top` si es necesario.

## Criterios de aceptación
- La franja superior se ve verde menta con bordes inferiores redondeados.
- A la izquierda se lee "TRANSMUDAR" seguido del camión sin texto.
- El diseño se siente más amigable y menos rígido que la versión anterior.
- Las pestañas, botones y menú móvil siguen funcionando correctamente.
- No hay errores de build ni problemas de espaciado con el contenido.
