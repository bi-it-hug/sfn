import { NextResponse } from "next/server"

type SensorApiConfig = {
    baseUrl: string
    apiKey: string
    accessToken: string
}

function readSensorApiConfig(): SensorApiConfig | null {
    const baseUrl = process.env.SENSOR_API_BASE_URL ?? process.env.BASE_URL
    const apiKey = process.env.SENSOR_API_KEY ?? process.env.API_KEY
    const accessToken =
        process.env.SENSOR_API_ACCESS_TOKEN ?? process.env.ACCESS_TOKEN

    if (!baseUrl || !apiKey || !accessToken) {
        return null
    }

    return { baseUrl, apiKey, accessToken }
}

function missingConfigResponse() {
    return NextResponse.json(
        { error: "Missing sensor API environment variables." },
        { status: 500 }
    )
}

export async function proxySensorApiGet(
    upstreamPath: string,
    searchParams?: URLSearchParams
) {
    const config = readSensorApiConfig()
    if (!config) {
        return missingConfigResponse()
    }

    const url = searchParams
        ? `${config.baseUrl}${upstreamPath}?${searchParams.toString()}`
        : `${config.baseUrl}${upstreamPath}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.accessToken}`,
            XApiKey: config.apiKey,
        },
        cache: "no-store",
    })

    const body = await response.text()

    return new NextResponse(body, {
        status: response.status,
        headers: {
            "Content-Type":
                response.headers.get("Content-Type") ?? "application/json",
        },
    })
}

export function createSensorApiGetHandler(upstreamPath: string) {
    return function GET() {
        return proxySensorApiGet(upstreamPath)
    }
}
