import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import CardUserAccount from "../components/CardUserAccount";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Hesabim({ somePosts, latestTags, someTags, session }) {
  return (
    <div>
      <NavBar />
      <main className="lg:w-4/5 mx-5 lg:mx-auto">
        <CardUserAccount session={session} />
      </main>
      <Footer
        someTags={someTags}
        latestTags={latestTags?.tags}
        somePosts={somePosts}
      />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const someTags = await axios({
    params: {
      take: 10,
      cursor: "pointer",
      isfirst: true,
      type: "someTags",
    },
    method: "GET",
    url: `/tag/tags`,
    baseURL: process.env.BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  const latestTags = await axios({
    params: {
      take: 10,
      cursor: "pointer",
      isfirst: true,
      type: "latest",
    },
    method: "GET",
    url: `/tag/tags`,
    baseURL: process.env.BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  const somePosts = await axios({
    params: {
      take: 6,
      cursor: "pointer",
      isfirst: true,
      type: "somePosts",
    },
    method: "GET",
    url: `/post/posts`,
    baseURL: process.env.BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  return {
    props: {
      somePosts,
      latestTags,
      someTags,
      session,
    },
  };
};

export default Hesabim;
