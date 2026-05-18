export default function Loading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-(--color-background) px-4 text-center text-(--color-foreground)" dir="rtl" lang="ar">
            <div>
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-[#C9A84C]/35 border-t-(--color-primary)" />
                <p className="mt-4 font-semibold text-(--color-primary)">جاري تحميل الصفحة...</p>
            </div>
        </main>
    );
}
