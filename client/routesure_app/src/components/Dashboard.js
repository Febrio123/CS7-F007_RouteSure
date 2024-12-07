import React, { useState } from 'react';
import TableLaporan from './tableComponent/TableLaporan';
import TableUser from './tableComponent/TableUser';

const Dashboard = () => {
    const [showLaporan, setShowLaporan] = useState(true);

    return (
        <div className='h-screen bg-white relative'>
            {showLaporan ? (
                <div className='absolute'>
                    <h1 className='text-black'>Dashboard Laporan</h1>
                    <div className='mt-[50px] pb-[200px]'>
                        <button className='text-sky-500 hover:underline' onClick={() => setShowLaporan(false)}>Data User</button>
                        <div className='top-0 left-0 w-full h-full'>
                            <TableLaporan />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='absolute'>
                    <h1 className='text-black'>Dashboard User</h1>
                    <div className='mt-[50px] pb-[200px]'>
                        <button className='text-sky-500 hover:underline' onClick={() => setShowLaporan(true)}>Data Laporan</button><br />
                        <div className='top-0 left-0 w-full h-full'>
                            <TableUser />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
