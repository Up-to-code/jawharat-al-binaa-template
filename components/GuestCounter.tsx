"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Users } from "lucide-react";
import clsx from "clsx";

interface GuestCounterProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export default function GuestCounter({
    value,
    onChange,
    min = 1,
    max = 10,
}: GuestCounterProps) {
    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent form submission
        if (value < max) onChange(value + 1);
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent form submission
        if (value > min) onChange(value - 1);
    };

    return (
        <div className="flex items-center gap-3 rounded-xl border border-[#1B2B5E]/12 bg-white px-4 py-2 shadow-[0_2px_10px_rgba(27,43,94,0.05)] transition-colors hover:border-[var(--color-primary)]">
            <Users className="h-5 w-5 text-gray-400" />
            <div className="flex flex-1 flex-col">
                <span className="text-xs font-medium text-gray-500">Guests</span>
                <span className="font-bold text-(--color-ink)">
                    {value} {value === 1 ? "Guest" : "Guests"}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrement}
                    disabled={value <= min}
                    className={clsx(
                        "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                        value <= min
                            ? "cursor-not-allowed border-gray-100 text-gray-300"
                            : "border-gray-200 text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    )}
                >
                    <Minus className="h-4 w-4" />
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrement}
                    disabled={value >= max}
                    className={clsx(
                        "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                        value >= max
                            ? "cursor-not-allowed border-gray-100 text-gray-300"
                            : "border-gray-200 text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    )}
                >
                    <Plus className="h-4 w-4" />
                </motion.button>
            </div>
        </div>
    );
}
