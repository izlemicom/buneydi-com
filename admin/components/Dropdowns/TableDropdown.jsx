import React from "react";
import { createPopper } from "@popperjs/core";
import axios from "axios";
import { Encrypt } from "../../lib/CRYPT";
import { toast } from "react-toastify";
import router from "next/router";

const NotificationDropdown = ({ postId, type, slug }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  async function Sil(e) {
    e.preventDefault();
    let deleted = await axios({
      withCredentials: true,
      data: {
        postId,
      },
      method: "DELETE",
      url: `/post/${type}`,
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    })
      .then(function (response) {
        toast.success("İçerik başarılı bir şekilde silindi.");
        router.push("/icerikler");
        return response.data;
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
      });
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
  }
  async function Guncelle(e) {
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
    e.preventDefault();
    const encoded = Encrypt({ slug, type });
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
    window.open(`/guncelle?post=${encoded}`);
  }
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3 cursor-pointer"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
          }
          onClick={Guncelle}
        >
          <i className="fas fa-pen text-emerald-500"></i> Güncelle
        </a>
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
          }
          onClick={Sil}
        >
          <i className="fas fa-trash text-red-500"></i> Sil
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
