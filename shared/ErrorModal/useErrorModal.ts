
import { useEffect, useState } from "react";


export const useErrorModal = (message: string, delay = 3000) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!message) return;

        setOpen(true);

        const timer = setTimeout(() => {
            setOpen(false);
        }, delay);

        return () => clearTimeout(timer);
    }, [message, delay]);

    return { open };
};