import React, { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Router from "next/router"
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Dropdown({ data, customClass }) {
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

  return (
    <div className='relative'>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className={`inline-flex w-full justify-center items-center gap-x-2 font-medium ${customClass ? customClass : 'text-lg'}`}>
            <div className='class-p2'>{data.title}</div>
            <ChevronDownIcon className="-mr-1 h-6 w-6" aria-hidden="true" />
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
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {data.items && data.items.map((item) => (
                <Menu.Item key={item.key}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      <div className='class-p2'>{item.title}</div>
                    </a>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                {userInfo ? (
                  <>
                    <div className='px-4 py-2 text-sm cursor-pointer hover:bg-slate-100' onClick={() => { Router.push('/auth/info') }}>
                      <div className='class-p2'>Профиль</div>
                    </div>
                    <div className='px-4 py-2 text-sm cursor-pointer hover:bg-slate-100' onClick={handleLogOut}>
                      <div className='class-p2'>{userInfo.firstName}{userInfo.lastName}-Выйти</div>
                    </div>
                    {userInfo.type == 1 ? (
                      <div className='px-4 py-2 text-sm cursor-pointer hover:bg-slate-100' onClick={() => { Router.push('/admin') }}>
                        <div className='class-p2'>Админ-панель</div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <a href="/auth/login"
                    className="block px-4 py-2 text-sm hover:bg-slate-100">
                    <div className='class-p2'>Авторизоваться</div>
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
