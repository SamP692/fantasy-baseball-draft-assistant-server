/* Methods */
import seedBatters from "./seed/batters.ts"
import seedPitchers from "./seed/pitchers.ts"

/* Seed Database */
function seedDatabase() {
    seedBatters()

    seedPitchers()
}

export default seedDatabase
