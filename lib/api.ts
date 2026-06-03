import type { CountItem, CountResponse } from "@/types/counts"

export function unwrapListResponse<T>(payload: T[] | { data?: T[] }): T[] {
    return Array.isArray(payload) ? payload : (payload?.data ?? [])
}

export function unwrapCountResponse(payload: CountResponse): CountItem | null {
    return "myPlants" in payload ? payload : (payload.data ?? null)
}
