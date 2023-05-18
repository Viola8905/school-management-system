import axios from "axios";
import { setAdmin, setStudent } from "../reducers/userReducer";

function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const registration = async (name, surname, email, password) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/users/register`,
      {
        name,
        surname,
        email,
        password,
      }
    );

    alert("User is registered");
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/users/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      let decodedToken = decodeToken(response.data.token);

      if (decodedToken.role == "user") {
        dispatch(setStudent(decodedToken));
      } else {
        dispatch(setAdmin(decodedToken));
      }
    } catch (e) {
      localStorage.removeItem("token");
      alert(e.response.data.message);
    }
  };
};
