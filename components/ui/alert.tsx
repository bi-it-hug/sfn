import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariantNames = [
    "default",
    "success",
    "info",
    "warning",
    "destructive",
] as const

type AlertVariant = (typeof alertVariantNames)[number]

const alertColorVariants = cva("", {
    variants: {
        variant: {
            default: "bg-card text-card-foreground",
            success:
                // "bg-success/10 text-success focus-visible:border-success/40 focus-visible:ring-success/20 dark:bg-success/20 dark:focus-visible:ring-success/40",
                "text-success focus-visible:border-success/40 focus-visible:ring-success/20 dark:focus-visible:ring-success/40",
            info:
                // "bg-info/10 text-info focus-visible:border-info/40 focus-visible:ring-info/20 dark:bg-info/20 dark:focus-visible:ring-info/40",
                "text-info focus-visible:border-info/40 focus-visible:ring-info/20 dark:focus-visible:ring-info/40",
            warning:
                // "bg-warning/10 text-warning focus-visible:border-warning/40 focus-visible:ring-warning/20 dark:bg-warning/20 dark:focus-visible:ring-warning/40",
                "text-warning focus-visible:border-warning/40 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40",
            destructive:
                // "bg-destructive/10 text-destructive focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40",
                "text-destructive focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

const alertVariantExtras: Record<AlertVariant, string> = {
    default: "",
    success: "*:data-[slot=alert-description]:text-success/70",
    info: "*:data-[slot=alert-description]:text-info/70",
    warning: "*:data-[slot=alert-description]:text-warning/70",
    destructive:
        "*:data-[slot=alert-description]:text-destructive/70 *:[svg]:text-current",
}

const toastDescriptionExtras: Record<AlertVariant, string> = {
    default: "[&_[data-description]]:text-muted-foreground",
    success: "[&_[data-description]]:text-success/90",
    info: "[&_[data-description]]:text-info/90",
    warning: "[&_[data-description]]:text-warning/90",
    destructive: "[&_[data-description]]:text-destructive/90",
}

function alertColorClasses(variant: AlertVariant) {
    return cn(alertColorVariants({ variant }), alertVariantExtras[variant])
}

function toastColorClasses(variant: AlertVariant) {
    return cn(alertColorVariants({ variant }), toastDescriptionExtras[variant])
}

const alertVariants = cva(
    "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: Object.fromEntries(
                alertVariantNames.map((variant) => [
                    variant,
                    alertColorClasses(variant),
                ])
            ) as Record<AlertVariant, string>,
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function Alert({
    className,
    variant,
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
    return (
        <div
            data-slot="alert"
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        />
    )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-title"
            className={cn(
                "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
                className
            )}
            {...props}
        />
    )
}

function AlertDescription({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-description"
            className={cn(
                "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
                className
            )}
            {...props}
        />
    )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-action"
            className={cn("absolute top-2 right-2", className)}
            {...props}
        />
    )
}

export {
    Alert,
    AlertTitle,
    AlertDescription,
    AlertAction,
    alertVariants,
    alertColorVariants,
    toastColorClasses,
}
