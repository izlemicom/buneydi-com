import axios from "axios";
import { GetServerSideProps } from "next";
import CardProfile from "../components/CardProfile";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Author({ data }) {
  return (
    <div>
      <NavBar />
      <main className="lg:w-4/5 mx-5 lg:mx-auto">
        <CardProfile data={data} />
      </main>
      <Footer />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await axios({
    params: {
      userId: context.query.author,
    },
    method: "GET",
    url: `/author/author`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });

  return {
    props: {
      data,
    },
  };
};

export default Author;
