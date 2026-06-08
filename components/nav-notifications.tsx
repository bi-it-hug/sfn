import { notifications } from "../app/sample-data"
import { Notification } from "@/components/notification"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavNotifications() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Bell />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-fit">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        {notifications.map((entry, index) => (
                            <Notification key={index} data={entry} />
                        ))}
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
