/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const should = require('chai').should();
const JsBlip = require('../build/JsBlipCjs');
const { ConnectionManagerMock } = require('./mock/ConnectionManagerMock');

const { Shop, Customer } = JsBlip;

function setupShop() {
  const shop = new Shop();
  const dbMock = new ConnectionManagerMock();
  shop.db = dbMock;

  return { shop, dbMock };
}

describe('Shop Tests', () => {
  it('connect() connects', () => {
    const { shop, dbMock } = setupShop();

    shop.connect();

    dbMock.connectCalled.should.be.true;
  });

  it('disconnect() disconnects', () => {
    const { shop, dbMock } = setupShop();

    shop.disconnect();

    dbMock.disconnectCalled.should.be.true;
  });

  it('getCustomer() gets customer', () => {
    const { shop, dbMock } = setupShop();

    const id = 'custId';
    const name = 'Gladys';
    dbMock.customerId = id;
    dbMock.customerName = name;

    const customer = shop.getCustomer(id);

    dbMock.readCustomerCalled.should.be.true;
    customer.getId().should.equal(id);
    customer.getName().should.equal(name);
    customer.db.should.equal(dbMock);
  });

  it('getCustomer() not connected throws', () => {
    const { shop } = setupShop();

    delete shop.db;

    (() => shop.getCustomer('test')).should.throw;
  });

  it('getCustomer() no id throws', () => {
    const { shop } = setupShop();

    (() => shop.getCustomer()).should.throw;
  });

  it('addCustomer() adds customer', () => {
    const { shop, dbMock } = setupShop();
    const customer = new Customer();
    const newName = 'Gladys';
    const newId = 'id1';

    customer.setName(newName);
    dbMock.customerId = newId;

    const { id } = shop.addCustomer(customer);

    dbMock.createCustomerCalled.should.be.true;
    id.should.equal(newId);
    dbMock.customerName.should.equal(newName);
  });

  it('addCustomer() not connected throws', () => {
    const { shop } = setupShop();

    delete shop.db;

    (() => shop.addCustomer({})).should.throw;
  });

  it('addCustomer() no customer throws', () => {
    const { shop } = setupShop();

    (() => shop.addCustomer()).should.throw;
  });

  it('addCustomer() customer connected throws', () => {
    const { shop, dbMock } = setupShop();
    const customer = new Customer();
    const newName = 'Gladys';

    customer.setName(newName);
    customer.db = dbMock;

    (() => shop.addCustomer(customer)).should.throw;
  });

  it('addCustomer() customer has id throws', () => {
    const { shop } = setupShop();
    const customer = new Customer();
    const newName = 'Gladys';
    const newId = 'id1';

    customer.setName(newName);
    customer.id = newId;

    (() => shop.addCustomer(customer)).should.throw;
  });

  it('removeCustomer() removes customer', () => {
    const { shop, dbMock } = setupShop();

    shop.removeCustomer('id');

    dbMock.deleteCustomerCalled.should.be.true;
  });

  it('removeCustomer() no id throws', () => {
    const { shop } = setupShop();

    (() => shop.removeCustomer()).should.throw;
  });
});
