import axios from "axios";
import { useState } from "react";
import CommentByUser from "./CommentByUser";
import CommentPost from "./CommentPost";

function CommentsPostPage({ commentsCount, firstComments, postId }) {
  let a = "";
  if (commentsCount > 4) {
    a = firstComments[3].id;
  }

  const [comments, setComments] = useState(firstComments);
  const [cursor, setCursor] = useState(a);

  async function moreComments() {
    if (comments.length >= commentsCount) return;
    let moreComments: any = await axios({
      data: {
        take: 4,
        cursor: cursor,
        postId: postId,
      },
      method: "GET",
      url: `/comment/comments`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    }).then(function (response) {
      return response.data;
    });
    if (moreComments.length === 4) setCursor(moreComments[3].id);
    moreComments = comments.concat(moreComments);
    setComments(moreComments);
  }

  function addComment(comment) {
    let addedComments = comments;
    addedComments.unshift(comment);
    setComments(addedComments);
  }

  return (
    <div>
      {comments.length > 0 && (
        <div>
          <div className="flex items-center py-2 text-xl border-b space-x-2">
            <i className="fas fa-comments"></i>
            <span>Yorumlar</span>
          </div>
          <div className="py-2">
            {comments.map((comment) => (
              <CommentByUser key={comment.id} comment={comment} />
            ))}
          </div>
          <button
            onClick={moreComments}
            className="flex items-center justify-center rounded-lg py-1 mb-2 text-white text-lg font-medium bg-indigo-500 w-full hover:bg-indigo-400 active:translate-y-0.5"
          >
            Daha Fazla Yorum Yükle
          </button>
        </div>
      )}
      <CommentPost postid={postId} addComment={addComment} />
    </div>
  );
}

export default CommentsPostPage;
