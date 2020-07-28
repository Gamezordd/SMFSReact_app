import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import {login_url, signup_url} from './constants';

import './styles.css';
import { connect } from 'react-redux';
import { loginAction } from '../../redux/ActionCreators';

interface IProps {
    login?: any;
    history?: any;
    isSignup?:boolean
}

interface IState {
    username: string | null;
    password: string | null;
    isSignupForm: boolean;
    passwordError: boolean;
    usernameExists: boolean;
    badCredentials: boolean;
}

const mapStateToProps = (state: any) => ({
    isLoggedIn: state.user.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
    login: (token: string) => dispatch(loginAction(token))
});

class LoginBasic extends React.Component<IProps, IState> {
constructor(props: IProps){
    super(props);
    this.state={
        username: null,
        password: null,
        isSignupForm: (this.props.isSignup ? this.props.isSignup : false),
        passwordError: false,
        usernameExists: false,
        badCredentials: false
    }
}

handleChange = (e: any) => {  
    if(e.target.id === "username"){
        return this.setState({username: e.target.value, usernameExists: false});
    }
    else if(e.target.id === "password"){
        return this.setState({password: e.target.value, passwordError: true});
    }
    else if(e.target.id === "confirm_password"){
        if(e.target.value === this.state.password){
            this.setState({passwordError: false});
        }
        else{
            this.setState({passwordError: true});
        }
    }
}

async handleClick (action: string) {
    
    console.log("action: ", action);
    if(action === 'login'){
        await axios.post(login_url,{
            username: this.state.username,
            password: this.state.password
        },{
            headers:{"Access-Control-Allow-Credentials": "true"},
            withCredentials: true,
        }).then(res => {
            if(res.data.success){
                this.props.login(res.data.token);
                this.props.history.push('/');
            }
            console.log("response:", res.data.token);
        }).catch(err => {
            if(err.response && err.response.status === 401){
                this.setState({badCredentials: true})
            }
        });
    } else if(action === 'signup'){
        await axios.post(signup_url,{
            username: this.state.username,
            password: this.state.password
        },{withCredentials: true}).then( async res => {
            await axios.post(login_url,{
                username: this.state.username,
                password: this.state.password
            },{
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }).then(res => {
                if(res.data.success){
                    this.props.login(res.data.token);
                    this.props.history.push('/');
                }
                console.log("response:", res.data.token);
            }).catch(err => {
                if(err.response && err.response.status === 401){
                    this.setState({badCredentials: true})
                }
            });
        }).catch(err => {
            console.log("error: ", err);
            
            if(err.response && err.response.status === 409){
                this.setState({usernameExists: true})
            }
        })
    }
}

render(){
    const LoginButton = (
        <Button onClick={() => this.handleClick('login')}>
            Login
        </Button>
    );
    const SignupButton = (
        <Button disabled={this.state.passwordError || this.state.password?.length === 0 || !this.state.password} onClick={() => this.handleClick('signup')}>
            Signup
        </Button>
    );

    const PassConfirm_Field = (
        <Form.Group>
            <Form.Label>Confirm Password: </Form.Label>
            <Form.Control onChange={this.handleChange} id="confirm_password" type="password" placeholder="Confirm Password"/>
            {this.state.passwordError ? <Form.Text> Passwords should match</Form.Text> : null}
        </Form.Group>
    );

    return(
        <Container>
            <h3 style={{textAlign:"center", marginBottom:"20px", marginTop:"20px"}}>{this.state.isSignupForm ? "Signup for a new account:" : "Login with your account:"} </h3>
            <div className="formContainer mx-auto">
                <Form>
                    <Form.Group>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control id="username" onChange={this.handleChange} type='email' placeholder="Enter your email" style={{width: "30vw", minWidth:"300px"}}/>
                        <Form.Text hidden={!this.state.usernameExists}>Username taken please try another one.</Form.Text>
                        <Form.Text hidden={!this.state.badCredentials}>Wrong Username/Password</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control id="password" onChange={this.handleChange} type='password' placeholder="Password" style={{width: "30vw", minWidth: "300px"}} />
                    </Form.Group>
                    {this.state.isSignupForm ? PassConfirm_Field : null}
                    <Form.Group>
                        {this.state.isSignupForm ? SignupButton : LoginButton}
                    </Form.Group>
                    <Form.Group>
                    <div style={{textAlign:"center"}}>
                        {this.state.isSignupForm ? <a href='#' onClick={() => this.setState({isSignupForm: !this.state.isSignupForm, badCredentials: false})}>Already a member? Login</a> : <a href="#" onClick={() => this.setState({isSignupForm: !this.state.isSignupForm, badCredentials: false})}>Signup</a>}
                    </div>
                    </Form.Group>
                </Form>
                
            </div>
        </Container>
    );
}
    
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginBasic);