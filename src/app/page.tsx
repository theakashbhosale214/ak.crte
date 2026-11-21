import { Approach } from "@/components/sections/approach/approach";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact/contact";
import { Engagement } from "@/components/sections/engagement";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero/hero";
import { Services } from "@/components/sections/services/services";
import { Solutions } from "@/components/sections/solutions";
import { Technology } from "@/components/sections/technology";
import { WhyUs } from "@/components/sections/why-us";
import { Work } from "@/components/sections/work";
import { JsonLd } from "@/components/ui/json-ld";
import { siteStructuredData } from "@/lib/seo";

/** Home page — sections are composed here in order. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={siteStructuredData()} />
      <Hero />
      <Capabilities />
      <Services />
      <Approach />
      <Solutions />
      <Technology />
      <Work />
      <WhyUs />
      <Engagement />
      <Faq />
      <FinalCta />
      <Contact />
    </>
  );
}
