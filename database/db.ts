/* Libraries */
import { Database, type Database as IDatabase } from "sqlite"

/* Config */
import config from ":config"

/* Sub-Types */
type QueryParams = { [key: string]: string | number }

/* Database Service Definintion */
interface DBService {
    instance: IDatabase | null
    connect: () => void
    getConnection: () => IDatabase
    createTransaction: () => Database['transaction']
    execute: (query: string, params?: QueryParams) => number
    query: <ResponseType>(query: string, params?: QueryParams) => ResponseType
}

/* Database Service */
const db: DBService = {
    /* -- Connection */
    instance: null,
    connect: function() {
        const connection = new Database(config.dbInstances.dev)

        db.instance = connection
    },
    getConnection: function() {
        if (!db.instance) db.connect()

        return db.instance as IDatabase
    },
    
    /* -- Actions */
    createTransaction: function() {
        const connection = db.getConnection()
        
        return connection.transaction
    },
    execute: function(query: string, params?: QueryParams) {
        const connection = db.getConnection()
        
        const result = connection.exec(query, params)

        return result
    },
    query: function<ResponseType>(query: string, params?: QueryParams) {
        const connection = db.getConnection()

        const statement = connection.prepare(query)
        const result = statement.all(params)
        
        return result as ResponseType
    }
}

export default db
