import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { ClipboardCheck, Eye, EyeOff, Loader, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function SignupPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!formData.username.trim()) return toast.error("Username is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!emailRegex.test(formData.email)) return toast.error("Enter a valid email");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password length must be greater than 6");

        return true;
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signup(formData);
    };
    
    return (
        <div className="h-screen">
            <div className="flex flex-col items-center justify-center pb-6 pt-25 sm:pb-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo and Signup Head */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div>
                                <ClipboardCheck className="size-12 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold mt-2">Create your account</h1>
                            <p className="text-base-content/60">Start organizing your life, one task at a time</p>
                        </div>
                    </div>
                    {/* Logo and Signup Head end */}

                    {/* Form Field */}
                    <form onSubmit={handleFormSubmit} className="space-y-8 px-3" noValidate>
                        {/* username -> input field */}
                        <div className="flex flex-col">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3 z-10">
                                    <User className="size-5 text-base-content/70" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered font-medium pl-12 w-full focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200`}
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                        </div>
                        {/* username -> input field end */}

                        {/* email -> input field */}
                        <div className="flex flex-col">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3 z-10">
                                    <Mail className="size-5 text-base-content/70" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered font-medium pl-12 w-full focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200`}
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>
                        {/* email -> input field end */}

                        {/* pwd -> input field */}
                        <div className="flex flex-col">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3 z-10">
                                    <Lock className="size-5 text-base-content/70" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password" }
                                    className={`input input-bordered font-medium pl-12 w-full focus:outline-none focus:ring-2 focus:ring-base transition duration-0 focus:duration-200`}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 z-10"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ?
                                    (
                                        <EyeOff className="size-5 text-base-content/70" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/70" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* pwd -> input field end */}

                        {/* Submit -> btn */}
                        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                            {isSigningUp ? 
                            (
                                <Loader className="size-5 animate-spin" />
                            ): (
                                "Create Account"
                            )}
                        </button>
                        {/* Submit -> btn end */}
                    </form>
                    {/* Form Field end */}

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Login
                            </Link>
                        </p>
                    </div>
                    {/* Login Link end */}
                </div>
            </div>
        </div>
    );
}

export default SignupPage