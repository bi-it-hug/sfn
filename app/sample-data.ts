import { Notification } from "@/types/notification"

import { User } from "@/types/user"

const greetings = ["Good Morning", "Howdy", "Praise thee", "God be with you"]

const users: User[] = [
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
        type: "default",
        message: "Good Morning!",
        href: "#",
    },
    {
        type: "info",
        message: "Schissverfolgung",
        href: "#",
    },
    {
        type: "warning",
        message: "Schissverfolgung",
        href: "#",
    },
    {
        type: "error",
        message: "Schissverfolgung",
        href: "#",
    },
    {
        type: "success",
        message: "Schissverfolgung",
        href: "#",
    },
]

export { users, notifications, greetings }
