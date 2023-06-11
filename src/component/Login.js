import { useEffect, useState } from "react";
import "../App.scss";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigation("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("No Email ???");
      return;
    }

    let res = await loginApi(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigation("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
  };

  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      <div className="login-container col-4 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email or Usernam</div>
        <input
          type="text"
          placeholder="Email or Username..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="input-2">
          <input
            type={isShowPassword === true ? "text" : "password"}
            placeholder="Password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(event) => {
              handlePressEnter(event);
            }}
          />
          <i
            className={
              isShowPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          ></i>
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
        <div className="back">
          <i className="fa-solid fa-angles-left"></i> Go back
        </div>
      </div>
    </>
  );
};

export default Login;
