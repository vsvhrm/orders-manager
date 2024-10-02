import type { User as FrontendUser, Order } from '../app/types';

type User = FrontendUser & {
  password: string;
};

export type Data = {
  orders: Order[];
  users: User[];
};
