import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import CardProfile from "../../components/CardProfile";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import PostCardWide from "../../components/PostCardWide";
import { NextSeo, SocialProfileJsonLd } from "next-seo";

function Author({ data, author, someTags, somePosts, latestTags }) {
  const names = author.user.name.split(" ");
  const SEO = {
    title: author.user.name + " - BuNeydi Yazarı",
    description: author.user.bio,
    canonical: "https://www.buneydi.com/yazar/" + author.user.id,
    openGraph: {
      type: "profile",
      profile: {
        firstName: names[0],
        lastName: names[1],
        username: author.user.mahlas,
      },
      locale: "tr_TR",
      images: [
        {
          url: author.user.image,
          alt: author.user.name,
        },
      ],
      url: "https://www.buneydi.com/yazar/" + author.user.id,
      site_name: "BuNeydi",
    },
  };
  let { posts, postCount } = data;
  let a = "";
  if (postCount > 5) {
    a = posts[4].id;
  }
  const [allPosts, setAllPosts] = useState(posts);
  const [cursor, setCursor] = useState(a);

  async function morePosts() {
    if (allPosts.length >= postCount) return;
    let morePosts: any = await axios({
      params: {
        take: 5,
        cursor: cursor,
        authorId: author.user.id,
      },
      method: "GET",
      url: `/author/posts`,
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
  return (
    <div>
      <NextSeo {...SEO} />
      <SocialProfileJsonLd
        type="Person"
        name={author.user.name}
        url={"https://www.buneydi.com/yazar/" + author.user.id}
        sameAs={[`https://www.buneydi.com/yazar/${author.user.id}`]}
      />
      <NavBar />
      <main className="lg:w-4/5 mx-5 lg:mx-auto">
        <CardProfile data={author} />
        <div className="lg:col-span-3">
          <div>
            <div className="flex text-2xl font-bold items-center space-x-2">
              <i className="fas fa-newspaper"></i>
              <span>İçerikler</span>
            </div>

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
  const author: any = await axios({
    params: {
      userId: context.query.author,
    },
    method: "GET",
    url: `/author/author`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  const data = await axios({
    params: {
      take: 5,
      cursor: "pointer",
      isfirst: true,
      authorId: author.user.id,
    },
    method: "GET",
    url: `/author/posts`,
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
      author,
    },
  };
};

export default Author;
