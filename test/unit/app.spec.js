import chai, {expect } from 'chai';
import app from '../../src/app';

describe('App', () => {
    it('should work', () => {
        chai.request(app)
        .get('/health')
        .end((_err, res) => {
            expect(res).to.have.status(200);
        });
    });
});