import React, { useEffect, useState } from "react";
import CardBarChart from "../components/Cards/CardBarChart";
import CardLineChart from "../components/Cards/CardLineChart";
import Admin from "../layouts/Admin";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilState } from "recoil";
import FooterAdmin from "../components/Footers/FooterAdmin";
import HeaderStats from "../components/Headers/HeaderStats";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import { authorStats } from "../atoms/recoil";

// components

// layout for page

export default function Home({ session, data }) {
  const router = useRouter();
  const [authorstats, setAllAuthorStats] = useState(data);
  const [stats, setStats] = useRecoilState(authorStats);
  const { total, firstWeek, lastWeek } = authorstats;

  useEffect(() => {
    setStats(authorstats);
    if (!session) {
      console.log("session yok");
      router.push("/giris");
    }
  }, []);

  return (
    <>
      {session && (
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
              <div>
                <div className="flex flex-wrap">
                  <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardLineChart
                      type="kazanc"
                      title="Kazanç"
                      fvalues={firstWeek.viewCount.map(function (x) {
                        return x * 0.1;
                      })}
                      lvalues={lastWeek.viewCount.map(function (x) {
                        return x * 0.1;
                      })}
                    />
                  </div>
                  <div className="w-full xl:w-4/12 px-4">
                    <CardBarChart
                      type="goruntulenme"
                      title="Görüntülenme Sayısı"
                      fvalues={firstWeek.viewCount}
                      lvalues={lastWeek.viewCount}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mt-4">
                  <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardLineChart
                      type="yorum"
                      title="Yorum Sayısı"
                      fvalues={firstWeek.commentCount}
                      lvalues={lastWeek.commentCount}
                    />
                  </div>
                  <div className="w-full xl:w-4/12 px-4">
                    <CardBarChart
                      type="begeni"
                      title="Beğeni Sayısı"
                      fvalues={firstWeek.likeCount}
                      lvalues={lastWeek.likeCount}
                    />
                  </div>
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
  let data = {};
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

  return {
    props: {
      session,
      data,
    },
  };
}
