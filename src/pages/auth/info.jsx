'use client'
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Router from "next/router";
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { API_BASE_URL } from '../../const/CustomConsts';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from "../../components/Layout/NavBar";

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
//const phoneRegex = /^[\+]?[(]?[0-9]{Router3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
//const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
const phoneRegex = /^\d{10}$/; // Example pattern for a 10-digit phone number

const MyInfoPage = () => {
	const [userInfo, setUserInfo] = useState();
	const [nameFlag, setNameFlag] = useState(false);
	const [emailFlag, setEmailFlag] = useState(false);
	const [phoneFlag, setPhoneFlag] = useState(false);
	const [passwordLenFlag, setPasswordLenFlag] = useState(false);
	const [passwordFlag, setPasswordFlag] = useState(false);
	const [oldPasswordFlag, setOldPasswordFlag] = useState(false);
	const [newUserData, setNewUserData] = useState({ oldPassword: '', password: '', rePassword: '' })

	useEffect(() => {
		var saveData = JSON.parse(localStorage?.saveData || null) || {};
		setUserInfo(saveData.userInfo);
	}, [])

	const handleKeyUp = (e) => {
		if (e.keyCode == '13') handleSubmit();
	}

	const handleTextChange = (e) => {
		setNewUserData({ ...newUserData, [e.target.name]: e.target.value })
		setOldPasswordFlag(false);
		setPasswordLenFlag(false);
		setPasswordFlag(false);
	}
	const passUpdate = () => {
		axios.post(API_BASE_URL + "/auth/changePwd",
			{
				id: userInfo.id,
				oldPassword: newUserData.oldPassword,
				password: newUserData.password
			},
			{ headers: { 'Authorization': `Bearer ${userInfo.token}` } }
		).then((res) => {
			toast.success('Password Change Success')
			Router.push('/');
		}).catch((err) => {
			toast.error('Invalid Password')
			console.log(err);
		})
	}

	const handleSubmit = () => {
		if (newUserData.oldPassword == "") {
			setOldPasswordFlag(true); return;
		}
		if (newUserData.password.length < 8) {
			setPasswordLenFlag(true); return;
		}
		if (newUserData.password == "" || newUserData.password != newUserData.rePassword) {
			setPasswordFlag(true); return;
		}
		passUpdate();
	}


	return (
		<>
			<NavBar />
			{userInfo ? (
				<div className="flex min-h-full flex-col justify-center px-6 py-0 lg:px-8 bg-red-50 mt-[60px] md:mt-[94px]">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Информация Об Учетной Записи</h2>
					</div>

					<div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
						<div className="flex flex-col gap-2">
							<div className='text-center mt-1'>
								<Image className="rounded-8 border object-cover rounded-[100px]" height={100} width={100}
									src={userInfo?.avatar ? `${API_BASE_URL}/avatar/${userInfo.avatar}` : '/icon/avatar.png'} />
							</div>
							<div className=''>
								<div className="font-semibold text-red-600 hover:text-red-500 text-center">
									{nameFlag ? 'Неверное Название' : null}
								</div>
								<div className='flex flex-row justify-between'>
									<div className="block text-sm font-medium leading-6 text-gray-900">Название</div>
									<div className="block text-sm font-medium leading-6 text-gray-900">Фамилия</div>
								</div>
								<div className='flex flex-row gap-2'>
									<div className="mt-2">
										<input disabled value={userInfo.firstName} id="firstName" name="firstName" required onChange={handleTextChange} onKeyUp={handleKeyUp}
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
									</div>
									<div className="mt-2">
										<input disabled value={userInfo.lastName} id="lastName" name="lastName" required onChange={handleTextChange} onKeyUp={handleKeyUp}
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
									</div>
								</div>
							</div>

							<div>
								<div className='flex flex-row justify-between'>
									<div className="block text-sm font-medium leading-6 text-gray-900">Электронный адрес</div>
									<div className="font-semibold text-red-600 hover:text-red-500">
										{emailFlag ? 'Неверный адрес' : null}
									</div>
								</div>
								<div className="mt-2">
									<input disabled value={userInfo.email} id="email" name="email" required onChange={handleTextChange} onKeyUp={handleKeyUp}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
								</div>
							</div>

							<div>
								<div className='flex flex-row justify-between'>
									<div className="block text-sm font-medium leading-6 text-gray-900">Номер телефона</div>
									<div className="font-semibold text-red-600 hover:text-red-500">
										{phoneFlag ? 'Номер телефона недействителен' : null}
									</div>
								</div>
								<div className="mt-2">
									<input disabled value={userInfo.phoneNumber} id="phoneNumber" name="phoneNumber" required onChange={handleTextChange} onKeyUp={handleKeyUp}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
								</div>
							</div>
							<div></div>
							<div>
								<div className="flex items-center justify-between">
									<div className="block text-sm font-medium leading-6 text-gray-900">старый Пароль</div>
									<div className="font-semibold text-indigo-600 hover:text-indigo-500">
										{oldPasswordFlag ? 'Введите старый пароль' : null}
									</div>
								</div>
								<div className="mt-2">
									<input id="oldPassword" name="oldPassword" type="password" required onKeyUp={handleKeyUp}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3"
										onChange={handleTextChange}
									/>
								</div>
							</div>
							<div>
								<div className="flex items-center justify-between">
									<div className="block text-sm font-medium leading-6 text-gray-900">Пароль</div>
									<div className="font-semibold text-indigo-600 hover:text-indigo-500">
										{passwordLenFlag ? 'Длина пароля менее 8' : null}
									</div>
								</div>
								<div className="mt-2">
									<input id="password" name="password" type="password" required onKeyUp={handleKeyUp}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3"
										onChange={handleTextChange}
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<div className="block text-sm font-medium leading-6 text-gray-900">Подтвердить Пароль</div>
									<div className="font-semibold text-indigo-600 hover:text-indigo-500">
										{passwordFlag ? "Пароль не совпадает" : null}
									</div>
								</div>
								<div className="mt-2">
									<input id="rePassword" name="rePassword" type="password" required onChange={handleTextChange} onKeyUp={handleKeyUp}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3" />
								</div>
							</div>

							<div className='flex justify-center mt-5'>
								<button type="button" className="flex w-36 justify-center rounded-md bg-[#FF6432] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#dF5422] "
									onClick={handleSubmit}>
									Change Password</button>
							</div>
						</div>
					</div>
				</div>

			) : null}

		</>
	)
}

export default MyInfoPage
	;