"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, CheckCircle, AlertCircle } from "lucide-react";
import clsx from "clsx";
import { dictionary, Locale } from "@/lib/i18n";

type BookingErrorMessages = Record<keyof typeof dictionary.en.booking.errors, string>;

const createBookingSchema = (messages: BookingErrorMessages) =>
    z
        .object({
            checkIn: z.string().min(1, messages.checkIn),
            checkOut: z.string().min(1, messages.checkOut),
            guests: z
                .number()
                .min(1, messages.minGuests)
                .max(4, messages.maxGuests),
        })
        .refine((data) => {
            if (!data.checkIn || !data.checkOut) return true;
            return new Date(data.checkOut) > new Date(data.checkIn);
        }, {
            message: messages.dateOrder,
            path: ["checkOut"],
        });

type BookingFormData = z.infer<ReturnType<typeof createBookingSchema>>;

export default function BookingForm({ locale }: { locale: Locale }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const t = dictionary[locale].booking;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BookingFormData>({
        resolver: zodResolver(createBookingSchema(t.errors)),
        defaultValues: {
            guests: 1,
        },
    });

    const onSubmit = async (data: BookingFormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Booking Data:", data);
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-[#1B2B5E]/12 bg-white p-8 shadow-[0_12px_36px_rgba(27,43,94,0.08)]">
            <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-(--color-foreground)">
                    {t.formTitle}
                </h2>
                <p className="text-gray-500">{t.formSubtitle}</p>
            </div>

            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                    >
                        <div className="mb-4 rounded-full bg-[#FBF5E6] p-4">
                            <CheckCircle className="h-12 w-12 text-(--color-primary)" />
                        </div>
                        <h3 className="text-xl font-bold text-(--color-ink)">{t.confirmed}</h3>
                        <p className="mt-2 text-gray-600">
                            {t.emailSent}
                        </p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="mt-6 text-sm font-medium text-(--color-primary) hover:underline"
                        >
                            {t.bookAnother}
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Check-in Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {t.checkIn}
                            </label>
                            <div className="relative">
                                <Calendar className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="date"
                                    {...register("checkIn")}
                                    className={clsx(
                                        "w-full rounded-xl border bg-[#F8F5EF] py-3 pl-10 pr-4 text-(--color-ink) outline-none transition-all focus:bg-white focus:ring-2",
                                        errors.checkIn
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-200 focus:border-(--color-primary) focus:ring-primary/20"
                                    )}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.checkIn && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-1 text-xs text-red-500"
                                    >
                                        <AlertCircle className="h-3 w-3" />
                                        <span>{errors.checkIn.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Check-out Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {t.checkOut}
                            </label>
                            <div className="relative">
                                <Calendar className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="date"
                                    {...register("checkOut")}
                                    className={clsx(
                                        "w-full rounded-xl border bg-[#F8F5EF] py-3 pl-10 pr-4 text-(--color-ink) outline-none transition-all focus:bg-white focus:ring-2",
                                        errors.checkOut
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-200 focus:border-(--color-primary) focus:ring-primary/20"
                                    )}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.checkOut && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-1 text-xs text-red-500"
                                    >
                                        <AlertCircle className="h-3 w-3" />
                                        <span>{errors.checkOut.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Guests */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {t.guests}
                            </label>
                            <div className="relative">
                                <Users className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="number"
                                    {...register("guests", { valueAsNumber: true })}
                                    className={clsx(
                                        "w-full rounded-xl border bg-[#F8F5EF] py-3 pl-10 pr-4 text-(--color-ink) outline-none transition-all focus:bg-white focus:ring-2",
                                        errors.guests
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-200 focus:border-(--color-primary) focus:ring-primary/20"
                                    )}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.guests && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-1 text-xs text-red-500"
                                    >
                                        <AlertCircle className="h-3 w-3" />
                                        <span>{errors.guests.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-(--color-primary) py-4 font-bold text-[#E8CF8A] shadow-[0_8px_24px_rgba(27,43,94,0.12)] transition-transform hover:scale-[1.02] hover:bg-(--color-primary-dark) active:scale-[0.98]"
                        >
                            {t.confirm}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
