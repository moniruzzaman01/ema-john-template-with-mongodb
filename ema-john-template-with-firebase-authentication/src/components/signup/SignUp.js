import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPass, user1, loading1, error1] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignupForm = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      createUserWithEmailAndPass(email, password);
    }
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  if (user || user1) {
    navigate(from, { replace: true });
  }
  return (
    <div className="sign-up">
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignupForm}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onBlur={(e) => setEmail(e.target.value)}
              type="email"
              name=""
              id="1"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onBlur={(e) => setPassword(e.target.value)}
              type="password"
              name=""
              id="2"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              onBlur={(e) => setConfirmPassword(e.target.value)}
              type="password"
              name=""
              id="3"
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
          <input className="form-submit" type="submit" value="SignUp" />
        </form>
        <p style={{ textAlign: "center" }}>
          Already have account?{" "}
          <Link className="form-link" to="/login">
            Login
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

export default SignUp;
