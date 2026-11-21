import { brand } from "@/config/brand";
import { getService, services } from "@/content/services";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `${brand.name} service`;
export const size = ogSize;
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({
    eyebrow: service ? `${service.stage} · Service` : "Service",
    title: service?.name ?? brand.name,
    subtitle: service?.summary ?? brand.positioning,
  });
}
