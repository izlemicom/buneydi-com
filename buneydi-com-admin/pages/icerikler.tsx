import React, { useEffect } from "react";
import CardTable from "../components/Cards/CardTable";

import FooterAdmin from "../components/Footers/FooterAdmin";
import HeaderStats from "../components/Headers/HeaderStats";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import { useRecoilState } from "recoil";
import { authorStats } from "../atoms/recoil";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
// components

// layout for page

export default function Icerikler() {
  const router = useRouter();
  const [session, loading] = useSession();
  const [stats, setStats] = useRecoilState(authorStats);
  async function getData() {
    const data: any = await axios({
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
    setStats(data);
  }
  if (!stats) getData();
  const { total, firstWeek, lastWeek } = stats;
  useEffect(() => {
    if (!session) {
      router.push("/giris");
    }
  }, []);
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats total={total} firstWeek={firstWeek} lastWeek={lastWeek} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
              <CardTable />
            </div>
            <div className="w-full mb-12 px-4">
              <CardTable color="dark" />
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
