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
