import type { User } from "@/types/user"

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

export { users, greetings }
