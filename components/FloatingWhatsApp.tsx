import WhatsAppIcon from "./WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/966505758216";

export default function FloatingWhatsApp() {
    return (
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_rgba(37,211,102,0.28)] transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/25"
        >
            <WhatsAppIcon className="h-8 w-8" />
        </a>
    );
}
