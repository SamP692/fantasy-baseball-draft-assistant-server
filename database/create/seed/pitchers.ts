/* Database Service */
import db from ":db"

/* Config */
import config from ":config"

/* Type Definitions */
import {
    type RawPitcher,
    type RawPitcherIncomplete,
    type DbPitcher
} from ":types/pitcher.ts"

/* Data Aggregations */
import getDataAggregations from "./get-data-aggregations.ts"
const pitchingAggregations = getDataAggregations("pitching")

/* Behaviors */
/* -- Load Pitcher Seed Data */
function loadPitcherSeedData() {
    const picherJson = Deno.readTextFileSync(`${config.seedData}/pitchers.json`)
    const batterRecords = JSON.parse(picherJson)

    return batterRecords as { mergedRecords: RawPitcher[], unmatchedRecords: RawPitcherIncomplete[] }
}

/* -- Calculate Standard Deviations from the Mean */
function calculateNullableStandardDeviations(value: number | null, key: string): number | null {
    const noValue = value === null || value === undefined
    if (noValue) return null
    
    return (calculateStandardDeviations(value, key))

}

function calculateStandardDeviations(value: number, key: string): number {
    if (pitchingAggregations[key] === undefined) {
        throw new Error(`No aggregation found for ${key}`)
    }

    const { mean, stdDev } = pitchingAggregations[key]

    const deviationsFromTheMean = (value - mean) / stdDev

    return deviationsFromTheMean
}

/* -- Flatten Pitcher Records */
function flattenPitcherRecord(pitcherRecord: RawPitcher): DbPitcher {
    const flattenedRecord: DbPitcher = {
        id: crypto.randomUUID(),
        name: pitcherRecord.fullName,
        savant_id: pitcherRecord.savantId,
        yahoo_id: pitcherRecord.yahooId,
        team: pitcherRecord.team,
        age: pitcherRecord.age,
        season: 2023,
        yahoo_positions: pitcherRecord.positions.join(";"),
        current_fantasy_team: pitcherRecord.currentFantasyTeam,
        confirmed_keeper: 0,
        expected_keeper: 0,
        expected_fa: 1,
        keeper_round: pitcherRecord.minimumKeeperRound === "FA" ? null : pitcherRecord.minimumKeeperRound,
        pa: pitcherRecord.data.pa,
        gs: pitcherRecord.data.gs,
        xba: pitcherRecord.data.xba,
        xwoba: pitcherRecord.data.xwoba,
        xiso: pitcherRecord.data.xiso,
        avg_exit_vel: pitcherRecord.data.avgExitVel,
        barrel_rate: pitcherRecord.data.barrelRate,
        zone_rate: pitcherRecord.data.zoneRate,
        chase_rate: pitcherRecord.data.chaseRate,
        whiff_rate: pitcherRecord.data.whiffRate,
        fb_rate: pitcherRecord.data.fbRate,
        fb_spin: pitcherRecord.data.fbSpin,
        brk_rate: pitcherRecord.data.bbRate,
        brk_spin: pitcherRecord.data.bbSpin,
        os_rate: pitcherRecord.data.osRate,
        os_spin: pitcherRecord.data.osSpin,
        xba_dev: calculateStandardDeviations(pitcherRecord.data.xba, "xba"),
        xwoba_dev: calculateStandardDeviations(pitcherRecord.data.xwoba, "xwoba"),
        xiso_dev: calculateStandardDeviations(pitcherRecord.data.xiso, "xiso"),
        avg_exit_vel_dev: calculateStandardDeviations(pitcherRecord.data.avgExitVel, "avg_exit_vel"),
        barrel_rate_dev: calculateStandardDeviations(pitcherRecord.data.barrelRate, "barrel_rate"),
        zone_rate_dev: calculateStandardDeviations(pitcherRecord.data.zoneRate, "zone_rate"),
        chase_rate_dev: calculateStandardDeviations(pitcherRecord.data.chaseRate, "chase_rate"),
        whiff_rate_dev: calculateStandardDeviations(pitcherRecord.data.whiffRate, "whiff_rate"),
        fb_rate_dev: calculateNullableStandardDeviations(pitcherRecord.data.fbRate, "fb_rate"),
        fb_spin_dev: calculateNullableStandardDeviations(pitcherRecord.data.fbSpin, "fb_spin"),
        brk_rate_dev: calculateNullableStandardDeviations(pitcherRecord.data.bbRate, "brk_rate"),
        brk_spin_dev: calculateNullableStandardDeviations(pitcherRecord.data.bbSpin, "brk_spin"),
        os_rate_dev: calculateNullableStandardDeviations(pitcherRecord.data.osRate, "os_rate"),
        os_spin_dev: calculateNullableStandardDeviations(pitcherRecord.data.osSpin, "os_spin")
    }

    return flattenedRecord
}

/* -- Flatten Incomplete Pitcher Record */
function flattenIncompletePitcherRecord(pitcherRecord: RawPitcherIncomplete): DbPitcher {
    const flattenedRecord: DbPitcher = {
        id: crypto.randomUUID(),
        name: pitcherRecord.fullName,
        savant_id: pitcherRecord.savantId,
        yahoo_id: null,
        team: null,
        age: pitcherRecord.age,
        season: 2023,
        yahoo_positions: null,
        current_fantasy_team: null,
        confirmed_keeper: 0,
        expected_keeper: 0,
        expected_fa: 1,
        keeper_round: null,
        pa: pitcherRecord.data.pa,
        gs: pitcherRecord.data.gs,
        xba: pitcherRecord.data.xba,
        xwoba: pitcherRecord.data.xwoba,
        xiso: pitcherRecord.data.xiso,
        avg_exit_vel: pitcherRecord.data.avgExitVel,
        barrel_rate: pitcherRecord.data.barrelRate,
        zone_rate: pitcherRecord.data.zoneRate,
        chase_rate: pitcherRecord.data.chaseRate,
        whiff_rate: pitcherRecord.data.whiffRate,
        fb_rate: pitcherRecord.data.fbRate,
        fb_spin: pitcherRecord.data.fbSpin,
        brk_rate: pitcherRecord.data.bbRate,
        brk_spin: pitcherRecord.data.bbSpin,
        os_rate: pitcherRecord.data.osRate,
        os_spin: pitcherRecord.data.osSpin,
        xba_dev: calculateStandardDeviations(pitcherRecord.data.xba, "xba"),
        xwoba_dev: calculateStandardDeviations(pitcherRecord.data.xwoba, "xwoba"),
        xiso_dev: calculateStandardDeviations(pitcherRecord.data.xiso, "xiso"),
        avg_exit_vel_dev: calculateStandardDeviations(pitcherRecord.data.avgExitVel, "avg_exit_vel"),
        barrel_rate_dev: calculateStandardDeviations(pitcherRecord.data.barrelRate, "barrel_rate"),
        zone_rate_dev: calculateStandardDeviations(pitcherRecord.data.zoneRate, "zone_rate"),
        chase_rate_dev: calculateStandardDeviations(pitcherRecord.data.chaseRate, "chase_rate"),
        whiff_rate_dev: calculateStandardDeviations(pitcherRecord.data.whiffRate, "whiff_rate"),
        fb_rate_dev: calculateNullableStandardDeviations(pitcherRecord.data.fbRate, "fb_rate"),
        fb_spin_dev: calculateNullableStandardDeviations(pitcherRecord.data.fbSpin, "fb_spin"),
        brk_rate_dev: calculateNullableStandardDeviations(pitcherRecord.data.bbRate, "brk_rate"),
        brk_spin_dev: calculateNullableStandardDeviations(pitcherRecord.data.bbSpin, "brk_spin"),
        os_rate_dev: calculateNullableStandardDeviations(pitcherRecord.data.osRate, "os_rate"),
        os_spin_dev: calculateNullableStandardDeviations(pitcherRecord.data.osSpin, "os_spin")
    }

    return flattenedRecord
}

/* Seed Database */
function seedDabase() {
    const dbInstance = db.getConnection()

    const insertPitcherStatement = dbInstance.prepare(`
        INSERT INTO pitchers (
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
            gs,
            xba,
            xwoba,
            xiso,
            avg_exit_vel,
            barrel_rate,
            zone_rate,
            chase_rate,
            whiff_rate,
            fb_rate,
            fb_spin,
            brk_rate,
            brk_spin,
            os_rate,
            os_spin,
            xba_dev,
            xwoba_dev,
            xiso_dev,
            avg_exit_vel_dev,
            barrel_rate_dev,
            zone_rate_dev,
            chase_rate_dev,
            whiff_rate_dev,
            fb_rate_dev,
            fb_spin_dev,
            brk_rate_dev,
            brk_spin_dev,
            os_rate_dev,
            os_spin_dev
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
            :gs,
            :xba,
            :xwoba,
            :xiso,
            :avg_exit_vel,
            :barrel_rate,
            :zone_rate,
            :chase_rate,
            :whiff_rate,
            :fb_rate,
            :fb_spin,
            :brk_rate,
            :brk_spin,
            :os_rate,
            :os_spin,
            :xba_dev,
            :xwoba_dev,
            :xiso_dev,
            :avg_exit_vel_dev,
            :barrel_rate_dev,
            :zone_rate_dev,
            :chase_rate_dev,
            :whiff_rate_dev,
            :fb_rate_dev,
            :fb_spin_dev,
            :brk_rate_dev,
            :brk_spin_dev,
            :os_rate_dev,
            :os_spin_dev
        )
    `)

    const { mergedRecords, unmatchedRecords } = loadPitcherSeedData()
    const flattenedCompleteRecords = mergedRecords.map(flattenPitcherRecord)
    const flattenedIncompleteRecords = unmatchedRecords.map(flattenIncompletePitcherRecord)

    const flattenedRecords = [...flattenedCompleteRecords, ...flattenedIncompleteRecords]

    const insertPitcherRecords = dbInstance.transaction((pitcherRecords: DbPitcher[]) => {
        for (const pitcherRecord of pitcherRecords) {
            insertPitcherStatement.run(pitcherRecord)
        }
    })

    insertPitcherRecords(flattenedRecords)
}

export default seedDabase
