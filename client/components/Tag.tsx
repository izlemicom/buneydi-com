import Link from "next/link";
function Tag({ tag }) {
  return (
    <div className="mx-3 py-1">
      <div className="rounded-full text-white text-lg bg-red-500">
        <Link href={`/etiket/${tag.slug}`}>
          <a>
            <span className="mx-4 whitespace-nowrap hover:underline">
              {tag.content}
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Tag;
