import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function AvatarUser({
    user,
}: {
    user: {
        name: string
        avatar: string
    }
}) {
    return (
        <Avatar className={cn(user.avatar && "bg-card", "size-8 rounded-full")}>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-full">CN</AvatarFallback>
        </Avatar>
    )
}
