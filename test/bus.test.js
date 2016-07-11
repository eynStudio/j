import bus from '../src/bus.js';
import chai from 'chai';

let expect = chai.expect;

describe('Bus测试', function() {
    it('emit 2', function() {
        bus.on('hi',function (x) {
            expect(x).to.be.equal(2);
        })
        bus.emit('hi',2)
    });
});