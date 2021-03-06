import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authorInfo } from "../../atoms/recoil";
import { UiFileInputButton } from "./UiFileInputButton";
import { toast } from "react-toastify";

// components

export default function CardProfile({ session, author, total }) {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [authorinfo, setAuthorInfo] = useRecoilState(authorInfo);
  const onChange = async (formData) => {
    const config = {
      withCredentials: true,
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        setProgress(Math.round((event.loaded * 100) / event.total));
      },
    };

    const promise = axios.post("/api/image/image", formData, config);
    toast.promise(promise, {
      pending: "Profil fotoğrafı yükleniyor...",
      success: "Profil fotoğrafı başarılı bir şekilde yüklendi",
      error: "Profil fotoğrafı yüklenemedi.",
    });
    const response: any = await promise.catch(() => {});
    setUrl(response.data.url);
    const user = await axios({
      withCredentials: true,
      data: {
        image: response.data.url,
        userId: session.id,
      },
      method: "PATCH",
      url: "/api/author/image",
    })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
      });
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt={author.name}
                  width="800"
                  height="800"
                  src={url ? url : author.image}
                  className="shadow-xl w-48 h-48 object-cover rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex flex-col justify-center items-center mt-16">
                <span>Profil Fotoğrafını Değiştir</span>
                <div className="flex justify-center border-2 items-center rounded-full w-12 h-12 font-bold">
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

              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {total.postCount}
                  </span>
                  <span className="text-sm text-blueGray-400">İçerik</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {total.viewCount}
                  </span>
                  <span className="text-sm text-blueGray-400">
                    Görüntülenme
                  </span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {total.commentCount}
                  </span>
                  <span className="text-sm text-blueGray-400">Yorum</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {total.likeCount}
                  </span>
                  <span className="text-sm text-blueGray-400">Beğeni</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
              {authorinfo ? authorinfo.name : author.name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {authorinfo ? authorinfo.city : author.city}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-user-tag mr-2 text-lg text-blueGray-400"></i>
              {authorinfo ? authorinfo.mahlas : author.mahlas}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {authorinfo ? authorinfo.bio : author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
