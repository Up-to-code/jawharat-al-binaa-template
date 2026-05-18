"use client";

import { notFound, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { PROPERTIES } from "@/data/properties";
import { dictionary, getDirection, isLocale, Locale } from "@/lib/i18n";

export default function ListingsPage() {
    const params = useParams<{ locale: string }>();

    if (!isLocale(params.locale)) {
        notFound();
    }

    const locale: Locale = params.locale;
    const t = dictionary[locale].listings;

    return (
        <main className="min-h-screen bg-(--color-background) text-(--color-foreground)" dir={getDirection(locale)} lang={locale}>
            <Navbar locale={locale} />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="font-heading text-3xl font-bold text-(--color-foreground)">
                            {t.title}
                        </h1>
                        <p className="text-[#1A1A1A]/55">
                            {PROPERTIES.length} {t.found}
                        </p>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <button className="whitespace-nowrap rounded-full border border-[#1B2B5E]/15 bg-white/65 px-4 py-2 text-sm font-medium text-[#1A1A1A]/70 hover:border-[#C9A84C]/55 hover:bg-[#FBF5E6]">
                            {t.priceAny}
                        </button>
                        <button className="whitespace-nowrap rounded-full border border-[#1B2B5E]/15 bg-white/65 px-4 py-2 text-sm font-medium text-[#1A1A1A]/70 hover:border-[#C9A84C]/55 hover:bg-[#FBF5E6]">
                            {t.guestsAny}
                        </button>
                        <button className="whitespace-nowrap rounded-full border border-[#1B2B5E]/15 bg-white/65 px-4 py-2 text-sm font-medium text-[#1A1A1A]/70 hover:border-[#C9A84C]/55 hover:bg-[#FBF5E6]">
                            {t.typeEntire}
                        </button>
                        <button className="whitespace-nowrap rounded-full border border-[#1B2B5E]/15 bg-white/65 px-4 py-2 text-sm font-medium text-[#1A1A1A]/70 hover:border-[#C9A84C]/55 hover:bg-[#FBF5E6]">
                            {t.moreFilters}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {PROPERTIES.map((property) => (
                        <PropertyCard key={property.id} property={property} locale={locale} />
                    ))}
                </div>
            </div>
            <Footer locale={locale} />
        </main>
    );
}
