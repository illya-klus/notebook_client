"use client";

import Link from "next/link";
import { useAuthStore } from "../auth/store/useAuthStore";

const Links = [
    { name: "Home", to: "/" },
    { name: "Graph", to: "/graph" },
];

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-3">

                <div className="text-lg font-semibold tracking-wide text-white">
                    Notebook
                </div>

                <nav className="flex items-center gap-6">
                    {Links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.to}
                            className="text-sm text-zinc-400 transition hover:text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <LoginBtnsArea />
            </div>
        </header>
    );
};

const LoginBtnsArea = () => {
    const user = useAuthStore((state) => state.user);
    const isAuthed = useAuthStore((state) => state.isAuthed);

    if (isAuthed)
        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm text-zinc-200">
                        {user?.name ?? "User"}
                    </p>
                </div>

                <button className="rounded-lg bg-zinc-800 px-3 py-1 text-sm text-white transition hover:bg-zinc-700">
                    Logout
                </button>
            </div>
        );

    return (
        <div className="flex items-center gap-2">
            <Link
                href="/auth/login"
                className="rounded-lg px-3 py-1 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
                Login
            </Link>

            <Link
                href="/auth/register"
                className="rounded-lg bg-white px-3 py-1 text-sm text-black transition hover:bg-zinc-200"
            >
                Register
            </Link>
        </div>
    );
};