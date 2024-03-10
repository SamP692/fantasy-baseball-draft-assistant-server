/* Raw Record */
export interface RawPitcher {
    fullName: string
    team: string
    currentFantasyTeam: string
    minimumKeeperRound: number | "FA"
    savantName: {
        first: string
        last: string
        raw: string
    }
    yahooName: {
        first: string
        last: string
    }
    savantId: number
    yahooId: number
    age: number
    positions: string[]
    data: {
        recordYear: number
        pa: number
        gs: number
        xba: number
        xwoba: number
        xiso: number
        avgExitVel: number
        barrelRate: number
        zoneRate: number
        chaseRate: number
        whiffRate: number
        fbRate: number | null
        fbSpin: number | null
        bbRate: number | null
        bbSpin: number | null
        osRate: number | null
        osSpin: number | null
    }
}

/* Raw Incomplete Pitcher */
export interface RawPitcherIncomplete {
    fullName: string
    savantName: {
        first: string
        last: string
        raw: string
    }
    savantId: number
    age: number
    data: {
        recordYear: number
        pa: number
        gs: number
        xba: number
        xwoba: number
        xiso: number
        avgExitVel: number
        barrelRate: number
        zoneRate: number
        chaseRate: number
        whiffRate: number
        fbRate: number | null
        fbSpin: number | null
        bbRate: number | null
        bbSpin: number | null
        osRate: number | null
        osSpin: number | null
    }
}

/* Database Pitcher */
type PlainObject = { [key: string]: string | number | null }
export interface DbPitcher extends PlainObject {
    id: string
    name: string
    savant_id: number
    yahoo_id: number | null
    team: string | null
    age: number
    season: number
    yahoo_positions: string | null
    current_fantasy_team: string | null
    confirmed_keeper: 0 | 1
    expected_keeper: 0 | 1
    expected_fa: 0 | 1
    keeper_round: number | null
    pa: number
    gs: number
    xba: number
    xba_dev: number
    xwoba: number
    xwoba_dev: number
    xiso: number
    xiso_dev: number
    avg_exit_vel: number
    avg_exit_vel_dev: number
    barrel_rate: number
    barrel_rate_dev: number
    zone_rate: number
    zone_rate_dev: number
    chase_rate: number
    chase_rate_dev: number
    whiff_rate: number
    whiff_rate_dev: number
    fb_rate: number | null
    fb_rate_dev: number | null
    fb_spin: number | null
    fb_spin_dev: number | null
    brk_rate: number | null
    brk_rate_dev: number | null
    brk_spin: number | null
    brk_spin_dev: number | null
    os_rate: number | null
    os_rate_dev: number | null
    os_spin: number | null
    os_spin_dev: number | null
}

/* Pitcher */
export interface Pitcher {
    id: string
    name: string
    savantId: number
    yahooId: number | undefined
    team: string | undefined
    age: number
    season: number
    yahooPositions: string[] | undefined
    currentFantasyTeam: string | undefined
    confirmedKeeper: boolean
    expectedKeeper: boolean
    expectedFa: boolean
    keeperRound: number | null | undefined
    pa: number
    gs: number
    xba: number
    xbaDev: number
    xwoba: number
    xwobaDev: number
    xiso: number
    xisoDev: number
    avgExitVel: number
    avgExitVelDev: number
    barrelRate: number
    barrelRateDev: number
    zoneRate: number
    zoneRateDev: number
    chaseRate: number
    chaseRateDev: number
    whiffRate: number
    whiffRateDev: number
    fbRate: number | null
    fbRateDev: number | null
    fbSpin: number | null
    fbSpinDev: number | null
    brkRate: number | null
    brkRateDev: number | null
    brkSpin: number | null
    brkSpinDev: number | null
    osRate: number | null
    osRateDev: number | null
    osSpin: number | null
    osSpinDev: number | null
}
