import axios from "axios";
import { useState } from "react";
import PostCardTextSearch from "./PostCardTextSearch";
import Link from "next/link";

function SearchBar() {
  const [posts, setPosts] = useState([]);
  async function textChange(e) {
    e.preventDefault();
    if (e.target.value === "") setPosts([]);
    let text = e.target.value;
    text = text.replace(/ /g, " & ");
    const newPosts: any = await axios({
      params: {
        text: text,
      },
      method: "GET",
      url: `/post/search`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    })
      .then(function (response) {
        return response.data;
      })
      .catch((error) => console.log(error));
    setPosts(newPosts);
  }
  return (
    <div className="flex flex-col items-center justify-center md:h-80 h-40 rounded-xl bg-gradient-to-r from-gray-300 via-gray-500 to-gray-400">
      <div className="hidden md:flex md:flex-col  mx-auto py-2">
        <p className="text-5xl py-1 mx-auto text-gray-100">Hoş Geldiniz.</p>
        <p className="text-xl mx-auto text-gray-100">
          Neyin ne olduğunu öğrenin, öğretin ve yazın...
        </p>
      </div>
      <div className="flex flex-col items-center mx-auto w-full p-2 md:p-6">
        <div className="flex bg-gray-100 p-4 w-full space-x-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            onChange={textChange}
            className="bg-gray-100 outline-none w-full"
            type="text"
            placeholder="Ne Neydi?"
          />
        </div>
        {posts && (
          <div className="relative w-full">
            <div className="absolute top-0 w-full bg-white rounded-2xl z-10">
              {posts.map((post) => (
                <PostCardTextSearch post={post} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center">
        <p className="text-gray-100 font-bold text-xl">
          Yazar olmak ister misiniz?
        </p>
        <Link href={process.env.NEXT_PUBLIC_BASE_AUTHOR_URL}>
          <a className="text-gray-100 bg-red-700 hover:bg-red-800 font-bold rounded-lg text-xl mx-3 px-3 py-2 text-center inline-flex items-center">
            Yazar Ol!
          </a>
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
