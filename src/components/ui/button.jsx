import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "ninline-flex nitems-center njustify-center nwhitespace-nowrap nrounded-md ntext-sm nfont-medium ntransition-colors focus-visible:noutline-none focus-visible:nring-1 focus-visible:nring-ring disabled:npointer-events-none disabled:nopacity-50",
  {
    variants: {
      variant: {
        default:
          "nbg-primary ntext-primary-foreground nshadow hover:nbg-primary/90",
        destructive:
          "nbg-destructive ntext-destructive-foreground nshadow-sm hover:nbg-destructive/90",
        outline:
          "nborder nborder-input nbg-background nshadow-sm hover:nbg-accent hover:ntext-accent-foreground",
        secondary:
          "nbg-secondary ntext-secondary-foreground nshadow-sm hover:nbg-secondary/80",
        ghost: "hover:nbg-accent hover:ntext-accent-foreground",
        link: "ntext-primary nunderline-offset-4 hover:nunderline",
      },
      size: {
        default: "nh-9 npx-4 npy-2",
        sm: "nh-8 nrounded-md npx-3 ntext-xs",
        lg: "nh-10 nrounded-md npx-8",
        icon: "nh-9 nw-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
