import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "ninline-flex nitems-center nrounded-md nborder npx-2.5 npy-0.5 ntext-xs nfont-semibold ntransition-colors focus:noutline-none focus:nring-2 focus:nring-ring focus:nring-offset-2",
  {
    variants: {
      variant: {
        default:
          "nborder-transparent nbg-primary ntext-primary-foreground nshadow hover:nbg-primary/80",
        secondary:
          "nborder-transparent nbg-secondary ntext-secondary-foreground hover:nbg-secondary/80",
        destructive:
          "nborder-transparent nbg-destructive ntext-destructive-foreground nshadow hover:nbg-destructive/80",
        outline: "ntext-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
