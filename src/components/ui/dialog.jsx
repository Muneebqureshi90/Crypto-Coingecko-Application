import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "nfixed ninset-0 nz-50 nbg-black/80 n data-[state=open]:nanimate-in data-[state=closed]:nanimate-out data-[state=closed]:nfade-out-0 data-[state=open]:nfade-in-0",
      className
    )}
    {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "nfixed nleft-[50%] ntop-[50%] nz-50 ngrid nw-full nmax-w-lg ntranslate-x-[-50%] ntranslate-y-[-50%] ngap-4 nborder nbg-background np-6 nshadow-lg nduration-200 data-[state=open]:nanimate-in data-[state=closed]:nanimate-out data-[state=closed]:nfade-out-0 data-[state=open]:nfade-in-0 data-[state=closed]:nzoom-out-95 data-[state=open]:nzoom-in-95 data-[state=closed]:nslide-out-to-left-1/2 data-[state=closed]:nslide-out-to-top-[48%] data-[state=open]:nslide-in-from-left-1/2 data-[state=open]:nslide-in-from-top-[48%] sm:nrounded-lg",
        className
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close
        className="nabsolute nright-4 ntop-4 nrounded-sm nopacity-70 nring-offset-background ntransition-opacity hover:nopacity-100 focus:noutline-none focus:nring-2 focus:nring-ring focus:nring-offset-2 disabled:npointer-events-none data-[state=open]:nbg-accent data-[state=open]:ntext-muted-foreground">
        <Cross2Icon className="nh-4 nw-4" />
        <span className="nsr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("nflex nflex-col nspace-y-1.5 ntext-center sm:ntext-left", className)}
    {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "nflex nflex-col-reverse sm:nflex-row sm:njustify-end sm:nspace-x-2",
      className
    )}
    {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("ntext-lg nfont-semibold nleading-none ntracking-tight", className)}
    {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("ntext-sm ntext-muted-foreground", className)}
    {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
