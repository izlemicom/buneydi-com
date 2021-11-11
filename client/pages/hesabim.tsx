import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import CardUserAccount from "../components/CardUserAccount";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Hesabim({ session }) {
  return (
    <div>
      <NavBar />
      <main className="lg:w-4/5 mx-5 lg:mx-auto">
        <CardUserAccount session={session} />
      </main>
      <Footer />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};

export default Hesabim;
