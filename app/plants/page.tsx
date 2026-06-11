"use client"

import { MyPlantCard, CardSkeleton } from "@/components/tile-card"
import { MyPlantItem, MyPlantResponse } from "@/types/my-plants"
import { unwrapListResponse } from "@/lib/api"
import { useFetch } from "@/hooks/use-fetch"

export default function Page() {
    const {
        data: rawData,
        loading,
        error,
    } = useFetch("/api/my-plant", {
        initialData: [] as MyPlantItem[],
        parse: (json) => unwrapListResponse(json as MyPlantResponse),
        errorMessage: "Could not load chart data.",
    })

    return (
        <div className="grid size-full min-h-0 grid-cols-1 grid-rows-[min-content] flex-col gap-grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {error ? (
                <div className="no-data">No data.</div>
            ) : loading ? (
                Array.from({ length: 16 }).map((_, index) => (
                    <CardSkeleton key={index} />
                ))
            ) : (
                rawData.map((entry, index) => (
                    <MyPlantCard key={index} data={entry} />
                ))
            )}
        </div>
    )
}
