import moment from "moment";
import "moment/locale/tr";
import Link from "next/link";

function PostCardText({ post }) {
  const date = new Date(post.createdAt);
  moment.locale("tr");
  const formatedDate = moment(date, "YYYYMMDD").fromNow();
  return (
    <div className="mx-auto lg:flex lg:flex-row lg:h-auto my-3">
      <div className="bg-white border p-3 rounded-bl-md rounded-br-md lg:rounded-bl-none lg:rounded-tr-md">
        <Link href={`/icerik/${post.slug}`}>
          <a>
            <h2 className="text-2xl font-bold hover:underline line-clamp-1">
              {post.title}
            </h2>
          </a>
        </Link>
        <div className="font-normal text-gray-700 mt-2 line-clamp-2">
          <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
        </div>
      </div>
    </div>
  );
}

export default PostCardText;
