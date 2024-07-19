'use client'
import { useEffect, useState } from 'react';
import Router from "next/router";
import axios from "axios";
import { API_BASE_URL } from '../../const/CustomConsts';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from "../../components/Layout/NavBar";

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const phoneRegex = /^[\+]?[(]?[0-9]{Router3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', repassword: '', avatar: '', token: '', type: '' });
  const [emailFlag, setEmailFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);

  const handleTextChange = (e) => {
    setEmailFlag(false);
    setPasswordFlag(false);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const saveUserInfo = () => {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    saveData.userInfo = userInfo;
    localStorage.saveData = JSON.stringify(saveData);
  }

  const axiosFunc = () => {
    axios.post(API_BASE_URL + '/auth/signin', {
      email: userInfo.email,
      password: userInfo.password
    }
    ).then((res) => {
      if (res.data.statusCode == 200) {
        userInfo = res.data.data.user;
        userInfo.token = res.data.data.token;
        saveUserInfo();
        toast.success('вход успешный');
        if (userInfo.type == 1) Router.push('/admin'); else Router.push('/');
      }
    }).catch((err) => {
      if (err.response?.data.message) toast.error(err.response.data.message);
      console.log(err);
    });
  }
  const handleKeyUp = (e) => {
    if (e.keyCode == '13') handleSubmit();
  }
  const handleSubmit = () => {
    if (!emailRegex.test(userInfo.email)) {
      setEmailFlag(true);
      return;
    }
    if (userInfo.password == "") {
      setPasswordFlag(true);
      return;
    }
    axiosFunc();
  }
  return (
    <>
      <NavBar />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-[60px] md:mt-[94px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Войдите в свой аккаунт</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <div className='flex flex-row justify-between'>
                <div className="block text-sm font-medium leading-6 text-gray-900">Электронный адрес</div>
                <div className="font-semibold text-red-600 hover:text-red-500">
                  {emailFlag ? 'Неверный адрес' : null}
                </div>
              </div>
              <div className="mt-2">
                <input id="email" name="email" type="email" required onChange={handleTextChange} onKeyUp={handleKeyUp}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="block text-sm font-medium leading-6 text-gray-900">Пароль</div>
                <div className="font-semibold text-indigo-600 hover:text-indigo-500">
                  {passwordFlag ? `Забыли пароль?` : null}
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" required onChange={handleTextChange} onKeyUp={handleKeyUp}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-[#FF6432] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#dF5422] "
                onClick={handleSubmit}
              >Авторизоваться</button>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-gray-500 flex justify-between gap-8">
            <div className='text-nowrap'>Не регистрирован?</div>
            <div className="cursor-pointer font-semibold leading-6 text-[#FF6432] hover:text-[#FF6400]"
              onClick={() => { Router.push('/auth/signup') }}> Зарегистрироваться </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage;