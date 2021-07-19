import axios from "axios";

export const login = (
  login: string,
  password: string
): Promise<string | null> =>
  axios
    .post("api/authenticate/login", {
      login,
      password,
    })
    .then((response) => response.data.token)
    .catch(() => null);

export const register = (
  username: string,
  email: string,
  password: string
): Promise<string | null> =>
  axios
    .post("api/authenticate/register", {
      username,
      email,
      password,
    })
    .then((response) => response.data)
    .catch(() => null);
