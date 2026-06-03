type CountItem = {
    myPlants: number
    plants: number
    nodes: number
    sensors: number
}

type CountResponse = CountItem | { data?: CountItem }

export type { CountItem, CountResponse }
