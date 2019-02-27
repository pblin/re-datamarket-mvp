import {v1 as uuid} from 'uuid';
import {config} from "./ServiceConfig";

//TODO: SET BASE URL AS A PROP
export class SchemaService {
  baseUrl: string;
  constructor() {
    this.baseUrl = location.protocol+'//'+location.hostname + ":9000";
  }

  async postSchema(basicInfo: any, schema: any[], id: any) {
    const uid = uuid();

    let body = {
      id: uid,
      name: basicInfo.name,
      description: basicInfo.description,
      access_url: basicInfo.endpoint,
      api_key: basicInfo.sampleAPIKey,
      enc_data_key: basicInfo.sampleDataKey,
      search_terms: `{${basicInfo.searchTerms}}`, //TODO: ALLOW AN ARRAY OF SEARCH TERMS
      delivery_method: 'API',
      dataset_owner_id: id,
      price_low: basicInfo.askPriceLow,
      price_high: basicInfo.askPriceHigh,
      num_of_records: basicInfo.records,
      country: basicInfo.country,
      state_province: basicInfo.state,
      date_created: new Date(),
      date_modified: new Date(),
      parameters: '{}',
      stage: 0,
      json_schema: JSON.stringify(schema)
    };

    await fetch(`${this.baseUrl}/schema`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return uid;
  }

  async getUserSchemas(id: string) {
    const results = await fetch(`${config.serverBase}/schema/${id}`);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

  async getAllSchemas() {
    const results = await fetch(`${config.serverBase}/marketplace`);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

}
