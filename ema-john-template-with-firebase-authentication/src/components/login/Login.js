import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPass, user1, loading1, error1] =
    useSignInWithEmailAndPassword(auth);

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  const handleSignupForm = (event) => {
    event.preventDefault();
    signInWithEmailAndPass(email, password);
  };
  if (user || user1) {
    navigate(from, { replace: true });
  }
  return (
    <div className="login">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSignupForm}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onBlur={(e) => setEmail(e.target.value)}
              type="email"
              name=""
              id=""
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onBlur={(e) => setPassword(e.target.value)}
              type="password"
              name=""
              id=""
              required
            />
          </div>

          {loading || loading1 ? (
            <p
              style={{
                color: "tomato",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Loading...
            </p>
          ) : (
            ""
          )}

          {error || error1 ? (
            <p
              style={{
                color: "tomato",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {error?.message}
              {error1?.message}
            </p>
          ) : (
            ""
          )}
          <input className="form-submit" type="submit" value="Login" />
        </form>
        <p style={{ textAlign: "center" }}>
          New to Ema-John?{" "}
          <Link className="form-link" to="/signup">
            Create an account
          </Link>
        </p>
        <div className="separator">
          <div></div>
          <span>or</span>
          <div></div>
        </div>
        <button onClick={handleGoogleSignIn} className="google-signin">
          <FontAwesomeIcon icon={faCoffee} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
