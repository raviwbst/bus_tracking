import React, { Component } from 'react';
import history from '../history';
import Amplify, { Auth } from 'aws-amplify';
Amplify.configure({
    Auth: {
        userPoolId: 'us-east-1_FMSNgVoI3',
        region: 'us-east-1',
        userPoolWebClientId: '4l0ptjqgo2fk9m558ta82f893k'
    }
});
class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('aws_token')) {
            history.push('/');
        }
        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            console.log(user.attributes.name)
            let newdata = {
                name: user.attributes.name,
                email: user.attributes.email
            }
            this.setState(newdata);
        })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="welcome_content">
                <div className="container">
                    <h3 className="title">Welcome! {this.state.name} ( {this.state.email} )</h3>
                </div>
            </div>
        );
    }
}

export default Welcome;