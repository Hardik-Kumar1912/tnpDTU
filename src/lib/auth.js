export const login = async (username, password) => {
  try {
    const res = await fetch("https://tnp-recruitment-challenge.manitvig.live/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await res.json();

    document.cookie = `accessToken=${data.accessToken}; path=/; max-age=3600;`;

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const logout = () => {
  document.cookie = "accessToken=; path=/; max-age=0;";
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};

