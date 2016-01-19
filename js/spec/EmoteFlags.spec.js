/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />
"use strict";
var should = require('should');
var EmoteFlags_1 = require('../EmoteFlags');
describe('EmoteFlags', function () {
    describe('#getSpeedForDescription', function () {
        it('should work for a valid description', function () {
            var input = 'fastest';
            var expected = '2s';
            var actual = EmoteFlags_1.default.getSpeedForDescription(input);
            should(actual).eql(expected);
        });
        it('should return input for an invalid description', function () {
            var input = '9s';
            var expected = '9s';
            var actual = EmoteFlags_1.default.getSpeedForDescription(input);
            should(actual).eql(expected);
        });
    });
    describe('#getDescriptionForSpeed', function () {
        it('should work for a speed found in the map', function () {
            var input = '2s';
            var expected = 'fastest';
            var actual = EmoteFlags_1.default.getDescriptionForSpeed(input);
            should(actual).eql(expected);
        });
        it('should return input for a speed not found in the map', function () {
            var input = '9s';
            var expected = '9s';
            var actual = EmoteFlags_1.default.getDescriptionForSpeed(input);
            should(actual).eql(expected);
        });
    });
});
//# sourceMappingURL=EmoteFlags.spec.js.map