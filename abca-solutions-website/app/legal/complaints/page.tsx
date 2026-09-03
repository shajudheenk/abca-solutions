import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Complaints procedure",
  description:
    "How to complain about ABCA Solutions Ltd, what happens when you do, and where to take it if we cannot resolve it.",
  path: "/legal/complaints",
});

export default function ComplaintsPage() {
  return (
    <LegalPage
      title="Complaints"
      lead="If something has gone wrong, tell us. Here is exactly what happens next and how long each stage takes."
      path="/legal/complaints"
      updated="September 2026"
    >
      <h2>How to complain</h2>
      <p>
        Email <a href={`mailto:${site.email.general}`}>{site.email.general}</a> with &ldquo;Complaint&rdquo; in
        the subject line, or call {site.phone.display} during {site.hours}. Include your business name, what
        happened, and what you would like us to do about it.
      </p>

      <h2>What happens next</h2>
      <ul>
        <li>
          <strong>Within 2 working days</strong> — we acknowledge your complaint in writing and tell you who is
          handling it.
        </li>
        <li>
          <strong>Within 10 working days</strong> — we give you a written response setting out what we found,
          what we are doing about it, and why.
        </li>
        <li>
          <strong>If we need longer</strong> — we tell you why and give you a date, which will not be more than
          8 weeks from the day you complained.
        </li>
      </ul>

      <h2>If you are not satisfied</h2>
      <p>
        Ask us to review the outcome and a different person will look at it. If you remain unhappy, the route
        available to you depends on what the complaint is about:
      </p>
      <ul>
        <li>
          <strong>Data protection</strong> — the Information Commissioner&rsquo;s Office,{" "}
          <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
        </li>
        <li>
          <strong>An insurance or finance product</strong> — the authorised firm we introduced you to is
          responsible for that advice and has its own complaints procedure, including access to the Financial
          Ombudsman Service where eligible. {site.legalName} is not authorised by the FCA and the Financial
          Ombudsman Service does not cover our introduction.
        </li>
        <li>
          <strong>An energy contract</strong> — your complaint about the supply itself goes to the supplier,
          who must tell you about the relevant redress scheme.
        </li>
      </ul>

      <h2>What we do with complaints</h2>
      <p>
        We record every complaint, what caused it and what changed as a result. It is the cheapest research
        available to a business this size.
      </p>
    </LegalPage>
  );
}
