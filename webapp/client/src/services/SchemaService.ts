import {config} from "./ServiceConfig";

class SchemaService {
  async searchSchemaFields(filters) {
    let url = `${config.serverBase}/schema/search`;
    let filterCount = 0;

    if(filters.terms.length) {
      filterCount++;
      url += `?fields=${filters.terms.join(',')}`
    }

    if(filters.selectedCountry) {
      url += `${filterCount === 0 ? '?' : '&'}country=${filters.selectedCountry}`;
      filterCount++;
    }

    if(filters.selectedState) {
      url += `${filterCount === 0 ? '?' : '&'}state=${filters.selectedState}`;
      filterCount++;
    }

    //TODO: Make Multi-Selected
    if(filters.selectedCity) {
      url += `${filterCount === 0 ? '?' : '&'}cities=${filters.selectedCity}`;
    }

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
