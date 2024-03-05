/* Config */
import config from ":config"

/* Database Service */
import db from "./db.ts"

/* Database Scehma */
import schema from "./structure/schema.ts"

/* Methods */
import promptToReplace from "./create/prompt-to-replace.ts"

/* Create Dabase (Script) */
promptToReplace(config.dbInstances.dev)

try {
    const schemaQueries = schema.trim().split(";").filter(q => q.trim() !== "")

    schemaQueries.forEach((query) => {
        db.execute(query)
    })

    console.log('Database creation complete')
} catch (e) {
    console.log('Error creating database, rolling back...')

    Deno.removeSync(config.dbInstances.dev)

    throw e
}
