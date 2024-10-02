export const enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export const enum Status {
  Completed = 'Выполнен',
  New = 'Новый'
}

export interface User {
  id: number;
  login: string;
  fullName: string;
  role: Role;
}

export interface Order {
  id: number;
  fullName: string;
  address: string;
  date: string;
  status: Status;
  comment: string;
}

export function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    typeof obj.id === 'number' &&
    'login' in obj &&
    typeof obj.login === 'string' &&
    'fullName' in obj &&
    typeof obj.fullName === 'string' &&
    'role' in obj &&
    typeof obj.role === 'string'
  );
}
