# Scratch

## DB Shape

### Batters
    id: UUID
    name: VARCHAR
    savant_id: INTEGER
    yahoo_id: INTEGER
    team: VARCHAR
    age: INTEGER
    season: INTEGER
    yahoo_positions: VARCHAR // semicolon-delimited-list
    current_fantasy_team: VARCHAR
    confirmed_keeper: BOOLEAN
    expected_keeper: BOOLEAN
    expected_fa: BOOLEAN
    keeper_round: INTEGER
    pa: INTEGER
    xba: FLOAT
    xwoba: FLOAT
    xiso: FLOAT
    avg_exit_vel: FLOAT
    barrel_rate: FLOAT
    chase_rate: FLOAT
    whiff_rate: FLOAT
    speed: FLOAT

### Pitchers
    id: UUID
    name: VARCHAR
    savant_id: INTEGER
    yahoo_id: INTEGER
    team: VARCHAR
    age: INTEGER
    season: INTEGER
    yahoo_positions: VARCHAR // semicolon-delimited-list
    current_fantasy_team: VARCHAR
    confirmed_keeper: BOOLEAN
    expected_keeper: BOOLEAN
    expected_fa: BOOLEAN
    keeper_round: INTEGER
    pa: INTEGER
    gs: INTEGER
    xba: FLOAT
    xwoba: FLOAT
    xiso: FLOAT
    avg_exit_vel: FLOAT
    barrel_rate: FLOAT
    zone_rate: FLOAT
    chase_rate: FLOAT
    whiff_rate: FLOAT
    fb_rate: FLOAT
    fb_spin: INTEGER
    brk_rate: FLOAT
    brk_spin: INTEGER
    os_rate: FLOAT
    os_spin: INTEGER
