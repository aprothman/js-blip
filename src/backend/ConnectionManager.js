export default class ConnectionManager {
  // This is the theoretical db connection class that we
  // will create a mock version for in order to test our api

  // eslint-disable-next-line class-methods-use-this
  connect() { }

  // eslint-disable-next-line class-methods-use-this
  readCustomer(id) {
    // Here, we pretend to query our db and return a customer record
    return { id, name: 'Gladys Knight' };
  }
}
