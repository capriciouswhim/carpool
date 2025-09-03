export interface PoolNumber {
    poolNumber: number,
    serialNumber: number,
    paused: boolean,
    called: Date,
    released: Date | null
}