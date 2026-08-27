# Rediseño del footer: quitar logo y redistribuir información

## Objetivo
Eliminar el bloque del logo del footer actual y reorganizar el contacto, enlaces y legal para que el pie se sienta limpio, equilibrado y mantenga la esencia profesional y amigable del sitio.

## Estado actual
- `src/components/site/Footer.tsx` tiene tres columnas en el pie:
  1. Logo de TRANSMUDAR + descripción corta.
  2. Contacto (teléfono, WhatsApp, Instagram, correo).
  3. Enlaces de página y legal.
- El fondo es azul oscuro (`bg-navy`) con texto claro.
- El logo se muestra con fondo secundario redondeado (`bg-secondary p-2`).

## Cambios propuestos

### 1. Quitar el bloque del logo
- Eliminar la imagen del logo y el párrafo descriptivo de la primera columna.
- No reemplazar el logo por otro elemento; liberar ese espacio para redistribuir el contenido.

### 2. Redistribuir el footer en tres bloques horizontales
Mantener el contenedor `container-page` y el fondo azul oscuro. Nueva estructura de columnas en escritorio:

```text
| Contacto directo | Navegación rápida | Legal |
```

- **Contacto directo:** teléfono clickeable, botones/iconos de WhatsApp, Instagram y correo con sus etiquetas, manteniendo los círculos de acción actuales.
- **Navegación rápida:** enlaces de `NAV` (Inicio, Servicios, Planes, Galería, ¿Cómo funciona?, FAQ, Contacto).
- **Legal:** Política de privacidad, Tratamiento de datos, Términos y condiciones.

En móvil, las tres columnas se apilan verticalmente con el mismo orden.

### 3. Añadir una fila superior de "marca" sin logo
- Justo antes de las columnas, agregar una fila centrada con el nombre `TRANSMUDAR` en tipografía display y el tagline "Servicio de mudanzas".
- Esto mantiene presencia de marca en el pie sin depender del logo visual.

### 4. Mantener la franja inferior de copyright
- Conservar la línea divisoria y el texto de copyright con el año actual y la ubicación.

### 5. Ajustes visuales menores
- Asegurar que los iconos sociales mantengan el mismo tamaño, hover y accesibilidad.
- Revisar que no queden imports sin usar (logo, `Mail`, etc.) después del cambio.
- Verificar que el contraste y los espaciados sigan los tokens del sistema de diseño.

## Archivos a modificar
- `src/components/site/Footer.tsx`

## Criterios de aceptación
- El logo ya no aparece en el footer.
- La información de contacto, navegación y legal está distribuida en tres columnas claras.
- El nombre de marca sigue visible en el pie de forma sutil.
- El diseño se ve bien en escritorio y móvil.
- El build compila sin errores.
