export default class Customer {
  constructor(customerData, db) {
    if (customerData) {
      this.buildFromData(customerData, db);
    } else {
      this.id = '';
      this.name = '';
    }
  }

  buildFromData(customerData, db) {
    this.id = customerData.id;
    this.name = customerData.name;
    if (db) {
      this.db = db;
    }
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setName(value) {
    this.name = value;
    return this;
  }

  update() {
    if (!this.db) throw new Error("This customer hasn't been associated with the database yet!");
    if (!this.id) throw new Error('This customer must have been assigned an ID in order to update it!');

    this.db.updateCustomer(this);
    return this;
  }
}
