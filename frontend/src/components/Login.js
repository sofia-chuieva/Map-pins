import "../styles/login.css";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import axios from "axios";

export const Login = ({ setShowLogin, setCurrentUser }) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}users/login`, {
        username: name,
        password: password,
      });
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
        <input
          required
          type="text"
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn">Login</button>

        {error && <span className="error">Error</span>}
      </form>
      <CloseIcon className="cancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};
