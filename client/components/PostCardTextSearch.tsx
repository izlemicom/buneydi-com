import Link from "next/link";
import htmlToTextBuneydi from "../lib/htmlToTextBuneydi";

function PostCardTextSearch({ post }) {
  return (
    <div className="mx-auto lg:flex lg:flex-row lg:h-auto my-3">
      <div className="bg-white p-3 rounded-bl-md rounded-br-md lg:rounded-bl-none lg:rounded-tr-md">
        <Link href={`/icerik/${post.slug}`}>
          <a>
            <h2 className="text-2xl font-bold hover:underline line-clamp-1">
              {post.title}
            </h2>
          </a>
        </Link>
        <div className="font-normal text-gray-700 mt-2 line-clamp-2">
          <article>{htmlToTextBuneydi(post.content)}</article>
        </div>
      </div>
    </div>
  );
}

export default PostCardTextSearch;
