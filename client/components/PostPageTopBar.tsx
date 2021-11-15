import User from "./User";
import moment from "moment";
import "moment/locale/tr";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function PostPageTopBar({ user, _count, createdAt, postId, session }) {
  const date = new Date(createdAt);
  moment.locale("tr");
  const formatedDate = moment(date, "YYYYMMDD").fromNow();
  const [postlikes, setPostLikes] = useState(_count.postLikes);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState();

  async function like() {
    if (!session) {
      toast.error("Giriş yapmalısınız.");
      return;
    }
    if (liked) {
      const like: any = await axios({
        withCredentials: true,
        data: {
          likeId: likeId,
        },
        method: "DELETE",
        url: `/post/like`,
        baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      }).then(function (response) {
        return response.data;
      });
      setLiked(false);
      setLikeId(null);
      let likeCount = postlikes + -1;
      setPostLikes(likeCount);
    } else {
      const like: any = await axios({
        withCredentials: true,
        data: {
          userId: session.id,
          postId: postId,
        },
        method: "POST",
        url: `/post/like`,
        baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      }).then(function (response) {
        return response.data;
      });

      setLiked(true);
      setLikeId(like.id);
      let likeCount = postlikes + 1;
      setPostLikes(likeCount);
    }
  }

  async function getLike() {
    if (!session) return;
    const like: any = await axios({
      withCredentials: true,
      params: {
        userId: session.id,
        postId: postId,
      },
      method: "GET",
      url: `/post/like`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    }).then(function (response) {
      return response.data;
    });
    if (like) setLiked(true);
    if (like) setLikeId(like.id);
  }
  useEffect(() => {
    getLike();
  }, []);

  return (
    <div className="flex flex-row justify-between mt-2">
      <User user={user} />
      <div className="flex space-x-1 xl:space-x-5">
        <p className="flex text-lg items-center whitespace-nowrap">
          {formatedDate}
        </p>
        <div className="flex text-lg space-x-1 items-center ">
          <button onClick={like} className="flex items-center">
            {liked ? (
              <>
                <i className="fas fa-heart text-2xl text-red-500 cursor-pointer  active:animate-ping"></i>
              </>
            ) : (
              <>
                <i className="far fa-heart text-2xl text-red-500 cursor-pointer active:animate-ping"></i>
              </>
            )}
          </button>

          <span>{postlikes}</span>
        </div>
        <div className="flex text-lg space-x-1 items-center">
          <i className="fas fa-comment text-2xl"></i>
          <span>{_count.comments}</span>
        </div>
        <div className="flex text-lg space-x-1 items-center">
          <i className="fas fa-eye text-2xl"></i>
          <span>{_count.postViews}</span>
        </div>
      </div>
    </div>
  );
}

export default PostPageTopBar;
