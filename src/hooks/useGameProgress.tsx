import { useState } from "react";
import { BlockState } from "../components/TextField/TextField";
import { IGameProgress } from "../Models/IGameProgress";
import { CacheService, ICacheService } from "../service/CacheService";
import { checkWord, getNewWord, isWordValid } from "../util/wordle";

export interface IWordState {
  word: string;
  states: BlockState[];
}

const defaults: IWordState = {
  word: "",
  states: ["default", "default", "default", "default", "default"],
};

export function useGameProgress() {
  const [gameProgress, setGameProgress] = useState<IGameProgress>();
  const cacheService: ICacheService = new CacheService();

  if (!gameProgress) {
    let game = cacheService.get("wordleGame");
    if (!game) {
      clearGameProgress();
    } else {
      setGameProgress(game);
    }
  }

  function clearGameProgress() {
    const newGameProgress: IGameProgress = {
      user: gameProgress?.user,
      wordleWord: getNewWord(),
      guessCount: 0,
      guesses: [
        { ...defaults },
        { ...defaults },
        { ...defaults },
        { ...defaults },
        { ...defaults },
        { ...defaults },
      ],
    };
    cacheService.set("wordleGame", newGameProgress);
    setGameProgress(newGameProgress);
  }

  function guess(word: string) {

    if (isWordValid(word) && gameProgress) {
      const wordGuess = checkWord(word, gameProgress.wordleWord);
      const newGameProgress: IGameProgress = {
        ...gameProgress,
        guesses: gameProgress.guesses.map((guess, i) => {
          if (i === gameProgress.guessCount) {
            return { states: wordGuess, word: word };
          }
          return guess;
        }),
        guessCount: gameProgress.guessCount+1,
      };
      setGameProgress(newGameProgress);
      return true;
    } else {
      return false;
    }
  }

  return { gameProgress, clearGameProgress, guess };
}
