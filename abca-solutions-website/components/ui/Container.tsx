import { clsx } from "@/lib/utils";

export function Container({
  className,
  children,
  width = "default",
}: {
  className?: string;
  children: React.ReactNode;
  width?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-5 sm:px-8",
        width === "narrow" && "max-w-3xl",
        width === "default" && "max-w-[76rem]",
        width === "wide" && "max-w-[88rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
