// inbuilt nodejs assertion library
// const assert = require('assert')

//chai assert library
const assert = require('chai').assert;
const server = require('../app').server;
const port = require('../app').port;
// const app = require('../app');


describe('App', function() {
    it('app should return server is listen to request on port 3000', function() {
        let result = server();
        assert.equal(result, 'server is listen to request on port 3000');
    });

    it('server should return type string', function() {
        let result = server();
        assert.typeOf(result, 'string');

    });
});