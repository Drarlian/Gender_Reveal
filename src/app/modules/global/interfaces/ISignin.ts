export interface ISigninRequest {
  username: string,
  password: string
}

export interface UserInformations {
  user: {
    name: string,
    email: string,
    option: string
  },
  token: string
}
