import { cn, getPercentage, randomInt } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { TopPlantItem } from "@/types/top-plants"
import { MyPlantItem } from "@/types/my-plants"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NodeItem } from "@/types/nodes"
import {
    Droplet,
    Edit,
    FileText,
    GlobeCheck,
    GlobeOff,
    Plus,
    Trash,
} from "lucide-react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function CardSkeleton() {
    return (
        <Card className="relative h-fit w-full pt-0">
            <Skeleton className="relative aspect-video w-full object-cover" />
            <CardHeader>
                <CardAction>
                    <Skeleton className="h-5 w-22.5 rounded-full" />
                </CardAction>
                <CardTitle>
                    <Skeleton className="h-5.5 w-32" />
                </CardTitle>
            </CardHeader>
            <CardFooter>
                <Skeleton className="h-8 w-full" />
            </CardFooter>
        </Card>
    )
}

export function MyPlantCard({ data }: { data: MyPlantItem }) {
    const values = [
        {
            min: data.plant.minEnvHumid,
            max: data.plant.maxEnvHumid,
        },
        {
            min: data.plant.minLightLux,
            max: data.plant.maxLightLux,
        },
        {
            min: data.plant.minLightMmol,
            max: data.plant.minLightMmol,
        },
        {
            min: data.plant.minSoilEc,
            max: data.plant.maxSoilEc,
        },
        {
            min: data.plant.minSoilMoist,
            max: data.plant.maxSoilMoist,
        },
        {
            min: data.plant.minTemp,
            max: data.plant.maxTemp,
        },
    ]

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
                <CardDescription>{data.plant.alias}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="gap-y-0-0 grid grid-cols-[auto_1fr_auto] items-center justify-center gap-x-2">
                    {values.map((entry, index) => (
                        <PlantValues
                            key={index}
                            min={entry.min}
                            max={entry.max}
                            row={`row-start-${index + 1} row-end-${index + 2}`}
                        />
                    ))}
                </div>
            </CardContent>
            <CardFooter className="gap-1">
                <Button variant="destructive" size="icon">
                    <Trash data-icon="inline-start" />
                </Button>
                <Button variant="default" size="icon">
                    <Edit data-icon="inline-start" />
                </Button>
                <Button variant="default" size="icon">
                    <Droplet data-icon="inline-start" />
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

export function NodeCard({ data }: { data: NodeItem }) {
    const ActiveIcon = data.isActive ? GlobeCheck : GlobeOff

    return (
        <Card className="h-fit w-full">
            <CardHeader>
                <CardAction>
                    <Badge
                        variant={data.isActive ? "secondary" : "destructive"}
                    >
                        <ActiveIcon data-icon="inlin-start" />
                        {data.isActive ? "Online" : "Offline"}
                    </Badge>
                </CardAction>
                <CardTitle>
                    {data.name === "" ? "Empty" : data.name}{" "}
                    {data.id === null ? "Empty" : `#${data.id}`}
                </CardTitle>
                <CardDescription>
                    {data.ipAddress === "" ? "Empty" : data.ipAddress}
                </CardDescription>
                <CardContent></CardContent>
            </CardHeader>
            <CardFooter>
                <Button>
                    <FileText data-icon="inline-start" /> Details
                </Button>
            </CardFooter>
        </Card>
    )
}

function ValueIndicator({
    value,
    min,
    max,
}: {
    value: number
    min: number
    max: number
}) {
    const width = getPercentage(value, min, max)

    return (
        <div className="group flex h-6 w-full items-center justify-center">
            <div className="h-1 w-full rounded-full bg-muted">
                <div
                    className="relative h-full rounded-full bg-foreground"
                    style={{ width: `${width}%` }}
                >
                    <div
                        className={cn(
                            "absolute inset-0 my-auto flex size-2 items-center justify-center rounded-full bg-foreground text-center font-mono leading-none text-transparent transition-[width,height,padding]",
                            "group-hover:text-background",
                            "group-hover:rounded-sm",
                            "group-hover:size-fit",
                            "group-hover:text-xs",
                            "group-hover:py-0.5",
                            "group-hover:px-1",
                            Number.isNaN(width) || width >= 90
                                ? "right-0! left-[unset]!"
                                : "left-[calc(100%-4px)]!"
                        )}
                    >
                        {value}
                    </div>
                </div>
            </div>
        </div>
    )
}

function PlantValues({
    min,
    max,
    row,
}: {
    min:
        | MyPlantItem["plant"]["minEnvHumid"]
        | MyPlantItem["plant"]["minLightLux"]
        | MyPlantItem["plant"]["minLightMmol"]
        | MyPlantItem["plant"]["minSoilEc"]
        | MyPlantItem["plant"]["minSoilMoist"]
        | MyPlantItem["plant"]["minTemp"]
    max:
        | MyPlantItem["plant"]["maxEnvHumid"]
        | MyPlantItem["plant"]["maxLightLux"]
        | MyPlantItem["plant"]["maxLightMmol"]
        | MyPlantItem["plant"]["maxSoilEc"]
        | MyPlantItem["plant"]["maxSoilMoist"]
        | MyPlantItem["plant"]["maxTemp"]
    row: string
}) {
    const randomValue = randomInt(min, max)

    return (
        <>
            <span
                className={cn(
                    "col-start-1 col-end-2 text-right font-mono text-xs",
                    row
                )}
            >
                {min}
            </span>
            <ValueIndicator value={randomValue} min={min} max={max} />
            <span
                className={cn(
                    "col-start-3 col-end-4 text-left font-mono text-xs",
                    row
                )}
            >
                {max}
            </span>
        </>
    )
}
