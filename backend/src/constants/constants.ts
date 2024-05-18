export class Constants {
    public static readonly AUTH_COOKIE_NAME: string = 'auth-cookie';

    public static readonly DOMAIN_NAME: string = 'dinogpt.netlify.app';

    public static readonly OPENAI_API_MODEL: string = 'gpt-3.5-turbo';
  
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