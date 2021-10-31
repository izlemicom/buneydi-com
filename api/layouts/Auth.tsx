import React from "react";
import FooterSmall from "../components/Footers/FooterSmall";
import Navbar from "../components/Navbars/AuthNavbar";

// components

export default function Auth({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
