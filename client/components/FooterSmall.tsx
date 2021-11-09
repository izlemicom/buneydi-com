import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute ? "fixed w-full bottom-0" : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.buneydi.com"
                  className=" text-sm font-semibold py-1"
                >
                  www.buneydi.com
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a href="/" className="text-sm font-semibold block py-1 px-3">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="text-sm font-semibold block py-1 px-3">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="text-sm font-semibold block py-1 px-3">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="text-sm font-semibold block py-1 px-3">
                    <i className="fab fa-instagram-square"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
