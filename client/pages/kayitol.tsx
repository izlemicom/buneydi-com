import { getProviders, signIn } from "next-auth/react";
import React, { useRef } from "react";
import FooterSmall from "../components/FooterSmall";
import NavBar from "../components/NavBar";
import ReCAPTCHA from "react-google-recaptcha";
import { NextSeo } from "next-seo";

// layout for page

export default function KayitOl({ providers }) {
  const SEO = {
    title: "Kayıt Ol | BuNeydi - İçerik Platformu",
    description: "BuNeydi İçerik Platformuna kayıt ol.",
    openGraph: {
      url: "https://www.buneydi.com/kayitol",
    },
  };
  const reRef = useRef<ReCAPTCHA>();
  async function handleSubmit(e) {
    e.preventDefault();
    const token = await reRef.current.executeAsync();
    reRef.current.reset();
    signIn("credentials", {
      name: e.target.name.value,
      username: e.target.email.value,
      password: e.target.password.value,
      token: token,
      type: "register",
    });
  }
  return (
    <>
      <NextSeo {...SEO} />
      <NavBar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-sm font-bold">
                        Mevcut hesaplarınla kayıt ol
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
                      <small>Veya e-posta ile kayıt ol</small>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Ad Soyad
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Ad Soyad"
                          autoComplete=""
                          name="name"
                          required
                        />
                      </div>

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
                          autoComplete="username"
                          name="email"
                          required
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
                          autoComplete="password"
                          name="password"
                          required
                        />
                      </div>

                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox rounded ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            required
                          />
                          <span className="ml-2 text-sm font-semibold">
                            <a
                              href="#pablo"
                              className=""
                              onClick={(e) => e.preventDefault()}
                            >
                              Kullanım Şartları ve Gizlilik Politikasını{" "}
                            </a>
                            kabul ediyorum.
                          </span>
                        </label>
                      </div>
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        size="invisible"
                        ref={reRef}
                      />
                      <div className="text-center mt-6">
                        <button
                          className="text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Hesap Oluştur
                        </button>
                      </div>
                    </form>
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
