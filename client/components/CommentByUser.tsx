import axios from "axios";
import moment from "moment";
import "moment/locale/tr";
import { useEffect, useState } from "react";

function CommentByUser({ comment, session }) {
  const date = new Date(comment.createdAt);
  moment.locale("tr");
  const formatedDate = moment(date, "YYYYMMDD").fromNow();

  const [commentlikes, setCommentLikes] = useState(comment._count.commentLikes);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState();

  async function like() {
    if (!session) return;

    if (liked) {
      const like: any = await axios({
        withCredentials: true,
        data: {
          likeId: likeId,
        },
        method: "DELETE",
        url: `/comment/like`,
        baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      }).then(function (response) {
        return response.data;
      });
      setLiked(false);
      setLikeId(null);
      let likeCount = commentlikes + -1;
      setCommentLikes(likeCount);
    } else {
      const like: any = await axios({
        withCredentials: true,
        data: {
          userId: session.id,
          commentId: comment.id,
        },
        method: "POST",
        url: `/comment/like`,
        baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      }).then(function (response) {
        return response.data;
      });

      setLiked(true);
      setLikeId(like.id);
      let likeCount = commentlikes + 1;
      setCommentLikes(likeCount);
    }
  }

  async function getLike() {
    if (!session) return;

    const like: any = await axios({
      withCredentials: true,
      params: {
        userId: session.id,
        commentId: comment.id,
      },
      method: "GET",
      url: `/comment/like`,
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
    <div className="relative flex flex-row border-2  rounded-lg px-1 py-3 my-2">
      <div className="flex justify-start items-center">
        <img
          className="h-10 w-10 rounded-full ml-2 object-cover"
          src={comment.user.image}
          alt={comment.user.name}
        />
        <p className="ml-2 font-semibold whitespace-nowrap">
          {comment.user.name}
        </p>
        <p className="border-l-4 ml-3 pl-2">{comment.content}</p>
      </div>
      <div className="flex absolute right-0 bottom-0 z-10 space-x-3 mx-2">
        <span className="flex items-center">{formatedDate}</span>
        <div className="flex items-center space-x-1">
          <button onClick={like} className="flex items-center">
            {liked ? (
              <>
                <i className="fas fa-heart text-xl text-red-500 cursor-pointer  active:animate-ping"></i>
              </>
            ) : (
              <>
                <i className="far fa-heart text-xl text-red-500 cursor-pointer active:animate-ping"></i>
              </>
            )}
          </button>
          <span>{commentlikes}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentByUser;
