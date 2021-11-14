import { convert } from "html-to-text";

export default function htmlToTextBuneydi(html: string): string {
  const text = convert(html, {
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "a", format: "skip" },
      { selector: "h1", format: "skip" },
      { selector: "table", format: "skip" },
      { selector: "ul", format: "skip" },
      { selector: "ol", format: "skip" },
      { selector: "nav", format: "skip" },
      { selector: "hr", format: "skip" },
      { selector: "form", format: "skip" },
      { selector: "footer", format: "skip" },
      { selector: "blockquote", format: "skip" },
      { selector: "aside", format: "skip" },
      { selector: "article", format: "skip" },
      { selector: "header", format: "skip" },
    ],
  });
  return text;
}
