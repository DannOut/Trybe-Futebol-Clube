import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import {
  completeUser,
  failedAuthLogin,
  invalidToken,
  missingInfoLogin,
  validToken,
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

    sinon.stub(jwt, 'sign').resolves(validToken);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginInfoTest);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ token: validToken });
  });

  it('User with blank "password" field', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(missingInfoLogin);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: blankFields });
  });

  it('User with an invalid password', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(failedAuthLogin);

    expect(chaiHttpResponse.status).to.be.equal(
      incorrectEmailOrPassword.status
    );
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: incorrectEmailOrPassword.message,
    });
  });

  it('User without a valid token', async () => {
    sinon
      .stub(UserModel, 'findOne')
      .resolves(completeUser as unknown as UserModel);
    sinon.stub(jwt, 'verify').resolves(invalidToken);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .send();

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Token not found',
    });
  });

  it.skip('User with a invalid token', async () => {
    sinon.stub(UserModel, 'findOne').resolves(completeUser as UserModel);
    //TODO VERIFICAR COMO FAZ O STUB DO JSON WEB TOKEN
    // sinon.stub(jwt, 'verify').resolves();

    const chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set({ authorization: invalidToken });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Token must be a valid token',
    });

    it.skip('User with a valid token', async () => {
      sinon
        .stub(UserModel, 'findOne')
        .resolves(completeUser as unknown as UserModel);
      sinon.stub(jwt, 'verify').resolves(validToken);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: validToken });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        role: 'user',
      });
    });
  });
});
