import type { NavigationGuard } from 'vue-router';
import { RouteName } from '../types';

export const authGuard: NavigationGuard = (to, from) => {
  const isAuthenticated = localStorage.getItem('accessToken');
  if (!isAuthenticated && to.name !== RouteName.Login) {
    return { name: RouteName.Login };
  }
  if (isAuthenticated && to.name === RouteName.Login) {
    return { name: from.name };
  }
};
