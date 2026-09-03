import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of use",
  description:
    "The terms on which ABCA Solutions Ltd provides this website and its free business cost audit service.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      lead="The basis on which we provide this website and the audit service described on it."
      path="/legal/terms"
      updated="September 2026"
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by {site.legalName}, a company registered in {site.incorporatedIn} under
        company number {site.companyNumber}. Contact: {site.email.general}, {site.phone.display}.
      </p>

      <h2>2. What we do, and what we do not do</h2>
      <p>
        We review the costs a business pays for services including card processing, energy, telecoms, EPOS and
        banking, and produce a written report comparing those costs against pricing available through the
        suppliers on our panel.
      </p>
      <p>
        <strong>
          {site.legalName} is not authorised or regulated by the Financial Conduct Authority.
        </strong>{" "}
        We do not provide advice on, arrange, or make recommendations about insurance contracts or credit. Where
        an audit identifies that insurance or finance may be worth reviewing, we act as an introducer only: we
        pass your details, with your agreement, to an authorised firm who deals with you directly and is
        responsible for any advice given.
      </p>
      <p>
        Nothing on this website or in an audit report constitutes financial, legal, tax or insurance advice.
      </p>

      <h2>3. The audit</h2>
      <p>
        Audits are provided free of charge. There is no fee payable by you to us at any point, and no
        obligation to act on anything in a report. The report is prepared from the documents you provide; where
        those documents are incomplete or out of date, the report will say so.
      </p>
      <p>
        Figures in a report are estimates based on pricing available at the time of writing. Supplier pricing
        changes, and a quotation is only binding once it is issued by that supplier in a contract you sign with
        them. We do not guarantee that any saving identified will be achieved.
      </p>

      <h2>4. How we are paid</h2>
      <p>
        We receive commission from suppliers when a client chooses to move to them. The basis of that
        commission is published on our <a href="/our-fees">fees page</a>, and the amount attributable to each
        recommendation is disclosed in pounds on the report itself, before you decide anything.
      </p>

      <h2>5. Your responsibilities</h2>
      <ul>
        <li>You confirm that you are authorised to share the documents you send us on behalf of your business.</li>
        <li>You will not send us documents containing card numbers, passwords or banking credentials. We never ask for them.</li>
        <li>You remain responsible for reading and signing any contract you enter into with a supplier.</li>
      </ul>

      <h2>6. Website content</h2>
      <p>
        We take care to keep this site accurate, but content is provided for general information and may change
        without notice. Calculators on this site perform arithmetic on figures you enter; results are
        illustrative and are not a quotation.
      </p>

      <h2>7. Liability</h2>
      <p>
        Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud,
        or for anything else that cannot lawfully be limited. Subject to that, we are not liable for indirect
        or consequential loss, or for loss of profit, arising from use of this website or reliance on a report,
        and our total liability in connection with an audit is limited to £1,000.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        The design, text and branding of this site belong to {site.legalName}. Third-party names and marks
        shown on this site belong to their respective owners and are used to identify the suppliers we work
        with. Audit reports are provided for your own use; you are free to share your own report with your
        accountant or with another broker.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the law of England and Wales, and the courts of England and Wales have
        exclusive jurisdiction.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these terms. The version published here at the time you use the site is the version that
        applies.
      </p>
    </LegalPage>
  );
}
