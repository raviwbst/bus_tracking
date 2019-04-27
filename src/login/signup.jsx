import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import logoimg from '../assets/images/schoolbus.png'
import bgimg from '../assets/images/school-buses.jpg';
import { Link } from 'react-router-dom';
import './login.css'
class Signup extends Component {
    state = {}
    render() {
        return (
            <div className="login signup">
                <div className="pagewrapper" style={{ backgroundImage: 'url(' + bgimg + ')' }}>
                    <div className="page-content">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="dialogbox">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 logo_section">
                                            <div className="inner_wrapper">
                                                <div className="logo">
                                                    <img src={logoimg} alt="logo_image" />
                                                </div>
                                                <p className="tagline">Signup to start tracking school bus</p>
                                                <Form.Label className="labelcust3"><Link to="/">Already have an account.</Link></Form.Label>
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-8 form-section">
                                            <div className="inner_wrapper">
                                                <h3 className="title">Sign up now!</h3>
                                                <Form>

                                                    <Form.Group className="custom_input">
                                                        <Form.Control type="email" name="username" placeholder="Email address" />
                                                    </Form.Group>
                                                    <Form.Group className="custom_input">
                                                        <Form.Control type="text" name="fullname" placeholder="Full name" />
                                                    </Form.Group>


                                                    <Form.Group className="custom_input">
                                                        <Form.Control type="password" name="password" placeholder="Password" />
                                                    </Form.Group>
                                                    {/* <Form.Group className="custom_input">
                            <Form.Control type="password" name="repeat password" placeholder="Repeat password" />
                        </Form.Group>  */}

                                                    <Form.Group className="labelcust2">
                                                        <Form.Label> <Form.Control type="checkbox" name="tnc" /> I agree to the terms of service.</Form.Label>
                                                    </Form.Group>
                                                    <Form.Group><Form.Control type="button" name="signup" value="Signup" /></Form.Group>
                                                </Form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;