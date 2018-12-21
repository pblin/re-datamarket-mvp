const {makeExecutableSchema} = require("graphql-tools");
const {typeDefs, resolvers} = require("./customer");
module.exports = makeExecutableSchema({typeDefs, resolvers});
