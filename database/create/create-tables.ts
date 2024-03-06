/* Database Service */
import db from ":db"

/* Create Tables */
function createTables(tableCreationQueries: string[]) {
    try{
        tableCreationQueries.forEach((query) => {
            db.execute(query)
        })
    
        console.log('Tables successfully created')    
    } catch (error) {
        throw error
    }
}

export default createTables
