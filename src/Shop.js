import ConnectionManager from './backend/ConnectionManager';
import Customer from './Customer';

export default class Shop {
  constructor() {
    this.db = new ConnectionManager();
  }

  connect() {
    this.db.connect();
  }

  disconnect() {
    this.db.disconnect();
  }

  getCustomer(id) {
    if (!id) throw new Error('Invalid id.');
    if (!this.db) throw new Error('The shop must be connected to get a customer.');

    const data = this.db.readCustomer(id);
    const customer = new Customer(data);
    customer.db = this.db;

    return customer;
  }

  addCustomer(customer) {
    if (!customer) throw new Error('Invalid customer.');
    if (!this.db) throw new Error('The shop must be connected to add a customer.');
    if (customer.db) throw new Error('This Customer instance is already associated with the db!');
    if (customer.id !== '') throw new Error(`Customer ${customer.id} already has an ID!`);

    const data = { name: customer.name };
    data.id = this.db.createCustomer(data);
    customer.buildFromData(data, this.db);

    return customer;
  }

  removeCustomer(id) {
    if (!id) throw new Error('Invalid id.');

    this.db.deleteCustomer(id);
  }
}
