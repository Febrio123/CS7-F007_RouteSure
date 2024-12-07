import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const SendEmail = () => {
    const [laporanUser, setLaporanUser] = useState({});
    const [status, setStatus] = useState('');
    const url = window.location.href;
    const idLaporan = url.split('/')[5];
    const form = useRef();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/laporan/${ idLaporan }`, { withCredentials: true })
            .then((response) => {
                setLaporanUser(response.data);
                setStatus(response.data.detailLaporan.status);
            }).catch((err) => {
                console.log(err);
            });
    }, [idLaporan]);

    function sendEmailHandler(e) {
        e.preventDefault();
        const templateParams = {
            name: laporanUser.detailLaporan.name,
            email: laporanUser.detailLaporan.email,
            status: laporanUser.detailLaporan.status,
            image: laporanUser.detailLaporan.image
        };

        emailjs.send('service_qq81thb', 'template_ppuy95g', templateParams, '0mgCiwlEqfhvm9Nln')
            .then(
                () => {
                    console.log('SUCCESS!');
                    toast.success("Status Laporan Berhasil dikirim ke User");
                },
                (error) => {
                    console.log('FAILED...', error);
                    toast.error(error.text);
                }
            );
    }

    return (
        <div>
            <h1>ini halaman send Email</h1>
            <section className="rounded-md p-2 bg-white">
                <div className="flex items-center justify-center my-3">
                    <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2"></div>
                        <h2 className="text-2xl text-sky-600 font-bold leading-tight">
                            Form Kirim Status Laporan
                        </h2>
                        <form className="mt-5" ref={form} encType="multipart/form-data" onSubmit={sendEmailHandler}>
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
                                            disabled
                                            value={laporanUser?.detailLaporan?.name || ''}
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
                                            disabled
                                            value={laporanUser?.detailLaporan?.email || ''}
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
                                            disabled
                                            value={laporanUser?.detailLaporan?.deskripsi || ''}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-900">
                                            Latitude
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Latitude"
                                            type="number"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 text-black"
                                            name="latitude"
                                            disabled
                                            value={laporanUser?.detailLaporan?.position?.latitude || ''}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-900">
                                            Longitude
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Longitude"
                                            type="number"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 text-black"
                                            name="longitude"
                                            disabled
                                            value={laporanUser?.detailLaporan?.position?.longitude || ''}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <label className="text-base font-medium text-gray-900">
                                        Status Laporan :  {laporanUser?.detailLaporan?.status || ''}
                                    </label>
                                </div>
                                <div>
                                    <button
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        type="submit"
                                    >
                                        Kirim Status
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

export default SendEmail;
