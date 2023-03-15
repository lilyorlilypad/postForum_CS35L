import React, { Component,useState } from 'react';
import './index.scss';
//import React, { useState } from 'react';


export default class SignUp extends Component {
    render() {
        return (
            <div className="signUp">
                <div className="loginPage">
                    <div className="row">
                        <h1>Sign Up with your UCLA Logon ID</h1>
                        <p>Create an account to start finding things you want.</p>
                        <div name="signForm" className="signForm">
                            <div className="formElement">
                                <input 
                                type="text" 
                                className="username" 
                                name="username" 
                                onChange={this.handleChange}
                                placeholder="Username"/>
                            </div>
                            <div className="formElement">
                                <input 
                                type="text" 
                                className="email" 
                                name="email" 
                                onChange={this.handleChange}
                                placeholder="Email  [has to be a valid UCLA email]"/>
                            </div>
                            <div className="formElement">
                                <input 
                                type="password" 
                                className="password" 
                                name="password" 
                                placeholder="Password   [at least 8 character long]" 
                                onChange={this.handleChange}
                                autoComplete="off"/>
                            </div>
                            <div className="formElement">
                                <input 
                                type="password" 
                                className="passwordConfirm" 
                                name="passwordConfirm" 
                                placeholder="Password Confirmation  [has to match the previous password]" 
                                onChange={this.handleChange}
                                autoComplete="off"/>
                            </div>
                            <div className="formLogin">
                                <button type="submit" 
                                onClick={this.clickSignin}>Sign In</button>
                            </div>
                        </div>
                    </div>
                    <div className="hrLine"></div>
                    <div className="row">
                        <h3>Already have an account?</h3>
                        <span onClick={() => this.props.history.push('/login')}>Sign In</span>
                    </div>
                </div>
            </div>
        )
    }
/*
    emailCheck= () => {
        
        
        let email = this.state.email
        console.log(" email is", email)
        
        if(email.length !== 0){
            if( (!email.includes('@g.ucla.edu')) && (!email.includes('@ucla.edu'))){
                alert("Please enter a valid UCLA email address");
                return false;
            }
            if(email.charAt(0) === "@"){
                alert("Please enter a valid UCLA email address");
                return false;
            }
        }else{
            alert("Please enter a valid UCLA email address address");
            return false;
        }
        return true;
    }
    
    passwordCheck= () =>{
        let userpsw = this.state.password
        console.log(userpsw)
        if(userpsw === ""){
            alert ("Please enter your password");
            //document.signForm.password.focus();
            return false;
        }
        if(userpsw.length < 9){
            alert("Please enter the password with the length greater than 8");
            return false;
        }
        return true;
    }
    
    validateform= () => {
        //Go to login page if sign up succesfully
        //this.props.history.push('/login')
        if(this.emailCheck() && this.passwordCheck()){
            return true;
        }else{
            return false;
        }
    }
*/
    handleChange = event => {
        //const [email, setEmail] = useState('');
        //const [password, setPassword] = useState('');
        //const [passwordConfirm, setPasswordConfirm] = useState('');
        const { name, value } = event.target;
        this.setState({ [name]: value });
        /*
        if (name === 'email') {
            setEmail(value);
          } else if (name === 'password') {
            setPassword(value);
          } else if (name === 'passwordConfirm') {
            setPasswordConfirm(value);
          }
        */
        };
      
    

    clickSignin = (e) => {
        e.preventDefault();
        console.log(this.state.username)
        console.log(this.state.email)
        console.log(this.state.password)
        console.log(this.state.passwordConfirm)
        fetch('http://localhost:8080/api/v1/users/signup',{
            method:'POST',
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                passwordConfirm: this.state.passwordConfirm
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
        //.then((response) => response.json())
        .then(response => {
            if (!response.ok) {
                alert("Check the information you inputted")
            }
            else
            {
                console.log(response.json())
                this.props.history.push("/home");
                //return response.json();
            }
                
          })
        /*.then((data) => {
            console.log(data.status);
            if(data.status === "success")
            {
                //alert("You are logged in.");
                //this.props.history.push("/home");
            }
            else 
            {
                alert("Please check your login information.");
            }
        });*/
    };
    
}