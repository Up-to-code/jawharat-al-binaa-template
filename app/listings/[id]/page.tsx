import { redirect } from "next/navigation";

export default async function ListingDetailsRedirect({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    redirect(`/ar/listings/${id}`);
}
