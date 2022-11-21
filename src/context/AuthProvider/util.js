import { Api } from "services/api";

export function setUserLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("user");

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);
  return user ?? null;
}

export async function LoginRequest(email, password) {
  try {
    const request = await Api.post("signin", {
      email,
      password,
    });
    return request.data;
  } catch (error) {
    return null;
  }
}

export function SignupRequest(user) {
  const request = Api.post("/signup", user);
  return request;
}
