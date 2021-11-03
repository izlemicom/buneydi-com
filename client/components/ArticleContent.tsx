import PostPageTopBar from "./PostPageTopBar";

function ArticleContent({ post }) {
  const content = post.content;
  let isRender = content.search("<h1>") < 0 ? true : false;
  return (
    <article>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-full">
          <div className="py-3"></div>
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
          {isRender && (
            <h1 className="pt-2 font-extrabold text-5xl">{post.title}</h1>
          )}
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
