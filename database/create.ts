/* Config */
import config from ":config"

/* Database Scehma */
import schema from "./structure/schema.ts"

/* Methods */
import promptToReplace from "./create/prompt-to-replace.ts"
import createTables from "./create/create-tables.ts"
import seedDatabase from "./create/seed.ts"

/* Create Dabase (Script) */
promptToReplace(config.dbInstances.dev)

try {
    const schemaQueries = schema.trim().split(";").filter(q => q.trim() !== "")
    createTables(schemaQueries)
} catch (e) {
    console.log('Error creating database, rolling back...')

    Deno.removeSync(config.dbInstances.dev)

    throw e
}

try {
    seedDatabase()
    
    console.log("Database seeded")
} catch (e) {
    throw e
}

console.log('Database creation complete')
