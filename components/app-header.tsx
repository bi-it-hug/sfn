import { NavNotifications } from "@/components/nav-notifications"
import { AppBreadcrumb } from "@/components/app-breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { greetings, users } from "@/app/sample-data"
import { NavUser } from "@/components/nav-user"
import { cn, getRandomInt } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { Notification } from "@/types/notification"
import { AlertType } from "@/types/altert-types"

export function AppHeader() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [greeting, setGreeting] = useState(greetings[0])
    const currentUser = users[0]

    useEffect(() => {
        setGreeting(greetings[getRandomInt(0, greetings.length - 1)]!)
    }, [])

    useEffect(() => {
        function onScroll() {
            setIsScrolled(window.scrollY > 8)
        }

        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const header = document.querySelector("header")
        if (!header) return

        function updateHeight() {
            document.documentElement.style.setProperty(
                "--header-height",
                `${header?.clientHeight}px`
            )
        }

        updateHeight()

        const observer = new ResizeObserver(updateHeight)
        observer.observe(header)

        return () => observer.disconnect()
    }, [])

    const type: AlertType = "info"
    const [schissCount, setSchissCount] = useState(1)

    return (
        <header
            className={cn(
                "sticky top-0 z-1 flex h-16 shrink-0 items-center justify-between gap-2 px-4 py-2 transition-[width,height,background-color] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
                isScrolled ? "bg-background" : "bg-transparent"
            )}
        >
            <section className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="self mr-2 h-4 self-center!"
                />
            </section>
            <section className="flex w-full items-center justify-start gap-2">
                <AppBreadcrumb />
            </section>
            <section className="flex items-center gap-2">
                <Button
                    onClick={() => {
                        toast[type](
                            `Schiss ${schissCount} has been initiated!`,
                            {
                                action: {
                                    label: "Yeet",
                                    onClick: () => console.log("Yeet"),
                                },
                            }
                        )
                        setSchissCount(schissCount + 1)
                    }}
                >
                    Schiss!
                </Button>
                <p className="truncate text-xs text-muted-foreground">
                    {`${greeting}, ${currentUser.name.trim().split(/\s+/)[0]}!`}
                </p>
                <NavNotifications />
                <NavUser user={currentUser} />
            </section>
        </header>
    )
}
