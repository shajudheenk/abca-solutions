import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Icons } from "@/components/ui/Icon";

export function LegalPage({
  title,
  lead,
  path,
  updated,
  children,
}: {
  title: string;
  lead: string;
  path: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        lead={lead}
        crumbs={[{ name: title, path }]}
      />
      <div className="bg-white py-14 sm:py-20">
        <Container width="narrow">
          <p className="flex items-center gap-2 text-[0.8125rem] text-muted">
            <Icons.calendar className="h-4 w-4 text-teal-600" />
            Last updated {updated}
          </p>
          <div className="prose-legal mt-8 text-[1rem] leading-relaxed">{children}</div>
        </Container>
      </div>
    </>
  );
}
