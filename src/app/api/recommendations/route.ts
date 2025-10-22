import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const { answers } = await req.json();

  const prompt = `Eres un experto en productividad y hábitos de estudio. Basándote en las siguientes respuestas de un estudiante, genera recomendaciones personalizadas y prácticas:

Horas de sueño: ${answers.sleep}
Tiempo en redes sociales: ${answers.social}
Tiempo de estudio diario: ${answers.study}

Genera entre 3-5 recomendaciones específicas y accionables. Para cada recomendación:
1. Identifica el área (Sueño, Redes Sociales, Estudio, etc.)
2. Asigna un emoji apropiado
3. Da un consejo específico y práctico
4. Asigna una prioridad (critical, high, medium, low, bonus)

RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO en este formato:
{
  "recommendations": [
    {
      "area": "nombre del área",
      "icon": "emoji",
      "advice": "consejo específico y accionable",
      "priority": "high/medium/low/critical/bonus",
      "language": "Spanish"
    }
  ]
}

Sé conciso pero específico. Los consejos deben ser realistas y aplicables inmediatamente.`;

  try {
    const { text } = await generateText({
      model: google('gemini-2.5-flash-lite'),
      prompt,
    });

    // Limpiar el texto para asegurar que sea JSON válido
    let cleanedText = text.trim();

    // Remover markdown code blocks si existen
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }

    const recommendations = JSON.parse(cleanedText);

    return Response.json(recommendations);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return Response.json(
      { error: 'Error al generar recomendaciones' },
      { status: 500 }
    );
  }
}

