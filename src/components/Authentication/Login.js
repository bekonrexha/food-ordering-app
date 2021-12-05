import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import classes from './Login.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate  } from "react-router-dom";

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

    return (<div className={classes.mainclass}>
        <h2 className={classes.firsts}>Login Form</h2>
        <form className={classes.form} onSubmit={submitHandler}>
            <label><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required onChange={emailHandler}></input>
            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="pw" required onChange={pwHandler}></input>
            <button className={classes.glow__on__hover} >Login</button>
        </form>
        <div ><Link to="/register" className={classes.register}>Register</Link></div>
       
    </div>)
}


export default Login;