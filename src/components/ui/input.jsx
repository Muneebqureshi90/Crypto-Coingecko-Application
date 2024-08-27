import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "nflex nh-9 nw-full nrounded-md nborder nborder-input nbg-transparent npx-3 npy-1 ntext-sm nshadow-sm ntransition-colors file:nborder-0 file:nbg-transparent file:ntext-sm file:nfont-medium placeholder:ntext-muted-foreground focus-visible:noutline-none focus-visible:nring-1 focus-visible:nring-ring disabled:ncursor-not-allowed disabled:nopacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
