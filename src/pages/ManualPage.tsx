import { ArrowLeft, BookOpen, Mic, Volume2, Heart, Search, Bus, ShoppingBag, Stethoscope, GraduationCap, Sparkles, Home, ArrowRight, Info, Languages, Smartphone, ShieldAlert } from 'lucide-react';

type ManualPageProps = {
  onBack: () => void;
  onNavigateHome: () => void;
  onNavigateSituations: () => void;
  onNavigateSearch: () => void;
  onNavigateFavorites: () => void;
  onSituationClick: (slug: string) => void;
};

type Section = {
  id: string;
  icon: typeof BookOpen;
  title: string;
  subtitle: string;
  items: {
    icon: typeof Mic;
    label: string;
    desc: string;
  }[];
};

const sections: Section[] = [
  {
    id: 'home',
    icon: Home,
    title: 'Home Page',
    subtitle: 'The landing page and starting point of NammaMate.',
    items: [
      {
        icon: Mic,
        label: 'NammaMate Logo',
        desc: 'Appears in the top-left corner (top on mobile). Tap it from anywhere to return to the home page instantly.',
      },
      {
        icon: Sparkles,
        label: 'Hero Headline',
        desc: 'The headline "A little Kannada. A lot more connection." introduces the app purpose: helping you speak and understand Kannada in real everyday situations.',
      },
      {
        icon: ArrowRight,
        label: '"Start a conversation" Button',
        desc: 'The primary green button. Tapping it takes you to the Situations page where you can choose a context like travel or shopping.',
      },
      {
        icon: Mic,
        label: '"Quick essentials" Button',
        desc: 'Tapping this jumps straight to the Quick Essentials phrase collection — universal phrases like hello, thank you, and yes/no.',
      },
      {
        icon: Volume2,
        label: 'Quick Phrases Strip',
        desc: 'Four common Kannada phrases appear just below the hero. Tap any phrase to hear it spoken aloud using your device text-to-speech. Each shows the Kannada script and English meaning side by side.',
      },
      {
        icon: ArrowRight,
        label: '"View all" Link',
        desc: 'Next to the Quick Phrases heading. Opens the full Quick Essentials collection with all 10 everyday phrases.',
      },
      {
        icon: Bus,
        label: 'Situation Cards',
        desc: 'Four large cards — Travel & Transportation, Shopping & Markets, Healthcare, and College & Everyday Life. Each card shows an icon, a short description, and the number of phrases inside. Tap a card to open that collection.',
      },
      {
        icon: BookOpen,
        label: 'How It Works Section',
        desc: 'Three numbered steps that explain the app flow: pick a situation, tap to listen, and save your favorites.',
      },
      {
        icon: ArrowRight,
        label: 'CTA Banner',
        desc: 'A dark green banner at the bottom of the page with an "Explore situations" button — another way to jump to the situations list.',
      },
    ],
  },
  {
    id: 'navigation',
    icon: BookOpen,
    title: 'Navigation Bar',
    subtitle: 'How to move around the app on desktop and mobile.',
    items: [
      {
        icon: Home,
        label: 'Home Button',
        desc: 'Takes you back to the home page. On desktop it appears in the top navigation bar; on mobile it is the leftmost item in the bottom navigation bar.',
      },
      {
        icon: Mic,
        label: 'Situations Button',
        desc: 'Opens the full list of situation categories. This is where you browse all available contexts before diving into specific phrases.',
      },
      {
        icon: Search,
        label: 'Search Button',
        desc: 'Opens the search page where you can type any word — in English, Kannada, or Romanized transliteration — to find matching phrases across all situations.',
      },
      {
        icon: Heart,
        label: 'Favorites Button',
        desc: 'Opens your saved phrases. A small badge next to this button shows how many phrases you have favorited so far.',
      },
      {
        icon: ArrowLeft,
        label: 'Back Button',
        desc: 'On sub-pages (Situations, Phrase pages, Search, Favorites), a "Back" link appears at the top-left to return to the previous page.',
      },
    ],
  },
  {
    id: 'situations',
    icon: Mic,
    title: 'Situations Page',
    subtitle: 'Browse all conversation contexts in one place.',
    items: [
      {
        icon: Bus,
        label: 'Travel & Transportation',
        desc: 'Phrases for navigating buses, auto-rickshaws, taxis, trains, and stations. Ask for directions, check fares, find parking, and tell drivers where to stop.',
      },
      {
        icon: ShoppingBag,
        label: 'Shopping & Markets',
        desc: 'Phrases for asking prices, bargaining, checking if items are fresh, requesting bags, and paying by cash or card at local shops and markets.',
      },
      {
        icon: Stethoscope,
        label: 'Healthcare',
        desc: 'Phrases for describing symptoms (fever, headache, nausea, cold), requesting to see a doctor, asking about medicine prices, booking appointments, and getting dosage instructions.',
      },
      {
        icon: GraduationCap,
        label: 'College & Everyday Life',
        desc: 'Phrases for navigating campus (finding the canteen, library), introducing yourself, asking where someone is from, planning meetups, and everyday social expressions.',
      },
      {
        icon: Sparkles,
        label: 'Quick Essentials (Featured)',
        desc: 'A special highlighted section at the bottom of the Situations page. Contains universal phrases you will need in any situation — greetings, yes, no, sorry, thank you, and telling someone you do not speak Kannada.',
      },
    ],
  },
  {
    id: 'phrases',
    icon: Volume2,
    title: 'Phrase Cards',
    subtitle: 'How to read, listen to, and save each phrase.',
    items: [
      {
        icon: Languages,
        label: 'Kannada Script (top line)',
        desc: 'The top line of each card shows the phrase written in Kannada script. This is what you show to or read for a local Kannada speaker.',
      },
      {
        icon: Mic,
        label: 'Transliteration (second line)',
        desc: 'Below the Kannada script is the same phrase written in English letters representing how it sounds. For example, "Namaskaara" for the Kannada greeting. This helps you pronounce the phrase even if you cannot read Kannada script.',
      },
      {
        icon: Volume2,
        label: 'Speaker Button (right side)',
        desc: 'Tap the speaker icon to hear the phrase spoken aloud. The button turns lime green while audio is playing. The app uses your browser built-in Kannada voice — the speed is slightly slowed (0.85x) so you can hear each syllable clearly. Tap it again to replay.',
      },
      {
        icon: Mic,
        label: 'Pronunciation Coach (Mic Button)',
        desc: 'Tap the microphone icon next to any phrase to practice speaking in Kannada. The AI analyzes your speech in real time, displays an accuracy percentage, and provides encouraging feedback.',
      },
      {
        icon: Smartphone,
        label: 'Street Mode / Driver Card',
        desc: 'Tap "Show Driver" or the expand icon to open a fullscreen, high-contrast display. Shows extra-large Kannada text and loud audio playback so you can show your screen directly to auto drivers or shopkeepers.',
      },
      {
        icon: Heart,
        label: 'Heart Button (right side)',
        desc: 'Tap the heart icon to save a phrase to your Favorites. When saved, the button fills with lime green and the card background turns dark. Tap again to remove it from favorites.',
      },
      {
        icon: BookOpen,
        label: 'English Translation (bottom)',
        desc: 'Below the dividing line is the English meaning of the phrase. This tells you exactly what you are saying in Kannada.',
      },
      {
        icon: Info,
        label: '"When to use this" Hint',
        desc: 'Some phrases have a small info icon with a "When to use this" label. Tap it to reveal a short note explaining the specific situation where that phrase is appropriate — for example, "At the pharmacy" or "On a bus or train". Tap again to hide it.',
      },
    ],
  },
  {
    id: 'roleplay',
    icon: Sparkles,
    title: 'Interactive Roleplay Simulator',
    subtitle: 'Practice real-life Kannada conversations before stepping out.',
    items: [
      {
        icon: Bus,
        label: 'Auto Ride in Bengaluru',
        desc: 'Simulate hiring an auto from the metro station, asking for meter, and paying via UPI.',
      },
      {
        icon: ShoppingBag,
        label: 'Darshini Restaurant Ordering',
        desc: 'Practice ordering classic breakfast staples like masala dosa and by-two filter coffee.',
      },
      {
        icon: Sparkles,
        label: 'Street Market Bargaining',
        desc: 'Learn polite bargaining phrases ("Solpa kammi maadi") for fresh produce at local markets.',
      },
      {
        icon: Stethoscope,
        label: 'Clinic & Pharmacy Dialogue',
        desc: 'Communicate common ailments like fever or headache and understand dosage instructions.',
      },
    ],
  },
  {
    id: 'emergency',
    icon: ShieldAlert,
    title: 'SOS & Helplines',
    subtitle: 'Emergency distress phrases and direct Karnataka dialers.',
    items: [
      {
        icon: Volume2,
        label: 'One-Tap Distress Audio',
        desc: 'Instant audio playback for urgent phrases: "Help maadi", "Accident aagide", and "Hospital-ge thagoli".',
      },
      {
        icon: ShieldAlert,
        label: 'Verified Karnataka Helplines',
        desc: 'Direct tap-to-call links for Police (112), Ambulance (108), Women Safety (1091), and Namma Metro.',
      },
    ],
  },
  {
    id: 'search',
    icon: Search,
    title: 'Search Page',
    subtitle: 'Find any phrase instantly across all situations.',
    items: [
      {
        icon: Search,
        label: 'Search Bar',
        desc: 'A text input at the top of the page. Type any word or partial word. The app searches across three fields simultaneously: English translation, Kannada script, and Romanized transliteration. It also matches situation category names.',
      },
      {
        icon: ArrowRight,
        label: 'Live Results',
        desc: 'As you type, results appear instantly below. Each result is a full phrase card with all the same features — speaker button, heart button, English translation, and context hints.',
      },
      {
        icon: Info,
        label: 'Result Count',
        desc: 'A small count above the results shows how many phrases matched your search. If no results are found, a message suggests trying a different word.',
      },
      {
        icon: ArrowLeft,
        label: 'Clear Button',
        desc: 'When the search box has text, a small X icon appears inside it. Tap it to clear your search and see all phrases again.',
      },
    ],
  },
  {
    id: 'favorites',
    icon: Heart,
    title: 'Favorites Page',
    subtitle: 'Your personal collection of saved phrases.',
    items: [
      {
        icon: Heart,
        label: 'Saved Phrases List',
        desc: 'Every phrase you have hearted across the app appears here, ordered with the most recently saved first. Each card is identical to the ones on the phrase pages — speaker, heart toggle, English translation, and context hints all work the same way.',
      },
      {
        icon: Heart,
        label: 'Removing a Favorite',
        desc: 'Tap the filled heart button on any card to remove it from your favorites. It disappears from this page immediately.',
      },
      {
        icon: Info,
        label: 'Empty State',
        desc: 'If you have no saved phrases, the page shows a friendly message with a "Browse phrases" button that takes you to the Situations page to start exploring.',
      },
      {
        icon: BookOpen,
        label: 'How Favorites Are Saved',
        desc: 'Favorites are tied to your specific device using a unique ID stored in your browser. No account or sign-up is needed. If you switch devices or clear your browser data, your favorites will reset — they are not tied to an email or login.',
      },
    ],
  },
  {
    id: 'audio',
    icon: Volume2,
    title: 'Audio Pronunciation',
    subtitle: 'How the speak-aloud feature works.',
    items: [
      {
        icon: Volume2,
        label: 'Tap to Listen',
        desc: 'Every phrase card has a speaker icon. Tap it once to hear the phrase spoken. The button glows lime green while audio plays and returns to normal when finished.',
      },
      {
        icon: Mic,
        label: 'Kannada Voice',
        desc: 'The app uses your device built-in text-to-speech engine set to the Kannada language (kn-IN). The speech rate is intentionally slowed to 0.85x normal speed so you can clearly hear each syllable and practice along.',
      },
      {
        icon: Volume2,
        label: 'Auto-Stop',
        desc: 'If you tap a new phrase while one is still playing, the previous audio stops automatically and the new phrase starts. You do not need to wait or manually stop anything.',
      },
      {
        icon: Info,
        label: 'Device Compatibility',
        desc: 'Audio works on most modern browsers and devices. If your device does not have a Kannada voice installed, the speaker button will still appear but may not produce sound. Most Android devices and recent Chrome browsers support Kannada text-to-speech out of the box.',
      },
    ],
  },
  {
    id: 'data',
    icon: BookOpen,
    title: 'Content & Data',
    subtitle: 'Where the phrases come from and how they are organized.',
    items: [
      {
        icon: BookOpen,
        label: 'Phrase Database',
        desc: 'All phrases are stored in a secure cloud database (Supabase) and loaded into the app dynamically. This means the phrase collection can be expanded over time without updating the app itself.',
      },
      {
        icon: Bus,
        label: 'Five Categories',
        desc: 'Phrases are organized into five categories: Quick Essentials (10 phrases), Travel & Transportation (10), Shopping & Markets (10), Healthcare (10), and College & Everyday Life (10) — 50 phrases total.',
      },
      {
        icon: Languages,
        label: 'Four Fields per Phrase',
        desc: 'Each phrase contains: the Kannada script, a Romanized transliteration for pronunciation, an English translation, and an optional context note explaining when to use it.',
      },
      {
        icon: Heart,
        label: 'No Account Needed',
        desc: 'The entire app works without creating an account, signing in, or providing any personal information. Favorites are saved locally on your device.',
      },
    ],
  },
  {
    id: 'design',
    icon: Sparkles,
    title: 'Design & Accessibility',
    subtitle: 'Visual choices and accessibility features.',
    items: [
      {
        icon: BookOpen,
        label: 'Color Scheme',
        desc: 'Deep forest green (#102B28) is the primary color for headers, buttons, and text. Bright lime (#D5F36A) is the accent for highlights, active states, and call-to-action buttons. The background is a warm off-white (#F8F8F3) for comfortable reading.',
      },
      {
        icon: Languages,
        label: 'Fonts',
        desc: 'English text uses Plus Jakarta Sans, a clean modern sans-serif. Kannada script uses Noto Sans Kannada, which renders Kannada characters clearly at all sizes.',
      },
      {
        icon: Home,
        label: 'Responsive Layout',
        desc: 'The app adapts to any screen size. On phones, navigation moves to a bottom bar with large touch targets. On tablets and desktops, navigation sits in a top bar and phrase cards arrange in multi-column grids.',
      },
      {
        icon: Mic,
        label: 'Large Touch Targets',
        desc: 'All buttons are at least 40px tall, well above the minimum recommended touch target size. This makes them easy to tap on phones without accidentally pressing the wrong one.',
      },
      {
        icon: BookOpen,
        label: 'High Contrast',
        desc: 'Text and background colors are chosen for strong contrast ratios, ensuring readability in bright sunlight and for users with visual impairments.',
      },
    ],
  },
];

export function ManualPage({
  onBack,
  onNavigateHome,
  onNavigateSituations,
  onNavigateSearch,
  onNavigateFavorites,
}: ManualPageProps) {
  const quickLinks = [
    { label: 'Home', icon: Home, onClick: onNavigateHome },
    { label: 'Situations', icon: Mic, onClick: onNavigateSituations },
    { label: 'Search', icon: Search, onClick: onNavigateSearch },
    { label: 'Favorites', icon: Heart, onClick: onNavigateFavorites },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-24 md:pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-2xl bg-forest-800 flex items-center justify-center shrink-0">
          <BookOpen className="w-7 h-7 text-lime-300" strokeWidth={1.75} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-forest-800 leading-tight">
            NammaMate User Manual
          </h1>
          <p className="text-warm-600 mt-1">
            Everything you need to know about the app, its features, and how to use it.
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 mb-10">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.label}
              onClick={link.onClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-200 text-forest-700 text-sm font-medium hover:bg-warm-300 transition-colors"
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </button>
          );
        })}
      </div>

      {/* Intro card */}
      <div className="card p-6 mb-10">
        <h2 className="text-lg font-bold text-forest-800 mb-3">What is NammaMate?</h2>
        <p className="text-warm-700 leading-relaxed">
          NammaMate is an everyday Kannada communication assistant built for people who do not
          speak Kannada fluently but need to communicate with locals in Karnataka. Instead of
          being a generic translation tool, NammaMate is organized around real-life situations —
          travel, shopping, healthcare, and college life — so you can find the right phrase for
          the right moment. Each phrase includes Kannada script, a pronunciation guide in English
          letters, an English translation, and a one-tap audio playback button. You can save your
          favorite phrases for quick access and search across the entire collection.
        </p>
      </div>

      {/* Table of contents */}
      <div className="card p-6 mb-10">
        <h2 className="text-sm font-bold text-forest-800 uppercase tracking-wider mb-4">
          Table of Contents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-2 text-sm text-forest-600 hover:text-forest-800 transition-colors py-1"
            >
              <span className="w-6 h-6 rounded-lg bg-warm-200 flex items-center justify-center text-xs font-bold text-forest-700 shrink-0">
                {i + 1}
              </span>
              {section.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center shrink-0">
                <SectionIcon className="w-5 h-5 text-forest-700" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-forest-800">{section.title}</h2>
                <p className="text-sm text-warm-600">{section.subtitle}</p>
              </div>
            </div>

            <div className="space-y-3">
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="card p-5 hover:shadow-soft transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-forest-600" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-forest-800 mb-1">{item.label}</h3>
                        <p className="text-sm text-warm-700 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Quick reference: all situations */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-forest-800 mb-4">Quick Reference: Situations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { slug: 'common', icon: Sparkles, title: 'Quick Essentials', desc: 'Greetings, yes/no, sorry, thank you — the phrases you need everywhere.' },
            { slug: 'travel', icon: Bus, title: 'Travel & Transportation', desc: 'Stations, buses, autos, taxis, fares, directions, parking.' },
            { slug: 'shopping', icon: ShoppingBag, title: 'Shopping & Markets', desc: 'Prices, bargaining, freshness, bags, payment methods.' },
            { slug: 'healthcare', icon: Stethoscope, title: 'Healthcare', desc: 'Symptoms, doctors, pharmacies, appointments, dosage.' },
            { slug: 'college', icon: GraduationCap, title: 'College & Everyday Life', desc: 'Campus navigation, introductions, social phrases, gratitude.' },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.slug}
                onClick={() => {
                  onBack();
                  setTimeout(() => onSituationClick(cat.slug), 50);
                }}
                className="card p-5 text-left hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-forest-800 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-lime-300" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-forest-800 text-sm">{cat.title}</h3>
                    <p className="text-xs text-warm-600 mt-0.5 leading-relaxed">{cat.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-warm-400 group-hover:text-forest-600 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tips card */}
      <div className="card p-6 bg-forest-800 !text-warm-100">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-lime-300" />
          <h2 className="text-lg font-bold text-warm-100">Tips for Getting the Most Out of NammaMate</h2>
        </div>
        <ul className="space-y-3 text-warm-300 text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="text-lime-300 font-bold shrink-0">1.</span>
            Before traveling, open the Travel situation and save the phrases you think you will need most. They will be waiting in your Favorites when you need them — even offline if the page was already loaded.
          </li>
          <li className="flex gap-3">
            <span className="text-lime-300 font-bold shrink-0">2.</span>
            Use the transliteration line (the English-letter pronunciation guide) to practice speaking. Tap the speaker button to compare your pronunciation with the audio.
          </li>
          <li className="flex gap-3">
            <span className="text-lime-300 font-bold shrink-0">3.</span>
            If you are in a hurry, use Search to find a specific phrase by typing any word you remember — English, Kannada, or the Romanized spelling.
          </li>
          <li className="flex gap-3">
            <span className="text-lime-300 font-bold shrink-0">4.</span>
            Start with Quick Essentials. Learning just "I do not know Kannada" and "Please say it again" sets expectations and makes locals more patient and helpful.
          </li>
          <li className="flex gap-3">
            <span className="text-lime-300 font-bold shrink-0">5.</span>
            The context hint ("When to use this") tells you the specific scenario for each phrase. Check it before using a phrase to make sure it fits the situation.
          </li>
        </ul>
      </div>
    </div>
  );
}
