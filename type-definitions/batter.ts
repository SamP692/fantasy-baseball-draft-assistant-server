/* Raw Batter */
export interface RawBatter {
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
        xba: number
        xwoba: number
        xiso: number
        avgExitVel: number
        barrelRate: number
        chaseRate: number
        whiffRate: number
        speed: number
    }
}

/* Raw Incomplete Batter */
export interface RawBatterIncomplete {
    fullName: string
    minimumKeeperRound: number | "FA"
    name: {
        first: string
        last: string
        raw: string
    }
    savantId: number
    age: number
    data: {
        recordYear: number
        pa: number
        xba: number
        xwoba: number
        xiso: number
        avgExitVel: number
        barrelRate: number
        chaseRate: number
        whiffRate: number
        speed: number
    }
}

/* Database Batter */
type PlainObject = { [key: string]: string | number | null }
export interface DbBatter extends PlainObject {
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
    xba: number
    xwoba: number
    xiso: number
    avg_exit_vel: number
    barrel_rate: number
    chase_rate: number
    whiff_rate: number
    speed: number
}

/* Batter */
export interface Batter {
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
    xba: number
    xwoba: number
    xiso: number
    avgExitVel: number
    barrelRate: number
    chaseRate: number
    whiffRate: number
    speed: number
}
