/* Database Server */
import db from ":db"

/* Domain */
import transformFromDb from ":domain/pitcher/transform-from-db.ts"

/* Types */
import { type DbPitcher } from ":types/pitcher.ts"

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

/* Get All Pitchers */
function get(filters?: Filters) {
    const filtersQueryString = buildFilterQueryString(filters)

    const query = filtersQueryString ?
        `SELECT * FROM pitchers WHERE ${filtersQueryString}` :
        `SELECT * FROM pitchers`

    const result = db.query<DbPitcher>(query)

    if (result?.length === 0) {
        throw new Error("No pitchers were found")
    }

    const batters = result.map(transformFromDb)

    return batters
}

export default get
