export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("x-access-token");
  }
  return null;
};

export const getUserType = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userType");
  }
  return null;
};

export const setUserToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("x-access-token", token);
  }
};

export const removeUserToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("x-access-token");
  }
};

export const removeUserType = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userType");
  }
};
