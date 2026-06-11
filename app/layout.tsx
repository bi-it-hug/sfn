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
    SidebarInset,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { BadgeX } from "lucide-react"

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
                <div className="fixed inset-0 z-10 m-auto grid size-96 grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] justify-center items-center gap-2 rounded-xl border bg-card p-4">
                    <BadgeX
                        size={16}
                        className="col-start-1 col-end-2 row-start-1 row-end-2"
                    />
                    <span className="col-start-2 col-end-3 row-start-1 row-end-1 h-fit text-sm">
                        Title
                    </span>
                    <span className="col-start-2 col-end-3 row-span-2 row-start-2 row-end-3 h-fit text-xs">
                        Lorem ipsum dolor sit amet.
                    </span>
                </div>
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
