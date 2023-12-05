import { useState } from "react";
import "./signup.scss";

import Dropzone from "react-dropzone";

export const SignupPage = () => {
  const [active, setActive] = useState(false);

  const handleActiveClass = () => {
    setActive(!active);
  };

  return (
    <div className="signup__wrapper d_flex">
      <div className={`sliding__container ${active && "active"}`}>
        <div className="sliding__container--register form-container">
          <form action="">
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registeration</span>
            <div className="fullnameInput">
              <input type="text" placeholder="First Name" name="firstName" />

              <input type="text" name="lastName" placeholder="Last Name" />
            </div>
            <input type="text" name="location" placeholder="Location" />
            <input type="text" name="occupation" placeholder="Occupation" />

            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <Dropzone acceptedFiles=".jpg,.jpeg,.png,.svg" multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dragBox">
                  <input name="picture" {...getInputProps()} />
                  <p>Add Picture Here</p>
                </div>
              )}
            </Dropzone>
            <button type="submit">Register</button>
          </form>
        </div>

        <div className="sliding__container--login form-container">
          <form action="">
            <h1>Log In</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a className="forgetPass" href="#">
              Forget Your Password?
            </a>
            <button>Log In</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back Mate!</h1>
              <p>Don't have an account?</p>

              <button onClick={handleActiveClass} className="hidden" id="login">
                Register
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Already have an account?</p>
              <button
                onClick={handleActiveClass}
                className="hidden"
                id="register"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
