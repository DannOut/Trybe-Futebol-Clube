import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { sameTeamError, teamIdNotFound } from '../utils/ErrorInfoFile';
import ErrorHandler from '../utils/ErrorHandler';
import IGoalsToUpdate from '../interfaces/IGoalsToUpdate';

export default class MatchesService {
  static async getAll(): Promise<Matches[]> {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  //  prettier-ignore
  static async matchesInProgress(
    progress: boolean,
  ): Promise<Matches[]> {
    const filteredMatches = await Matches.findAll({
      where: { inProgress: progress },
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return filteredMatches;
  }

  static async insertMatch(match: IMatches): Promise<IMatches> {
    const { homeTeamId, awayTeamId } = match;
    if (homeTeamId === awayTeamId) {
      const { status, message } = sameTeamError;
      throw new ErrorHandler(status, message);
    }

    await this.checkTeamsInDB(+match.homeTeamId, +match.awayTeamId);
    const matchInserted = await Matches.create({
      ...match,
      inProgress: true,
    });
    return matchInserted as unknown as IMatches;
  }

  //  prettier-ignore
  static async checkTeamsInDB(
    homeTeam: number,
    awayTeam: number,
  ): Promise<boolean> {
    const homeTeamCheck = await Teams.findByPk(homeTeam);
    const awaitTeamCheck = await Teams.findByPk(awayTeam);
    if (homeTeamCheck && awaitTeamCheck) {
      return true;
    }
    const { status, message } = teamIdNotFound;
    throw new ErrorHandler(status, message);
  }

  static async finishedMatch(id: number): Promise<void> {
    await Matches.update({ inProgress: false }, { where: { id } });
  }

  //  prettier-ignore
  static async updateGoals(id: number, goalsToUpdate: IGoalsToUpdate) {
    await Matches.update(
      {
        homeTeamGoals: goalsToUpdate.homeTeamGoals,
        awayTeamGoals: goalsToUpdate.awayTeamGoals,
      },
      { where: { id } },
    );
  }
}
