import { SampleTable } from "@/components/sample-table"
import { SampleChart } from "@/components/sample-chart"
import { SampleCard } from "@/components/sample-card"

export default function Page() {
    return (
        <div className="flex size-full min-h-0 flex-col gap-grid">
            <section className="grid h-[calc(100vh-var(--header-height)-var(--spacing-grid))] min-h-0 w-full shrink-0 grid-rows-2 gap-grid md:grid-cols-2">
                <SampleChart />
                <SampleChart />
                <SampleChart />
                <SampleChart />
            </section>
            <section className="grid size-full gap-grid md:grid-cols-12">
                <section className="col-span-7">
                    <SampleTable />
                </section>
                <section className="col-span-5 grid size-full gap-grid md:grid-cols-2">
                    <SampleCard />
                    <SampleCard />
                    <SampleCard />
                    <SampleCard />
                </section>
            </section>
        </div>
    )
}
