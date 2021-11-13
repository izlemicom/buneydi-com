import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import AuthorListItem from "../components/AuthorListItem";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Yazarlar({ somePosts, latestTags, someTags, data }) {
  const { authors, authorCount } = data;

  let a = "";
  if (authorCount > 20) {
    a = authors[19].id;
  }

  const [allAuthors, setAllAuthors] = useState(authors);
  const [cursor, setCursor] = useState(a);

  async function moreAuthors() {
    if (allAuthors.length >= authorCount) return;
    let moreAuthors: any = await axios({
      params: { take: 20, cursor: cursor },
      method: "GET",
      url: `/author/authors`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    }).then(function (response) {
      return response.data;
    });
    if (moreAuthors.length === 20) setCursor(moreAuthors[19].id);
    moreAuthors = allAuthors.concat(moreAuthors);
    setAllAuthors(moreAuthors);
  }

  return (
    <div>
      <NavBar />
      <main className="mx-2 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
        <h1 className="text-4xl font-bold py-2">Yazarlar</h1>
        <div className="flex flex-wrap justify-center items-center border-2 rounded-lg mx-auto">
          {allAuthors.map((author, index) => (
            <AuthorListItem key={author.id} author={author} index={index} />
          ))}
        </div>
        <button
          onClick={moreAuthors}
          className="flex items-center justify-center rounded-lg py-1 my-2 text-white text-lg font-medium bg-indigo-500 w-full hover:bg-indigo-400 active:translate-y-0.5"
        >
          Daha Fazla Yazar Yükle
        </button>
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
  const data = await axios({
    params: { take: 20, isfirst: true, cursor: false },
    method: "GET",
    url: `/author/authors`,
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
      data,
    },
  };
};

export default Yazarlar;
