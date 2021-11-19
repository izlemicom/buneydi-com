import Link from "next/link";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import TrendLine from "../components/TrendLine";
import PostCardWide from "../components/PostCardWide";
import { GetServerSideProps } from "next";
import PostCardText from "../components/PostCardText";
import axios from "axios";

export default function Home({
  latestTags,
  somePosts,
  someTags,
  latestPostsData,
  mostViewedPostsData,
  mostLikedPostsData,
  mostTalkedPostsData,
}) {
  return (
    <div>
      <NavBar />
      <main className="lg:w-4/5 mx-5 lg:mx-auto">
        <div className="pt-2">
          <TrendLine posts={latestPostsData.posts} />
        </div>

        <SearchBar />
        <div className="lg:grid lg:grid-cols-3 py-2">
          <div className="lg:col-span-2 lg:mr-2">
            <div className="py-2 border-b-4 ">
              <Link href="/icerikler">
                <a className="flex text-3xl font-bold items-center space-x-2">
                  <i className="fas fa-eye text-4xl"></i>
                  <h1 className="hover:underline">En Çok Görüntülenenler</h1>
                </a>
              </Link>
            </div>
            {mostViewedPostsData.posts.map((post) => (
              <PostCardWide key={post.id} post={post} />
            ))}
            <div className="py-2 border-b-4 ">
              <Link href="/icerikler">
                <a className="flex text-3xl font-bold items-center space-x-2">
                  <i className="fas fa-comments text-4xl"></i>
                  <h1 className="hover:underline">Hakkında Çok Konuşulanlar</h1>
                </a>
              </Link>
            </div>
            {mostTalkedPostsData.posts.map((post) => (
              <PostCardWide key={post.id} post={post} />
            ))}
          </div>
          <div className="lg:flex mx-auto lg:flex-col lg:col-span-1">
            <div className="py-2 border-b-4 ">
              <Link href="/icerikler">
                <a className="flex text-3xl font-bold items-center space-x-2">
                  <i className="fas fa-heart text-4xl"></i>
                  <h1 className="hover:underline">En Çok Beğenilenler</h1>
                </a>
              </Link>
            </div>
            {mostLikedPostsData.posts.map((post) => (
              <PostCardText key={post.id} post={post} />
            ))}
            <div className="py-2 border-b-4 ">
              <Link href="/icerikler">
                <a className="flex text-3xl font-bold items-center space-x-2">
                  <i className="fas fa-hourglass-end text-4xl"></i>
                  <h1 className="hover:underline">En Son Yayınlananlar</h1>
                </a>
              </Link>
            </div>
            {latestPostsData.posts.map((post) => (
              <PostCardText key={post.id} post={post} />
            ))}
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
  const latestPostsData = await axios({
    params: {
      take: 5,
      cursor: "pointer",
      isfirst: true,
      type: "latest",
    },
    method: "GET",
    url: `/post/posts`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  const mostViewedPostsData = await axios({
    params: {
      take: 5,
      cursor: "pointer",
      isfirst: true,
      type: "mostViewed",
    },
    method: "GET",
    url: `/post/posts`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  const mostLikedPostsData = await axios({
    params: {
      take: 10,
      cursor: "pointer",
      isfirst: true,
      type: "mostLiked",
    },
    method: "GET",
    url: `/post/posts`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  const mostTalkedPostsData = await axios({
    params: {
      take: 4,
      cursor: "pointer",
      isfirst: true,
      type: "mostTalked",
    },
    method: "GET",
    url: `/post/posts`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
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
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
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
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
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
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  return {
    props: {
      somePosts,
      latestTags,
      someTags,
      latestPostsData,
      mostViewedPostsData,
      mostLikedPostsData,
      mostTalkedPostsData,
    },
  };
};
