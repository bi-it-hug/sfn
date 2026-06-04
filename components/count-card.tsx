import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

export function CountCard({
    data,
    title,
    loading,
}: {
    data: number | undefined
    title: string
    loading: boolean
}) {
    return (
        <Card className="@container/card">
            <CardHeader className="h-full">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {loading ? <Skeleton className="mx-auto h-9 w-34" /> : data}
                </CardTitle>
            </CardHeader>
        </Card>
    )
}
