import { BlockState } from "../components/TextField/TextField";
import words from "../words.json";

export function isWordValid(word: string) {
  return words.includes(word.toLocaleLowerCase());
}

export function getNewWord() {
  const index = Math.random() * words.length;
  return words[Math.round(index)];
}

export function checkWord(
  wordToCheck: string,
  validWord: string
): BlockState[] {
  wordToCheck.toLowerCase();
  return Array.from({ length: wordToCheck.length }).map((_, i) => {
    let state: BlockState = "notFound";
    if (wordToCheck[i] === validWord[i]) {
      state = "valid";
    } else if (validWord.includes(wordToCheck[i])) {
      state = "validInDifferent";
    }
    return state;
  });
}
