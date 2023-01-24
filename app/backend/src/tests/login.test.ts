import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import UserModel from '../database/models/User';
// import userMock from './mocks/user.mock';
import * as jwt from 'jsonwebtoken'
import { Response } from 'superagent';

chai.use(chaiHttp);

const app = new App();
const { expect } = chai;

const loginInfoTest = {
  email: 'naruto@naruto.com',
  password: '123456',
};

describe('Checking Route /login', () => {
  afterEach(function () {
    sinon.restore();
  });

  // it('User login is successful', async () => {
  //   sinon.stub(UserModel, 'findOne').resolves(userMock as unknown as UserModel);

  //   const response = await chai.request(app).post('/login').send(loginInfoTest);

  //   expect(response.status).to.be.equal(200);
  // });
});
