import "../styles/register.css";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRef, useState } from "react";
import axios from "axios";

export const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
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
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="email" placeholder="email" ref={emailRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>
        <button className="reg">Register</button>
        {success && <span className="success">Successfull registration</span>}
        {error && <span className="error">Error</span>}
      </form>
      <CloseIcon className="cancel" onClick={() => setShowRegister(false)} />
    </div>
  );
};
