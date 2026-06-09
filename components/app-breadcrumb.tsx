"use client"

import { getBreadcrumbTrail } from "@/lib/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function AppBreadcrumb() {
    const pathname = usePathname()
    const trail = getBreadcrumbTrail(pathname)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {trail.map((item, index) => {
                    const isLast = index === trail.length - 1

                    return (
                        <Fragment key={item.href}>
                            {index > 0 && <BreadcrumbSeparator />}
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>
                                            {item.name}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
