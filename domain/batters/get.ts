/* Database Service */
import db from ":db"

/* Domain */
import transformFromDb from ":domain/batter/transform-from-db.ts"

/* Types */
import { type DbBatter } from ":types/batter.ts"

/* Local Type Definitions */
interface Filters {
    position?: string
    knownFreeAgents?: boolean
    expectedFreeAgents?: boolean
}

/* Behaviors */
function buildFilterQueryString(filters?: Filters): string | null {
    if (!filters) return null

    const filterStrings: string[] = []

    if (filters.position) {
        filterStrings.push(`yahoo_positions LIKE '%${filters.position}%'`)
    }

    if (filters.knownFreeAgents) {
        filterStrings.push(`yahoo_id IS NOT NULL AND current_fantasy_team LIKE '%FA%'`)
    }

    if (filters.expectedFreeAgents) {
        filterStrings.push(`(expected_fa = 1)`)
    }

    const filterQueryString = filterStrings.join(" AND ")

    return filterQueryString
}

/* Get All Batters */
function get(filters?: Filters) {
    const filtersQueryString = buildFilterQueryString(filters)

    const query = filtersQueryString ?
        `SELECT * FROM batters WHERE ${filtersQueryString}` :
        `SELECT * FROM batters`

    const result = db.query<DbBatter>(query)

    if (result?.length === 0) {
        throw new Error("No batters were found")
    }

    const batters = result.map(transformFromDb)
    const sortedBatters = batters.sort((a, b) => b.xwobaDev - a.xwobaDev)

    return sortedBatters
}

export default get
