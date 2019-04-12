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

  async updateProfile(email: string, profile: any) {
    const body = {
      primaryEmail: email,
      secondaryEmail: profile.secondaryEmail,
      firstName: profile.firstName,
      lastName: profile.lastName,
      address: profile.address,
      phone: profile.phone
    };

    const results = await fetch(`${config.serverBase}/profile`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return results.json();
  }
}
