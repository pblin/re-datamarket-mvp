import {config} from './ServiceConfig';

export class ProfileService {
  async getProfile(email: string) {
    const results = await fetch(`${config.serverBase}/profile/${email}`);
    if(results.status !== 200) {
      return {};
    } else {
      return results.json();
    }
  }
}
