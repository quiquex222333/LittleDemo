const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app/app");
const should = chai.should();

describe("Users", () => {
  describe("/GET users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});

chai.use(chaiHttp);
describe("Books", () => {
  describe("/GET books", () => {
    it("it should GET all the books", (done) => {
      chai
        .request(app)
        .get("/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
