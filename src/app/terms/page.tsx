import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of the Guiderbus website and the automation services we provide, including intellectual property, liability, and third-party platform compliance.",
  alternates: { canonical: `${site.url}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These Terms of Service govern your access to and use of the Guiderbus website and the automation services we provide. By using our website or engaging our services, you agree to these Terms."
    >
      <LegalSection heading="1. Acceptance of Terms">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement
          between you and Guiderbus (&ldquo;Guiderbus,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing guiderbus.com,
          contacting us, or engaging our services, you acknowledge that you have
          read, understood, and agree to be bound by these Terms. If you do not
          agree, do not use our website or services.
        </p>
      </LegalSection>

      <LegalSection heading="2. Description of Services">
        <p>
          Guiderbus is a business automation agency. We provide done-for-you
          services that include designing, building, integrating, and operating
          AI-powered automations such as WhatsApp bots, AI chatbots and agents,
          workflow automations, and integrations with third-party business
          tools. The specific scope, deliverables, fees, and timelines for any
          engagement are defined in a separate written proposal or services
          agreement (&ldquo;Engagement Agreement&rdquo;), which prevails over
          these Terms in the event of a conflict.
        </p>
        <p>
          Any references to a future self-serve software platform or early
          access waitlist are for informational purposes only and do not
          constitute a commitment to deliver that platform on any timeline or to
          provide access to every waitlist registrant.
        </p>
      </LegalSection>

      <LegalSection heading="3. Eligibility">
        <p>
          Our services are intended for businesses and for individuals who are at
          least 18 years old and able to enter into a binding contract. By
          engaging us, you represent that you have the authority to do so on
          behalf of yourself or the organization you represent.
        </p>
      </LegalSection>

      <LegalSection heading="4. Engagement, Fees, and Payment">
        <p>
          Fees, payment schedules, and any recurring charges are set out in the
          applicable Engagement Agreement. Unless otherwise stated, invoices are
          due within the period specified in that agreement. Late payments may
          result in suspension of services. Fees for third-party services (such
          as messaging, hosting, or AI usage) may be passed through or billed
          separately as agreed.
        </p>
      </LegalSection>

      <LegalSection heading="5. Client Responsibilities and Acceptable Use">
        <p>
          You agree to provide accurate information through our website forms
          and the access necessary for us to deliver the services, and to use
          any automation we build only for lawful purposes. You agree not to use
          our services or any automation to:
        </p>
        <ul>
          <li>
            Send spam, unsolicited messages, or communications that violate
            applicable laws or third-party platform policies.
          </li>
          <li>
            Transmit unlawful, harmful, deceptive, infringing, or harassing
            content.
          </li>
          <li>
            Collect or process personal data without a valid legal basis or
            required consent.
          </li>
          <li>
            Interfere with, disrupt, or attempt to gain unauthorized access to any
            systems or networks.
          </li>
        </ul>
        <p>
          You are responsible for obtaining all consents required to message your
          end customers and for the content you direct us to send on your behalf.
        </p>
      </LegalSection>

      <LegalSection heading="6. Intellectual Property">
        <p>
          <strong>Our IP.</strong> All pre-existing materials, tools, frameworks,
          methodologies, and know-how used to deliver the services, as well as the
          Guiderbus name, logo, and website content, remain the exclusive property
          of Guiderbus.
        </p>
        <p>
          <strong>Client deliverables.</strong> Subject to full payment and unless
          otherwise stated in the Engagement Agreement, you receive a license to
          use the custom deliverables we create specifically for you for your
          internal business purposes. We retain ownership of our underlying tools
          and reusable components and may continue to use general knowledge,
          skills, and experience gained during the engagement.
        </p>
        <p>
          <strong>Your content.</strong> You retain ownership of the data,
          materials, and content you provide, and you grant us a limited license
          to use it solely to provide the services.
        </p>
      </LegalSection>

      <LegalSection heading="7. Third-Party Integrations and Platform Compliance">
        <p>
          Our services integrate with third-party platforms, including Meta
          Platforms, Inc. and the WhatsApp Business Platform, as well as CRMs,
          payment systems, and other tools. Your use of those platforms through
          our automations is subject to their respective terms and policies,
          including the{" "}
          <a
            href="https://www.whatsapp.com/legal/business-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Business Messaging Policy
          </a>{" "}
          and Meta&apos;s platform terms. You agree to comply with those policies.
          We are not responsible for changes, outages, or actions taken by
          third-party platforms, including suspension or termination of accounts
          for policy violations.
        </p>
      </LegalSection>

      <LegalSection heading="8. Confidentiality">
        <p>
          Each party may receive confidential information from the other. Both
          parties agree to protect such information, to use it only for purposes
          of the engagement, and not to disclose it to third parties except as
          necessary to provide the services or as required by law. This obligation
          survives termination of the engagement.
        </p>
      </LegalSection>

      <LegalSection heading="9. Warranties and Disclaimers">
        <p>
          We will perform our services with reasonable skill and care. Except as
          expressly stated in an Engagement Agreement, our website and services are
          provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
          warranties of any kind, whether express or implied, including implied
          warranties of merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the services or any automation
          will be uninterrupted, error-free, or that AI-generated outputs will be
          accurate or suitable for every situation.
        </p>
      </LegalSection>

      <LegalSection heading="10. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Guiderbus and its team will not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages, or for any loss of profits, revenue, data, or business
          opportunities, arising out of or related to the services or these Terms,
          even if advised of the possibility of such damages. Our total aggregate
          liability arising out of or related to an engagement will not exceed the
          amount you paid to us for the services giving rise to the claim in the
          three (3) months preceding the event giving rise to liability.
        </p>
      </LegalSection>

      <LegalSection heading="11. Indemnification">
        <p>
          You agree to indemnify and hold harmless Guiderbus and its team from and
          against any claims, damages, liabilities, and expenses (including
          reasonable legal fees) arising from your use of the services, the content
          or instructions you provide, your violation of these Terms, or your
          violation of any law or third-party rights, including third-party
          platform policies.
        </p>
      </LegalSection>

      <LegalSection heading="12. Term and Termination">
        <p>
          These Terms apply while you use our website or services. Either party may
          terminate an engagement as set out in the applicable Engagement
          Agreement. We may suspend or terminate access to our website or services
          if you breach these Terms or use them in a manner that creates legal or
          security risk. Provisions that by their nature should survive termination
          (including intellectual property, confidentiality, disclaimers, and
          limitations of liability) will survive.
        </p>
      </LegalSection>

      <LegalSection heading="13. Governing Law">
        <p>
          These Terms are governed by and construed in accordance with applicable
          law in the jurisdiction in which Guiderbus operates, without regard to
          conflict-of-laws principles. The courts of that jurisdiction will have
          exclusive jurisdiction over any disputes, unless otherwise required by
          mandatory local law or agreed in an Engagement Agreement.
        </p>
      </LegalSection>

      <LegalSection heading="14. Changes to These Terms">
        <p>
          We may update these Terms from time to time. When we do, we will revise
          the &ldquo;Last updated&rdquo; date above. Continued use of our website or
          services after changes take effect constitutes acceptance of the revised
          Terms.
        </p>
      </LegalSection>

      <LegalSection heading="15. Contact Us">
        <p>If you have questions about these Terms, contact us at:</p>
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
