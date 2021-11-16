import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { commentsAdd } from "../atoms/recoil";

function CommentPost({ postid, session }) {
  const [addedComments, setAddedComments] = useRecoilState(commentsAdd);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!session) {
      toast.error("Giriş yapmalısınız.");
      return;
    }
    const content = e.target.elements.body.value;
    const userId = session.id;
    const postId = postid;
    const response = await axios({
      withCredentials: true,
      method: "POST",
      url: "/comment/comment",
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      data: {
        content: content,
        postId: postId,
        userId: userId,
      },
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (err) {
        toast.error(err.response.data.error);
      });
    let newComments = [];
    newComments.push(response);
    if (addedComments) {
      newComments = newComments.concat(addedComments);
    }
    setAddedComments(newComments);
  }
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <div className="flex items-center py-2 text-xl border-b space-x-2">
          <i className="fas fa-comment"></i>
          <span>Yorum Ekle</span>
        </div>
        <div className="w-full mb-2 mt-2 py-2">
          <textarea
            className="bg-gray-100 rounded-lg border-gray-400 border-2 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-white focus:placeholder-gray-300"
            name="body"
            placeholder="Yorumunuzu yazın..."
            required
          ></textarea>
        </div>
        <div className="w-full flex justify-end">
          <div className="-mr-1">
            <input
              type="submit"
              className="text-white text-lg font-medium bg-indigo-500 py-1 px-4 border rounded-lg tracking-wide mr-1 hover:bg-indigo-400 active:translate-y-0.5"
              value="Yorum Ekle"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentPost;
