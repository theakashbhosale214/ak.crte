import { brand } from "@/config/brand";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `${brand.name} — ${brand.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Websites · Software · SEO · AI Automation",
    title: "Your Digital Presence. Engineered to Grow.",
    subtitle: brand.positioning,
  });
}
