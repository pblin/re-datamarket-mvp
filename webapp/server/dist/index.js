const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
require('dotenv').config();
if (process.env.NODE_ENV !== 'production') {
    require('longjohn');
}
const schema = require("./schema");
const app = express();
app.use(cors());
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.get('/health', (req, res) => {
    res.sendStatus(200);
});
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Rebloc GraphQL server running on port ${PORT}.`);
});
//# sourceMappingURL=index.js.map