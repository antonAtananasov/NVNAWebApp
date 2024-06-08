export interface Plan {
    id: number //not using uuid, because it is not unsafe for plans to be visible by an incremented number
    storage: number//in megabytes
    cost: number//in BGN
    planName: string
}