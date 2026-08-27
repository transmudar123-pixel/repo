CREATE TYPE public.estado_solicitud AS ENUM ('nueva','contactado','cotizado','confirmado','finalizado','cancelado');

CREATE TABLE public.solicitudes_cotizacion (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  nombre text NOT NULL,
  telefono text NOT NULL,
  whatsapp text,
  email text,
  origen jsonb NOT NULL DEFAULT '{}'::jsonb,
  destino jsonb NOT NULL DEFAULT '{}'::jsonb,
  es_nacional boolean NOT NULL DEFAULT false,
  inventario jsonb NOT NULL DEFAULT '{}'::jsonb,
  plan text,
  servicios_adicionales text[] NOT NULL DEFAULT '{}',
  fecha_estimada date,
  horario_preferido text,
  observaciones text,
  fotos text[] NOT NULL DEFAULT '{}',
  estado public.estado_solicitud NOT NULL DEFAULT 'nueva'
);

GRANT INSERT ON public.solicitudes_cotizacion TO anon;
GRANT INSERT ON public.solicitudes_cotizacion TO authenticated;
GRANT ALL ON public.solicitudes_cotizacion TO service_role;

ALTER TABLE public.solicitudes_cotizacion ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede enviar una solicitud"
  ON public.solicitudes_cotizacion FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Cualquiera puede adjuntar fotos de cotizacion"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'cotizaciones');