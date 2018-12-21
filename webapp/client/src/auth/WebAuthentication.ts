import autobind from 'autobind-decorator';
import history from '../utils/history';
import { AUTH_CONFIG } from './configuration';
import { Auth0Authentication } from './Auth0Authentication';
import { Auth0DecodedHash, Auth0Error, WebAuth } from 'auth0-js';
import { request } from 'graphql-request';
// import * as httpm from 'typed-rest-client/HttpClient';

/**
 * Web based Auth0 authentication
 *
 * @export
 * @class WebAuthentication
 * @implements {Auth0Authentication}
 */
export class WebAuthentication implements Auth0Authentication {
  /**
   * @property
   * @private
   * @type {WebAuth}
   * @memberof WebAuthenticationManager
   */
  auth0: WebAuth = new WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid openid profile email',
  });

  get authenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;
  }

@autobind
  async findUser () { 
    const endpoint = 'http://localhost:9000/graphql';
    
    const query =  `
    query ($email: String!) {
        aCustomer(primaryEmail: $email) {
                id
                firstName
                lastName
                primaryEmail
                secondaryEmail
                roles
                isOrgAdmin
        }
    }
    `;
    let userEmail = localStorage.getItem('email');

    let profile = localStorage.getItem ('profile');
    const variables = {
        email: userEmail
    };
    // @ts-ignore
    if ( profile == null || profile.id <= 0 ) {
        localStorage.setItem('pendingProfileQuery', 'y');
        let result = await request (endpoint, query, variables);
        localStorage.setItem ('profile', JSON.stringify(result));
        localStorage.setItem('pendingProfileQuery', 'n');
    }
  } 

  @autobind
  login(): void {
    this.auth0.authorize();
  }

  @autobind
  handleAuthentication(): void {
    this.auth0.parseHash((e: Auth0Error, result: Auth0DecodedHash) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);
        history.replace('/home');

      } else if (e) {
        history.replace('/home');
        // tslint:disable-next-line:no-console
        console.error(e);
        alert(`Error: ${e.error}. Check the console for further details.`);
      }
    });
  }

  @autobind
  setSession(authResult: Auth0DecodedHash): void {
    const { accessToken, expiresIn, idToken, idTokenPayload } = authResult;
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(expiresIn! * 1000 + new Date().getTime());
    localStorage.setItem('access_token', accessToken!);
    localStorage.setItem('id_token', idToken!);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('email', idTokenPayload.email);
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('idTokenPayload', JSON.stringify(idTokenPayload));
    // navigate to the home route
    history.replace('/home');
    if ( localStorage.getItem('pendingProfileQuery') == null ||
         localStorage.getItem('pendingProfileQuery') === 'n') {
      this.findUser();
    }
  }

  @autobind
  logout(): void {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('profile');
    localStorage.removeItem('pendingProfileQuery');
    // navigate to the home route
    history.replace('/home');

    let ssoLogOutUrl = 'https://rebloc.auth0.com/v2/logout';
    window.location.replace(ssoLogOutUrl);

    // const httpc = new httpm.HttpClient('sso-logout');
    // const response = httpc.get(ssoLogOutUrl);
    // response.then((res) => {
    //     const bodyPromise = res.readBody();
    //     console.log (bodyPromise);
    // });
  }
}
