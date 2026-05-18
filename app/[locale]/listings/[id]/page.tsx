"use client";

import { useParams, notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Building2, MapPin, Wifi, Dog, Bed, Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PROPERTIES } from "@/data/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import MarkdownText from "@/components/MarkdownText";
import { useEffect, useState } from "react";
import { dictionary, getDirection, isLocale, Locale, localizePath, propertyCopy } from "@/lib/i18n";

const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-100">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-(--color-primary)" />
        </div>
    ),
});

const WHATSAPP_URL = "https://wa.me/966505758216";

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
    }).format(price * 1000);

const latinNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);

export default function ListingDetails() {
    const { id, locale: rawLocale } = useParams<{ id: string; locale: string }>();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [heroImageIndex, setHeroImageIndex] = useState(0);

    if (!isLocale(rawLocale)) {
        notFound();
    }

    const locale: Locale = rawLocale;
    const property = PROPERTIES.find((p) => p.id === id);
    const images = property?.images ?? [];

    useEffect(() => {
        if (images.length < 2 || lightboxIndex !== null) return;

        const interval = window.setInterval(() => {
            setHeroImageIndex((index) => (index + 1) % images.length);
        }, 4200);

        return () => window.clearInterval(interval);
    }, [images.length, lightboxIndex]);

    if (!property) {
        return <div>{dictionary[locale].details.notFound}</div>;
    }

    const t = dictionary[locale];
    const copy = propertyCopy[locale][property.id as keyof typeof propertyCopy[typeof locale]];
    const isArabic = locale === "ar";
    const safeHeroImageIndex = property.images.length > 0 ? heroImageIndex % property.images.length : 0;

    return (
        <main className="min-h-screen bg-(--color-background) text-(--color-foreground)" dir={getDirection(locale)} lang={locale}>
            <Navbar locale={locale} />

            <div className="relative h-[50vh] w-full overflow-hidden md:h-[60vh]">
                <motion.button
                    type="button"
                    layoutId={`image-${property.id}`}
                    className="absolute inset-0 h-full w-full cursor-zoom-in"
                    onClick={() => setLightboxIndex(safeHeroImageIndex)}
                    aria-label={copy.title}
                >
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={property.images[safeHeroImageIndex]}
                            initial={{ opacity: 0, scale: 1.035 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.015 }}
                            transition={{ duration: 1.35, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={property.images[safeHeroImageIndex]}
                                alt={`${copy.title} ${safeHeroImageIndex + 1}`}
                                fill
                                className="object-cover"
                                priority={safeHeroImageIndex === 0}
                            />
                        </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-linear-to-t from-[#0E1A3C]/78 to-[#1B2B5E]/10" />
                </motion.button>

                <Link
                    href={localizePath("/listings", locale)}
                    className={[
                        "absolute top-4 z-10 rounded-full bg-[#F8F5EF]/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-[#F8F5EF]/35",
                        isArabic ? "left-4 md:left-8" : "right-4 md:right-8",
                    ].join(" ")}
                    aria-label={t.listings.title}
                >
                    <X className="h-6 w-6" />
                </Link>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="container mx-auto flex flex-col gap-4"
                    >
                        <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
                            {copy.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/90 md:text-base">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-5 w-5" />
                                <span>{copy.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <BadgeCheck className="h-5 w-5 text-(--color-highlight)" />
                                <span>{t.property.development}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-12 md:grid-cols-3">
                <div className="space-y-8 md:col-span-2">
                    <div className="flex flex-wrap gap-6 border-b border-[#1B2B5E]/10 pb-8 text-[#1A1A1A]/65">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-(--color-primary)" />
                            <span>{latinNumber(property.guests)} {t.details.guests}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bed className="h-5 w-5 text-(--color-primary)" />
                            <span>{latinNumber(property.bedrooms)} {t.details.bedrooms}</span>
                        </div>
                        {property.wifi && (
                            <div className="flex items-center gap-2">
                                <Wifi className="h-5 w-5 text-(--color-primary)" />
                                <span>{t.property.fastWifi}</span>
                            </div>
                        )}
                        {property.petFriendly && (
                            <div className="flex items-center gap-2">
                                <Dog className="h-5 w-5 text-(--color-primary)" />
                                <span>{t.property.petFriendly}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="font-heading mb-4 text-2xl font-bold text-(--color-ink)">{t.details.about}</h2>
                        <MarkdownText content={copy.description} />
                    </div>

                    <div>
                        <h2 className="font-heading mb-4 text-2xl font-bold text-(--color-ink)">{t.details.amenities}</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {copy.amenities.map((amenity) => (
                                <div key={amenity} className="flex items-center gap-3 text-[#1A1A1A]/68">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBF5E6] text-(--color-secondary-dark)">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-heading mb-4 text-2xl font-bold text-(--color-ink)">{t.details.gallery}</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {property.images.map((img, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="relative aspect-4/3 overflow-hidden rounded-xl cursor-zoom-in"
                                    onClick={() => setLightboxIndex(index)}
                                    aria-label={`${copy.title} ${index + 1}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${copy.title} ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform hover:scale-105"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-heading mb-4 text-2xl font-bold text-(--color-ink)">{t.details.location}</h2>
                        <div className="overflow-hidden rounded-xl border border-[#1B2B5E]/12 bg-[#E8EBED]">
                            <div className="h-72 w-full md:h-80">
                                <Map properties={[property]} highlightedId={property.id} simple />
                            </div>
                        </div>
                        <p className="mt-3 flex items-center gap-2 text-sm text-[#1A1A1A]/55">
                            <MapPin className="h-4 w-4 text-(--color-primary)" />
                            <span>{copy.location}</span>
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="sticky top-24 rounded-2xl border border-[#1B2B5E]/12 bg-white p-6 shadow-[0_12px_36px_rgba(27,43,94,0.08)]">
                        <div className="mb-6 flex items-end justify-between">
                            <div>
                                <span className="font-heading text-2xl font-bold text-(--color-primary)">
                                    {t.property.currency} {formatPrice(property.price)}
                                </span>
                                <span className="text-gray-500"> {t.property.night}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <BadgeCheck className="h-4 w-4 text-(--color-highlight)" />
                                <span className="font-bold">{t.footer.legalLabel}</span>
                            </div>
                        </div>

                        <Link
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="block w-full rounded-xl bg-(--color-primary) py-4 text-center font-bold text-[#E8CF8A] shadow-[0_8px_24px_rgba(27,43,94,0.12)] transition-transform hover:scale-[1.02] hover:bg-(--color-primary-dark) active:scale-[0.98]"
                        >
                            {t.details.reserve}
                        </Link>

                        <p className="mt-4 text-center text-xs text-gray-400">
                            {t.details.notCharged}
                        </p>
                    </div>
                </div>
            </div>
            {lightboxIndex !== null && (
                <ImageLightbox
                    images={property.images}
                    initialIndex={lightboxIndex}
                    alt={copy.title}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
            <Footer locale={locale} />
        </main>
    );
}
