"use client"

import { usePathname } from "next/navigation"
import { NavItem } from "@/types/nav-item"
import * as Lucide from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

export const pages: NavItem[] = [
    {
        name: "Dashboard",
        href: "/",
        icon: Lucide.LayoutDashboard,
        isActive: false,
    },
    {
        name: "Plants",
        href: "/plants",
        icon: Lucide.Sprout,
        isActive: false,
    },
    {
        name: "Library",
        href: "/library",
        icon: Lucide.Library,
        isActive: false,
    },
    {
        name: "Nodes",
        href: "/nodes",
        icon: Lucide.Server,
        isActive: false,
    },
    {
        name: "Docs",
        href: "/docs",
        icon: Lucide.File,
        isActive: false,
        subPages: [
            {
                name: "Schiss",
                href: "/docs/schiss",
                icon: Lucide.File,
            },
            {
                name: "Arvalto",
                href: "/docs/arvalto",
                icon: Lucide.Apple,
            },
        ],
    },
]

export function AppSidebarMenu() {
    const pathname = usePathname()

    return (
        <SidebarMenu className="gap-1">
            {pages.map((page, index) => {
                let isActive = pathname === page.href && "active"

                return page.subPages ? (
                    <Collapsible
                        key={index}
                        defaultOpen={page.isActive}
                        className="group/collapsible"
                        asChild
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    tooltip={page.name}
                                    className={cn(isActive)}
                                >
                                    {page.icon && <page.icon />}
                                    <span>{page.name}</span>
                                    <Lucide.ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub className="mr-0 gap-2 pt-1 pr-0">
                                    {page.subPages?.map((subPage, index) => {
                                        let isActive =
                                            pathname === subPage.href &&
                                            "active"

                                        return (
                                            <SidebarMenuSubItem key={index}>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    className={cn(isActive)}
                                                >
                                                    <Link href={subPage.href}>
                                                        {subPage.icon && (
                                                            <subPage.icon />
                                                        )}
                                                        <span>
                                                            {subPage.name}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )
                                    })}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ) : (
                    <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                            tooltip={page.name}
                            className={cn(isActive)}
                            asChild
                        >
                            <Link href={page.href}>
                                <page.icon />
                                <span>{page.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
    )
}
