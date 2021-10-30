import CryptoJS from "crypto-js";

export function Encrypt(word, key = "a") {
  let encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString();
  let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
  return encData;
}

export function Decrypt(word, key = "a") {
  let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8);
  let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes);
}
