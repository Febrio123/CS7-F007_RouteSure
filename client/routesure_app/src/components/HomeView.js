import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Map from "./mapComponent/Map";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const HomeView = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [deskripsi, setDeskripsi] = useState('');
    const status = ["proses", "berhasil"];
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    const handleLogoutButton = () => {
        const getUser = localStorage.getItem('user')
        if (getUser) {
            const removeUser = localStorage.removeItem('user')
            Cookies.remove('jwt')
            axios.post('http://localhost:5000/api/logout', removeUser, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    toast.success('logout berhasil')
                    navigate('/login')
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
    const submitDataLaporan = (e) => {
        e.preventDefault();

        if (!name || !email || !image || !deskripsi) {
            toast.warn("Form Laporan harus diisi!")
            return
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('status', status[0]);
            formData.append('latitude', position.coords.latitude);
            formData.append('longitude', position.coords.longitude);
            formData.append('deskripsi', deskripsi);
            formData.append('image', image);

            axios.post('http://localhost:5000/api/laporan', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    toast.success(response.data.message)
                })
                .catch(() => {
                    toast.error("Laporan mu sudah terkirim")
                });
        });
    };


    return (
        <div className='bg-white h-screen'>
            <h1 className="text-black">Ini halaman laporan view</h1>
            <button onClick={handleLogoutButton} type="submit" className="px-8 py-5 bg-red-500 text-white">Logout</button>
            <Map />
            <section className="rounded-md p-2 bg-white">
                <div className="flex items-center justify-center my-3">
                    <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2"></div>
                        <h2 className="text-2xl text-sky-600 font-bold leading-tight">
                            Form Laporan Infrastruktur
                        </h2>
                        <form className="mt-5" encType="multipart/form-data">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        User Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Full Name"
                                            type="text"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 text-black"
                                            name="name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Email"
                                            type="email"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 text-black"
                                            name="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-900">
                                            Description
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Input description"
                                            type="text"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 text-black"
                                            name="deskripsi"
                                            onChange={(e) => setDeskripsi(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <label className="text-base font-medium text-gray-900">
                                            Picture
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="file-input w-full max-w-xs text-black"
                                            type="file"
                                            name="image"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        type="submit"
                                        onClick={submitDataLaporan}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomeView;
