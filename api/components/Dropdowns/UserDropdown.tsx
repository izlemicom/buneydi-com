import React from "react";
import { createPopper } from "@popperjs/core";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserDropdown = () => {
  const { data: session } = useSession();

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-12 h-12 object-cover rounded-full align-middle border-none shadow-lg"
              src={session?.user?.image}
            />
          </span>
          <span className="ml-2">{session?.user?.name}</span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link href="/ayarlar">
          <a
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
            }
          >
            <i className="fas fa-user-circle"></i> Hesabım
          </a>
        </Link>

        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap cursor-pointer bg-transparent"
          }
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <i className="fas fa-sign-out-alt"></i> Oturumu Kapat
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
