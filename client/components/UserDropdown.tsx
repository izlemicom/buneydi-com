import React from "react";
import { createPopper } from "@popperjs/core";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";

const UserDropdown = () => {
  const [session, loading] = useSession();
  // dropdown props
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
    <div className="items-center md:flex">
      <a
        className="text-blueGray-500 block cursor-pointer"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center md:flex">
          <span className="w-12 h-12 text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt={session.user.name}
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={session.user.image}
            />
          </span>
          <span className="ml-2 font-medium text-lg hidden lg:flex">
            {session.user.name}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link href="/hesabim">
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
    </div>
  );
};

export default UserDropdown;
