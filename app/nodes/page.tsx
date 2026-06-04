"use client"

import { NodeItem, NodeResponse } from "@/types/nodes"
import { CardSkeleton, NodeCard } from "@/components/tile-card"
import { unwrapListResponse } from "@/lib/api"
import { useFetch } from "@/hooks/use-fetch"

export default function Page() {
    const {
        data: rawData,
        loading,
        error,
    } = useFetch("/api/nodes", {
        initialData: [] as NodeItem[],
        parse: (json) => unwrapListResponse(json as NodeResponse),
        errorMessage: "Could not load chart data.",
    })

    return (
        <div className="grid size-full min-h-0 grid-cols-1 grid-rows-[min-content] flex-col gap-grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading
                ? Array.from({ length: 16 }).map((_, index) => (
                      <CardSkeleton key={index} />
                  ))
                : rawData.map((entry, index) => (
                      <NodeCard key={index} data={entry} />
                  ))}
        </div>
    )
}
