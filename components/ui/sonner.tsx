"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { alertColorVariants, toastColorClasses } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import {
    BadgeCheck,
    BadgeInfo,
    BadgeAlert,
    BadgeX,
    LoaderCircle,
} from "lucide-react"

const toastBase =
    "overflow-hidden p-2! gap-2! *:[svg]:self-start flex w-full items-center justify-center gap-2 rounded-lg border px-2.5 py-2 text-sm shadow-lg relative before:absolute! before:inset-0! before:size-[200%]! before:bg-popover! before:-z-1!"

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            icons={{
                success: <BadgeCheck className="size-4 self-start" />,
                info: <BadgeInfo className="size-4 self-start" />,
                warning: <BadgeAlert className="size-4 self-start" />,
                error: <BadgeX className="size-4 self-start" />,
                loading: <LoaderCircle className="size-4 animate-spin self-start" />,
            }}
            toastOptions={{
                unstyled: true,
                classNames: {
                    toast: cn(
                        toastBase,
                        alertColorVariants({ variant: "default" })
                    ),
                    success: toastColorClasses("success"),
                    info: toastColorClasses("info"),
                    warning: toastColorClasses("warning"),
                    error: toastColorClasses("destructive"),
                    title: "font-medium min-w-max leading-[20px] mb-1.5",
                    description: "text-xs text-muted-foreground!",
                    actionButton: cn(
                        buttonVariants({
                            variant: "outline",
                            size: "icon-xs",
                        }),
                        "ml-auto text-foreground!"
                    ),
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
