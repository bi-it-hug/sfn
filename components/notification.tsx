import { BadgeAlert, BadgeInfo, CheckCheck, ChevronRight } from "lucide-react"
import type { TNotification } from "@/types/notification"
import { cn } from "@/lib/utils"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button"

export const typeStyles: Record<TNotification["type"], string> = {
    default:
        "bg-muted text-muted-foreground hover:bg-muted/80 focus-visible:border-border focus-visible:ring-ring/20! dark:hover:bg-muted/70!",
    success:
        "bg-success/10 text-success hover:bg-success/20! focus-visible:border-success/40 focus-visible:ring-success/20! dark:bg-success/20! dark:hover:bg-success/30! dark:focus-visible:ring-success/40",
    info: "bg-info/10 text-info hover:bg-info/20! focus-visible:border-info/40 focus-visible:ring-info/20! dark:bg-info/20! dark:hover:bg-info/30! dark:focus-visible:ring-info/40",
    warning:
        "bg-warning/10 text-warning hover:bg-warning/20! focus-visible:border-warning/40 focus-visible:ring-warning/20! dark:bg-warning/20! dark:hover:bg-warning/30! dark:focus-visible:ring-warning/40",
    error: "bg-destructive/10 text-destructive hover:bg-destructive/20! focus-visible:border-destructive/40 focus-visible:ring-destructive/20! dark:bg-destructive/20! dark:hover:bg-destructive/30! dark:focus-visible:ring-destructive/40",
}

export function Notification({
    data,
    setData,
}: {
    data: TNotification
    setData: Dispatch<SetStateAction<TNotification[]>>
}) {
    const Icon = ["default", "info"].includes(data.type)
        ? BadgeInfo
        : BadgeAlert

    function clearData() {
        setData((prev) => prev.filter((n) => n.id !== data.id))
    }

    return (
        <Item
            variant="outline"
            size="sm"
            className={cn(typeStyles[data.type], "min-w-max px-2 py-1.5")}
            // asChild
        >
            {/* <a href={data.href}> */}
            <ItemMedia>
                <Icon className="size-4" />
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="font-normal">{data.message}</ItemTitle>
            </ItemContent>
            <ItemActions>
                <Button variant="outline" size="icon-xs" onClick={clearData}>
                    <CheckCheck />
                </Button>
                <ChevronRight className="size-4" />
            </ItemActions>
            {/* </a> */}
        </Item>
    )
}
