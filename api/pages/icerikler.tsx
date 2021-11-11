import React, { useEffect, useState } from "react";
import CardTable from "../components/Cards/CardTable";
import FooterAdmin from "../components/Footers/FooterAdmin";
import HeaderStats from "../components/Headers/HeaderStats";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
// components

// layout for page

export default function Icerikler({
  session,
  data,
  isAuthor,
  firstPosts,
  firstDrafts,
}) {
  const router = useRouter();
  const [authorstats, setAllAuthorStats] = useState(data);
  const { total, firstWeek, lastWeek } = authorstats;

  useEffect(() => {
    if (!session) router.push("/giris");
    if (!isAuthor) router.push("/yazarol");
  }, []);
  return (
    <>
      {session && isAuthor && (
        <div>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar />
            {/* Header */}
            <HeaderStats
              total={total}
              firstWeek={firstWeek}
              lastWeek={lastWeek}
            />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                  <CardTable
                    title="İçerikler"
                    firstPosts={firstPosts}
                    session={session}
                    type="post"
                  />
                </div>
                <div className="w-full mb-12 px-4">
                  <CardTable
                    color="dark"
                    title="Taslaklar"
                    firstPosts={firstDrafts}
                    session={session}
                    type="draft"
                  />
                </div>
              </div>
              <FooterAdmin />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  let isAuthor: boolean = false;
  let data = {};
  if (session?.role !== "AUTHOR")
    return {
      props: {
        isAuthor,
        session,
        data,
      },
    };
  if (session) {
    data = await axios({
      headers: ctx.req.headers,
      params: {
        userId: session.id,
        days: 14,
      },
      method: "GET",
      url: `/author/stats`,
      baseURL: process.env.BASE_API_URL,
    }).then(function (response) {
      return response.data;
    });
  }
  const firstPosts = await axios({
    params: {
      take: 5,
      cursor: "pointer",
      isfirst: true,
      authorId: session.id,
    },
    method: "GET",
    url: `/author/posts`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  const firstDrafts = await axios({
    params: {
      take: 5,
      cursor: "pointer",
      isfirst: true,
      authorId: session.id,
    },
    method: "GET",
    url: `/author/drafts`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  isAuthor = true;
  return {
    props: {
      session,
      firstPosts,
      firstDrafts,
      isAuthor,
      data,
    },
  };
}
