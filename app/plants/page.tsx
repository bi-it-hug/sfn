"use client"

import { MyPlantItem, MyPlantResponse } from "@/types/my-plants"
import { MyPlantCard } from "@/components/plant-card"
import { useFetch } from "@/hooks/use-fetch"
import { unwrapListResponse } from "@/lib/api"

export default function Page() {
    const { data: rawData } = useFetch("/api/my-plant", {
        initialData: [] as MyPlantItem[],
        parse: (json) => unwrapListResponse(json as MyPlantResponse),
        errorMessage: "Could not load chart data.",
    })
    return (
        <div className="grid size-full min-h-0 grid-cols-4 flex-col gap-grid">
            {rawData.map((entry, index) => (
                <MyPlantCard key={index} data={entry} />
            ))}
        </div>
    )
}
