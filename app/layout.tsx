"use client"

import { AppSidebarMenu } from "@/components/app-sidebar-menu"
import { SettingsDialog } from "@/components/settings-dialog"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Geist, Geist_Mono } from "next/font/google"
import { AppHeader } from "@/components/app-header"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import "@/app/globals.css"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

const fontSans = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
})

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
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
                <Toaster />
                <ThemeProvider>
                    <TooltipProvider>
                        <SidebarProvider>
                            <Sidebar collapsible="icon">
                                <SidebarContent>
                                    <SidebarGroup>
                                        <SidebarGroupLabel>
                                            Pages
                                        </SidebarGroupLabel>
                                        <AppSidebarMenu />
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
                                <AppHeader />
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
