export class Constants {
    public static readonly AUTH_COOKIE_NAME: string = 'auth-cookie';
  
    private static instance: Constants;
  
    private constructor() {}
  
    public static getInstance(): Constants {
      if (!Constants.instance) {
        Constants.instance = new Constants();
      }
      return Constants.instance;
    }
  }
  
  export const constants = Constants.getInstance();