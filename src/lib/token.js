// Read cookie by name
const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Save cookies
export const saveTokens = (accessToken, refreshToken) => {
  if (typeof document !== "undefined") {
    document.cookie = `accessToken=${accessToken}; path=/;`;
    document.cookie = `refreshToken=${refreshToken}; path=/;`;
    document.cookie = `isLoggedIn=true; path=/;`;
  }
};

// Clear cookies
export const clearTokens = () => {
  if (typeof document !== "undefined") {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }
};

export const getAccessToken = () => getCookie("accessToken");
export const getRefreshToken = () => getCookie("refreshToken");
