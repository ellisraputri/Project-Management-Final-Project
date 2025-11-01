import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import { getHttp } from "./http";

export function isTeacher() {
  const user = localStorage.getItem("user");
  if (!user) return false;

  const parsedUser = JSON.parse(user);
  return parsedUser.role === "teacher";
}

export function getUser(){
    const user = localStorage.getItem("user");
    return user;
}

export async function login(){
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      axios.defaults.withCredentials = true;
      const res = await axios.post(
        getHttp() + "/api/auth/firebase", 
        {token,}
      );

      console.log("✅ Backend login success", res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
}

export async function logout(){
    try {
        axios.defaults.withCredentials = true;
        await axios.post(
            getHttp() + "/api/auth/logout",
        )
        localStorage.removeItem("user");
        return true;

    } catch (error) {
        return false;
    }
}