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

/* Data Aggregations */
import getDataAggregations from "./get-data-aggregations.ts"
const battingAggregations = getDataAggregations("batting")

/* Behaviors */
/* -- Load Batter Seed Data */
function loadBatterSeedData() {
    const batterJson = Deno.readTextFileSync(`${config.seedData}/batters.json`)
    const batterRecords = JSON.parse(batterJson)

    return batterRecords as { mergedRecords: RawBatter[], unmatchedRecords: RawBatterIncomplete[] }
}

/* -- Calculate Standard Deviations from the Mean */
function calculateStandardDeviations(value: number, key: string) {
    const { mean, stdDev } = battingAggregations[key]

    const deviationsFromTheMean = (value - mean) / stdDev

    return deviationsFromTheMean
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
        expected_fa: 1,
        keeper_round: batterRecord.minimumKeeperRound === "FA" ? null : batterRecord.minimumKeeperRound,
        pa: batterRecord.data.pa,
        xba: batterRecord.data.xba,
        xwoba: batterRecord.data.xwoba,
        xiso: batterRecord.data.xiso,
        avg_exit_vel: batterRecord.data.avgExitVel,
        barrel_rate: batterRecord.data.barrelRate,
        chase_rate: batterRecord.data.chaseRate,
        whiff_rate: batterRecord.data.whiffRate,
        speed: batterRecord.data.speed,
        xba_dev: calculateStandardDeviations(batterRecord.data.xba, "xba"),
        xwoba_dev: calculateStandardDeviations(batterRecord.data.xwoba, "xwoba"),
        xiso_dev: calculateStandardDeviations(batterRecord.data.xiso, "xiso"),
        avg_exit_vel_dev: calculateStandardDeviations(batterRecord.data.avgExitVel, "avg_exit_vel"),
        barrel_rate_dev: calculateStandardDeviations(batterRecord.data.barrelRate, "barrel_rate"),
        chase_rate_dev: calculateStandardDeviations(batterRecord.data.chaseRate, "chase_rate"),
        whiff_rate_dev: calculateStandardDeviations(batterRecord.data.whiffRate, "whiff_rate"),
        speed_dev: calculateStandardDeviations(batterRecord.data.speed, "speed")
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
        expected_fa: 1,
        keeper_round: null,
        pa: batterRecord.data.pa,
        xba: batterRecord.data.xba,
        xwoba: batterRecord.data.xwoba,
        xiso: batterRecord.data.xiso,
        avg_exit_vel: batterRecord.data.avgExitVel,
        barrel_rate: batterRecord.data.barrelRate,
        chase_rate: batterRecord.data.chaseRate,
        whiff_rate: batterRecord.data.whiffRate,
        speed: batterRecord.data.speed,
        xba_dev: calculateStandardDeviations(batterRecord.data.xba, "xba"),
        xwoba_dev: calculateStandardDeviations(batterRecord.data.xwoba, "xwoba"),
        xiso_dev: calculateStandardDeviations(batterRecord.data.xiso, "xiso"),
        avg_exit_vel_dev: calculateStandardDeviations(batterRecord.data.avgExitVel, "avg_exit_vel"),
        barrel_rate_dev: calculateStandardDeviations(batterRecord.data.barrelRate, "barrel_rate"),
        chase_rate_dev: calculateStandardDeviations(batterRecord.data.chaseRate, "chase_rate"),
        whiff_rate_dev: calculateStandardDeviations(batterRecord.data.whiffRate, "whiff_rate"),
        speed_dev: calculateStandardDeviations(batterRecord.data.speed, "speed")
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
            speed,
            xba_dev,
            xwoba_dev,
            xiso_dev,
            avg_exit_vel_dev,
            barrel_rate_dev,
            chase_rate_dev,
            whiff_rate_dev,
            speed_dev
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
            :speed,
            :xba_dev,
            :xwoba_dev,
            :xiso_dev,
            :avg_exit_vel_dev,
            :barrel_rate_dev,
            :chase_rate_dev,
            :whiff_rate_dev,
            :speed_dev
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
