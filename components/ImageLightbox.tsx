"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type ImageLightboxProps = {
    images: string[];
    initialIndex: number;
    alt: string;
    onClose: () => void;
};

export default function ImageLightbox({ images, initialIndex, alt, onClose }: ImageLightboxProps) {
    const safeInitialIndex = images.length > 0 ? initialIndex % images.length : 0;
    const [index, setIndex] = useState(safeInitialIndex);
    const safeIndex = images.length > 0 ? index % images.length : 0;
    const currentImage = images[safeIndex];
    const hasManyImages = images.length > 1;

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + images.length) % images.length);
            if (event.key === "ArrowRight") setIndex((value) => (value + 1) % images.length);
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [images.length, onClose]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E1A3C]/92 px-4 py-20 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    onClose();
                }}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5EF]/14 text-[#F8F5EF] transition-colors hover:bg-[#F8F5EF]/24"
                aria-label="Close image"
            >
                <X className="h-5 w-5" />
            </button>

            {hasManyImages && (
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        setIndex((value) => (value - 1 + images.length) % images.length);
                    }}
                    className="absolute left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#F8F5EF]/14 text-[#F8F5EF] transition-colors hover:bg-[#F8F5EF]/24 sm:flex"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
            )}

            <div
                className="relative h-full w-full max-w-6xl cursor-zoom-out"
                onClick={(event) => event.stopPropagation()}
            >
                <Image
                    src={currentImage}
                    alt={`${alt} ${safeIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                />
            </div>

            {hasManyImages && (
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        setIndex((value) => (value + 1) % images.length);
                    }}
                    className="absolute right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#F8F5EF]/14 text-[#F8F5EF] transition-colors hover:bg-[#F8F5EF]/24 sm:flex"
                    aria-label="Next image"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            )}

            <div
                dir="ltr"
                className="absolute inset-x-4 bottom-5 z-20 flex items-center justify-center gap-3 sm:inset-x-auto"
                onClick={(event) => event.stopPropagation()}
            >
                {hasManyImages && (
                    <button
                        type="button"
                        onClick={() => setIndex((value) => (value - 1 + images.length) % images.length)}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5EF]/14 text-[#F8F5EF] transition-colors hover:bg-[#F8F5EF]/24 sm:hidden"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                )}
                <div dir="ltr" className="rounded-full bg-[#F8F5EF]/14 px-4 py-2 text-sm font-semibold text-[#F8F5EF]">
                    {safeIndex + 1} / {images.length}
                </div>
                {hasManyImages && (
                    <button
                        type="button"
                        onClick={() => setIndex((value) => (value + 1) % images.length)}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5EF]/14 text-[#F8F5EF] transition-colors hover:bg-[#F8F5EF]/24 sm:hidden"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
