import {STRIPECHECKOUT} from "../components/ConfigEnv";

export class StripeService {
  async checkout(body, userId) {
    try {
      const results = await fetch(`${STRIPECHECKOUT}/${userId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      return results;
    } catch (e) {
      //TODO: Do Something Else
      //alert('Payment Error');
    }
  }
}
