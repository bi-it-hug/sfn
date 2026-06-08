import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"
import { User } from "@/types/user"

export function AvatarUser({ user }: { user: User }) {
    return (
        <Avatar className={cn(user.avatar && "bg-card", "size-8 rounded-full")}>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-full">
                {getInitials(user.name)}
            </AvatarFallback>
        </Avatar>
    )
}
