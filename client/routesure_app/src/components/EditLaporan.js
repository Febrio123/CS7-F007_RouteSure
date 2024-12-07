import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditLaporan = () => {
    const navigate = useNavigate()
    const [laporanUser, setLaporanUser] = useState({});
    const [status, setStatus] = useState('');
    const url = window.location.href;
    const idLaporan = url.split('/')[6];

    useEffect(() => {
        axios.get(`http://localhost:5000/api/laporan/${ idLaporan }`, { withCredentials: true })
            .then((response) => {
                setLaporanUser(response.data);
                setStatus(response.data.detailLaporan.status);
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            });
    }, [idLaporan]);

    function editLaporanHandle(e) {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/laporan/${ idLaporan }`, { status: status }, { withCredentials: true })
            .then((response) => {
                setLaporanUser(response.data);
                console.log(response.data);
                toast.success("Data Laporan Berhasil dikirim")
                navigate('/dashboard')
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <h1>ini halaman edit</h1>
            {
                <section className="rounded-md p-2 bg-white">
                    <div className="flex items-center justify-center my-3">
                        <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
                            <div className="mb-2"></div>
                            <h2 className="text-2xl text-sky-600 font-bold leading-tight">
                                Form Laporan Infrastruktur
                            </h2>
                            <form className="mt-5" encType="multipart/form-data" onSubmit={editLaporanHandle}>
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
                                                value={laporanUser?.detailLaporan?.email || ''}
                                                disabled
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
                                                value={laporanUser?.detailLaporan?.deskripsi || ''}
                                                disabled
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
                                        <div className="flex items-center justify-between mt-3">
                                            <label className="text-base font-medium text-gray-900">
                                                Picture
                                            </label>
                                        </div>
                                        <img src={laporanUser?.detailLaporan?.image || ''} alt='' />
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <label className="text-base font-medium text-gray-900">
                                            Status Laporan : {laporanUser?.detailLaporan?.status || ''}
                                        </label>
                                    </div>
                                    <select name='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value='Proses'>Proses</option>
                                        <option value='Selesai'>Selesai</option>
                                    </select>
                                    <div>
                                        <button
                                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            type="submit"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            }
        </div>
    );
}

export default EditLaporan;
