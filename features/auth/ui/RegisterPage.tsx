"use client";
import { useState } from "react";
import Link from "next/link";
import { useRegister } from "@/features/auth/hooks/useRegister";



export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { handleRegister, loading, errors, serverError } = useRegister();

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                <div className="border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">

                    <div className="text-center space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-semibold">
                            Create account
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Start using your notebook system
                        </p>
                    </div>

                    <div className="space-y-4">

                        <Input value={name} setValue={setName} placeholder="Name" error={errors.name} />
                        <Input value={email} setValue={setEmail} placeholder="Email" error={errors.email} />
                        <Input value={password} setValue={setPassword} placeholder="Password" type="password" error={errors.password} />

                        {serverError && (<p className="text-sm text-red-400 text-center">{serverError}</p>)}

                        <button
                            onClick={() => handleRegister({ name, email, password })}
                            disabled={loading}
                            className="w-full rounded-xl bg-white text-black py-3 font-medium transition hover:bg-zinc-200 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create account"}
                        </button>
                    </div>

                    <p className="text-center text-sm text-zinc-500">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="text-white hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

type InputProps = {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    error?: string;
    type?: string;
};

function Input({
    value,
    setValue,
    placeholder,
    error,
    type = "text",
}: InputProps) {
    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type={type}
                placeholder={placeholder}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-white transition"
            />

            {error && (
                <p className="text-xs text-red-400 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}