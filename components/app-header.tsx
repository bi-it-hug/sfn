"use client"

import { NavNotifications } from "@/components/nav-notifications"
import { AppBreadcrumb } from "@/components/app-breadcrumb"
import type { TNotification } from "@/types/notification"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { greetings, users } from "@/app/sample-data"
import { NavUser } from "@/components/nav-user"
import { Button } from "@/components/ui/button"
import { cn, getRandomInt } from "@/lib/utils"
import { ExternalToast, toast } from "sonner"
import { useEffect, useState } from "react"
import { CheckCheck } from "lucide-react"

export function AppHeader() {
    const max = 999999999999

    const [greeting, setGreeting] = useState(greetings[0])
    const [isScrolled, setIsScrolled] = useState(false)

    const testUser = users[0]

    const testNotifications: TNotification[] = [
        {
            id: getRandomInt(0, max),
            type: "info",
            message: "Works on my machine.",
            description:
                "Das Problem wurde erfolgreich ignoriert und an die Produktion weitergeleitet.",
            href: "/",
        },
        {
            id: getRandomInt(0, max),
            type: "warning",
            message: "TODO: Problem später lösen.",
            description:
                "Dieser Eintrag existiert seit 14 Monaten und wird vermutlich vererbt.",
            href: "/",
        },
        {
            id: getRandomInt(0, max),
            type: "error",
            message: "Uncaught Exception: Skill Issue",
            description:
                "Die Anwendung hat die Verantwortung erfolgreich an den Benutzer delegiert.",
            href: "/",
        },
        {
            id: getRandomInt(0, max),
            type: "default",
            message: "git push --force wurde erfolgreich ausgeführt.",
            description:
                "Die letzten 3 Wochen Entwicklungsarbeit gelten nun als Mythos.",
            href: "/",
        },
        {
            id: getRandomInt(0, max),
            type: "success",
            message: "Der Bug ist verschwunden.",
            description:
                "Bitte nicht weiter testen. Wir möchten ihn nicht erschrecken.",
            href: "/",
        },
    ]

    const [notifications, setNotifications] =
        useState<TNotification[]>(testNotifications)

    function getRandomNotification() {
        return testNotifications[getRandomInt(0, testNotifications.length - 1)]
    }

    function markAllAsRead(notificationId: TNotification["id"]) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    }

    function renderNotification(
        notificationType: TNotification["type"],
        message: string,
        options: ExternalToast
    ) {
        notificationType === "default"
            ? toast(message, options)
            : toast[notificationType](message, options)
    }

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
                        const rando = getRandomNotification()
                        const message = rando.message
                        const options: ExternalToast = {
                            description: rando.description,
                            action: {
                                label: <CheckCheck size={14} />,
                                onClick: () => markAllAsRead(rando.id),
                            },
                        }
                        renderNotification(rando.type, message, options)
                        setNotifications((prev) => [...prev, rando])
                    }}
                >
                    Test
                </Button>
                <p className="truncate text-xs text-muted-foreground">
                    {`${greeting}, ${testUser.name.trim().split(/\s+/)[0]}!`}
                </p>
                <NavNotifications
                    data={notifications}
                    setData={setNotifications}
                />
                <NavUser user={testUser} />
            </section>
        </header>
    )
}
