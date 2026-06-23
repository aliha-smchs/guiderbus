import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Guiderbus collects, uses, shares, and protects personal data, including information processed through Meta and the WhatsApp Business Platform.",
  alternates: { canonical: `${site.url}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This Privacy Policy explains how Guiderbus collects, uses, discloses, and safeguards your information when you visit guiderbus.com, contact us, or use the automation services we build and operate on your behalf."
    >
      <LegalSection heading="1. Introduction">
        <p>
          Guiderbus (&ldquo;Guiderbus,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
          or &ldquo;our&rdquo;) is a business automation agency that designs,
          builds, and operates AI-powered automations for our clients, including
          chatbots and messaging automations on the WhatsApp Business Platform.
          We are committed to protecting your privacy and handling personal data
          responsibly and in accordance with applicable data protection laws.
        </p>
        <p>
          This Policy applies to information we process as a{" "}
          <strong>controller</strong> (for example, visitors to our website and
          prospective clients) and describes our role as a{" "}
          <strong>processor</strong> when we handle end-customer data on behalf
          of our clients under a separate services agreement.
        </p>
      </LegalSection>

      <LegalSection heading="2. Information We Collect">
        <p>We collect the following categories of information:</p>
        <p>
          <strong>Information you provide to us.</strong> When you contact us,
          request a consultation, join the platform waitlist, or engage our
          services, we may collect your name, business name, email address,
          phone number, service interests, budget or timeline preferences, and
          the contents of your messages.
        </p>
        <p>
          <strong>Automatically collected information.</strong> When you visit
          our website, we may collect technical data such as your browser type,
          device information, pages viewed, and the date and time of your visit.
          We use privacy-friendly analytics to understand website usage in
          aggregate.
        </p>
        <p>
          <strong>Messaging and WhatsApp data.</strong> When you interact with a
          WhatsApp or chatbot automation we operate, we may process your phone
          number, WhatsApp profile name, message content, and message metadata
          (such as timestamps and delivery status) in order to deliver the
          requested service. This data is processed on behalf of, and under the
          instructions of, the relevant business client.
        </p>
        <p>
          <strong>Client and project data.</strong> To build and operate
          automations, we may access systems and data our clients authorize,
          such as CRM records, support tickets, and business documents.
        </p>
      </LegalSection>

      <LegalSection heading="3. How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to enquiries and provide consultations.</li>
          <li>Design, build, deliver, operate, and support our services.</li>
          <li>
            Send and receive messages through the WhatsApp Business Platform and
            other channels you or our clients have configured.
          </li>
          <li>
            Operate, maintain, secure, and improve our website and services.
          </li>
          <li>
            Communicate with you about projects, updates, and administrative
            matters.
          </li>
          <li>
            Comply with legal obligations and enforce our agreements.
          </li>
        </ul>
        <p>
          We do not sell your personal information, and we do not use the content
          of end-customer messages for advertising.
        </p>
      </LegalSection>

      <LegalSection heading="4. Legal Bases for Processing">
        <p>
          Where the EU/UK General Data Protection Regulation applies, we process
          personal data on the following legal bases: performance of a contract,
          our legitimate interests (such as operating and improving our
          services), compliance with legal obligations, and your consent where
          required. You may withdraw consent at any time where processing is
          based on consent.
        </p>
      </LegalSection>

      <LegalSection heading="5. Third-Party Services">
        <p>
          We rely on trusted third parties to provide our services. These
          providers process data on our behalf or as independent controllers
          under their own terms:
        </p>
        <ul>
          <li>
            <strong>Meta Platforms, Inc. (WhatsApp Business Platform).</strong>{" "}
            We use the official WhatsApp Business API to send and receive
            messages. Your use of WhatsApp is also governed by Meta&apos;s
            terms and privacy policy. See{" "}
            <a
              href="https://www.whatsapp.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>AI and language model providers.</strong> We may send
            message content to AI service providers to generate responses, under
            agreements that restrict their use of that data.
          </li>
          <li>
            <strong>Hosting and infrastructure providers.</strong> Used to host
            our website and run automations securely.
          </li>
          <li>
            <strong>Resend.</strong> Used to deliver consultation and waitlist
            form submissions to our business inbox.
          </li>
          <li>
            <strong>Cloudflare Turnstile.</strong> Used to protect forms from
            spam and abuse.
          </li>
          <li>
            <strong>Plausible Analytics.</strong> Used to understand website
            usage in aggregate without Google Analytics.
          </li>
          <li>
            <strong>CRM and integration platforms.</strong> Used, where a client
            directs, to connect and synchronize business systems.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="6. Data Sharing and Disclosure">
        <p>
          We do not sell personal data. We may share information: with the
          service providers described above; with the business client on whose
          behalf we operate an automation; where required by law, regulation, or
          legal process; to protect the rights, safety, and property of
          Guiderbus, our clients, or others; and in connection with a merger,
          acquisition, or sale of assets, subject to appropriate safeguards.
        </p>
      </LegalSection>

      <LegalSection heading="7. Data Retention">
        <p>
          We retain personal data only for as long as necessary to fulfil the
          purposes described in this Policy, including to provide our services,
          comply with legal obligations, resolve disputes, and enforce our
          agreements. Retention periods for end-customer messaging data are
          defined together with our clients. When data is no longer needed, we
          delete or anonymize it.
        </p>
      </LegalSection>

      <LegalSection heading="8. Data Security">
        <p>
          We implement appropriate technical and organizational measures to
          protect personal data against unauthorized access, alteration,
          disclosure, or destruction. These include encryption in transit,
          access controls, and the principle of least privilege. No method of
          transmission or storage is completely secure, and we cannot guarantee
          absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="9. International Data Transfers">
        <p>
          We and our service providers may process data in countries other than
          your own. Where we transfer personal data internationally, we rely on
          appropriate safeguards, such as Standard Contractual Clauses, to ensure
          your data receives an adequate level of protection.
        </p>
      </LegalSection>

      <LegalSection heading="10. Your Rights">
        <p>
          Depending on your location, you may have the right to access, correct,
          update, or delete your personal data; to object to or restrict certain
          processing; to data portability; and to withdraw consent. If you are in
          the European Economic Area or United Kingdom, you have rights under the
          GDPR. If you are a California resident, you have rights under the CCPA/
          CPRA, including the right to know, delete, and opt out of the
          &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information (we
          do not sell or share personal information as those terms are defined).
        </p>
        <p>
          To exercise your rights, contact us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. If our processing of
          your data is carried out on behalf of a business client, we will refer
          your request to that client and assist them in responding. You also
          have the right to lodge a complaint with a supervisory authority.
        </p>
      </LegalSection>

      <LegalSection heading="11. Children's Privacy">
        <p>
          Our website and services are intended for businesses and are not
          directed to children under the age of 16. We do not knowingly collect
          personal data from children. If you believe a child has provided us
          with personal data, please contact us so we can delete it.
        </p>
      </LegalSection>

      <LegalSection heading="12. Cookies and Analytics">
        <p>
          Our website may use necessary technologies to operate the site, protect
          forms from abuse, and understand usage in aggregate. We do not use
          Google Analytics for the current website launch. If optional analytics
          or similar technologies are introduced later, we will update this
          Policy as needed.
        </p>
      </LegalSection>

      <LegalSection heading="13. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will
          revise the &ldquo;Last updated&rdquo; date above. Material changes will
          be communicated through our website. We encourage you to review this
          Policy periodically.
        </p>
      </LegalSection>

      <LegalSection heading="14. Contact Us">
        <p>
          If you have questions about this Privacy Policy or our data practices,
          contact us at:
        </p>
        <ul>
          <li>
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>Website: {site.domain}</li>
        </ul>
      </LegalSection>
    </LegalPage>
  );
}
