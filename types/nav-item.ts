import type { LucideIcon } from "lucide-react"

export type NavItem = {
    name: string
    href: string
    icon: LucideIcon
    isActive: boolean
    subPages?: {
        name: string
        href: string
        icon: LucideIcon
    }[]
}
