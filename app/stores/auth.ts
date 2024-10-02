import { authAPI, instance } from '@/services/api';
import type { User } from '@/types';
import { StorageSerializers, useLocalStorage } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = useLocalStorage<string>('accessToken', null);
  const user = useLocalStorage<User | null>('user', null, {
    serializer: StorageSerializers.object
  });

  async function login(login: string, password: string) {
    const { data } = await authAPI.login(login, password);
    accessToken.value = data.accessToken;
    user.value = data.user;
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken.value}`;
  }

  async function logout() {
    await authAPI.logout();
    accessToken.value = null;
    user.value = null;
    delete instance.defaults.headers.common.Authorization;
  }

  return { user, login, logout };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
