"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
    return (
        <html lang="ar" dir="rtl">
            <body>
                <main className="flex min-h-screen items-center justify-center bg-[#F8F5EF] px-4 text-center text-[#1A1A1A]">
                    <section className="w-full max-w-xl rounded-xl border border-[#1B2B5E]/12 bg-white p-8 shadow-[0_12px_36px_rgba(27,43,94,0.08)]">
                        <p className="text-6xl font-extrabold text-[#9E7E2A]">500</p>
                        <h1 className="mt-4 text-3xl font-extrabold text-[#1B2B5E]">
                            تعذر تشغيل الصفحة
                        </h1>
                        <p className="mx-auto mt-3 max-w-md leading-7 text-[#1A1A1A]/65">
                            حدث خطأ عام. حاول تحديث الصفحة أو الرجوع لاحقا.
                        </p>
                        <button
                            onClick={reset}
                            className="mt-8 inline-flex rounded-full bg-[#1B2B5E] px-6 py-3 font-bold text-[#E8CF8A]"
                        >
                            إعادة المحاولة
                        </button>
                    </section>
                </main>
            </body>
        </html>
    );
}
