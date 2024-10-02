import type { User as FrontendUser, Order } from '../app/types';

interface User extends FrontendUser {
  password: string;
}

export interface Data {
  orders: Order[];
  users: User[];
}
