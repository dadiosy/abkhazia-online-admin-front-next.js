import React, { useRef } from "react";
import Image from "next/image";
import { useState, useEffect } from 'react';
import Router from "next/router"
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link"
import Dropdown from "../../../components/Layout/Dropdown";

export default function NavBar() {
  const headerDropdown = {
    title: "Еще",
    items: [],
  };
  useEffect(() => {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    if (!saveData?.userInfo) {
      if (Router.pathname == '/auth/signup') {
        Router.push('/auth/signup')
      } else Router.push('/auth/login')
    } else {
      if (Router.pathname == '/auth/signup' || Router.pathname == '/auth/login') Router.push('/')
    }
  }, []);

  return (
    <div className="w-full flex flex-1 bg-white fixed top-0 z-40" id='navtop'>
      <ToastContainer position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <div className="container relative flex flex-1 mx-auto max-w-[1440px] py-2 md:py-[17px]">
        <div className="flex flex-row w-full px-4 md:px-[8.333333333%] justify-between items-center">
          <div className="flex cursor-pointer"
            onClick={() => { Router.push('/') }}>
            <img src='/img/logo.png' width={150} height={60} alt="logo" className="object-fill" />
          </div>
          <div className="flex gap-x-2 md:gap-x-10 ">
            <div className="class-p2 hover:text-[#FF6432] !text-[14px] md:!text-[18px]">
              <Link href="/meta">Мета</Link>
            </div>
            <div className="class-p2 hover:text-[#FF6432] !text-[14px] md:!text-[18px]">
              <Link href="/seo">SEO</Link>
            </div>
            <div className="class-p2 hover:text-[#FF6432] !text-[14px] md:!text-[18px]">
              <Link href="/direction">Направления</Link>
            </div>
            <div className="class-p2 hover:text-[#FF6432] !text-[14px] md:!text-[18px]">
              <Link href="/attraction">Достопримечательности</Link>
            </div>
            <div className="class-p2 hover:text-[#FF6432] !text-[14px] md:!text-[18px]">
              <Link href="/blog">Блог</Link>
            </div>
            <div className="class-p2 hover:text-[#FF6432] !text-[14px] md:!text-[18px]">
              <Link href="/faq">Вопросы и ответы</Link>
            </div>
            <Dropdown data={headerDropdown} />

          </div>
        </div>
      </div >
    </div >
  );
}
