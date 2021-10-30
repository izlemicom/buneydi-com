import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { articleData } from "../../atoms/recoil";
import ArticleTextEditor from "./ArticleTextEditor";
import { UiFileInputButton } from "./UiFileInputButton";
import Image from "next/image";
import CryptoJS from "crypto-js";
import { Encrypt } from "../../lib/CRYPT";

// components

export default function CardContentAdd({ user }) {
  const [data, setData] = useRecoilState(articleData);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  function onIzle() {
    const post = {
      title: title,
      content: data,
      createdAt: new Date(),
      mainImage: url,
      user: user,
      _count: {
        postLikes: 0,
        comments: 0,
        postViews: 0,
      },
    };
    const encoded = Encrypt(post);
    window.open(`http://localhost:3000/onizle?post=${encoded}`, "_blank");
  }
  const onChange = async (formData) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        setProgress(Math.round((event.loaded * 100) / event.total));
      },
    };

    const response = await axios.post("/api/upload", formData, config);
    setUrl(response.data.url);
  };

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
                    <Image
                      width="960"
                      height="540"
                      src={url ? url : "/img/placeholder.png"}
                      alt=""
                    />
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
                <ArticleTextEditor />
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
                <button className="w-full bg-emerald-500 rounded text-white font-bold focus:outline-none px-3 py-3">
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
