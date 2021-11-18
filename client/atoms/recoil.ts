import { atom } from "recoil";
let a: Array<any>;
export const commentsAdd = atom({
  key: "commentsAdd",
  default: a,
});
export const nameAtom = atom({
  key: "name",
  default: "",
});
export const usernameAtom = atom({
  key: "username",
  default: "",
});
export const passwordAtom = atom({
  key: "password",
  default: "",
});
export const verificationCodeAtom = atom({
  key: "verificationCode",
  default: "",
});
