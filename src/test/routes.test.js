import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../app.js'; // นำเข้าแอปพลิเคชันของคุณ

chai.use(chaiHttp);

describe('Tourist Entity Routes', () => {
    it('should get all tourist entities', (done) => {
        chai.request(app)
            .get('/tourist-entities')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get a specific tourist entity by ID', (done) => {
        const id = 1; // สมมติว่า ID ของสถานที่ท่องเที่ยวคือ 1
        chai.request(app)
            .get(`/tourist-entities/${id}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id', id);
                done();
            });
    });

    it('should get nearby tourist entities', (done) => {
        const latitude = 17.3910;
        const longitude = 104.7785;
        const distanceLimit = 10; // ระยะทาง 10 กิโลเมตร
        chai.request(app)
            .get('/nearby-entities')
            .query({ latitude, longitude, distanceLimit })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});
