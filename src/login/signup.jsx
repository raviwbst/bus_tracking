import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import logoimg from '../assets/images/schoolbus.png'
import bgimg from '../assets/images/school-buses.jpg';
import { Link } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import './login.css'
Amplify.configure({
    Auth: {
        userPoolId: 'us-east-1_FMSNgVoI3',
        region: 'us-east-1',
        userPoolWebClientId: '4l0ptjqgo2fk9m558ta82f893k'
    }
});
const currentConfig = Auth.configure();
class Signup extends Component {
    state = {
        msg: '',
        type: 0
    }
    signUp = () => {
        let username = document.querySelector('input[name=username]').value; // your username here
        let password = document.querySelector('input[name=password]').value;            // your password here
        let name = document.querySelector('input[name=fullname]').value;
        if (username !== '' && password !== '' && name !== '') {


            Auth.signUp({
                username,
                password,
                attributes: {
                    name: name          // optional
                    //phone_number,   // optional - E.164 number convention
                    // other custom attributes 
                },
                //validationData: []  //optional
            })
                .then(data => {
                    this.setState({ msg: 'Account created successfully, verification link has been sent to your email.', type: 1 })
                    document.querySelector('input[name=username]').value = ''; // your username here
                    document.querySelector('input[name=password]').value = '';            // your password here
                    document.querySelector('input[name=fullname]').value = '';
                    // console.log(data)
                })
                .catch(err => {
                    this.setState({ msg: err.message, type: 0 })
                    // console.log(err)
                });
        } else {
            this.setState({ msg: 'Please fill all required fields', type: 0 })
        }

        // After retrieving the confirmation code from the user
        // Auth.confirmSignUp(username, code, {
        //     // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        //     forceAliasCreation: true
        // }).then(data => console.log(data))
        //     .catch(err => console.log(err));

        // Auth.resendSignUp(username).then(() => {
        //     console.log('code resent successfully');
        // }).catch(e => {
        //     console.log(e);
        // });
    }
    messagetype = () => {
        return this.state.type === 0 ? { color: 'red' } : { color: 'green' };
    }
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
                                                    {this.state.msg !== '' ? <span style={this.messagetype()}>{this.state.msg}</span> : null}
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
                                                    <Form.Group><Form.Control type="button" name="signup" value="Signup" onClick={this.signUp} /></Form.Group>
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