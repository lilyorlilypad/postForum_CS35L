import React, { Component } from 'react'
import { message } from 'antd';
import './index.scss'
export default class Login extends Component {
    render() {
        return (
            <div class="login">
                <div class="loginPage">
                <div class="row">
                    <h1>Sign In with your UCLA Logon ID</h1>
                    <p>Sign in or create an account to start finding things you want.</p>
                    <div name="loginForm" class="loginForm">
                        <div class="formElement">
                            <input type="text" class="username" name="username" placeholder="Your UCLA Email"/>
                        </div>
                        <br/>
                        <div class="formElement">
                            <input type="password" class="password" name="password" placeholder="Password" autocomplete="off"/>
                        </div>
                        <div class="formLogin">
                            <button type="submit" onClick={() => this.validateform()}>Sign In</button>
                        </div>
                    </div>
                </div>
                <div class="hrLine"></div>
                <div class="row">
                    <h3>New to the Market?</h3>
                    <span onClick={() => this.props.history.push('/signUp')}>Create Account</span>
                </div>
            </div>
            </div>
        )
    }

    
    usernameCheck = () => {
        /* let username = document.forms['loginForm'].elements['username'].value;
        if(username.length !== 0){
            if( (!username.includes('@g.ucla.edu')) && (!username.includes('@ucla.edu'))){
                alert("Please enter the UCLA email address");
                return false;
            }
            if(username.charAt(0) === "@"){
                alert("Please enter a valid UCLA email");
                return false;
            }
        }else{
            alert("Please enter your UCLA email address");
            return false;
        }
        return true; */
    }
    
    passwordCheck= () =>{
        /* let userpsw = document.forms['loginForm'].elements['password'].value;
        if(userpsw === ""){
            alert ("Please enter your password");
            document.loginForm.password.focus();
            return false;
        }
        if(userpsw.length < 6){
            alert("Please enter the password with the length greater than 5");
            return false;
        }
        return true; */
    }
    
    validateform = () =>{
        //Go to home page if sign in successfully
        message.success('Sign In Successfully!');
        this.props.history.push('/home')
        if(this.usernameCheck() && this.passwordCheck()){
            return true;
        }else{
            return false;
        }
    }
    
    
}