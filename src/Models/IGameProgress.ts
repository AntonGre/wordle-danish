import { IWordState } from "../hooks/useGameProgress";
import { IUser } from "./IUser";

export interface IGameProgress {
    wordleWord: string;
    guessCount: number;
    guesses: IWordState[]
    user?: IUser;
}