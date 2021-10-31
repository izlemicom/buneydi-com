export default function cuuid() {
  const str = (
    Date.now().toString(16) +
    Math.random().toString(16).slice(2) +
    Math.random().toString(16).slice(2) +
    Math.random().toString(16).slice(2)
  ).slice(0, 32);
  return (
    str.slice(0, 8) +
    "-" +
    str.slice(8, 12) +
    "-" +
    str.slice(12, 16) +
    "-" +
    str.slice(16, 20) +
    "-" +
    str.slice(20)
  );
}
