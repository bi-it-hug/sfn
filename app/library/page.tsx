"use client"

import { TopPlantItem, TopPlantResponse } from "@/types/top-plants"
import { TopPlantCard } from "@/components/plant-card"
import { unwrapListResponse } from "@/lib/api"
import { useFetch } from "@/hooks/use-fetch"

export default function Page() {
    const { data: rawData } = useFetch("/api/plant/top-plants", {
        initialData: [] as TopPlantItem[],
        parse: (json) => unwrapListResponse(json as TopPlantResponse),
        errorMessage: "Could not load chart data.",
    })
    return (
        <div className="grid size-full min-h-0 grid-cols-4 flex-col gap-grid">
            {rawData?.map((entry, index) => (
                <TopPlantCard key={index} data={entry} />
            ))}
        </div>
    )
}
