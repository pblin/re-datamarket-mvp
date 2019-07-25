import {config} from "./ServiceConfig";

class SchemaService {
  async searchSchemaFields(terms) {
    let url = `${config.serverBase}/schema/search?fields=${terms.join(',')}`;

    const results = await fetch(url);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }
}

const schemaServiceInstance = new SchemaService();

export default schemaServiceInstance;
