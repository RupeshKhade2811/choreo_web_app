import { AuthConfig } from "angular-oauth2-oidc";

export const authPasswordFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer:  'https://api.asgardeo.io/t/orgenox1/oauth2/token',
  
    // URL of the SPA to redirect the user to after login
    redirectUri: 'http://localhost:4200/dashboard',
  
    // URL of the SPA to redirect the user after silent refresh
    //silentRefreshRedirectUri: 'http://localhost:4200/dashboard',
  
    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: 'vpfcdJlCKrNb0_6nh3N0MYmofnYa',
  
    dummyClientSecret: 'DpyqVRJZLfcGhc86HVJA7lMpcdBJ5ePZhfaHgTzOzlQa',
    tokenEndpoint: 'https://api.asgardeo.io/t/orgenox1/oauth2/token',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'openid profile internal_user_mgt_view internal_login',
  
    showDebugInformation: true,
    logoutUrl: 'https://api.asgardeo.io/t/orgenox1/oidc/logout',
    postLogoutRedirectUri:'http://localhost:4200/dashboard',
    oidc: false,
    //responseType: 'code',
    strictDiscoveryDocumentValidation:false,
  };