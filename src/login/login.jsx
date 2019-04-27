import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';
import history from '../history';
import logoimg from '../assets/images/schoolbus.png'
import bgimg from '../assets/images/school-buses.jpg';
import { Link } from 'react-router-dom'
// import config from '../config_cognito';
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
console.log(currentConfig);
class Login extends Component {
    state = {}

    login = async () => {

        const currentConfig = Auth.configure();
        console.log(currentConfig);
        let username = document.querySelector('input[name=username]').value; // your username here
        let password = document.querySelector('input[name=password]').value;            // your password here

        try {
            const user = await Auth.signIn(username, password);
            localStorage.setItem('aws_token', user.signInUserSession.accessToken.jwtToken);
            console.log('jwt', user.signInUserSession.accessToken.jwtToken);
            history.push('/welcome');

        } catch (err) {
            console.log(err);
        }

        // For advanced usage
        // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
        Auth.signIn({
            username, // Required, the username
            password, // Optional, the password
            //validationData, // Optional, a random key-value pair map which can contain any key and will be passed to your PreAuthentication Lambda trigger as-is. It can be used to implement additional validations around authentication
        }).then(user => console.log(user))
            .catch(err => console.log(err));

    }
    signUp = () => {
        let username = document.querySelector('input[name=username]').value; // your username here
        let password = document.querySelector('input[name=password]').value;            // your password here

        Auth.signUp({
            username,
            password,
            attributes: {
                name: 'ravi',          // optional
                //phone_number,   // optional - E.164 number convention
                // other custom attributes 
            },
            //validationData: []  //optional
        })
            .then(data => console.log(data))
            .catch(err => console.log(err));

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
    render() {
        return (
            <div className="login">
                <div className="pagewrapper" style={{ backgroundImage: 'url(' + bgimg + ')' }}>
                    <div className="page-content">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="dialogbox">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-5 logo_section">
                                            <div className="inner_wrapper">
                                                <div className="logo">
                                                    <img src={logoimg} alt="logo_image" />
                                                </div>
                                                <p className="tagline">Login to start tracking school bus</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-7 form-section">
                                            <div className="inner_wrapper">
                                                <h3 className="title">Login to your account</h3>
                                                <p className="sub_title">Don’t have an account? <Link to="/signup">Sign Up Now!</Link></p>
                                                <Form>
                                                    <Form.Group className="custom_input">
                                                        <Form.Control type="email" name="username" placeholder="Email address" />
                                                    </Form.Group>
                                                    <Form.Group className="custom_input">
                                                        <Form.Control type="password" name="password" placeholder="Password" />
                                                    </Form.Group>
                                                    <Form.Group className="labelcust1">
                                                        <Form.Label> <Form.Control type="checkbox" name="remember" /> Remember me</Form.Label>
                                                        <Form.Label><a href="#">Forgot password?</a></Form.Label>
                                                    </Form.Group>
                                                    <Form.Group><Form.Control type="button" name="submit" value="Login" onClick={this.login} /></Form.Group>
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

export default Login;