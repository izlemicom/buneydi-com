import axios from "axios";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authorInfo } from "../../atoms/recoil";
import GreenAlert from "../Alerts/GreenAlert";
import RedAlert from "../Alerts/RedAlert";

// components

export default function CardSettings({ user }) {
  let { mahlas, userName, adress, name, iban, city, country, bio, postalCode } =
    user;
  let newUser = {
    userId: user.id,
    mahlas: mahlas,
    userName: userName,
    adress: adress,
    iban: iban,
    name: name,
    city: city,
    bio: bio,
    country: country,
    postalCode: postalCode,
  };

  const [authorinfo, setAuthorInfo] = useRecoilState(authorInfo);
  useEffect(() => {
    setAuthorInfo(newUser);
  }, []);

  async function Guncelle() {
    const userBio = await axios({
      withCredentials: true,
      data: authorinfo,
      method: "PATCH",
      url: "/api/author/author",
    }).then(function (response) {
      return response.data;
    });
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Hesabım</h6>
            <button
              onClick={Guncelle}
              className="bg-emerald-500 active:bg-emerald-800 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Güncelle
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Yazar Bilgileri
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kullanıcı Adı
                  </label>
                  <input
                    onChange={(e) => {
                      const changedUser = {
                        userId: user.id,
                        userName: e.target.value,
                        mahlas: authorinfo.mahlas,
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
                    defaultValue={user.userName}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
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
                        userId: user.id,
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
                    defaultValue={user.mahlas}
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
                        userId: user.id,
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
                    defaultValue={user.name}
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
                        userId: user.id,
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
                    defaultValue={user.adress}
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
                        userId: user.id,
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
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user.city}
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
                        userId: user.id,
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
                    defaultValue={user.country}
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
                        userId: user.id,
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
                    defaultValue={user.postalCode}
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
                        userId: user.id,
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
                    defaultValue={user.iban}
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
                        userId: user.id,
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
                    defaultValue={user.bio}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
