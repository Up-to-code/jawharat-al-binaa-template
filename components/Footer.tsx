import Link from "next/link";
import Image from "next/image";
import { Globe2, Mail, Moon, Phone } from "lucide-react";
import { dictionary, Locale, localizePath } from "@/lib/i18n";

const SAUDI_BUSINESS_CENTER_LOGO =
    "/شعار المركز السعودي للأعمال - Saudi Business Center Logo - PNG - SVG.svg";

export default function Footer({ locale }: { locale: Locale }) {
    const t = dictionary[locale];
    const nextLocale = locale === "en" ? "ar" : "en";
    const socialLinks = ["TikTok", "Snap", "YouTube", "Instagram", "X", "in", "f"];
    const isArabic = locale === "ar";

    return (
        <footer className="rounded-t-2xl border-t border-[#1B2B5E]/10 bg-[#F8F5EF]">
            <div className="container mx-auto px-4 py-8 md:px-6">
                <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
                    <div className="flex flex-wrap items-center gap-4">
                        <Link href={localizePath("/", locale)} className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt={t.footer.legalName}
                                width={50}
                                height={50}
                                className="h-[50px] w-[50px] object-contain"
                            />
                            <span className="font-heading text-lg font-extrabold text-(--color-ink)">
                                {t.footer.legalName}
                            </span>
                        </Link>

                        <div className="flex items-center gap-2 rounded-md border border-[#1B2B5E]/15 bg-white/45 px-3 py-2 text-xs font-semibold text-[#1A1A1A]/70">
                            <Globe2 className="h-4 w-4 text-(--color-secondary-dark)" />
                            <span>{t.footer.crLabel}: {t.footer.crNumber}</span>
                        </div>
                    </div>

                    <Link
                        href={localizePath("/", nextLocale)}
                        className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-(--color-ink) transition-colors hover:bg-[#1B2B5E]/6"
                    >
                        <Moon className="h-4 w-4" />
                        {t.nav.switchLanguage}
                    </Link>

                    <div className="flex flex-wrap items-center justify-start gap-3 md:justify-end">
                        {socialLinks.map((label) => (
                            <a
                                key={label}
                                href="#"
                                aria-label={label}
                                className="flex h-8 min-w-8 items-center justify-center rounded-full text-sm font-bold text-[#1A1A1A]/38 transition-colors hover:bg-[#FBF5E6] hover:text-(--color-primary)"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                <div
                    className={[
                        "mt-6 flex w-full flex-col gap-4 border-t border-[#1B2B5E]/10 pt-5 sm:flex-row sm:items-center",
                        "sm:justify-start",
                    ].join(" ")}
                >
                    <Image
                        src={SAUDI_BUSINESS_CENTER_LOGO}
                        alt="Saudi Business Center"
                        width={220}
                        height={140}
                        className="h-[100px] w-auto shrink-0 object-contain"
                    />
                    <div
                        className={[
                            "max-w-2xl rounded-lg border border-[#C9A84C]/35 bg-[#FBF5E6]/70 px-4 py-3",
                            isArabic ? "text-right" : "text-left",
                        ].join(" ")}
                    >
                        <p className="text-sm font-extrabold text-(--color-ink)">{t.footer.legalLabel}</p>
                        <p className="mt-1 text-xs font-semibold text-[#1B2B5E]/70">
                            {t.footer.crLabel} {t.footer.crNumber} · {t.footer.unifiedLabel} {t.footer.unifiedNumber}
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid gap-3 border-t border-[#1B2B5E]/10 pt-5 text-center text-sm text-[#1A1A1A]/55 md:grid-cols-[1fr_auto_1fr] md:items-center md:text-start">
                    <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                        <a href={`mailto:${t.footer.legalEmail}`} className="inline-flex items-center gap-2 hover:text-(--color-primary)">
                            <Mail className="h-4 w-4" />
                            {t.footer.legalEmail}
                        </a>
                        <a href={`tel:${t.footer.legalPhone.replaceAll(" ", "")}`} className="inline-flex items-center gap-2 hover:text-(--color-primary)">
                            <Phone className="h-4 w-4" />
                            {t.footer.legalPhone}
                        </a>
                    </div>

                    <div className="text-xs leading-6 text-[#1A1A1A]/45 md:text-center">
                        <p>{t.footer.copyright}</p>
                    </div>

                    <div className="text-xs leading-6 text-[#1A1A1A]/45 md:text-end">
                        <p>{t.footer.legalAddress}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
