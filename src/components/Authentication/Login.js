import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate  } from "react-router-dom";
import "./Formclasses.css";

const Login = () => {
    const [email,setEmail] = useState("");
    const [pw,setPw] = useState("");
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const emailHandler = (event) =>{
        event.preventDefault();
        setEmail(event.target.value);
    }
    const pwHandler = (event) =>{
        event.preventDefault();
        setPw(event.target.value);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvxqe1grIazujyoj_pwDbS3wLtE5Q0mRU", {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              password: pw,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = 'Authentication failed!';
                // if (data && data.error && data.error.message) {
                //   errorMessage = data.error.message;
                // }
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            authCtx.login(data.idToken);
            navigate("/");
          })
          .catch((err) => {
            alert(err.message);
          });
    }

    return (
        <div class="container">
      <div class="screen">
        <div class="screen__content">
        <Link to="/"><div class="goback">Go Back </div></Link>
          <form class="login" onSubmit={submitHandler}>
            <h1 class="loginformtag">Login Form</h1>
            <div class="login__field">
              <input type="text" class="login__input" placeholder="Email" onChange={emailHandler} />
            </div>
            <div class="login__field">
              <input type="password" class="login__input" placeholder="Password" required onChange={pwHandler} />
            </div>
            <button class="glow__on__hover" >Login</button>
          </form>
          <div class="registerbutton"><Link to="/register"><button class="glow__on__hover" >Register</button></Link></div>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>)
}


export default Login;