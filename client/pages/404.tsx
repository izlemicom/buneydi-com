import FooterSmall from "../components/FooterSmall";
import NavBar from "../components/NavBar";
import NotFound from "../components/NotFound";

function Error() {
  return (
    <div>
      <NavBar />
      <main className="lg:w-4/5 mx-5 lg:mx-auto">
        <NotFound />
      </main>
      <div className="w-full">
        <FooterSmall />
      </div>
    </div>
  );
}

export default Error;
