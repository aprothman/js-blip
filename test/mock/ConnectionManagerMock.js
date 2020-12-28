exports.ConnectionManagerMock = class ConnectionManagerMock {
  constructor() {
    this.initForTests();
  }

  initForTests() {
    this.instanceId = 'foo_1';
    this.connectCalled = false;
    this.disconnectCalled = false;
    this.createCustomerCalled = false;
    this.readCustomerCalled = false;
    this.updateCustomerCalled = false;
    this.deleteCustomerCalled = false;

    this.customerId = 'bar_1';
    this.customerName = 'foo';
  }

  connect() {
    this.connectCalled = true;
  }

  disconnect() {
    this.disconnectCalled = true;
  }

  // We pretend to access a simple CRUD backend api

  createCustomer(customerData) {
    this.customerName = customerData.name;
    this.createCustomerCalled = true;

    return this.customerId;
  }

  readCustomer(id) {
    this.readCustomerCalled = true;
    return { id, name: this.customerName };
  }

  updateCustomer(customerData) {
    this.customerId = customerData.id;
    this.customerName = customerData.name;
    this.updateCustomerCalled = true;
  }

  // eslint-disable-next-line no-unused-vars
  deleteCustomer(id) {
    this.deleteCustomerCalled = true;
  }
};
