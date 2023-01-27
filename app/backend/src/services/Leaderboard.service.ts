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
  getAwayPoints,
  getAwayWins,
  getAwayLosses,
  getAwayGoalsFavor,
  getAwayGoalsOwn,
  mergeLeaderboards,
  // reduceteste,
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

  // prettier-ignore
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
    return infoTeams;
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
    return infoTeams;
  }

  static async getAllLeaderboard(): Promise<ILeaderboard[]> {
    const arrayHome = await this.getAllHomeLeaderboard();
    const arrayAway = await this.getAllAwayLeaderboard();

    // const teste2 = await reduceteste(arrayHome, arrayAway);
    // console.log(teste2);

    const mergedArrays = mergeLeaderboards(arrayHome, arrayAway);
    return mergedArrays;
  }
}
