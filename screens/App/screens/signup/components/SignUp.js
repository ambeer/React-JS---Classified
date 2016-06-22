/*
import React from 'react';
import { store } from '../../controller/signUpController';

var SignUp = React.createClass({
	getInitialState : function(){
        return { 
            username : '',
            email : '',
            password : '',
            phoneno :''
        };
    },
    componentDidMount : function(){
        var self = this;
    },
    componentWillUnmount : function(){
        //self.handleSubmit();
    },
    handleSubmit : function(e){
        e.preventDefault();
        var self = this;
        var username = this.state.username;
        var email = this.state.email;
        var password = this.state.password;
        var phoneno = this.state.phoneno;
        var PostData = (function (username, password, email, phoneno) {
            return JSON.stringify({
                username: username,
                password: password,
                email : email,
                phoneno : phoneno
            });
        })(username, password, email, phoneno);

        $.ajax({
            url: "http://192.168.2.181:3000/taclassified/signup",
            type: 'POST',
            dataType: "json",
            cache: false,
            contentType : 'application/json; charset=utf-8',
            data: PostData,
            beforeSend: function() {                
            },
            success: function(data, status, req){       
                if(data.resultInfo == "Success"){
                    $('.success-msg').show();
                    
                }       
            },
            error: function(jqXHR) {                
            }
        }); 
    },
    setValue: function (field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    },
    render : function(){
        return (
            <div className="signup-container">
            <h1>Create Your Account</h1>
            <form className="signup-form" onSubmit={this.handleSubmit} >
                <div className="success-msg">You added successfully !!</div>

            	<div className="credentials-wrapper">
	                <span>
					  <i className="fa fa-user"></i>
					  <input type="text" name="username" placeholder="Username" onChange={this.setValue.bind(this, 'username')} required/>
					</span>
	            </div>    
	            <div className="credentials-wrapper">
	                <span>
 						<i className="fa fa-envelope"></i>
  						<input type="email" placeholder="E-mail Address" name="email" onChange={this.setValue.bind(this, 'email')} required/>
  					</span>
	            </div>
	            <div className="credentials-wrapper">
	                <span>
						<i className="fa fa-key"></i>
						<input type="password" name="password" placeholder="Password" onChange={this.setValue.bind(this, 'password')} required/>
					</span>
	            </div> 
                 <div className="credentials-wrapper">
                    <span>
                        <i className="fa fa-envelope"></i>
                        <input type="tel" placeholder="Phone number" name="phoneno" onChange={this.setValue.bind(this, 'phoneno')} required/>
                    </span>
                </div>
	            
	            <input type="submit" value="Sign Up" className="signup-button" />
            </form>
            </div>     
        );
    }
});

export default SignUp;

*/