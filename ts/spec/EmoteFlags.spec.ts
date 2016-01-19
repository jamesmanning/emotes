/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts" />

var should = require('should');

import EmoteFlags from '../EmoteFlags';

describe('EmoteFlags', () => {
  describe('#getSpeedForDescription', () => {
      it('should work for a valid description', () => {
        const input = 'fastest';
          const expected = '2s';
          const actual = EmoteFlags.getSpeedForDescription(input);
          should(actual).eql(expected);
      });
      it('should return input for an invalid description', () => {
          const input = '9s';
          const expected = '9s';
          const actual = EmoteFlags.getSpeedForDescription(input);
          should(actual).eql(expected);
      });
    });

    describe('#getDescriptionForSpeed', () => {
        it('should work for a speed found in the map', () => {
          const input = '2s';
            const expected = 'fastest';
            const actual = EmoteFlags.getDescriptionForSpeed(input);
            should(actual).eql(expected);
        });
        it('should return input for a speed not found in the map', () => {
            const input = '9s';
            const expected = '9s';
            const actual = EmoteFlags.getDescriptionForSpeed(input);
            should(actual).eql(expected);
        });
    });
});
