CREATE POLICY "Cualquiera puede subir fotos de cotizacion"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'cotizaciones');