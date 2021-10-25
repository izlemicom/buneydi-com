import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import PostCardWide from "../components/PostCardWide";

function Icerikler({ data }) {
  let { posts, postCount } = data;
  let a = "";
  if (postCount > 4) {
    a = posts[3].id;
  }
  let mainOption = "getlatestposts";
  const [allPosts, setAllPosts] = useState(posts);
  const [cursor, setCursor] = useState(a);

  async function morePosts() {
    if (allPosts.length >= postCount) return;
    let morePosts: any = await axios({
      method: "GET",
      url: `http://localhost:3000/api/${mainOption}?a=${5}&cursor=${cursor}`,
    }).then(function (response) {
      return response.data;
    });
    if (morePosts.length === 4) setCursor(morePosts[3].id);
    morePosts = allPosts.concat(morePosts);
    setAllPosts(morePosts);
  }
  async function getFirstPosts(option) {
    const data: any = await axios({
      method: "GET",
      url: `http://localhost:3000/api/${option}?a=${5}&isfirst=${true}`,
    }).then(function (response) {
      return response.data;
    });
    posts = data.posts;
    postCount = data.postCount;
    let a = "";
    if (postCount > 4) {
      a = posts[3].id;
    }
    mainOption = option;
    setAllPosts(posts);
    setCursor(a);
  }

  function handleChange(e) {
    switch (e.target.value) {
      case "1":
        getFirstPosts("getlatestposts");
        break;
      case "2":
        getFirstPosts("getmostviewedposts");
        break;
      case "3":
        getFirstPosts("getmostlikedposts");
        break;
      case "4":
        getFirstPosts("getmosttalkedposts");
        break;
      default:
        getFirstPosts("getlatestposts");
    }
  }

  return (
    <div>
      <NavBar />
      <main className="mx-10 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
        <h1 className="text-4xl font-bold pt-4">İçerikler</h1>
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
  const data = await axios({
    method: "GET",
    url: `http://localhost:3000/api/getlatestposts?a=${5}&isfirst=${true}`,
  }).then(function (response) {
    return response.data;
  });
  return {
    props: {
      data,
    },
  };
};

export default Icerikler;
