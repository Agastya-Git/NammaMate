import {
  ArrowLeft,
  Volume2,
  Heart,
  Search,
  Sparkles,
  Smartphone,
  ShieldAlert,
  Mic,
  MessageSquare,
  CheckCircle2,
  Compass,
  HelpCircle,
} from 'lucide-react';

type ManualPageProps = {
  onBack: () => void;
  onNavigateHome: () => void;
  onNavigateSituations: () => void;
  onNavigateSearch: () => void;
  onNavigateFavorites: () => void;
  onSituationClick: (slug: string) => void;
};

export function ManualPage({
  onBack,
  onNavigateSituations,
  onNavigateSearch,
}: ManualPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-24 md:pb-16">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-forest-600 hover:text-forest-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 text-forest-800 text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4 text-lime-600" />
          User Guide & Pro Tips
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-forest-900 tracking-tight leading-tight">
          How to Use NammaMate
        </h1>
        <p className="text-warm-600 mt-2 text-base md:text-lg max-w-2xl">
          Everything you need to know to speak Kannada confidently in real-world everyday
          situations across Karnataka.
        </p>
      </div>

      {/* 3-Step Quick Start */}
      <div className="card p-6 md:p-8 mb-10 bg-gradient-to-br from-white to-warm-100/50 border border-warm-200">
        <h2 className="text-lg font-bold text-forest-900 mb-4 flex items-center gap-2">
          <Compass className="w-5 h-5 text-forest-700" />
          Quick Start: 3 Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-2xl bg-white border border-warm-200/80 shadow-xs">
            <span className="w-8 h-8 rounded-xl bg-forest-800 text-lime-300 flex items-center justify-center font-bold text-sm mb-3">
              1
            </span>
            <h3 className="font-bold text-forest-900 text-sm mb-1">Pick a Situation</h3>
            <p className="text-xs text-warm-600 leading-relaxed">
              Choose from Travel, Shopping, Food & Darshinis, Healthcare, or Campus life to find
              exact real-world phrases.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-warm-200/80 shadow-xs">
            <span className="w-8 h-8 rounded-xl bg-forest-800 text-lime-300 flex items-center justify-center font-bold text-sm mb-3">
              2
            </span>
            <h3 className="font-bold text-forest-900 text-sm mb-1">Hear & Practice</h3>
            <p className="text-xs text-warm-600 leading-relaxed">
              Tap the speaker for native pronunciation. Tap the microphone icon to test your speech
              with real-time AI feedback.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-warm-200/80 shadow-xs">
            <span className="w-8 h-8 rounded-xl bg-forest-800 text-lime-300 flex items-center justify-center font-bold text-sm mb-3">
              3
            </span>
            <h3 className="font-bold text-forest-900 text-sm mb-1">Use on the Street</h3>
            <p className="text-xs text-warm-600 leading-relaxed">
              Show the high-contrast <strong>Street Mode</strong> card directly to auto drivers or
              vendors when words escape you!
            </p>
          </div>
        </div>
      </div>

      {/* Feature Walkthrough */}
      <div className="space-y-6 mb-12">
        <h2 className="text-xl font-bold text-forest-900">Core Features Explained</h2>

        {/* Feature 1: Street Mode */}
        <div className="card p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-800 text-lime-300 flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-forest-900 text-base">Street Mode / Driver Card</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-lime-200 text-forest-900 px-2 py-0.5 rounded-full">
                Lifesaver
              </span>
            </div>
            <p className="text-sm text-warm-600 leading-relaxed mb-3">
              When communicating in a loud street or inside an auto, tap <strong>"Show Driver"</strong> on
              any phrase. It displays extra-large Kannada script and plays loud audio, allowing you
              to simply tilt your screen and show it directly to drivers or shopkeepers.
            </p>
            <div className="text-xs font-semibold text-forest-700 bg-forest-50 p-3 rounded-xl border border-forest-100">
              💡 <strong>Tip:</strong> You can also toggle between <strong>0.7x Slow</strong> and{' '}
              <strong>1.0x Normal</strong> speed inside Street Mode.
            </div>
          </div>
        </div>

        {/* Feature 2: Pronunciation Coach */}
        <div className="card p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-800 text-lime-300 flex items-center justify-center shrink-0">
            <Mic className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-forest-900 text-base">AI Pronunciation Coach</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </div>
            <p className="text-sm text-warm-600 leading-relaxed mb-2">
              Want to practice your spoken Kannada before using it? Tap the <strong>Mic icon</strong> on
              any phrase card. Speak the phrase naturally, and the app instantly evaluates your
              phonetic accuracy and awards you an accuracy percentage along with local praise!
            </p>
          </div>
        </div>

        {/* Feature 3: Roleplay Simulator */}
        <div className="card p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-800 text-lime-300 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-forest-900 text-base">
                Kannada in Action (Roleplay Simulator)
              </h3>
            </div>
            <p className="text-sm text-warm-600 leading-relaxed mb-2">
              Select <strong>Roleplay AI</strong> from the navigation bar to practice complete interactive
              conversations: hiring an auto, ordering *By-two coffee* at a Darshini, or bargaining at KR
              Market. You choose how to respond and learn which options are most respectful.
            </p>
          </div>
        </div>

        {/* Feature 4: Tone & Etiquette */}
        <div className="card p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-800 text-lime-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-forest-900 text-base">Politeness & Tone Indicator</h3>
            </div>
            <p className="text-sm text-warm-600 leading-relaxed mb-2">
              In Karnataka, tone is everything. Saying <em>"Banni"</em> (come respectfully) or{' '}
              <em>"Kodi"</em> (give respectfully) earns instant respect. Every phrase has an etiquette
              badge, and you can filter phrase lists by <strong>"✨ Polite & Respectful"</strong> at any time.
            </p>
          </div>
        </div>

        {/* Feature 5: Emergency SOS */}
        <div className="card p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-forest-900 text-base">Emergency SOS</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                Always Accessible
              </span>
            </div>
            <p className="text-sm text-warm-600 leading-relaxed mb-2">
              Tap the red <strong>SOS Help</strong> button in the top bar from anywhere in the app to
              access verified Karnataka helpline dialers (112 Police, 108 Ambulance, 1091 Women Safety)
              and instant spoken emergency phrases.
            </p>
          </div>
        </div>
      </div>

      {/* Pro Tips / Everyday Kannada Hacks */}
      <div className="card p-6 md:p-8 bg-forest-800 text-warm-100 rounded-3xl mb-10 shadow-md">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-lime-300" />
          Everyday Karnataka Hacks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-forest-700/60 border border-forest-600">
            <p className="font-bold text-lime-300 text-sm mb-1">Auto Golden Rule</p>
            <p className="text-warm-200">
              Always state destination first, then politely ask <em>"Meter haaki sir, barteera?"</em>.
              Adding "Sir" and asking "Will you come?" changes the entire dynamic.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-forest-700/60 border border-forest-600">
            <p className="font-bold text-lime-300 text-sm mb-1">Darshini Coffee Rule</p>
            <p className="text-warm-200">
              When with a friend, ask for <em>"By-two coffee"</em>. The barista will serve one steaming
              cup split evenly into two half-cups—an iconic Bengaluru tradition!
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-forest-700/60 border border-forest-600">
            <p className="font-bold text-lime-300 text-sm mb-1">Polite Bargaining</p>
            <p className="text-warm-200">
              Instead of blunt arguments, use <em>"Solpa kammi maadi sir"</em> (Please reduce a little bit,
              sir). Friendly negotiation is respected at local markets.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-forest-700/60 border border-forest-600">
            <p className="font-bold text-lime-300 text-sm mb-1">Offline & Favorites</p>
            <p className="text-warm-200">
              Tap the <strong>Heart icon</strong> on phrases you use daily. They are saved directly to
              your device storage and work 100% offline even without internet!
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="card p-6 md:p-8 mb-10">
        <h3 className="text-lg font-bold text-forest-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-forest-600" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-forest-800">Are my saved favorites kept when I close the app?</h4>
            <p className="text-xs text-warm-600 mt-1">
              Yes, absolutely! Favorites are stored directly in your browser's local storage and synced
              with your unique device ID. When you return or refresh the page, all your favorites remain saved.
            </p>
          </div>
          <div className="border-t border-warm-200 pt-3">
            <h4 className="font-bold text-forest-800">Does NammaMate require internet?</h4>
            <p className="text-xs text-warm-600 mt-1">
              No. All core phrases, audio synthesis, and guide materials are cached directly in the app.
              You can use it inside the Metro tunnel or in areas with zero cell reception.
            </p>
          </div>
          <div className="border-t border-warm-200 pt-3">
            <h4 className="font-bold text-forest-800">How do I find a phrase quickly?</h4>
            <p className="text-xs text-warm-600 mt-1">
              Use the <strong>Search</strong> tab in the navigation bar. You can type in English (e.g.
              "coffee", "ticket", "hospital"), phonetic Kannada ("namaskara"), or Kannada script.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button onClick={onNavigateSituations} className="btn-accent w-full sm:w-auto">
          Explore Everyday Situations →
        </button>
        <button onClick={onNavigateSearch} className="btn-secondary w-full sm:w-auto">
          <Search className="w-4 h-4" />
          Try Search
        </button>
      </div>
    </div>
  );
}
