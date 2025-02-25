import { ApiUser } from "../actores/ApiUser";

export const Autenticarse = () => async (apiUser: ApiUser) => {
  await apiUser.login();
};
