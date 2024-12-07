import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TableLaporan = () => {
    const [laporanUser, setLaporanUser] = useState([]);
    const [filteredLaporan, setFilteredLaporan] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/laporan', { withCredentials: true })
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    console.log('API response:', response.data);
                    setLaporanUser(response.data.data);
                    setFilteredLaporan(response.data.data); // Initialize filteredLaporan with all data
                } else {
                    console.error('API response is not an array:', response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deleteLaporanHandler = (e) => {
        const getId = e.target.dataset.id;
        console.log(getId);
        axios.delete(`http://localhost:5000/api/laporan/${ getId }`, { withCredentials: true })
            .then(() => {
                toast.success("Data Laporan berhasil di hapus");
                setLaporanUser(laporanUser.filter(laporan => laporan._id !== getId));
                setFilteredLaporan(filteredLaporan.filter(laporan => laporan._id !== getId));
            }).catch((error) => {
                toast.error("Kesalahan Server Error", error);
                console.log(error);
            });
    };

    const sortByStatusHandle = (e) => {
        const targetStatus = e.target.value;
        const filterLaporan = laporanUser.filter((laporan) => laporan.status === targetStatus);
        setFilteredLaporan(filterLaporan);
    };

    return (
        <div>
            <h1>Table Dashboard Laporan</h1>
            <div>
                <label>Cari berdasarkan Status</label><br />
                <select className='border bg-sky-500 border-black text-white' onChange={sortByStatusHandle} name='filter'>
                    <option value='Proses'>Proses</option>
                    <option value='Selesai'>Selesai</option>
                </select>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLaporan.map((laporan) => (
                        <tr key={laporan._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{laporan.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{laporan.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{laporan.position.latitude}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{laporan.position.longitude}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{laporan.deskripsi}</td>
                            <td className="px-6 py-4 whitespace-nowrap"> <img src={laporan.image} alt='' /> </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {laporan.status === 'Proses' ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-orange-400">{laporan.status}</span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-400">{laporan.status}</span>} </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link to={`/dashboard/laporan/edit/${ laporan._id }`} className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</Link>
                                <Link to={`/dashboard/sendStatus/${ laporan._id }`} className="px-4 py-2 ml-2 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:shadow-outline-blue active:bg-orange-600 transition duration-150 ease-in-out">Kirim Status</Link>
                                <button onClick={deleteLaporanHandler} className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" data-id={laporan._id}>Delete</button> </td> </tr>))}
                </tbody>
            </table>
        </div>
    );
};

export default TableLaporan;
