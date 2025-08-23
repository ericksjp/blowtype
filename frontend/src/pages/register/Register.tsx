import { useState } from 'react';
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from '../../store/authStore';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register: registerUser, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        const success = await registerUser({ username, email, password });
        if (success) {
            navigate('/');
        }
    }

    return (
        <div className='flex justify-center items-center h-[100vh] min-h-screen bg-gray-900'>
            <div className='bg-transparent w-[19rem] pt-2 rounded pb-5 shadow-lg shadow-blue-700/50 border-1 border-blue-400'>
                <h1 className="text-6xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent text-center pt-2">
                    Blowtype
                </h1>
                <form onSubmit={handleSubmit} className='pt-3 pl-5'>
                    <label className='text-gray-400 font-bold' htmlFor="username">Username</label><br/>
                    <input 
                        className='bg-white outline-none text-black mt-2 pl-2 text-2xl w-65 h-9 text-[0.8rem] rounded-[2px] font-light' 
                        type="text" 
                        placeholder='Enter your username'
                        onChange={(event) => setUsername(event.target.value)}  
                        value={username}
                        disabled={isLoading}
                        required
                    /><br/><br/>

                    <label className='text-gray-400 font-bold' htmlFor="email">E-mail</label><br/>
                    <input 
                        className='bg-white outline-none text-black mt-2 pl-2 text-2xl w-65 h-9 text-[0.8rem] rounded-[2px] font-light' 
                        type="email" 
                        placeholder='Enter your e-mail'
                        onChange={(event) => setEmail(event.target.value)}  
                        value={email}
                        disabled={isLoading}
                        required
                    /><br/><br/>

                    <label className='text-gray-400 font-bold' htmlFor="password">Password</label><br/>
                    <input 
                        className='bg-white border-none outline-none text-black mt-2 pl-2 w-65 h-9 text-[0.8rem] rounded-[2px] font-light' 
                        type="password" 
                        placeholder='Enter the password'
                        onChange={(event) => setPassword(event.target.value)} 
                        value={password}
                        disabled={isLoading}
                        required
                    /><br/><br/>

                    <button 
                        type='submit' 
                        disabled={isLoading}
                        className='bg-gradient-to-r from-blue-300 via-blue-700 to-blue-950 pt-1.5 pb-1.5 w-65 rounded-3xl cursor-pointer transition-colors ease-in-out duration-500 transform hover:-translate-y-[1px] hover:scale-[1.01] shadow-2xs shadow-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? 'Creating account...' : 'Sign up'}
                    </button>

                    <p className="text-[0.8rem] text-white/70 pt-4 pl-8">
                        Already have an account?{' '}
                        <NavLink 
                            to="/auth/login" 
                            className={({isActive}) => isActive ? "text-blue-800 font-bold" : "text-blue-400"}
                        >
                            Sign in
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
}