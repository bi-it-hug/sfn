"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AppBreadcrumb } from "@/components/app-breadcrumb"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Geist, Geist_Mono } from "next/font/google"
import { NavUser } from "@/components/nav-user"
import { usePathname } from "next/navigation"
import { navPages } from "@/lib/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import "@/app/globals.css"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { SettingsDialog } from "@/components/settings-dialog"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

const user = {
    name: "Lorenzo Hug",
    email: "lorenzo.hug@icloud.com",
    avatar: "/pb.png",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

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
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                fontMono.variable,
                fontSans.variable,
                "font-sans antialiased"
            )}
        >
            <body>
                <ThemeProvider>
                    <TooltipProvider>
                        <SidebarProvider>
                            <Sidebar collapsible="icon">
                                <SidebarContent>
                                    <SidebarGroup>
                                        <SidebarGroupLabel>
                                            Pages
                                        </SidebarGroupLabel>
                                        <SidebarMenu className="gap-1">
                                            {navPages.map((page) => (
                                                <SidebarMenuItem
                                                    key={page.name}
                                                >
                                                    <SidebarMenuButton
                                                        tooltip={page.name}
                                                        className={
                                                            pathname ===
                                                            page.href
                                                                ? "active"
                                                                : undefined
                                                        }
                                                        asChild
                                                    >
                                                        <Link href={page.href}>
                                                            <page.icon />
                                                            <span>
                                                                {page.name}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroup>
                                </SidebarContent>
                                <SidebarFooter>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SettingsDialog />
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarFooter>
                            </Sidebar>
                            <SidebarInset>
                                <header
                                    className={cn(
                                        "sticky top-0 z-1 flex h-16 shrink-0 items-center justify-between gap-2 px-4 py-2 transition-[width,height,background-color] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
                                        isScrolled
                                            ? "bg-background"
                                            : "bg-transparent"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <SidebarTrigger className="-ml-1" />
                                        <Separator
                                            orientation="vertical"
                                            className="self mr-2 h-4 self-center!"
                                        />
                                    </div>
                                    <div className="flex w-full items-center justify-start gap-2">
                                        <AppBreadcrumb />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <NavUser user={user} />
                                    </div>
                                </header>
                                <main className="flex min-h-0 w-full flex-1 flex-col px-grid pb-grid">
                                    {children}
                                </main>
                            </SidebarInset>
                        </SidebarProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
