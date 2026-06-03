type MyPlantItem = {
    id: number
    plantID: number
    userId: number
    lastWateredAt: Date
    location: string
    plant: {
        id: number
        pid: string
        displayPid: string
        alias: string
        category: string
        maxLightMmol: number
        minLightMmol: number
        maxLightLux: number
        minLightLux: number
        maxTemp: number
        minTemp: number
        maxEnvHumid: number
        minEnvHumid: number
        maxSoilMoist: number
        minSoilMoist: number
        maxSoilEc: number
        minSoilEc: number
        imageUrl: string
        usageCount: number | null
    }
    sensorList: {
        id: number
        sensorChannel: number
        sensorTypeName: string
        sensorValue: number
        trend: number
        updatedAt: string
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
}

type MyPlantResponse = MyPlantItem[] | { data?: MyPlantItem[] }

export type { MyPlantItem, MyPlantResponse }
