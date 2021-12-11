import { useState } from 'react/cjs/react.development';
import { useNavigate, Link  } from "react-router-dom";
import "./Formclasses.css";

const Register = () => {

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const [pwError, setPwError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const emailHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const pwHandler = (event) => {
    event.preventDefault();
    setPw(event.target.value);
  };
  const emailValidityCheck = () => {
    return email.includes("@") && email.includes(".com");
  };
  const passwordValidityCheck = () => {
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    return pattern.test(pw) && pw.length > 7;
  };


  const submitHandler = (event) => {
    event.preventDefault();
    if (emailValidityCheck() && passwordValidityCheck()) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvxqe1grIazujyoj_pwDbS3wLtE5Q0mRU",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: pw,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          navigate("/login");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else if (!emailValidityCheck() && passwordValidityCheck()) {
      setEmailError(true);
      setPwError(false);
      setEmail("");
    } else if (emailValidityCheck() && !passwordValidityCheck()) {
      setPwError(true);
      setEmailError(false);
      setPw("");
    } else {
      setEmailError(true);
      setPwError(true);
    }
  };

    return (
      <div class="container">
      <div class="screen">
        <div class="screen__content">
        <Link to="/"><div class="goback">Go Back </div></Link>
          <form class="login" onSubmit={submitHandler}>
            <h1 class="loginformtag">Register</h1>
            <div class="login__field">
              <input type="text" class="login__input" placeholder="Email" onChange={emailHandler} />
              {emailError && <p class="wronginput">*Please enter a valid Email!</p>}
            </div>
            <div class="login__field">
              <input type="password" class="login__input" placeholder="Password" onChange={pwHandler} />
              {pwError && <p class="wronginput">*Please enter a password that includes:
              <br />  - 1 upper letter
              <br />  - 1 lower letter
              <br />  - 1 number
              <br />  - 1 symbol
              <br />  - and is longer than 7 characters</p>}
            </div>
            <button class="glow__on__hover" >Register</button>
          </form>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
    );
};

export default Register;
