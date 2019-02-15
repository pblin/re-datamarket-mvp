import {v1 as uuid} from 'uuid';

//TODO: SET BASE URL AS A PROP
export class SchemaService {
  client: any;
  baseUrl: string;
  constructor() {
    this.baseUrl = location.protocol+'//'+location.hostname + ":9000";
  }

  async postSchema(basicInfo: any, schema: any[]) {
    let body = {
      id: uuid(),
      name: basicInfo.name,
      description: basicInfo.description,
      access_url: basicInfo.endpoint,
      api_key: basicInfo.sampleAPIKey,
      enc_data_key: basicInfo.sampleDataKey,
      search_terms: `{'${basicInfo.searchTerms}'}`, //TODO: ALLOW AN ARRAY OF SEARCH TERMS
      delivery_method: 'API',
      dataset_owner_id: 1, //TODO: (1)find dataset owner id (Requires finished profile) (2) Save profile api (3) block manager until profile is complete
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

    const results = await fetch(`${this.baseUrl}/schema`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    console.log('POST RESULTS');
    console.log(results);
    return true;
  }

}
