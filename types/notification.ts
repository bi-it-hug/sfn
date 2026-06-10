import { AlertType } from "@/types/altert-types"

export type TNotification = {
    id: number
    type: AlertType
    message: string
    href: string
}
