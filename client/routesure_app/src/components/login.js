import axios from 'axios';
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const toastUtil = {
        position: "top-left",
        closeOnClick: true,
        draggable: true,
        transition: Bounce,
    };

    async function submitUserData(e) {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            toast.error('Semua field harus diisi', toastUtil);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/login', userData, { withCredentials: true });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if (response.status === 200) {
                toast.success(`Akun ${ response.data.message } terdaftar..`, toastUtil);
                setUser(response.data.user);
            }
            if (response.data.user.name === 'admin') {
                console.log('Navigating to /dashboard');
                navigate('/dashboard');
            } else {
                console.log('Navigating to /home');
                navigate('/home');
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                toast.error(`Error: email atau password salah`, toastUtil);
                return
            } else {
                toast.error('Terjadi kesalahan pada server', toastUtil);
                return
            }
        }
    }

    return (
        <div>
            <div className="login bg-sky-800 min-h-screen">
                <div className="w-full flex justify-center items-center flex-col self-center min-h-screen">
                    <div className="min-w-[300px] md:min-w-[400px] lg:min-w-[600px] border border-sky-300 h-[350px] bg-inherit rounded shadow p-[20px]">
                        <h1 className="text-left pb-5 bg-inherit font-sans font-semibold text-[1.25rem] md:text-[1.5rem] lg:text-[1.7rem]">Login</h1>
                        <form method='post'>
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email address</label>
                                <div className="mt-2">
                                    <input type="email" name="email" id="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" onChange={(e) => setUserData(prevState => ({ ...prevState, email: e.target.value }))}></input>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mt-2">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-white">Password</label>
                                </div>
                                <div className="mt-2">
                                    <input type="password" name="password" id="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" onChange={(e) => setUserData(prevState => ({ ...prevState, password: e.target.value }))}></input>
                                </div>
                            </div>
                            <div className="mt-2 hover:underline">
                                <a href='/register'>You don't have an account? Register</a>
                            </div>

                            <div className='pt-5'>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={submitUserData}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
