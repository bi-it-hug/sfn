export type User = {
    id: number
    name: string
    email: string
    role: "admin" | "user"
    avatar?: string | undefined
}
