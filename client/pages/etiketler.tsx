import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Tag from "../components/Tag";
import { NextSeo } from "next-seo";

function Etiketler({ somePosts, latestTags, someTags, data }) {
  const SEO = {
    title: "Etiketler | BuNeydi - İçerik Platformu",
    description: "BuNeydi İçerik Platformunda bulunan tüm etiketler.",
    canonical: "https://www.buneydi.com/etiketler",
    openGraph: {
      url: "https://www.buneydi.com/etiketler",
    },
  };
  let { tags, tagsCount } = data;
  let a = "";
  if (tagsCount > 20) {
    a = tags[19].id;
  }
  let mainOption = "latest";
  const [allTags, setAllTags] = useState(tags);
  const [cursor, setCursor] = useState(a);

  async function moreTags() {
    if (allTags.length >= tagsCount) return;
    let morePosts: any = await axios({
      params: {
        take: 20,
        cursor: cursor,
        type: mainOption,
      },
      method: "GET",
      url: `/tag/tags`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    }).then(function (response) {
      return response.data;
    });
    let newPosts = morePosts.posts;
    tagsCount = morePosts.tagsCount;
    if (newPosts.length === 5) setCursor(newPosts[4].id);
    console.log(newPosts);
    newPosts = allTags.concat(newPosts);
    console.log(newPosts);
    setAllTags(newPosts);
  }
  async function getFirstTags(option) {
    const data: any = await axios({
      params: {
        take: 20,
        cursor: "pointer",
        isfirst: true,
        type: option,
      },
      method: "GET",
      url: `/tag/tags`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    }).then(function (response) {
      return response.data;
    });
    tags = data.tags;
    tagsCount = data.tagsCount;
    let a = "";
    if (tagsCount > 20) {
      a = tags[19].id;
    }
    mainOption = option;
    setAllTags(tags);
    setCursor(a);
  }

  function handleChange(e) {
    switch (e.target.value) {
      case "1":
        getFirstTags("latest");
        break;
      case "2":
        getFirstTags("mostMentioned");
        break;
    }
  }

  return (
    <div>
      <NextSeo {...SEO} />
      <NavBar />
      <main className="mx-10 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
        <h1 className="text-4xl font-bold pt-4">Etiketler</h1>
        <div className="lg:grid lg:grid-cols-4 lg:space-x-4">
          <div className="lg:grid lg:col-span-1">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold pt-2">Sırala</span>
              <form className="border-2 rounded-lg p-3" onChange={handleChange}>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="radio-colors"
                      value="1"
                      defaultChecked
                    />
                    <span className="ml-2 text-xl font-semibold">
                      En Son Ekleneler
                    </span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-green-500"
                      name="radio-colors"
                      value="2"
                    />
                    <span className="ml-2 text-xl font-semibold">
                      En Çok Bahsedilenler
                    </span>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="flex flex-wrap py-2 rounded-lg border-2">
              {allTags.map((tag) => (
                <Tag key={tag.id} tag={tag} />
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={moreTags}
          className="flex items-center justify-center rounded-lg py-1 my-2 text-white text-lg font-medium bg-indigo-500 w-full hover:bg-indigo-400 active:translate-y-0.5"
        >
          Daha Fazla Etiket Yükle
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
    params: {
      take: 20,
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
      data,
    },
  };
};

export default Etiketler;
