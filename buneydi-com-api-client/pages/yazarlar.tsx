import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import AuthorListItem from "../components/AuthorListItem";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Yazarlar({ data }) {
  const { authors, authorCount } = data;

  let a = "";
  if (authorCount > 4) {
    a = authors[3].id;
  }

  const [allAuthors, setAllAuthors] = useState(authors);
  const [cursor, setCursor] = useState(a);

  async function moreAuthors() {
    if (allAuthors.length >= authorCount) return;
    let moreAuthors: any = await axios({
      method: "GET",
      url: `http://localhost:3000/api/getauthors?a=${4}&cursor=${cursor}`,
    }).then(function (response) {
      return response.data;
    });
    if (moreAuthors.length === 4) setCursor(moreAuthors[3].id);
    moreAuthors = allAuthors.concat(moreAuthors);
    setAllAuthors(moreAuthors);
  }

  return (
    <div>
      <NavBar />
      <main className="mx-2 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
        <h1 className="text-4xl font-bold py-2">Yazarlar</h1>
        <div className="flex flex-wrap justify-center items-center border-2 rounded-lg mx-auto">
          {allAuthors.map((author, index) => (
            <AuthorListItem key={author.id} author={author} index={index} />
          ))}
        </div>
        <button
          onClick={moreAuthors}
          className="flex items-center justify-center rounded-lg py-1 my-2 text-white text-lg font-medium bg-indigo-500 w-full hover:bg-indigo-400 active:translate-y-0.5"
        >
          Daha Fazla Yazar Yükle
        </button>
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await axios({
    method: "GET",
    url: `http://localhost:3000/api/getauthors?a=${20}&isfirst=${true}`,
  }).then(function (response) {
    return response.data;
  });

  return {
    props: {
      data,
    },
  };
};

export default Yazarlar;
