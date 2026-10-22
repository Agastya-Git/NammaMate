# NammaMate — Hackathon Presentation Deck (PPT)
**Kannada Digital Innovation Hackathon 2026**  
*Organized by HackerRank Campus Crew | NIE Mysuru*  
*Problem Statement 03: Kannada in Everyday Life*

---

### Slide 1: Title Slide
- **Project Name:** NammaMate (ನಮ್ಮ ಮೇಟ್)
- **Tagline:** A Little Kannada. A Lot More Connection.
- **Event:** Kannada Digital Innovation Hackathon 2026
- **Track:** Problem Statement 03 — Kannada in Everyday Life
- **Presenter / Team:** [Your Name / Team Name]
- **Live Demo Link:** [Insert your deployed URL here]
- **GitHub Link:** [Insert your public GitHub repo URL here]

---

### Slide 2: Problem Statement & Why It Matters
- **The Context:**
  - Karnataka, especially Bengaluru, Mysuru, Hubballi, and Mangaluru, receives hundreds of thousands of new students, tech professionals, and workers every year.
  - While newcomers have good intentions to learn, they face intense **language anxiety** in fast-paced real-world situations: taking an auto, bargaining in KR Market, ordering food at Darshinis, or explaining symptoms at a pharmacy.
- **Who Is Affected:**
  - Non-Kannada speaking students moving to Karnataka campuses.
  - IT professionals navigating city commutes.
  - Local service providers (auto drivers, street vendors, healthcare staff) facing communication barriers.
- **The Core Need:**
  - A quick, situational, respectful tool that builds conversational confidence without requiring months of tedious grammar drills.

---

### Slide 3: Existing Systems & Critical Gaps
| Existing Solution | How It Fails in Everyday Karnataka Situations |
| :--- | :--- |
| **Google Translate / Generic Apps** | Gives formal, textbook translations that locals never actually speak. Translates word-for-word with zero cultural context or tone awareness. |
| **Duolingo / Gamified Language Apps** | Focuses on irrelevant grammar drills (*"The cat drinks milk"*) instead of survival Karnataka phrases (*"Meter haaki sir"*, *"By-two coffee kodi"*). |
| **Printed Phrasebooks** | Slow, awkward to search under pressure, and has no voice pronunciation or accent assistance. |
| **No Assistance / Silence** | Leads to miscommunication, conflict in cabs/autos, or isolation. |

---

### Slide 4: How NammaMate Is Different (Key Innovations)
1. **Interactive Roleplay Simulator ("Kannada in Action"):**
   - Stepped conversational scenarios (Auto negotiation, Darshini ordering, Market bargaining) where users practice realistic dialogues and receive instant fluency feedback.
2. **"Street Mode / Driver Assist Card":**
   - One-tap high-contrast, large-font flashcards that can be displayed directly to auto drivers or vendors on the street with loud slow/normal audio.
3. **AI Pronunciation Coach:**
   - Real-time speech recognition tuned for Kannada (`kn-IN`) that checks user pronunciation and rewards them with encouraging Kannada feedback (*"Sakkath agide!"*).
4. **Cultural Etiquette & Respect Engine:**
   - Highlights polite versus casual tone (*Neevu/Banni* vs *Neenu/Ba*), teaching learners how to win goodwill.
5. **Zero-Lag Offline-First Reliability:**
   - Works seamlessly inside metros and spotty network areas with pre-cached emergency and survival phrases.
6. **One-Tap Emergency SOS:**
   - Quick-access distress phrases and direct phone dialers for 112 (Police), 108 (Ambulance), and 1091 (Women Safety).

---

### Slide 5: Approach & Methodology
- **User-Centric Situational Design:**
  - Divided into 5 core everyday pillars: Travel & Transit, Shopping & Markets, Healthcare, Food & Cafes, and Campus Life.
- **Bilingual Ergonomics:**
  - Every phrase features **Kannada Script + Phonetic English Transliteration + Natural English Meaning + Usage Context**.
- **Progressive Learning Loop:**
  - `Browse Situation` ➔ `Listen & Slow Audio (0.7x)` ➔ `Practice Speech with Mic` ➔ `Simulate Real Dialogue` ➔ `Use on the Street`.

---

### Slide 6: Tech Stack & System Architecture
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React
- **Audio & Speech Engine:**
  - Web Speech Synthesis API (`kn-IN` voice) with variable rate controls
  - Web Speech Recognition API with Levenshtein-based phonetic string similarity scoring
- **Database & Cloud:** Supabase (PostgreSQL with Row Level Security)
- **Local Fallback:** Offline cache engine (`offlineData.ts`) & device-scoped LocalStorage favorites
- **Hosting:** Netlify / Vercel (CI/CD automated deployment)

*(Include the Architecture Diagram from README.md)*

---

### Slide 7: Impact, Conclusion & Future Scope
- **Real-World Impact:**
  - Promotes cultural harmony between newcomers and locals.
  - Transforms daily frustration into positive cultural connection.
- **Future Roadmap:**
  - **Regional Dialect Explorer:** Adding North Karnataka, Mysuru, Coastal (Kundapura/Mangaluru) dialect variations.
  - **Community Crowdsourcing:** Enabling verified native speakers to submit local slangs and colloquial idioms.
  - **WhatsApp / Telegram Quick Bot:** Delivering survival phrases directly in chat apps without opening a browser.
- **Conclusion:**
  - NammaMate is not just another app — it is a digital bridge celebrating Karnataka's language and culture.
