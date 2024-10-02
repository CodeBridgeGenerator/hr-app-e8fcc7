const assert = require('assert');
const app = require('../../src/app');

describe('\'jobClassified\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobClassified');

    assert.ok(service, 'Registered the service (jobClassified)');
  });
});
