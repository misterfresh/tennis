const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const server = require('./../server.js')
describe('Players', function() {
  describe('/GET players', () => {
    it('it should GET all the players sorted by ID', done => {
      chai
        .request(server)
        .get('/players')
        .end((err, res) => {
          expect(res.body).to.be.a('array')
          expect(res).to.have.status(200)
          const playersIds = res.body.map(player => player.id)
          assert.equal(
            playersIds,
            playersIds.sort((a, b) => {
              return parseInt(a) <= parseInt(b)
            })
          )
          done()
        })
    })
  })

  describe('/GET player by ID', () => {
    it('it should GET the player data if the ID is in the list', done => {
      chai
        .request(server)
        .get('/player/52')
        .end((err, res) => {
          expect(res.body).to.be.a('object')
          expect(res).to.have.status(200)
          done()
        })
    })
    it('it should return a 404 response if the ID is not found', done => {
      chai
        .request(server)
        .get('/player/AHA')
        .end((err, res) => {
          expect(res.body).to.be.a('object')
          expect(res).to.have.status(404)
          done()
        })
    })
  })
})
