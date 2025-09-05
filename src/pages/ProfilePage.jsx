import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, IdCard, Loader, Mail, User } from "lucide-react";

function ProfilePage() {
    const { checkAuth, authUser, isUpdatingProfile, uploadAvatar, deleteAccount, isDeletingAccount } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        const formData = new FormData();

        formData.append("avatar", file);

        await uploadAvatar(formData);
    };

    if (!authUser) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader className="size-5 animate-spin" />
            </div>
        );
    }

    return (
        <div className='h-screen pt-22'>
            <div className='max-w-2xl mx-auto px-4 py-8'>
                <div className='bg-base-300 border-2 border-base-content/50 rounded-xl space-y-8 p-6'>
                    {/* Profile head */}
                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold'>My Profile</h1>
                        <p className='mt-2 text-base-content/70'>Manage your personal information and account settings</p>
                    </div>
                    {/* Profile head end */}

                    {/* Avatar part */}
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='relative'>
                            <img
                                src={selectedImage || authUser?.data?.avatar?.url || "./avatar.png"}
                                alt="Avatar"
                                className='size-32 rounded-full object-cover border-4'
                            />
                            <label
                                htmlFor='avatar-upload'
                                className={`absolute right-0 bottom-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                            >
                                <Camera className="size-6 text-base-200" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-500">
                            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to upload an avatar"}
                        </p>
                    </div>
                    {/* Avatar part end */}

                    {/* Info part */}
                    <div className="space-y-6">
                        <div className="space-y-1.5 py-4 px-3 border-2 border-base-content/50 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-base-content/70 gap-2">
                                    <User className="size-4" />
                                    Username
                                </div>
                                <p className="text-base-content font-semibold pr-3">{authUser?.data?.username}</p>
                            </div>
                        </div>

                        <div className="space-y-1.5 py-4 px-3 border-2 border-base-content/50 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-base-content/70 gap-2">
                                    <Mail className="size-4" />
                                    Email
                                </div>
                                <p className="text-base-content font-semibold pr-3">{authUser?.data?.email}</p>
                            </div>
                        </div>

                        <div className="space-y-1.5 py-4 px-3 border-2 border-base-content/50 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-base-content/70 gap-2">
                                    <IdCard className="size-4" />
                                    Member Since
                                </div>
                                <p className="text-base-content font-semibold pr-3">{authUser?.data?.createdAt?.split("T")[0]}</p>
                            </div>
                        </div>
                    </div>
                    {/* Info part end */}

                    {/* Account Delete part */}
                    <div className="mb-3">
                        <div className="space-y-5 w-full border-2 border-error/70 rounded-xl bg-error/10 py-5 px-3">
                            <div className="space-y-2">
                                <h1 className="text-xl font-semibold text-red-400">Danger Zone</h1>
                                <p className="text-sm text-red-300">These actions are permanent and cannot be undone.</p>
                            </div>
                            <button
                                onClick={deleteAccount}
                                className={`btn w-full btn-error`}
                                disabled={isDeletingAccount}
                            >
                                Delete My Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage
