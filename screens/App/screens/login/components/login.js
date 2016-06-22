import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import LoginMenu from './LoginMenu.js';
import SignUp from '../../signup/components/SignUp';

var LoginPanel = React.createClass({
	getInitialState : function(){
        return { 
            useremail : '',
            password : ''
        };
    },
    componentDidMount : function(){
        var self = this;
        var minHeight = $(window).height()-$('#header').outerHeight()-$('#footer').outerHeight()-parseInt($('.app > div').css('margin-top'))-parseInt($('.app > div').css('margin-bottom'));
        $('.app > div').css('min-height',minHeight);
    },
    componentWillUnmount : function(){
       // this.handleSubmit();
    },
    count: 0,
    windowRedirect : function(param) {
        window.location.href = param ;
     },
    handleSubmit : function(e){
        e.preventDefault();
        var self = this;
        var email = this.state.email;
        var password = this.state.password;        
        var PostData = 'grant_type=password' + '&userName=' + email + '&password=' + password + '';
        $.ajax({
            url: "https://hrmmobile.techaspect.com/token",
            type: 'POST',
            headers :{
                'Content-Type': 'application/x-www-form-urlencoded',
                'ClientId' : '8er4lt18-opo4xc7u.apps.techaspect.com'
            },
             
            data: PostData,
            beforeSend: function() {                
            },
            success: function(data, status, req){
                localStorage.setItem('email', email);
                localStorage.setItem('user', data.userName);
                localStorage.setItem('id', data.userID);
                self.windowRedirect(window.location.pathname + '#/postad');                    
                //window.location.href = "/#/postad";   
                Loader.hideLoader();   
            },
            error: function(jqXHR) { 
                self.count++;
                if(self.count < 3){
                    $('.err-msg').show();
                }
                else if(self.count == 3){
                    $('.err-msgs').show();
                }
                else{
                   self.windowRedirect('/#/signup'); 
                   count = 0;          
                }
                Loader.hideLoader();
            }
        }); 
        Loader.showLoader();
    },
    setValue: function (field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    },
    render : function(){
        var email = localStorage.getItem('email');
        if(email){
            window.location.href = window.location.pathname + "#/postad";
            window.location.reload();
        }else{
            return (
    			<div id="login-panel" align="center">
                    <div className="login-container">
                        <p>Please login with TA credentials to continue Posting Ad </p>
                        <h1>User Login</h1>
                         <form className="login-form"  onSubmit={this.handleSubmit} >
                            <div className="credentials-wrapper">
                                <label>Enter username</label>
                                <span>
                                    <i className="fa fa-user"></i>
                                    <input type="text" name="email" placeholder="Username" onChange={this.setValue.bind(this, 'email')}  required/>
                                </span>
                            </div>
                            <div className="credentials-wrapper">
                                <label>Enter password</label>
                                <span>
                                    <i className="fa fa-key"></i>
                                    <input type="password" name="password" placeholder="Password" onChange={this.setValue.bind(this, 'password')} required/>
                                </span>
                            </div>
                            <div className="error-msg">Incorrect Credentials</div>
                            <input type="submit" value="Submit" className="submit-button"/>
                        </form>
                        <LoginMenu />
                        <div className="login-signup-container">
                            <p className="err-msgs">After this, you will be redirected to Sign up screen</p> 
                            <p className="err-msg">Invalid Username Or Password</p> 
                         </div>
                        
                    </div>
                </div>     
            );
        }
    }
});

export default LoginPanel;