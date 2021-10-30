import { useEffect, useState } from "react";
import ArticleContent from "../components/ArticleContent";
import decodeBase64 from "../lib/decodeBase64";
function OnIzle({ lastData }) {
  const data = {
    title: "",
    content: "",
    createdAt: new Date(),
    mainImage: "/placeholder.png",
    user: {
      image: "/placeholder.png",
      name: "",
    },
    _count: {
      postLikes: 0,
      comments: 0,
      postViews: 0,
    },
  };

  const [post, setPost] = useState(data);
  useEffect(() => {
    console.log(lastData);
    setPost(JSON.parse(atob(lastData)));
  }, []);
  return (
    <div>
      <main className="mx-10 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
        <div className="lg:grid lg:grid-cols-4 lg:space-x-4">
          <div className="hidden lg:grid lg:col-span-1 lg:pt-14"></div>
          <div className="lg:col-span-2">
            <ArticleContent post={post} />
          </div>
          <div className="lg:col-span-1 lg:pt-14"></div>
        </div>
      </main>
    </div>
  );
}
export function getServerSideProps({ query }) {
  const lastData = query.post.toString();
  return {
    props: {
      lastData,
    },
  };
}
export default OnIzle;
