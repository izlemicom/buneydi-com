import Link from "next/link";
function SimilarPosts({ relatedPosts }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center py-2 text-xl border-b space-x-2">
        <i className="fas fa-newspaper"></i>
        <span>Benzer Gönderiler</span>
      </div>
      {relatedPosts &&
        relatedPosts.map((item) => (
          <div key={item.id} className="py-1">
            <Link href={`/icerik/${item.slug}`}>
              <p className="underline py-1 text-lg cursor-pointer hover:text-indigo-500">
                {item.title}
              </p>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default SimilarPosts;
