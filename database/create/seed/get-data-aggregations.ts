/* Config */
import config from ":config"

/* Aggregations Shape */
interface Aggregations {
    batting: {
        [key: string]: {
            mean: number,
            stdDev: number
        }
    }
    pitching: {
        [key: string]: {
            mean: number,
            stdDev: number
        }
    }
}

/* Get Data Aggregations */
function getDataAggregations(type: "batting" | "pitching") {
    const aggregationDataJson = Deno.readTextFileSync(`${config.staticData}/data-point-aggregations.json`)
    const aggregationData = JSON.parse(aggregationDataJson) as Aggregations

    return aggregationData[type]
}

export default getDataAggregations
