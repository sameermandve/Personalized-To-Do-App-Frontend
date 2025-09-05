import { ClipboardCheck, Eye, EyeOff, Loader, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    const validateData = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!loginData.email.trim()) return toast.error("Email is required");
        if (!emailRegex.test(loginData.email)) return toast.error("Enter a valid email");
        if (!loginData.password.trim()) return toast.error("Password is required");
        if (loginData.password.length < 6) return toast.error("Password length must be greater than 6");

        return true;
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const success = validateData();

        if (success === true) login(loginData);
    }

    return (
        <div className='h-screen'>
            <div className='flex flex-col items-center justify-center pb-6 pt-25 sm:pb-12'>
                <div className='w-full max-w-md space-y-8'>
                    {/* Logo and Login Head */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div>
                                <ClipboardCheck className='size-12 text-primary' />
                            </div>
                            <h1 className='text-3xl font-bold mt-2'>Login to your account</h1>
                            <p className='text-base-content/60'>Welcome back, Enter your details</p>
                        </div>
                    </div>
                    {/* Logo and Login Head end */}

                    {/* Login Form Field */}
                    <form onSubmit={handleLoginSubmit} className='space-y-8 px-3' noValidate>
                        {/* Email - form field */}
                        <div className='flex flex-col'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                                    <Mail className='size-5 text-base-content/70' />
                                </div>
                                <input
                                    type="text"
                                    className='input input-bordered pl-12 font-medium w-full focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200'
                                    placeholder='Email'
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* Email - form field end */}

                        {/* pwd - form field */}
                        <div className='flex flex-col'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3 z-10'>
                                    <Lock className='size-5 text-base-content/70' />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className='input input-bordered pl-12 font-medium w-full focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200'
                                    placeholder='Password'
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                />
                                <button
                                    type='button'
                                    className='absolute inset-y-0 right-0 flex items-center pr-3 z-10'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ?
                                        (
                                            <EyeOff className='size-5 text-base-content/70' />
                                        ) : (
                                            <Eye className='size-5 text-base-content/70' />
                                        )}
                                </button>
                            </div>
                        </div>
                        {/* pwd - form field end */}

                        {/* login btn - form field */}
                        <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
                            {isLoggingIn ?
                                (
                                    <Loader className='size-5 animate-spin' />
                                ) : (
                                    "Login"
                                )}
                        </button>
                        {/* login btn - form field end */}
                    </form>
                    {/* Login Form Field end */}

                    {/* Signup Link */}
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Don't have an account?{" "}
                            <Link to="/signup" className='link link-primary'>
                                Signup
                            </Link>
                        </p>
                    </div>
                    {/* Signup Link end */}
                </div>
            </div>
        </div>
    );
}

export default LoginPage
