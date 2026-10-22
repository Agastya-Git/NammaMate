import { useState, useEffect } from 'react';
import { Volume2, X, Copy, Check, Mic, Sparkles } from 'lucide-react';
import type { Phrase } from '@/lib/supabase';
import { evaluateKannadaSpeech, isSpeechRecognitionSupported, type SpeechResult } from '@/lib/speechCoach';

type StreetModeModalProps = {
  phrase: Phrase | null;
  onClose: () => void;
};

export function StreetModeModal({ phrase, onClose }: StreetModeModalProps) {
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.8);
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState<SpeechResult | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setSpeechResult(null);
    setIsListening(false);
  }, [phrase]);

  if (!phrase) return null;

  const speak = (rate = speechRate) => {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${phrase.kannada} (${phrase.transliteration}) - ${phrase.english}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartListening = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('Speech Recognition is not supported on this browser. Try Chrome or Edge.');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRec();
    recognition.lang = 'kn-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setSpeechResult(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const evaluation = evaluateKannadaSpeech(transcript, phrase.kannada, phrase.transliteration);
      setSpeechResult(evaluation);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-warm-100 rounded-3xl shadow-2xl border-2 border-forest-700/20 overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-forest-800 text-warm-100">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-lime-300 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold text-lime-300">
              Street Mode / Driver Card
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-forest-700 hover:bg-forest-600 text-warm-200 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Content with Large Typography */}
        <div className="p-6 md:p-8 text-center flex flex-col items-center">
          <span className="inline-block px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold mb-4">
            Show this screen to the driver or shopkeeper
          </span>

          {/* Huge Kannada Script */}
          <h2 className="kannada text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest-900 leading-tight tracking-wide mb-3">
            {phrase.kannada}
          </h2>

          {/* Romanized Transliteration */}
          <p className="text-lg md:text-xl font-semibold text-warm-700 mb-2">
            {phrase.transliteration}
          </p>

          {/* English Meaning */}
          <p className="text-base md:text-lg text-forest-600 font-medium mb-6">
            "{phrase.english}"
          </p>

          {phrase.context && (
            <div className="w-full bg-warm-200/70 border border-warm-300/80 rounded-2xl p-3 mb-6 text-xs text-warm-700">
              <span className="font-semibold text-forest-800">Situation Tip: </span>
              {phrase.context}
            </div>
          )}

          {/* Voice Feedback Display if tested */}
          {speechResult && (
            <div
              className={`w-full rounded-2xl p-4 mb-6 text-left border transition-all ${
                speechResult.grade === 'excellent'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : speechResult.grade === 'good'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {speechResult.kannadaPraise}
                </span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-white/80">
                  {speechResult.accuracy}% Match
                </span>
              </div>
              <p className="text-xs mb-1 font-medium">{speechResult.feedbackText}</p>
              <p className="text-[11px] opacity-80">
                You said: <span className="font-semibold">"{speechResult.transcript}"</span>
              </p>
            </div>
          )}

          {/* Audio & Practice Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            {/* Play Audio Button */}
            <button
              onClick={() => speak(speechRate)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95 ${
                playing
                  ? 'bg-lime-400 text-forest-900 ring-4 ring-lime-200'
                  : 'bg-forest-800 text-warm-100 hover:bg-forest-700'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              {playing ? 'Playing...' : 'Play Loud'}
            </button>

            {/* Slow speed toggle */}
            <button
              onClick={() => {
                const nextRate = speechRate === 0.65 ? 0.9 : 0.65;
                setSpeechRate(nextRate);
                speak(nextRate);
              }}
              className="py-3 px-4 rounded-2xl bg-warm-200 hover:bg-warm-300 text-forest-800 font-bold text-xs transition-colors"
            >
              {speechRate === 0.65 ? '⚡ 1.0x Normal' : '🐢 0.7x Slow'}
            </button>

            {/* Pronunciation Mic Test */}
            <button
              onClick={handleStartListening}
              disabled={isListening}
              className={`flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl font-bold text-xs transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-forest-100 text-forest-800 hover:bg-forest-200'
              }`}
            >
              <Mic className="w-4 h-4" />
              {isListening ? 'Listening...' : 'Test Speech'}
            </button>

            {/* Copy button */}
            <button
              onClick={copyToClipboard}
              className="p-3 rounded-2xl bg-warm-200 hover:bg-warm-300 text-forest-700 transition-colors"
              title="Copy phrase"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
