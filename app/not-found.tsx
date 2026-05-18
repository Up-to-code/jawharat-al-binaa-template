import SystemState from "@/components/SystemState";

export default function NotFound() {
    return (
        <SystemState
            code="404"
            title="الصفحة غير موجودة"
            message="الرابط الذي تحاول فتحه غير متاح. يمكنك العودة للرئيسية أو التواصل معنا للاستفسار."
        />
    );
}
