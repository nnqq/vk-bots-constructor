export interface IAuth {
  auth: {
    credentials: {
      userId: string;
      token: string;
      vkUserAccessToken: string;
      vkUserId: string;
      botIds: string[];
    }
  }
}
