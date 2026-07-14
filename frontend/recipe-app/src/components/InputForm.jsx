import { useState } from "react";
import axios from "axios";

const InputForm = ({ setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp ? "signUp" : "login";

    try {
      const res = await axios.post(
        `http://localhost:5000/${endpoint}`,
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("Login Successful");
      console.log(res.data);

      setError("");

      // Close popup
      setIsOpen(false);
    } catch (err) {
      console.log(err.response);

      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <div className="form-control">
        <label>Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">
        {isSignUp ? "Sign Up" : "Login"}
      </button><br />

      {error && <h4 className="error">{error}</h4>}

      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError("");
        }}
      >
        {isSignUp
          ? "Already have an account?"
          : "Create new account"}
      </p>
    </form>
  );
};

export default InputForm;