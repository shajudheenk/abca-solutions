import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cookie notice",
  description: "What this website stores in your browser, why, and how to clear it.",
  path: "/legal/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie notice"
      lead="This site sets no advertising or tracking cookies. Here is everything it does store."
      path="/legal/cookies"
      updated="September 2026"
    >
      <h2>What we store</h2>
      <p>
        This website does not use advertising cookies, cross-site tracking or third-party marketing pixels. It
        stores two things in your own browser, both strictly functional, both readable only by this site:
      </p>
      <ul>
        <li>
          <strong>Announcement dismissal</strong> — a session storage entry recording that you closed the
          banner at the top of the page, so it does not reappear on every page. Cleared when you close the tab.
        </li>
        <li>
          <strong>Audit form draft</strong> — a local storage entry holding what you have typed into the audit
          request form, so a part-completed form survives a refresh or a phone call. It is removed as soon as
          the form is submitted, and you can clear it by clearing site data in your browser.
        </li>
      </ul>
      <p>
        Neither is sent to us. Neither identifies you to any third party. Because both are strictly necessary
        for a function you have asked for, no consent banner is required for them under the Privacy and
        Electronic Communications Regulations.
      </p>

      <h2>Fonts and assets</h2>
      <p>
        Typefaces are self-hosted and served from this domain. No request is made to a third-party font service
        when you load a page.
      </p>

      <h2>Analytics</h2>
      <p>
        If we add analytics in future, this notice will be updated before it goes live, and any non-essential
        cookie will be set only after you consent to it.
      </p>

      <h2>Clearing what is stored</h2>
      <p>
        Clearing site data for this domain in your browser settings removes both entries immediately. Nothing
        breaks; the form simply starts empty.
      </p>

      <h2>Questions</h2>
      <p>
        Email <a href={`mailto:${site.email.general}`}>{site.email.general}</a> or call {site.phone.display}.
      </p>
    </LegalPage>
  );
}
