import CryptoJS from "crypto-js";
// const API_URL = 'http://172.20.10.2:3000/api';
const API_URL = 'http://192.168.1.7:3000/api';


export const apiCheckEmail = async (email) => {
  try {
    const res = await fetch(`${API_URL}/users/checkUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return { exists: false, error: true };
  }
};

export const apiCheckPhone = async (phone) => {
  try {
    const res = await fetch(`${API_URL}/users/checkUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return { exists: false, error: true };
  }
};
export const apiCheckUserName = async (username) => {
  try {
    const res = await fetch(`${API_URL}/users/checkUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { exists: false, error: true };
  }
};
export const apiRegister = async ({ phone, email, password, fullname, username }) => {
  try {
    // Hash password
    const hashPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);


    const res = await fetch(`${API_URL}/users/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, email, password: hashPassword, fullname, username })
    });

    if (!res.ok) {
      const text = await res.text(); // debug
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Bắt lỗi fetch
    return { exists: false, error: true, message: error.message };
  }
};
export const apiLogin = async ({phone, email, password, username, createdAt}) => {
  try {
    const hashPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({phone, email, password: hashPassword, username, createdAt })
    });
    if(!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return {exists: false, error: true, message: error.message};
  }
}