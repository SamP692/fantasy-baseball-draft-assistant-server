/* Database Service */
import db from ":db"

/* Domain */
import transformFromDb from ":domain/batter/transform-from-db.ts"

/* Types */
import { type DbBatter, type Batter } from ":types/batter.ts"

/**
 * Supported Filters
 *  - Position
 *  - Known Free Agents
 *  - Expected Free Agents (which includes known free agents)
 */
/* Local Type Definitions */
interface Filter {
    position?: string
    knownFreeAgents?: boolean
    expectedFreeAgents?: boolean
}

/* Behaviors */
function buildFilterQueryString(filters?: Filter[]): string | null {
    if (!filters) return null

    const filterStrings: string[] = []

    filters.forEach((filter) => {
        if (filter.position) {
            filterStrings.push(`position = '${filter.position}'`)
        }

        if (filter.knownFreeAgents) {
            filterStrings.push(`yahoo_id IS NOT NULL AND curent_fantasy_team LIKE %FA%`)
        }

        if (filter.expectedFreeAgents) {
            filterStrings.push(`expected_free_agent = 1`)
        }
    })

    const filterQueryString = filterStrings.join(" AND ")

    return filterQueryString
}

/* Get All Batters */
function get(filters?: Filter[]) {
    const filtersQueryString = buildFilterQueryString(filters)

    const query = filtersQueryString ?
        `SELECT * FROM batters WHERE ${filtersQueryString}` :
        `SELECT * FROM batters`

    const result = db.query<DbBatter>(query)

    if (result?.length === 0) {
        throw new Error("No batters were found")
    }

    const batters = result.map(transformFromDb)

    return batters
}

export default get
