import { ContactLine, LegalPage } from "@/components/legal/legal-page";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/seo";

/*
 * TODO(launch): have these terms reviewed, and name the governing
 * jurisdiction once the business entity is finalised.
 */

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms that apply when you use the ${brand.legalName} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="21 November 2026"
      intro={
        <p>
          These terms apply to your use of this website. By using it, you agree to them. If you do not agree, please do
          not use the site.
        </p>
      }
    >
      <section>
        <h2>About this website</h2>
        <p>
          This website is operated by {brand.legalName}. It provides general information about our services. Nothing on
          it is an offer or a binding commitment: the scope, timeline, pricing and terms of any project are agreed
          separately, in writing, before work begins.
        </p>
      </section>

      <section>
        <h2>Using the website</h2>
        <ul>
          <li>Use the website lawfully and in a way that does not interfere with its operation or security.</li>
          <li>Do not submit false, misleading or harmful information through the enquiry form.</li>
          <li>Do not attempt to gain unauthorised access to the website or the systems behind it.</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The design, text, graphics and code of this website belong to {brand.legalName} unless stated otherwise.
          Client names, websites and screenshots shown in our work belong to their respective owners and appear with
          reference to work we delivered for them.
        </p>
      </section>

      <section>
        <h2>Links to other websites</h2>
        <p>
          This website links to external sites, including client projects. We are not responsible for the content or
          practices of websites we do not control.
        </p>
      </section>

      <section>
        <h2>Disclaimer</h2>
        <p>
          We work to keep the information on this website accurate and up to date, but it is provided &quot;as
          is&quot;, without warranties of any kind. To the extent permitted by law, we are not liable for any loss
          arising from your use of the website or reliance on its content.
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>We may update these terms from time to time. The date at the top shows when they last changed.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          If you have questions about these terms, <ContactLine email={brand.contact.email} />.
        </p>
      </section>
    </LegalPage>
  );
}
