import { useEffect, useState } from "react";
import ArticleContent from "../components/ArticleContent";
import { Decrypt } from "../lib/CRYPT";
import axios from "axios";
import { getSession } from "next-auth/react";
import { NextSeo } from "next-seo";

function OnIzle({ lastData, session }) {
  const [post, setPost] = useState(lastData);
  let SEO = {};
  if (post) {
    SEO = {
      title: post.title,
    };
  }

  return (
    <div>
      <NextSeo {...SEO} />
      {post && (
        <main className="mx-10 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
          <div className="lg:grid lg:grid-cols-4 lg:space-x-4">
            <div className="hidden lg:grid lg:col-span-1 lg:pt-14"></div>
            <div className="lg:col-span-2">
              <ArticleContent post={post} session={session} />
            </div>
            <div className="lg:col-span-1 lg:pt-14"></div>
          </div>
        </main>
      )}
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session)
    return {
      props: {},
    };
  if (!ctx.query.post)
    return {
      props: {
        session,
      },
    };
  const decryptedData = Decrypt(ctx.query.post.toString());
  const lastData = await axios({
    params: {
      slug: decryptedData.slug,
    },
    method: "GET",
    url: `/post/draft`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  return {
    props: {
      lastData,
      session,
    },
  };
}
export default OnIzle;
