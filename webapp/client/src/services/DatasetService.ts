import {v1 as uuid} from 'uuid';
import {config} from "./ServiceConfig";

export class DatasetService {
  baseUrl: string;
  constructor() {
    this.baseUrl = location.protocol+'//'+location.hostname + ":9000";
  }

  async postDataset(basicInfo: any, schema: any[], id: any) {
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

    body['search_terms'] = basicInfo.searchTerms.split(',');
    return body;
  }

  async updateDataset(basicInfo: any, schema: any[], ownerId: string, schemaId: string) {
    let body = {
      id: schemaId,
      name: basicInfo.name,
      description: basicInfo.description,
      access_url: basicInfo.endpoint,
      api_key: basicInfo.sampleAPIKey,
      enc_data_key: basicInfo.sampleDataKey,
      search_terms: `{${basicInfo.searchTerms}}`, //TODO: ALLOW AN ARRAY OF SEARCH TERMS
      delivery_method: 'API',
      dataset_owner_id: ownerId,
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

    console.log('update body');
    console.log(body);

    await fetch(`${this.baseUrl}/schema`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if(Array.isArray(basicInfo.searchTerms)) {
      body['search_terms'] = basicInfo.searchTerms.join(',');
    } else {
      body['search_terms'] = basicInfo.searchTerms.split(',');
    }
    return body;
  }

  async getUserDatasets(id: string) {
    const results = await fetch(`${config.serverBase}/schema/user/${id}`);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

  async getAllDatasets() {
    const results = await fetch(`${config.serverBase}/marketplace`);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

  async getDataset(datasetId: string) {
    const results = await fetch(`${config.serverBase}/marketplace/dataset/${datasetId}`);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

  async deleteDataset(datasetId: string) {
    const results = await fetch(`${config.serverBase}/schema/dataset/${datasetId}`, {
      method: 'DELETE'
    });
    if(results.status !== 200) {
      throw new Error(`Deleting of asset ${datasetId} was not successful`);
    } else {
      return;
    }
  }

  async searchDatasets(terms) {
    const results = await fetch(`${config.serverBase}/marketplace/search?terms=${terms}`);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

}
