import React, { useState, useEffect } from 'react'
import axios from 'axios'


const TableUser = () => {
    const [DataUser, setDataUser] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/get-user', { withCredentials: true })
            .then((response) => {
                console.log(response)
                if (Array.isArray(response.data.user)) {
                    console.log('API response:', response.data);
                    setDataUser(response.data.user);
                } else {
                    console.error('API response is not an array:', response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <h1>Table Dashboard Laporan</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" >
                    {DataUser.map((user) => (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.role === '671b672b3981db347cfd7832' ? 'admin' : 'user'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  bg-green-200 text-green-400">Active</span>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableUser
