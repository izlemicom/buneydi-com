import axios from "axios";
import React, { useState } from "react";
import { UiFileInputButton } from "./UiFileInputButton";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

// components

export default function CardUserAccount({ session }) {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const onChange = async (formData) => {
    const config = {
      withCredentials: true,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        setProgress(Math.round((event.loaded * 100) / event.total));
      },
    };

    const promise = axios.post("/image/image", formData, config);
    toast.promise(promise, {
      pending: "Profil fotoğrafı yükleniyor...",
      success: "Profil fotoğrafı başarılı bir şekilde yüklendi",
      error: "Profil fotoğrafı yüklenemedi.",
    });
    const response: any = await promise.catch(() => {});
    setUrl(response?.data?.url);
    const user = await axios({
      withCredentials: true,
      data: {
        image: response?.data?.url,
        userId: session?.id,
      },
      method: "PATCH",
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      url: "/user/image",
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
      });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!session) return;

    if (e.target.confirm.value === e.target.password.value) {
      const user = await axios({
        withCredentials: true,
        data: {
          name: e.target.name.value,
          password: e.target.confirm.value,
          userId: session.id,
        },
        method: "PATCH",
        url: "/user/pass",
        baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      })
        .then(function (response) {
          toast.success("Güncelleme başarılı.");
          return response.data;
        })
        .catch(function (error) {
          toast.error(error.response.data.error);
        });
      signOut();
    } else {
      e.target.confirm.setCustomValidity("Şifreler eşleşmiyor");
    }
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-gray-300 w-full mb-6 shadow-xl rounded-lg mt-8">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt={session?.user?.name}
                  src={url ? url : session?.user?.image}
                  className="shadow-xl w-40 h-40 mt-3 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-2">
              <div className="flex flex-col justify-center items-center mt-5">
                <span className="font-medium mb-3">
                  Profil Fotoğrafını Değiştir
                </span>
                <div className="flex justify-center border-2 items-center bg-gray-50 rounded-full w-12 h-12 font-bold">
                  <UiFileInputButton
                    acceptedFileTypes="image/*"
                    label={
                      <i className="fas fa-camera text-4xl text-black"></i>
                    }
                    uploadFileName="upload"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
              Kullanıcı Bilgilerini Güncelle
            </h3>
            <div className="container mx-auto px-4 h-full py-10">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-8/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 border-0">
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Ad Soyad
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Ad Soyad"
                            required
                            autoComplete="name"
                            name="name"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase font-bold mb-2"
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
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Şifre Tekrarı
                          </label>
                          <input
                            type="password"
                            className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Şifre Tekrarı"
                            required
                            autoComplete="password"
                            name="confirm"
                          />
                        </div>

                        <div className="text-center mt-6">
                          <button
                            className=" font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear bg-gray-600 text-white transition-all duration-150"
                            type="submit"
                          >
                            Güncelle
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
