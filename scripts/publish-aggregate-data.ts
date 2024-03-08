/* Libaries */
import * as math from "math"

/* Configs */
import config from ":config"

/* Services */
import databaseService from ":db"

/* Local Types */
interface DataPointStats {
    batting: {
        [key: string]: { mean: number, stdDev: number }
    }
    pitching: {
        [key: string]: { mean: number, stdDev: number }
    }
}

/* Data Points */
const batterDataPoints = [
    "xba",
    "xiso",
    "avg_exit_vel",
    "barrel_rate",
    "chase_rate",
    "whiff_rate",
    "speed",
    "xwoba"
]

const pitcherDataPoints = [
    "xba",
    "xwoba",
    "xiso",
    "avg_exit_vel",
    "barrel_rate",
    "zone_rate",
    "chase_rate",
    "whiff_rate",
    "fb_rate",
    "fb_spin",
    "brk_rate",
    "brk_spin",
    "os_rate",
    "os_spin"
]

/* Script */
const dataQueries = {
    batting: batterDataPoints,
    pitching: pitcherDataPoints
}

const dataPointStats: DataPointStats = {
    batting: {},
    pitching: {}
}

Object.entries(dataQueries).forEach(([set, dataPointCollection]) => {
    const tableName = set === "batting" ? "batters" : "pitchers"

    dataPointCollection.forEach((dataPoint) => {
        const query = `SELECT ${dataPoint} FROM ${tableName}`
        const result = databaseService.query<{ [key: string]: number }>(query)

        const rawValues = result.map((row) => row[dataPoint])
        const values = rawValues.filter((value) => value !== null && value !== undefined)

        try {
            const mean = math.mean(values)
            const stdDev = math.std(values) as unknown as number

            const typeSafeKey = set as "batting" | "pitching"

            dataPointStats[typeSafeKey][dataPoint] = {
                mean,
                stdDev
            }
        } catch (_) {
            throw new Error(`Failed to calculate ${dataPoint} for ${set}`)
        }
    })
})

const fileName = "data-point-aggregations.json"
const filePath = `${config.staticData}/${fileName}`

const fileContents = JSON.stringify(dataPointStats, null, 2)

Deno.writeTextFileSync(filePath, fileContents)

console.log("Aggregate data successfully published")
