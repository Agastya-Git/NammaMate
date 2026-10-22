export type DialogueOption = {
  id: string;
  kannada: string;
  transliteration: string;
  english: string;
  isRecommended: boolean;
  score: number;
  feedback: string;
  tone: 'polite' | 'casual' | 'too-blunt';
};

export type DialogueStep = {
  id: number;
  speaker: string;
  speakerRole: string;
  avatar: string;
  kannada: string;
  transliteration: string;
  english: string;
  options: DialogueOption[];
};

export type Scenario = {
  id: string;
  title: string;
  kannadaTitle: string;
  category: string;
  description: string;
  badge: string;
  icon: string;
  situationContext: string;
  culturalTip: string;
  steps: DialogueStep[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: 'auto-bengaluru',
    title: 'Hiring an Auto in Bengaluru',
    kannadaTitle: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಆಟೋ ಹತ್ತುವುದು',
    category: 'Travel & Transport',
    badge: 'Most Popular',
    icon: 'Bus',
    situationContext: 'You are near the metro station and want to take an auto to Indiranagar 100ft Road without getting overcharged.',
    culturalTip: 'In Karnataka, addressing auto drivers as "Sir" and asking "Barteera?" (Will you come?) instead of commanding "Banni" or "Hogu" sets a polite, friendly tone.',
    steps: [
      {
        id: 1,
        speaker: 'Manjunath',
        speakerRole: 'Auto Driver',
        avatar: '🛺',
        kannada: 'ಎಲ್ಲಿಗೆ ಹೋಗ್ಬೇಕು ಸರ್?',
        transliteration: 'Ellige hogbeku sir?',
        english: 'Where do you want to go sir?',
        options: [
          {
            id: 'opt-1a',
            kannada: 'ಇಂದಿರಾನಗರ ಮೆಟ್ರೋಗೆ ಹೋಗ್ಬೇಕು. ಬರ್ತೀರಾ?',
            transliteration: 'Indiranagar metro-ge hogbeku. Barteera?',
            english: 'Need to go to Indiranagar metro. Will you come?',
            isRecommended: true,
            score: 100,
            feedback: 'Perfect! "Barteera?" is respectful and the universal standard in Karnataka.',
            tone: 'polite',
          },
          {
            id: 'opt-1b',
            kannada: 'ಇಂದಿರಾನಗರ ಹೋಗು.',
            transliteration: 'Indiranagar hogu.',
            english: 'Go to Indiranagar.',
            isRecommended: false,
            score: 40,
            feedback: '"Hogu" is imperative and sounds disrespectful to elders or service providers. Use "Hogi" or "Barteera".',
            tone: 'too-blunt',
          },
          {
            id: 'opt-1c',
            kannada: 'ಮೀಟರ್ ಎಷ್ಟು?',
            transliteration: 'Meter yestu?',
            english: 'How much meter?',
            isRecommended: false,
            score: 65,
            feedback: 'Always state your destination first before bringing up fare or meter!',
            tone: 'casual',
          },
        ],
      },
      {
        id: 2,
        speaker: 'Manjunath',
        speakerRole: 'Auto Driver',
        avatar: '🛺',
        kannada: 'ಹಾ ಬನ್ನಿ ಕೂತ್ಕೊಳ್ಳಿ. ಒಂದು ನೂರಾ ಐವತ್ತು ರೂಪಾಯಿ ಆಗುತ್ತೆ.',
        transliteration: 'Haa banni kootkolli. Ondu nooraa aivathu roopaayi aaguththe.',
        english: 'Yes come sit. It will be 150 rupees.',
        options: [
          {
            id: 'opt-2a',
            kannada: 'ಮೀಟರ್ ಹಾಕಿ ಸರ್, ಮೀಟರ್‌ಗೆ ಎಷ್ಟು ಆಗುತ್ತೆ ಅಷ್ಟು ಕೊಡ್ತೀನಿ.',
            transliteration: 'Meter haaki sir, meter-ge yestu aaguththe ashtu kodthini.',
            english: 'Please turn on the meter sir, I will pay whatever the meter shows.',
            isRecommended: true,
            score: 100,
            feedback: 'Courteous yet firm. "Meter haaki sir" is the golden phrase in Bengaluru.',
            tone: 'polite',
          },
          {
            id: 'opt-2b',
            kannada: 'ತುಂಬಾ ಜಾಸ್ತಿ, ಬೇಡ ಬೇಡ!',
            transliteration: 'Thumba jaasti, beda beda!',
            english: 'Too much, no no!',
            isRecommended: false,
            score: 60,
            feedback: 'A bit abrupt. Better to counter-offer politely or insist on meter.',
            tone: 'too-blunt',
          },
          {
            id: 'opt-2c',
            kannada: 'ಸರಿ, ಹೋಗೋಣ.',
            transliteration: 'Sari, hogona.',
            english: 'Okay, let us go.',
            isRecommended: false,
            score: 50,
            feedback: 'You agreed to almost double the standard meter fare!',
            tone: 'casual',
          },
        ],
      },
      {
        id: 3,
        speaker: 'Manjunath',
        speakerRole: 'Auto Driver',
        avatar: '🛺',
        kannada: 'ಇಲ್ಲಿ ರೈಟಾ ಅಥವಾ ಲೆಫ್ಟಾ ಸರ್?',
        transliteration: 'Illi right-aa athava left-aa sir?',
        english: 'Right or left here sir?',
        options: [
          {
            id: 'opt-3a',
            kannada: 'ಮುಂದೆ ಹೋಗಿ, ಆಮೇಲೆ ರೈಟ್ ತಗೊಳ್ಳಿ ಸರ್.',
            transliteration: 'Munche hogi, aamele right thagolli sir.',
            english: 'Go straight ahead, then take right sir.',
            isRecommended: true,
            score: 100,
            feedback: 'Crystal clear and polite navigation.',
            tone: 'polite',
          },
          {
            id: 'opt-3b',
            kannada: 'ಲೆಫ್ಟ್ ತಗೊಳ್ಳಿ.',
            transliteration: 'Left thagolli.',
            english: 'Take left.',
            isRecommended: false,
            score: 85,
            feedback: 'Good and clear, though adding "sir" or "mundhe" is even more natural.',
            tone: 'polite',
          },
        ],
      },
      {
        id: 4,
        speaker: 'Manjunath',
        speakerRole: 'Auto Driver',
        avatar: '🛺',
        kannada: 'ಬಂತು ಸರ್. ಮೀಟರ್ ಎಂಭತ್ತೈದು ರೂಪಾಯಿ ಆಗಿದೆ.',
        transliteration: 'Banthu sir. Meter embhathaidhu roopaayi aagidhe.',
        english: 'Reached sir. Meter is 85 rupees.',
        options: [
          {
            id: 'opt-4a',
            kannada: 'ಗೂಗಲ್ ಪೇ / ಆನ್‌ಲೈನ್ ಇದೆಯಾ ಸರ್? ಕ್ಯೂಆರ್ ಕೋಡ್ ತೋರಿಸಿ.',
            transliteration: 'Google Pay / Online ideya sir? QR code thorisi.',
            english: 'Do you have Google Pay / Online payment sir? Show QR code.',
            isRecommended: true,
            score: 100,
            feedback: 'Spot on! Almost all Karnataka autos have QR codes hanging behind the seat.',
            tone: 'polite',
          },
          {
            id: 'opt-4b',
            kannada: 'ನೂರು ರೂಪಾಯಿ ಇದೆ, ಚೇಂಜ್ ಇದೆಯಾ?',
            transliteration: 'Nooru roopaayi ide, change ideya?',
            english: 'I have 100 rupees note, do you have change?',
            isRecommended: true,
            score: 95,
            feedback: 'Practical and common for cash transactions.',
            tone: 'polite',
          },
        ],
      },
    ],
  },
  {
    id: 'darshini-coffee',
    title: 'Ordering at a Darshini Restaurant',
    kannadaTitle: 'ದರ್ಶಿನಿಯಲ್ಲಿ ತಿಂಡಿ ಆರ್ಡರ್ ಮಾಡುವುದು',
    category: 'Food & Cafés',
    badge: 'Cultural Classic',
    icon: 'Utensils',
    situationContext: 'You are at a bustling Darshini in Jayanagar or Malleshwaram for morning breakfast.',
    culturalTip: '"By-two" (ಒಂದರಲ್ಲಿ ಅರ್ಧ) is an iconic Karnataka café concept where one coffee or tea is split into two half-cups.',
    steps: [
      {
        id: 1,
        speaker: 'Venkatesh',
        speakerRole: 'Cashier',
        avatar: '☕',
        kannada: 'ಏನು ಬೇಕು ಸರ್? ಏನ್ ತಿಂಡಿ?',
        transliteration: 'Enu beku sir? En thindi?',
        english: 'What would you like sir? What breakfast?',
        options: [
          {
            id: 'opt-darshini-1a',
            kannada: 'ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಮತ್ತೆ ಒಂದು ಬೈ-ಟೂ ಕಾಫಿ ಕೊಡಿ.',
            transliteration: 'Ondu masala dose matthe ondu by-two coffee kodi.',
            english: 'Give one masala dosa and one by-two filter coffee.',
            isRecommended: true,
            score: 100,
            feedback: 'Flawless order! "By-two" coffee is quintessentially Bengaluru.',
            tone: 'polite',
          },
          {
            id: 'opt-darshini-1b',
            kannada: 'ದೋಸೆ ಕೊಡು.',
            transliteration: 'Dose kodu.',
            english: 'Give dosa.',
            isRecommended: false,
            score: 45,
            feedback: '"Kodu" is disrespectful to staff. Always say "Kodi" (give respectfully).',
            tone: 'too-blunt',
          },
          {
            id: 'opt-darshini-1c',
            kannada: 'ಬಿಸಿ ಬಿಸಿ ಇಡ್ಲಿ ವಡೆ ಇದೆಯಾ?',
            transliteration: 'Bisi bisi idli vade ideya?',
            english: 'Is there hot piping idli vada?',
            isRecommended: true,
            score: 95,
            feedback: '"Bisi bisi" (piping hot) is the favourite way locals ask for fresh tiffin.',
            tone: 'polite',
          },
        ],
      },
      {
        id: 2,
        speaker: 'Subramani',
        speakerRole: 'Server at Counter',
        avatar: '👨‍🍳',
        kannada: 'ಚಟ್ನಿ, ಸಾಂಬಾರ್ ಜಾಸ್ತಿ ಬೇಕಾ ಸರ್?',
        transliteration: 'Chutney, sambar jaasti beka sir?',
        english: 'Do you want extra chutney or sambar sir?',
        options: [
          {
            id: 'opt-darshini-2a',
            kannada: 'ಹಾ ಕೊಡಿ, ಸ್ವಲ್ಪ ಚಟ್ನಿ ಜಾಸ್ತಿ ಹಾಕಿ.',
            transliteration: 'Haa kodi, solpa chutney jaasti haaki.',
            english: 'Yes please give, put a little more chutney.',
            isRecommended: true,
            score: 100,
            feedback: 'Natural and authentic phrasing.',
            tone: 'polite',
          },
          {
            id: 'opt-darshini-2b',
            kannada: 'ಸಾಕು, ಬೇಡ.',
            transliteration: 'Saaku, beda.',
            english: 'Enough, no need.',
            isRecommended: false,
            score: 90,
            feedback: 'Good and clear.',
            tone: 'polite',
          },
        ],
      },
      {
        id: 3,
        speaker: 'Subramani',
        speakerRole: 'Server',
        avatar: '👨‍🍳',
        kannada: 'ತಗೊಳ್ಳಿ ಸರ್, ಬಿಸಿ ಕಾಫಿ.',
        transliteration: 'Thagolli sir, bisi coffee.',
        english: 'Take this sir, hot coffee.',
        options: [
          {
            id: 'opt-darshini-3a',
            kannada: 'ಧನ್ಯವಾದಗಳು! ಕುಡಿಯೋಕೆ ನೀರು ಎಲ್ಲಿದೆ?',
            transliteration: 'Dhanyavadagalu! Kudiyoke neeru ellide?',
            english: 'Thank you! Where is drinking water?',
            isRecommended: true,
            score: 100,
            feedback: 'Polite appreciation followed by asking for water.',
            tone: 'polite',
          },
          {
            id: 'opt-darshini-3b',
            kannada: 'ಕಾಫಿ ಸಕ್ಕತ್ ಆಗಿದೆ!',
            transliteration: 'Coffee sakkath aagide!',
            english: 'The coffee is superb!',
            isRecommended: true,
            score: 100,
            feedback: '"Sakkath" is the highest compliment in local slang!',
            tone: 'casual',
          },
        ],
      },
    ],
  },
  {
    id: 'market-shopping',
    title: 'Bargaining at the Local Market',
    kannadaTitle: 'ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಖರೀದಿ',
    category: 'Shopping & Markets',
    badge: 'Essential Skill',
    icon: 'ShoppingBag',
    situationContext: 'You are shopping for fresh vegetables and fruits at KR Market or Russell Market.',
    culturalTip: 'Gentle bargaining with phrases like "Solpa kammi maadi" (reduce a little) is expected and respected.',
    steps: [
      {
        id: 1,
        speaker: 'Basavanna',
        speakerRole: 'Vegetable Vendor',
        avatar: '🧺',
        kannada: 'ಬನ್ನಿ ಅಮ್ಮಾ/ಸರ್, ತಾಜಾ ತರಕಾರಿ ಇದೆ. ಏನ್ ಬೇಕು?',
        transliteration: 'Banni amma/sir, thaaja tharakaari ide. En beku?',
        english: 'Welcome madam/sir, fresh vegetables are here. What do you need?',
        options: [
          {
            id: 'opt-market-1a',
            kannada: 'ಟೊಮ್ಯಾಟೊ ಎಷ್ಟು ಒಂದು ಕಿಲೋಗೆ?',
            transliteration: 'Tomato yestu ondu kilo-ge?',
            english: 'How much is tomato per kilo?',
            isRecommended: true,
            score: 100,
            feedback: 'Direct, clear, and grammatically spot on.',
            tone: 'polite',
          },
          {
            id: 'opt-market-1b',
            kannada: 'ಈ ಹಣ್ಣು ತಾಜಾ ಇದೆಯಾ?',
            transliteration: 'Ee hannu thaaja ideya?',
            english: 'Are these fruits fresh?',
            isRecommended: true,
            score: 95,
            feedback: 'Great question to check produce quality.',
            tone: 'polite',
          },
        ],
      },
      {
        id: 2,
        speaker: 'Basavanna',
        speakerRole: 'Vegetable Vendor',
        avatar: '🧺',
        kannada: 'ಕಿಲೋಗೆ ನಲವತ್ತು ರೂಪಾಯಿ ಸರ್. ತುಂಬಾ ಒಳ್ಳೆ ಕ್ವಾಲಿಟಿ.',
        transliteration: 'Kilo-ge nalavathu roopaayi sir. Thumba olle quality.',
        english: 'Forty rupees per kilo sir. Very good quality.',
        options: [
          {
            id: 'opt-market-2a',
            kannada: 'ಸ್ವಲ್ಪ ಕಮ್ಮಿ ಮಾಡಿ ಸರ್, ಎರಡು ಕಿಲೋ ತಗೋತೀನಿ.',
            transliteration: 'Solpa kammi maadi sir, eradu kilo thagothini.',
            english: 'Reduce a little bit sir, I will buy two kilos.',
            isRecommended: true,
            score: 100,
            feedback: 'Classic friendly bargaining! Offering to buy more volume helps.',
            tone: 'polite',
          },
          {
            id: 'opt-market-2b',
            kannada: 'ಬೇರೆ ಕಡೆ ಇಪ್ಪತ್ತು ರೂಪಾಯಿ ಇತ್ತು!',
            transliteration: 'Bere kade ippathu roopaayi itthu!',
            english: 'Other places it was twenty rupees!',
            isRecommended: false,
            score: 70,
            feedback: 'A bit combative. Vendors respond better to "Solpa kammi maadi".',
            tone: 'too-blunt',
          },
        ],
      },
      {
        id: 3,
        speaker: 'Basavanna',
        speakerRole: 'Vegetable Vendor',
        avatar: '🧺',
        kannada: 'ಸರಿ ಸರ್, ನಿಮಗೋಸ್ಕರ ಮೂವತ್ತೈದು ರೂಪಾಯಿಗೆ ಕೊಡ್ತೀನಿ.',
        transliteration: 'Sari sir, nimagoskara moovathaidhu roopaayige kodthini.',
        english: 'Okay sir, for you I will give at thirty-five rupees.',
        options: [
          {
            id: 'opt-market-3a',
            kannada: 'ಸರಿ, ಎರಡು ಕಿಲೋ ಹಾಕಿ. ಒಂದು ಬ್ಯಾಗ್ ಕೊಡಿ.',
            transliteration: 'Sari, eradu kilo haaki. Ondu bag kodi.',
            english: 'Okay, pack two kilos. Please give a bag.',
            isRecommended: true,
            score: 100,
            feedback: 'Deal closed respectfully and happily!',
            tone: 'polite',
          },
        ],
      },
    ],
  },
  {
    id: 'clinic-pharmacy',
    title: 'At the Clinic & Medical Store',
    kannadaTitle: 'ಆಸ್ಪತ್ರೆ ಮತ್ತು ಔಷಧ ಅಂಗಡಿಯಲ್ಲಿ',
    category: 'Healthcare',
    badge: 'Life Saver',
    icon: 'Stethoscope',
    situationContext: 'You feel unwell and need medicine for fever and headache from a local pharmacy.',
    culturalTip: 'Medical staff appreciate concise statements of symptoms: "Jvara" (fever), "Thale novu" (headache), "Hotte novu" (stomach ache).',
    steps: [
      {
        id: 1,
        speaker: 'Dr. Suresh / Pharmacist',
        speakerRole: 'Pharmacist',
        avatar: '💊',
        kannada: 'ನಮಸ್ಕಾರ, ಏನು ಸಮಸ್ಯೆಯಾಗಿದೆ?',
        transliteration: 'Namaskara, enu samasye aagide?',
        english: 'Hello, what seems to be the problem?',
        options: [
          {
            id: 'opt-med-1a',
            kannada: 'ಎರಡು ದಿನದಿಂದ ಜ್ವರ ಮತ್ತು ತಲೆ ನೋವು ಇದೆ.',
            transliteration: 'Eradu dinadinda jvara matthe thale novu ide.',
            english: 'I have had fever and headache for two days.',
            isRecommended: true,
            score: 100,
            feedback: 'Accurate and helps the medical staff immediately.',
            tone: 'polite',
          },
          {
            id: 'opt-med-1b',
            kannada: 'ಮಾತ್ರೆ ಕೊಡಿ.',
            transliteration: 'Mathre kodi.',
            english: 'Give tablet.',
            isRecommended: false,
            score: 55,
            feedback: 'Specify the symptom first before asking for pills!',
            tone: 'too-blunt',
          },
        ],
      },
      {
        id: 2,
        speaker: 'Pharmacist',
        speakerRole: 'Pharmacist',
        avatar: '💊',
        kannada: 'ಈ ಪ್ಯಾರಸಿಟಮಾಲ್ ಮಾತ್ರೆ ತಗೊಳ್ಳಿ. ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ.',
        transliteration: 'Ee paracetamol mathre thagolli. Dinakke eradu baari.',
        english: 'Take this paracetamol tablet. Twice a day.',
        options: [
          {
            id: 'opt-med-2a',
            kannada: 'ಇದನ್ನ ಊಟ ಆದ ಮೇಲೆ ತಗೋಬೇಕಾ?',
            transliteration: 'Idhanna oota aada mele thagobeka?',
            english: 'Should I take this after food?',
            isRecommended: true,
            score: 100,
            feedback: 'Crucial medical instruction phrase: "Oota aada mele" (after food).',
            tone: 'polite',
          },
          {
            id: 'opt-med-2b',
            kannada: 'ಖಾಲಿ ಹೊಟ್ಟೆಯಲ್ಲಿ ತಗೋಬಹುದಾ?',
            transliteration: 'Khaali hottheyalli thagobahuda?',
            english: 'Can I take it on empty stomach?',
            isRecommended: true,
            score: 95,
            feedback: 'Clear and safe query.',
            tone: 'polite',
          },
        ],
      },
    ],
  },
];
