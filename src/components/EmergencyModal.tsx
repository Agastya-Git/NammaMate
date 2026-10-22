import { useState } from 'react';
import { PhoneCall, AlertTriangle, X, Volume2, ShieldAlert } from 'lucide-react';

type EmergencyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type EmergencyPhrase = {
  kannada: string;
  transliteration: string;
  english: string;
};

const EMERGENCY_PHRASES: EmergencyPhrase[] = [
  {
    kannada: 'ನನಗೆ ಸಹಾಯ ಮಾಡಿ! (Help ಮಾಡಿ)',
    transliteration: 'Nanage sahaya maadi! (Help maadi)',
    english: 'Please help me!',
  },
  {
    kannada: 'ಇಲ್ಲಿ ಅಪಘಾತ ಆಗಿದೆ!',
    transliteration: 'Illi apaghaatha aagide!',
    english: 'There has been an accident here!',
  },
  {
    kannada: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗೆ ಕರ್ಕೊಂಡು ಹೋಗಿ!',
    transliteration: 'Hatthirada aaspathrege karkondu hogi!',
    english: 'Take me to the nearest hospital!',
  },
  {
    kannada: 'ನನ್ನ ಬ್ಯಾಗ್ / ಫೋನ್ ಕಳೆದುಹೋಗಿದೆ!',
    transliteration: 'Nanna bag / phone kaledhuhogide!',
    english: 'My bag / phone is lost or stolen!',
  },
  {
    kannada: 'ಪೊಲೀಸ್ ಸ್ಟೇಷನ್ ಎಲ್ಲಿದೆ?',
    transliteration: 'Police station ellide?',
    english: 'Where is the nearest police station?',
  },
];

const HELPLINES = [
  { name: 'Karnataka All-in-One Emergency', number: '112', desc: 'Police, Fire, Quick response' },
  { name: 'Ambulance & Medical', number: '108', desc: 'Emergency healthcare response' },
  { name: 'Women Safety Helpline', number: '1091', desc: 'Bengaluru / Karnataka Women Safety' },
  { name: 'Namma Metro Helpline', number: '1800-425-12345', desc: 'BMRCL Transit Help' },
];

export function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const speak = (phrase: EmergencyPhrase, idx: number) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.kannada);
    utterance.lang = 'kn-IN';
    utterance.rate = 0.85;
    utterance.onstart = () => setPlayingIdx(idx);
    utterance.onend = () => setPlayingIdx(null);
    utterance.onerror = () => setPlayingIdx(null);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-warm-100 rounded-3xl shadow-2xl border-2 border-red-500/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-red-700 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-yellow-300" />
            <div>
              <h3 className="font-bold text-base leading-tight">Karnataka Emergency & SOS</h3>
              <p className="text-xs text-red-100">One-tap phrases and verified helplines</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-red-800/80 hover:bg-red-800 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Audio Emergency Phrases */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-forest-800 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Essential Distress Phrases (Tap to Speak)
            </h4>
            <div className="space-y-2.5">
              {EMERGENCY_PHRASES.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-warm-300 hover:border-red-300 transition-all shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <p className="kannada font-bold text-base text-forest-900 leading-snug">
                      {item.kannada}
                    </p>
                    <p className="text-xs font-semibold text-warm-600">{item.transliteration}</p>
                    <p className="text-xs text-forest-700 font-medium">{item.english}</p>
                  </div>
                  <button
                    onClick={() => speak(item, idx)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-95 ${
                      playingIdx === idx
                        ? 'bg-red-600 text-white ring-4 ring-red-200'
                        : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Helplines */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-forest-800 mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              Official Karnataka Helplines
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HELPLINES.map((h, i) => (
                <a
                  key={i}
                  href={`tel:${h.number.replace(/-/g, '')}`}
                  className="flex items-center justify-between p-3 bg-forest-50 hover:bg-forest-100 border border-forest-200 rounded-2xl transition-colors group"
                >
                  <div>
                    <p className="text-xs font-bold text-forest-900 group-hover:text-forest-700">
                      {h.name}
                    </p>
                    <p className="text-[11px] text-warm-600">{h.desc}</p>
                  </div>
                  <span className="font-extrabold text-sm text-forest-800 bg-white px-2.5 py-1 rounded-xl shadow-xs border border-forest-200">
                    {h.number}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-warm-200/60 border-t border-warm-300 text-center text-xs text-warm-600 shrink-0">
          Stay calm • These phrases are understood by all first responders in Karnataka
        </div>
      </div>
    </div>
  );
}
