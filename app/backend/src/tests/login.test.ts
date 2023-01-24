import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import {
  completeUser,
  failedAuthLogin,
  missingInfoLogin,
  token,
} from './mocks/user.mock';
import { App } from '../app';
import UserModel from '../database/models/User';
import { Response } from 'superagent';
import * as jwt from 'jsonwebtoken';
import { blankFields, incorrectEmailOrPassword } from '../utils/ErrorInfoFile';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

const loginInfoTest = {
  email: 'user@user.com',
  password: 'secret_user',
};

describe('Checking Route /login', () => {
  let chaiHttpResponse: Response;

  afterEach(function () {
    sinon.restore();
  });

  it('User login is successful', async () => {
    sinon
      .stub(UserModel, 'findOne')
      .resolves(completeUser as unknown as UserModel);

    sinon.stub(jwt, 'sign').resolves(token);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginInfoTest);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ token });
  });

  it('User with blank "password" field', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(missingInfoLogin);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: blankFields });
  });

  it.skip('User with an invalid password', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(failedAuthLogin);

    expect(chaiHttpResponse.status).to.be.equal(
      incorrectEmailOrPassword.status
    );
    expect(chaiHttpResponse.body).to.be.deep.equal(incorrectEmailOrPassword.message);
  });
});
