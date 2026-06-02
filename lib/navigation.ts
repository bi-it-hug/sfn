import {
    LayoutDashboard,
    Library,
    Server,
    Sprout,
    type LucideIcon,
} from "lucide-react"

export type NavPage = {
    name: string
    href: string
    icon: LucideIcon
}

export const navPages: NavPage[] = [
    {
        name: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Plants",
        href: "/plants",
        icon: Sprout,
    },
    {
        name: "Library",
        href: "/library",
        icon: Library,
    },
    {
        name: "Nodes",
        href: "/nodes",
        icon: Server,
    },
]

export function getNavPageTitle(pathname: string): string {
    const page = navPages.find((p) => p.href === pathname)
    if (page) return page.name

    const segment = pathname.split("/").filter(Boolean).pop()
    if (!segment) return "Page"

    return segment.charAt(0).toUpperCase() + segment.slice(1)
}
