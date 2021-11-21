import digger from "html-img-digger";

export default async function imageExtracter(str: string) {
  const images = await digger.dig(str);
  let urls = images.map((image) => {
    const url = image.url;
    const arr = url.split("/");
    const file = arr[arr.length - 1];
    return file;
  });
  return urls;
}
