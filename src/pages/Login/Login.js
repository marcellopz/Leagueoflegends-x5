import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { signInGoogle, signed, signInUsernamePwd, signInAsGuest } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInUsernamePwd(email, password);
    // Handle form submission here
  };

  async function loginGoogle() {
    await signInGoogle();
  }

  if (signed) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
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
        <button type="submit">Sign In</button>
      </form>
      <button onClick={loginGoogle}>Login with Google</button>
      <div>
        <a href="/register">Register</a>
      </div>
      <button onClick={signInAsGuest}>Login as guest</button>
    </div>
  );
}
