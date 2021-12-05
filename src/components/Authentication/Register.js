import classes from "./Register.module.css";
import { useState } from 'react/cjs/react.development';
import { useNavigate  } from "react-router-dom";

const Register = () => {

    const [email,setEmail] = useState("");
    const [pw,setPw] = useState("");
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
        
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvxqe1grIazujyoj_pwDbS3wLtE5Q0mRU", {
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
    }


    return (<div className={classes.mainclass}>
        <h2 className={classes.firsts}>Register Form</h2>
        <form className={classes.form} onSubmit={submitHandler}>
            <label  htmlFor='email'><b>Email</b></label>
            <input type='email' id='email' placeholder="Enter Email" required onChange={emailHandler}></input>
            <label  htmlFor='password'><b>Password</b></label>
            <input  type='password' id='password' placeholder="Enter Password"required onChange={pwHandler}></input>
            <div className={classes.buttonpadding}>
            <button className={classes.glow__on__hover}>Register</button>
        </div>
        </form>
        
    </div>)
};

export default Register;
