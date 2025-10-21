# Configuración de IA con Google Gemini

## Obtener API Key

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una API key gratuita
3. Copia la API key

## Configurar el proyecto

1. Crea un archivo `.env.local` en la raíz del proyecto:
```bash
touch .env.local
```

2. Agrega tu API key al archivo:
```
GOOGLE_GENERATIVE_AI_API_KEY=tu_api_key_aqui
```

3. Reinicia el servidor de desarrollo:
```bash
pnpm dev
```

## Cómo funciona

- Cuando completas el cuestionario, la app envía tus respuestas a `/api/recommendations`
- La API usa Google Gemini para generar recomendaciones personalizadas basadas en tus hábitos
- Las recomendaciones se muestran automáticamente con prioridades (critical, high, medium, low, bonus)

## Modelos disponibles

El proyecto usa `gemini-2.5-flash-lite` por defecto (más rápido y eficiente), pero puedes cambiar a otros modelos en `src/app/api/recommendations/route.ts`:

- `gemini-2.5-flash-lite` - Más rápido, ligero y económico (configurado actualmente)
- `gemini-1.5-flash` - Rápido y confiable
- `gemini-1.5-pro` - Más potente pero más lento
- `gemini-2.0-flash-exp` - Experimental

