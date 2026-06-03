"use client"

import { CountItem, CountResponse } from "@/types/counts"
import { NodeTable } from "@/components/node-table"
import { CountCard } from "@/components/count-card"
import { Chart } from "@/components/chart"
import { useFetch } from "@/hooks/use-fetch"
import { unwrapCountResponse } from "@/lib/api"

export default function Page() {
    const { data: rawData } = useFetch("/api/statistics/counts", {
        initialData: null as CountItem | null,
        parse: (json) => unwrapCountResponse(json as CountResponse),
        errorMessage: "Could not load chart data.",
    })

    return (
        <div className="flex size-full min-h-0 flex-col gap-grid">
            <section className="grid h-[calc(100vh-var(--header-height)-var(--spacing-grid))] min-h-0 w-full shrink-0 grid-rows-2 gap-grid md:grid-cols-2">
                <Chart sensorType="temperature" />
                <Chart sensorType="humidity" />
                <Chart sensorType="moisture" />
                <Chart sensorType="co2" />
            </section>
            <section className="grid size-full gap-grid md:grid-cols-12">
                <section className="col-span-7">
                    <NodeTable />
                </section>
                <section className="col-span-5 grid size-full gap-grid md:grid-cols-2">
                    <CountCard data={rawData?.myPlants} title="Total Plants" />
                    <CountCard data={rawData?.nodes} title="Total Nodes" />
                    <CountCard data={rawData?.sensors} title="Total Sensors" />
                    <CountCard
                        data={rawData?.plants}
                        title="Total Plants in Library"
                    />
                </section>
            </section>
        </div>
    )
}
