/* Database Service */
import db from ":db"

/* Domain */
import transformFromDb from ":domain/batter/transform-from-db.ts"

/* Types */
import { type DbBatter, type Batter } from ":types/batter.ts"

/* Get Sample Batter */
function get(incomplete: boolean = false): Batter {
    const incompleteQuerySegment = incomplete ? "NULL" : "NOT NULL"
    const query = `SELECT * FROM batters WHERE yahoo_id is ${incompleteQuerySegment} LIMIT 1`

    const result = db.query<DbBatter>(query)

    if (result?.length === 0) {
        throw new Error("No sample batters were found")
    }

    const rawSampleBatter = result[0]
    const sampleBatter = transformFromDb(rawSampleBatter)

    return sampleBatter
}

export default get
