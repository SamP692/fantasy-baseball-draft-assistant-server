/* Database Service */
import db from ":db"

/* Config */
import config from ":config"

/* Type Definitions */
import {
    type RawBatter,
    type RawBatterIncomplete,
    type DbBatter
} from ":types/batter.ts"

/* Behaviors */
/* -- Load Batter Seed Data */
function loadBatterSeedData() {
    const batterJson = Deno.readTextFileSync(`${config.seedData}/batters.json`)
    const batterRecords = JSON.parse(batterJson)

    return batterRecords as { mergedRecords: RawBatter[], unmatchedRecords: RawBatterIncomplete[] }
}

/* -- Flatten Batter Records */
function flattenBatterRecord(batterRecord: RawBatter): DbBatter {
    const flattenedRecord: DbBatter = {
        id: crypto.randomUUID(),
        name: batterRecord.fullName,
        savant_id: batterRecord.savantId,
        yahoo_id: batterRecord.yahooId,
        team: batterRecord.team,
        age: batterRecord.age,
        season: 2023,
        yahoo_positions: batterRecord.positions.join(";"),
        current_fantasy_team: batterRecord.currentFantasyTeam,
        confirmed_keeper: 0,
        expected_keeper: 0,
        expected_fa: 0,
        keeper_round: batterRecord.minimumKeeperRound === "FA" ? null : batterRecord.minimumKeeperRound,
        pa: batterRecord.data.pa,
        xba: batterRecord.data.xba,
        xwoba: batterRecord.data.xwoba,
        xiso: batterRecord.data.xiso,
        avg_exit_vel: batterRecord.data.avgExitVel,
        barrel_rate: batterRecord.data.barrelRate,
        chase_rate: batterRecord.data.chaseRate,
        whiff_rate: batterRecord.data.whiffRate,
        speed: batterRecord.data.speed
    }

    return flattenedRecord
}

/* -- Flatten Incomplete Batter Record */
function flattenIncompleteBatterRecord(batterRecord: RawBatterIncomplete): DbBatter {
    const flattenedRecord: DbBatter = {
        id: crypto.randomUUID(),
        name: batterRecord.fullName,
        savant_id: batterRecord.savantId,
        yahoo_id: null,
        team: null,
        age: batterRecord.age,
        season: 2023,
        yahoo_positions: null,
        current_fantasy_team: null,
        confirmed_keeper: 0,
        expected_keeper: 0,
        expected_fa: 0,
        keeper_round: null,
        pa: batterRecord.data.pa,
        xba: batterRecord.data.xba,
        xwoba: batterRecord.data.xwoba,
        xiso: batterRecord.data.xiso,
        avg_exit_vel: batterRecord.data.avgExitVel,
        barrel_rate: batterRecord.data.barrelRate,
        chase_rate: batterRecord.data.chaseRate,
        whiff_rate: batterRecord.data.whiffRate,
        speed: batterRecord.data.speed
    }

    return flattenedRecord
}

/* Seed Database */
function seedDatabase() {
    const dbInstance = db.getConnection()

    const insertBatterStatement = dbInstance.prepare(`
        INSERT INTO batters (
            id,
            name,
            savant_id,
            yahoo_id,
            team,
            age,
            season,
            yahoo_positions,
            current_fantasy_team,
            confirmed_keeper,
            expected_keeper,
            expected_fa,
            keeper_round,
            pa,
            xba,
            xwoba,
            xiso,
            avg_exit_vel,
            barrel_rate,
            chase_rate,
            whiff_rate,
            speed
        ) VALUES (
            :id,
            :name,
            :savant_id,
            :yahoo_id,
            :team,
            :age,
            :season,
            :yahoo_positions,
            :current_fantasy_team,
            :confirmed_keeper,
            :expected_keeper,
            :expected_fa,
            :keeper_round,
            :pa,
            :xba,
            :xwoba,
            :xiso,
            :avg_exit_vel,
            :barrel_rate,
            :chase_rate,
            :whiff_rate,
            :speed
        )
    `)

    const { mergedRecords, unmatchedRecords } = loadBatterSeedData()
    const flattenedCompleteRecords = mergedRecords.map(flattenBatterRecord)
    const flattenedIncompleteRecords = unmatchedRecords.map(flattenIncompleteBatterRecord)

    const flattenedRecords = [...flattenedCompleteRecords, ...flattenedIncompleteRecords]

    const insertBatterRecords = dbInstance.transaction((batterRecords: DbBatter[]) => {
        for (const batterRecord of batterRecords) {
            insertBatterStatement.run(batterRecord)
        }
    })

    insertBatterRecords(flattenedRecords)
}

export default seedDatabase
