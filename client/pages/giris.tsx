import { getProviders, signIn } from "next-auth/react";
import NavBar from "../components/NavBar";
import Link from "next/link";
import FooterSmall from "../components/FooterSmall";

export default function Giris({ providers }) {
  function handleSubmit(e) {
    e.preventDefault();
    signIn("credentials", {
      username: e.target.email.value,
      password: e.target.password.value,
      type: "login",
    });
  }
  return (
    <>
      <NavBar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="absolute top-0 w-full h-full"></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-sm font-bold">
                        Mevcut hesaplarınla giriş yap
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                      >
                        <img alt="..." className="w-5 mr-1" src="/github.svg" />
                        Github
                      </button>

                      <button
                        onClick={() => signIn(providers.google.id)}
                        key={providers.google.name}
                        className="px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                      >
                        <img
                          alt={providers.google.name}
                          className="w-5 mr-1"
                          src="/google.svg"
                        />
                        {providers.google.name}
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-center mb-3 font-bold">
                      <small>Veya e-posta ile giriş yap</small>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          E-posta
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="E-posta"
                          required
                          autoComplete="username"
                          name="email"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Şifre
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Şifre"
                          required
                          autoComplete="password"
                          name="password"
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox rounded ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          />
                          <span className="ml-2 text-sm font-semibold">
                            Beni hatırla
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Giriş Yap
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className=""
                    >
                      <small>Şifremi unuttum.</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link href="/kayitol">
                      <a className="">
                        <small>Kayıt Ol!</small>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
