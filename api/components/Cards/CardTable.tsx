import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

// components
import TableDropdown from "../Dropdowns/TableDropdown";
import axios from "axios";

export default function CardTable({ color, title, firstPosts, session, type }) {
  let posts = firstPosts?.posts;
  let postCount = firstPosts?.postCount;
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
        authorId: session.id,
      },
      method: "GET",
      url: `/author/${type}s`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
      });
    let newPosts = morePosts.posts;
    postCount = morePosts.postCount;
    if (newPosts.length === 5) setCursor(newPosts[4].id);
    newPosts = allPosts.concat(newPosts);
    setAllPosts(newPosts);
  }
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Başlık
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Görüntülenme
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Yorum
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Beğeni
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {allPosts &&
                allPosts.map((post) => (
                  <tr key={post.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        width="100"
                        src={post.mainImage}
                        className="bg-white border, object-cover"
                        alt={post.title}
                      ></img>
                      <span
                        className={
                          "ml-3 font-bold truncate" +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {post.title}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-eye mr-2"></i>{" "}
                      {post._count.postViews}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-comment mr-2"></i>{" "}
                      {post._count.comments}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-heart text-red-500 mr-2"></i>{" "}
                      {post._count.postLikes}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <TableDropdown
                        slug={post.slug}
                        postId={post.id}
                        type={type}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <a
            onClick={morePosts}
            className="flex items-center justify-center py-1 text-white font-medium bg-indigo-500 w-full hover:bg-indigo-400 cursor-pointer"
          >
            Daha Fazla...
          </a>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
