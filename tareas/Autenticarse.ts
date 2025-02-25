import { ApiUser } from '../actores/ApiUser.js'

export const Autenticarse = () => {
  return async (apiUser: ApiUser) => {
    await apiUser.login(); // Simula la autenticación
  };
};
