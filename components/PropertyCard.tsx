"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { BadgeCheck, BedDouble, Building2, ChevronLeft, ChevronRight, MapPin, MessageCircle, PawPrint, Wifi } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { dictionary, Locale, localizePath, propertyCopy } from "@/lib/i18n";

const WHATSAPP_URL = "https://wa.me/966505758216";

interface PropertyProps {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    images: string[];
    guests: number;
    bedrooms: number;
    wifi: boolean;
    petFriendly: boolean;
}

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
    }).format(price * 1000);

const latinNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

export default function PropertyCard({ property, locale }: { property: PropertyProps; locale: Locale }) {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const t = dictionary[locale].property;
    const copy = propertyCopy[locale][property.id as keyof typeof propertyCopy[typeof locale]];

    // We only have 3 images per property in mock data, but let's be safe
    const imageIndex = Math.abs(page % property.images.length);

    const paginate = useCallback((newDirection: number) => {
        setPage((prev) => [prev[0] + newDirection, newDirection]);
    }, []);

    // Auto-scroll carousel on hover
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered) {
            interval = setInterval(() => {
                paginate(1);
            }, 3000); // Change image every 3 seconds
        }
        return () => clearInterval(interval);
    }, [isHovered, page, paginate]); // Re-run on page change to reset timer

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
        }
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <article className="group relative flex min-h-full flex-col overflow-hidden rounded-lg border border-[#1B2B5E]/12 bg-white shadow-[0_6px_24px_rgba(27,43,94,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A84C]/45 hover:shadow-[0_10px_32px_rgba(27,43,94,0.08)]">
            <div
                className="relative aspect-[1.18] w-full overflow-hidden bg-gray-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        layoutId={`image-${property.id}`}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "tween", ease: "easeInOut", duration: 0.8 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 cursor-pointer active:cursor-grabbing transform-gpu"
                        onClick={() => router.push(localizePath(`/listings/${property.id}`, locale))}
                    >
                        <Image
                            src={property.images[imageIndex]}
                            alt={copy.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            draggable={false}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            priority={imageIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/45 to-transparent" />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(-1);
                        }}
                        className="pointer-events-auto rounded-full bg-[#F8F5EF]/92 p-2 text-(--color-ink) shadow-[0_4px_16px_rgba(27,43,94,0.10)] backdrop-blur-sm transition-transform hover:scale-105 hover:bg-[#F8F5EF]"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(1);
                        }}
                        className="pointer-events-auto rounded-full bg-[#F8F5EF]/92 p-2 text-(--color-ink) shadow-[0_4px_16px_rgba(27,43,94,0.10)] backdrop-blur-sm transition-transform hover:scale-105 hover:bg-[#F8F5EF]"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#F8F5EF]/92 px-2.5 py-1 text-sm font-semibold text-(--color-ink) shadow-[0_4px_16px_rgba(27,43,94,0.10)] backdrop-blur-md">
                    <BadgeCheck className="h-3.5 w-3.5 text-(--color-secondary-dark)" />
                    <span>{t.development}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 text-white">
                    <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium drop-shadow-sm">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">{copy.location}</span>
                    </div>
                    <div className="flex gap-1.5">
                        {property.images.slice(0, 4).map((_, index) => (
                            <span
                                key={index}
                                className={`h-1.5 rounded-full transition-all ${index === imageIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="min-h-[4.25rem]">
                    <h3 className="font-heading text-xl font-bold leading-tight text-(--color-foreground)">
                        {copy.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-[#1A1A1A]/65">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FBF5E6] px-2.5 py-1">
                            <Building2 className="h-3.5 w-3.5 text-(--color-secondary-dark)" />
                            {latinNumber(property.guests)} {property.guests === 1 ? t.guest : t.guests}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FBF5E6] px-2.5 py-1">
                            <BedDouble className="h-3.5 w-3.5 text-(--color-secondary-dark)" />
                            {latinNumber(property.bedrooms)} {property.bedrooms === 1 ? t.bedroom : t.bedrooms}
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex min-h-7 flex-wrap gap-2 border-t border-[#1B2B5E]/10 pt-4">
                    {property.wifi && (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#E8EBED] px-2.5 py-1 text-xs font-semibold text-(--color-primary)">
                            <Wifi className="h-3.5 w-3.5" />
                            {t.fastWifi}
                        </span>
                    )}
                    {property.petFriendly && (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FBF5E6] px-2.5 py-1 text-xs font-semibold text-(--color-secondary-dark)">
                            <PawPrint className="h-3.5 w-3.5" />
                            {t.petFriendly}
                        </span>
                    )}
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                    <div className="relative">
                        <span className="block text-xs font-semibold text-[#1A1A1A]/50">{t.startingFrom}</span>
                        <span className="font-heading text-2xl font-extrabold text-(--color-primary)">
                            {t.currency} {formatPrice(property.price)}
                        </span>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-(--color-primary) px-4 py-2 text-sm font-semibold text-[#E8CF8A] transition-colors hover:bg-(--color-primary-dark)"
                        >
                            <MessageCircle className="h-4 w-4" />
                            {t.contactWhatsApp}
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
