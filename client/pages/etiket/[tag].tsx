import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import PostCardWide from "../../components/PostCardWide";

function Tag() {
  function handleChange(e) {}
  return (
    <div>
      <NavBar />
      <main className="mx-10 xl:w-4/5 md:mx-32 lg:mx-5 xl:mx-auto">
        <h1 className="text-4xl font-bold pt-4">İçerikler</h1>
        <div className="lg:grid lg:grid-cols-4 lg:space-x-4">
          <div className="lg:grid lg:col-span-1">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold pt-2">Sırala</span>
              <form className="border-2 rounded-lg p-3" onChange={handleChange}>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="radio-colors"
                      value="1"
                      defaultChecked
                    />
                    <span className="ml-2 text-xl font-semibold">
                      En Son Yayınlananlar
                    </span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-green-500"
                      name="radio-colors"
                      value="2"
                    />
                    <span className="ml-2 text-xl font-semibold">
                      En Çok Görüntülenenler
                    </span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-pink-600"
                      name="radio-colors"
                      value="3"
                    />
                    <span className="ml-2 text-xl font-semibold">
                      En Çok Beğenilenler
                    </span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-yellow-700"
                      name="radio-colors"
                      value="4"
                    />
                    <span className="ml-2 text-xl font-semibold">
                      Hakkında Çok Konuşulanlar
                    </span>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-3">
            <PostCardWide />
            <PostCardWide />
            <PostCardWide />
            <PostCardWide />
            <PostCardWide />
            <PostCardWide />
            <PostCardWide />
            <PostCardWide />
            <PostCardWide />
            <PostCardWide />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Tag;
