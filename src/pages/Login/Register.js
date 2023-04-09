import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { signUpUsernamePwd, signed } = useContext(AuthContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpUsernamePwd(email, password);
    // Handle form submission here
  };

  if (signed) {
    return <Navigate to="/home" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="repeat-password">Repeat Password</label>
        <input
          type="password"
          id="repeat-password"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
