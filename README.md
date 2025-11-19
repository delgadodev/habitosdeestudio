# Hábitos de Estudio - Sistema de Recomendaciones con IA

Proyecto universitario desarrollado para la materia de **Ciencia de Datos**. Aplicación web que analiza los hábitos de estudio de estudiantes y genera recomendaciones personalizadas utilizando inteligencia artificial.

## 📋 Descripción

Esta aplicación permite a los estudiantes evaluar sus hábitos de estudio mediante un cuestionario interactivo que analiza tres dimensiones clave:

- **💤 Horas de sueño**: Evalúa la calidad del descanso y su impacto en el aprendizaje
- **📱 Tiempo en redes sociales**: Analiza el uso de redes sociales y su efecto en la concentración
- **📚 Tiempo de estudio diario**: Mide la dedicación al estudio y su distribución

### Funcionalidades

1. **Cuestionario interactivo**: Interfaz intuitiva que guía al usuario a través de 3 preguntas sobre sus hábitos diarios
2. **Análisis de datos**: Procesamiento de las respuestas para generar un perfil de hábitos de estudio
3. **Recomendaciones con IA**: Utiliza Google Gemini para generar recomendaciones personalizadas y accionables basadas en las respuestas del usuario
4. **Sistema de priorización**: Clasifica las recomendaciones según su importancia (critical, high, medium, low, bonus)
5. **Visualización de resultados**: Presenta los resultados de forma clara y visual con gradientes y animaciones

## 🎯 Objetivo del Proyecto

Este proyecto demuestra la aplicación de técnicas de **ciencia de datos** y **inteligencia artificial** para:

- Analizar patrones de comportamiento estudiantil
- Generar insights personalizados mediante procesamiento de lenguaje natural
- Aplicar modelos de IA generativa para crear recomendaciones contextualizadas
- Visualizar datos de manera interactiva y comprensible

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño responsivo
- **Google Gemini AI** - Modelo de IA generativa para recomendaciones
- **Vercel AI SDK** - SDK para integración con modelos de IA

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- pnpm (o npm/yarn)

### Pasos

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd habitosdeestudio
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Configurar la API de Google Gemini (ver [SETUP.md](./SETUP.md) para detalles):
   - Crear archivo `.env.local` en la raíz del proyecto
   - Agregar tu API key: `GOOGLE_GENERATIVE_AI_API_KEY=tu_api_key_aqui`

4. Ejecutar en modo desarrollo:
```bash
pnpm dev
```

5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## 📊 Arquitectura de la Aplicación

```
src/
├── app/
│   ├── api/
│   │   └── recommendations/
│   │       └── route.ts          # Endpoint API para generar recomendaciones con IA
│   ├── page.tsx                  # Página principal
│   └── layout.tsx                # Layout de la aplicación
├── components/
│   └── QuestionnaireZone.tsx     # Componente principal del cuestionario
└── types/                        # Definiciones de tipos TypeScript
```

## 🔄 Flujo de la Aplicación

1. **Pantalla de introducción**: Presenta el cuestionario y explica qué se va a evaluar
2. **Cuestionario**: El usuario responde 3 preguntas sobre sus hábitos
3. **Procesamiento**:
   - Análisis local de las respuestas para generar un perfil básico
   - Envío de datos a la API que utiliza Google Gemini para generar recomendaciones personalizadas
4. **Resultados**: Visualización del perfil obtenido y recomendaciones priorizadas

## 🧠 Modelo de IA

La aplicación utiliza **Google Gemini 2.5 Flash Lite** para generar recomendaciones contextualizadas. El modelo recibe las respuestas del usuario y genera recomendaciones estructuradas en formato JSON con:

- Área de mejora identificada
- Consejo específico y accionable
- Nivel de prioridad
- Emoji representativo

## 📝 Notas del Proyecto

- Proyecto académico desarrollado para la materia de **Ciencia de Datos**
- Demuestra la aplicación práctica de IA generativa en análisis de comportamiento estudiantil
- Enfoque en generar insights accionables a partir de datos estructurados

## 📄 Licencia

Este proyecto es de uso académico.
