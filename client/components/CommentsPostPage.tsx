import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { commentsAdd } from "../atoms/recoil";
import CommentByUser from "./CommentByUser";
import CommentPost from "./CommentPost";

function CommentsPostPage({ commentsCount, firstComments, postId, session }) {
  let a = "";
  if (commentsCount > 4) {
    a = firstComments[3].id;
  }

  const [comments, setComments] = useState(firstComments);
  const [cursor, setCursor] = useState(a);
  const [addedComments, setAddedComments] = useRecoilState(commentsAdd);

  async function moreComments() {
    if (comments.length >= commentsCount) return;
    let moreComments: any = await axios({
      params: {
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

  return (
    <div>
      {(comments.length > 0 || addedComments) && (
        <div>
          <div className="flex items-center py-2 text-xl border-b space-x-2">
            <i className="fas fa-comments"></i>
            <span>Yorumlar</span>
          </div>
          <div className="py-2">
            {addedComments &&
              addedComments.map((comment) => (
                <CommentByUser
                  key={comment.id}
                  comment={comment}
                  session={session}
                />
              ))}
            {comments.map((comment) => (
              <CommentByUser
                key={comment.id}
                comment={comment}
                session={session}
              />
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
      <CommentPost postid={postId} session={session} />
    </div>
  );
}

export default CommentsPostPage;
