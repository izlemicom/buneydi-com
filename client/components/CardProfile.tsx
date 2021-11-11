import React from "react";

// components

export default function CardProfile({ data }) {
  const { user, total } = data;
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-8">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt={user.name}
                  src={user.image}
                  className="shadow-xl w-40 h-40 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-2">
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
          <div className="text-center mt-2">
            <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
              {user.name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {user.city}
            </div>
            <div className="mb-2 text-blueGray-600 mt-2">
              <i className="fas fa-user-tag mr-2 text-lg text-blueGray-400"></i>
              {user.mahlas}
            </div>
          </div>
          <div className="mt-2 py-5 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-11/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {user.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
