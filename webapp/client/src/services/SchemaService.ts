import { GraphQLClient } from 'graphql-request';
import {APIKEY, GRAPHQL} from "../components/ConfigEnv";

export class SchemaService {
  client: any;

  constructor() {
    this.client = new GraphQLClient(GRAPHQL, {
      headers: {
        'X-Hasura-Access-Key': APIKEY,
      },
    });
  }

  postSchema(basicInfo: any, schema: any[]) {
    console.log(basicInfo);
    console.log(schema);
  }

}
