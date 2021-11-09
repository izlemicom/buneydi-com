import { convert } from "html-to-text";

export default function htmlToTextBuneydi(html: string): string {
  const text = convert(html, {
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "a", format: "skip" },
      { selector: "h1", format: "skip" },
      { selector: "h2", format: "skip" },
      { selector: "h3", format: "skip" },
      { selector: "h4", format: "skip" },
      { selector: "h5", format: "skip" },
      { selector: "h6", format: "skip" },
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
