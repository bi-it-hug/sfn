import { AlertType } from "@/types/altert-types"

export type Notification = {
    type: AlertType
    message: string
    href: string
}
