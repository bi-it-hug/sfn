import type { TNotification } from "@/types/notification"
import { Notification } from "@/components/notification"
import { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Bell, CheckCheck } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function NavNotifications({
    data,
    setData,
}: {
    data: TNotification[]
    setData: Dispatch<SetStateAction<TNotification[]>>
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Bell />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="max-h-96 min-w-fit pt-0"
            >
                <DropdownMenuGroup>
                    <div className="sticky top-0 flex h-fit w-full items-start justify-between bg-card pt-1">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        {data.length !== 0 && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon-xs"
                                        className="size-5.25"
                                        onClick={() => setData([])}
                                    >
                                        <CheckCheck />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mark all as read</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        {data.length !== 0 ? (
                            data.map((entry, index) => (
                                <Notification
                                    key={index}
                                    data={entry}
                                    setData={setData}
                                />
                            ))
                        ) : (
                            <Empty className="h-full w-3xs">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Bell />
                                    </EmptyMedia>
                                    <EmptyTitle>No Notifications</EmptyTitle>
                                    <EmptyDescription className="max-w-xs text-pretty">
                                        You&apos;re all caught up. New
                                        notifications will appear here.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        )}
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
