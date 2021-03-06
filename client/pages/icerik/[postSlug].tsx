import { GetServerSideProps } from "next";
import axios from "axios";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import PostPageTopBar from "../../components/PostPageTopBar";
import ArticleContent from "../../components/ArticleContent";
import TagsPostPage from "../../components/TagsPostPage";
import SimilarPosts from "../../components/SimilarPosts";
import { useState } from "react";
import CommentsPostPage from "../../components/CommentsPostPage";
import Head from "next/head";
import { getSession } from "next-auth/react";
import htmlToTextBuneydi from "../../lib/htmlToTextBuneydi";
import { NewsArticleJsonLd, NextSeo } from "next-seo";

function PostPage({
  somePosts,
  latestTags,
  someTags,
  post,
  relatedPosts,
  firstComments,
  session,
}) {
  const description = htmlToTextBuneydi(post.content).replace(/\r?\n|\r/g, " ");
  let combinedTags: string[] = [];
  post.tags.map((tag) => {
    combinedTags.push(tag.content);
  });
  const SEO = {
    title: post.title,
    description:
      description.split(".")[0] + "." + description.split(".")[1] + ".",
    canonical: "https://www.buneydi.com/icerik/" + post.slug,
    openGraph: {
      type: "article",
      article: {
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: ["https://www.buneydi.com/yazar/" + post.user.id],
        tags: combinedTags,
      },
      locale: "tr_TR",
      images: [
        {
          url: post.mainImage,
          alt: post.title,
        },
      ],
      url: "https://www.buneydi.com/icerik/" + post.slug,
      site_name: "BuNeydi",
    },
  };

  const isServer = typeof window === "undefined";

  async function getClientIp(url: string) {
    return await axios({
      method: "GET",
      url: url,
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (err) {});
  }

  async function setView() {
    const result: any = await getClientIp(
      "https://api64.ipify.org/?format=json"
    );
    const response = await axios({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      method: "POST",
      url: `/post/view`,
      data: {
        ip: result.ip,
        postid: post.id,
        userid: post.user.id,
      },
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (err) {});
  }
  if (!isServer) {
    setView();
  }

  return (
    <div>
      <NextSeo {...SEO} />
      <NewsArticleJsonLd
        url={"https://www.buneydi.com/icerik/" + post.slug}
        title={post.title}
        images={[post.mainImage]}
        section={post.tags[0] ? post.tags[0].content : "i??erik"}
        keywords={combinedTags.toString()}
        dateCreated={post.createdAt}
        datePublished={post.createdAt}
        dateModified={post.updatedAt}
        authorName={post.user.name}
        publisherName="BuNeydi"
        publisherLogo="https://www.buneydi.com/android-chrome-512x512.png"
        description={
          description.split(".")[0] + "." + description.split(".")[1] + "."
        }
        body={description}
      />
      <NavBar />
      <main className="mx-10 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
        <div className="lg:grid lg:grid-cols-4 lg:space-x-4">
          <div className="hidden lg:grid lg:col-span-1 lg:pt-14"></div>
          <div className="lg:col-span-2">
            <ArticleContent post={post} session={session} />
            <CommentsPostPage
              commentsCount={post._count.comments}
              firstComments={firstComments}
              postId={post.id}
              session={session}
            />
          </div>
          <div className="lg:col-span-1 lg:pt-14">
            <TagsPostPage tags={post.tags} />
            <SimilarPosts relatedPosts={relatedPosts} />
          </div>
        </div>
      </main>
      <Footer
        someTags={someTags}
        latestTags={latestTags?.tags}
        somePosts={somePosts}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const post: any = await axios({
    params: {
      slug: context.query.postSlug,
    },
    method: "GET",
    url: `/post/post`,
    baseURL: process.env.BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  if (!post) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  let relatedPosts = null;
  if (post.tags) {
    let combinedTags = [];
    post.tags.map((tag) => {
      combinedTags.push(tag.content);
    });

    relatedPosts = await axios({
      params: {
        tagSlug: combinedTags
          .join(" ")
          .replace(/[&\/\\#,+()$~%.'":*?<>{}!]/g, "")
          .replace(/ /g, " | "),
        postId: post.id,
        take: 20,
        type: "related",
      },
      method: "GET",
      url: `/post/posts`,
      baseURL: process.env.BASE_API_URL,
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error.response.data.error);
      });
    if (!relatedPosts) {
      relatedPosts = null;
    }
  } else relatedPosts = null;

  const firstComments = await axios({
    params: {
      take: 4,
      postId: post.id,
      isfirst: true,
      cursor: "pointer",
    },
    method: "GET",
    url: `/comment/comments`,
    baseURL: process.env.BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });

  const someTags = await axios({
    params: {
      take: 10,
      cursor: "pointer",
      isfirst: true,
      type: "someTags",
    },
    method: "GET",
    url: `/tag/tags`,
    baseURL: process.env.BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  const latestTags = await axios({
    params: {
      take: 10,
      cursor: "pointer",
      isfirst: true,
      type: "latest",
    },
    method: "GET",
    url: `/tag/tags`,
    baseURL: process.env.BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  const somePosts = await axios({
    params: {
      take: 6,
      cursor: "pointer",
      isfirst: true,
      type: "somePosts",
    },
    method: "GET",
    url: `/post/posts`,
    baseURL: process.env.BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  return {
    props: {
      somePosts,
      latestTags,
      someTags,
      post,
      relatedPosts,
      firstComments,
      session,
    },
  };
};
export default PostPage;
