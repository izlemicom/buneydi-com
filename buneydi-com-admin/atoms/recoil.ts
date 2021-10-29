import { atom } from "recoil";
let a: any = null;
export const authorStats = atom({
  key: "authorStats",
  default: a,
});
export const authorInfo = atom({
  key: "authorInfo",
  default: a,
});

export const articleData = atom({
  key: "articleData",
  default: a,
});
