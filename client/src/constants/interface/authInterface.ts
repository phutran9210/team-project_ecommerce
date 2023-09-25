//Login
export interface PayloadLogin {
  user_name: string;
  user_password: string;
}

//Code xác nhận Login
export interface PayloadCodeLogin {
  code: string;
}
