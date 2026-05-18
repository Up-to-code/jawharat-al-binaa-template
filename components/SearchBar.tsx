"use client";


import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle } from "lucide-react";
import clsx from "clsx";
import GuestCounter from "./GuestCounter";

// Validation Schema
const searchSchema = z
    .object({
        location: z.string().min(1, "Where are you going?"),
        checkIn: z.string().min(1, "Add dates"),
        checkOut: z.string().min(1, "Add dates"),
        guests: z.number().min(1).max(10),
    })
    .refine(
        (data) => {
            if (!data.checkIn || !data.checkOut) return true;
            return new Date(data.checkOut) > new Date(data.checkIn);
        },
        {
            message: "Check-out must be after Check-in",
            path: ["checkOut"],
        }
    );

type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchBar() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchFormData>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            location: "",
            guests: 2,
        },
    });

    const onSubmit = (data: SearchFormData) => {
        console.log("Search Data:", data);
        // Here you would typically navigate to the listings page with query params
        // router.push(`/listings?location=${data.location}&checkIn=${data.checkIn}...`);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-4xl flex-col gap-4 rounded-3xl border border-[#1B2B5E]/10 bg-[#F8F5EF]/95 p-4 shadow-[0_14px_40px_rgba(27,43,94,0.10)] md:flex-row"
        >
            {/* Location */}
            <div className="relative flex-1">
                <div
                    className={clsx(
                        "flex h-full flex-col justify-center rounded-xl border px-4 py-2 transition-colors hover:border-(--color-primary)",
                        errors.location ? "border-red-300 bg-red-50" : "border-[#1B2B5E]/12"
                    )}
                >
                    <label className="text-xs font-bold text-gray-800">LOCATION</label>
                    <input
                        {...register("location")}
                        placeholder="Where are you going?"
                        className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
                    />
                </div>
                <AnimatePresence>
                    {errors.location && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute -bottom-6 left-0 flex items-center gap-1 text-xs font-medium text-red-500"
                        >
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.location.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Dates */}
            <div className="relative flex-[1.5] flex gap-2">
                {/* Check-in */}
                <div
                    className={clsx(
                        "flex flex-1 flex-col justify-center rounded-xl border px-4 py-2 transition-colors hover:border-(--color-primary)",
                        errors.checkIn ? "border-red-300 bg-red-50" : "border-gray-200"
                    )}
                >
                    <label className="text-xs font-bold text-gray-800">CHECK-IN</label>
                    <input
                        type="date"
                        {...register("checkIn")}
                        className="w-full bg-transparent text-sm text-gray-600 outline-none"
                    />
                </div>

                {/* Check-out */}
                <div
                    className={clsx(
                        "flex flex-1 flex-col justify-center rounded-xl border px-4 py-2 transition-colors hover:border-(--color-primary)",
                        errors.checkOut ? "border-red-300 bg-red-50" : "border-gray-200"
                    )}
                >
                    <label className="text-xs font-bold text-gray-800">CHECK-OUT</label>
                    <input
                        type="date"
                        {...register("checkOut")}
                        className="w-full bg-transparent text-sm text-gray-600 outline-none"
                    />
                </div>

                <AnimatePresence>
                    {(errors.checkIn || errors.checkOut) && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute -bottom-6 left-0 flex items-center gap-1 text-xs font-medium text-red-500"
                        >
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.checkOut?.message || "Add dates"}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Guests */}
            <div className="relative flex-1">
                <Controller
                    name="guests"
                    control={control}
                    render={({ field }) => (
                        <GuestCounter
                            value={field.value}
                            onChange={field.onChange}
                            max={6}
                        />
                    )}
                />
            </div>

            {/* Search Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex aspect-square h-full items-center justify-center rounded-2xl bg-(--color-primary) text-[#E8CF8A] shadow-[0_8px_24px_rgba(27,43,94,0.12)] transition-colors hover:bg-(--color-primary-dark) md:h-auto md:w-auto md:px-6"
            >
                <Search className="h-6 w-6" />
            </motion.button>
        </form>
    );
}
