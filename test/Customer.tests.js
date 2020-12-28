/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const should = require('chai').should();
const JsBlip = require('../build/JsBlipCjs');
const { ConnectionManagerMock } = require('./mock/ConnectionManagerMock');

const { Customer } = JsBlip;

describe('Customer Tests', () => {
  it('Initial values', () => {
    const customer = new Customer();

    customer.id.should.equal('');
    customer.name.should.equal('');
    should.not.exist(customer.db);
  });

  it('Construct initial data', () => {
    const id = 'id5';
    const name = 'Gladys';
    const data = { id, name };

    const customer = new Customer(data);

    customer.id.should.equal(id);
    customer.name.should.equal(name);
    should.not.exist(customer.db);
  });

  it('Construct data with db', () => {
    const id = 'id5';
    const name = 'Gladys';
    const data = { id, name };
    const dbMock = new ConnectionManagerMock();

    const customer = new Customer(data, dbMock);
    customer.db.should.equal(dbMock);
  });

  it('Id returns value', () => {
    const id = 'id5';
    const customer = new Customer();
    customer.id = id;

    customer.getId().should.equal(id);
  });

  it('Name get/set', () => {
    const customer = new Customer();
    const name = 'Gladys';

    customer.setName(name);
    customer.getName().should.equal(name);
  });

  it('update() updates', () => {
    const id = 'id5';
    const name = 'Gladys';
    const data = { id, name };
    const dbMock = new ConnectionManagerMock();

    const customer = new Customer(data, dbMock);
    customer.update();

    dbMock.updateCustomerCalled.should.be.true;
    dbMock.customerId.should.equal(id);
    dbMock.customerName.should.equal(name);
  });
});
