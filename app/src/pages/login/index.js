import React, { Component } from 'react'
import { message } from 'antd';
import './index.scss';
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";





export default class Login extends Component {
    render() {
        return ( 
            <div className="login">
                <div className="loginPage">
                <div className="row">
                    <h1>Sign In with your UCLA Logon ID</h1>
                    <p>Sign in or create an account to start finding things you want.</p>
                    <div name="loginForm" className="loginForm">
                        <div className="formElement">
                            <input 
                                type="text" 
                                className="username" 
                                name="username" 
                                onChange={this.handleChange}
                                placeholder="Your UCLA Email"/>
                        </div>
                        <br/>
                        <div className="formElement">
                            <input type="password" 
                                className="password" 
                                name="password" 
                                onChange={this.handleChange}
                                placeholder="Password" autoComplete="off"/>
                        </div>
                        <div className="formLogin">
                            <button type="submit" 
                            onClick={this.clickLogin}>Sign In</button>
                        </div>
                    </div>
                </div>
                <div className="hrLine"></div>
                <div className="row">
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
        return true;  */
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
        return true;  */
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
    
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }

    clickLogin = (e) => {
        console.log(this.state.username)
        console.log(this.state.password)
        fetch('http://localhost:8080/api/v1/users/login',{
            method:'POST',
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          credentials: 'include' // add this option to include cookies
    })
    /*
        .then((response) => response.json())
        .then((data) => {
            console.log(data.status);
            if(data.status === "success")
            {
                //alert("You are logged in.");
                this.props.history.push("/home");
            }
            else 
            {
                alert("Please check your login information.");
            }
        });*/
        .then(response => {
            if (!response.ok) {
                alert("Check your login information again")
            }
            else
            {
                console.log(response.json())
                this.props.history.push("/home");
                //return response.json();
            }
                
          })
    };

};






