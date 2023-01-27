import * as sinon from 'sinon';
import * as chai from 'chai';
import LeaderboardService from '../services/Leaderboard.service';
import { homeLeaderboardMock, awayLeaderboardMock, getAllLeaderboardMock} from './mocks/leaderboards.mock';

// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Checking Route /leaderboard', () => {
  let chaiHttpResponse: Response;

  afterEach(function () {
    sinon.restore();
  });

  it('/leaderboard/home is working as intended', async () => {
    sinon.stub(LeaderboardService, 'getAllHomeLeaderboard').resolves(homeLeaderboardMock as any);

    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(homeLeaderboardMock)
  })
});
