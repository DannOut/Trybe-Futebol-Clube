import ILeaderboard from '../interfaces/ILeaderboard';
import IMatches from '../interfaces/IMatches';
import {
  getDrawsHome,
  getDrawsAway,
  getHomeGoalsFavor,
  getHomeGoalsOwn,
  getHomeLosses,
  getHomePoints,
  getHomeWins,
  orderTeams,
  getAwayPoints,
  getAwayWins,
  getAwayLosses,
  getAwayGoalsFavor,
  getAwayGoalsOwn,
} from '../utils/Helpers';
import MatchesService from './Matches.service';
import TeamsService from './Teams.service';

export default class LeaderboardService {
  //* pego todas as matches
  static async matchesNotInProgress(): Promise<IMatches[]> {
    const filteredMatches = await MatchesService.matchesInProgress(false);
    return filteredMatches as unknown as IMatches[];
  }

  //* pego os teams
  // prettier-ignore
  static async findAllHomeTeamsMatches(id: number): Promise<IMatches[]> {
    return (await this.matchesNotInProgress()).filter(
      (val) => val.homeTeamId === id,
    );
  }

  static async findAllAwayTeamsMatches(id: number): Promise<IMatches[]> {
    return (await this.matchesNotInProgress()).filter(
      (val) => val.awayTeamId === id,
    );
  }

  //* map que vai ser o construtor de tudo
  //* ajuda dos instrutores + summer + cadu + lucas + tanta gente que até perdi a conta
  //* todos os times
  //* estou gerando um array de arrays

  // prettier-ignore
  static async getAllHomeLeaderboard(): Promise<ILeaderboard[]> {
    const allTeams = await TeamsService.getAll();
    const teams = await Promise.all(
      allTeams.map(async (team) => this.findAllHomeTeamsMatches(team.id)),
    );
    const infoTeams = teams.map((team, index) => ({
      name: allTeams[index].teamName,
      totalPoints: team.reduce(getHomePoints, 0),
      get totalGames(): number { return this.totalVictories + this.totalDraws + this.totalLosses; },
      totalVictories: team.reduce(getHomeWins, 0),
      totalDraws: team.reduce(getDrawsHome, 0),
      totalLosses: team.reduce(getHomeLosses, 0),
      goalsFavor: team.reduce(getHomeGoalsFavor, 0),
      goalsOwn: team.reduce(getHomeGoalsOwn, 0),
      get goalsBalance(): number { return this.goalsFavor - this.goalsOwn; },
      get efficiency() { return ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2); },
    }));
    return orderTeams(infoTeams);
  }

  // prettier-ignore
  static async getAllAwayLeaderboard(): Promise<ILeaderboard[]> {
    const allTeams = await TeamsService.getAll();
    const teams = await Promise.all(
      allTeams.map(async (team) => this.findAllAwayTeamsMatches(team.id)),
    );
    const infoTeams = teams.map((team, index) => ({
      name: allTeams[index].teamName,
      totalPoints: team.reduce(getAwayPoints, 0),
      get totalGames(): number { return this.totalVictories + this.totalDraws + this.totalLosses; },
      totalVictories: team.reduce(getAwayWins, 0),
      totalDraws: team.reduce(getDrawsAway, 0),
      totalLosses: team.reduce(getAwayLosses, 0),
      goalsFavor: team.reduce(getAwayGoalsFavor, 0),
      goalsOwn: team.reduce(getAwayGoalsOwn, 0),
      get goalsBalance(): number { return this.goalsFavor - this.goalsOwn; },
      get efficiency() { return ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2); },
    }));
    return orderTeams(infoTeams);
  }
}

// LeaderboardService.getAllHomeLeaderboard();
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
