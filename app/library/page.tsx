"use client"

import { TopPlantCard, CardSkeleton } from "@/components/tile-card"
import { TopPlantItem, TopPlantResponse } from "@/types/top-plants"
import { unwrapListResponse } from "@/lib/api"
import { useFetch } from "@/hooks/use-fetch"

export default function Page() {
    const {
        data: rawData,
        loading,
        error,
    } = useFetch("/api/plant/top-plants", {
        initialData: [] as TopPlantItem[],
        parse: (json) => unwrapListResponse(json as TopPlantResponse),
        errorMessage: "Could not load chart data.",
    })

    return (
        <div className="grid size-full min-h-0 grid-cols-4 grid-rows-[min-content] flex-col gap-grid">
            {loading
                ? Array.from({ length: 16 }).map((_, index) => (
                      <CardSkeleton key={index} />
                  ))
                : rawData?.map((entry, index) => (
                      <TopPlantCard key={index} data={entry} />
                  ))}
        </div>
    )
}
