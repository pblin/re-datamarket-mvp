const DB = require("./index");
interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  primaryEmail: string;
  secondaryEmail: string;
  roles: string[];
  isOrgAdmin: boolean;
}

async function getCustomerInfo (email: string): Promise<Customer>  {
  var result = null 

  const query = {
    
    text: "SELECT id, first_name, last_name, primary_email, secondary_email, roles, is_org_admin \
     FROM marketplace.customer where primary_email = $1",
    // text: "SELECT id FROM marketplace.customer where primary_email = $1",
    values: [ email ],
  };
  try {
    let result = await DB.get(query)
    let  found : Customer = <Customer> {
      id: -1, 
      firstName:'na',
      lastName:'na',
      primaryEmail:'na',
      secondaryEmail:'na',
      roles: ['b'],
      isOrgAdmin:false
    }
    if (result[0]) { 
      found.id = result[0].id
      found.firstName = result[0].first_name
      found.lastName = result[0].last_name
      found.primaryEmail = result[0].primary_email
      found.secondaryEmail = result[0].secondary_email
      found.roles = result[0].roles
      found.isOrgAdmin = result[0].is_org_admin
    }
    return (found)
  }
  catch (e)
  { 
    console.log(e);
  }
}

async function createCustomer (customer: Customer ): Promise<Customer> {
  const { id, firstName, lastName, primaryEmail, secondaryEmail, roles, isOrgAdmin } = customer;

  const query = {
    text: "INSERT INTO marketplace.customer (first_name, last_name, primary_email, secondary_email, roles, is_org_admin) \
    VALUES($1, $2, $3, $4, $5, $6)",
    values: [ firstName, lastName, primaryEmail, secondaryEmail, roles, isOrgAdmin  ]
  };
  return await DB.mutate(query);
}

interface Organization {
  id: number;
  orgName: string;
  address: string;
  memberId: number;

}
async function createAnOrg(org: Organization ): Promise<any> {
  const { id, orgName, address, memberId } = org;
  const query = {
    text: "INSERT INTO marketplace.organization (org_name, address) \
    VALUES($1, $2)",
    values: [ orgName, address ]
  };
  return await DB.mutate(query);
}

async function insertAnOrgMember(org: Organization ): Promise<any> {
  const { id, orgName, address, memberId } = org;
  const query = {
    text: "INSERT INTO marketplace.organization (member_id) \
    VALUES($1) WHHERE org_id = $2",
    values: [ memberId, id ]
  };
  return await DB.mutate(query);
}
async function getAllOrgs(): Promise<any>  {
  return await DB.get("SELECT * FROM marketplace.organization");
}

module.exports = {
  getCustomerInfo,
  createCustomer,
  insertAnOrgMember,
  createAnOrg,
  getAllOrgs
};
