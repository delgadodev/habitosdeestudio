'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, Sparkles } from 'lucide-react';

export default function HabitsQuiz() {
  const [step, setStep] = useState('intro');
  const [answers, setAnswers] = useState({
    sleep: '',
    social: '',
    study: '',
  });
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const questions = [
    {
      id: 'sleep',
      question: '¿Cuántas horas dormís?',
      icon: '💤',
      options: [
        { value: 'menos-6', label: 'Menos de 6 horas' },
        { value: '6-7', label: '6-7 horas' },
        { value: '7-8', label: '7-8 horas' },
        { value: 'mas-8', label: 'Más de 8 horas' },
      ],
    },
    {
      id: 'social',
      question: '¿Cuánto tiempo pasás en redes?',
      icon: '📱',
      options: [
        { value: 'menos-1', label: 'Menos de 1 hora' },
        { value: '1-3', label: '1-3 horas' },
        { value: '3-5', label: '3-5 horas' },
        { value: 'mas-5', label: 'Más de 5 horas' },
      ],
    },
    {
      id: 'study',
      question: '¿Cuánto estudiás por día?',
      icon: '📚',
      options: [
        { value: 'menos-1', label: 'Menos de 1 hora' },
        { value: '1-2', label: '1-2 horas' },
        { value: '2-4', label: '2-4 horas' },
        { value: 'mas-4', label: 'Más de 4 horas' },
      ],
    },
  ];

  const getResult = () => {
    const sleepScore = answers.sleep === '7-8' || answers.sleep === 'mas-8' ? 1 : 0;
    const socialScore = answers.social === 'menos-1' || answers.social === '1-3' ? 1 : 0;
    const studyScore = answers.study === '2-4' || answers.study === 'mas-4' ? 1 : 0;
    const totalScore = sleepScore + socialScore + studyScore;

    const recommendations = [];

    // Recomendaciones personalizadas basadas en IA
    if (answers.sleep === 'menos-6') {
      recommendations.push({
        area: 'Sueño',
        icon: '😴',
        advice:
          'Dormís muy poco. La falta de sueño afecta tu memoria y concentración. Intentá acostarte 30 minutos más temprano cada día.',
        priority: 'high',
      });
    } else if (answers.sleep === '6-7') {
      recommendations.push({
        area: 'Sueño',
        icon: '💤',
        advice:
          'Estás cerca del objetivo. Intentá llegar a 7-8 horas para optimizar tu rendimiento cognitivo y retención de información.',
        priority: 'medium',
      });
    } else {
      recommendations.push({
        area: 'Sueño',
        icon: '✨',
        advice:
          '¡Excelente! Tu sueño está en el rango ideal. Esto favorece la consolidación de la memoria y el aprendizaje.',
        priority: 'low',
      });
    }

    if (answers.social === 'mas-5') {
      recommendations.push({
        area: 'Redes Sociales',
        icon: '📵',
        advice:
          'Más de 5 horas en redes es mucho. Probá la técnica Pomodoro: 25 min sin distracciones, 5 min de descanso. Usá apps bloqueadoras.',
        priority: 'high',
      });
    } else if (answers.social === '3-5') {
      recommendations.push({
        area: 'Redes Sociales',
        icon: '⏰',
        advice:
          'Tu tiempo en redes es alto. Establecé horarios específicos para revisar redes y activá el modo "No molestar" al estudiar.',
        priority: 'medium',
      });
    } else if (answers.social === '1-3') {
      recommendations.push({
        area: 'Redes Sociales',
        icon: '👍',
        advice:
          'Buen balance. Mantené este ritmo y considerá usar temporizadores para evitar que se extienda el tiempo.',
        priority: 'low',
      });
    } else {
      recommendations.push({
        area: 'Redes Sociales',
        icon: '🌟',
        advice:
          '¡Impresionante autocontrol! Tu uso mínimo de redes te permite mayor concentración y productividad.',
        priority: 'low',
      });
    }

    if (answers.study === 'menos-1') {
      recommendations.push({
        area: 'Estudio',
        icon: '📖',
        advice:
          'Tu tiempo de estudio es bajo. Empezá con sesiones cortas de 30 min. La constancia es más importante que la cantidad.',
        priority: 'high',
      });
    } else if (answers.study === '1-2') {
      recommendations.push({
        area: 'Estudio',
        icon: '📚',
        advice:
          'Buen comienzo. Para mejorar la retención, distribuí el estudio en bloques de 45 min con pausas de 10 min.',
        priority: 'medium',
      });
    } else {
      recommendations.push({
        area: 'Estudio',
        icon: '🎯',
        advice:
          '¡Gran dedicación! Asegurate de hacer pausas activas cada hora y variar las técnicas de estudio para mejor retención.',
        priority: 'low',
      });
    }

    // Recomendación extra basada en el perfil completo
    if (totalScore === 3) {
      recommendations.push({
        area: 'Bonus',
        icon: '🚀',
        advice:
          'Tus hábitos son excelentes. Considerá técnicas avanzadas como el método Feynman o mapas mentales para llevar tu aprendizaje al siguiente nivel.',
        priority: 'bonus',
      });
    } else if (sleepScore === 0 && socialScore === 0) {
      recommendations.push({
        area: 'Prioridad',
        icon: '⚠️',
        advice:
          'El sueño insuficiente y el exceso de redes son una combinación crítica. Empezá por mejorar tu higiene del sueño: sin pantallas 1 hora antes de dormir.',
        priority: 'critical',
      });
    }

    let result;
    if (totalScore === 3) {
      result = {
        icon: '🧠',
        title: 'Eficiente',
        description: 'Tenés hábitos muy saludables. Tu rutina está equilibrada y optimizada para el aprendizaje.',
        color: 'from-green-500 to-emerald-600',
      };
    } else if (totalScore === 2) {
      result = {
        icon: '💤',
        title: 'Dormilón pero distraído',
        description: 'Dormís bien, pero hay áreas donde podés mejorar tu concentración y gestión del tiempo.',
        color: 'from-blue-500 to-cyan-600',
      };
    } else if (answers.social === 'mas-5' || answers.social === '3-5') {
      result = {
        icon: '📱',
        title: 'En modo multitasking',
        description: 'Pasás bastante tiempo en redes. Intentá reducir distracciones para mejorar tu enfoque.',
        color: 'from-orange-500 to-amber-600',
      };
    } else {
      result = {
        icon: '⚡',
        title: 'En desarrollo',
        description: 'Hay oportunidad para mejorar tus hábitos. Pequeños cambios pueden hacer una gran diferencia.',
        color: 'from-purple-500 to-pink-600',
      };
    }

    return { ...result, recommendations };
  };

  const currentQuestion = questions.find((q) => !answers[q.id as keyof typeof answers]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleStart = () => {
    setStep('quiz');
  };

  const handleRestart = () => {
    setAnswers({ sleep: '', social: '', study: '' });
    setAiRecommendations([]);
    setIsLoadingAI(false);
    setStep('intro');
  };

  const allAnswered = Object.values(answers).every((a) => a !== '');

  // Generar recomendaciones con IA cuando se completan todas las respuestas
  useEffect(() => {
    const generateRecommendations = async () => {
      if (allAnswered && aiRecommendations.length === 0 && !isLoadingAI) {
        setIsLoadingAI(true);
        try {
          const response = await fetch('/api/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers }),
          });

          const data = await response.json();
          if (data.recommendations) {
            setAiRecommendations(data.recommendations);
          }
        } catch (error) {
          console.error('Error al generar recomendaciones:', error);
        } finally {
          setIsLoadingAI(false);
        }
      }
    };

    generateRecommendations();
  }, [allAnswered, aiRecommendations.length, isLoadingAI, answers]);

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="text-center">
            <div className="mb-6 text-6xl">🎯</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Conocé tus hábitos</h1>
            <p className="text-xl text-white/90 mb-8">Un pequeño test para entender tu rutina diaria</p>
            <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Te haremos 3 preguntas rápidas sobre:
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-2xl">💤</span>
                  <span>Tus horas de sueño</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-2xl">📱</span>
                  <span>Tu tiempo en redes sociales</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-2xl">📚</span>
                  <span>Tu tiempo de estudio</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleStart}
              className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg flex items-center gap-2 mx-auto"
            >
              Comenzar test
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'quiz' && !allAnswered && currentQuestion) {
    const answeredCount = Object.values(answers).filter((a) => a !== '').length;
    const progress = (answeredCount / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="mb-6">
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div className="bg-white h-full transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-white/70 text-sm mt-2 text-center">
              Pregunta {answeredCount + 1} de {questions.length}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{currentQuestion.icon}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{currentQuestion.question}</h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className="w-full bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 rounded-2xl p-6 text-white text-lg font-medium transition-all hover:scale-105"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (allAnswered) {
    const result = getResult();

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-bounce">{result.icon}</div>
            <div className={`inline-block bg-gradient-to-r ${result.color} text-white px-6 py-3 rounded-full font-bold text-2xl mb-4 shadow-lg`}>
              {result.title}
            </div>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">{result.description}</p>

            <div className="bg-white/5 rounded-2xl p-6 mb-8">
              <h3 className="text-white font-semibold mb-4 text-lg">Tus respuestas:</h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center text-white/80">
                  <span>💤 Horas de sueño:</span>
                  <span className="font-medium">{questions[0].options.find((o) => o.value === answers.sleep)?.label}</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>📱 Tiempo en redes:</span>
                  <span className="font-medium">{questions[1].options.find((o) => o.value === answers.social)?.label}</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>📚 Tiempo de estudio:</span>
                  <span className="font-medium">{questions[2].options.find((o) => o.value === answers.study)?.label}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-yellow-300" size={32} />
                <h3 className="text-white font-bold text-2xl">Recomendaciones con IA</h3>
              </div>

              {isLoadingAI && aiRecommendations.length === 0 ? (
                <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin">
                      <Sparkles className="text-yellow-300" size={48} />
                    </div>
                    <p className="text-white text-lg">Generando recomendaciones personalizadas con IA...</p>
                  </div>
                </div>
              ) : aiRecommendations.length > 0 ? (
                <div className="space-y-4">
                  {aiRecommendations.map((rec, index) => {
                    const priorityColors = {
                      critical: 'bg-red-500/20 border-red-400/50',
                      high: 'bg-orange-500/20 border-orange-400/50',
                      medium: 'bg-yellow-500/20 border-yellow-400/50',
                      low: 'bg-green-500/20 border-green-400/50',
                      bonus: 'bg-purple-500/20 border-purple-400/50',
                    };

                    return (
                      <div key={index} className={`${priorityColors[rec.priority as keyof typeof priorityColors]} border-2 rounded-2xl p-5 backdrop-blur-sm`}>
                        <div className="flex items-start gap-3">
                          <div className="text-3xl flex-shrink-0">{rec.icon}</div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-2">{rec.area}</h4>
                            <p className="text-white/90 text-sm leading-relaxed">{rec.advice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {result.recommendations.map((rec, index) => {
                    const priorityColors = {
                      critical: 'bg-red-500/20 border-red-400/50',
                      high: 'bg-orange-500/20 border-orange-400/50',
                      medium: 'bg-yellow-500/20 border-yellow-400/50',
                      low: 'bg-green-500/20 border-green-400/50',
                      bonus: 'bg-purple-500/20 border-purple-400/50',
                    };

                    return (
                      <div key={index} className={`${priorityColors[rec.priority as keyof typeof priorityColors]} border-2 rounded-2xl p-5 backdrop-blur-sm`}>
                        <div className="flex items-start gap-3">
                          <div className="text-3xl flex-shrink-0">{rec.icon}</div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-2">{rec.area}</h4>
                            <p className="text-white/90 text-sm leading-relaxed">{rec.advice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={handleRestart}
              className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={24} />
              Volver a empezar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
