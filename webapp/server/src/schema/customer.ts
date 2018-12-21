const Customer = require("../database/customer");

export const typeDefs = `
  type Customer {
    id: Int
    firstName: String!
    lastName: String!
    primaryEmail: String!
    secondaryEmail: String
    roles: [String]
    isOrgAdmin: Boolean
  }

  type Organization {
    id: Int!
    orgName: String!
    address: String!
    memberId: Int
  }

  type Query {
    aCustomer (primaryEmail: String!): Customer
    allOrgs: [Organization!]
  }

  type Mutation {
    createCustomer (    id: Int,
                        firstName: String!, 
                        lastName: String!, 
                        primaryEmail: String!, 
                        secondaryEmail: String,
                        roles: [String],
                        isOrgAdmin: Boolean): Customer

    createOrganization (name: String!, address: String!, memberId: Int!): Organization
    insertAnOrgMember (memberId:Int!, orgId:Int!): Organization
  }
`;

export const resolvers = {
  Query: {
    aCustomer: (_, data) =>  {
        return Customer.getCustomerInfo(data.primaryEmail);
    },
    allOrgs: () => Customer.getAllOrgs()
  },

  Mutation: {
    createCustomer: (_, data) => {
      const newCustomer = Object.assign(data);
      //window.console.log(data);
      Customer.createCustomer(newCustomer);
      return newCustomer;
    },
    createOrganization: (_, data) => {
      const newOrg = data;
      Customer.createAnOrg(newOrg);
      return newOrg;
    },
    insertAnOrgMember: (_, data) => {
      const orgInfo = data;
      Customer.insertAnOrgMember (orgInfo)
      return orgInfo;
    }
  }
};
