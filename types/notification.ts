import { TAlert } from "@/types/altert-types"

export type TNotification = {
    id: number
    type: TAlert
    message: string
    description: string
    href: string
}
