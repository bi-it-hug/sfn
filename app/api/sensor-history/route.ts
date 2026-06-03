import { NextRequest, NextResponse } from "next/server"
import { proxySensorApiGet } from "@/lib/sensor-api"

export async function GET(request: NextRequest) {
    const sensorType = request.nextUrl.searchParams.get("sensorType")
    const dateFilter =
        request.nextUrl.searchParams.get("dateFilter") ?? "24+HOUR"
    const bucketSeconds =
        request.nextUrl.searchParams.get("bucketSeconds") ?? "600"

    if (!sensorType) {
        return NextResponse.json(
            { error: "sensorType is required." },
            { status: 400 }
        )
    }

    const upstreamParams = new URLSearchParams({
        sensorType,
        dateFilter: dateFilter.replaceAll("+", " "),
        bucketSeconds,
    })

    return proxySensorApiGet("/api/sensor-history", upstreamParams)
}
