import React, { Component } from "react";
import Link from "next/link";

export default class Error404 extends Component {
  render() {
    return (
      <>
        <div className="my-48 flex flex-col items-center justify-center text-center">
          <span className="text-9xl font-bold">?</span>
          <span className="text-4xl font-medium">
            Aradığınız sayfayı bulamadık.
          </span>
          <div className="mt-5"></div>
          <Link href="/">
            <span className="rounded-md bg-gray-700 text-white px-2 py-2 text-lg font-medium cursor-pointer">
              Ana Sayfa
            </span>
          </Link>
          <div className="lg:mb-36 mb-20"></div>
        </div>
      </>
    );
  }
}
