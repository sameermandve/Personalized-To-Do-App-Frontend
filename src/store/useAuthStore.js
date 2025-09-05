import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create(
    (set) => ({

        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isDeletingAccount: false,
        isCheckingAuth: true,

        checkAuth: async () => {

            try {

                const res = await axiosInstance.get("/users/checkAuth");
                const user = res.data;
                set({ authUser: user });

            } catch (error) {
                console.log("Error in checkAuth: ", error);
                set({ authUser: null });
            } finally {
                set({ isCheckingAuth: false });
            }

        },

        signup: async (data) => {
            set({ isSigningUp: true });

            try {

                const res = await axiosInstance.post("users/register", data);
                set({ authUser: res.data.data });
                toast.success("User registered successfully");

            } catch (error) {
                toast.error(error.res.data.message);
            } finally {
                set({ isSigningUp: false });
            }
        },

        login: async (data) => {
            set({ isLoggingIn: true });

            try {

                const res = await axiosInstance.post("users/login", data);
                set({ authUser: res.data.data });
                toast.success("User logged in successfully");

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isLoggingIn: false });
            }
        },

        logout: async () => {
            try {
                const res = await axiosInstance.post("users/logout");
                set({ authUser: null });
                toast.success("Logged out successfully");
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },

        uploadAvatar: async (data) => {
            set({ isUpdatingProfile: true });

            try {

                const res = await axiosInstance.put("users/upload-avatar", data);
                console.log(res);
                set({ authUser: res.data });
                toast.success("Avatar updated successfully");

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isUpdatingProfile: false });
            }
        },

        deleteAccount: async () => {
            set({ isDeletingAccount: true });

            try {

                const res = await axiosInstance.delete("users/deleteUser");
                set({ authUser: null });
                toast.success("Account deleted successfully");

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isDeletingAccount: false });
            }
        },

    })
);
