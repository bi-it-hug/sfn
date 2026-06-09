import { pages } from "@/components/app-sidebar-menu"

export type BreadcrumbItem = {
    name: string
    href: string
}

export function getBreadcrumbTrail(pathname: string): BreadcrumbItem[] {
    const page = pages.find((p) => p.href === pathname)
    if (page) return [{ name: page.name, href: page.href }]

    for (const page of pages) {
        const subPage = page.subPages?.find((sp) => sp.href === pathname)
        if (subPage) {
            return [
                { name: page.name, href: page.href },
                { name: subPage.name, href: subPage.href },
            ]
        }
    }

    const segment = pathname.split("/").filter(Boolean).pop()
    if (!segment) return [{ name: "Page", href: pathname }]

    return [
        {
            name: segment.charAt(0).toUpperCase() + segment.slice(1),
            href: pathname,
        },
    ]
}
