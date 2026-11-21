import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = ComponentPropsWithoutRef<"div">;

/** Page-width wrapper with the site's responsive gutters. */
export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10", className)} {...props} />;
}
