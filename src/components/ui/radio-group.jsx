import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (<RadioGroupPrimitive.Root className={cn("ngrid ngap-2", className)} {...props} ref={ref} />);
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "naspect-square nh-4 nw-4 nrounded-full nborder nborder-primary ntext-primary nshadow focus:noutline-none focus-visible:nring-1 focus-visible:nring-ring disabled:ncursor-not-allowed disabled:nopacity-50",
        className
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className="nflex nitems-center njustify-center">
        <CheckIcon className="nh-3.5 nw-3.5 nfill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>)
  );
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
