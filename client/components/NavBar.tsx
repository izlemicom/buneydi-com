import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import User from "./User";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

function NavBar() {
  const { data, status } = useSession();
  const session = data;
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (window.innerWidth < 768) setOpen(false);
  }, []);
  function openMenu() {
    if (!open && window.innerWidth < 768) setOpen(true);
    else setOpen(false);
  }
  return (
    <header>
      <nav className="bg-gray-100 shadow fixed w-screen z-20">
        <div className="container px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <a className="text-xl font-bold md:text-2xl hover:text-indigo-500 whitespace-nowrap">
                  <i className="fas fa-glasses"></i> Bu Neydi?
                </a>
              </Link>
            </div>

            <div className="flex md:hidden">
              <button
                onClick={openMenu}
                type="button"
                className="focus:outline-none"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {open && (
            <div className="items-center md:flex">
              <div className="flex flex-col md:flex-row md:mx-6">
                <Link href="/">
                  <a className="my-1 text-lg hover:text-indigo-500 md:mx-4 md:my-0 whitespace-nowrap">
                    <i className="h-6 w-6 fas fa-home"></i>
                    Ana Sayfa
                  </a>
                </Link>
                <Link href="/icerikler">
                  <a
                    className="my-1 text-lg hover:text-indigo-500 md:mx-4 md:my-0 whitespace-nowrap"
                    href=""
                  >
                    <i className="fas fa-newspaper"></i> İçerikler
                  </a>
                </Link>
                <Link href="/yazarlar">
                  <a className="my-1 text-lg hover:text-indigo-500 md:mx-4 md:my-0 whitespace-nowrap">
                    <i className="fas fa-users"></i> Yazarlar
                  </a>
                </Link>
                <Link href="/etiketler">
                  <a
                    className="my-1 text-lg hover:text-indigo-500 md:mx-4 md:my-0 whitespace-nowrap"
                    href="#"
                  >
                    <i className="fas fa-tags"></i> Etiketler
                  </a>
                </Link>
              </div>
            </div>
          )}
          {open && !session && (
            <div className="items-center md:flex">
              <Link href="/giris">
                <a className="my-1 text-lg hover:text-indigo-500 md:mx-4 md:my-0 whitespace-nowrap">
                  <i className="fas fa-user"></i> Giriş/Kayıt Ol
                </a>
              </Link>
            </div>
          )}
          {open && session && <UserDropdown />}
        </div>
      </nav>
      {!session && <div className="py-6"></div>}
      {session && <div className="py-8 bg-gray-100"></div>}
    </header>
  );
}

export default NavBar;
