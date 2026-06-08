import { Notification } from "@/types/notification"
import { User } from "@/types/user"

const greetings = ["Good Morning", "Howdy", "Praise thee", "God be with you"]

const user: User[] = [
    {
        id: 1,
        name: "Lorenzo Hug",
        email: "lorenzo.hug@icloud.com",
        role: "admin",
        avatar: "/pb.png",
    },
    {
        id: 2,
        name: "Shejma Mustafi",
        email: "shejma.mustafi@icloud.com",
        role: "admin",
        avatar: "",
    },
]

const notifications: Notification[] = [
    {
        level: "default",
        message: "Good Morning!",
        href: "#",
    },
    {
        level: "info",
        message: "Schissverfolgung",
        href: "#",
    },
    {
        level: "warning",
        message: "Schissverfolgung",
        href: "#",
    },
    {
        level: "critical",
        message: "Schissverfolgung",
        href: "#",
    },
    {
        level: "success",
        message: "Schissverfolgung",
        href: "#",
    },
]

export { user, notifications, greetings }
