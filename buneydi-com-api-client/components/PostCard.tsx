import moment from "moment";
import "moment/locale/tr";
import Link from "next/link";

function PostCard({ post }) {
  const date = new Date(post.createdAt);
  moment.locale("tr");
  const formatedDate = moment(date, "YYYYMMDD").fromNow();
  return (
    <div className="max-w-lg mx-auto my-3">
      <div className="bg-white border border-gray-200 rounded-lg max-w-sm mb-5">
        <img
          className="rounded-t-lg object-cover object-center"
          src={post.mainImage}
          alt={post.title}
        />
        <div className="p-5">
          <Link href={`/icerik/${post.slug}`}>
            <a>
              <h2 className="font-bold text-2xl mb-2 hover:underline line-clamp-1">
                {post.title}
              </h2>
            </a>
          </Link>
          <div className="font-normal text-gray-700 mb-3 line-clamp-2">
            <article
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></article>
          </div>
          <div className="flex items-center mt-8">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full"
                src={post.user.image}
                alt={post.user.name}
              />
              <div className="ml-4">
                <Link href={`/${post.user.id}`}>
                  <a>
                    <p className="text-sm font-semibold hover:underline">
                      {post.user.name}
                    </p>
                  </a>
                </Link>

                <p className="text-gray-600 text-sm">{formatedDate}</p>
              </div>
            </div>
            <div className="w-8 h-8 ml-auto bg-gray-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13">
                <path
                  fill="#6E8098"
                  d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
