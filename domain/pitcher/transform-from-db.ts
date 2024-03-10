/* Type Definitions */
import { type DbPitcher, type Pitcher } from ":types/pitcher.ts"

/* Convert Yahoo Positions */
function convertYahooPositions(rawYahooPositions: string | null): string[] | undefined {
    if (!rawYahooPositions) return undefined
    
    const positions = rawYahooPositions.split(";")

    return positions
}

/* Transform Pitcher from DB Record */
function transformFromDb(databaseRecord: DbPitcher): Pitcher {
    const pitcher: Pitcher = {
        id: databaseRecord.id,
        name: databaseRecord.name,
        savantId: databaseRecord.savant_id,
        yahooId: databaseRecord.yahoo_id ?? undefined,
        team: databaseRecord.team ?? undefined,
        age: databaseRecord.age,
        season: databaseRecord.season,
        yahooPositions: convertYahooPositions(databaseRecord.yahoo_positions),
        currentFantasyTeam: databaseRecord.current_fantasy_team ?? undefined,
        confirmedKeeper: Boolean(databaseRecord.confirmed_keeper),
        expectedKeeper: Boolean(databaseRecord.expected_keeper),
        expectedFa: Boolean(databaseRecord.expected_fa),
        keeperRound: databaseRecord.yahoo_id ? databaseRecord.keeper_round : undefined,
        pa: databaseRecord.pa,
        gs: databaseRecord.gs,
        xba: databaseRecord.xba,
        xbaDev: databaseRecord.xba_dev,
        xwoba: databaseRecord.xwoba,
        xwobaDev: databaseRecord.xwoba_dev,
        xiso: databaseRecord.xiso,
        xisoDev: databaseRecord.xiso_dev,
        avgExitVel: databaseRecord.avg_exit_vel,
        avgExitVelDev: databaseRecord.avg_exit_vel_dev,
        barrelRate: databaseRecord.barrel_rate,
        barrelRateDev: databaseRecord.barrel_rate_dev,
        zoneRate: databaseRecord.zone_rate,
        zoneRateDev: databaseRecord.zone_rate_dev,
        chaseRate: databaseRecord.chase_rate,
        chaseRateDev: databaseRecord.chase_rate_dev,
        whiffRate: databaseRecord.whiff_rate,
        whiffRateDev: databaseRecord.whiff_rate_dev,
        fbRate: databaseRecord.fb_rate,
        fbRateDev: databaseRecord.fb_rate_dev,
        fbSpin: databaseRecord.fb_spin,
        fbSpinDev: databaseRecord.fb_spin_dev,
        brkRate: databaseRecord.brk_rate,
        brkRateDev: databaseRecord.brk_rate_dev,
        brkSpin: databaseRecord.brk_spin,
        brkSpinDev: databaseRecord.brk_spin_dev,
        osRate: databaseRecord.os_rate,
        osRateDev: databaseRecord.os_rate_dev,
        osSpin: databaseRecord.os_spin,
        osSpinDev: databaseRecord.os_spin_dev
    }

    return pitcher
}

export default transformFromDb
