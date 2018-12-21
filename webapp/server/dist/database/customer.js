var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DB = require("./index");
function getCustomerInfo(email) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = null;
        const query = {
            text: "SELECT id, first_name, last_name, primary_email, secondary_email, roles, is_org_admin \
     FROM marketplace.customer where primary_email = $1",
            // text: "SELECT id FROM marketplace.customer where primary_email = $1",
            values: [email],
        };
        try {
            let result = yield DB.get(query);
            let found = {
                id: -1,
                firstName: 'na',
                lastName: 'na',
                primaryEmail: 'na',
                secondaryEmail: 'na',
                roles: ['b'],
                isOrgAdmin: false
            };
            if (result[0]) {
                found.id = result[0].id;
                found.firstName = result[0].first_name;
                found.lastName = result[0].last_name;
                found.primaryEmail = result[0].primary_email;
                found.secondaryEmail = result[0].secondary_email;
                found.roles = result[0].roles;
                found.isOrgAdmin = result[0].is_org_admin;
            }
            return (found);
        }
        catch (e) {
            console.log(e);
        }
    });
}
function createCustomer(customer) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, firstName, lastName, primaryEmail, secondaryEmail, roles, isOrgAdmin } = customer;
        const query = {
            text: "INSERT INTO marketplace.customer (first_name, last_name, primary_email, secondary_email, roles, is_org_admin) \
    VALUES($1, $2, $3, $4, $5, $6)",
            values: [firstName, lastName, primaryEmail, secondaryEmail, roles, isOrgAdmin]
        };
        return yield DB.mutate(query);
    });
}
function createAnOrg(org) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, orgName, address, memberId } = org;
        const query = {
            text: "INSERT INTO marketplace.organization (org_name, address) \
    VALUES($1, $2)",
            values: [orgName, address]
        };
        return yield DB.mutate(query);
    });
}
function insertAnOrgMember(org) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, orgName, address, memberId } = org;
        const query = {
            text: "INSERT INTO marketplace.organization (member_id) \
    VALUES($1) WHHERE org_id = $2",
            values: [memberId, id]
        };
        return yield DB.mutate(query);
    });
}
function getAllOrgs() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield DB.get("SELECT * FROM marketplace.organization");
    });
}
module.exports = {
    getCustomerInfo,
    createCustomer,
    insertAnOrgMember,
    createAnOrg,
    getAllOrgs
};
//# sourceMappingURL=customer.js.map