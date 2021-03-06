const prettyStdout = require('../../lib/logger/pretty-stdout');
const chalk = require('chalk');

describe('logger/pretty-stdout', () => {
  describe('getMeta(rec)', () => {
    it('returns empty string if null rec', () => {
      expect(prettyStdout.getMeta(null)).toEqual('');
    });
    it('returns empty string if empty rec', () => {
      expect(prettyStdout.getMeta({})).toEqual('');
    });
    it('returns empty string if no meta fields', () => {
      const rec = {
        foo: 'bar',
      };
      expect(prettyStdout.getMeta(rec)).toEqual('');
    });
    it('supports single meta', () => {
      const rec = {
        foo: 'bar',
        repository: 'a/b',
      };
      expect(prettyStdout.getMeta(rec)).toEqual(
        chalk.gray(' (repository=a/b)')
      );
    });
    it('supports multi meta', () => {
      const rec = {
        foo: 'bar',
        branch: 'c',
        repository: 'a/b',
      };
      expect(prettyStdout.getMeta(rec)).toEqual(
        chalk.gray(' (repository=a/b, branch=c)')
      );
    });
  });
  describe('getDetails(rec)', () => {
    it('returns empty string if null rec', () => {
      expect(prettyStdout.getDetails(null)).toEqual('');
    });
    it('returns empty string if empty rec', () => {
      expect(prettyStdout.getDetails({})).toEqual('');
    });
    it('returns empty string if no meta fields', () => {
      const rec = {
        foo: 'bar',
      };
      expect(prettyStdout.getDetails(rec)).toEqual('');
    });
    it('supports a config', () => {
      const rec = {
        foo: 'bar',
        config: {
          a: 'b',
          d: ['e', 'f'],
        },
      };
      expect(prettyStdout.getDetails(rec)).toMatchSnapshot();
    });
  });
});
