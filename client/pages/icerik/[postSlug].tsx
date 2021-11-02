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

function PostPage({ post, relatedPosts, firstComments }) {
  const isServer = typeof window === "undefined";

  async function getClientIp(url: string) {
    return await axios({
      method: "GET",
      url: url,
    }).then(function (response) {
      return response.data;
    });
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
      .catch(function (err) {
        console.log(err);
      });
  }
  if (!isServer) {
    setView();
  }

  return (
    <div>
      <NavBar />
      <main className="mx-10 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
        <div className="lg:grid lg:grid-cols-4 lg:space-x-4">
          <div className="hidden lg:grid lg:col-span-1 lg:pt-14"></div>
          <div className="lg:col-span-2">
            <ArticleContent post={post} />
            <CommentsPostPage
              commentsCount={post._count.comments}
              firstComments={firstComments}
              postId={post.id}
            />
          </div>
          <div className="lg:col-span-1 lg:pt-14">
            <TagsPostPage tags={post.tags} />
            <SimilarPosts relatedPosts={relatedPosts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  let relatedPosts;
  if (!post.tags) {
    relatedPosts = await axios({
      params: {
        tagSlug: post.tags[0].slug ? post.tags[0].slug : new Date().toISOString,
        postId: post.id,
        take: 6,
        type: "related",
      },
      method: "GET",
      url: `/post/posts`,
      baseURL: process.env.BASE_API_URL,
    }).then(function (response) {
      return response.data;
    });
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
  return {
    props: {
      post,
      relatedPosts,
      firstComments,
    },
  };
};
export default PostPage;
