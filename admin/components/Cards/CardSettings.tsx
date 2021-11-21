import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { authorInfo } from "../../atoms/recoil";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

// components

export default function CardSettings({ author, session }) {
  let { mahlas, adress, name, iban, city, country, bio, postalCode } = author;
  let newUser = {
    userId: session.id,
    mahlas: mahlas,
    adress: adress,
    iban: iban,
    name: name,
    city: city,
    bio: bio,
    country: country,
    postalCode: postalCode,
  };

  const [authorinfo, setAuthorInfo] = useRecoilState(authorInfo);

  const reRef = useRef<ReCAPTCHA>();
  const reRefSecond = useRef<ReCAPTCHA>();

  useEffect(() => {
    setAuthorInfo(newUser);
  }, []);

  async function Guncelle(e) {
    e.preventDefault();
    const token = await reRef.current.executeAsync();
    reRef.current.reset();
    const newUser = { ...authorinfo, token: token };
    const userBio = await axios({
      withCredentials: true,
      data: newUser,
      method: "PATCH",
      url: "/api/author/author",
    })
      .then(function (response) {
        toast.success("Güncelleme başarılı.");
        return response.data;
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
      });
  }
  async function passChange(e) {
    e.preventDefault();
    if (e.target.confirm.value === e.target.password.value) {
      const token = await reRefSecond.current.executeAsync();
      reRefSecond.current.reset();
      const user = await axios({
        withCredentials: true,
        data: {
          password: e.target.confirm.value,
          userId: session.id,
          token: token,
        },
        method: "PATCH",
        url: "/api/author/pass",
      })
        .then(function (response) {
          toast.success("Şifre başarılı bir şekilde değiştirildi.");
          return response.data;
        })
        .catch(function (error) {
          toast.error(error.response.data.error);
        });
    } else {
      toast.error("Şifreler eşleşmiyor.");
      e.target.confirm.setCustomValidity("Şifreler eşleşmiyor");
    }
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Hesabım</h6>
          </div>
        </div>
        <form onSubmit={Guncelle}>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Yazar Bilgileri
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Mahlas
                  </label>
                  <input
                    onChange={(e) => {
                      const changedUser = {
                        userId: session.id,
                        userName: authorinfo.userName,
                        mahlas: e.target.value,
                        adress: authorinfo.adress,
                        iban: authorinfo.iban,
                        name: authorinfo.name,
                        city: authorinfo.city,
                        bio: authorinfo.bio,
                        postalCode: authorinfo.postalCode,
                        country: authorinfo.country,
                      };
                      setAuthorInfo(changedUser);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={author.mahlas}
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ad Soyad
                  </label>
                  <input
                    onChange={(e) => {
                      const changedUser = {
                        userId: session.id,
                        userName: authorinfo.userName,
                        mahlas: authorinfo.mahlas,
                        adress: authorinfo.adress,
                        iban: authorinfo.iban,
                        name: e.target.value,
                        city: authorinfo.city,
                        bio: authorinfo.bio,
                        postalCode: authorinfo.postalCode,
                        country: authorinfo.country,
                      };
                      setAuthorInfo(changedUser);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={author.name}
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Hesap Bilgileri
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Adres
                  </label>
                  <input
                    onChange={(e) => {
                      const changedUser = {
                        userId: session.id,
                        userName: authorinfo.userName,
                        mahlas: authorinfo.mahlas,
                        adress: e.target.value,
                        iban: authorinfo.iban,
                        name: authorinfo.name,
                        city: authorinfo.city,
                        bio: authorinfo.bio,
                        postalCode: authorinfo.postalCode,
                        country: authorinfo.country,
                      };
                      setAuthorInfo(changedUser);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={author.adress}
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Şehir
                  </label>
                  <input
                    onChange={(e) => {
                      const changedUser = {
                        userId: session.id,
                        userName: authorinfo.userName,
                        mahlas: authorinfo.mahlas,
                        adress: authorinfo.adress,
                        iban: authorinfo.iban,
                        name: authorinfo.name,
                        city: e.target.value,
                        bio: authorinfo.bio,
                        postalCode: authorinfo.postalCode,
                        country: authorinfo.country,
                      };
                      setAuthorInfo(changedUser);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={author.city}
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ülke
                  </label>
                  <input
                    onChange={(e) => {
                      const changedUser = {
                        userId: session.id,
                        userName: authorinfo.userName,
                        mahlas: authorinfo.mahlas,
                        adress: authorinfo.adress,
                        iban: authorinfo.iban,
                        name: authorinfo.name,
                        city: authorinfo.city,
                        bio: authorinfo.bio,
                        postalCode: authorinfo.postalCode,
                        country: e.target.value,
                      };
                      setAuthorInfo(changedUser);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={author.country}
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Posta Kodu
                  </label>
                  <input
                    onChange={(e) => {
                      const changedUser = {
                        userId: session.id,
                        userName: authorinfo.userName,
                        mahlas: authorinfo.mahlas,
                        adress: authorinfo.adress,
                        iban: authorinfo.iban,
                        name: authorinfo.name,
                        city: authorinfo.city,
                        bio: authorinfo.bio,
                        postalCode: e.target.value,
                        country: authorinfo.country,
                      };
                      setAuthorInfo(changedUser);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={author.postalCode}
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    IBAN
                  </label>
                  <input
                    onChange={(e) => {
                      const changedUser = {
                        userId: session.id,
                        userName: authorinfo.userName,
                        mahlas: authorinfo.mahlas,
                        adress: authorinfo.adress,
                        iban: e.target.value,
                        name: authorinfo.name,
                        city: authorinfo.city,
                        bio: authorinfo.bio,
                        postalCode: authorinfo.postalCode,
                        country: authorinfo.country,
                      };
                      setAuthorInfo(changedUser);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={author.iban}
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Hakkımda
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Biyografi
                  </label>
                  <textarea
                    onChange={(e) => {
                      const changedUser = {
                        userId: session.id,
                        userName: authorinfo.userName,
                        mahlas: authorinfo.mahlas,
                        adress: authorinfo.adress,
                        iban: authorinfo.iban,
                        name: authorinfo.name,
                        city: authorinfo.city,
                        bio: e.target.value,
                        postalCode: authorinfo.postalCode,
                        country: authorinfo.country,
                      };
                      setAuthorInfo(changedUser);
                    }}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows={4}
                    defaultValue={author.bio}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="invisible"
              ref={reRef}
            />
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    className="bg-emerald-500 active:bg-emerald-800 w-full text-white font-bold uppercase mt-3 mb-6 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Güncelle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={passChange}>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Şifre Bilgileri
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
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
                    required
                    name="password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Şifre Tekrarı
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                    name="confirm"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="invisible"
              ref={reRefSecond}
            />
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    className="bg-emerald-500 active:bg-emerald-800 w-full text-white font-bold uppercase mt-3 mb-6 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Şifre Değiştir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
