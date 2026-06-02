"use client"

import { LogoutDialog } from "@/components/logout-dialog"
import { AvatarUser } from "@/components/avatar-user"
import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavUser({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { isMobile } = useSidebar()
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <AvatarUser
                        user={{ name: user.name, avatar: user.avatar }}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="end"
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <AvatarUser
                            user={{ name: user.name, avatar: user.avatar }}
                        />
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {user.name}
                            </span>
                            <span className="truncate text-xs">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault()
                        setIsLogoutDialogOpen(true)
                    }}
                >
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
            <LogoutDialog
                open={isLogoutDialogOpen}
                onOpenChange={setIsLogoutDialogOpen}
            />
        </DropdownMenu>
    )
}
