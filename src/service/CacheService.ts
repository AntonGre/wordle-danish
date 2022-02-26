import { IGameProgress } from "../Models/IGameProgress";
import { IUser } from "../Models/IUser";

type key = "wordleGame" | "user";
type CacheReturnType = {
  wordleGame: IGameProgress;
  user: IUser;
};

type returnType<T extends key> = T extends "wordleGame" ? IGameProgress : IUser;

export interface ICacheService {
  get<T extends key>(key: T): returnType<T>;
  set<T extends key>(key: T, value: returnType<T>): void;
}

export class CacheService implements ICacheService {
  get<T extends key>(key: T): returnType<T> {
    const value = localStorage.getItem(key);
    return value && JSON.parse(value);
  }

  set(key: key, value: CacheReturnType[key]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
