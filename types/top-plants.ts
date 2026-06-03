type TopPlantItem = {
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
    usageCount: number
}

type TopPlantResponse = TopPlantItem[] | { data?: TopPlantItem[] }

export type { TopPlantItem, TopPlantResponse }
