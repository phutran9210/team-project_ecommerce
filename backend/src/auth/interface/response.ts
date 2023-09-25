export interface BasicResponse {
  status: number;
  message: string;
}

//token cookie
export interface TokenUser {
  sub: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}
//guest token
// export interface GuestToken extends TokenUser {
//   sub: string;
// }
