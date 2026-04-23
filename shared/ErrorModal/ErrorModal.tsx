"use client";


type Props = {
    message: string;
    open: boolean;
};

export const ErrorModal = ({ message, open }: Props) => {
    if (!message || !open) return null;

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                <p>{message}</p>
            </div>
        </div>
    );
};