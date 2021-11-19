import { getProviders, signIn } from "next-auth/react";
import React, { useRef } from "react";
import FooterSmall from "../components/FooterSmall";
import NavBar from "../components/NavBar";
import ReCAPTCHA from "react-google-recaptcha";
import { NextSeo } from "next-seo";
import { ReactCodeInputProps } from "react-code-input";
import dynamic from "next/dynamic";

const ReactCodeInput = dynamic(import("react-code-input"));
import Modal from "react-modal";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  confirmAtom,
  passwordAtom,
  usernameAtom,
  verificationCodeAtom,
} from "../atoms/recoil";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

// layout for page

export default function KayitOl({ providers }) {
  const reRef = useRef<ReCAPTCHA>();
  const router = useRouter();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<number>();

  const [confirm, setConfirm] = useRecoilState(confirmAtom);
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
    title: "Şifre Yenile | BuNeydi - İçerik Platformu",
    description: "BuNeydi İçerik Platformuna şifre yenile.",
    canonical: "https://www.buneydi.com/sifre",
    openGraph: {
      url: "https://www.buneydi.com/sifre",
    },
  };

  const Completionist = () => (
    <div>
      <span>Süreniz doldu!</span>
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
    setTime(Date.now());
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
    let token = await reRef.current.executeAsync();
    reRef.current.reset();

    const promise = axios({
      params: {
        email: username,
        verificationCode: verificationCode,
        token: token,
      },
      method: "GET",
      url: `/user/verify`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    });
    toast.promise(promise, {
      pending: `${username} doğrulanıyor.`,
      error: `${username} doğrulanamadı.`,
      success: `${username} doğrulandı.`,
    });
    const sent: any = await promise
      .then(async function (response) {
        token = await reRef.current.executeAsync();
        reRef.current.reset();
        const promise = await axios({
          data: {
            email: username,
            password: password,
            token: token,
          },
          method: "PATCH",
          url: `/user/passforgot`,
          baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
        })
          .then((response) => {
            toast.success("Şifre yenilendi.");
            closeModal();
            setTimeout(function () {
              router.push("/giris");
            }, 3000);
            return response.data;
          })
          .catch((error) => {
            toast.error(error);
          });
        return response.data;
      })
      .catch(function (err) {
        toast.error(err.response.data.error);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setConfirm(e.target.confirm.value);
    setUsername(e.target.email.value);
    setPassword(e.target.password.value);

    const token = await reRef.current.executeAsync();
    reRef.current.reset();

    const promise = axios({
      data: {
        email: e.target.email.value,
        token: token,
        renewal: true,
      },
      method: "POST",
      url: `/user/verify`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    });
    toast.promise(promise, {
      pending: `${e.target.email.value} doğrulama kodu gönderiliyor.`,
      error: `${e.target.email.value} doğrulanamadı.`,
      success: `${e.target.email.value} doğrulama kodu gönderildi.`,
    });
    const sent: any = await promise
      .then(function (response) {
        response.data;
        openModal();
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
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
            ariaHideApp={false}
          >
            <div>
              <h2 className="text-center font-medium">
                E-posta adresinize gönderilen doğrulama kodunu giriniz.
              </h2>
              <form
                className="flex flex-col items-center"
                onSubmit={verificationCodeSubmit}
              >
                <div className="py-3"></div>

                <ReactCodeInput {...props} />
                <div className="py-3 font-extrabold text-lg text-red-500">
                  <Countdown
                    onStart={(e) => {
                      console.log("Start");
                    }}
                    onMount={(e) => {}}
                    date={time + 180000}
                    renderer={renderer}
                    onComplete={() => {
                      toast.error("Süre doldu.");
                      closeModal();
                    }}
                    autoStart={true}
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
                    <div className="text-center mb-3 mt-3">
                      <h6 className="font-bold">ŞİFRE YENİLE</h6>
                    </div>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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
                          Yeni Şifre
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
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Yeni Şifre Tekrarı
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Şifre"
                          autoComplete="password"
                          name="confirm"
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
                          className="text-sm font-bold uppercase text-white px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear bg-gray-600 transition-all duration-150"
                          type="submit"
                        >
                          Şifre Yenile
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
