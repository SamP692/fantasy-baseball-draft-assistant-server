/* Type Definitions */
import { type DbBatter, type Batter } from ":types/batter.ts"

/* Convert Yahoo Positions */
function convertYahooPositions(rawYahooPositions: string | null): string[] | undefined {
    if (!rawYahooPositions) return undefined
    
    const positions = rawYahooPositions.split(";")

    return positions
}

/* Transform Batter from DB Record */
function transformFromDb(databaseRecord: DbBatter): Batter {
    const batter: Batter = {
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
        xba: databaseRecord.xba,
        xwoba: databaseRecord.xwoba,
        xiso: databaseRecord.xiso,
        avgExitVel: databaseRecord.avg_exit_vel,
        barrelRate: databaseRecord.barrel_rate,
        chaseRate: databaseRecord.chase_rate,
        whiffRate: databaseRecord.whiff_rate,
        speed: databaseRecord.speed,
        xbaDev: databaseRecord.xba_dev,
        xwobaDev: databaseRecord.xwoba_dev,
        xisoDev: databaseRecord.xiso_dev,
        avgExitVelDev: databaseRecord.avg_exit_vel_dev,
        barrelRateDev: databaseRecord.barrel_rate_dev,
        chaseRateDev: databaseRecord.chase_rate_dev,
        whiffRateDev: databaseRecord.whiff_rate_dev,
        speedDev: databaseRecord.speed_dev
    }

    return batter
}

export default transformFromDb
