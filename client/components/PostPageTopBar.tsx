import User from "./User";
import moment from "moment";
import "moment/locale/tr";

function PostPageTopBar({ user, _count, createdAt }) {
  const date = new Date(createdAt);
  moment.locale("tr");
  const formatedDate = moment(date, "YYYYMMDD").fromNow();
  return (
    <div className="flex flex-row justify-between mt-2">
      <User user={user} />
      <div className="flex space-x-1 xl:space-x-5">
        <p className="flex text-lg items-center whitespace-nowrap">
          {formatedDate}
        </p>
        <div className="flex text-lg space-x-1 items-center cursor-pointer active:translate-y-0.5">
          <i className="fas fa-heart text-2xl"></i>
          <span>{_count.postLikes}</span>
        </div>
        <div className="flex text-lg space-x-1 items-center cursor-pointer active:translate-y-0.5">
          <i className="fas fa-comment text-2xl"></i>
          <span>{_count.comments}</span>
        </div>
        <div className="flex text-lg space-x-1 items-center cursor-pointer active:translate-y-0.5">
          <i className="fas fa-eye text-2xl"></i>
          <span>{_count.postViews}</span>
        </div>
      </div>
    </div>
  );
}

export default PostPageTopBar;
