const assert = require("chai").assert;
const customer = require("./customer");

describe('Customer Data', () => {
  it('gets the content', async () => {
    const aCustomer = await customer.getCustomerInfo();
    console.log('customer', aCustomer)
  });
});
