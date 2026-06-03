type NodeItem = {
    id: number
    name: string
    uuid: string
    macAddress: string
    location: string
    ipAddress: string
    sensors: {
        id: number
        sensorChannel: number
        sensorTypeName: string
        sensorValue: number
        trend: number
        updatedAt: Date
        sensorTypeModel: {
            id: number
            type: string
            title: string
            unit: string
        }
        statusList: {
            id: number
            plantID: number
            sensorID: number
            status: string
        }[]
        macAddress: string
        ipAddress: string
        source: string
        device: string
        loggedAt: string
        fields: unknown | null
    }[]
    isActive: boolean
}

type NodeResponse = NodeItem[] | { data?: NodeItem[] }

export type { NodeItem, NodeResponse }
