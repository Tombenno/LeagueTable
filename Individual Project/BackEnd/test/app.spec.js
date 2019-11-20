const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

describe('server', () => {
    it('should do something', () => {
        chai.expect(true).to.eq(true)
    })
    it('should do another thing', () => {
        chai.expect(false).to.eq(false)
    })

    it('should do another thing', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.text).to.eq('yay');
                done();
            })
    })
})