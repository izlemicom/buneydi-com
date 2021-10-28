import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
import CardSettings from "../components/Cards/CardSettings";
import CardProfile from "../components/Cards/CardProfile";
import FooterAdmin from "../components/Footers/FooterAdmin";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/client";
import axios from "axios";

// components

// layout for page

export default function Ayarlar({ session, data, isAuthor }) {
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
                <div className="w-full lg:w-8/12 px-4">
                  <CardSettings />
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <CardProfile />
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
      data: {
        userId: session.id,
        days: 14,
      },
      method: "GET",
      url: `/getauthorstats`,
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
