import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const baseUrl = process.env.SENSOR_API_BASE_URL ?? process.env.BASE_URL
    const apiKey = process.env.SENSOR_API_KEY ?? process.env.API_KEY
    const accessToken =
        process.env.SENSOR_API_ACCESS_TOKEN ?? process.env.ACCESS_TOKEN

    if (!baseUrl || !apiKey || !accessToken) {
        return NextResponse.json(
            { error: "Missing sensor API environment variables." },
            { status: 500 }
        )
    }

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

    const normalizedDateFilter = dateFilter.replaceAll("+", " ")

    const upstreamParams = new URLSearchParams({
        sensorType,
        dateFilter: normalizedDateFilter,
        bucketSeconds,
    })

    const response = await fetch(
        `${baseUrl}/api/sensor-history?${upstreamParams.toString()}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                XApiKey: apiKey,
            },
            cache: "no-store",
        }
    )

    const body = await response.text()

    return new NextResponse(body, {
        status: response.status,
        headers: {
            "Content-Type":
                response.headers.get("Content-Type") ?? "application/json",
        },
    })
}
