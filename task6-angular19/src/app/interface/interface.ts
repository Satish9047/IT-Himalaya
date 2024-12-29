export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Response<T> {
  success: boolean;
  message: string;
  data?: T | null;
}
