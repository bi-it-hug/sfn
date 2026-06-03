import { TopPlantItem } from "@/types/top-plants"
import { MyPlantItem } from "@/types/my-plants"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplet, Plus } from "lucide-react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function MyPlantCard({ data }: { data: MyPlantItem }) {
    return (
        <Card className="relative h-fit w-full pt-0">
            <img
                src={data.plant.imageUrl}
                alt="Event cover"
                className="relative aspect-video w-full object-cover brightness-75 dark:brightness-75"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary" className="font-mono">
                        {new Date(data.lastWateredAt).toLocaleDateString(
                            "de-CH",
                            {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            }
                        )}
                    </Badge>
                </CardAction>
                <CardTitle>{data.plant.displayPid}</CardTitle>
                <CardDescription></CardDescription>
                <CardContent></CardContent>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">
                    <Droplet /> Water now
                </Button>
            </CardFooter>
        </Card>
    )
}

export function TopPlantCard({ data }: { data: TopPlantItem }) {
    return (
        <Card className="relative h-fit w-full pt-0">
            <img
                src={data.imageUrl}
                alt="Event cover"
                className="relative aspect-video w-full object-cover brightness-85 dark:brightness-85"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary" className="font-mono">
                        SAS
                    </Badge>
                </CardAction>
                <CardTitle>{data.displayPid}</CardTitle>
                <CardDescription></CardDescription>
                <CardContent></CardContent>
            </CardHeader>
            <CardFooter>
                <Button>
                    <Plus data-icon="inline-start" /> Add to Library
                </Button>
            </CardFooter>
        </Card>
    )
}
