"use client"


import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { createRegisterUserSchema } from "@/validation/register.input";
import { useRouter } from "next/navigation";

type FormErrors = {
    name?: string;
    email?: string;
    password?: string;
};



export const useRegister = () => {
    const router = useRouter();
    const register = useAuthStore((s) => s.register);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [serverError, setServerError] = useState<string | null>(null);

    const handleRegister = async (data: {
        name: string;
        email: string;
        password: string;
    }) => {
        const result = createRegisterUserSchema.safeParse(data);

        if (!result.success) {
            const fieldErrors: Partial<FormErrors> = {};

            result.error.issues.forEach((err) => {
                const field = err.path[0] as keyof FormErrors;
                if (field) fieldErrors[field] = err.message;
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setServerError(null);
        setLoading(true);

        try {
            const res = await register(data.name, data.email, data.password);

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
        handleRegister,
        loading,
        errors,
        serverError,
    };
};