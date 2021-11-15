import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Auth from "../layouts/Auth";
import axios from "axios";
import { toast } from "react-toastify";

// layout for page

export default function YazarOl({ session }) {
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/giris");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      userId: session.id,
      name: e.target.name.value,
      adress: e.target.adress.value,
      city: e.target.city.value,
      country: e.target.country.value,
      postalCode: e.target.postalCode.value,
      bio: e.target.bio.value,
      mahlas: e.target.mahlas.value,
    };
    const author = await axios({
      withCredentials: true,
      data: data,
      method: "POST",
      url: "/author/register",
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    })
      .then((response) => {
        toast.success("Yazar oldunuz, tekrar giriş yapınız.");
        return response.data;
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        console.error(error.response.data.error);
      });
    if (author) {
      setTimeout(() => {
        signOut();
      }, 4000);
    }
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6"></div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="flex justify-between items-center mb-3 font-bold">
                  <div className="items-center flex">
                    <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                      <img
                        alt="..."
                        className="w-full rounded-full align-middle border-none shadow-lg"
                        src={session?.user?.image}
                      />
                    </span>
                    <span className="ml-2">{session?.user?.name}</span>
                  </div>
                  <h1>Yazar Ol</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Ad Soyad"
                      name="name"
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Kendinize bir Mahlas (Ünvan) belirleyin
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Mahlas (Ünvan)"
                      name="mahlas"
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Biyografi
                    </label>
                    <textarea
                      minLength={50}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Biyografi"
                      name="bio"
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Adres
                    </label>
                    <textarea
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Adres"
                      name="adress"
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Şehir
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Şehir"
                      name="city"
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Ülke
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Ülke"
                      name="country"
                      required
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Posta Kodu
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Posta Kodu"
                      name="postalCode"
                      required
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        required
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Kullanım Şartları ve Gizlilik Politikasını{" "}
                        </a>
                        kabul ediyorum.
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Yazar Ol
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}

YazarOl.layout = Auth;
