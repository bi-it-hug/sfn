import type { TNotification } from "@/types/notification"
import { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import * as Lucide from "lucide-react"
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function Notification({
    data,
    setData,
}: {
    data: TNotification
    setData: Dispatch<SetStateAction<TNotification[]>>
}) {
    function clearData() {
        setData((prev) => prev.filter((n) => n.id !== data.id))
    }

    const Icon: Lucide.LucideIcon =
        data.type === "warning"
            ? Lucide.BadgeAlert
            : data.type === "success"
              ? Lucide.BadgeCheck
              : data.type === "info"
                ? Lucide.BadgeInfo
                : data.type === "error"
                  ? Lucide.BadgeX
                  : Lucide.Badge

    return (
        <Alert
            className="pl-2"
            variant={data.type === "error" ? "destructive" : data.type}
        >
            <Icon />
            <AlertTitle className="min-w-max">{data.message}</AlertTitle>
            <AlertDescription className="text-xs">
                {data.description}
            </AlertDescription>
            <AlertAction>
                <Button
                    variant="outline"
                    size="icon-xs"
                    onClick={clearData}
                    className="text-foreground"
                >
                    <Lucide.CheckCheck />
                </Button>
            </AlertAction>
        </Alert>
    )
}
