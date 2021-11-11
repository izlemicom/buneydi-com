import React, { useEffect, useState } from "react";
import FooterAdmin from "../components/Footers/FooterAdmin";
import HeaderStats from "../components/Headers/HeaderStats";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import CardContentUpdate from "../components/Cards/CardContentUpdate";
import { Decrypt } from "../lib/CRYPT";
// components

// layout for page

export default function Guncelle({ session, data, isAuthor, postData }) {
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
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <CardContentUpdate user={session.user} post={postData} />
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
  const post = Decrypt(ctx.query.post);
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
  const postData = await axios({
    params: {
      slug: post.slug,
    },
    method: "GET",
    url: `/post/${post.type}`,
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  }).then(function (response) {
    return response.data;
  });
  isAuthor = true;
  return {
    props: {
      isAuthor,
      session,
      data,
      postData,
    },
  };
}
