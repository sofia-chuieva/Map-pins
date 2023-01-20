import "../styles/login.css";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRef, useState } from "react";
import axios from "axios";

export const Login = ({ setShowLogin, setCurrentUser }) => {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/login", user);
      sessionStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setError(false);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <AccountCircleIcon fontSize="large" />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>
        <button className="login-btn">Login</button>

        {error && <span className="error">Error</span>}
      </form>
      <CloseIcon className="cancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};
