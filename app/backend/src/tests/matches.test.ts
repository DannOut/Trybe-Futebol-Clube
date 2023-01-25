import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import { Response } from 'superagent';
import MatchesModel from '../database/models/Matches';
import {
  arrayInProgressMatchesMock,
  arrayMatchesMock,
} from './mocks/matches.mock';

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
});
