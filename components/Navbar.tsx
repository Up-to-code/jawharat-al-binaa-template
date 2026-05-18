"use client";

import Link from "next/link";
import Image from "next/image";
import { Languages, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { dictionary, Locale, localizePath } from "@/lib/i18n";
import WhatsAppIcon from "./WhatsAppIcon";

const BRAND_NAME = "جوهرة البناء العقارية";
const BRAND_NAME_EN = "Jawharat Al-Binaa Real Estate";
const WHATSAPP_URL = "https://wa.me/966505758216";

export default function Navbar({ locale }: { locale: Locale }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = dictionary[locale].nav;
    const nextLocale = locale === "en" ? "ar" : "en";

    const links = [
        { href: "/", label: t.home },
        { href: "/listings", label: t.listings },
        { href: "/contact", label: t.contact },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-[#1B2B5E]/10 bg-[#F8F5EF]/88 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href={localizePath("/", locale)} className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt={locale === "en" ? BRAND_NAME_EN : BRAND_NAME}
                        width={42}
                        height={42}
                        className="h-10 w-10 object-contain"
                        priority
                    />
                    <span className="font-heading text-lg font-extrabold tracking-tight text-(--color-foreground) md:text-xl">
                        {locale === "en" ? BRAND_NAME_EN : BRAND_NAME}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden gap-6 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={localizePath(link.href, locale)}
                            className="text-sm font-medium text-[#1A1A1A]/70 transition-colors hover:text-(--color-primary)"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href={localizePath(pathname, nextLocale)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#1B2B5E]/15 px-3 py-2 text-sm font-medium text-[#1A1A1A]/70 transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
                    >
                        <Languages className="h-4 w-4" />
                        {t.switchLanguage}
                    </Link>

                    <Link
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="hidden items-center gap-2 rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-[#E8CF8A] transition-colors hover:bg-(--color-primary-dark) md:inline-flex"
                    >
                        <WhatsAppIcon className="h-4 w-4" />
                        {t.bookNow}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-(--color-primary)" />
                        ) : (
                            <Menu className="h-6 w-6 text-(--color-primary)" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-[#1B2B5E]/10 bg-[#F8F5EF] md:hidden"
                    >
                        <div className="flex flex-col space-y-4 p-4">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={localizePath(link.href, locale)}
                                    className="text-sm font-medium text-[#1A1A1A]/70 hover:text-(--color-primary)"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-primary) px-4 py-2 text-center text-sm font-semibold text-[#E8CF8A] hover:bg-(--color-primary-dark)"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <WhatsAppIcon className="h-4 w-4" />
                                {t.bookNow}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
