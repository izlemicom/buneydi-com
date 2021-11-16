import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { articleData } from "../../atoms/recoil";
import ArticleTextEditor from "./ArticleTextEditor";
import { UiFileInputButton } from "./UiFileInputButton";
import Image from "next/image";
import { Encrypt } from "../../lib/CRYPT";
import { toast } from "react-toastify";

// components

export default function CardContentAdd({ session }) {
  const [data, setData] = useRecoilState(articleData);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [draft, setDraft] = useState<any>();
  let cDraft: any;
  async function onIzle() {
    const post = {
      title: title,
      content: data,
      mainImage: url,
      tags: tags,
      userId: session.id,
    };
    if (draft) {
      cDraft = await axios({
        withCredentials: true,
        data: {
          title: title,
          content: data,
          mainImage: url,
          tags: tags,
          userId: session.id,
          id: draft.id,
        },
        method: "PATCH",
        url: "/api/post/draft",
      })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          toast.error(error.response.data.error);
        });
      setDraft(cDraft);
    } else {
      cDraft = await axios({
        withCredentials: true,
        data: post,
        method: "POST",
        url: "/api/post/draft",
      })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          toast.error(error.response.data.error);
        });
      setDraft(cDraft);
    }
    if (!cDraft) return;
    const encoded = Encrypt({ slug: cDraft.slug });
    window.open(`http://localhost:3005/onizle?post=${encoded}`, "_blank");
  }
  async function publishPost() {
    const post = {
      title: title,
      content: data,
      mainImage: url,
      tags: tags,
      userId: session.id,
    };
    if (draft) {
      cDraft = await axios({
        withCredentials: true,
        data: {
          title: title,
          content: data,
          mainImage: url,
          tags: tags,
          userId: session.id,
          id: draft.id,
        },
        method: "PATCH",
        url: "/api/post/post",
      })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          toast.error(error.response.data.error);
        });
      setDraft(cDraft);
    } else {
      cDraft = await axios({
        withCredentials: true,
        data: post,
        method: "POST",
        url: "/api/post/post",
      })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          toast.error(error.response.data.error);
        });
      setDraft(cDraft);
    }
    if (!cDraft) return;
    window.open(`http://localhost:3005/icerik/${cDraft.slug}`, "_blank");
  }
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
      pending: "Kapak fotoğrafı yükleniyor...",
      success: "Kapak fotoğrafı başarılı bir şekilde yüklendi",
      error: "Kapak fotoğrafı yüklenemedi.",
    });
    const response: any = await promise.catch(() => {});
    setUrl(response.data.url);
  };
  async function deletePhoto() {
    const response = await axios({
      withCredentials: true,
      params: {
        url: url,
      },
      method: "DELETE",
      url: `/api/image/image`,
    })
      .then(function (response) {
        toast.success("Kapak fotoğrafı başarılı bir şekilde kaldırıldı.");
        return response.data;
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
      });
    setProgress(0);
    setUrl("");
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">İçerik Ekle</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-600 text-sm mt-3 mb-6 font-bold uppercase">
            Başlık
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Başlığınızı yazınız..."
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue=""
                  required
                />
              </div>
            </div>
          </div>
          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-600 text-sm mt-3 mb-6 font-bold uppercase">
            Etiketler
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <input
                  onChange={(e) => setTags(e.target.value)}
                  type="text"
                  placeholder="Etiketleri virgül ile ayırınız..."
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue=""
                  required
                />
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-600 text-sm mt-3 mb-6 font-bold uppercase">
            Kapak Fotoğrafı
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <div className="flex items-center text-center justify-center w-full">
                  <div>
                    <div className="relative">
                      {progress > 99 && (
                        <button
                          onClick={deletePhoto}
                          className="absolute right-0 rounded-full focus:outline-none focus:scale-105 active:text-red-600 text-4xl text-red-500 z-10"
                        >
                          <i className="fas fa-minus-circle"></i>
                        </button>
                      )}
                      <Image
                        width="960"
                        height="540"
                        src={url ? url : "/img/placeholder.webp"}
                        alt=""
                      />
                    </div>

                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-4 text-lg flex rounded bg-indigo-200">
                        <div
                          style={{ width: `${progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                        ></div>
                      </div>
                    </div>
                    <div className="bg-emerald-500 rounded text-white font-bold">
                      <UiFileInputButton
                        acceptedFileTypes="image/*"
                        label="Kapak Fotoğrafı Seç"
                        uploadFileName="upload"
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <ArticleTextEditor initData="" />
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-600 text-sm mt-3 mb-6 font-bold uppercase">
            Önizleme
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full mx-auto lg:w-12/12 px-4">
              <div className="relative mb-3">
                <button
                  onClick={onIzle}
                  className="w-full bg-lightBlue-500 rounded text-white font-bold focus:outline-none px-3 py-3"
                >
                  ÖNİZLE
                </button>
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-600 text-sm mt-3 mb-6 font-bold uppercase">
            İçeriği Yükle
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full mx-auto lg:w-12/12 px-4">
              <div className="relative mb-3">
                <button
                  onClick={publishPost}
                  className="w-full bg-emerald-500 rounded text-white font-bold focus:outline-none px-3 py-3"
                >
                  İÇERİĞİ YÜKLE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
