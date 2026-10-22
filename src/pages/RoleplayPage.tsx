import { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  Trophy,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Mic,
} from 'lucide-react';
import {
  SCENARIOS,
  type Scenario,
  type DialogueStep,
  type DialogueOption,
} from '@/lib/roleplayData';
import { evaluateKannadaSpeech, isSpeechRecognitionSupported, type SpeechResult } from '@/lib/speechCoach';

type RoleplayPageProps = {
  onBack: () => void;
};

export function RoleplayPage({ onBack }: RoleplayPageProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [chosenOptions, setChosenOptions] = useState<DialogueOption[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [stepFinished, setStepFinished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  // Speech practice state for roleplay
  const [isListening, setIsListening] = useState(false);
  const [micSpeechResult, setMicSpeechResult] = useState<SpeechResult | null>(null);

  const speak = (kannadaText: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(kannadaText);
    utterance.lang = 'kn-IN';
    utterance.rate = 0.85;
    utterance.onstart = () => setPlayingVoice(id);
    utterance.onend = () => setPlayingVoice(null);
    utterance.onerror = () => setPlayingVoice(null);
    window.speechSynthesis.speak(utterance);
  };

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentStepIdx(0);
    setChosenOptions([]);
    setTotalScore(0);
    setStepFinished(false);
    setIsCompleted(false);
    setMicSpeechResult(null);

    // Auto-speak the first step after a slight pause
    setTimeout(() => {
      if (scenario.steps[0]) {
        speak(scenario.steps[0].kannada, 'step-0');
      }
    }, 400);
  };

  const handleSelectOption = (option: DialogueOption) => {
    if (stepFinished) return;
    setChosenOptions((prev) => [...prev, option]);
    setTotalScore((prev) => prev + option.score);
    setStepFinished(true);
    setMicSpeechResult(null);
  };

  const handleNextStep = () => {
    if (!selectedScenario) return;
    if (currentStepIdx + 1 < selectedScenario.steps.length) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      setStepFinished(false);
      setMicSpeechResult(null);
      // Auto-speak the next speaker's dialogue
      setTimeout(() => {
        speak(selectedScenario.steps[nextIdx].kannada, `step-${nextIdx}`);
      }, 300);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePracticeMic = (option: DialogueOption) => {
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
    setMicSpeechResult(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const evaluation = evaluateKannadaSpeech(
        transcript,
        option.kannada,
        option.transliteration
      );
      setMicSpeechResult(evaluation);
      setIsListening(false);
      handleSelectOption(option);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // If no scenario chosen, show the scenario selection screen
  if (!selectedScenario) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-24 md:pb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-lime-600" />
            AI Roleplay & Conversation Simulator
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-forest-900 leading-tight">
            Kannada in Action
          </h1>
          <p className="text-warm-600 mt-2 text-base md:text-lg">
            Practice real everyday conversations with simulated locals. Learn what to say,
            earn fluency points, and master street etiquette!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => startScenario(scenario)}
              className="card p-6 cursor-pointer hover:shadow-lift hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-forest-50 text-forest-700">
                    {scenario.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-lime-300 text-forest-800">
                    {scenario.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-forest-800 group-hover:text-forest-600 transition-colors">
                  {scenario.title}
                </h3>
                <p className="kannada text-sm font-semibold text-forest-600 mt-1">
                  {scenario.kannadaTitle}
                </p>
                <p className="text-xs text-warm-600 mt-3 leading-relaxed">
                  {scenario.situationContext}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-warm-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-warm-500">
                  {scenario.steps.length} Conversation Steps
                </span>
                <span className="text-xs font-bold text-forest-800 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Start Dialogue →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Completion screen
  if (isCompleted) {
    const maxScore = selectedScenario.steps.length * 100;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in text-center pb-24">
        <div className="w-20 h-20 rounded-3xl bg-lime-300 text-forest-800 flex items-center justify-center mx-auto mb-6 shadow-lift">
          <Trophy className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase font-extrabold tracking-widest text-forest-600 px-3 py-1 rounded-full bg-forest-100">
          Dialogue Completed!
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold text-forest-900 mt-3 mb-2">
          {percentage >= 90
            ? 'ಸಕ್ಕತ್ ಆಗಿದೆ! (Outstanding!)'
            : percentage >= 70
            ? 'ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! (Very Good!)'
            : 'ಉತ್ತಮ ಪ್ರಯತ್ನ! (Good Attempt!)'}
        </h2>

        <p className="text-warm-600 text-base max-w-md mx-auto mb-6">
          You completed "{selectedScenario.title}" with a fluency rating of{' '}
          <span className="font-bold text-forest-800">{percentage}%</span>.
        </p>

        {/* Scorecard */}
        <div className="bg-white rounded-3xl p-6 border border-warm-200 shadow-sm mb-8 text-left space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-warm-500">
            Cultural Takeaway
          </h4>
          <p className="text-sm text-forest-800 font-medium bg-forest-50 p-4 rounded-2xl border border-forest-100">
            💡 {selectedScenario.culturalTip}
          </p>

          <h4 className="text-xs font-extrabold uppercase tracking-wider text-warm-500 pt-2">
            Key Phrases Mastered
          </h4>
          <div className="space-y-2">
            {chosenOptions.map((opt, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-forest-900">{opt.kannada}</span>
                  <span className="text-warm-600 ml-2">({opt.english})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => startScenario(selectedScenario)}
            className="w-full sm:w-auto btn-secondary !py-3 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Practice Again
          </button>
          <button
            onClick={() => setSelectedScenario(null)}
            className="w-full sm:w-auto btn-accent !py-3"
          >
            Choose Another Scenario
          </button>
        </div>
      </div>
    );
  }

  // Active Dialogue Step
  const step: DialogueStep = selectedScenario.steps[currentStepIdx];
  const lastChosen = stepFinished ? chosenOptions[chosenOptions.length - 1] : null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-28 md:pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedScenario(null)}
          className="flex items-center gap-1.5 text-xs font-semibold text-forest-600 hover:text-forest-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit Dialogue
        </button>
        <span className="text-xs font-bold text-forest-700 bg-warm-200 px-3 py-1 rounded-full">
          Step {currentStepIdx + 1} of {selectedScenario.steps.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-warm-200 overflow-hidden mb-6">
        <div
          className="h-full bg-forest-800 transition-all duration-300"
          style={{
            width: `${((currentStepIdx + (stepFinished ? 1 : 0)) / selectedScenario.steps.length) * 100}%`,
          }}
        />
      </div>

      {/* Scenario header card */}
      <div className="bg-forest-800 text-warm-100 rounded-3xl p-5 mb-6 shadow-md">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-lg text-white">{selectedScenario.title}</h2>
          <span className="text-xs text-lime-300 font-semibold">{selectedScenario.kannadaTitle}</span>
        </div>
        <p className="text-xs text-warm-300 leading-relaxed">{selectedScenario.situationContext}</p>
      </div>

      {/* Conversation timeline */}
      <div className="space-y-6 mb-8">
        {/* Other Person Speaking */}
        <div className="flex items-start gap-3.5 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-warm-200 border border-warm-300 flex items-center justify-center text-2xl shrink-0 shadow-xs">
            {step.avatar}
          </div>
          <div className="flex-1 bg-white rounded-3xl rounded-tl-sm p-4 border border-warm-200 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-forest-900">
                {step.speaker} <span className="font-normal text-warm-500">({step.speakerRole})</span>
              </span>
              <button
                onClick={() => speak(step.kannada, `step-${currentStepIdx}`)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                  playingVoice === `step-${currentStepIdx}`
                    ? 'bg-lime-300 text-forest-800'
                    : 'bg-warm-100 text-forest-600 hover:bg-warm-200'
                }`}
                title="Hear audio"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="kannada text-lg font-bold text-forest-900 mb-0.5">{step.kannada}</p>
            <p className="text-xs font-semibold text-warm-600 mb-1">{step.transliteration}</p>
            <p className="text-xs text-forest-700 font-medium">"{step.english}"</p>
          </div>
        </div>

        {/* User response choices (if not answered yet) */}
        {!stepFinished && (
          <div className="pl-14 space-y-3 animate-fade-in-up">
            <p className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-forest-600" />
              Your turn: Select the best response
            </p>

            {step.options.map((option) => (
              <div
                key={option.id}
                className="group relative bg-white hover:bg-forest-50/60 border border-warm-300 hover:border-forest-600 rounded-2xl p-4 transition-all shadow-xs cursor-pointer"
                onClick={() => handleSelectOption(option)}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex-1">
                    <p className="kannada text-base font-bold text-forest-900 group-hover:text-forest-700">
                      {option.kannada}
                    </p>
                    <p className="text-xs font-medium text-warm-600 mt-0.5">
                      {option.transliteration}
                    </p>
                    <p className="text-xs text-forest-700 mt-1 italic">
                      "{option.english}"
                    </p>
                  </div>

                  {/* Speech button right on option */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePracticeMic(option);
                    }}
                    disabled={isListening}
                    className="w-8 h-8 rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-800 flex items-center justify-center shrink-0 transition-colors"
                    title="Speak this response aloud to answer"
                  >
                    <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse text-red-600' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chosen Response & Feedback (after user chose an option) */}
        {stepFinished && lastChosen && (
          <div className="pl-14 space-y-3 animate-fade-in">
            {/* User message bubble */}
            <div className="bg-forest-800 text-warm-100 rounded-3xl rounded-tr-sm p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-lime-300">You said:</span>
                <button
                  onClick={() => speak(lastChosen.kannada, 'user-reply')}
                  className="w-6 h-6 rounded-lg bg-forest-700 text-warm-200 flex items-center justify-center"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="kannada text-base font-bold text-white mb-0.5">{lastChosen.kannada}</p>
              <p className="text-xs text-warm-300">{lastChosen.transliteration}</p>
            </div>

            {/* AI Feedback card */}
            <div
              className={`rounded-2xl p-4 border text-xs ${
                lastChosen.isRecommended
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 font-bold">
                <span className="flex items-center gap-1.5">
                  {lastChosen.isRecommended ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                  {lastChosen.isRecommended ? 'Excellent Choice! (+100 pts)' : 'Good, but could be better'}
                </span>
                <span className="font-extrabold px-2 py-0.5 rounded-full bg-white/80">
                  +{lastChosen.score} pts
                </span>
              </div>
              <p className="leading-relaxed">{lastChosen.feedback}</p>
            </div>

            {/* Next step button */}
            <div className="pt-2">
              <button onClick={handleNextStep} className="btn-accent w-full justify-center">
                Continue to next step →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
