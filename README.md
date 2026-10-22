# NammaMate (ನಮ್ಮ ಮೇಟ್) — Smart Kannada Everyday Assistant

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Kannada Digital Innovation Hackathon 2026**  
> **Organized by:** HackerRank Campus Crew | The National Institute of Engineering (NIE), Mysuru  
> **Selected Track:** **Problem Statement 03 — Kannada in Everyday Life**  
> *"Solution that helps people learn and use Kannada in real-world settings such as travel, shopping, education, healthcare, transportation and workplaces."*

---

## 🌟 Overview & Why NammaMate

Karnataka attracts millions of students, tech professionals, and workers every year. While people want to respect and connect with the local culture, **language anxiety** often causes awkward friction:
- Overpaying auto drivers or miscommunicating directions.
- Hesitating to order food in authentic Darshinis or local markets.
- Misunderstanding medical instructions or emergency hospital directions.

**NammaMate** is an interactive, culturally-empathic communication platform designed specifically for real-world scenarios. It doesn't just display vocabulary—it gives non-Kannada speakers the confidence to speak, practice, and navigate everyday life in Karnataka.

---

## 🚀 Key Features

### 1. 🛺 "Street Mode / Driver Assist Card"
- High-contrast, large-font flashcard view designed to be shown directly to auto/cab drivers or shopkeepers when under pressure.
- One-tap loud audio pronunciation with speed adjustment (0.7x slow cadence vs 1.0x natural).
- Copy-to-clipboard and phonetic syllable guide.

### 2. 🎭 "Kannada in Action" — Interactive Roleplay Simulator
- Realistic stepped conversation scenarios:
  - **Auto Ride in Bengaluru** (hiring, insisting on meter politely, navigation, UPI payment).
  - **Darshini Restaurant Ordering** (classic *by-two* coffee, *bisi bisi* idli/dosa).
  - **KR Market / Vegetable Cart** (polite bargaining: *"Solpa kammi maadi sir"*).
  - **Clinic & Pharmacy** (communicating fever, headache, dosage timings).
- Dynamic scoring, voice input options, and feedback on tone and etiquette.

### 3. 🎙️ AI Pronunciation Coach
- Real-time speech recognition tuned for Kannada (`kn-IN`).
- Compares user's spoken audio with target phonetic scripts and gives an instant **Accuracy % score** and Kannada praise (*"Sakkath agide!"*).

### 4. 🧭 "Polite & Respectful" Cultural Etiquette Engine
- Distinguishes between respectful forms (*Neevu / Banni / Hogi*) and informal forms (*Neenu / Ba / Hogu*).
- Explains cultural nuances so learners earn local goodwill immediately.

### 5. 🚨 One-Tap Emergency & Karnataka SOS
- Distress phrases playable aloud (*"Sahaya maadi!", "Accident aagide!"*).
- Direct tap-to-call links for verified Karnataka helplines: **112 (Police/All-in-one)**, **108 (Ambulance)**, **1091 (Women Safety)**, and Namma Metro.

### 6. ⚡ 100% Offline-First Architecture
- Seamless offline cache (`offlineData.ts`). If the user enters a metro tunnel or loses 5G connectivity, the entire app still functions with zero latency.

---

## 🏗️ Architecture & Data Flow

```text
+-------------------------------------------------------------------------+
|                              USER INTERFACE                             |
|  [Home Page]   [Situations]   [Roleplay Simulator]   [Street Mode Card] |
|  [Voice Mic]   [Audio TTS]    [Emergency SOS]        [Search & Favs]    |
+-------------------------------------------------------------------------+
                                    |
                    +---------------+---------------+
                    |                               |
                    v                               v
        +-----------------------+       +-----------------------+
        |   Web Speech API      |       |  Offline Data Cache   |
        |   - SpeechSynthesis   |       |  (Zero-lag fallback   |
        |   - SpeechRecognition |       |   for all 50 phrases) |
        +-----------------------+       +-----------------------+
                    |                               ^
                    v                               |
        +-------------------------------------------+
        |           Supabase Cloud Database         |
        |   - categories (travel, shopping, etc.)   |
        |   - phrases (Kannada script, audio, tips) |
        |   - favorites (device-scoped sync)        |
        +-------------------------------------------+
```

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling & UI:** Tailwind CSS, Lucide React Icons
- **Audio & Speech:** Web Speech Synthesis (`kn-IN`) & Web Speech Recognition
- **Backend / Database:** Supabase (PostgreSQL with Row Level Security)
- **Deployment:** Vercel / Netlify

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/nammamate.git
   cd nammamate/project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Pre-configured Supabase keys are included for seamless evaluation).*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📱 Supported Scenarios in Problem Statement 03

| Category | Everyday Context | Sample Phrases |
| :--- | :--- | :--- |
| **Travel & Transit** | BMTC Buses, Auto rickshaws, Metro, Railway stations | *"Meter haaki sir"*, *"Station ellidhe?"*, *"Ticket yestu?"* |
| **Shopping & Markets** | KR Market, Commercial Street, local grocery stores | *"Solpa kammi maadi"*, *"Kilo-ge yestu?"*, *"Fresh ideya?"* |
| **Healthcare** | Clinics, local pharmacies, hospitals | *"Thale novu ide"*, *"Mathre kodi"*, *"Oota aada mele thagobeka?"* |
| **Campus & Everyday Life** | Colleges, hostels, PG accommodations, eateries | *"Ondu coffee kodi"*, *"By-two coffee"*, *"Kannada baralla, solpa gothu"* |

---

## 👥 Hackathon Submission Details

- **Hackathon:** Kannada Digital Innovation Hackathon 2026
- **Organizer:** HackerRank Campus Crew, The National Institute of Engineering (NIE), Mysuru
- **Track Chosen:** Problem Statement 3: Kannada in Everyday Life
- **Deliverables Included:**
  1. GitHub Repository with Full Source Code
  2. Live Deployed Web Application
  3. Presentation Slide Deck (`PRESENTATION_DECK.md`)
  4. Video Walkthrough Script (`VIDEO_SCRIPT.md`)
