import { useState } from 'react';
import { Volume2, Heart, Info, Mic, Maximize2, Sparkles } from 'lucide-react';
import type { Phrase } from '@/lib/supabase';
import {
  evaluateKannadaSpeech,
  isSpeechRecognitionSupported,
  type SpeechResult,
} from '@/lib/speechCoach';

type PhraseCardProps = {
  phrase: Phrase;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenStreetMode?: (phrase: Phrase) => void;
};

// Check if phrase is respectful/polite form
function detectTone(phrase: Phrase): 'polite' | 'universal' {
  const text = (phrase.kannada + ' ' + phrase.transliteration).toLowerCase();
  if (
    text.includes('kodi') ||
    text.includes('banni') ||
    text.includes('hogi') ||
    text.includes('maadi') ||
    text.includes('barteera') ||
    text.includes('sir') ||
    text.includes('dhanyavada')
  ) {
    return 'polite';
  }
  return 'universal';
}

export function PhraseCard({
  phrase,
  isFavorite,
  onToggleFavorite,
  onOpenStreetMode,
}: PhraseCardProps) {
  const [playing, setPlaying] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [coachResult, setCoachResult] = useState<SpeechResult | null>(null);

  const tone = detectTone(phrase);

  const speak = (rate = 0.85) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.kannada);
    utterance.lang = 'kn-IN';
    utterance.rate = rate;
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleTestSpeech = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('Speech Recognition is supported in Chrome, Edge, and Android browsers.');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRec();
    recognition.lang = 'kn-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setCoachResult(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const evaluation = evaluateKannadaSpeech(
        transcript,
        phrase.kannada,
        phrase.transliteration
      );
      setCoachResult(evaluation);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="card p-5 hover:shadow-lift hover:-translate-y-0.5 group transition-all relative">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                tone === 'polite'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-warm-200 text-warm-700'
              }`}
            >
              {tone === 'polite' ? '✨ Polite & Respectful' : 'Everyday Standard'}
            </span>
          </div>

          <p className="kannada text-xl font-bold text-forest-800 leading-tight mb-1">
            {phrase.kannada}
          </p>
          <p className="text-sm text-warm-600 font-semibold">{phrase.transliteration}</p>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Audio TTS */}
          <button
            onClick={() => speak(0.85)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 ${
              playing
                ? 'bg-lime-300 text-forest-800'
                : 'bg-forest-50 text-forest-600 hover:bg-forest-100'
            }`}
            title="Listen pronunciation"
            aria-label="Pronounce phrase"
          >
            <Volume2 className="w-4.5 h-4.5" strokeWidth={2} />
          </button>

          {/* Pronunciation Coach */}
          <button
            onClick={handleTestSpeech}
            disabled={isListening}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : coachResult
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-forest-50 text-forest-600 hover:bg-forest-100'
            }`}
            title="Practice speaking (AI Pronunciation Coach)"
            aria-label="Practice speaking"
          >
            <Mic className="w-4.5 h-4.5" strokeWidth={2} />
          </button>

          {/* Street Mode Quick Trigger */}
          {onOpenStreetMode && (
            <button
              onClick={() => onOpenStreetMode(phrase)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 bg-forest-50 text-forest-600 hover:bg-forest-100"
              title="Open Street Mode (Large card for drivers)"
              aria-label="Street mode"
            >
              <Maximize2 className="w-4 h-4" strokeWidth={2} />
            </button>
          )}

          {/* Favorite Toggle */}
          <button
            onClick={() => onToggleFavorite(phrase.id)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 ${
              isFavorite
                ? 'bg-forest-800 text-lime-300'
                : 'bg-forest-50 text-forest-600 hover:bg-forest-100'
            }`}
            aria-label="Toggle favorite"
          >
            <Heart
              className={`w-4.5 h-4.5 ${isFavorite ? 'fill-lime-300' : ''}`}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      {/* Speech Coach Instant Feedback Card */}
      {coachResult && (
        <div
          className={`my-3 p-3 rounded-2xl border text-xs animate-fade-in ${
            coachResult.grade === 'excellent'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : coachResult.grade === 'good'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center justify-between font-bold mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {coachResult.kannadaPraise}
            </span>
            <span className="font-extrabold px-1.5 py-0.5 rounded-full bg-white/80">
              {coachResult.accuracy}% Match
            </span>
          </div>
          <p className="text-[11px] mb-0.5">{coachResult.feedbackText}</p>
          <p className="text-[10px] opacity-75">
            Heard: "{coachResult.transcript}"
          </p>
        </div>
      )}

      {/* English meaning and context */}
      <div className="pt-3 border-t border-warm-200 flex items-center justify-between gap-2">
        <div className="flex-1">
          <p className="text-forest-700 font-medium text-base">{phrase.english}</p>
          {phrase.context && (
            <button
              onClick={() => setShowContext((v) => !v)}
              className="flex items-center gap-1.5 mt-1.5 text-xs text-warm-500 hover:text-forest-500 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showContext ? phrase.context : 'When to use this'}</span>
            </button>
          )}
        </div>

        {onOpenStreetMode && (
          <button
            onClick={() => onOpenStreetMode(phrase)}
            className="text-[11px] font-bold text-forest-600 hover:text-forest-800 shrink-0 bg-warm-200 hover:bg-warm-300 px-2.5 py-1 rounded-xl transition-colors hidden sm:block"
          >
            Show Driver →
          </button>
        )}
      </div>
    </div>
  );
}
