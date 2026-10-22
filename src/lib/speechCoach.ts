// Pronunciation Coach and Speech Comparison Utility

export type SpeechResult = {
  transcript: string;
  accuracy: number;
  grade: 'excellent' | 'good' | 'needs-work';
  kannadaPraise: string;
  feedbackText: string;
};

// Normalize strings for comparison (remove punctuation, whitespace, diacritics where applicable)
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"॥।]/g, '')
    .replace(/\s+/g, '')
    .trim();
}

// Compute character-level Levenshtein similarity
function calculateSimilarity(s1: string, s2: string): number {
  const str1 = normalizeString(s1);
  const str2 = normalizeString(s2);

  if (!str1 && !str2) return 100;
  if (!str1 || !str2) return 0;
  if (str1 === str2) return 100;

  // Direct substring bonus
  if (str1.includes(str2) || str2.includes(str1)) {
    const ratio = Math.min(str1.length, str2.length) / Math.max(str1.length, str2.length);
    return Math.round(75 + ratio * 25);
  }

  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  const similarity = Math.max(0, Math.round((1 - distance / maxLen) * 100));
  return similarity;
}

export function evaluateKannadaSpeech(
  spokenText: string,
  targetKannada: string,
  targetTransliteration: string
): SpeechResult {
  // Check against Kannada script
  const kannadaSim = calculateSimilarity(spokenText, targetKannada);
  // Also check against transliteration (in case recognition transcribed in Latin script)
  const transSim = calculateSimilarity(spokenText, targetTransliteration);

  const accuracy = Math.max(kannadaSim, transSim);

  if (accuracy >= 80) {
    return {
      transcript: spokenText,
      accuracy,
      grade: 'excellent',
      kannadaPraise: 'ಸಕ್ಕತ್ ಆಗಿದೆ! (Sakkath!)',
      feedbackText: 'Superb pronunciation! You sound like an authentic Karnataka local.',
    };
  } else if (accuracy >= 55) {
    return {
      transcript: spokenText,
      accuracy,
      grade: 'good',
      kannadaPraise: 'ಚೆನ್ನಾಗಿದೆ! (Chennagide)',
      feedbackText: 'Very close! Listen once more and focus on the syllable rhythm.',
    };
  } else {
    return {
      transcript: spokenText,
      accuracy,
      grade: 'needs-work',
      kannadaPraise: 'ಇನ್ನೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ (Try Again)',
      feedbackText: 'Tap the audio button to hear the slow cadence, then speak clearly into the mic.',
    };
  }
}

// Check speech recognition browser capability
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}
