import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Auth from "../layouts/Auth";
import { getProviders, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

// layout for page

export default function Giris({ providers, error }) {
  const reRef = useRef<ReCAPTCHA>();
  async function handleSubmit(e) {
    e.preventDefault();
    const token = await reRef.current.executeAsync();
    reRef.current.reset();
    signIn("credentials", {
      username: e.target.email.value,
      password: e.target.password.value,
      token: token,
      type: "login",
    });
  }
  useEffect(() => {
    if (error) toast.error("E-posta veya şifre hatalı.");
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Mevcut hesaplarınla giriş yap
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    onClick={() => signIn(providers.google.id)}
                    key={providers.google.name}
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    {providers.google.name}
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Veya e-posta ile giriş yap</small>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      E-posta
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="E-posta"
                      name="email"
                      autoComplete="username"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Şifre
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Şifre"
                      name="password"
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    size="invisible"
                    ref={reRef}
                  />
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
                <Link href={`${process.env.NEXT_PUBLIC_BASE_SITE_URL}sifre`}>
                  <a className="text-blueGray-200">
                    <small>Şifremi Unuttum!</small>
                  </a>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/yazarol">
                  <a className="text-blueGray-200">
                    <small>Yazar Ol!</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Giris.layout = Auth;

export async function getServerSideProps(ctx) {
  const error = ctx.query.error ? ctx.query.error : null;
  const providers = await getProviders();
  return {
    props: {
      error,
      providers,
    },
  };
}
