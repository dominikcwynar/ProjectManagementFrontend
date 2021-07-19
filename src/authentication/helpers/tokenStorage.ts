export const storeToken = (token: string | null) => {
  token === null
    ? localStorage.removeItem("JWT")
    : localStorage.setItem("JWT", token);
};

export const getToken = (): string | null => localStorage.getItem("JWT");