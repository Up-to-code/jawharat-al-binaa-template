import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { dictionary, getDirection, isLocale, Locale } from "@/lib/i18n";

const WHATSAPP_URL = "https://wa.me/966505758216";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;

    if (!isLocale(rawLocale)) {
        notFound();
    }

    const locale: Locale = rawLocale;
    const t = dictionary[locale];

    const contactItems = [
        {
            label: t.contact.phone,
            value: t.footer.legalPhone,
            href: `tel:${t.footer.legalPhone.replaceAll(" ", "")}`,
            icon: Phone,
        },
        {
            label: t.contact.email,
            value: t.footer.legalEmail,
            href: `mailto:${t.footer.legalEmail}`,
            icon: Mail,
        },
        {
            label: t.contact.address,
            value: t.footer.legalAddress,
            href: null,
            icon: MapPin,
        },
        {
            label: t.contact.legal,
            value: `${t.footer.crLabel} ${t.footer.crNumber}`,
            href: null,
            icon: ShieldCheck,
        },
    ];

    return (
        <main className="min-h-screen bg-(--color-background) text-(--color-foreground)" dir={getDirection(locale)} lang={locale}>
            <Navbar locale={locale} />

            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <div className="max-w-2xl">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-(--color-secondary-dark)">
                            {t.footer.legalName}
                        </p>
                        <h1 className="font-heading text-4xl font-extrabold text-(--color-primary) md:text-5xl">
                            {t.contact.title}
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-[#1A1A1A]/68">
                            {t.contact.subtitle}
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        {contactItems.map((item) => {
                            const Icon = item.icon;
                            const content = (
                                <div className="flex h-full gap-4 rounded-lg border border-[#1B2B5E]/12 bg-white p-5 transition-colors hover:border-[#C9A84C]/55">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#FBF5E6] text-(--color-secondary-dark)">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <span>
                                        <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
                                            {item.label}
                                        </span>
                                        <span className="mt-1 block font-semibold text-(--color-primary)">
                                            {item.value}
                                        </span>
                                    </span>
                                </div>
                            );

                            return item.href ? (
                                <a key={item.label} href={item.href}>
                                    {content}
                                </a>
                            ) : (
                                <div key={item.label}>{content}</div>
                            );
                        })}
                    </div>

                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 font-bold text-[#E8CF8A] transition-colors hover:bg-(--color-primary-dark)"
                    >
                        <WhatsAppIcon className="h-5 w-5" />
                        {t.contact.whatsapp}
                    </a>
                </div>
            </section>

            <Footer locale={locale} />
        </main>
    );
}
