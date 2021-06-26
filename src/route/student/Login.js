import { faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider';
import './styles/login.css'
import Sawo from "sawo"


function Login() {

    const[error,setError]=useState(false)

    const history= useHistory()

    const {currentUser,login}=useAuth()

    function handleLogin(payload)
    {

        setError()     
            login(payload)
            .catch((error)=>{
                setError(error)     
                window.sawo.showForm()       
        })

    }

    useEffect(()=>{
        if(currentUser && currentUser.uid && currentUser.isStudent)
        {
            history.push("/dashboard")
        }
    },[currentUser])


    useEffect(()=>{
        var config = {
            containerID: "sawo-container",
            identifierType: "phone_number_sms",
            apiKey: "8d2e9e65-a433-42bc-b17c-e5d9e454035e",
            onSuccess: (payload) => {
                handleLogin(payload)
            },
        };

        window.sawo = new Sawo(config)
        window.sawo.showForm()
    },[])

    return (
        <div className="login-container">
            <Container className="login-holder bg-white">
                <Row>
                    <Col lg={5} className="login-pattern-container">
                        <div className="login-description">
                            <div className="brand">Enacto</div>
                            <h1>Welcome to your world of success !!</h1>
                            <p>Join our network to keep track of your fellow classmates and let them know who you are ! . Recruiters always have their eyes on you :) </p>

                            <div className="login-down">
                                <h3>Don't have an account ?</h3>
                                <Link to="/register">
                                    Sign Up Now {' '}
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                            </div>
                        </div>
                    </Col>
                    <Col lg={7} className="d-flex align-items-center justify-content-center">
                        <div className="login-form-container">
                        <div className="login-form-top">
                        <h2>Login</h2>
                        {error && <div className="error">{error}</div>}
                        </div>
                        
                        <div id="sawo-container" className="login-sawo-container">
                        </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
