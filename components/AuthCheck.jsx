import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../axiosConfig";
import { setLogin } from "../redux/slices/user";

const AuthCheck = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstance
      .get("/auth/refresh")
      .then((res) => {
        dispatch(
          setLogin({
            user: res?.data?.user,
          })
        );
      })
      .catch((e) => console.log("Something went wrong while loggin in", e));
  }, []);
};

export default AuthCheck;
