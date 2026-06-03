type SensorHistoryItem = {
    time: string
    value: number
    node: string
    unit: string
    sensorType: string
}

type SensorHistoryResponse =
    | SensorHistoryItem[]
    | { data?: SensorHistoryItem[] }

export type { SensorHistoryItem, SensorHistoryResponse }
