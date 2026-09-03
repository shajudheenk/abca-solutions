import Link from "next/link";
import { clsx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg" | "sm";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-[background-color,color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-coral text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_10px_24px_-12px_rgba(204,69,38,0.75)] hover:bg-coral-600",
  secondary:
    "bg-ink text-white hover:bg-ink-2",
  ghost:
    "border border-line bg-white text-ink hover:border-ink/25 hover:bg-sand",
  onDark:
    "border border-white/25 text-white hover:border-white/60 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const cls = clsx(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function ActionButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
