"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { createloginUserSchema } from "@/validation/login.validation";

type LoginErrors = {
    email?: string;
    password?: string;
};

export const useLogin = () => {
    const router = useRouter();
    const login = useAuthStore((s) => s.login);

    const [errors, setErrors] = useState<LoginErrors>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);



    const handleLogin = async (email: string, password: string) => {
        const result = createloginUserSchema.safeParse({
            email,
            password,
        });

        if (!result.success) {
            const fieldErrors: LoginErrors = {};

            result.error.issues.forEach((err) => {
                const field = err.path[0] as keyof LoginErrors;
                if (field) fieldErrors[field] = err.message;
            });

            setErrors(fieldErrors);
            setServerError(null);
            return;
        }

        setErrors({});
        setServerError(null);
        setLoading(true);

        try {
            const res = await login(email, password);

            if (!res.success) {
                setServerError(res.message);
                return;
            }

            router.push("/");
        } finally {
            setLoading(false);
        }
    };

    return {
        handleLogin,
        errors,
        serverError,
        loading,
    };
};