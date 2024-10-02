const assert = require('assert');
const app = require('../../src/app');

describe('\'employeeDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('employeeDetails');

    assert.ok(service, 'Registered the service (employeeDetails)');
  });
});
