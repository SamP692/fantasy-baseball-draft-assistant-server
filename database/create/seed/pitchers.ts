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

/* Behaviors */
/* -- Load Pitcher Seed Data */
function loadPitcherSeedData() {
    const picherJson = Deno.readTextFileSync(`${config.seedData}/pitchers.json`)
    const batterRecords = JSON.parse(picherJson)

    return batterRecords as { mergedRecords: RawPitcher[], unmatchedRecords: RawPitcherIncomplete[] }
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
        expected_fa: 0,
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
        os_spin: pitcherRecord.data.osSpin
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
        expected_fa: 0,
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
        os_spin: pitcherRecord.data.osSpin
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
            os_spin
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
            :os_spin
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
