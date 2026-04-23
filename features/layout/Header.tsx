"use client";

import Link from "next/link";
import { useAuthStore } from "../auth/store/useAuthStore";
import { usePathname } from "next/navigation";

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
                            className={"text-sm text-zinc-400 transition hover:text-white"}

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
    const pathname = usePathname();

    const user = useAuthStore((state) => state.user);
    const isAuthed = useAuthStore((state) => state.isAuthed);
    const { logout } = useAuthStore();

    if (isAuthed)
        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm text-zinc-200">
                        {user?.name ?? "User"}
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="rounded-lg bg-zinc-800 px-3 py-1 text-sm text-white transition hover:bg-zinc-700"
                >
                    Logout
                </button>
            </div>
        );

    const isLogin = pathname === "/auth/login";
    const isRegister = pathname === "/auth/register";

    return (
        <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900 p-1">

            <Link
                href="/auth/login"
                className={`px-3 py-1 text-sm rounded-lg transition ${isLogin
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                    }`}
            >
                Login
            </Link>

            <Link
                href="/auth/register"
                className={`px-3 py-1 text-sm rounded-lg transition ${isRegister
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                    }`}
            >
                Register
            </Link>

        </div>
    );
};