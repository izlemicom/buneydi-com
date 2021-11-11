import moment from "moment";
import "moment/locale/tr";
import Link from "next/link";
import htmlToTextBuneydi from "../lib/htmlToTextBuneydi";

function PostCardWide({ post }) {
  const date = new Date(post.createdAt);
  moment.locale("tr");
  const formatedDate = moment(date, "YYYYMMDD").fromNow();
  return (
    <div className="mx-auto lg:flex lg:flex-row lg:h-auto my-3">
      <img
        className="rounded-tr-md rounded-tl-md h-48 w-full lg:h-auto lg:w-4/12 lg:rounded-bl-md lg:rounded-tr-none object-cover object-center"
        src={post.mainImage}
        alt={post.title}
      />
      <div className="bg-white border p-8 rounded-bl-md rounded-br-md lg:rounded-bl-none lg:rounded-tr-md">
        <Link href={`/icerik/${post.slug}`}>
          <a>
            <h2 className="text-2xl font-bold hover:underline line-clamp-1">
              {post.title}
            </h2>
          </a>
        </Link>
        <div className="font-normal text-gray-700 mt-4 line-clamp-2">
          <article>{htmlToTextBuneydi(post.content)}</article>
        </div>
        <div className="flex items-center pt-3">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={post.user.image}
              alt={post.user.name}
            />
            <div className="ml-4">
              <Link href={`/yazar/${post.user.id}`}>
                <a>
                  <p className="text-sm font-semibold hover:underline">
                    {post.user.name}
                  </p>
                </a>
              </Link>
              <p className="text-gray-700 text-sm">{formatedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCardWide;
