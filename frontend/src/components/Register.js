import "../styles/register.css";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import axios from "axios";

export const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_URL}/users/register`, {
        username: name,
        email: email,
        password: password,
      });
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="registerContainer">
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
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="reg">Register</button>
        {success && <span className="success">Successfull registration</span>}
        {error && <span className="error">Error</span>}
      </form>
      <CloseIcon className="cancel" onClick={() => setShowRegister(false)} />
    </div>
  );
};
