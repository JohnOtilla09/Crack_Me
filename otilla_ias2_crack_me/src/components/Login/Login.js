import React, { useState } from 'react';
import md5 from 'blueimp-md5';
import _ from 'lodash';

import Card from '../UI/Card';
import LoginForm from "./LoginForm";

const Login = (props) => {
    
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ attempts, setAttempts ] = useState(1);
    const [ isAttempt, setIsAttemp ] = useState(false);

    const fetchHandler = async (password) => {
        password.password = md5(password.password);

        try { 
            const response = await fetch('https://react-html-db32f-default-rtdb.asia-southeast1.firebasedatabase.app/password.json', {
              method: 'GET',
            });
      
            if (!response.ok) {
              throw new Error('Request failed!');
            }
      
            const data = await response.json();
            const fetchPassword = [];

            for (const key in data) {
              fetchPassword.push({
                password: data[key].password,
              });
            }

            const isEqual = _.isEqual(password, fetchPassword[0]);

            if (!isEqual) {
              setAttempts((prevCounter) => prevCounter + 1);
              console.log(attempts);
              if (attempts === 5) {
                setError('Entered five concecutive incorrect password')
                setIsAttemp(true);
              }else {
                setError('Incorrect password');
              }
            } else {
              props.onLogin(password);
              setIsLoading(true);
              setError(null);
            }
          } catch (error) {
            setError('Something went wrong');
          }
          setIsLoading(false);
    };

    const attemptHandler = (attempt) => {
      setAttempts(1);
      setError(false);
      setIsAttemp(attempt);
    };

    return (
        <Card>
            <LoginForm onLogin={fetchHandler} isLoading={isLoading} error={error} attempt={isAttempt} onAttempt={attemptHandler}/>
        </Card>
    );
};

export default Login;