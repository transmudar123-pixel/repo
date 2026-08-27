# TRANSMUDAR — Web oficial

Sitio web de TRANSMUDAR: información de servicios, planes y formulario de
cotización de mudanzas.

## Cómo funciona

Este proyecto se compila como **sitio estático** (HTML/CSS/JS puro, sin
servidor) y se publica automáticamente en **GitHub Pages** cada vez que se
sube un cambio a la rama `main`. El flujo de publicación está en
`.github/workflows/deploy.yml` — no necesitas instalar nada en tu
computador ni ejecutar comandos: GitHub compila y publica por ti.

El sitio queda disponible en:
`https://<tu-usuario>.github.io/Web-Oficial/`

## Formulario de cotización

El formulario guarda las solicitudes directamente en Supabase desde el
navegador (usando la llave pública, sin necesitar servidor). Las políticas
de seguridad (RLS) en Supabase ya permiten que cualquier visitante envíe
una solicitud, pero no permiten leer ni modificar las demás.

Para recibir una notificación (WhatsApp/correo) cada vez que llega una
solicitud nueva, se recomienda configurar un **Database Webhook** en el
panel de Supabase (Database → Webhooks) apuntando a una Web App de Google
Apps Script.

## Fotos de la galería

Las fotos de la galería (`src/lib/fotos.ts`) usan actualmente imágenes
genéricas de marcador de posición (placehold.co) mientras se suben las
fotos reales del proyecto. Para reemplazarlas:

1. Descarga las fotos reales (desde el editor de Lovable, o cualquier
   fuente).
2. Colócalas como archivos reales dentro de `src/assets/fotos/`.
3. Actualiza `src/lib/fotos.ts` para importar esos archivos en vez de usar
   `placeholder(...)`.

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores reales de Supabase
para desarrollo local. En GitHub Pages no se necesitan variables de
entorno en tiempo de ejecución porque el sitio es estático — los valores
`VITE_*` ya quedan incluidos en el build en el momento de compilar.

## Desarrollo local (opcional)

Si quieres correrlo en tu computador, necesitas Node.js:

```sh
npm install
npm run dev
```

Para generar el mismo build que se publica en GitHub Pages:

```sh
npm run build
```

El resultado queda en `dist/client/`.

## Construido con

- TanStack Start (modo estático / prerender)
- TypeScript
- React
- Tailwind CSS
- Supabase
