/* Libraries */
import { Database, type Database as IDatabase } from "sqlite"

/* Config */
import config from ":config"

/* Database Service Definintion */
interface DBService {
    instance: IDatabase | null
    connect: () => void
    ensureConnection: <ActionResponse>(action: (instance: IDatabase) => ActionResponse) => void
}

/* Database Service */
const db: DBService = {
    /* -- Connection */
    instance: null,
    connect: function() {
        const connection = new Database(config.dbInstances.dev)

        db.instance = connection
    },
    ensureConnection: function<ActionResponse>(action: (instance: IDatabase) => ActionResponse) {
        if (!db.instance) db.connect()

        return action(db.instance as IDatabase)
    }

    /* -- Actions */
}

export default db
