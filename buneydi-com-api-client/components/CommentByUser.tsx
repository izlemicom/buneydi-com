import moment from "moment";
import "moment/locale/tr";

function CommentByUser({ comment }) {
  const date = new Date(comment.createdAt);
  moment.locale("tr");
  const formatedDate = moment(date, "YYYYMMDD").fromNow();
  return (
    <div className="relative flex flex-row border-2  rounded-lg px-1 py-3 my-2">
      <div className="flex justify-start items-center">
        <img
          className="h-10 w-10 rounded-full ml-2"
          src={comment.user.image}
          alt={comment.user.name}
        />
        <p className="ml-2 font-semibold whitespace-nowrap">
          {comment.user.name}
        </p>
        <p className="border-l-4 ml-3 pl-2">{comment.content}</p>
      </div>
      <div className="flex absolute right-0 -bottom-1 z-10 space-x-3 mx-2">
        <span className="flex items-center">{formatedDate}</span>
        <div className="flex items-center space-x-1  cursor-pointer active:translate-y-0.5">
          <i className="far fa-heart text-red-700"></i>
          <span>{comment._count.commentLikes}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentByUser;
