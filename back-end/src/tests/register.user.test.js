const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { sequelize } = require('../database/models');
const { User } = require('../database/models');
const {  alreadyExist, validBody, registerOutput } = require('./mocks/register.mocks');
const { validUser } = require('./mocks/user.mocks');
const { validateToken } = require('../auth/tokenUtil');
const { expect } = chai;
chai.use(chaiHttp);

describe('Tests the /register endpoint', function() {
    
      afterEach(function() {
        sinon.restore();
      });
    
      after(async function() {

        await User.destroy({ where: { email: validBody.email } });
      });

    it('if user already exist return a error', async function() {
      sinon.stub(User, 'findOne').resolves(validUser[0]);

      const { body, status } = await chai.request(app).post('/register').send(alreadyExist);
      expect(status).to.be.equal(409);
      expect(body).to.be.deep.equal({ message: 'User already exist' });
    });
    it('if user not exist create a new user', async function() {
        const { body, status } = await chai.request(app).post('/register').send(validBody);
        expect(status).to.be.equal(201);
        expect(body).to.be.deep.equal({
            name: registerOutput.name,
            email: registerOutput.email,
            role: registerOutput.role,
            id: body.id,
            token: body.token,
        });
      
        const createdUser = await User.findOne({ where: { email: validBody.email } });
        expect(createdUser).to.not.be.null;
        expect(createdUser.email).to.be.equal(validBody.email);
        expect(createdUser.name).to.be.equal(validBody.name);
        expect(createdUser.role).to.be.equal('customer');

        const validation = await validateToken(body.token);
        expect(validation).to.not.have.property('error');
        expect(validation.email).to.be.equal(validBody.email);
      });
    });
