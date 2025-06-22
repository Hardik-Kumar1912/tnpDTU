import { getAccessToken, getRefreshToken } from "./token";

export const generateShareToken = async () => {
  let token = getAccessToken();

  let res = await fetch("https://tnp-recruitment-challenge.manitvig.live/share", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    const refreshed = getRefreshToken();
    if (refreshed) {
      token = getAccessToken();
      res = await fetch("https://tnp-recruitment-challenge.manitvig.live/share", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    } else {
      return { success: false, message: "Session expired. Please log in again." };
    }
  }

  if (!res.ok) {
    return { success: false, message: "Failed to generate share token." };
  }

  const data = await res.json();
  return { success: true, shareToken: data.shareToken };
};
