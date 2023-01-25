import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import { Response } from 'superagent';
import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';
import MatchesService from '../services/Matches.service';
import {
  arrayInProgressMatchesMock,
  arrayMatchesMock,
  matchCreated,
} from './mocks/matches.mock';
import * as jwt from 'jsonwebtoken';
import { successAuthLogin } from './mocks/user.mock';
import { homeTeamMock, awayTeamMock } from './mocks/teams.mock';
import IMatches from '../interfaces/IMatches';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Checking Route /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(function () {
    sinon.restore();
  });

  it('Get return all matches', async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(arrayMatchesMock as unknown as MatchesModel[]);

    const chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(arrayMatchesMock);
  });

  it('Get all inProgress matches', async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(arrayInProgressMatchesMock as unknown as MatchesModel[]);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(arrayInProgressMatchesMock);
  });

  it.only('user can insert a new match', async () => {
    sinon
      .stub(jwt, 'verify')
      .resolves({ email: 'admin@admin.com', password: 'secret_admin' });
    // sinon
    //   .stub(MatchesService.prototype, 'insertMatch')
    //   .resolves(matchCreated as any);
    sinon
      .stub(TeamsModel, 'findByPk')
      .onFirstCall()
      .resolves(homeTeamMock as TeamsModel)
      .onSecondCall()
      .resolves(awayTeamMock as TeamsModel);
    sinon.stub(MatchesModel, 'create').resolves(matchCreated as any);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeamId: 2,
        awayTeamId: 3,
        homeTeamGoals: 4,
        awayTeamGoals: 5,
      })
      .set('authorization', 'hkjsjhkjashsjda');

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchCreated);
  });
});
