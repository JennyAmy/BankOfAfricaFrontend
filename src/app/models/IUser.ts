
export interface UserForRegister {
  firstname: string;
  surname: string;
  email: string;
  password: string;
  phone: number;
  accountNumber: string;
  customerId: number;
}


export interface UserForLogin {
  email: string;
  password: string;
  token: string;
}



