"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ActionButton, Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="dark-surface bg-ink">
      <Container className="py-20 sm:py-28">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-5 max-w-2xl text-[2.25rem] leading-[1.06] font-semibold tracking-[-0.033em] text-white sm:text-display-2">
          This page failed to load.
        </h1>
        <p className="mt-5 max-w-lg text-lead text-white/65">
          It is our problem, not yours. Try again — and if it keeps happening, call us and we will deal with it
          directly.
        </p>
        {error.digest && (
          <p className="mt-4 text-[0.8125rem] text-white/55">Reference: {error.digest}</p>
        )}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ActionButton onClick={reset} size="lg">
            Try again
          </ActionButton>
          <Button href={site.phone.href} variant="onDark" size="lg">
            <Icons.phone className="h-4 w-4" />
            {site.phone.display}
          </Button>
        </div>
      </Container>
    </div>
  );
}
