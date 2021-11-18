import { getProviders, signIn } from "next-auth/react";
import React, { useRef } from "react";
import FooterSmall from "../components/FooterSmall";
import NavBar from "../components/NavBar";
import ReCAPTCHA from "react-google-recaptcha";
import { NextSeo } from "next-seo";
import ReactCodeInput, { ReactCodeInputProps } from "react-code-input";
import Modal from "react-modal";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  nameAtom,
  passwordAtom,
  usernameAtom,
  verificationCodeAtom,
} from "../atoms/recoil";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import axios from "axios";

// layout for page

export default function KayitOl({ providers }) {
  const reRef = useRef<ReCAPTCHA>();

  const [modalIsOpen, setIsOpen] = useState(false);

  const [name, setName] = useRecoilState(nameAtom);
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [verificationCode, setVerificationCode] =
    useRecoilState(verificationCodeAtom);

  const props: ReactCodeInputProps = {
    fields: 6,
    type: "text",
    inputMode: "numeric",
    name: "code-input",
    onChange: (e: any) => {
      console.log(e);
      setVerificationCode(e);
    },
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#D1D5DB",
    },
  };

  const SEO = {
    title: "Kayıt Ol | BuNeydi - İçerik Platformu",
    description: "BuNeydi İçerik Platformuna kayıt ol.",
    canonical: "https://www.buneydi.com/kayitol",
    openGraph: {
      url: "https://www.buneydi.com/kayitol",
    },
  };

  const Completionist = () => (
    <div>
      <span>Süreniz doldu!</span>
      <button>Tekrar Gönder</button>
    </div>
  );

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function verificationCodeSubmit(e) {
    e.preventDefault();
    const token = await reRef.current.executeAsync();
    reRef.current.reset();

    const promise = axios({
      params: {
        email: username,
        verificationCode: verificationCode,
      },
      method: "GET",
      url: `/user/verify`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    });
    toast.promise(promise, {
      pending: `${username} doğrulanıyor.`,
      error: "Bir şeyler ters gitti.",
      success: `${username} doğrulandı.`,
    });
    const sent: any = await promise
      .then(function (response) {
        response.data;
        signIn("credentials", {
          name,
          username,
          password,
          token: token,
          type: "register",
        }).catch((error) => {
          toast.error(error);
        });
      })
      .catch(function (err) {
        toast.error(err.response.data.error);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setName(e.target.name.value);
    setUsername(e.target.email.value);
    setPassword(e.target.password.value);
    const promise = axios({
      data: {
        email: e.target.email.value,
      },
      method: "POST",
      url: `/user/verify`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    });
    toast.promise(promise, {
      pending: `${e.target.email.value} doğrulama kodu gönderiliyor.`,
      success: `${e.target.email.value} doğrulama kodu gönderildi.`,
    });
    const sent: any = await promise.then(function (response) {
      response.data;
      openModal();
    });
  }
  return (
    <>
      <NextSeo {...SEO} />
      <NavBar />
      <main className="relative">
        <div className="w-full h-full absolute bg-gray-100"></div>
        <div>
          <button onClick={openModal}>Open Modal</button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <h2 className="text-center font-medium">
                E-posta adresinize gelen doğrulama kodunu giriniz.
              </h2>
              <form
                className="flex flex-col items-center"
                onSubmit={verificationCodeSubmit}
              >
                <div className="py-3"></div>

                <ReactCodeInput {...props} />
                <div className="py-3 text-red-500">
                  <Countdown
                    date={Date.now() + 180000}
                    renderer={renderer}
                    onComplete={() => {
                      toast.error("Süre doldu.");
                      closeModal();
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear bg-gray-600 text-white transition-all duration-150"
                >
                  Doğrula
                </button>
              </form>
            </div>
          </Modal>
        </div>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4 ">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 bg-gray-300">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-sm font-bold">
                        Mevcut hesaplarınla kayıt ol
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear bg-gray-100 transition-all duration-150"
                        type="button"
                      >
                        <img alt="..." className="w-5 mr-1" src="/github.svg" />
                        Github
                      </button>
                      <button
                        onClick={() => signIn(providers.google.id)}
                        key={providers.google.name}
                        className="px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear bg-gray-100 transition-all duration-150"
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
                          <span className="ml-2 text-sm font-semibold ">
                            <a
                              href="#pablo"
                              className="text-indigo-500"
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
                          className="text-sm font-bold uppercase text-white px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear bg-gray-600 transition-all duration-150"
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
