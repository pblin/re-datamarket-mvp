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
      primary_email: email,
      secondary_email: profile.secondaryEmail,
      first_name: profile.firstName,
      last_name: profile.lastName,
      address: profile.address,
      phone: profile.phone,
      id: profile.id || null
    };

    console.log(profile);

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
