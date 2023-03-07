const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { validUser, customerUser } = require('./mocks/user.mocks');

chai.use(chaiHttp);
chai.should();

describe('Tests the /login endpoint', () => {
  it('Should return an error message for invalid credentials', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'invalid@deliveryapp.com',
        password: 'invalidpassword',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Incorrect username or password');
        done();
      });
  });

  it('Should return a token for valid credentials', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        email: validUser[2].email,
        password: validUser[2].password,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        res.body.should.have.property('name');
        res.body.should.have.property('role');
        res.body.should.have.property('id');
        res.body.should.have.property('email');
        done();
      });
});
it('Should return a valid token for customer user', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        email: validUser[2].email,
        password: validUser[2].password,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token').to.be.a('string');
        res.body.should.have.property('name').eql(customerUser.name);
        res.body.should.have.property('role').eql(customerUser.role);
        res.body.should.have.property('id').eql(customerUser.id);
        done();
      });
  });
      });
