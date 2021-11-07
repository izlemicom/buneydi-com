import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import PostCardWide from "../../components/PostCardWide";

function Tag({ data, tagSlug }) {
  let { tag, posts, postCount } = data;

  let a = "";
  if (postCount > 5) {
    a = posts[4].id;
  }
  let mainOption = "latest";
  const [allPosts, setAllPosts] = useState(posts);
  const [cursor, setCursor] = useState(a);

  async function morePosts() {
    if (allPosts.length >= postCount) return;
    let morePosts: any = await axios({
      params: {
        take: 5,
        cursor: cursor,
        type: mainOption,
        tagSlug: tagSlug,
      },
      method: "GET",
      url: `/tag/posts`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    }).then(function (response) {
      return response.data;
    });
    let newPosts = morePosts.posts;
    postCount = morePosts.postCount;
    if (newPosts.length === 5) setCursor(newPosts[4].id);
    console.log(newPosts);
    newPosts = allPosts.concat(newPosts);
    console.log(newPosts);
    setAllPosts(newPosts);
  }
  async function getFirstPosts(option) {
    const data: any = await axios({
      params: {
        take: 5,
        cursor: "pointer",
        isfirst: true,
        type: option,
        tagSlug: tagSlug,
      },
      method: "GET",
      url: `/tag/posts`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    }).then(function (response) {
      return response.data;
    });
    posts = data.posts;
    postCount = data.postCount;
    let a = "";
    if (postCount > 5) {
      a = posts[4].id;
    }
    mainOption = option;
    setAllPosts(posts);
    setCursor(a);
  }

  function handleChange(e) {
    switch (e.target.value) {
      case "1":
        getFirstPosts("latest");
        break;
      case "2":
        getFirstPosts("mostViewed");
        break;
      case "3":
        getFirstPosts("mostLiked");
        break;
      case "4":
        getFirstPosts("mostTalked");
        break;
    }
  }
  return (
    <div>
      <NavBar />
      <main className="mx-10 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
        <h1 className="text-4xl font-bold pt-4 uppercase">{tag?.content}</h1>
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
                      En Son Yayınlananlar
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
                      En Çok Görüntülenenler
                    </span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-pink-600"
                      name="radio-colors"
                      value="3"
                    />
                    <span className="ml-2 text-xl font-semibold">
                      En Çok Beğenilenler
                    </span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-yellow-700"
                      name="radio-colors"
                      value="4"
                    />
                    <span className="ml-2 text-xl font-semibold">
                      Hakkında Çok Konuşulanlar
                    </span>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div>
              {allPosts.map((post) => (
                <PostCardWide key={post.id} post={post} />
              ))}
            </div>
            <button
              onClick={morePosts}
              className="flex items-center justify-center rounded-lg py-1 my-2 text-white text-lg font-medium bg-indigo-500 w-full hover:bg-indigo-400 active:translate-y-0.5"
            >
              Daha Fazla İçerik Yükle
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const tagSlug = context.query.tag.toString();
  const data = await axios({
    params: {
      take: 5,
      cursor: "pointer",
      isfirst: true,
      type: "latest",
      tagSlug: tagSlug,
    },
    method: "GET",
    url: `/tag/posts`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  return {
    props: {
      tagSlug,
      data,
    },
  };
};
export default Tag;
