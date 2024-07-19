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

const SignPage = () => {
	const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', rePassword: '', avatar: '' });
	const [nameFlag, setNameFlag] = useState(false);
	const [emailFlag, setEmailFlag] = useState(false);
	const [phoneFlag, setPhoneFlag] = useState(false);
	const [passwordLenFlag, setPasswordLenFlag] = useState(false);
	const [passwordFlag, setPasswordFlag] = useState(false);

	const [avatar, setAvatar] = useState({ file: null, path: userInfo?.avatar })
	const dispatch = useDispatch()
	const uploadRef = useRef()
	const fileSelect = () => {
		uploadRef.current.click()
	}

	const handleAvatarChange = (e) => {
		let file = e.target.files[0];
		if (file) setAvatar({ file, path: URL.createObjectURL(file) });
	}

	const handleTextChange = (e) => {
		setEmailFlag(false);
		setNameFlag(false);
		setPhoneFlag(false);
		setPasswordLenFlag(false);
		setPasswordFlag(false);
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	}
	const handleKeyUp = (e) => {
		if (e.keyCode == '13') handleSubmit();
	}
	const saveUserInfo = () => {
		var saveData = JSON.parse(localStorage.saveData || null) || {};
		saveData.userInfo = userInfo;
		localStorage.saveData = JSON.stringify(saveData);
	}

	const axiosFunc = async () => {
		const formData = new FormData();

		formData.append('firstName', userInfo.firstName);
		formData.append('lastName', userInfo.lastName);
		formData.append('email', userInfo.email);
		formData.append('phoneNumber', userInfo.phoneNumber);
		formData.append('password', userInfo.password);

		if (avatar.file) { formData.append('avatar', avatar.file); }
		console.log(avatar.file)
		try {
			const res = await axios.post(API_BASE_URL + '/auth/signup', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			if (res.data.statusCode == 200) {
				userInfo.token = res.data.data.token;
				saveUserInfo();
				toast.success('знак успеха');
				Router.push('/auth/login');
			}
			if (res.data.statusCode == 400) {
				toast.success(res.data.msg);
				Router.push('/auth/login');
			}
			console.log(res.data);
		} catch (error) {
			console.log(error);
			console.error('Error uploading file:', error);
		}
	}

	const handleSubmit = () => {
		if (userInfo.avatar == "") toast.error('Выберите Аватар');
		if (userInfo.firstName == "" || userInfo.lastName == "") {
			setNameFlag(true); return;
		}
		if (!emailRegex.test(userInfo.email)) {
			setEmailFlag(true); return;
		}
		if (!phoneRegex.test(userInfo.phoneNumber)) {
			setPhoneFlag(true); return;
		}
		if (userInfo.password.length < 8) {
			setPasswordLenFlag(true); return;
		}
		if (userInfo.password == "" || userInfo.password != userInfo.rePassword) {
			setPasswordFlag(true); return;
		}
		axiosFunc();
	}
	return (
		<>
			<NavBar />
			<div className="flex min-h-full flex-col justify-center px-6 py-0 lg:px-8 mt-[60px] md:mt-[94px]">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Зарегистрируйтесь в своей учетной записи</h2>
				</div>

				<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="flex flex-col gap-2">
						<div className='text-center mt-5'>
							<Image onClick={fileSelect} alt="avatar" className="rounded-8 border cursor-pointer object-cover rounded-[100px]" height={100} width={100} src={avatar?.path ? (avatar?.path) : "/icon/avatar.png"} />
							<input className="hidden d-none cursor-pointer w-[200px] mb-8" ref={uploadRef} type="file" accept="image/png, image/jpeg" onChange={handleAvatarChange} />
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
									<input id="firstName" name="firstName" required onChange={handleTextChange} onKeyUp={handleKeyUp}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
								</div>
								<div className="mt-2">
									<input id="lastName" name="lastName" required onChange={handleTextChange} onKeyUp={handleKeyUp}
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
								<input id="email" name="email" required onChange={handleTextChange} onKeyUp={handleKeyUp}
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
								<input id="phoneNumber" name="phoneNumber" required onChange={handleTextChange} onKeyUp={handleKeyUp}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
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
								<input id="password" name="password" type="password" required onChange={handleTextChange} onKeyUp={handleKeyUp}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3" />
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

						<div>
							<button type="button" className="flex w-full justify-center rounded-md bg-[#FF6432] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#dF5422] "
								onClick={handleSubmit}
							>Зарегистрироваться</button>
						</div>
					</div>

					<div className="my-10 text-center text-sm text-gray-500 flex justify-between mx-2">
						<div>Уже есть учетная запись?</div>
						<div className="cursor-pointer font-semibold leading-6 text-[#FF6432] hover:text-[#FF6400]"
							onClick={() => { Router.push('/auth/login') }}> Авторизоваться </div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignPage;