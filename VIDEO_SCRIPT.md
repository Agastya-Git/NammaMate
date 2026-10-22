# NammaMate — Hackathon Video Walkthrough Script
**Target Duration:** 3 to 4.5 minutes (Voice-over screen recording)  
**Track:** Problem Statement 03 — Kannada in Everyday Life  
**Event:** Kannada Digital Innovation Hackathon 2026 (HackerRank Campus Crew | NIE Mysuru)

---

### [0:00 – 0:45] Section 1: Problem Statement & Requirements
> *(Screen: Show Hackathon title slide, then transition to NammaMate landing page)*

**Voiceover:**  
"Hello judges and everyone watching! I am presenting **NammaMate** for the Kannada Digital Innovation Hackathon 2026, built for **Problem Statement 03: Kannada in Everyday Life**.

Karnataka, especially cities like Bengaluru and Mysuru, is a thriving hub for students and professionals from across India. While people want to connect and speak Kannada, real life moves fast. When you're trying to take an auto rickshaw, bargain for vegetables at KR Market, order filter coffee at a Darshini, or explain symptoms to a doctor, language anxiety often gets in the way.

The requirement was clear: build a practical digital solution that empowers people to learn and actively use Kannada in everyday real-world settings."

---

### [0:45 – 1:30] Section 2: Existing Systems & Their Critical Gaps
> *(Screen: Show slides or quick comparison graphic of Google Translate / Duolingo)*

**Voiceover:**  
"Why don't existing tools solve this?
First, **Google Translate** outputs literal, overly formal Kannada that locals never use on the streets. It has zero awareness of tone or respectful etiquette.
Second, mainstream language apps like **Duolingo** focus on abstract grammar drills rather than survival phrases you need right now at a bus stop or clinic.
And third, printed phrasebooks or static websites cannot help you with real pronunciation or assist you when you're under pressure.

Non-Kannada speakers don't need a 6-month grammar course just to catch an auto or order lunch. They need an interactive, contextual, and culturally respectful assistant. That is where **NammaMate** comes in."

---

### [1:30 – 3:30] Section 3: Live Demo & Core Solution
> *(Screen: Live screen recording of the deployed NammaMate website)*

**Voiceover:**  
"Here is the live NammaMate application.

**1. Everyday Situations:**  
*(Click on 'Explore Situations' or a card)*  
Notice how NammaMate categorizes communication into high-frequency everyday contexts: Travel & Transportation, Shopping & Markets, Healthcare, and College & Daily Life.

**2. Phrase Cards & Dual Audio:**  
*(Click on 'Travel & Transportation', select 'Meter haaki sir')*  
Every phrase displays the authentic Kannada script, phonetic English transliteration, English meaning, and contextual usage tips. 
*(Click speaker button)*  
We can play clear, native pronunciation at normal speed, or toggle to slow speed for easy learning.

**3. Street Mode / Driver Assist:**  
*(Click 'Launch Street Mode' or 'Show Driver')*  
Here is our first killer feature: **Street Mode**. If an auto driver or shopkeeper doesn't understand your accent, simply tap 'Street Mode'. It turns your phone into a high-contrast, large-font card with loud audio that you can flash directly to the driver!

**4. AI Pronunciation Coach:**  
*(Tap the mic button on a phrase card, speak the phrase in Kannada, show the green accuracy badge)*  
We have integrated an AI Pronunciation Coach using Web Speech Recognition. When I speak into the mic, it evaluates my phonetic accuracy in real-time, displaying a match percentage and encouraging Kannada praise like *'Sakkath agide!'*

**5. Kannada in Action: Roleplay Simulator:**  
*(Navigate to 'Roleplay AI' from header, click 'Hiring an Auto in Bengaluru')*  
Next is our conversational roleplay simulator. Here, users can practice real multi-step dialogues before stepping onto the street. 
*(Click through Step 1 and 2, showing the choices, tone feedback, and points awarded)*  
It teaches learners *why* saying 'Barteera?' or 'Banni' is respectful and how that creates instant goodwill.

**6. Emergency SOS:**  
*(Click the red 'SOS Help' button in header)*  
In an emergency, users have one-tap audio phrases like *'Sahaya maadi'* and direct phone dialers for Karnataka 112 Police and 108 Ambulance."

---

### [3:30 – 4:30] Section 4: Tech Stack & System Architecture
> *(Screen: Show Architecture Diagram from README or slide)*

**Voiceover:**  
"Let's look at the technical architecture behind NammaMate:
- **Frontend:** Built with React 18, TypeScript, Vite, and styled with Tailwind CSS for mobile-first responsiveness.
- **Audio & Speech Engine:** Leverages the Web Speech Synthesis API for natural Kannada playback and Web Speech Recognition for the Pronunciation Coach with Levenshtein-based string comparison.
- **Backend & Cloud:** Powered by Supabase PostgreSQL with Row Level Security for category and phrase management.
- **Offline-First Resilience:** Even if a user enters a metro tunnel or cellular signal drops, our built-in offline cache ensures 100% of the phrases and audio continue working without interruption."

---

### [4:30 – 5:00] Section 5: Conclusion & Future Scope
> *(Screen: Return to NammaMate home page or conclusion slide)*

**Voiceover:**  
"To conclude, NammaMate is more than an app—it is a cultural bridge that turns everyday language barriers into genuine human connection across Karnataka.

In the future, we plan to expand NammaMate with regional dialects from North Karnataka and Coastal Karnataka, as well as a lightweight WhatsApp bot.

The project is fully deployed, tested, and open-source on GitHub. Thank you to HackerRank Campus Crew and NIE Mysuru for this wonderful opportunity. 

*Kannada Kaliyona, Karnataka preetisana!* Thank you!"
