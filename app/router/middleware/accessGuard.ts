import { isUser } from '@/types';
import type { NavigationGuard } from 'vue-router';
import { RouteName } from '../types';

export const accessGuard: NavigationGuard = (to) => {
  const { accessRoles } = to.meta;
  if (accessRoles) {
    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (isUser(user)) {
      if (!accessRoles.includes(user.role)) {
        return false;
      }
    } else {
      return { name: RouteName.Login };
    }
  }
};
