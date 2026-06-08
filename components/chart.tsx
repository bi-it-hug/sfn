"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBreakpoints } from "@/hooks/use-mobile"
import { Skeleton } from "@/components/ui/skeleton"
import { unwrapListResponse } from "@/lib/api"
import { useFetch } from "@/hooks/use-fetch"
import { useMemo, useState } from "react"
import type {
    SensorHistoryItem,
    SensorHistoryResponse,
} from "@/types/sensor-history"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"

const REFRESH_INTERVAL_MS = 10 * 60 * 1000

const TIME_RANGE_OPTIONS = [
    { value: "24h", label: "24 hours", dateFilter: "24+HOUR" },
    { value: "7d", label: "7 days", dateFilter: "7+DAY" },
    { value: "30d", label: "30 days", dateFilter: "30+DAY" },
    { value: "365d", label: "1 year", dateFilter: "365+DAY" },
] as const

type TimeRange = (typeof TIME_RANGE_OPTIONS)[number]["value"]

function getDateFilter(timeRange: TimeRange) {
    return TIME_RANGE_OPTIONS.find((option) => option.value === timeRange)
        ?.dateFilter
}

function formatChartTick(value: string, timeRange: TimeRange) {
    const date = new Date(value)
    if (timeRange === "24h") {
        return date.toLocaleTimeString("de-CH", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }
    return date.toLocaleDateString("de-CH", {
        month: "short",
        day: "numeric",
    })
}

function getYDomain(
    chartData: Record<string, number | string>[],
    nodes: string[],
    paddingRatio = 0.15
): [number, number] {
    const values: number[] = []

    for (const point of chartData) {
        for (const node of nodes) {
            const value = point[node]
            if (typeof value === "number" && !Number.isNaN(value)) {
                values.push(value)
            }
        }
    }

    if (values.length === 0) {
        return [0, 1]
    }

    const min = Math.min(...values)
    const max = Math.max(...values)

    if (min === max) {
        const pad = Math.abs(min) * 0.1 || 1
        return [min - pad, max + pad]
    }

    const range = max - min
    const pad = range * paddingRatio
    return [min - pad, max + pad]
}

function formatChartTooltipLabel(value: string, timeRange: TimeRange) {
    const date = new Date(value)
    if (timeRange === "24h") {
        return date.toLocaleString("de-CH", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }
    return date.toLocaleDateString("de-CH", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

function roundToMaxOneDecimal(value: number) {
    return Math.round(value * 10) / 10
}

export function Chart({
    sensorType,
    bucketSeconds = 600,
}: {
    sensorType: string
    bucketSeconds?: number
}) {
    const [timeRange, setTimeRange] = useState<TimeRange>("24h")
    const { lg } = useBreakpoints()

    const dateFilter = getDateFilter(timeRange)
    const selectedRangeLabel =
        TIME_RANGE_OPTIONS.find((option) => option.value === timeRange)
            ?.label ?? "selected range"

    const historyUrl = useMemo(() => {
        if (!dateFilter) return null
        const params = new URLSearchParams({
            sensorType,
            bucketSeconds: String(bucketSeconds),
            dateFilter,
        })
        return `/api/sensor-history?${params.toString()}`
    }, [sensorType, dateFilter, bucketSeconds])

    const {
        data: rawData,
        loading,
        error,
    } = useFetch(historyUrl, {
        initialData: [] as SensorHistoryItem[],
        parse: (json) => unwrapListResponse(json as SensorHistoryResponse),
        errorMessage: "Could not load chart data.",
        refreshInterval: REFRESH_INTERVAL_MS,
    })

    const nodes = useMemo(() => {
        return [...new Set(rawData.map((item) => item.node))]
    }, [rawData])

    const chartData = useMemo(() => {
        const grouped = new Map<string, Record<string, number | string>>()

        for (const item of rawData) {
            const point = grouped.get(item.time) ?? { time: item.time }
            point[item.node] = roundToMaxOneDecimal(item.value)
            grouped.set(item.time, point)
        }

        return [...grouped.values()].sort(
            (a, b) =>
                new Date(String(a.time)).getTime() -
                new Date(String(b.time)).getTime()
        )
    }, [rawData])

    const chartConfig = useMemo(() => {
        const config = Object.fromEntries(
            nodes.map((node, index) => [
                node,
                {
                    label: node,
                    color: `var(--chart-${(index % 5) + 1})`,
                },
            ])
        )
        return config satisfies ChartConfig
    }, [nodes])

    const yDomain = useMemo(
        () => getYDomain(chartData, nodes),
        [chartData, nodes]
    )

    const sensorLabel = sensorType.charAt(0).toUpperCase() + sensorType.slice(1)
    const unit = rawData[0]?.unit?.trim()

    return (
        <Card className="flex h-full min-h-0 flex-col pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>{sensorLabel}</CardTitle>
                    <CardDescription>
                        {loading ? (
                            <Skeleton className="h-5 w-18" />
                        ) : error ? (
                            error
                        ) : (
                            `${nodes.length} sensor${nodes.length > 1 ? "s" : ""}`
                        )}
                    </CardDescription>
                </div>
                {lg ? (
                    <Tabs
                        defaultValue={timeRange}
                        onValueChange={(value) =>
                            setTimeRange(value as TimeRange)
                        }
                    >
                        <TabsList className="flex-row-reverse">
                            {TIME_RANGE_OPTIONS.map((option, index) => (
                                <TabsTrigger key={index} value={option.value}>
                                    {option.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                ) : (
                    <Select
                        value={timeRange}
                        onValueChange={(value) =>
                            setTimeRange(value as TimeRange)
                        }
                    >
                        <SelectTrigger
                            aria-label="Select time range"
                            className="w-full max-w-36"
                        >
                            <SelectValue placeholder={selectedRangeLabel} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Time Range</SelectLabel>
                                {TIME_RANGE_OPTIONS.map((option, index) => (
                                    <SelectItem
                                        key={index}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            </CardHeader>
            <CardContent className="min-h-0 flex-1 px-2 pt-4 sm:px-4 sm:pt-4">
                {loading ? (
                    <Skeleton className="aspect-auto size-full min-h-0 rounded-lg" />
                ) : chartData.length === 0 ? (
                    <div className="no-data">No data available.</div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto size-full min-h-0"
                    >
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            // margin={{
                            //     left: 12,
                            //     right: 12,
                            // }}
                        >
                            <CartesianGrid vertical={false} />
                            <YAxis
                                domain={yDomain}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                width={44}
                                niceTicks="none"
                                scale="linear"
                                tickFormatter={(value) =>
                                    Number(value).toLocaleString("de-CH", {
                                        maximumFractionDigits: 1,
                                    }) + (unit === "%" ? unit : ` ${unit}`)
                                }
                            />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                niceTicks="auto"
                                tickFormatter={(value) =>
                                    formatChartTick(String(value), timeRange)
                                }
                            />

                            <ChartTooltip
                                cursor={true}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) =>
                                            formatChartTooltipLabel(
                                                String(value),
                                                timeRange
                                            )
                                        }
                                        indicator="dot"
                                        className="min-w-50"
                                    />
                                }
                            />
                            <defs>
                                {nodes.map((node) => (
                                    <linearGradient
                                        key={`fill-${node}`}
                                        id={`fill-${node}`}
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor={`var(--color-${node})`}
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={`var(--color-${node})`}
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                ))}
                            </defs>
                            {nodes.map((node) => (
                                <Area
                                    key={node}
                                    dataKey={node}
                                    type="natural"
                                    fill={`url(#fill-${node})`}
                                    fillOpacity={0.4}
                                    stroke={`var(--color-${node})`}
                                    connectNulls
                                />
                            ))}
                            {nodes.length > 1 ? (
                                <ChartLegend content={<ChartLegendContent />} />
                            ) : null}
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
