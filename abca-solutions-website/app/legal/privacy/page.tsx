import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description:
    "How ABCA Solutions Ltd collects, uses, stores and deletes the business and personal data you send us for a cost audit.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy notice"
      lead="What we collect when you ask for an audit, why we hold it, how long we keep it and how to get it removed."
      path="/legal/privacy"
      updated="September 2026"
    >
      <h2>Who we are</h2>
      <p>
        {site.legalName} (&ldquo;ABCA&rdquo;, &ldquo;we&rdquo;) is the data controller for the information
        described in this notice. We are registered in {site.incorporatedIn} under company number{" "}
        {site.companyNumber} and are registered with the Information Commissioner&rsquo;s Office as a data
        controller{site.ico.reference ? `, reference ${site.ico.reference}` : ""}.
      </p>
      <p>
        For any privacy question, or to exercise any of the rights below, email{" "}
        <a href={`mailto:${site.email.general}`}>{site.email.general}</a> or call {site.phone.display}.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Contact and business details</strong> — your name, business name, email address, phone
          number, postcode, sector and number of sites, from the audit request form.
        </li>
        <li>
          <strong>Billing documents</strong> — merchant statements, energy bills, telecoms invoices, bank
          statements, policy schedules and finance agreements that you choose to send us.
        </li>
        <li>
          <strong>Correspondence</strong> — emails, messages and call notes relating to your audit.
        </li>
        <li>
          <strong>Technical data</strong> — IP address and basic request information, recorded briefly to
          rate-limit the contact form and prevent abuse.
        </li>
      </ul>

      <h2>Why we use it, and our lawful basis</h2>
      <ul>
        <li>
          <strong>To produce your audit</strong> — necessary for steps taken at your request before entering a
          contract, and for our legitimate interest in operating the service.
        </li>
        <li>
          <strong>To obtain quotations from suppliers on your behalf</strong> — only where you have asked us
          to, and only the details that supplier needs.
        </li>
        <li>
          <strong>To remind you of renewal dates</strong> — our legitimate interest in maintaining the client
          relationship. You can opt out at any time.
        </li>
        <li>
          <strong>To meet legal and accounting obligations</strong> — compliance with a legal obligation.
        </li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We do not sell your data. We share it only with: suppliers and providers you have asked us to obtain
        quotations from; authorised firms where you have asked for an introduction on insurance or finance; and
        our service providers (email delivery, cloud storage, accounting), who process data on our instructions
        only. Where an authorised firm takes your details, they become a controller of that data and their own
        privacy notice applies.
      </p>

      <h2>Where it is stored</h2>
      <p>
        Documents are held in access-controlled, encrypted storage. They are readable by the consultant working
        on your audit and by nobody else. We do not store billing documents in shared drives or public buckets.
        Where a processor operates outside the UK, transfers rely on UK adequacy regulations or the
        International Data Transfer Addendum.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Billing documents you send us: deleted 12 months after your audit is issued, or sooner on request.</li>
        <li>The audit report and the contact details attached to it: 6 years, to support renewal reminders and to meet accounting obligations.</li>
        <li>Enquiries that do not become audits: 12 months.</li>
        <li>Form rate-limiting data: minutes.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You have the right to access the personal data we hold about you, to have inaccurate data corrected, to
        have data erased, to restrict or object to processing, and to receive your data in a portable format.
        Contact us using the details above; we respond within one month.
      </p>
      <p>
        If you are unhappy with how we have handled your data you can complain to the Information
        Commissioner&rsquo;s Office at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">ico.org.uk</a>,
        though we would appreciate the chance to put it right first.
      </p>

      <h2>Cookies</h2>
      <p>
        See our <a href="/legal/cookies">cookie notice</a> for what this site stores in your browser.
      </p>
    </LegalPage>
  );
}
