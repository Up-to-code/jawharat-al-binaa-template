"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { dictionary, Locale } from "@/lib/i18n";

const HERO_VIDEO_URL = "https://lxlnvkv63w.ufs.sh/f/mB2esVAwkuPDJHQd9Jltbn4X3B0T7va2ZgQMFq8rKPj6AC9N";

export default function Hero({ locale }: { locale: Locale }) {
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [hasVideoError, setHasVideoError] = useState(false);
    const t = dictionary[locale].hero;

    return (
        <section className="relative flex h-[min(76vh,500px)] min-h-[420px] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/hero.png')",
                }}
            >
                {!hasVideoError && (
                    <video
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isVideoReady ? "opacity-100" : "opacity-0"}`}
                        src={HERO_VIDEO_URL}
                        poster="/hero.png"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onCanPlay={() => setIsVideoReady(true)}
                        onLoadedData={() => setIsVideoReady(true)}
                        onError={() => setHasVideoError(true)}
                    />
                )}
                {!isVideoReady && !hasVideoError && (
                    <div className="absolute inset-0 animate-pulse bg-linear-to-r from-[#1B2B5E]/25 via-[#F8F5EF]/10 to-[#C9A84C]/20" />
                )}
                <div className="absolute inset-0 bg-[#0E1A3C]/62" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0E1A3C]/55 to-transparent" />
            </div>

            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-heading text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl"
                >
                    {t.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="max-w-2xl text-base font-medium leading-7 text-white/90 drop-shadow-md sm:text-lg"
                >
                    {t.subtitle}
                </motion.p>
            </div>
        </section>
    );
}
