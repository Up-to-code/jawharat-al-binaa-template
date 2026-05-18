"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-(--color-background) px-4 text-center text-(--color-foreground)" dir="rtl" lang="ar">
            <section className="w-full max-w-xl rounded-xl border border-[#1B2B5E]/12 bg-white p-8 shadow-[0_12px_36px_rgba(27,43,94,0.08)]">
                <p className="font-heading text-6xl font-extrabold text-(--color-secondary-dark)">500</p>
                <h1 className="mt-4 font-heading text-3xl font-extrabold text-(--color-primary)">
                    حدث خطأ غير متوقع
                </h1>
                <p className="mx-auto mt-3 max-w-md leading-7 text-[#1A1A1A]/65">
                    لم نتمكن من تحميل الصفحة بشكل صحيح. حاول مرة أخرى أو تواصل معنا للمساعدة.
                </p>
                <button
                    onClick={reset}
                    className="mt-8 inline-flex rounded-full bg-(--color-primary) px-6 py-3 font-bold text-[#E8CF8A] transition-colors hover:bg-(--color-primary-dark)"
                >
                    إعادة المحاولة
                </button>
            </section>
        </main>
    );
}
