import { ContactLine, LegalPage } from "@/components/legal/legal-page";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/seo";

/*
 * TODO(launch): have this policy reviewed for your jurisdiction, and update it
 * whenever you add analytics, cookies or new data processors.
 * It describes only what the site does today.
 */

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${brand.legalName} collects, uses and protects personal information shared through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="21 November 2026"
      intro={
        <p>
          This policy explains what information {brand.legalName} collects when you use this website, why we collect
          it and how we look after it. We keep it short because we collect very little.
        </p>
      }
    >
      <section>
        <h2>Information we collect</h2>
        <p>
          <strong>When you send an enquiry.</strong> The enquiry form asks for your name, email address and a
          description of your project, and optionally your phone number, company name, the service you need and an
          estimated budget. We receive exactly what you choose to share.
        </p>
        <p>
          <strong>When you browse.</strong> Like most websites, our hosting provider automatically processes technical
          information such as your IP address, browser type and the pages requested, to deliver the site securely and
          protect it from abuse.
        </p>
        <p>
          This website does not currently use analytics, advertising or tracking cookies.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to your enquiry and discuss your project.</li>
          <li>To prepare proposals and manage our working relationship if we work together.</li>
          <li>To keep the website secure, including detecting and preventing spam.</li>
        </ul>
        <p>We do not sell your personal information, and we do not use it for unrelated marketing.</p>
      </section>

      <section>
        <h2>Who we share it with</h2>
        <p>
          We share information only with service providers that help us run this website and respond to you — for
          example, our hosting provider, the email service that delivers enquiries to us and, where enabled, a spam
          protection service. They may process information only on our behalf and for these purposes.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          We keep enquiry details only for as long as we need them to respond, to manage any resulting work and to meet
          legal or accounting obligations. After that, we delete them.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can ask us to access, correct or delete the personal information we hold about you, or object to how we
          use it. To make a request, <ContactLine email={brand.contact.email} />.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          This website is served over an encrypted connection (HTTPS), and we use reasonable technical and
          organisational measures to protect your information. No method of transmission or storage is completely
          secure, but we work to keep your data safe.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          If we change how we handle personal information, we will update this page and the date at the top.
        </p>
      </section>
    </LegalPage>
  );
}
