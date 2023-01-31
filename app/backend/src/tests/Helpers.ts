import ILeaderboard from '../interfaces/ILeaderboard';
import IMatches from '../interfaces/IMatches';

/*   {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  }, */

//* MODELOS PARA RETORNAR
export const getHomePoints = (acc: number, curr: IMatches): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const getHomeWins = (acc: number, curr: IMatches): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const getDrawsHome = (acc: number, curr: IMatches): number => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const getHomeLosses = (acc: number, curr: IMatches): number => {
  if (curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
  return acc;
};

export const getHomeGoalsFavor = (acc: number, curr: IMatches): number =>
  curr.homeTeamGoals + acc;

export const getHomeGoalsOwn = (acc: number, curr: IMatches): number =>
  curr.awayTeamGoals + acc;

export const getAwayPoints = (acc: number, curr: IMatches): number => {
  if (curr.awayTeamGoals > curr.homeTeamGoals) return acc + 3;
  if (curr.awayTeamGoals === curr.homeTeamGoals) return acc + 1;
  return acc;
};

export const getAwayWins = (acc: number, curr: IMatches): number => {
  if (curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
  return acc;
};

export const getAwayLosses = (acc: number, curr: IMatches): number => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const getAwayGoalsFavor = (acc: number, curr: IMatches): number =>
  curr.awayTeamGoals + acc;

export const getAwayGoalsOwn = (acc: number, curr: IMatches): number =>
  curr.homeTeamGoals + acc;

export const getDrawsAway = (acc: number, curr: IMatches): number => {
  if (curr.awayTeamGoals === curr.homeTeamGoals) return acc + 1;
  return acc;
};

// prettier-ignore
export const orderTeams = (leaderboard: ILeaderboard[]) => leaderboard.sort(
  (a, b) =>
    b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn,
);

export const mergeLeaderboards = (
  home: ILeaderboard[],
  away: ILeaderboard[]
): ILeaderboard[] => home.map((team, index) => {
    const mergedTeam = Object.entries(team).reduce(
      (acc, [key, value]: [string, string | number]) => ({
        ...acc,
        [key]:
          typeof value === 'number'
            ? value + Number(away[index][key as keyof ILeaderboard])
            : value,
      }),
      away[index]
    );
    return {
      ...mergedTeam,
      get goalsBalance(): number { return mergedTeam.goalsFavor - mergedTeam.goalsOwn;},
      get efficiency() { return ((mergedTeam.totalPoints / (mergedTeam.totalGames * 3)) * 100).toFixed(2); },
    } as ILeaderboard;
  });


//  prettier-ignore
// export const mergeLeaderboards = async (home: ILeaderboard[], away: ILeaderboard[]):
// Promise<ILeaderboard[]> => {
//   const arraysMerged = home.map((team, index) => ({
//     name: team.name,
//     totalPoints: team.totalPoints + away[index].totalPoints,
//     totalGames: team.totalGames + away[index].totalGames,
//     totalVictories: team.totalVictories + away[index].totalVictories,
//     totalDraws: team.totalDraws + away[index].totalDraws,
//     totalLosses: team.totalLosses + away[index].totalLosses,
//     goalsFavor: team.goalsFavor + away[index].goalsFavor,
//     goalsOwn: team.goalsOwn + away[index].goalsOwn,
//     get goalsBalance(): number {
//       return this.goalsFavor - this.goalsOwn;
//     },
//     get efficiency() {
//       return ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
//     },
//   }));
//   return arraysMerged;
// };