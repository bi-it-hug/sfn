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
    error,
}: {
    data: number | undefined
    title: string
    loading: boolean
    error: string | null
}) {
    return (
        <Card className="@container/card">
            <CardHeader className="h-full">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-center text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {error ? (
                        <div className="no-data">No data available.</div>
                    ) : loading ? (
                        <Skeleton className="mx-auto h-9 w-34" />
                    ) : (
                        data?.toLocaleString("de-CH")
                    )}
                </CardTitle>
            </CardHeader>
        </Card>
    )
}
