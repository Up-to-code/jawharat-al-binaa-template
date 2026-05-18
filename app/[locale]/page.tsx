import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { PROPERTIES } from "@/data/properties";
import { dictionary, getDirection, isLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const t = dictionary[locale].home;

  return (
    <main className="min-h-screen bg-(--color-background) font-sans text-(--color-foreground)" dir={getDirection(locale)} lang={locale}>
      <Navbar locale={locale} />
      <Hero locale={locale} />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-(--color-foreground) md:text-4xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#1A1A1A]/65">
            {t.subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} locale={locale} />
          ))}
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}
