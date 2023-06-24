import React, { useEffect, useReducer, useState } from "react";
import { BiSolidError } from 'react-icons/bi';

import styles from './LoginForm.module.css';
import Button from "../UI/Button";

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {
          value: action.val,
          isValid:
            action.val.trim().length > 8 &&
            /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&/*])/.test(action.val),
        };
    }

    return {value: '', isValid: null};
};

const LoginForm = (props) => {
    const [ formIsValid, setFormIsValid ] = useState(false);
    const [ counter, setCounter ] = useState(20);
    let valid = null;

    const [ passwordState, dispatchPassword ] = useReducer(passwordReducer, {
        value: '',
        isValid: null
    });

    useEffect(() => {
        const identifier = setTimeout(() => {
          console.log("is Checking");
          setFormIsValid(passwordState.isValid);
        }, 500);

        return () => {
            console.log('cleanup');
            clearTimeout(identifier);
        };
    }, [passwordState.isValid]);

    const enteredPasswordHandler = (event) => {
        dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    };

    const { attempt: isAttempt } = props;

    if (counter === 0 && isAttempt === true) {
      props.onAttempt(false);
      setCounter(20);
    }

    useEffect(() => {
      // This will run if props.attempt is true
      if (isAttempt === true) {
        const interval = setInterval(() => {
          setCounter((prevCounter) => prevCounter - 1);
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }
    
    }, [isAttempt]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            props.onLogin({ password: passwordState.value });
            dispatchPassword({type: 'USER_INPUT', val: ''});
        }
    };

    if (passwordState.isValid === true) {
      valid = styles.valid;
    }

    return (
      <div className={styles.box}>
        <h1>Crack Me</h1>
        <form onSubmit={submitHandler}>
          {props.error && (
            <div className={styles.error}>
              <BiSolidError size={30} />
              <p>{props.error}</p>
            </div>
          )}
          <div
            className={`${styles.check} ${
              passwordState.isValid === false && props.error ? styles.invalid : styles.normal
            }`}
          >
            <label className={valid}>Password</label>
            <input
              disabled={isAttempt}
              className={valid}
              type="password"
              onChange={enteredPasswordHandler}
              value={passwordState.value}
              autoComplete="false"
            />
            {passwordState.isValid === false && props.error && <p>Password must contain a-z, 0-9, and symboles</p>}
          </div>
          <Button onClick={props.onClick} disabled={isAttempt}>
            {isAttempt === true ? counter : props.isLoading ? 'Login...' : 'Login'}
          </Button>
        </form>
      </div>
    );
};

export default LoginForm;

