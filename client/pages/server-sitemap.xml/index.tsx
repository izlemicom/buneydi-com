import axios from "axios";
import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let fields: ISitemapField[] = [];
  const posts: any = await axios({
    params: {
      type: "allPosts",
    },
    method: "GET",
    url: `/post/posts`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });

  const tags: any = await axios({
    params: {
      type: "allTags",
    },
    method: "GET",
    url: `/tag/tags`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });

  const authors: any = await axios({
    params: {
      type: "allAuthors",
    },
    method: "GET",
    url: `/author/authors`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });

  const postFields: ISitemapField[] = posts.map((post) => ({
    loc: `https://www.buneydi.com/icerik/${post.slug}`,
    lastmod: post.updatedAt,
  }));

  const tagFields: ISitemapField[] = tags.map((tag) => ({
    loc: `https://www.buneydi.com/etiket/${tag.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const authorFields: ISitemapField[] = authors.map((author) => ({
    loc: `https://www.buneydi.com/yazar/${author.id}`,
    lastmod: new Date().toISOString(),
  }));
  fields = fields.concat(postFields);

  fields = fields.concat(tagFields);

  fields = fields.concat(authorFields);

  return getServerSideSitemap(context, fields);
};

export default function SiteMap() {}
