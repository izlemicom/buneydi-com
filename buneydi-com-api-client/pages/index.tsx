import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import TrendLine from "../components/TrendLine";
import PostCardWide from "../components/PostCardWide";
import { GetServerSideProps } from "next";
import PostCardText from "../components/PostCardText";
import axios from "axios";
export default function Home({
  latestPostsData,
  mostViewedPostsData,
  mostLikedPostsData,
  mostTalkedPostsData,
}) {
  return (
    <div>
      <Head>
        <title>BuNeydi.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="lg:w-4/5 mx-5 lg:mx-auto">
        <TrendLine posts={latestPostsData.posts} />
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
            {mostLikedPostsData.posts.map((post) => (
              <PostCardText key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const latestPostsData = await axios({
    method: "GET",
    url: `http://localhost:3000/api/getlatestposts?a=${5}&isfirst=${true}`,
  }).then(function (response) {
    return response.data;
  });
  const mostViewedPostsData = await axios({
    method: "GET",
    url: `http://localhost:3000/api/getmostviewedposts?a=${5}&isfirst=${true}`,
  }).then(function (response) {
    return response.data;
  });
  const mostLikedPostsData = await axios({
    method: "GET",
    url: `http://localhost:3000/api/getmostlikedposts?a=${15}&isfirst=${true}`,
  }).then(function (response) {
    return response.data;
  });
  const mostTalkedPostsData = await axios({
    method: "GET",
    url: `http://localhost:3000/api/getmosttalkedposts?a=${4}&isfirst=${true}`,
  }).then(function (response) {
    return response.data;
  });
  return {
    props: {
      latestPostsData,
      mostViewedPostsData,
      mostLikedPostsData,
      mostTalkedPostsData,
    },
  };
};
