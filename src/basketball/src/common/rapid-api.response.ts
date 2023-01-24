export namespace RapidApiResponses {
  export interface Response {
    get: string;
    parameters: Parameters;
    errors: any[];
    results: number;
    paging: Paging;
    response: any[];
  }

  export interface Parameters {
    league: string;
    page: string;
    season: string;
  }

  export interface Paging {
    current: number;
    total: number;
  }

  export namespace Bookmakers {
    export interface Response {
      id: number;
      name: string;
    }
  }
  export namespace TimeZones {
    export type Response = string[];
  }
  export namespace Seasons {
    export type Response = any[];
  }
  export namespace Countries {
    export interface Response {
      id: number;
      name: string;
      code: string;
      flag: string;
    }
  }
  export namespace Leagues {
    export namespace Leagues {
      export interface Parameters {
        id: string;
      }

      export interface Paging {
        current: number;
        total: number;
      }

      export interface League {
        id: number;
        name: string;
        type: string;
        logo: string;
      }

      export interface Country {
        name: string;
        code: string;
        flag: string;
      }

      export interface Fixtures {
        events: boolean;
        lineups: boolean;
        statistics_fixtures: boolean;
        statistics_players: boolean;
      }

      export interface Coverage {
        fixtures: Fixtures;
        standings: boolean;
        players: boolean;
        top_scorers: boolean;
        top_assists: boolean;
        top_cards: boolean;
        injuries: boolean;
        predictions: boolean;
        odds: boolean;
      }

      export interface Season {
        year: number;
        start: string;
        end: string;
        current: boolean;
        coverage: Coverage;
      }

      export interface Response {
        league: League;
        country: Country;
        seasons: Season[];
      }
    }

    export namespace Seasons {
      export type Response = number[];
    }
  }
  export namespace Teams {
    export namespace Teams {
      export interface Parameters {
        id: string;
      }

      export interface Paging {
        current: number;
        total: number;
      }

      export interface Team {
        id: number;
        name: string;
        code: string;
        country: string;
        founded: number;
        national: boolean;
        logo: string;
      }

      export interface Venue {
        id: number;
        name: string;
        address: string;
        city: string;
        capacity: number;
        surface: string;
        image: string;
      }

      export interface Response {
        team: Team;
        venue: Venue;
      }
    }

    export namespace Statistics {
      export interface Parameters {
        team: string;
        season: string;
        league: string;
      }

      export interface Paging {
        current: number;
        total: number;
      }

      export interface Response {
        league: League;
        team: Team;
        form: string;
        fixtures: Fixtures;
        goals: Goals;
        biggest: Biggest;
        clean_sheet: CleanSheet;
        failed_to_score: FailedToScore;
        penalty: Penalty;
        lineups: Lineup[];
        cards: Cards;
      }

      export interface League {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface Fixtures {
        played: Played;
        wins: Wins;
        draws: Draws;
        loses: Loses;
      }

      export interface Played {
        home: number;
        away: number;
        total: number;
      }

      export interface Wins {
        home: number;
        away: number;
        total: number;
      }

      export interface Draws {
        home: number;
        away: number;
        total: number;
      }

      export interface Loses {
        home: number;
        away: number;
        total: number;
      }

      export interface Goals {
        for: For;
        against: Against;
      }

      export interface For {
        total: Total;
        average: Average;
        minute: Minute;
      }

      export interface Total {
        home: number;
        away: number;
        total: number;
      }

      export interface Average {
        home: string;
        away: string;
        total: string;
      }

      export interface Minute {
        '0-15': N015;
        '16-30': N1630;
        '31-45': N3145;
        '46-60': N4660;
        '61-75': N6175;
        '76-90': N7690;
        '91-105': N91105;
        '106-120': N106120;
      }

      export interface N015 {
        total: number;
        percentage: string;
      }

      export interface N1630 {
        total: number;
        percentage: string;
      }

      export interface N3145 {
        total: number;
        percentage: string;
      }

      export interface N4660 {
        total: number;
        percentage: string;
      }

      export interface N6175 {
        total: number;
        percentage: string;
      }

      export interface N7690 {
        total: number;
        percentage: string;
      }

      export interface N91105 {
        total: number;
        percentage: string;
      }

      export interface N106120 {
        total: any;
        percentage: any;
      }

      export interface Against {
        total: Total2;
        average: Average2;
        minute: Minute2;
      }

      export interface Total2 {
        home: number;
        away: number;
        total: number;
      }

      export interface Average2 {
        home: string;
        away: string;
        total: string;
      }

      export interface Minute2 {
        '0-15': N0152;
        '16-30': N16302;
        '31-45': N31452;
        '46-60': N46602;
        '61-75': N61752;
        '76-90': N76902;
        '91-105': N911052;
        '106-120': N1061202;
      }

      export interface N0152 {
        total: number;
        percentage: string;
      }

      export interface N16302 {
        total: number;
        percentage: string;
      }

      export interface N31452 {
        total: number;
        percentage: string;
      }

      export interface N46602 {
        total: number;
        percentage: string;
      }

      export interface N61752 {
        total: number;
        percentage: string;
      }

      export interface N76902 {
        total: number;
        percentage: string;
      }

      export interface N911052 {
        total: number;
        percentage: string;
      }

      export interface N1061202 {
        total: any;
        percentage: any;
      }

      export interface Biggest {
        streak: Streak;
        wins: Wins2;
        loses: Loses2;
        goals: Goals2;
      }

      export interface Streak {
        wins: number;
        draws: number;
        loses: number;
      }

      export interface Wins2 {
        home: string;
        away: string;
      }

      export interface Loses2 {
        home: string;
        away: string;
      }

      export interface Goals2 {
        for: For2;
        against: Against2;
      }

      export interface For2 {
        home: number;
        away: number;
      }

      export interface Against2 {
        home: number;
        away: number;
      }

      export interface CleanSheet {
        home: number;
        away: number;
        total: number;
      }

      export interface FailedToScore {
        home: number;
        away: number;
        total: number;
      }

      export interface Penalty {
        scored: Scored;
        missed: Missed;
        total: number;
      }

      export interface Scored {
        total: number;
        percentage: string;
      }

      export interface Missed {
        total: number;
        percentage: string;
      }

      export interface Lineup {
        formation: string;
        played: number;
      }

      export interface Cards {
        yellow: Yellow;
        red: Red;
      }

      export interface Yellow {
        '0-15': N0153;
        '16-30': N16303;
        '31-45': N31453;
        '46-60': N46603;
        '61-75': N61753;
        '76-90': N76903;
        '91-105': N911053;
        '106-120': N1061203;
      }

      export interface N0153 {
        total: number;
        percentage: string;
      }

      export interface N16303 {
        total: number;
        percentage: string;
      }

      export interface N31453 {
        total: number;
        percentage: string;
      }

      export interface N46603 {
        total: number;
        percentage: string;
      }

      export interface N61753 {
        total: number;
        percentage: string;
      }

      export interface N76903 {
        total: number;
        percentage: string;
      }

      export interface N911053 {
        total: any;
        percentage: any;
      }

      export interface N1061203 {
        total: any;
        percentage: any;
      }

      export interface Red {
        '0-15': N0154;
        '16-30': N16304;
        '31-45': N31454;
        '46-60': N46604;
        '61-75': N61754;
        '76-90': N76904;
        '91-105': N911054;
        '106-120': N1061204;
      }

      export interface N0154 {
        total: any;
        percentage: any;
      }

      export interface N16304 {
        total: any;
        percentage: any;
      }

      export interface N31454 {
        total: any;
        percentage: any;
      }

      export interface N46604 {
        total: any;
        percentage: any;
      }

      export interface N61754 {
        total: any;
        percentage: any;
      }

      export interface N76904 {
        total: any;
        percentage: any;
      }

      export interface N911054 {
        total: any;
        percentage: any;
      }

      export interface N1061204 {
        total: any;
        percentage: any;
      }
    }

    export namespace Seasons {
      export type response = number[];
    }

    export namespace Countries {
      export interface Response {
        name: string;
        code: string;
        flag: string;
      }
    }
  }

  export namespace Venues {
    export interface Response {
      id: number;
      name: string;
      address: string;
      city: string;
      country: string;
      capacity: number;
      surface: string;
      image: string;
    }
  }

  export namespace Standings {
    export interface Response {
      league: League;
    }

    export interface League {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
      standings: Standing[][];
    }

    export interface Standing {
      rank: number;
      team: Team;
      points: number;
      goalsDiff: number;
      group: string;
      form: string;
      status: string;
      description: string;
      all: All;
      home: Home;
      away: Away;
      update: string;
    }

    export interface Team {
      id: number;
      name: string;
      logo: string;
    }

    export interface All {
      played: number;
      win: number;
      draw: number;
      lose: number;
      goals: Goals;
    }

    export interface Goals {
      for: number;
      against: number;
    }

    export interface Home {
      played: number;
      win: number;
      draw: number;
      lose: number;
      goals: Goals2;
    }

    export interface Goals2 {
      for: number;
      against: number;
    }

    export interface Away {
      played: number;
      win: number;
      draw: number;
      lose: number;
      goals: Goals3;
    }

    export interface Goals3 {
      for: number;
      against: number;
    }
  }

  export namespace Games {
    export interface Parameters {
      league: string;
      date: string;
      team: string;
      timezone: string;
      season: string;
    }

    export interface Status {
      long: string;
      short: string;
      timer?: any;
    }

    export interface League {
      id: number;
      name: string;
      type: string;
      season: string;
      logo?: any;
    }

    export interface Country {
      id: number;
      name: string;
      code: string;
      flag: string;
    }

    export interface Home {
      id: number;
      name: string;
      logo?: any;
    }

    export interface Away {
      id: number;
      name: string;
      logo?: any;
    }

    export interface Teams {
      home: Home;
      away: Away;
    }

    export interface Home2 {
      quarter_1: number;
      quarter_2: number;
      quarter_3: number;
      quarter_4: number;
      over_time?: any;
      total: number;
    }

    export interface Away2 {
      quarter_1: number;
      quarter_2: number;
      quarter_3: number;
      quarter_4: number;
      over_time?: any;
      total: number;
    }

    export interface Scores {
      home: Home2;
      away: Away2;
    }

    export interface Response {
      id: number;
      date: Date;
      time: string;
      timestamp: number;
      timezone: string;
      stage?: any;
      week?: any;
      status: Status;
      league: League;
      country: Country;
      teams: Teams;
      scores: Scores;
    }
  }

  export namespace Fixtures {
    export namespace Rounds {
      export type Response = string[];
    }

    export namespace Fixtures {
      export interface Response {
        fixture: Fixture;
        league: League;
        teams: Teams;
        goals: Goals;
        score: Score;
        events: Event[];
      }

      export interface Event {
        time: Time;
        team: Team;
        player: Player;
        assist: Assist;
        type: string;
        detail: string;
        comments: any;
      }

      export interface Time {
        elapsed: number;
        extra?: number;
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface Player {
        id?: number;
        name: string;
      }

      export interface Assist {
        id?: number;
        name?: string;
      }

      export interface Fixture {
        id: number;
        referee: any;
        timezone: string;
        date: string;
        timestamp: number;
        periods: Periods;
        venue: Venue;
        status: Status;
      }

      export interface Periods {
        first: number;
        second: any;
      }

      export interface Venue {
        id: number;
        name: string;
        city: string;
      }

      export interface Status {
        long: string;
        short: string;
        elapsed: number;
      }

      export interface League {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
        round: string;
      }

      export interface Teams {
        home: Home;
        away: Away;
      }

      export interface Home {
        id: number;
        name: string;
        logo: string;
        winner: boolean;
      }

      export interface Away {
        id: number;
        name: string;
        logo: string;
        winner: boolean;
      }

      export interface Goals {
        home: number;
        away: number;
      }

      export interface Score {
        halftime: Halftime;
        fulltime: Fulltime;
        extratime: Extratime;
        penalty: Penalty;
      }

      export interface Halftime {
        home: number;
        away: number;
      }

      export interface Fulltime {
        home: any;
        away: any;
      }

      export interface Extratime {
        home: any;
        away: any;
      }

      export interface Penalty {
        home: any;
        away: any;
      }
    }

    export namespace HeadToHead {
      export interface Response {
        fixture: Fixture;
        league: League;
        teams: Teams;
        goals: Goals;
        score: Score;
      }

      export interface Fixture {
        id: number;
        referee: string;
        timezone: string;
        date: string;
        timestamp: number;
        periods: Periods;
        venue: Venue;
        status: Status;
      }

      export interface Periods {
        first: number;
        second: number;
      }

      export interface Venue {
        id: number;
        name: string;
        city: string;
      }

      export interface Status {
        long: string;
        short: string;
        elapsed: number;
      }

      export interface League {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
        round: string;
      }

      export interface Teams {
        home: Home;
        away: Away;
      }

      export interface Home {
        id: number;
        name: string;
        logo: string;
        winner: boolean;
      }

      export interface Away {
        id: number;
        name: string;
        logo: string;
        winner: boolean;
      }

      export interface Goals {
        home: number;
        away: number;
      }

      export interface Score {
        halftime: Halftime;
        fulltime: Fulltime;
        extratime: Extratime;
        penalty: Penalty;
      }

      export interface Halftime {
        home: number;
        away: number;
      }

      export interface Fulltime {
        home: number;
        away: number;
      }

      export interface Extratime {
        home: any;
        away: any;
      }

      export interface Penalty {
        home: any;
        away: any;
      }
    }

    export namespace Statistics {
      export interface Response {
        team: Team;
        statistics: Statistic[];
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface Statistic {
        type: string;
        value: any;
      }
    }

    export namespace Events {
      export interface Response {
        time: Time;
        team: Team;
        player: Player;
        assist: Assist;
        type: string;
        detail: string;
        comments: any;
      }

      export interface Time {
        elapsed: number;
        extra: any;
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface Player {
        id: number;
        name: string;
      }

      export interface Assist {
        id?: number;
        name?: string;
      }
    }

    export namespace Lineups {
      export interface Response {
        team: Team;
        formation: string;
        startXI: StartXi[];
        substitutes: Substitute[];
        coach: Coach;
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
        colors: Colors;
      }

      export interface Colors {
        player: Player;
        goalkeeper: Goalkeeper;
      }

      export interface Player {
        primary: string;
        number: string;
        border: string;
      }

      export interface Goalkeeper {
        primary: string;
        number: string;
        border: string;
      }

      export interface StartXi {
        player: Player2;
      }

      export interface Player2 {
        id: number;
        name: string;
        number: number;
        pos: string;
        grid: string;
      }

      export interface Substitute {
        player: Player3;
      }

      export interface Player3 {
        id: number;
        name: string;
        number: number;
        pos: string;
        grid: any;
      }

      export interface Coach {
        id: number;
        name: string;
        photo: string;
      }
    }

    export namespace Players {
      export interface Response {
        team: Team;
        players: Player[];
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
        update: string;
      }

      export interface Player {
        player: Player2;
        statistics: Statistic[];
      }

      export interface Player2 {
        id: number;
        name: string;
        photo: string;
      }

      export interface Statistic {
        games: Games;
        offsides: any;
        shots: Shots;
        goals: Goals;
        passes: Passes;
        tackles: Tackles;
        duels: Duels;
        dribbles: Dribbles;
        fouls: Fouls;
        cards: Cards;
        penalty: Penalty;
      }

      export interface Games {
        minutes: number;
        number: number;
        position: string;
        rating: string;
        captain: boolean;
        substitute: boolean;
      }

      export interface Shots {
        total: number;
        on: number;
      }

      export interface Goals {
        total: any;
        conceded: number;
        assists: any;
        saves: number;
      }

      export interface Passes {
        total: number;
        key: number;
        accuracy: string;
      }

      export interface Tackles {
        total: any;
        blocks: number;
        interceptions: number;
      }

      export interface Duels {
        total: any;
        won: any;
      }

      export interface Dribbles {
        attempts: number;
        success: number;
        past: any;
      }

      export interface Fouls {
        drawn: number;
        committed: number;
      }

      export interface Cards {
        yellow: number;
        red: number;
      }

      export interface Penalty {
        won: any;
        commited: any;
        scored: number;
        missed: number;
        saved: number;
      }
    }
  }

  export namespace Injuries {
    export interface Response {
      player: Player;
      team: Team;
      fixture: Fixture;
      league: League;
    }

    export interface Player {
      id: number;
      name: string;
      photo: string;
      type: string;
      reason: string;
    }

    export interface Team {
      id: number;
      name: string;
      logo: string;
    }

    export interface Fixture {
      id: number;
      timezone: string;
      date: string;
      timestamp: number;
    }

    export interface League {
      id: number;
      season: number;
      name: string;
      country: string;
      logo: string;
      flag: any;
    }
  }

  export namespace Predictions {
    export interface Response {
      predictions: Predictions;
      league: League;
      teams: Teams;
      comparison: Comparison;
      h2h: H2h2[];
    }

    export interface Predictions {
      winner: Winner;
      win_or_draw: boolean;
      under_over: string;
      goals: Goals;
      advice: string;
      percent: Percent;
    }

    export interface Winner {
      id: number;
      name: string;
      comment: string;
    }

    export interface Goals {
      home: string;
      away: string;
    }

    export interface Percent {
      home: string;
      draw: string;
      away: string;
    }

    export interface League {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
    }

    export interface Teams {
      home: Home;
      away: Away;
    }

    export interface Home {
      id: number;
      name: string;
      logo: string;
      last_5: Last5;
      league: League2;
    }

    export interface Last5 {
      form: string;
      att: string;
      def: string;
      goals: Goals2;
    }

    export interface Goals2 {
      for: For;
      against: Against;
    }

    export interface For {
      total: number;
      average: number;
    }

    export interface Against {
      total: number;
      average: number;
    }

    export interface League2 {
      form: string;
      fixtures: Fixtures;
      goals: Goals3;
      biggest: Biggest;
      clean_sheet: CleanSheet;
      failed_to_score: FailedToScore;
    }

    export interface Fixtures {
      played: Played;
      wins: Wins;
      draws: Draws;
      loses: Loses;
    }

    export interface Played {
      home: number;
      away: number;
      total: number;
    }

    export interface Wins {
      home: number;
      away: number;
      total: number;
    }

    export interface Draws {
      home: number;
      away: number;
      total: number;
    }

    export interface Loses {
      home: number;
      away: number;
      total: number;
    }

    export interface Goals3 {
      for: For2;
      against: Against2;
    }

    export interface For2 {
      total: Total;
      average: Average;
    }

    export interface Total {
      home: number;
      away: number;
      total: number;
    }

    export interface Average {
      home: string;
      away: string;
      total: string;
    }

    export interface Against2 {
      total: Total2;
      average: Average2;
    }

    export interface Total2 {
      home: number;
      away: number;
      total: number;
    }

    export interface Average2 {
      home: string;
      away: string;
      total: string;
    }

    export interface Biggest {
      streak: Streak;
      wins: Wins2;
      loses: Loses2;
      goals: Goals4;
    }

    export interface Streak {
      wins: number;
      draws: number;
      loses: number;
    }

    export interface Wins2 {
      home: string;
      away: string;
    }

    export interface Loses2 {
      home: string;
      away: string;
    }

    export interface Goals4 {
      for: For3;
      against: Against3;
    }

    export interface For3 {
      home: number;
      away: number;
    }

    export interface Against3 {
      home: number;
      away: number;
    }

    export interface CleanSheet {
      home: number;
      away: number;
      total: number;
    }

    export interface FailedToScore {
      home: number;
      away: number;
      total: number;
    }

    export interface Away {
      id: number;
      name: string;
      logo: string;
      last_5: Last52;
      league: League3;
    }

    export interface Last52 {
      form: string;
      att: string;
      def: string;
      goals: Goals5;
    }

    export interface Goals5 {
      for: For4;
      against: Against4;
    }

    export interface For4 {
      total: number;
      average: number;
    }

    export interface Against4 {
      total: number;
      average: number;
    }

    export interface League3 {
      form: string;
      fixtures: Fixtures2;
      goals: Goals6;
      biggest: Biggest2;
      clean_sheet: CleanSheet2;
      failed_to_score: FailedToScore2;
    }

    export interface Fixtures2 {
      played: Played2;
      wins: Wins3;
      draws: Draws2;
      loses: Loses3;
    }

    export interface Played2 {
      home: number;
      away: number;
      total: number;
    }

    export interface Wins3 {
      home: number;
      away: number;
      total: number;
    }

    export interface Draws2 {
      home: number;
      away: number;
      total: number;
    }

    export interface Loses3 {
      home: number;
      away: number;
      total: number;
    }

    export interface Goals6 {
      for: For5;
      against: Against5;
    }

    export interface For5 {
      total: Total3;
      average: Average3;
    }

    export interface Total3 {
      home: number;
      away: number;
      total: number;
    }

    export interface Average3 {
      home: string;
      away: string;
      total: string;
    }

    export interface Against5 {
      total: Total4;
      average: Average4;
    }

    export interface Total4 {
      home: number;
      away: number;
      total: number;
    }

    export interface Average4 {
      home: string;
      away: string;
      total: string;
    }

    export interface Biggest2 {
      streak: Streak2;
      wins: Wins4;
      loses: Loses4;
      goals: Goals7;
    }

    export interface Streak2 {
      wins: number;
      draws: number;
      loses: number;
    }

    export interface Wins4 {
      home: string;
      away: string;
    }

    export interface Loses4 {
      home: string;
      away: string;
    }

    export interface Goals7 {
      for: For6;
      against: Against6;
    }

    export interface For6 {
      home: number;
      away: number;
    }

    export interface Against6 {
      home: number;
      away: number;
    }

    export interface CleanSheet2 {
      home: number;
      away: number;
      total: number;
    }

    export interface FailedToScore2 {
      home: number;
      away: number;
      total: number;
    }

    export interface Comparison {
      form: Form;
      att: Att;
      def: Def;
      poisson_distribution: PoissonDistribution;
      h2h: H2h;
      goals: Goals8;
      total: Total5;
    }

    export interface Form {
      home: string;
      away: string;
    }

    export interface Att {
      home: string;
      away: string;
    }

    export interface Def {
      home: string;
      away: string;
    }

    export interface PoissonDistribution {
      home: string;
      away: string;
    }

    export interface H2h {
      home: string;
      away: string;
    }

    export interface Goals8 {
      home: string;
      away: string;
    }

    export interface Total5 {
      home: string;
      away: string;
    }

    export interface H2h2 {
      fixture: Fixture;
      league: League4;
      teams: Teams2;
      goals: Goals9;
      score: Score;
    }

    export interface Fixture {
      id: number;
      referee?: string;
      timezone: string;
      date: string;
      timestamp: number;
      periods: Periods;
      venue: Venue;
      status: Status;
    }

    export interface Periods {
      first: number;
      second: number;
    }

    export interface Venue {
      id: any;
      name: string;
      city: any;
    }

    export interface Status {
      long: string;
      short: string;
      elapsed: number;
    }

    export interface League4 {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
      round: string;
    }

    export interface Teams2 {
      home: Home2;
      away: Away2;
    }

    export interface Home2 {
      id: number;
      name: string;
      logo: string;
      winner?: boolean;
    }

    export interface Away2 {
      id: number;
      name: string;
      logo: string;
      winner?: boolean;
    }

    export interface Goals9 {
      home: number;
      away: number;
    }

    export interface Score {
      halftime: Halftime;
      fulltime: Fulltime;
      extratime: Extratime;
      penalty: Penalty;
    }

    export interface Halftime {
      home: number;
      away: number;
    }

    export interface Fulltime {
      home: number;
      away: number;
    }

    export interface Extratime {
      home: any;
      away: any;
    }

    export interface Penalty {
      home: any;
      away: any;
    }
  }

  export namespace Coachs {
    export interface Response {
      id: number;
      name: string;
      firstname: string;
      lastname: string;
      age: number;
      birth: Birth;
      nationality: string;
      height: string;
      weight: string;
      photo: string;
      team: Team;
      career: Career[];
    }

    export interface Birth {
      date: string;
      place: string;
      country: string;
    }

    export interface Team {
      id: number;
      name: string;
      logo: string;
    }

    export interface Career {
      team: Team2;
      start: string;
      end?: string;
    }

    export interface Team2 {
      id: number;
      name: string;
      logo: string;
    }
  }

  export namespace Players {
    export namespace Seasons {
      export type Response = number[];
    }
    export namespace Players {
      export interface Response {
        player: Player;
        statistics: Statistic[];
      }

      export interface Player {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        birth: Birth;
        nationality: string;
        height: string;
        weight: string;
        injured: boolean;
        photo: string;
      }

      export interface Birth {
        date: string;
        place: string;
        country: string;
      }

      export interface Statistic {
        team: Team;
        league: League;
        games: Games;
        substitutes: Substitutes;
        shots: Shots;
        goals: Goals;
        passes: Passes;
        tackles: Tackles;
        duels: Duels;
        dribbles: Dribbles;
        fouls: Fouls;
        cards: Cards;
        penalty: Penalty;
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface League {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
      }

      export interface Games {
        appearences: number;
        lineups: number;
        minutes: number;
        number: any;
        position: string;
        rating: string;
        captain: boolean;
      }

      export interface Substitutes {
        in: number;
        out: number;
        bench: number;
      }

      export interface Shots {
        total: number;
        on: number;
      }

      export interface Goals {
        total: number;
        conceded: any;
        assists: number;
        saves: number;
      }

      export interface Passes {
        total: number;
        key: number;
        accuracy: number;
      }

      export interface Tackles {
        total: number;
        blocks: number;
        interceptions: number;
      }

      export interface Duels {
        total: any;
        won: any;
      }

      export interface Dribbles {
        attempts: number;
        success: number;
        past: any;
      }

      export interface Fouls {
        drawn: number;
        committed: number;
      }

      export interface Cards {
        yellow: number;
        yellowred: number;
        red: number;
      }

      export interface Penalty {
        won: number;
        commited: any;
        scored: number;
        missed: number;
        saved: any;
      }
    }
    export namespace Squads {
      export interface Response {
        team: Team;
        players: Player[];
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface Player {
        id: number;
        name: string;
        age: number;
        number?: number;
        position: string;
        photo: string;
      }
    }
    export namespace TopScorers {
      export interface Response {
        player: Player;
        statistics: Statistic[];
      }

      export interface Player {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        birth: Birth;
        nationality: string;
        height: string;
        weight: string;
        injured: boolean;
        photo: string;
      }

      export interface Birth {
        date: string;
        place: string;
        country: string;
      }

      export interface Statistic {
        team: Team;
        league: League;
        games: Games;
        substitutes: Substitutes;
        shots: Shots;
        goals: Goals;
        passes: Passes;
        tackles: Tackles;
        duels: Duels;
        dribbles: Dribbles;
        fouls: Fouls;
        cards: Cards;
        penalty: Penalty;
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface League {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
      }

      export interface Games {
        appearences: number;
        lineups: number;
        minutes: number;
        number: any;
        position: string;
        rating: string;
        captain: boolean;
      }

      export interface Substitutes {
        in: number;
        out: number;
        bench: number;
      }

      export interface Shots {
        total: number;
        on: number;
      }

      export interface Goals {
        total: number;
        conceded: any;
        assists: number;
        saves: number;
      }

      export interface Passes {
        total: number;
        key: number;
        accuracy: number;
      }

      export interface Tackles {
        total: number;
        blocks: number;
        interceptions: number;
      }

      export interface Duels {
        total: number;
        won: number;
      }

      export interface Dribbles {
        attempts: number;
        success: number;
        past: any;
      }

      export interface Fouls {
        drawn: number;
        committed: number;
      }

      export interface Cards {
        yellow: number;
        yellowred: number;
        red: number;
      }

      export interface Penalty {
        won: number;
        commited: any;
        scored: number;
        missed: number;
        saved: any;
      }
    }
    export namespace TopAssists {
      export interface Response {
        player: Player;
        statistics: Statistic[];
      }

      export interface Player {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        birth: Birth;
        nationality: string;
        height: string;
        weight?: string;
        injured: boolean;
        photo: string;
      }

      export interface Birth {
        date: string;
        place: string;
        country: string;
      }

      export interface Statistic {
        team: Team;
        league: League;
        games: Games;
        substitutes: Substitutes;
        shots: Shots;
        goals: Goals;
        passes: Passes;
        tackles: Tackles;
        duels: Duels;
        dribbles: Dribbles;
        fouls: Fouls;
        cards: Cards;
        penalty: Penalty;
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface League {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
      }

      export interface Games {
        appearences: number;
        lineups: number;
        minutes: number;
        number: any;
        position: string;
        rating: string;
        captain: boolean;
      }

      export interface Substitutes {
        in: number;
        out: number;
        bench: number;
      }

      export interface Shots {
        total: number;
        on: number;
      }

      export interface Goals {
        total: number;
        conceded: number;
        assists: number;
        saves: any;
      }

      export interface Passes {
        total: number;
        key: number;
        accuracy: number;
      }

      export interface Tackles {
        total: number;
        blocks?: number;
        interceptions: number;
      }

      export interface Duels {
        total: number;
        won: number;
      }

      export interface Dribbles {
        attempts: number;
        success: number;
        past: any;
      }

      export interface Fouls {
        drawn: number;
        committed: number;
      }

      export interface Cards {
        yellow: number;
        yellowred: number;
        red: number;
      }

      export interface Penalty {
        won?: number;
        commited: any;
        scored: number;
        missed: number;
        saved: any;
      }
    }
    export namespace TopYellowCards {
      export interface Response {
        player: Player;
        statistics: Statistic[];
      }

      export interface Player {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        birth: Birth;
        nationality: string;
        height?: string;
        weight?: string;
        injured: boolean;
        photo: string;
      }

      export interface Birth {
        date: string;
        place?: string;
        country: string;
      }

      export interface Statistic {
        team: Team;
        league: League;
        games: Games;
        substitutes: Substitutes;
        shots: Shots;
        goals: Goals;
        passes: Passes;
        tackles: Tackles;
        duels: Duels;
        dribbles: Dribbles;
        fouls: Fouls;
        cards: Cards;
        penalty: Penalty;
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface League {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
      }

      export interface Games {
        appearences: number;
        lineups: number;
        minutes: number;
        number: any;
        position: string;
        rating: string;
        captain: boolean;
      }

      export interface Substitutes {
        in: number;
        out: number;
        bench: number;
      }

      export interface Shots {
        total: number;
        on?: number;
      }

      export interface Goals {
        total: number;
        conceded: number;
        assists?: number;
        saves: any;
      }

      export interface Passes {
        total: number;
        key: number;
        accuracy: number;
      }

      export interface Tackles {
        total: number;
        blocks?: number;
        interceptions: number;
      }

      export interface Duels {
        total: number;
        won: number;
      }

      export interface Dribbles {
        attempts: number;
        success: number;
        past: any;
      }

      export interface Fouls {
        drawn: number;
        committed: number;
      }

      export interface Cards {
        yellow: number;
        yellowred: number;
        red: number;
      }

      export interface Penalty {
        won: any;
        commited: any;
        scored: number;
        missed: number;
        saved: any;
      }
    }

    export namespace TopRedCards {
      export interface Response {
        player: Player;
        statistics: Statistic[];
      }

      export interface Player {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        birth: Birth;
        nationality: string;
        height: string;
        weight: string;
        injured: boolean;
        photo: string;
      }

      export interface Birth {
        date: string;
        place?: string;
        country: string;
      }

      export interface Statistic {
        team: Team;
        league: League;
        games: Games;
        substitutes: Substitutes;
        shots: Shots;
        goals: Goals;
        passes: Passes;
        tackles: Tackles;
        duels: Duels;
        dribbles: Dribbles;
        fouls: Fouls;
        cards: Cards;
        penalty: Penalty;
      }

      export interface Team {
        id: number;
        name: string;
        logo: string;
      }

      export interface League {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
      }

      export interface Games {
        appearences: number;
        lineups: number;
        minutes: number;
        number: any;
        position: string;
        rating: string;
        captain: boolean;
      }

      export interface Substitutes {
        in: number;
        out: number;
        bench: number;
      }

      export interface Shots {
        total: number;
        on?: number;
      }

      export interface Goals {
        total: number;
        conceded: number;
        assists?: number;
        saves?: number;
      }

      export interface Passes {
        total: number;
        key?: number;
        accuracy: number;
      }

      export interface Tackles {
        total?: number;
        blocks?: number;
        interceptions: number;
      }

      export interface Duels {
        total: number;
        won: number;
      }

      export interface Dribbles {
        attempts: number;
        success: number;
        past: any;
      }

      export interface Fouls {
        drawn: number;
        committed: number;
      }

      export interface Cards {
        yellow: number;
        yellowred: number;
        red: number;
      }

      export interface Penalty {
        won: any;
        commited: any;
        scored: number;
        missed: number;
        saved?: number;
      }
    }
  }

  export namespace Transfers {
    export interface Response {
      player: Player;
      update: string;
      transfers: Transfer[];
    }

    export interface Player {
      id: number;
      name: string;
    }

    export interface Transfer {
      date: string;
      type?: string;
      teams: Teams;
    }

    export interface Teams {
      in: In;
      out: Out;
    }

    export interface In {
      id: number;
      name: string;
      logo: string;
    }

    export interface Out {
      id: number;
      name: string;
      logo: string;
    }
  }

  export namespace Trophies {
    export interface Response {
      league: string;
      country: string;
      season: string;
      place: string;
    }
  }

  export namespace SideLined {
    export interface Response {
      type: string;
      start: string;
      end: string;
    }
  }

  export namespace OddsInPlay {
    export namespace Live {
      export namespace Live {
        export interface Response {
          fixture: Fixture;
          league: League;
          teams: Teams;
          status: Status2;
          update: string;
          odds: Odd[];
        }

        export interface Fixture {
          id: number;
          status: Status;
        }

        export interface Status {
          long: string;
          elapsed: number;
          seconds: string;
        }

        export interface League {
          id: number;
          season: number;
        }

        export interface Teams {
          home: Home;
          away: Away;
        }

        export interface Home {
          id: number;
          goals: number;
        }

        export interface Away {
          id: number;
          goals: number;
        }

        export interface Status2 {
          stopped: boolean;
          blocked: boolean;
          finished: boolean;
        }

        export interface Odd {
          id: number;
          name: string;
          values: Value[];
        }

        export interface Value {
          value: string;
          odd: string;
          handicap?: string;
          main?: boolean;
          suspended: boolean;
        }
      }

      export namespace Bets {
        export interface Response {
          id: number;
          name: string;
        }
      }
    }
  }
  export namespace OddsPreMatch {
    export namespace Odds {
      export interface Response {
        league: League;
        fixture: Fixture;
        update: string;
        bookmakers: Bookmaker[];
      }

      export interface League {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
      }

      export interface Fixture {
        id: number;
        timezone: string;
        date: string;
        timestamp: number;
      }

      export interface Bookmaker {
        id: number;
        name: string;
        bets: Bet[];
      }

      export interface Bet {
        id: number;
        name: string;
        values: Value[];
      }

      export interface Value {
        value: any;
        odd: string;
      }
    }
    export namespace Mapping {
      export interface Response {
        league: League;
        fixture: Fixture;
        update: string;
      }

      export interface League {
        id: number;
        season: number;
      }

      export interface Fixture {
        id: number;
        date: string;
        timestamp: number;
      }
    }
    export namespace Bookmakers {
      export interface Response {
        id: number;
        name: string;
      }
    }
    export namespace Bets {
      export interface Response {
        id: number;
        name: string;
      }
    }
  }
}
