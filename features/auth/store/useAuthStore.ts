import { create } from 'zustand'

import { persist } from "zustand/middleware";

import { User } from '@/types/User.type';
import { loginRequest, registerUser } from '../api/auth.api';


type Result = {
    success: boolean;
    message: string;
};

export type UserStore = {
    user: User;
    accessToken: string | null;
    isAuthed: boolean;

    login: (email: string, password: string) => Promise<Result>;
    register: (name: string, email: string, password: string) => Promise<Result>;
    logout: () => void;
}

const basicUser: User = {
    id: -1,
    name: "no name",
    email: "",
    role: "USER",

    createdAt : null,
    updatedAt : null,
};

export const useAuthStore = create<UserStore>()(
    persist(
        (set) => ({
            accessToken: null,
            user: basicUser,
            isAuthed: false,

            login: async (email: string, password: string) => {
                try {
                    const data = await loginRequest(email, password);

                    set({
                        accessToken: data.accessToken,
                        user: data.user,
                        isAuthed: true,
                    });

                    return {
                        success: true,
                        message: "Logged in successfully",
                    };
                } catch (e: any) {
                    let message;
                    if(e.response === undefined) message = "Network or server problem"
                    else{
                        if (e.response.status === 409) message = "User with this email exists";
                        if (e.response.status = 400) message = "Wrong email or password";
                        else message = "Something went wrong";
                    }

                    return {
                        success: false,
                        message,
                    };
                }
            },

            register: async (name: string, email: string, password: string) => {
                try {
                    const data = await registerUser(name, email, password);
                    const loginData = await loginRequest(data.email, password);

                    set({
                        accessToken: loginData.accessToken,
                        user: loginData.user,
                        isAuthed: true,
                    });

                    return {
                        success: true,
                        message: "Logged in successfully",
                    };
                } catch (e: any) {
                    let message;
                    if(e.response === undefined) message = "Network or server problem"
                    else{
                        if (e.response.status === 409) message = "User with this email exists";
                        if (e.response.status = 400) message = "Wrong email or password";
                        else message = "Something went wrong";
                    }
                    return {
                        success: false,
                        message,
                    };
                }
            },
            logout: () => set({ user: basicUser, accessToken: null, isAuthed: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);