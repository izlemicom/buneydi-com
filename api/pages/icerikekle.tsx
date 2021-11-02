import React, { useEffect, useState } from "react";
import FooterAdmin from "../components/Footers/FooterAdmin";
import HeaderStats from "../components/Headers/HeaderStats";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import axios from "axios";
import CardContentAdd from "../components/Cards/CardContentAdd";
// components

// layout for page

export default function IcerikEkle({ session, data, isAuthor }) {
  const router = useRouter();
  const [authorstats, setAllAuthorStats] = useState(data);
  const { total, firstWeek, lastWeek } = authorstats;

  useEffect(() => {
    if (!session) router.push("/giris");
    if (!isAuthor) router.push("/kayitol");
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
                  <CardContentAdd user={session.user} />
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
  if (session.role !== "AUTHOR")
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
  isAuthor = true;
  return {
    props: {
      isAuthor,
      session,
      data,
    },
  };
}
