import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "../Layout/Dropdown";
import { useState, useEffect } from 'react';
import Router from "next/router"
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from 'react-toastify';
import SearchSvg from "../../../public/img/SVG/SearchSvg"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const headerDropdown = {
  title: "Еще",
  items: [
    {
      key: 2,
      title: "Политика",
      href: "/policy",
    },
  ],
};

export default function NavBar() {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', repassword: '' });

  useEffect(() => {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    setUserInfo(saveData.userInfo);
  }, []);
  const handleLogOut = () => {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    saveData.userInfo = null;
    localStorage.saveData = JSON.stringify(saveData);
    setUserInfo(null);
  }
  useEffect(() => {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    setUserInfo(saveData.userInfo);
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

      <div className="container relative flex flex-1 mx-auto max-w-[1200px] md:py-[17px]">
        <div className="flex flex-row w-full px-4 md:px-4 justify-between items-center">
          <div className="flex cursor-pointer"
            onClick={() => { Router.push('/') }}>
            <Image src='/img/logo.png' width={150} height={60} alt="logo" objectFit="fill" />
          </div>
          <div className="flex gap-x-6 zero:gap-x-12">
            <div className="hidden zero:flex gap-x-12 class-p2">
              <Link href="/direction">Направления</Link>
              <Link href="/ProjectB1">Экскурсии</Link>
              <Link href="/ProjectB2">Трансфер</Link>
              <Link href="/Telegram">Телеграм-бот</Link>
              <Dropdown data={headerDropdown} />
            </div>
            <div onClick={() => { }} className="cursor-pointer">
              <SearchSvg size={true} />
            </div>
            <div className="flex zero:hidden">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex w-full ">
                    <Bars3Icon
                      className="w-6 h-6 text-[#292D32]"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#directions"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Направления
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#excursions"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Экскурсии
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#Трансфер"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Трансфер
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#Telegram"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Телеграм-бот
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#Политика"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Политика
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {userInfo ? (
                          <>
                            <div className='px-4 py-2 hover:bg-slate-100' >
                              <Link href="/auth/info">Профиль</Link>
                            </div>
                            <div className='px-4 py-2 text-sm cursor-pointer hover:bg-slate-100'
                              onClick={handleLogOut}
                            >
                              {userInfo.firstName}{userInfo.lastName}-Выйти
                            </div>
                            {userInfo.type == 1 ? (
                              <div className='px-4 py-2 hover:bg-slate-100'>
                                <Link href="/admin">Админ-панель</Link>
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <div className="block px-4 py-2 hover:bg-slate-100">
                            <Link href="/auth/login">Авторизоваться</Link>
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
