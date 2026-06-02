"use client"

import { getNavPageTitle } from "@/lib/navigation"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export function AppBreadcrumb() {
    const pathname = usePathname()
    const title = getNavPageTitle(pathname)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
