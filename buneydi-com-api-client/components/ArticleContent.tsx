import PostPageTopBar from "./PostPageTopBar";

function ArticleContent({ post }) {
  return (
    <article>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-full">
          <h1 className="pt-2 text-4xl">{post.title}</h1>
          <PostPageTopBar
            createdAt={post.createdAt}
            user={post.user}
            _count={post._count}
          />
          <img
            className="mb-2 mt-4 rounded-lg"
            src={post.mainImage}
            alt={post.title}
          />
        </div>
        <div
          className="prose prose-lg max-w-none py-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </article>
  );
}

export default ArticleContent;
