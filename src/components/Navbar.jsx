import { ClipboardCheck, LogOut, Plus, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const Navbar = () => {

    const { logout, authUser } = useAuthStore();

    return (
        <header className="bg-base-300 border-b-2 border-base-content/50 w-full fixed z-40 top-0 backdrop-blur-lg">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    {/* Left part */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="flex items-center justify-center">
                                <ClipboardCheck className="size-6 text-primary" />
                            </div>
                            <h1 className="text-xl text-primary font-bold">TaskMaster</h1>
                        </Link>
                    </div>
                    {/* Left part end */}

                    {/* Right part */}
                    <div className="flex items-center gap-2">
                        {authUser && (
                            <>
                                <Link to={"/profile"} className={`btn btn-sm gap-2 transition-colors`} >
                                    <User className="size-4" />
                                    <span className="hidden sm:inline" >Profile</span>
                                </Link>

                                <button className="flex gap-2 items-center cursor-pointer" onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                    {/* Right part end */}
                </div>
            </div>
        </header>
    );

}