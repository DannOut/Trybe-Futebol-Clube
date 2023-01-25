import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { sameTeamError, teamIdNotFound } from '../utils/ErrorInfoFile';
import ErrorHandler from '../utils/ErrorHandler';
import IGoalsToUpdate from '../interfaces/IGoalsToUpdate';

export default class MatchesService {
  constructor(private _matchesModel = Matches, private _teamsModel = Teams) {}

  getAll = async (): Promise<IMatches[] | void> => {
    const matches = await this._matchesModel.findAll({
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
  };

  matchesInProgress = async (progress: boolean): Promise<IMatches[] | void> => {
    const filteredMatches = await this._matchesModel.findAll({
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
  };

  insertMatch = async (match: IMatches): Promise<IMatches> => {
    const { homeTeamId, awayTeamId } = match;
    if (homeTeamId === awayTeamId) {
      const { status, message } = sameTeamError;
      throw new ErrorHandler(status, message);
    }

    await this.checkTeamsInDB(+match.homeTeamId, +match.awayTeamId);
    const matchInserted = await this._matchesModel.create({
      ...match,
      inProgress: true,
    });
    return matchInserted;
  };

  async checkTeamsInDB(homeTeam: number, awayTeam: number): Promise<boolean> {
    const homeTeamCheck = await this._teamsModel.findByPk(homeTeam);
    const awaitTeamCheck = await this._teamsModel.findByPk(awayTeam);
    if (homeTeamCheck && awaitTeamCheck) {
      return true;
    }
    const { status, message } = teamIdNotFound;
    throw new ErrorHandler(status, message);
  }

  finishedMatch = async (id: number): Promise<void> => {
    await this._matchesModel.update({ inProgress: false }, { where: { id } });
  };

  //  prettier-ignore
  updateGoals = async (id: number, goalsToUpdate: IGoalsToUpdate) => {
    await this._matchesModel.update(
      {
        homeTeamGoals: goalsToUpdate.homeTeamGoals,
        awayTeamGoals: goalsToUpdate.awayTeamGoals,
      },
      { where: { id } },
    );
  };
}
