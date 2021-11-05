import { atom } from "recoil";
let a: Array<any>;
export const commentsAdd = atom({
  key: "commentsAdd",
  default: a,
});
